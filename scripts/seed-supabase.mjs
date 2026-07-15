// Run with: node scripts/seed-supabase.mjs
// Requires .env with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
// The schema must already be applied via Supabase SQL Editor

import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env manually (VITE_ syntax)
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
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// -------------------------------------------------------------------
// SEED VENDORS
// -------------------------------------------------------------------
const vendors = [
  { id: 1, name: 'Lagos Fabrics Co.', business_name: 'Lagos Fabrics Company Ltd', phone_number: '08012345678', whatsapp_number: '2348012345678', email: 'hello@lagosfabrics.com', address: '12 Broad Street, Lagos Island, Lagos', rating: 4.8, products_count: 45, verified: true, since: '2021' },
  { id: 2, name: 'Premium Textiles NG', business_name: 'Premium Textiles Nigeria Ltd', phone_number: '08023456789', whatsapp_number: '2348023456789', email: 'info@premiumtextiles.ng', address: '25 Awolowo Road, Ikoyi, Lagos', rating: 4.9, products_count: 32, verified: true, since: '2020' },
  { id: 3, name: 'African Lace House', business_name: 'African Lace House International', phone_number: '08034567890', whatsapp_number: '2348034567890', email: 'sales@africanlacehouse.com', address: '7 Allen Avenue, Ikeja, Lagos', rating: 4.7, products_count: 28, verified: true, since: '2022' },
  { id: 4, name: 'Brocade World', business_name: 'Brocade World Enterprises', phone_number: '08045678901', whatsapp_number: '2348045678901', email: 'contact@brocadeworld.com', address: '42 Idumota Market, Lagos Island, Lagos', rating: 4.8, products_count: 52, verified: true, since: '2020' },
  { id: 5, name: 'LSM Enterprise', business_name: 'LSM Enterprise Ltd', phone_number: '08038777330', whatsapp_number: '2348038777330', email: 'hello@lsm-enterprise.com', address: '15 Marina Street, Lagos Island, Lagos', rating: 5.0, products_count: 200, verified: true, since: '2000' },
  { id: 6, name: 'C. Hez Global Investment Ltd', business_name: 'C. Hez Global Investment Limited', phone_number: '08137405970', whatsapp_number: '2348137405970', email: 'info@chezglobal.com', address: '10 Ahmadu Bello Way, Victoria Island, Lagos', rating: 4.9, products_count: 80, verified: true, since: '2020' },
];

const vendorProductMap = {
  1: 6, 2: 3, 5: 2, 7: 3, 8: 5, 9: 6, 13: 5, 15: 6, 16: 5, 18: 5,
  20: 5, 21: 5, 22: 2, 25: 6, 29: 5, 30: 5, 31: 5, 32: 5, 33: 5,
  34: 5, 35: 5, 36: 5, 37: 5, 38: 5, 39: 5, 40: 5, 41: 5, 42: 5,
  43: 5, 44: 5, 45: 5, 46: 5, 47: 5, 48: 5, 49: 5, 50: 5, 51: 5,
  52: 5, 53: 5, 54: 5, 55: 5, 56: 5, 57: 5, 58: 5, 59: 5, 60: 5,
  61: 5, 62: 5, 63: 5, 64: 5, 65: 5, 66: 5, 67: 5, 68: 5, 69: 5,
  70: 5, 71: 5, 72: 5, 73: 5, 74: 5, 75: 5, 76: 5, 77: 5, 78: 5,
  79: 5, 80: 5, 81: 5, 82: 5, 83: 5, 84: 5, 85: 5, 86: 5, 87: 5,
  88: 5, 89: 5, 90: 5, 91: 5, 92: 5, 93: 5, 94: 5, 95: 5, 96: 5,
  97: 5, 98: 5, 99: 5, 100: 5, 101: 5, 102: 5, 103: 5, 104: 5,
  105: 5, 106: 5, 107: 5, 108: 5, 109: 5, 110: 5, 111: 5, 112: 5,
  113: 5, 114: 5, 115: 5, 116: 5, 117: 5, 118: 5, 119: 5, 120: 5,
  121: 5, 122: 5, 123: 5, 124: 5, 125: 5, 126: 5, 127: 5, 128: 5,
  129: 5, 130: 5, 133: 5, 134: 5, 135: 5, 136: 5, 137: 5, 138: 5, 139: 5,
  140: 5, 141: 5, 142: 5, 143: 5, 144: 5, 145: 5, 146: 5, 147: 5,
  148: 5, 149: 5, 150: 5, 151: 5, 152: 5, 153: 5, 154: 5,
  155: 6, 156: 6, 157: 6, 158: 6, 159: 6, 160: 6, 161: 6, 162: 6,
  163: 6, 164: 6, 165: 6, 166: 6, 167: 6, 168: 6, 169: 6, 170: 6,
  171: 6, 172: 6, 173: 6, 174: 6, 175: 6, 176: 6, 177: 6, 178: 6,
  179: 6, 180: 6, 181: 6, 182: 6, 183: 6, 184: 6, 185: 6, 186: 6,
  187: 6, 188: 6, 189: 6, 190: 6, 191: 6, 192: 6, 193: 6, 194: 6,
  195: 6, 196: 6, 197: 6, 198: 6, 199: 6, 200: 6, 201: 6, 202: 6,
  203: 6, 204: 6, 205: 6, 206: 6, 207: 6, 208: 6, 209: 6, 210: 6,
  211: 6, 212: 6, 213: 6, 214: 6, 215: 6, 216: 6, 217: 6, 218: 6,
  219: 6, 220: 6, 221: 6, 222: 6, 223: 6, 224: 6, 225: 6, 226: 6,
   227: 6, 228: 6, 229: 6, 230: 6,
   231: 6, 232: 6, 233: 6, 234: 6, 235: 6,
   236: 6, 237: 6, 238: 6, 239: 6, 240: 6,
   241: 6, 242: 6, 243: 6, 244: 6, 245: 6,
   246: 6, 247: 6, 248: 6, 249: 6, 250: 6,
   251: 6, 252: 6, 253: 6, 254: 6, 255: 6,
   256: 6, 257: 6, 258: 6, 259: 6, 260: 6,
   261: 6, 262: 6, 263: 6, 264: 6, 265: 6,
   266: 6, 267: 6, 268: 6, 269: 6, 270: 6,
   271: 6, 272: 6, 273: 6, 274: 6, 275: 6,
};

