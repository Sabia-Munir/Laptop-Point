-- Database connection test and verification script
-- Run this after schema migration and seed data to verify everything works

-- 1. Verify all tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- 2. Verify RLS is enabled on key tables
SELECT rlsschema, rlspolicyname, cmd FROM pg_policies 
WHERE schemaname = 'public' AND outermptname IN ('products', 'orders', 'customers', 'stock_log')
ORDER BY rlsschema, rlspolicyname, cmd;

-- 3. Verify public_products view is accessible to anon
SELECT has_schema_privilege('anon', 'public_products', 'SELECT');

-- 4. Count active products available in storefront
SELECT availability, COUNT(*) as product_count 
FROM public_products 
GROUP BY availability 
ORDER BY availability;

-- 5. Verify sample products were inserted
SELECT COUNT(*) as total_products FROM products WHERE status = 'active';

-- 6. Test a simple query through the view
SELECT id, name, availability, price 
FROM public_products 
LIMIT 5;