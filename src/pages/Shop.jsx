import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Card, CardMedia, CardContent, CardActions,
  Button, FormControl, InputLabel, Select, MenuItem, Stack, Chip,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductBadge from '../components/ProductBadge';
import { getVendorForProduct } from '../data/vendors';
import SEO from '../components/SEO';
import { categories } from '../data/products';
import { useProducts } from '../services/useLiveData';
import { useCart } from '../contexts/CartContext';

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: '₦1,000 – ₦1,499', min: 1000, max: 1499 },
  { label: '₦1,500 – ₦1,999', min: 1500, max: 1999 },
  { label: '₦2,000 – ₦2,499', min: 2000, max: 2499 },
  { label: '₦2,500+', min: 2500, max: Infinity },
];

const Shop = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const [filter, setFilter] = useState(categoryParam === 'All' ? 'All' : categoryParam);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState(0);
  const { addItem } = useCart();
  const products = useProducts();

  const filteredProducts = useMemo(() => {
    let result = filter === 'All' ? [...products] : products.filter(p => p.category === filter);
    const range = PRICE_RANGES[priceRange];
    if (range && range.min > 0 || range?.max !== Infinity) {
      result = result.filter(p => p.price >= range.min && p.price <= range.max);
    }
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      default: break;
    }
    return result;
  }, [products, filter, sortBy, priceRange]);

  const expandedProducts = useMemo(() => {
    const expanded = filteredProducts.map(fabric => ({ ...fabric, imageIndex: 0, cardId: fabric.id }));
    return filter === 'All' ? expanded.slice(0, 12) : expanded;
  }, [filteredProducts, filter]);

  const clearFilters = () => {
    setFilter('All');
    setPriceRange(0);
    setSortBy('featured');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <SEO title="Shop Fabrics" description="Browse our curated collection of premium fabrics by the yard. Lace, silk, cotton, denim, brocade, and more — for all your sewing projects." />
      <Box sx={{ backgroundColor: '#1a1a1a', color: '#fff', py: 6, textAlign: 'center' }}>
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '1.8rem', md: '2.8rem' } }}>
            Shop Fabrics
          </Typography>
          <Typography variant="body1" sx={{ color: '#ccc', maxWidth: { xs: '100%', md: 600 }, mx: 'auto' }}>
            Premium fabrics by the yard — find the perfect material for your next creation
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }} alignItems="flex-start" flexWrap="wrap">
          <FormControl sx={{ minWidth: 180 }} size="small">
            <InputLabel>Category</InputLabel>
            <Select value={filter} label="Category" onChange={(e) => setFilter(e.target.value)}>
              <MenuItem value="All">All Fabrics</MenuItem>
              {categories.map(cat => (
                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 160 }} size="small">
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="featured">Featured</MenuItem>
              <MenuItem value="price-low">Price: Low to High</MenuItem>
              <MenuItem value="price-high">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel>Price Range</InputLabel>
            <Select value={priceRange} label="Price Range" onChange={(e) => setPriceRange(e.target.value)}>
              {PRICE_RANGES.map((r, i) => (
                <MenuItem key={i} value={i}>{r.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {(filter !== 'All' || priceRange > 0) && (
            <Button size="small" onClick={clearFilters} sx={{ color: '#666', fontWeight: 500 }}>
              Clear Filters
            </Button>
          )}
        </Stack>

        <Grid container spacing={3}>
          {expandedProducts.map((fabric) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={fabric.cardId}>
              <Card
                sx={{
                  height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer',
                  position: 'relative', transition: 'all 0.3s',
                  border: '1px solid', borderColor: 'divider', boxShadow: 'none', borderRadius: 2,
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' },
                }}
                onClick={() => navigate(`/shop/${fabric.slug}${fabric.imageIndex ? `?image=${fabric.imageIndex}` : ''}`)}
              >
                <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {fabric.status !== 'active' && (
                    <ProductBadge type={fabric.status} />
                  )}
                  {fabric.stockQuantity === 0 && fabric.status === 'active' && (
                    <ProductBadge type="sold-out" />
                  )}
                  {fabric.stockQuantity > 0 && fabric.stockQuantity <= 5 && fabric.status === 'active' && (
                    <ProductBadge type="almost-sold-out" />
                  )}
                  {fabric.isNew && <ProductBadge isNew />}
                </Box>
                {fabric.discount > 0 && (
                  <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, backgroundColor: '#ff6b6b', color: '#fff', padding: '2px 8px', fontSize: '0.7rem', fontWeight: 700, borderRadius: 1 }}>
                    -{fabric.discount}%
                  </Box>
                )}
                <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#f5f5f5', aspectRatio: '3/4' }}>
                  <CardMedia component="img" image={fabric.images[fabric.imageIndex]} alt={fabric.name} sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', '&:hover': { transform: 'scale(1.06)' } }} />
                </Box>
                <CardContent sx={{ flexGrow: 1, px: 2, pt: 2, pb: 1 }}>
                  <Typography variant="overline" sx={{ color: '#999', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{fabric.category}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, fontSize: '0.9rem', lineHeight: 1.3, minHeight: 42 }}>{fabric.name}</Typography>
                  {fabric.soldQuantity > 0 && (
                    <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 0.5, fontSize: '0.65rem' }}>
                      {fabric.soldQuantity} yards sold
                    </Typography>
                  )}
                  <Stack direction="row" spacing={1} alignItems="baseline" sx={{ mt: 'auto' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', color: '#ff6b6b' }}>
                      ₦{fabric.price.toFixed(2)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#999' }}>{fabric.unit}</Typography>
                    {fabric.comparePrice && (
                      <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#ccc', fontSize: '0.8rem' }}>
                        ₦{fabric.comparePrice.toFixed(2)}
                      </Typography>
                    )}
                  </Stack>
                  <Stack direction="row" spacing={0.5} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
                    {fabric.styleInspiration.slice(0, 2).map((style, i) => (
                      <Chip key={i} label={style} size="small" variant="outlined" sx={{ borderColor: '#ddd', fontSize: '0.65rem', height: 22 }} />
                    ))}
                  </Stack>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2, pt: 0, mt: 'auto' }}>
                  <Button fullWidth variant="contained" size="small" startIcon={<ShoppingCartIcon />}
                    onClick={(e) => { e.stopPropagation(); const v = getVendorForProduct(fabric.id); addItem({ id: fabric.id, name: fabric.name, price: fabric.price, image: fabric.images[fabric.imageIndex], vendorId: v?.id, inStock: fabric.inStock }); }}
                    sx={{ backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000' }, fontWeight: 600, fontSize: '0.8rem', borderRadius: 1.5 }}>
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {expandedProducts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>No fabrics match your filters.</Typography>
            <Button onClick={clearFilters} sx={{ color: 'text.primary', fontWeight: 600 }}>Clear Filters</Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Shop;