const getVendorId = (productId) => vendorProductMap[productId] || 5;

// -------------------------------------------------------------------
// SEED CATEGORIES
// -------------------------------------------------------------------
const categories = [
  { id: 'lace', name: 'Lace' },
  { id: 'cotton', name: 'Cotton' },
  { id: 'denim', name: 'Denim' },
  { id: 'crepe', name: 'Crepe' },
  { id: 'flower', name: 'Flower' },
  { id: 'scuba', name: 'Scuba' },
  { id: 'stripe', name: 'Stripe' },
  { id: 'cubana', name: 'Cubana' },
  { id: 'jonkoso', name: 'Jonkoso' },
  { id: 'vintage', name: 'Vintage' },
  { id: 'white', name: 'White' },
  { id: 'duchesse', name: 'Duchesse' },
];

// -------------------------------------------------------------------
// SEED PRODUCTS (extracted from products.js - last values win)
// -------------------------------------------------------------------
const _products = [
  { id: 1, name: 'Premium Jonkoso', slug: 'premium-jonkoso', collection: 'womens-gallery', category: 'jonkoso', price: 1299, comparePrice: 1699, unit: 'per yard', description: 'High-quality Jonkoso fabric — a timeless woven textile perfect for dresses, skirts, and traditional-inspired modern fashion.', details: ['100% cotton weave', 'Width: 48 inches', 'Weight: 180 GSM', 'Pre-shrunk', 'Machine washable'], styleInspiration: ['A-line Dress', 'Wrap Skirt', 'Flowy Maxi Dress'], images: ['/images/Jonkoso/Jonkoso2.jpg', '/images/Jonkoso/Jonkoso 3.jpg', '/images/Jonkoso/Jonkoso 4.jpg'], rating: 4.8, reviews: 234, inStock: true, stockQuantity: 14, soldQuantity: 86, totalStock: 100, status: 'active' },
  { id: 2, name: 'Elegant Lace', slug: 'elegant-lace', collection: 'womens-gallery', category: 'lace', price: 2499, comparePrice: 2999, unit: 'per yard', description: 'Exquisite lace fabric for special occasions.', details: ['French lace', 'Width: 54 inches', 'Delicate pattern', 'Dry clean only'], styleInspiration: ['Fit & Flare Gown', 'Mermaid Dress', 'Off-shoulder Top'], images: ['/images/p3.jpg', '/images/p4.jpg', '/images/Lace 2.jpg', '/images/Lace 3.jpg'], rating: 4.9, reviews: 189, inStock: true, stockQuantity: 8, soldQuantity: 72, totalStock: 80, status: 'active' },
  { id: 3, name: 'Premium Lace', slug: 'premium-lace', collection: 'womens-gallery', category: 'lace', price: 1499, comparePrice: 0, unit: 'per yard', description: 'Premium quality lace fabric.', details: ['Swiss lace', 'Width: 50 inches', 'Fine detailing'], styleInspiration: ['A-line Dress', 'Blouse'], images: ['/images/p4.jpg', '/images/Lace 2.jpg'], rating: 4.7, reviews: 156, inStock: true, stockQuantity: 12, soldQuantity: 88, totalStock: 100, status: 'active' },
  { id: 4, name: 'African Lace', slug: 'african-lace', collection: 'womens-gallery', category: 'lace', price: 2199, comparePrice: 2799, unit: 'per yard', description: 'Beautiful African lace patterns.', details: ['African lace', 'Width: 52 inches'], styleInspiration: ['Fit & Flare Gown'], images: ['/images/Lace 2.jpg', '/images/Lace 3.jpg'], rating: 4.6, reviews: 98, inStock: true, stockQuantity: 5, soldQuantity: 45, totalStock: 50, status: 'active' },
  { id: 5, name: 'Cotton Ankara', slug: 'cotton-ankara', collection: 'womens-gallery', category: 'cotton', price: 899, comparePrice: 1199, unit: 'per yard', description: 'Vibrant Ankara prints on high-quality cotton.', details: ['100% cotton', 'Width: 46 inches', 'Fade-resistant'], styleInspiration: ['Pencil Skirt', 'Top', 'Dress'], images: ['/images/Ankara1.jpg', '/images/Ankara2.jpg', '/images/Ankara3.jpg'], rating: 4.5, reviews: 312, inStock: true, stockQuantity: 20, soldQuantity: 130, totalStock: 150, status: 'active' },
  { id: 7, name: 'Guipure Lace', slug: 'guipure-lace', collection: 'womens-gallery', category: 'lace', price: 3299, comparePrice: 3999, unit: 'per yard', description: 'Premium guipure lace for sophisticated designs.', details: ['Guipure lace', 'Width: 54 inches', 'No backing needed'], styleInspiration: ['Mermaid Gown', 'Fit & Flare'], images: ['/images/Lace 3.jpg', '/images/Lace 2.jpg'], rating: 4.9, reviews: 67, inStock: true, stockQuantity: 3, soldQuantity: 27, totalStock: 30, status: 'active' },
  { id: 8, name: 'Cotton Canvas', slug: 'cotton-canvas', collection: 'womens-gallery', category: 'cotton', price: 1099, comparePrice: 0, unit: 'per yard', description: 'Durable cotton canvas fabric.', details: ['Heavyweight cotton', 'Width: 44 inches'], styleInspiration: ['Jacket', 'Tote Bag'], images: ['/images/p1.jpg'], rating: 4.3, reviews: 45, inStock: true, stockQuantity: 15, soldQuantity: 60, totalStock: 75, status: 'active' },
  { id: 9, name: 'Crepe De Chine', slug: 'crepe-de-chine', collection: 'womens-gallery', category: 'crepe', price: 1599, comparePrice: 1999, unit: 'per yard', description: 'Luxurious crepe fabric with a soft flow.', details: ['Crepe de Chine', 'Width: 54 inches', 'Silky finish'], styleInspiration: ['Blouse', 'Wrap Dress'], images: ['/images/Crepe/Crepe1.jpg', '/images/Crepe/Crepe2.jpg', '/images/Crepe/Crepe3.jpg'], rating: 4.7, reviews: 123, inStock: true, stockQuantity: 10, soldQuantity: 90, totalStock: 100, status: 'active' },
  { id: 13, name: 'Organic Cotton', slug: 'organic-cotton', collection: 'womens-gallery', category: 'cotton', price: 1299, comparePrice: 1699, unit: 'per yard', description: 'Eco-friendly organic cotton.', details: ['GOTS certified', 'Width: 48 inches'], styleInspiration: ['Casual Dress', 'T-shirt'], images: ['/images/p1.jpg'], rating: 4.4, reviews: 78, inStock: true, stockQuantity: 20, soldQuantity: 80, totalStock: 100, status: 'active' },
  { id: 15, name: 'Crepe Silk', slug: 'crepe-silk', collection: 'womens-gallery', category: 'crepe', price: 2999, comparePrice: 3599, unit: 'per yard', description: 'Premium silk crepe for elegant evening wear.', details: ['Silk crepe', 'Width: 52 inches'], styleInspiration: ['Evening Gown', 'Blouse'], images: ['/images/Crepe/Crepe2.jpg', '/images/Crepe/Crepe3.jpg', '/images/Crepe/Crepe1.jpg'], rating: 4.9, reviews: 56, inStock: true, stockQuantity: 5, soldQuantity: 25, totalStock: 30, status: 'active' },
  { id: 16, name: 'Cotton Voile', slug: 'cotton-voile', collection: 'womens-gallery', category: 'cotton', price: 799, comparePrice: 0, unit: 'per yard', description: 'Lightweight cotton voile, perfect for summer.', details: ['Lightweight', 'Width: 48 inches'], styleInspiration: ['Summer Dress', 'Scarf'], images: ['/images/p1.jpg'], rating: 4.2, reviews: 34, inStock: true, stockQuantity: 25, soldQuantity: 75, totalStock: 100, status: 'active' },
  { id: 18, name: 'Cotton Poplin', slug: 'cotton-poplin', collection: 'womens-gallery', category: 'cotton', price: 699, comparePrice: 0, unit: 'per yard', description: 'Crisp cotton poplin for shirts and dresses.', details: ['Cotton poplin', 'Width: 44 inches'], styleInspiration: ['Shirt Dress', 'Blouse'], images: ['/images/p1.jpg'], rating: 4.3, reviews: 89, inStock: true, stockQuantity: 30, soldQuantity: 120, totalStock: 150, status: 'active' },
  { id: 20, name: 'African Print', slug: 'african-print', collection: 'womens-gallery', category: 'cotton', price: 999, comparePrice: 0, unit: 'per yard', description: 'Bold African print fabric.', details: ['100% cotton', 'Width: 46 inches'], styleInspiration: ['Dress', 'Skirt'], images: ['/images/Ankara1.jpg'], rating: 4.6, reviews: 145, inStock: true, stockQuantity: 15, soldQuantity: 85, totalStock: 100, status: 'active' },
  { id: 21, name: 'White Lace', slug: 'white-lace', collection: 'womens-gallery', category: 'white', price: 2799, comparePrice: 0, unit: 'per yard', description: 'Pure white lace for weddings and special events.', details: ['White lace', 'Width: 54 inches'], styleInspiration: ['Wedding Gown', 'Evening Dress'], images: ['/images/Lace 2.jpg', '/images/Lace 3.jpg'], rating: 4.8, reviews: 92, inStock: true, stockQuantity: 7, soldQuantity: 43, totalStock: 50, status: 'active' },
  { id: 22, name: 'Cotton Brocade', slug: 'cotton-brocade', collection: 'mens-fashion', category: 'cotton', price: 1899, comparePrice: 2399, unit: 'per yard', description: 'Rich cotton brocade for traditional attire.', details: ['Brocade weave', 'Width: 44 inches'], styleInspiration: ['Agbada', 'Tunic'], images: ['/images/p4.jpg'], rating: 4.7, reviews: 67, inStock: true, stockQuantity: 6, soldQuantity: 44, totalStock: 50, status: 'active' },
  { id: 25, name: 'Cubana Crepe', slug: 'cubana-crepe', collection: 'womens-gallery', category: 'cubana', price: 1999, comparePrice: 0, unit: 'per yard', description: 'Stylish Cubana crepe fabric.', details: ['Cubana crepe', 'Width: 50 inches'], styleInspiration: ['Dress', 'Skirt'], images: ['/images/p3.jpg'], rating: 4.5, reviews: 34, inStock: true, stockQuantity: 8, soldQuantity: 42, totalStock: 50, status: 'active' },
  { id: 29, name: 'Cotton Jacquard', slug: 'cotton-jacquard', collection: 'womens-gallery', category: 'cotton', price: 1699, comparePrice: 0, unit: 'per yard', description: 'Woven cotton jacquard with intricate patterns.', details: ['Jacquard weave', 'Width: 48 inches'], styleInspiration: ['Jacket', 'Dress'], images: ['/images/p1.jpg'], rating: 4.6, reviews: 56, inStock: true, stockQuantity: 10, soldQuantity: 40, totalStock: 50, status: 'active' },
  { id: 30, name: 'Cotton Satin', slug: 'cotton-satin', collection: 'womens-gallery', category: 'cotton', price: 1199, comparePrice: 0, unit: 'per yard', description: 'Smooth cotton satin with a subtle sheen.', details: ['Cotton satin', 'Width: 48 inches'], styleInspiration: ['Blouse', 'Dress'], images: ['/images/p1.jpg'], rating: 4.4, reviews: 45, inStock: true, stockQuantity: 12, soldQuantity: 38, totalStock: 50, status: 'active' },
];

