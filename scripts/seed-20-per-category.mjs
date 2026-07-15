import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = resolve(__dirname, '..', '.env');
const envContent = readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, ...vals] = line.split('=');
  if (key && vals.length) envVars[key.trim()] = vals.join('=').trim();
});
const supabaseUrl = envVars['VITE_SUPABASE_URL'];
const supabaseKey = envVars['VITE_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing env vars');
  process.exit(1);
}
const supabase = createClient(supabaseUrl, supabaseKey);

// ── Categories ──
const CATEGORIES = [
  'crepe', 'flower',
  'stripe', 'jonkoso', 'vintage', 'duchesse',
];

// Vendor assignment: which vendor gets which category
const CATEGORY_VENDOR = {
  crepe: 6, flower: 5,
  stripe: 5, jonkoso: 1, vintage: 1, duchesse: 1,
};

// ── Image sources ──
const imagesDir = resolve(__dirname, '..', 'public', 'images');

// Dedicated category folders — store relative paths (e.g. "Flower/10.jpeg")
const folderImagePaths = {};
for (const cat of ['Flower', 'Stripe', 'Vintage', 'Crepe', 'Duchess', 'Jonkoso']) {
  const dir = resolve(imagesDir, cat);
  try {
    folderImagePaths[cat] = readdirSync(dir)
      .filter(f => /\.(jpe?g|png|webp)$/i.test(f))
      .map(f => `${cat}/${f}`);
  } catch { folderImagePaths[cat] = []; }
}

// Flat pool of all folder image paths (no root images)
const allFolderImagePaths = Object.values(folderImagePaths).flat();

// Map category → image folder name
const catImageFolder = {
  flower: 'Flower', stripe: 'Stripe', vintage: 'Vintage',
  crepe: 'Crepe', duchesse: 'Duchess', jonkoso: 'Jonkoso',
};

// Every category uses images from dedicated subdirectories only.
// For categories without their own folder, use the pool of all folder images.

// ── Name generators ──
const namePools = {
  crepe: [
    'Crepe De Chine', 'Georgette Crepe', 'Silk Crepe', 'Poly Crepe', 'Matte Crepe',
    'Satin Crepe', 'Stretch Crepe', 'Wool Crepe', 'Rayon Crepe', 'Chiffon Crepe',
    'Plissé Crepe', 'Moss Crepe', 'Flat Crepe', 'Sandwashed Crepe', 'Textured Crepe',
    'Double Crepe', 'Crepe Back Satin', 'Crepe Jersey', 'Crepe Knit', 'Crepe Georgette',
  ],
  flower: [
    'African Daisy', 'Garden Rose', 'Tropical Bloom', 'Sunflower Field', 'Morning Glory',
    'Wild Blossom', 'Spring Tulip', 'Summer Hibiscus', 'Lavender Field', 'Cherry Blossom',
    'Petal Burst', 'Floral Meadow', 'Desert Rose', 'Water Lily', 'Orchid Garden',
    'Peony Paradise', 'Lily Pad', 'Daisy Chain', 'Rose Garden', 'Bird of Paradise',
  ],
  stripe: [
    'Pinstripe', 'Bold Stripe', 'Classic Stripe', 'Navy Stripe', 'Rainbow Stripe',
    'Vertical Stripe', 'Thin Stripe', 'Wide Stripe', 'Diagonal Stripe', 'Colorblock Stripe',
    'Varsity Stripe', 'Candy Stripe', 'French Stripe', 'Bengal Stripe', 'Awning Stripe',
    'Ticking Stripe', 'Chalk Stripe', 'Rope Stripe', 'Shadow Stripe', 'Ombre Stripe',
  ],
  jonkoso: [
    'Classic Jonkoso', 'Premium Jonkoso', 'Deluxe Jonkoso', 'Traditional Jonkoso', 'Modern Jonkoso',
    'Royal Jonkoso', 'Golden Jonkoso', 'Silver Jonkoso', 'Crystal Jonkoso', 'Pearl Jonkoso',
    'Diamond Jonkoso', 'Sapphire Jonkoso', 'Ruby Jonkoso', 'Emerald Jonkoso', 'Opal Jonkoso',
    'Silk Jonkoso', 'Satin Jonkoso', 'Cotton Jonkoso', 'Linen Jonkoso', 'Velvet Jonkoso',
  ],
  vintage: [
    'Vintage Rose', 'Heritage Print', 'Antique Pattern', 'Old World', 'Classic Retro',
    'Timeless Charm', 'Heirloom', 'Nostalgia', 'Traditional', 'Period Piece',
    'Heritage Bloom', 'Retro Classic', 'Antique Garden', 'Vintage Lace', 'Memory Lane',
    'Nostalgic Bloom', 'Heritage Garden', 'Antique Tapestry', 'Classic Heritage', 'Period Floral',
  ],
  duchesse: [
    'Duchesse Satin', 'Duchesse Silk', 'Royal Duchesse', 'Classic Duchesse', 'Premium Duchesse',
    'Duchesse Brocade', 'Duchesse Jacquard', 'Duchesse Organza', 'Duchesse Taffeta', 'Duchesse Velvet',
    'Crystal Duchesse', 'Pearl Duchesse', 'Golden Duchesse', 'Ivory Duchesse', 'Blush Duchesse',
    'Champagne Duchesse', 'Duchesse Lace', 'Duchesse Embroidered', 'Duchesse Beaded', 'Duchesse Sequin',
  ],
};

