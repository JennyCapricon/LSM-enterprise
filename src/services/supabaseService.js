import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { vendors as staticVendors, getVendorById, getVendorIdForProductId } from '../data/vendors';
import { products as staticProducts, categories as staticCategories } from '../data/products';

export async function fetchVendors() {
  if (!isSupabaseConfigured) return staticVendors;
  try {
    const { data, error } = await supabase.from('vendors').select('*').order('id');
    if (error) throw error;
    return data?.length ? data : staticVendors;
  } catch (e) {
    console.warn('fetchVendors fallback:', e.message);
    return staticVendors;
  }
}

export async function fetchVendorById(id) {
  if (!isSupabaseConfigured) return getVendorById(id);
  try {
    const { data, error } = await supabase.from('vendors').select('*').eq('id', id).single();
    if (error) throw error;
    return data || getVendorById(id);
  } catch (e) {
    return getVendorById(id);
  }
}

export async function fetchProducts() {
  if (!isSupabaseConfigured) return staticProducts;
  try {
    const { data, error } = await supabase.from('products').select('*').order('id');
    if (error) throw error;
    if (!data?.length) return staticProducts;
    return data.map(normalizeProduct);
  } catch (e) {
    console.warn('fetchProducts fallback:', e.message);
    return staticProducts;
  }
}

export async function fetchProductBySlug(slug) {
  if (!isSupabaseConfigured) return staticProducts.find(p => p.slug === slug);
  try {
    const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
    if (error) throw error;
    return data ? normalizeProduct(data) : staticProducts.find(p => p.slug === slug);
  } catch (e) {
    return staticProducts.find(p => p.slug === slug);
  }
}

export async function fetchProductsByCategory(category) {
  if (!isSupabaseConfigured) return staticProducts.filter(p => p.category === category);
  try {
    const { data, error } = await supabase.from('products').select('*').eq('category', category);
    if (error) throw error;
    if (!data?.length) return staticProducts.filter(p => p.category === category);
    return data.map(normalizeProduct);
  } catch (e) {
    return staticProducts.filter(p => p.category === category);
  }
}

export async function fetchProductsByVendor(vendorId) {
  if (!isSupabaseConfigured) return staticProducts.filter(p => p.vendorId === vendorId);
  try {
    const { data, error } = await supabase.from('products').select('*').eq('vendor_id', vendorId);
    if (error) throw error;
    if (!data?.length) return staticProducts.filter(p => p.vendorId === vendorId);
    return data.map(normalizeProduct);
  } catch (e) {
    return staticProducts.filter(p => p.vendorId === vendorId);
  }
}

export async function fetchCategories() {
  if (!isSupabaseConfigured) return staticCategories;
  try {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) throw error;
    return data?.length ? data : staticCategories;
  } catch (e) {
    return staticCategories;
  }
}

export async function saveOrder(orderData) {
  if (!isSupabaseConfigured) return null;
  try {
    const { items, ...order } = orderData;
    const { data: orderResult, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: order.userId || null,
        customer_name: order.customerName,
        customer_email: order.customerEmail || '',
        customer_phone: order.customerPhone || '',
        shipping_address: order.shippingAddress || {},
        subtotal: order.subtotal,
        shipping: order.shipping || 0,
        discount: order.discount || 0,
        total: order.total,
        payment_method: order.paymentMethod,
        payment_status: order.paymentStatus || 'pending',
        order_status: 'pending',
        coupon: order.coupon || '',
        delivery_note: order.deliveryNote || '',
      })
      .select('id')
      .single();
    if (orderError) throw orderError;
    if (items?.length) {
      const orderItems = items.map(item => ({
        order_id: orderResult.id,
        product_id: item.id,
        vendor_id: getVendorIdForProductId(item.id),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || (item.images ? item.images[0] : '') || '',
      }));
      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) console.warn('saveOrderItems error:', itemsError.message);
    }
    return orderResult;
  } catch (e) {
    console.error('saveOrder error:', e.message);
    return null;
  }
}

export async function fetchOrders(userId) {
  if (!isSupabaseConfigured) return [];
  try {
    let query = supabase.from('orders').select('*, order_items(*)').order('created_at', { ascending: false });
    if (userId) query = query.eq('user_id', userId);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (e) {
    console.error('fetchOrders error:', e.message);
    return [];
  }
}

function normalizeProduct(p) {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    collection: p.collection || '',
    category: p.category,
    price: Number(p.price),
    comparePrice: p.compare_price ? Number(p.compare_price) : 0,
    unit: p.unit || 'per yard',
    description: p.description || '',
    details: typeof p.details === 'string' ? JSON.parse(p.details) : (p.details || []),
    styleInspiration: typeof p.style_inspiration === 'string' ? JSON.parse(p.style_inspiration) : (p.style_inspiration || []),
    images: typeof p.images === 'string' ? JSON.parse(p.images) : (p.images || []),
    rating: Number(p.rating) || 0,
    reviews: p.reviews || 0,
    inStock: p.in_stock !== false,
    stockQuantity: p.stock_quantity || 0,
    soldQuantity: p.sold_quantity || 0,
    totalStock: p.total_stock || 0,
    status: p.status || 'active',
    featured: p.featured || false,
    discount: p.discount || 0,
    vendorId: p.vendor_id || getVendorIdForProductId(p.id),
  };
}