// Scan actual image files from public directories
const imagesDir = resolve(__dirname, '..', 'public', 'images');
const flowerImageFiles = readdirSync(resolve(imagesDir, 'Flower')).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
const stripeImageFiles = readdirSync(resolve(imagesDir, 'Stripe')).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
const vintageImageFiles = readdirSync(resolve(imagesDir, 'Vintage')).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
const crepeImageFiles = readdirSync(resolve(imagesDir, 'Crepe')).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
const duchessImageFiles = readdirSync(resolve(imagesDir, 'Duchess')).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
const jonkosoImageFiles = readdirSync(resolve(imagesDir, 'Jonkoso')).filter(f => /\.(jpe?g|png|webp)$/i.test(f));

console.log(`Images found: Flower=${flowerImageFiles.length} Stripe=${stripeImageFiles.length} Vintage=${vintageImageFiles.length} Crepe=${crepeImageFiles.length} Duchess=${duchessImageFiles.length} Jonkoso=${jonkosoImageFiles.length}`);

// Unique name/tag generators for each category
const flowerStyles = [
  'African Daisy', 'Garden Rose', 'Tropical Bloom', 'Sunflower Field', 'Morning Glory',
  'Wild Blossom', 'Spring Tulip', 'Summer Hibiscus', 'Lavender Field', 'Cherry Blossom',
  'Petal Burst', 'Floral Meadow', 'Desert Rose', 'Water Lily', 'Orchid Garden',
  'Peony Paradise', 'Lily Pad', 'Daisy Chain', 'Rose Garden', 'Bird of Paradise',
  'Bluebell Wood', 'Poppy Field', 'Jasmine Vine', 'Lotus Flower', 'Begonia Bliss',
  'Camellia Walk', 'Daffodil Dell', 'Azalea Burst', 'Wisteria Lane', 'Honeysuckle Hue',
  'Iris Garden', 'Magnolia Bloom', 'Marigold Burst', 'Nasturtium Trail', 'Primrose Path',
  'Snapdragon Spire', 'Tulip Terrace', 'Violet Valley', 'Zinnia Burst', 'Aster Field',
  'Bougainvillea', 'Calla Lily', 'Dahlia Burst', 'Foxglove Spire', 'Geranium Bed',
  'Hollyhock Lane', 'Impatiens Hue', 'Jasmine Trail', 'Kalanchoe Burst', 'Lantana Path',
];
const flowerDetails = [
  ['Cotton blend', 'Width: 46 inches', 'Vibrant floral print', 'Lightweight'],
  ['Cotton blend', 'Width: 46 inches', 'Bold flower pattern', 'Medium weight'],
  ['Cotton blend', 'Width: 46 inches', 'Delicate floral motif', 'Soft feel'],
  ['Cotton blend', 'Width: 46 inches', 'Large floral design', 'Breathable'],
  ['Cotton blend', 'Width: 46 inches', 'Abstract flower print', 'Easy care'],
];
const flowerDesc = [
  'Vibrant floral print fabric perfect for dresses, blouses, and skirts.',
  'Beautiful flower pattern fabric ideal for summer dresses and casual wear.',
  'Delicate floral motif on quality cotton blend — great for sewing projects.',
  'Bold and beautiful flower design fabric for standout fashion pieces.',
  'Elegant floral print fabric suitable for both casual and formal attire.',
];
const flowerInspiration = [
  ['Summer Dress', 'Top'], ['Fit & Flare Gown', 'Blouse'], ['A-line Dress', 'Skirt'],
  ['Wrap Dress', 'Top'], ['Flowy Maxi Dress', 'Blouse'], ['Pencil Skirt', 'Top'],
];

