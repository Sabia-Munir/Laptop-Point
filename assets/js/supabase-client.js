// Shared Supabase client for Laptop Point admin pages.
// The anon key is safe to expose in frontend code — it's designed to be public.
// Real protection comes from the Row Level Security policies in database/schema.sql,
// which only let a *logged-in* admin read/write products, orders, customers, stock_log.

const SUPABASE_URL = 'https://bdwoodliksydqcptdqsh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkd29vZGxpa3N5ZHFjcHRkcXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNDkwMjEsImV4cCI6MjEwMjYyNTAyMX0.1VHpJrvzBYAJNqaphlSNiuhMafR7Rz577xvaPwoRq_s';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
