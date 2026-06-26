import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Button, Rating, Chip, Stack, IconButton,
  Divider, Paper,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SEO from '../components/SEO';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: '#8B7355', mb: 2 }}>Product Not Found</Typography>
        <Button variant="contained" onClick={() => navigate('/shop')} sx={{ backgroundColor: '#8B7355' }}>
          Back to Shop
        </Button>
      </Container>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Box sx={{ width: '100%' }}>
      <SEO title={product.name} description={product.description} image={product.images[0]} />
      <Container sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/shop')}
          sx={{ color: '#8B7355', mb: 2, fontWeight: 600 }}
        >
          Back to Shop
        </Button>

        <Grid container spacing={4}>
          {/* Image Gallery */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={product.images[selectedImage]}
              alt={product.name}
              sx={{
                width: '100%', height: { xs: 300, md: 500 },
                objectFit: 'cover', borderRadius: 2,
                boxShadow: '0 4px 20px rgba(44,24,16,0.12)',
              }}
            />
            {product.images.length > 1 && (
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                {product.images.map((img, idx) => (
                  <Box
                    key={idx}
                    component="img"
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    onClick={() => setSelectedImage(idx)}
                    sx={{
                      width: 80, height: 80, objectFit: 'cover', borderRadius: 1,
                      cursor: 'pointer', border: selectedImage === idx ? '2px solid #8B7355' : '2px solid transparent',
                      opacity: selectedImage === idx ? 1 : 0.6,
                      transition: 'all 0.2s',
                      '&:hover': { opacity: 1 },
                    }}
                  />
                ))}
              </Stack>
            )}
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={6}>
            <Chip
              label={product.category.toUpperCase()}
              size="small"
              sx={{ backgroundColor: '#E8DDD0', color: '#5C4A32', fontWeight: 600, mb: 1 }}
            />
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#2C1810', mb: 1, fontFamily: '"Playfair Display", serif' }}>
              {product.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Rating value={product.rating} readOnly precision={0.1} sx={{ '& .MuiRating-iconFilled': { color: '#D4A574' } }} />
              <Typography variant="body2" color="textSecondary">
                {product.rating} ({product.reviews} reviews)
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'baseline', mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#8B7355' }}>
                ₦{product.price.toLocaleString()}
              </Typography>
              {product.comparePrice && (
                <Typography variant="h6" sx={{ textDecoration: 'line-through', color: '#C4A882' }}>
                  ₦{product.comparePrice.toLocaleString()}
                </Typography>
              )}
              {product.discount > 0 && (
                <Chip label={`-${product.discount}% OFF`} size="small" sx={{ backgroundColor: '#D4A574', color: '#2C1810', fontWeight: 700 }} />
              )}
            </Box>

            <Typography variant="body1" sx={{ color: '#6B5B4F', lineHeight: 1.8, mb: 3 }}>
              {product.description}
            </Typography>

            {product.details && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#2C1810', mb: 1 }}>
                  Product Details
                </Typography>
                <Stack spacing={0.5}>
                  {product.details.map((detail, idx) => (
                    <Typography key={idx} variant="body2" sx={{ color: '#6B5B4F', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#D4A574', flexShrink: 0 }} />
                      {detail}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            )}

            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0] })}
                sx={{ backgroundColor: '#8B7355', '&:hover': { backgroundColor: '#5C4A32' }, fontWeight: 600, px: 4 }}
              >
                Add to Cart
              </Button>
              <IconButton
                onClick={() => toggleItem({ id: product.id, name: product.name, price: product.price, image: product.images[0] })}
                sx={{ color: isInWishlist(product.id) ? '#D4A574' : '#C4A882', border: '1px solid #C4A882' }}
              >
                <FavoriteBorderIcon />
              </IconButton>
            </Stack>

            {product.inStock ? (
              <Chip icon={<VerifiedUserIcon />} label="In Stock" sx={{ backgroundColor: '#E8F5E9', color: '#2E7D32', fontWeight: 600, mb: 2 }} />
            ) : (
              <Chip label="Out of Stock" sx={{ backgroundColor: '#FFEBEE', color: '#C62828', fontWeight: 600, mb: 2 }} />
            )}

            <Divider sx={{ my: 2 }} />

            <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalShippingIcon sx={{ color: '#8B7355' }} />
                <Typography variant="body2" sx={{ color: '#6B5B4F' }}>Free Shipping</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AssignmentReturnIcon sx={{ color: '#8B7355' }} />
                <Typography variant="body2" sx={{ color: '#6B5B4F' }}>30-Day Returns</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <VerifiedUserIcon sx={{ color: '#8B7355' }} />
                <Typography variant="body2" sx={{ color: '#6B5B4F' }}>Secure Checkout</Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#2C1810', mb: 3, fontFamily: '"Playfair Display", serif' }}>
              Related Products
            </Typography>
            <Grid container spacing={3}>
              {relatedProducts.map(rp => (
                <Grid item xs={12} sm={6} md={3} key={rp.id}>
                  <Paper
                    elevation={0}
                    onClick={() => navigate(`/shop/${rp.slug}`)}
                    sx={{
                      cursor: 'pointer', borderRadius: 2, overflow: 'hidden',
                      border: '1px solid #E8DDD0', transition: 'all 0.3s',
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(44,24,16,0.12)' },
                    }}
                  >
                    <Box component="img" src={rp.images[0]} alt={rp.name} sx={{ width: '100%', height: 200, objectFit: 'cover' }} />
                    <Box sx={{ p: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2C1810' }}>{rp.name}</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#8B7355' }}>₦{rp.price.toLocaleString()}</Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductDetail;
