import React from 'react';
import {
  Dialog, DialogContent, Box, Typography, Grid, Button, Rating, Chip, Stack, IconButton,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloseIcon from '@mui/icons-material/Close';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useNavigate } from 'react-router-dom';

const QuickViewModal = ({ open, onClose, product }) => {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box sx={{ position: 'relative', backgroundColor: '#FAF6F1' }}>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, color: '#8B7355' }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0 }}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={product.images[0]}
                alt={product.name}
                sx={{
                  width: '100%', height: { xs: 280, md: 460 },
                  objectFit: 'cover', display: 'block',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ p: 3 }}>
              <Chip
                label={product.category.toUpperCase()}
                size="small"
                sx={{ backgroundColor: '#E8DDD0', color: '#5C4A32', fontWeight: 600, mb: 1 }}
              />
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: '#2C1810', mb: 1, fontFamily: '"Playfair Display", serif' }}
              >
                {product.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Rating value={product.rating} readOnly precision={0.1} size="small" sx={{ '& .MuiRating-iconFilled': { color: '#D4A574' } }} />
                <Typography variant="body2" color="textSecondary">
                  {product.rating} ({product.reviews} reviews)
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'baseline', mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#8B7355' }}>
                  ₦{product.price.toLocaleString()}
                </Typography>
                {product.comparePrice && (
                  <Typography variant="body1" sx={{ textDecoration: 'line-through', color: '#C4A882' }}>
                    ₦{product.comparePrice.toLocaleString()}
                  </Typography>
                )}
                {product.discount > 0 && (
                  <Chip label={`-${product.discount}% OFF`} size="small" sx={{ backgroundColor: '#D4A574', color: '#2C1810', fontWeight: 700 }} />
                )}
              </Box>
              <Typography variant="body2" sx={{ color: '#6B5B4F', lineHeight: 1.8, mb: 2 }}>
                {product.description}
              </Typography>
              {product.details && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#2C1810', mb: 0.5 }}>
                    Product Details
                  </Typography>
                  <Stack spacing={0.5}>
                    {product.details.slice(0, 3).map((detail, idx) => (
                      <Typography key={idx} variant="caption" sx={{ color: '#6B5B4F', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#D4A574', flexShrink: 0 }} />
                        {detail}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              )}
              {product.inStock ? (
                <Chip icon={<VerifiedUserIcon />} label="In Stock" size="small" sx={{ backgroundColor: '#E8F5E9', color: '#2E7D32', fontWeight: 600, mb: 2 }} />
              ) : (
                <Chip label="Out of Stock" size="small" sx={{ backgroundColor: '#FFEBEE', color: '#C62828', fontWeight: 600, mb: 2 }} />
              )}
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => { addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0] }); onClose(); }}
                  sx={{ backgroundColor: '#8B7355', '&:hover': { backgroundColor: '#5C4A32' }, fontWeight: 600 }}
                >
                  Add to Cart
                </Button>
                <IconButton
                  size="small"
                  onClick={() => toggleItem({ id: product.id, name: product.name, price: product.price, image: product.images[0] })}
                  sx={{ color: isInWishlist(product.id) ? '#D4A574' : '#C4A882', border: '1px solid #C4A882' }}
                >
                  <FavoriteBorderIcon />
                </IconButton>
              </Stack>
              <Button
                size="small"
                onClick={() => { onClose(); navigate(`/shop/${product.slug}`); }}
                sx={{ color: '#8B7355', fontWeight: 600, textTransform: 'none' }}
              >
                View Full Details →
              </Button>
              <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LocalShippingIcon sx={{ fontSize: 16, color: '#8B7355' }} />
                  <Typography variant="caption" sx={{ color: '#6B5B4F' }}>Free Shipping</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AssignmentReturnIcon sx={{ fontSize: 16, color: '#8B7355' }} />
                  <Typography variant="caption" sx={{ color: '#6B5B4F' }}>30-Day Returns</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <VerifiedUserIcon sx={{ fontSize: 16, color: '#8B7355' }} />
                  <Typography variant="caption" sx={{ color: '#6B5B4F' }}>Secure Checkout</Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default QuickViewModal;