const stripeStyles = [
  'Pinstripe', 'Bold Stripe', 'Classic Stripe', 'Navy Stripe', 'Rainbow Stripe',
  'Vertical Stripe', 'Thin Stripe', 'Wide Stripe', 'Diagonal Stripe', 'Colorblock Stripe',
  'Varsity Stripe', 'Candy Stripe', 'French Stripe', 'Bengal Stripe', 'Awning Stripe',
  'Ticking Stripe', 'Chalk Stripe', 'Rope Stripe', 'Shadow Stripe', 'Ombre Stripe',
  'Satin Stripe', 'Jacquard Stripe',
];
const stripeDetails = [
  ['Cotton blend', 'Width: 46 inches', 'Crisp stripe pattern', 'Lightweight'],
  ['Cotton blend', 'Width: 46 inches', 'Bold stripe design', 'Medium weight'],
  ['Cotton blend', 'Width: 46 inches', 'Classic pinstripe', 'Soft feel'],
];
const stripeDesc = [
  'Classic stripe pattern fabric suitable for shirts, dresses, and home decor.',
  'Bold striped fabric perfect for making a fashion statement.',
  'Versatile stripe print fabric ideal for both casual and formal projects.',
];
const stripeInspiration = [
  ['Shirt', 'Dress'], ['Blouse', 'Skirt'], ['Casual Shirt', 'Pants'],
];

