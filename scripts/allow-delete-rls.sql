-- Allow delete on order_items and products for reseeding
DROP POLICY IF EXISTS "Anyone can manage products" ON products;
DROP POLICY IF EXISTS "Anyone can manage order_items" ON order_items;

CREATE POLICY "Anyone can manage products" ON products
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can manage order_items" ON order_items
  FOR ALL USING (true) WITH CHECK (true);
