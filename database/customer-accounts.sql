-- Adds customer accounts on top of the existing admin-only auth.
--
-- IMPORTANT SECURITY NOTE: until now, every RLS policy on products/orders/
-- customers/stock_log checked `auth.role() = 'authenticated'` — meaning ANY
-- logged-in user was treated as an admin. That was fine when the only people
-- who could log in were admins you created by hand in Supabase. It stops
-- being fine the moment shoppers can sign themselves up, because a customer
-- account would suddenly be able to edit products, see other people's
-- orders, etc. This migration introduces a `profiles` table with a role
-- column, and rewrites every "Admins can manage X" policy to check that role
-- instead of just "is logged in".
--
-- Run this once, after schema.sql and place-order-function.sql are already applied.

-- 1) One row per authenticated user, auto-created on signup, default role
--    'customer'. Nobody can set their own role to 'admin' — see RLS below.
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz default now()
);

alter table profiles enable row level security;

-- Anyone logged in can see their own profile (needed so the account page
-- can show their name / know their own role), but can only ever UPDATE the
-- name/phone fields on their own row — never their own role.
create policy "Users can view their own profile"
  on profiles for select
  using (id = auth.uid());

create policy "Users can update their own name/phone"
  on profiles for update
  using (id = auth.uid())
  with check (id = auth.uid() and role = (select role from profiles where id = auth.uid()));

-- 2) Auto-create a 'customer' profile row whenever someone signs up —
--    covers both new customer signups AND the admin account(s) you already
--    created by hand (they'll get a profile too, which you then promote
--    to 'admin' manually — see the UPDATE at the bottom of this file).
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- 3) Helper used by every admin policy below — avoids repeating the same
--    subquery everywhere and makes the intent obvious at a glance.
create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- 4) Replace the old "any logged-in user is an admin" policies with real
--    role checks. Drop + recreate since Postgres has no CREATE OR REPLACE
--    POLICY.
drop policy if exists "Admins can manage products" on products;
create policy "Admins can manage products"
  on products for all
  using (is_admin());

drop policy if exists "Admins can manage orders" on orders;
create policy "Admins can manage orders"
  on orders for all
  using (is_admin());

drop policy if exists "Admins can manage customers" on customers;
create policy "Admins can manage customers"
  on customers for all
  using (is_admin());

drop policy if exists "Admins can manage stock_log" on stock_log;
create policy "Admins can manage stock_log"
  on stock_log for all
  using (is_admin());

-- 5) Let a logged-in customer see their OWN orders (not everyone's — that's
--    still admin-only via the policy above). Requires knowing which orders
--    are theirs, which is what step 6 adds.
alter table orders add column if not exists customer_auth_id uuid references auth.users(id);

create policy "Customers can view their own orders"
  on orders for select
  using (customer_auth_id = auth.uid());

-- 6) Promote your existing admin account(s). Run this manually, once, for
-- every email you use to log into admin/login.html — the trigger above only
-- creates 'customer' profiles by default, on purpose.
--
-- update profiles set role = 'admin' where id = (
--   select id from auth.users where email = 'YOUR-ADMIN-EMAIL-HERE'
-- );