const vintageStyles = [
  'Vintage Rose', 'Heritage Print', 'Antique Pattern', 'Old World', 'Classic Retro',
  'Timeless Charm', 'Heirloom', 'Nostalgia', 'Traditional', 'Period Piece',
  'Vintage Lace', 'Heritage Bloom', 'Antique Garden', 'Retro Classic', 'Old Fashioned',
  'Grandmother\'s Garden', 'Antique Lace', 'Memory Lane', 'Yesterday\'s Rose', 'Classic Elegance',
  'Vintage Velvet', 'Heritage Rose', 'Antique Brocade', 'Retro Floral', 'Old World Charm',
  'Nostalgic Bloom', 'Heritage Garden', 'Antique Tapestry', 'Vintage Charm', 'Classic Heritage',
  'Period Floral', 'Retro Garden', 'Grandma\'s Print', 'Antique Velvet', 'Vintage Tulle',
  'Heritage Lace', 'Nostalgic Rose', 'Old Fashioned Rose', 'Timeless Garden', 'Heirloom Rose',
  'Vintage Daisy', 'Heritage Bloom', 'Antique Violet', 'Retro Rose', 'Classic Violet',
  'Nostalgic Daisy', 'Period Pattern', 'Old World Rose', 'Vintage Iris', 'Heritage Tulip',
  'Antique Poppy', 'Retro Lily', 'Classic Tulip', 'Vintage Daisy Chain', 'Heritage Wreath',
  'Antique Wreath', 'Retro Wreath', 'Nostalgic Wreath', 'Vintage Bouquet', 'Heritage Bouquet',
  'Antique Bouquet', 'Retro Bouquet', 'Classic Bouquet', 'Vintage Spray', 'Heritage Spray',
  'Garden Party', 'Tea Rose', 'English Garden', 'French Vintage', 'Country Rose',
  'Cottage Garden', 'Provence Lavender', 'Shabby Chic', 'Romantic Rose', 'Victorian Print',
  'Edwardian Rose', 'Art Deco Floral', 'Vintage Paisley', 'Heritage Plaid', 'Antique Toile',
  'Retro Floral Print',
];
const vintageDetails = [
  ['Cotton blend', 'Width: 46 inches', 'Vintage-inspired pattern', 'Antique finish'],
  ['Cotton blend', 'Width: 46 inches', 'Heritage print', 'Classic design', 'Soft feel'],
  ['Cotton blend', 'Width: 46 inches', 'Retro motif', 'Faded finish', 'Unique look'],
];
const vintageDesc = [
  'Timeless vintage-inspired fabric perfect for retro dresses and classic designs.',
  'Heritage print fabric with an antique feel — ideal for unique fashion pieces.',
  'Classic vintage pattern fabric that adds elegance to any sewing project.',
  'Old-world charm fabric for those who appreciate traditional styles.',
];
const vintageInspiration = [
  ['Retro Dress', 'Skirt'], ['Vintage Gown', 'Blouse'], ['Classic Dress', 'Top'],
  ['1950s Dress', 'Skirt'], ['Period Costume', 'Blouse'],
];

