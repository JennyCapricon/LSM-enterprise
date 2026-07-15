-- =============================================
-- Tightened RLS Policies for Production
-- Run this AFTER Supabase Auth is set up
-- =============================================

-- Drop loose policies
DROP POLICY IF EXISTS "Anyone can view orders" ON orders;
DROP POLICY IF EXISTS "Anyone can insert orders" ON orders;
DROP POLICY IF EXISTS "Anyone can view order_items" ON order_items;
DROP POLICY IF EXISTS "Anyone can insert order_items" ON order_items;
DROP POLICY IF EXISTS "Anyone can insert vendors" ON vendors;
DROP POLICY IF EXISTS "Anyone can update vendors" ON vendors;
DROP POLICY IF EXISTS "Anyone can insert categories" ON categories;
DROP POLICY IF EXISTS "Anyone can insert products" ON products;
DROP POLICY IF EXISTS "Anyone can update products" ON products;

-- Orders: users can only see their own
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid()::text = user_id OR user_id IS NULL);

-- Orders: authenticated users can insert
CREATE POLICY "Users can insert own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid()::text = user_id OR user_id IS NULL);

-- Order items: tied to orders
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND (orders.user_id = auth.uid()::text OR orders.user_id IS NULL)
    )
  );

CREATE POLICY "Users can insert order items"
  ON order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND (orders.user_id = auth.uid()::text OR orders.user_id IS NULL)
    )
  );

-- Keep public read for vendors/products/categories
-- (already set by existing policies)
