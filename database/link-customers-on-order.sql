
-- Makes place_order() create (or reuse) a real row in `customers` for every
-- order, and link orders.customer_id to it — instead of only saving the
-- buyer's name/phone/email loose inside orders.shipping_address like before.
--
-- Run this AFTER schema.sql, place-order-function.sql, customer-accounts.sql,
-- and fix-orders-insert-policy.sql are already applied — it replaces the
-- place_order function those created.
--
-- NOTE: this only affects orders placed from now on. Orders already in your
-- database keep showing "Unknown" in the admin Customers/Orders view, since
-- there's nothing to safely match them to a customer after the fact. Ask if
-- you want a one-off backfill script for those too.

create or replace function place_order(
  p_items jsonb,
  p_total_amount numeric,
  p_payment_method text,
  p_shipping_address jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order_id uuid;
  v_customer_id uuid;
  v_item jsonb;
  v_product_id uuid;
  v_qty integer;
  v_available integer;
  v_phone text := p_shipping_address->>'phone';
  v_email text := p_shipping_address->>'email';
  v_name text := p_shipping_address->>'name';
begin
  -- Lock and check stock for every line item before writing anything.
  for v_item in select * from jsonb_array_elements(p_items) loop
    v_product_id := (v_item->>'product_id')::uuid;
    v_qty := (v_item->>'quantity')::integer;

    select stock_quantity into v_available
    from products
    where id = v_product_id
    for update;

    if v_available is null then
      raise exception 'Product % no longer exists', v_product_id;
    end if;

    if v_available < v_qty then
      raise exception 'Not enough stock for product %: % left, % requested',
        v_product_id, v_available, v_qty;
    end if;
  end loop;

  -- Find an existing customer by phone (falls back to email if no phone was
  -- given), so a repeat buyer accumulates one customer record instead of a
  -- new duplicate row every time they check out.
  if v_phone is not null and v_phone <> '' then
    select id into v_customer_id from customers where phone = v_phone limit 1;
  end if;

  if v_customer_id is null and v_email is not null and v_email <> '' then
    select id into v_customer_id from customers where email = v_email limit 1;
  end if;

  if v_customer_id is null then
    insert into customers (name, email, phone, addresses)
    values (
      coalesce(v_name, 'Unknown'),
      nullif(v_email, ''),
      nullif(v_phone, ''),
      jsonb_build_array(p_shipping_address)
    )
    returning id into v_customer_id;
  end if;

  insert into orders (items, total_amount, payment_method, shipping_address, customer_auth_id, customer_id)
  values (p_items, p_total_amount, p_payment_method, p_shipping_address, auth.uid(), v_customer_id)
  returning id into v_order_id;

  for v_item in select * from jsonb_array_elements(p_items) loop
    v_product_id := (v_item->>'product_id')::uuid;
    v_qty := (v_item->>'quantity')::integer;

    update products
    set stock_quantity = stock_quantity - v_qty
    where id = v_product_id;

    insert into stock_log (product_id, change_amount, reason)
    values (v_product_id, -v_qty, 'sale');
  end loop;

  return v_order_id;
end;
$$;

grant execute on function place_order(jsonb, numeric, text, jsonb) to anon, authenticated;