// Generate numbered products (31-130 = Flower LSM, 133-154 = Stripe LSM, 155-230 = Vintage C.Hez)
const flowerProducts = [];
for (let i = 31; i <= 130; i++) {
  const idx = i - 31;
  const imgIdx = idx % flowerImageFiles.length;
  const styleIdx = idx % flowerStyles.length;
  const detIdx = idx % flowerDetails.length;
  const descIdx = idx % flowerDesc.length;
  const inspIdx = idx % flowerInspiration.length;
  const prodNum = Math.floor(idx / flowerStyles.length) + 1;
  const suffix = prodNum > 1 ? ` ${prodNum}` : '';
  flowerProducts.push({
    id: i,
    name: `${flowerStyles[styleIdx]}${suffix}`,
    slug: `flower-${flowerStyles[styleIdx].toLowerCase().replace(/[\s']+/g, '-')}-${i}`,
    collection: 'womens-gallery',
    category: 'flower',
    price: 999 + (idx % 5) * 100,
    comparePrice: 0,
    unit: 'per yard',
    description: flowerDesc[descIdx],
    details: flowerDetails[detIdx],
    styleInspiration: flowerInspiration[inspIdx],
    images: [`/images/Flower/${flowerImageFiles[imgIdx]}`],
    rating: 4.0 + (idx % 10) * 0.1,
    reviews: 10 + (idx % 50),
    inStock: true,
    stockQuantity: 10 + (idx % 30),
    soldQuantity: 5 + (idx % 20),
    totalStock: 15 + (idx % 40),
    status: 'active',
  });
}

const stripeProducts = [];
for (let i = 133; i <= 154; i++) {
  const idx = i - 133;
  const imgIdx = idx % stripeImageFiles.length;
  const styleIdx = idx % stripeStyles.length;
  const detIdx = idx % stripeDetails.length;
  const descIdx = idx % stripeDesc.length;
  const inspIdx = idx % stripeInspiration.length;
  stripeProducts.push({
    id: i,
    name: stripeStyles[styleIdx],
    slug: `stripe-${stripeStyles[styleIdx].toLowerCase().replace(/\s+/g, '-')}-${i}`,
    collection: 'womens-gallery',
    category: 'stripe',
    price: 899 + (idx % 4) * 100,
    comparePrice: 0,
    unit: 'per yard',
    description: stripeDesc[descIdx],
    details: stripeDetails[detIdx],
    styleInspiration: stripeInspiration[inspIdx],
    images: [`/images/Stripe/${stripeImageFiles[imgIdx]}`],
    rating: 4.0 + (idx % 8) * 0.1,
    reviews: 5 + (idx % 30),
    inStock: true,
    stockQuantity: 8 + (idx % 25),
    soldQuantity: 4 + (idx % 15),
    totalStock: 12 + (idx % 35),
    status: 'active',
  });
}

const vintageProducts = [];
for (let i = 155; i <= 230; i++) {
  const idx = i - 155;
  const imgIdx = idx % vintageImageFiles.length;
  const styleIdx = idx % vintageStyles.length;
  const detIdx = idx % vintageDetails.length;
  const descIdx = idx % vintageDesc.length;
  const inspIdx = idx % vintageInspiration.length;
  const prodNum = Math.floor(idx / vintageStyles.length) + 1;
  const suffix = prodNum > 1 ? ` ${prodNum}` : '';
  vintageProducts.push({
    id: i,
    name: `${vintageStyles[styleIdx]}${suffix}`,
    slug: `vintage-${vintageStyles[styleIdx].toLowerCase().replace(/[\s']+/g, '-')}${suffix ? `-${prodNum}` : ''}-${i}`,
    collection: 'womens-gallery',
    category: 'vintage',
    price: 1499 + (idx % 6) * 100,
    comparePrice: i % 3 === 0 ? 1799 + (idx % 6) * 100 : 0,
    unit: 'per yard',
    description: vintageDesc[descIdx],
    details: vintageDetails[detIdx],
    styleInspiration: vintageInspiration[inspIdx],
    images: [`/images/Vintage/${vintageImageFiles[imgIdx]}`],
    rating: 4.0 + (idx % 10) * 0.1,
    reviews: 8 + (idx % 40),
    inStock: true,
    stockQuantity: 5 + (idx % 20),
    soldQuantity: 3 + (idx % 10),
    totalStock: 8 + (idx % 25),
    status: 'active',
  });
}

