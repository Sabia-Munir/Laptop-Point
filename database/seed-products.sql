-- Seed data for public_products view
-- Run this after the schema migration to populate the storefront

-- Laptop 1
INSERT INTO products (id, name, brand, category, price, discount_price, description, specs, images, stock_quantity, status)
VALUES (
  gen_random_uuid(),
  'Gaming Laptop Pro',
  'TechBrand',
  'laptop',
  1599.99,
  1399.99,
  'High-performance gaming laptop with RTX 4070',
  '{"processor": "Intel i7-14700HX", "ram": "32GB DDR5", "storage": "1TB NVMe SSD", "gpu": "RTX 4070", "screen": "16" FHD 165Hz"}::jsonb,
  '{"poster_url": "/assets/models/laptop.glb"}::text[]',
  15,
  'active'
);

-- Laptop 2
INSERT INTO products (id, name, brand, category, price, discount_price, description, specs, images, stock_quantity, status)
VALUES (
  gen_random_uuid(),
  'Ultrabook Slim',
  'PremierTech',
  'laptop',
  999.99,
  899.99,
  'Lightweight laptop for work and study',
  '{"processor": "Intel i5-13500H", "ram": "16GB DDR4", "storage": "512GB SSD", "gpu": "Intel Iris Xe"}::jsonb,
  '{"poster_url": "/assets/models/laptop.glb"}::text[]',
  42,
  'active'
);

-- Keyboard
INSERT INTO products (id, name, brand, category, price, discount_price, description, specs, images, stock_quantity, status)
VALUES (
  gen_random_uuid(),
  'Mechanical Gaming Keyboard',
  'GearMaster',
  'keyboard',
  129.99,
  99.99,
  'RGB mechanical keyboard with blue switches',
  '{"switches": "Blue", "layout": "104-key", "connectivity": "USB"}::jsonb,
  '{"poster_url": "/assets/images/keyboard1.jpg"}::text[]',
  87,
  'active'
);

-- Mouse
INSERT INTO products (id, name, brand, category, price, discount_price, description, specs, images, stock_quantity, status)
VALUES (
  gen_random_uuid(),
  'Precision Gaming Mouse',
  'ClickTech',
  'mouse',
  69.99,
  59.99,
  'Ergonomic gaming mouse with adjustable DPI',
  '{"dpi": "16000", "buttons": "7", "connectivity": "Wireless"}::jsonb,
  '{"poster_url": "/assets/images/mouse1.jpg"}::text[]',
  123,
  'active'
);

-- Headset
INSERT INTO products (id, name, brand, category, price, discount_price, description, specs, images, stock_quantity, status)
VALUES (
  gen_random_uuid(),
  'Surround Sound Headset',
  'AudioMax',
  'headset',
  89.99,
  69.99,
  'Gaming headset with 7.1 surround sound',
  '{"driver_size": "50mm", "connection": "Wireless", "mic": "flip-up"}::jsonb,
  '{"poster_url": "/assets/images/headset1.jpg"}::text[]',
  65,
  'active'
);

-- Bag
INSERT INTO products (id, name, brand, category, price, discount_price, description, specs, images, stock_quantity, status)
VALUES (
  gen_random_uuid(),
  'Gaming Backpack',
  'CarryCo',
  'bag',
  45.99,
  35.99,
  'Water-resistant backpack with laptop compartment',
  '{"laptop_compartment": "15-16 inch", "waterproof": "IPX4", "material": "Polyester"}::jsonb,
  '{"poster_url": "/assets/images/bag1.jpg"}::text[]',
  34,
  'active'
);

-- Other
INSERT INTO products (id, name, brand, category, price, discount_price, description, specs, images, stock_quantity, status)
VALUES (
  gen_random_uuid(),
  'Laptop Stand',
  'ErgoTech',
  'other',
  29.99,
  19.99,
  'Aluminum laptop stand for better airflow',
  '{"material": "Aerospace Aluminum", "adjustable_angle": true}::jsonb,
  '{"poster_url": "/assets/images/stand1.jpg"}::text[]',
  200,
  'active'
);