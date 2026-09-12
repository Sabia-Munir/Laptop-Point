-- Laptop Point database schema
-- Run this once in Supabase's SQL Editor (Project → SQL Editor → New Query → Run)

create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text,
  category text not null check (category in ('laptop', 'keyboard', 'mouse', 'headset', 'bag', 'other')),
  price numeric(10,2) not null,
  discount_price numeric(10,2),
  description text,
  specs jsonb,                -- e.g. {"processor": "Intel i5 12th Gen", "ram": "16GB", "storage": "512GB SSD", "screen": "15.6\" FHD"}
  images text[],              -- array of image URLs from Supabase Storage
  stock_quantity integer not null default 0,
  status text not null default 'active' check (status in ('active', 'draft')),
  created_at timestamptz default now()
);

create table customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  addresses jsonb,
  created_at timestamptz default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  items jsonb not null,       -- [{ product_id, name, quantity, price_at_order }]
  total_amount numeric(10,2) not null,
  payment_method text check (payment_method in ('jazzcash', 'easypaisa', 'cod', 'card')),
  payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'failed')),
  order_status text default 'pending' check (order_status in ('pending', 'packed', 'shipped', 'delivered', 'cancelled')),
  shipping_address jsonb,
  created_at timestamptz default now()
);

create table stock_log (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id),
  change_amount integer not null,
  reason text check (reason in ('sale', 'restock', 'correction')),
  admin_id uuid,
  created_at timestamptz default now()
);

-- Row Level Security: keeps customers/orders/stock private, products.active public
alter table products enable row level security;
alter table orders enable row level security;
alter table customers enable row level security;
alter table stock_log enable row level security;

-- Anyone (including anonymous storefront visitors) can VIEW active products only
create policy "Public can view active products"
  on products for select
  using (status = 'active');

-- Only logged-in admins can insert/update/delete products, or view orders/customers/stock
create policy "Admins can manage products"
  on products for all
  using (auth.role() = 'authenticated');

create policy "Admins can manage orders"
  on orders for all
  using (auth.role() = 'authenticated');

create policy "Admins can manage customers"
  on customers for all
  using (auth.role() = 'authenticated');

create policy "Admins can manage stock_log"
  on stock_log for all
  using (auth.role() = 'authenticated');

-- PUBLIC-SAFE VIEW: the storefront queries this, never the products table directly.
-- It exposes an "in stock" / "low stock" / "out of stock" label instead of the
-- real stock_quantity number, which stays admin-only.
create view public_products as
select
  id, name, brand, category, price, discount_price, description, specs, images,
  case
    when stock_quantity = 0 then 'out_of_stock'
    when stock_quantity <= 3 then 'low_stock'
    else 'in_stock'
  end as availability
from products
where status = 'active';

-- Explicitly allow the public (anon) role and logged-in admins to read the
-- public-safe view. Views need this granted separately from the base table's
-- RLS policies.
grant select on public_products to anon, authenticated;
