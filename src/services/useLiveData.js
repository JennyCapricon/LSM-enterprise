import { useState, useEffect } from 'react';
import { products as staticProducts, categories as staticCategories } from '../data/products';
import { vendors as staticVendors } from '../data/vendors';
import { fetchProducts, fetchProductBySlug, fetchVendors, fetchCategories } from './supabaseService';

export function useProducts() {
  const [data, setData] = useState(staticProducts);
  useEffect(() => {
    fetchProducts().then(live => { if (live?.length) setData(live); }).catch(() => {});
  }, []);
  return data;
}

export function useProduct(slug) {
  const [data, setData] = useState(() => staticProducts.find(p => p.slug === slug));
  useEffect(() => {
    fetchProductBySlug(slug).then(live => { if (live) setData(live); }).catch(() => {});
  }, [slug]);
  return data;
}

export function useVendors() {
  const [data, setData] = useState(staticVendors);
  useEffect(() => {
    fetchVendors().then(live => { if (live?.length) setData(live); }).catch(() => {});
  }, []);
  return data;
}

export function useCategories() {
  const [data, setData] = useState(staticCategories);
  useEffect(() => {
    fetchCategories().then(live => { if (live?.length) setData(live); }).catch(() => {});
  }, []);
  return data;
}