// Crepe products (IDs 231-233)
const crepeStyles = [
  'Chiffon Crepe', 'Crepe Georgette', 'Silk Crepe', 'Crepe Romaine', 'Crepe Marocain',
  'Crepe Satin', 'Crepe Jacquard', 'Crepe Stretch', 'Crepe Canton', 'Matte Crepe',
  'Crepe Jersey', 'Crepe Plisse', 'Crepe Back Satin', 'Crepe Wool', 'Crepe Knit',
];
const crepeDetails = [
  ['Soft crepe weave', 'Width: 54 inches', 'Elegant drape', 'Lightweight'],
  ['Crepe texture', 'Width: 52 inches', 'Flowy finish', 'Medium weight'],
  ['Smooth crepe', 'Width: 54 inches', 'Matte sheen', 'Wrinkle resistant'],
  ['Georgette weave', 'Width: 52 inches', 'Textured finish', 'Sheer quality'],
];
const crepeDesc = [
  'Elegant crepe fabric with a soft flow — perfect for blouses, dresses, and skirts.',
  'Smooth crepe textile ideal for formal wear and flowing designs.',
  'Versatile crepe fabric suitable for both casual and sophisticated garments.',
  'Luxurious crepe material with a beautiful drape for elegant fashion pieces.',
];
const crepeInspiration = [
  ['Blouse', 'Dress'], ['Wrap Dress', 'Skirt'], ['Evening Gown', 'Top'], ['Wide Leg Pants', 'Blouse'],
];
const crepeProducts = [];
for (let i = 231; i <= 245; i++) {
  const idx = i - 231;
  const imgIdx = idx % crepeImageFiles.length;
  const styleIdx = idx % crepeStyles.length;
  const detIdx = idx % crepeDetails.length;
  const descIdx = idx % crepeDesc.length;
  const inspIdx = idx % crepeInspiration.length;
  crepeProducts.push({
    id: i,
    name: crepeStyles[styleIdx],
    slug: `crepe-${crepeStyles[styleIdx].toLowerCase().replace(/[\s']+/g, '-')}-${i}`,
    collection: 'womens-fashion',
    category: 'crepe',
    price: 1299 + (idx % 4) * 200,
    comparePrice: idx % 2 === 0 ? 1499 + (idx % 4) * 200 : 0,
    unit: 'per yard',
    description: crepeDesc[descIdx],
    details: crepeDetails[detIdx],
    styleInspiration: crepeInspiration[inspIdx],
    images: [`/images/Crepe/${crepeImageFiles[imgIdx]}`],
    rating: 4.0 + (idx % 8) * 0.1,
    reviews: 15 + (idx % 40),
    inStock: true,
    stockQuantity: 8 + (idx % 25),
    soldQuantity: 5 + (idx % 15),
    totalStock: 13 + (idx % 35),
    status: 'active',
  });
}

const duchessStyles = [
  'Duchess Satin', 'Duchess Silk', 'Duchess Peau', 'Royal Duchess', 'Duchess Pleat',
  'Duchess Brocade', 'Duchess Taffeta', 'Duchess Pearl', 'Duchesse Velvet', 'Duchess Crepe',
  'Duchess Jacquard', 'Duchess Organza', 'Duchess Lace', 'Duchess Tulle', 'Duchess Damask',
];
const duchessDetails = [
  ['Luxurious duchess fabric', 'Width: 54 inches', 'Rich sheen', 'Heavyweight'],
  ['Premium duchess weave', 'Width: 54 inches', 'Smooth finish', 'Structured drape'],
  ['Royal duchess quality', 'Width: 54 inches', 'Elegant texture', 'Formal wear'],
  ['Luxury duchess satin', 'Width: 54 inches', 'Crisp finish', 'Wedding quality'],
];
const duchessDesc = [
  'Luxurious duchess fabric with a rich sheen — perfect for bridal and formal gowns.',
  'Premium quality duchess satin ideal for special occasion dresses and elegant designs.',
  'Royal duchesse fabric that adds sophistication to any garment.',
  'Elegant duchess material for stunning evening wear and bridal collections.',
];
const duchessInspiration = [
  ['Bridal Gown', 'Evening Dress'], ['Ball Gown', 'Skirt'], ['Cocktail Dress', 'Top'],
];
const duchessProducts = [];
for (let i = 246; i <= 260; i++) {
  const idx = i - 246;
  const imgIdx = idx % duchessImageFiles.length;
  const styleIdx = idx % duchessStyles.length;
  const detIdx = idx % duchessDetails.length;
  const descIdx = idx % duchessDesc.length;
  const inspIdx = idx % duchessInspiration.length;
  duchessProducts.push({
    id: i,
    name: duchessStyles[styleIdx],
    slug: `duchess-${duchessStyles[styleIdx].toLowerCase().replace(/[\s']+/g, '-')}-${i}`,
    collection: 'womens-fashion',
    category: 'duchesse',
    price: 2499 + (idx % 4) * 300,
    comparePrice: idx % 3 === 0 ? 2999 + (idx % 4) * 300 : 0,
    unit: 'per yard',
    description: duchessDesc[descIdx],
    details: duchessDetails[detIdx],
    styleInspiration: duchessInspiration[inspIdx],
    images: [`/images/Duchess/${duchessImageFiles[imgIdx]}`],
    rating: 4.2 + (idx % 6) * 0.1,
    reviews: 10 + (idx % 35),
    inStock: true,
    stockQuantity: 5 + (idx % 20),
    soldQuantity: 3 + (idx % 12),
    totalStock: 8 + (idx % 25),
    status: 'active',
  });
}

