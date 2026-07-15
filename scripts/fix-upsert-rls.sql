-- Fix RLS policies to allow upsert from the seed script
-- Run this in Supabase SQL Editor, then re-run the seed

DROP POLICY IF EXISTS "Anyone can update products" ON products;
DROP POLICY IF EXISTS "Anyone can insert products" ON products;
DROP POLICY IF EXISTS "Anyone can update vendors" ON vendors;
DROP POLICY IF EXISTS "Anyone can insert vendors" ON vendors;
DROP POLICY IF EXISTS "Anyone can insert categories" ON categories;

CREATE POLICY "Anyone can manage products" ON products
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can manage vendors" ON vendors
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can manage categories" ON categories
  FOR ALL USING (true) WITH CHECK (true);
