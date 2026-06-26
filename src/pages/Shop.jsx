import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Card, CardMedia, CardContent, CardActions,
  Button, FormControl, InputLabel, Select, MenuItem, Rating, Stack, IconButton, Tooltip,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SEO from '../components/SEO';
import QuickViewModal from '../components/QuickViewModal';
import { products, categories } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const Shop = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const [filter, setFilter] = useState(categoryParam === 'All' ? 'All' : categoryParam);
  const [sortBy, setSortBy] = useState('featured');
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    let result = filter === 'All' ? [...products] : products.filter(p => p.category === filter);
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return result;
  }, [filter, sortBy]);

  return (
    <Box sx={{ width: '100%' }}>
      <SEO title="Shop" description="Browse our collection of premium African fabrics. Jonkoso, Lace, Silk, Scuba, Duchess, Crepe, Stockflow, Stripe, Cubana, Vintage, and more." />
      <Box
        sx={{
          background: 'linear-gradient(135deg, #5C4A32 0%, #8B7355 100%)',
          color: '#FAF6F1', py: 6, textAlign: 'center',
        }}
      >
        <Container>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontFamily: '"Playfair Display", serif' }}>
            Shop Our Collection
          </Typography>
          <Typography variant="h6" sx={{ color: '#E8DDD0' }}>
            Discover premium fabrics for every occasion
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 4 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel sx={{ color: '#6B5B4F' }}>Category</InputLabel>
            <Select
              value={filter}
              label="Category"
              onChange={(e) => setFilter(e.target.value)}
              sx={{ '&.MuiOutlinedInput-root': { '& fieldset': { borderColor: '#C4A882' } } }}
            >
              <MenuItem value="All">All Categories</MenuItem>
              {categories.map(cat => (
                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel sx={{ color: '#6B5B4F' }}>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
              sx={{ '&.MuiOutlinedInput-root': { '& fieldset': { borderColor: '#C4A882' } } }}
            >
              <MenuItem value="featured">Featured</MenuItem>
              <MenuItem value="price-low">Price: Low to High</MenuItem>
              <MenuItem value="price-high">Price: High to Low</MenuItem>
              <MenuItem value="rating">Top Rated</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
              <Card
                sx={{
                  height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer',
                  position: 'relative', transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 40px rgba(44,24,16,0.15)' },
                }}
                onClick={() => navigate(`/shop/${product.slug}`)}
              >
                {product.discount > 0 && (
                  <Box
                    sx={{
                      position: 'absolute', top: 10, right: 10,
                      backgroundColor: '#D4A574', color: '#2C1810',
                      padding: '4px 12px', borderRadius: 1, fontWeight: 700, zIndex: 1,
                    }}
                  >
                    -{product.discount}%
                  </Box>
                )}
                <CardMedia
                  component="img"
                  height="250"
                  image={product.images[0]}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
                    {product.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, mt: 1 }}>
                    <Rating value={product.rating} readOnly precision={0.1} size="small" sx={{ '& .MuiRating-iconFilled': { color: '#D4A574' } }} />
                    <Typography variant="caption" color="textSecondary">({product.rating})</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    {product.comparePrice && (
                      <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#C4A882' }}>
                        ₦{product.comparePrice.toLocaleString()}
                      </Typography>
                    )}
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#8B7355' }}>
                      ₦{product.price.toLocaleString()}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ pt: 0, px: 2, pb: 2, flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                    <Button
                      fullWidth variant="contained" startIcon={<ShoppingCartIcon />}
                      onClick={(e) => { e.stopPropagation(); addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0] }); }}
                      sx={{ backgroundColor: '#8B7355', '&:hover': { backgroundColor: '#5C4A32' }, fontWeight: 600 }}
                    >
                      Add to Cart
                    </Button>
                    <IconButton
                      onClick={(e) => { e.stopPropagation(); toggleItem({ id: product.id, name: product.name, price: product.price, image: product.images[0] }); }}
                      sx={{ color: isInWishlist(product.id) ? '#D4A574' : '#C4A882' }}
                    >
                      <FavoriteBorderIcon />
                    </IconButton>
                  </Box>
                  <Tooltip title="Quick View" arrow>
                    <Button
                      fullWidth
                      variant="text"
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={(e) => { e.stopPropagation(); setQuickViewProduct(product); }}
                      sx={{ color: '#8B7355', fontWeight: 500, textTransform: 'none', '&:hover': { backgroundColor: 'rgba(139,115,85,0.08)' } }}
                    >
                      Quick View
                    </Button>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        {filteredProducts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: '#8B7355' }}>No products found in this category.</Typography>
          </Box>
        )}
      </Container>

      <QuickViewModal
        open={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        product={quickViewProduct}
      />
    </Box>
  );
};

export default Shop;
