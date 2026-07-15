-- Run this to allow seeding, then run node scripts/seed-supabase.mjs
-- After seeding, you can tighten these policies

CREATE POLICY "Anyone can insert vendors" ON vendors FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update vendors" ON vendors FOR UPDATE WITH CHECK (true);
CREATE POLICY "Anyone can insert categories" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update products" ON products FOR UPDATE WITH CHECK (true);