const jonkosoStyles = [
  'Premium Jonkoso', 'Classic Jonkoso', 'Traditional Jonkoso', 'Jonkoso Stripe', 'Jonkoso Plain',
  'Jonkoso Weave', 'Jonkoso Thread', 'Jonkoso Cotton', 'Jonkoso Natural', 'Jonkoso Handwoven',
  'Jonkoso Strip', 'Jonkoso Indigo', 'Jonkoso Earth', 'Jonkoso Raw', 'Jonkoso Unisex',
];
const jonkosoDetails = [
  ['Traditional weave', 'Width: 48 inches', '100% cotton', 'Handcrafted feel'],
  ['Jonkoso texture', 'Width: 48 inches', 'Natural fibers', 'Breathable'],
  ['Classic weave', 'Width: 48 inches', 'Medium weight', 'Versatile'],
  ['Premium weave', 'Width: 48 inches', 'Fine texture', 'Quality finish'],
];
const jonkosoDesc = [
  'Authentic Jonkoso fabric — a timeless woven textile perfect for modern and traditional designs.',
  'Traditional Jonkoso weave fabric, ideal for dresses, skirts, and cultural attire.',
  'Handcrafted Jonkoso textile that brings heritage and style together.',
  'Premium Jonkoso material for quality garments with a traditional touch.',
];
const jonkosoInspiration = [
  ['A-line Dress', 'Skirt'], ['Traditional Gown', 'Top'], ['Casual Dress', 'Wrap Skirt'],
];
const jonkosoProducts = [];
for (let i = 261; i <= 275; i++) {
  const idx = i - 261;
  const imgIdx = idx % jonkosoImageFiles.length;
  const styleIdx = idx % jonkosoStyles.length;
  const detIdx = idx % jonkosoDetails.length;
  const descIdx = idx % jonkosoDesc.length;
  const inspIdx = idx % jonkosoInspiration.length;
  jonkosoProducts.push({
    id: i,
    name: jonkosoStyles[styleIdx],
    slug: `jonkoso-${jonkosoStyles[styleIdx].toLowerCase().replace(/[\s']+/g, '-')}-${i}`,
    collection: 'womens-gallery',
    category: 'jonkoso',
    price: 999 + (idx % 4) * 150,
    comparePrice: idx % 2 === 0 ? 1199 + (idx % 4) * 150 : 0,
    unit: 'per yard',
    description: jonkosoDesc[descIdx],
    details: jonkosoDetails[detIdx],
    styleInspiration: jonkosoInspiration[inspIdx],
    images: [`/images/Jonkoso/${jonkosoImageFiles[imgIdx]}`],
    rating: 4.0 + (idx % 8) * 0.1,
    reviews: 12 + (idx % 35),
    inStock: true,
    stockQuantity: 10 + (idx % 25),
    soldQuantity: 5 + (idx % 18),
    totalStock: 15 + (idx % 35),
    status: 'active',
  });
}

const allProducts = [..._products, ...flowerProducts, ...stripeProducts, ...vintageProducts, ...crepeProducts, ...duchessProducts, ...jonkosoProducts];

// Map to snake_case for database
const productsWithVendor = allProducts.map(p => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  collection: p.collection || null,
  category: p.category,
  price: p.price,
  compare_price: p.comparePrice || null,
  unit: p.unit || 'per yard',
  description: p.description || null,
  details: JSON.stringify(p.details || []),
  style_inspiration: JSON.stringify(p.styleInspiration || []),
  images: JSON.stringify(p.images || []),
  rating: p.rating || 0,
  reviews: p.reviews || 0,
  in_stock: p.inStock !== false,
  stock_quantity: p.stockQuantity || 0,
  sold_quantity: p.soldQuantity || 0,
  total_stock: p.totalStock || 0,
  status: p.status || 'active',
  featured: p.featured || false,
  discount: p.discount || 0,
  vendor_id: getVendorId(p.id),
}));

async function seed() {
  console.log('Seeding Supabase...\n');

  // 1. Insert vendors (skip if exist)
  console.log('Inserting vendors...');
  const { count: vCount } = await supabase.from('vendors').select('*', { count: 'exact', head: true });
  if (vCount === 0) {
    for (const v of vendors) {
      const { error } = await supabase.from('vendors').insert(v);
      if (error) console.error(`  Vendor ${v.id} error:`, error.message);
    }
  }
  console.log(`  ✓ Vendors ready`);

  // 2. Insert categories (skip if exist)
  console.log('Inserting categories...');
  const { count: cCount } = await supabase.from('categories').select('*', { count: 'exact', head: true });
  if (cCount === 0) {
    for (const c of categories) {
      const { error } = await supabase.from('categories').insert(c);
      if (error) console.error(`  Category ${c.id} error:`, error.message);
    }
  }
  console.log(`  ✓ Categories ready`);

  // 3. Upsert products (insert or update) in batches of 50
  console.log('Updating products with real images...');
  const batchSize = 50;
  for (let i = 0; i < productsWithVendor.length; i += batchSize) {
    const batch = productsWithVendor.slice(i, i + batchSize);
    const { error: pErr } = await supabase.from('products').upsert(batch, { onConflict: 'id', ignoreDuplicates: false });
    if (pErr) { console.error(`Product batch error at ${i}:`, pErr.message); return; }
    process.stdout.write(`  ${Math.min(i + batchSize, productsWithVendor.length)}/${productsWithVendor.length}...\r`);
  }
  console.log(`  ✓ ${productsWithVendor.length} products upserted`);

  console.log('\n✨ Seed complete!');
}

seed().catch(console.error);