const descriptions = [
  'Premium quality fabric perfect for elegant dresses and special occasions.',
  'Versatile textile suitable for both casual and formal wear.',
  'Beautiful fabric with a soft hand and excellent drape.',
  'High-quality material ideal for sewing and fashion design projects.',
  'Luxurious fabric with a smooth finish and vibrant color.',
  'Durable and comfortable fabric great for everyday wear.',
  'Exquisite textile for creating stunning garments.',
];

// ── Generate products ──
let nextId = 1;
const allProducts = [];

for (const cat of CATEGORIES) {
  const names = namePools[cat];
  const vendor = CATEGORY_VENDOR[cat];

  // Image pool — subdirectory images only
  const folder = catImageFolder[cat];
  const imagePool = folder && folderImagePaths[folder]?.length
    ? folderImagePaths[folder]
    : allFolderImagePaths;

  const count = imagePool.length;

  for (let i = 0; i < count; i++) {
    const name = names[i % names.length];
    const suffix = i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : '';
    const slug = `${cat}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')}${suffix ? `-${Math.floor(i / names.length) + 1}` : ''}-${nextId}`;

    const imgPath = `/images/${imagePool[i]}`;

    allProducts.push({
      id: nextId,
      name: `${name}${suffix}`,
      slug,
      collection: 'womens-gallery',
      category: cat,
      price: 699 + (i % 12) * 100 + Math.floor(i / 12) * 50,
      compare_price: i % 3 === 0 ? 999 + (i % 12) * 100 + Math.floor(i / 12) * 50 : null,
      unit: 'per yard',
      description: descriptions[i % descriptions.length],
      details: JSON.stringify(['Fabric type', 'Width: 46-54 inches', 'Quality material']),
      style_inspiration: JSON.stringify(['Dress', 'Top', 'Skirt']),
      images: JSON.stringify([imgPath]),
      rating: 4.0 + (i % 10) * 0.1,
      reviews: 5 + (i % 30),
      in_stock: true,
      stock_quantity: 5 + (i % 20),
      sold_quantity: 3 + (i % 15),
      total_stock: 8 + (i % 30),
      status: 'active',
      featured: i < 3,
      discount: 0,
      vendor_id: vendor,
    });
    nextId++;
  }
}

// ── Seed ──
async function seed() {
  console.log(`Generated ${allProducts.length} products across ${CATEGORIES.length} categories\n`);

  // Delete all existing products
  console.log('Deleting existing products...');
  const { error: delErr } = await supabase.from('products').delete().neq('id', 0);
  if (delErr) console.error('Delete error:', delErr.message);
  else console.log('  ✓ All products deleted');

  // Delete existing order_items (if any)
  const { error: delItemsErr } = await supabase.from('order_items').delete().neq('id', 0);
  if (delItemsErr && !delItemsErr.message.includes('does not exist')) {
    // ignore if table doesn't exist
  }

  // Reset the id sequence
  const { error: seqErr } = await supabase.rpc('setval', { sequence: 'products_id_seq', value: 1 });
  if (seqErr) { /* sequence may not exist or need superuser */ }

  // Insert products in batches of 50
  console.log('Inserting products...');
  const batchSize = 50;
  for (let i = 0; i < allProducts.length; i += batchSize) {
    const batch = allProducts.slice(i, i + batchSize);
    const { error: pErr } = await supabase.from('products').insert(batch);
    if (pErr) { console.error(`Batch ${i} error:`, pErr.message); return; }
    process.stdout.write(`  ${Math.min(i + batchSize, allProducts.length)}/${allProducts.length}...\r`);
  }
  console.log(`  ✓ ${allProducts.length} products inserted`);

  console.log('\n✨ Done!');
}

seed().catch(console.error);
