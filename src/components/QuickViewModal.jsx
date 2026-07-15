import React from 'react';
import {
  Dialog, DialogContent, Box, Typography, Grid, Button, Chip, Stack, IconButton,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloseIcon from '@mui/icons-material/Close';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { getVendorForProduct } from '../data/vendors';
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
      <Box sx={{ position: 'relative', backgroundColor: '#fff' }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, color: '#1a1a1a', backgroundColor: 'rgba(255,255,255,0.9)' }}>
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0 }}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box component="img" src={product.images[0]} alt={product.name} sx={{ width: '100%', height: { xs: 280, md: 460 }, objectFit: 'cover', display: 'block', backgroundColor: '#f5f5f5' }} />
            </Grid>
            <Grid item xs={12} md={6} sx={{ p: 3 }}>
              <Chip label={product.category.toUpperCase()} size="small" sx={{ backgroundColor: '#e0e0e0', color: '#000', fontWeight: 600, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{product.name}</Typography>
              <Stack direction="row" spacing={1} alignItems="baseline" sx={{ mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#ff6b6b' }}>₦{product.price.toFixed(2)}</Typography>
                <Typography variant="caption" sx={{ color: '#999' }}>{product.unit || 'per yard'}</Typography>
                {product.comparePrice && (
                  <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#ccc' }}>₦{product.comparePrice.toFixed(2)}</Typography>
                )}
                {product.discount > 0 && (
                  <Chip label={`-${product.discount}%`} size="small" sx={{ backgroundColor: '#ff6b6b', color: '#fff', fontWeight: 700 }} />
                )}
              </Stack>
              <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>{product.description}</Typography>

              {product.details && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>Fabric Details</Typography>
                  <Stack spacing={0.5}>
                    {product.details.slice(0, 3).map((detail, idx) => (
                      <Typography key={idx} variant="caption" sx={{ color: '#666', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#ff6b6b', flexShrink: 0 }} />
                        {detail}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              )}

              {product.styleInspiration && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>Style Ideas</Typography>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                    {product.styleInspiration.map((style, i) => (
                      <Chip key={i} label={style} size="small" variant="outlined" sx={{ borderColor: '#ddd', fontSize: '0.7rem' }} />
                    ))}
                  </Stack>
                </Box>
              )}

              {product.inStock ? (
                <Chip icon={<VerifiedUserIcon />} label="In Stock" size="small" sx={{ backgroundColor: '#e8f5e9', color: '#2e7d32', fontWeight: 600, mb: 2 }} />
              ) : (
                <Chip label="Out of Stock" size="small" sx={{ backgroundColor: '#ffebee', color: '#c62828', fontWeight: 600, mb: 2 }} />
              )}

              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Button variant="contained" size="small" startIcon={<ShoppingCartIcon />}
                  onClick={() => { const v = getVendorForProduct(product.id); addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0], vendorId: v?.id, inStock: product.inStock }); onClose(); }}
                  sx={{ backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000' }, fontWeight: 600 }}>
                  Add to Cart
                </Button>
                <IconButton size="small" onClick={() => toggleItem({ id: product.id, name: product.name, price: product.price, image: product.images[0], inStock: product.inStock })}
                  sx={{ color: isInWishlist(product.id) ? '#ff6b6b' : '#ccc', border: '1px solid', borderColor: 'divider' }}>
                  <FavoriteBorderIcon />
                </IconButton>
              </Stack>

              <Button size="small" onClick={() => { onClose(); navigate(`/shop/${product.slug}`); }}
                sx={{ color: '#1a1a1a', fontWeight: 600, textTransform: 'none' }}>
                View Full Details →
              </Button>

              <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LocalShippingIcon sx={{ fontSize: 16, color: '#666' }} />
                  <Typography variant="caption" sx={{ color: '#666' }}>Fast Shipping</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ContentCutIcon sx={{ fontSize: 16, color: '#666' }} />
                  <Typography variant="caption" sx={{ color: '#666' }}>Sold by Yard</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <VerifiedUserIcon sx={{ fontSize: 16, color: '#666' }} />
                  <Typography variant="caption" sx={{ color: '#666' }}>Quality Checked</Typography>
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
