-- Fix: allow anonymous (not-logged-in) customers to CREATE an order at checkout,
-- while still keeping viewing/editing orders admin-only (the existing
-- "Admins can manage orders" policy from schema.sql already handles that side).
-- Without this, checkout.html's order insert fails silently blocked by RLS.

create policy "Public can create orders"
  on orders for insert
  with check (true);
