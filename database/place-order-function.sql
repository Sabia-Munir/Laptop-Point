-- Places an order AND decrements stock atomically, so a burst of simultaneous
-- checkouts can't oversell a product (a plain client-side insert + separate
-- update could race between two customers buying the last unit).
--
-- SECURITY DEFINER lets this function write to `products` and `stock_log` on
-- behalf of an anonymous checkout, even though both tables are otherwise
-- admin-only under RLS — the function itself is the only door left open, and
-- it only ever decrements by the ordered quantity, never lets the caller set
-- stock to an arbitrary number.

create or replace function place_order(
  p_items jsonb,             -- [{ product_id, name, quantity, price_at_order }]
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
  v_item jsonb;
  v_product_id uuid;
  v_qty integer;
  v_available integer;
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

  insert into orders (items, total_amount, payment_method, shipping_address)
  values (p_items, p_total_amount, p_payment_method, p_shipping_address)
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

-- Anonymous storefront visitors need to be able to call this function (the
-- function's own SECURITY DEFINER is what grants it write access underneath,
-- not this grant — this just lets them invoke it at all).
grant execute on function place_order(jsonb, numeric, text, jsonb) to anon, authenticated;
