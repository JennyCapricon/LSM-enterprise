import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Button, Chip, Stack, IconButton, Divider,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ProductBadge from '../components/ProductBadge';
import SEO from '../components/SEO';
import { categories, products as staticProducts } from '../data/products';
import { getVendorForProduct } from '../data/vendors';
import { useProduct, useProducts } from '../services/useLiveData';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useRecentlyViewed } from '../contexts/RecentlyViewedContext';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { addItem: addRecent } = useRecentlyViewed();
  const imageParam = searchParams.get('image');
  const [selectedImage, setSelectedImage] = useState(imageParam ? Number(imageParam) : 0);

  const fabric = useProduct(slug);
  const allProducts = useProducts();

  useEffect(() => {
    if (fabric) {
      addRecent({ id: fabric.id, name: fabric.name, price: fabric.price, image: fabric.images[0], slug: fabric.slug, category: fabric.category });
    }
  }, [fabric, addRecent]);

  if (!fabric) {
    return (
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ color: '#666', mb: 2 }}>Fabric Not Found</Typography>
        <Button variant="contained" onClick={() => navigate('/shop')} sx={{ backgroundColor: '#1a1a1a' }}>Back to Shop</Button>
      </Container>
    );
  }

  const relatedProducts = allProducts
    .filter(p => p.category === fabric.category && p.id !== fabric.id)
    .slice(0, 4);

  return (
    <Box sx={{ width: '100%' }}>
      <SEO title={fabric.name} description={fabric.description} image={fabric.images[0]} />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/shop')} sx={{ color: '#666', mb: 2, fontWeight: 500, '&:hover': { color: '#1a1a1a' } }}>
          Back to Shop
        </Button>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box component="img" src={fabric.images[selectedImage]} alt={fabric.name}
              sx={{ width: '100%', height: { xs: 300, md: 480 }, objectFit: 'cover', backgroundColor: '#f5f5f5' }} />
            {fabric.images.length > 1 && (
              <Stack direction="row" spacing={1} sx={{ mt: 1.5, overflow: 'auto' }}>
                {fabric.images.map((img, idx) => (
                  <Box key={idx} component="img" src={img} alt=""
                    onClick={() => setSelectedImage(idx)}
                    sx={{ width: { xs: 56, md: 72 }, height: { xs: 56, md: 72 }, objectFit: 'cover', cursor: 'pointer', border: selectedImage === idx ? '2px solid #1a1a1a' : '2px solid transparent', opacity: selectedImage === idx ? 1 : 0.5, flexShrink: 0 }} />
                ))}
              </Stack>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="overline" sx={{ color: '#999', fontSize: '0.65rem', letterSpacing: '0.1em' }}>{fabric.category}</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1.5, fontSize: { xs: '1.5rem', md: '2rem' } }}>{fabric.name}</Typography>

            <Stack direction="row" spacing={1.5} alignItems="baseline" sx={{ mb: 2 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#ff6b6b', fontSize: { xs: '1.5rem', md: '2rem' } }}>
                ₦{fabric.price.toFixed(2)}
              </Typography>
              <Typography variant="body1" sx={{ color: '#999' }}>{fabric.unit}</Typography>
              {fabric.comparePrice && (
                <>
                  <Typography variant="body1" sx={{ textDecoration: 'line-through', color: '#ccc' }}>₦{fabric.comparePrice.toFixed(2)}</Typography>
                  {fabric.discount > 0 && (
                    <Chip label={`-${fabric.discount}%`} size="small" sx={{ backgroundColor: '#ff6b6b', color: '#fff', fontWeight: 700, fontSize: '0.7rem' }} />
                  )}
                </>
              )}
            </Stack>

            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 3 }}>{fabric.description}</Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Fabric Details</Typography>
            <Stack spacing={0.5} sx={{ mb: 3 }}>
              {fabric.details.map((detail, idx) => (
                <Typography key={idx} variant="body2" sx={{ color: '#666', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#ff6b6b', flexShrink: 0 }} />
                  {detail}
                </Typography>
              ))}
            </Stack>

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Style Ideas</Typography>
            <Stack direction="row" spacing={0.5} sx={{ mb: 3 }} flexWrap="wrap" useFlexGap>
              {fabric.styleInspiration.map((style, i) => (
                <Chip key={i} label={style} variant="outlined" sx={{ borderColor: '#ddd', fontSize: '0.8rem' }} />
              ))}
            </Stack>

            <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
              {fabric.status !== 'active' && <ProductBadge type={fabric.status} />}
              {fabric.stockQuantity === 0 && fabric.status === 'active' && <ProductBadge type="sold-out" />}
              {fabric.stockQuantity > 0 && fabric.stockQuantity <= 5 && fabric.status === 'active' && <ProductBadge type="almost-sold-out" />}
              {fabric.discount > 0 && fabric.stockQuantity > 0 && <ProductBadge type="new-deal" discount={fabric.discount} />}
              {fabric.isNew && <ProductBadge isNew />}
            </Stack>

            {fabric.inStock && fabric.stockQuantity > 0 ? (
              <Chip icon={<VerifiedUserIcon />} label={`In Stock (${fabric.stockQuantity} yards) — Ready to Ship`} sx={{ backgroundColor: '#e8f5e9', color: '#2e7d32', fontWeight: 600, mb: 2 }} />
            ) : fabric.stockQuantity === 0 && fabric.status === 'active' ? (
              <Chip label="Sold Out — No Stock Available" sx={{ backgroundColor: '#ffebee', color: '#c62828', fontWeight: 600, mb: 2 }} />
            ) : fabric.status === 'finished' ? (
              <Chip label="Finished — No Longer Produced" sx={{ backgroundColor: '#f3e5f5', color: '#4a148c', fontWeight: 600, mb: 2 }} />
            ) : fabric.status === 'out-of-market' ? (
              <Chip label="Out of Market — Discontinued" sx={{ backgroundColor: '#f3e5f5', color: '#4a148c', fontWeight: 600, mb: 2 }} />
            ) : (
              <Chip label="Out of Stock" sx={{ backgroundColor: '#ffebee', color: '#c62828', fontWeight: 600, mb: 2 }} />
            )}

            {fabric.soldQuantity > 0 && (
              <Typography variant="body2" sx={{ color: '#666', mb: 1.5 }}>
                {fabric.soldQuantity} yards sold{fabric.totalStock ? ` out of ${fabric.totalStock}` : ''}
              </Typography>
            )}
            {fabric.stockQuantity > 0 && fabric.stockQuantity <= 10 && fabric.status === 'active' && (
              <Typography variant="body2" sx={{ color: '#e65100', fontWeight: 600, mb: 1.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                ⚡ Only {fabric.stockQuantity} yards left — order soon!
              </Typography>
            )}

            <Stack direction="row" spacing={2} sx={{ mb: 3, mt: 1 }}>
              <Button variant="contained" size="large" startIcon={<ShoppingCartIcon />}
                onClick={() => { const v = getVendorForProduct(fabric.id); addItem({ id: fabric.id, name: fabric.name, price: fabric.price, image: fabric.images[0], vendorId: v?.id, inStock: fabric.inStock }); }}
                sx={{ backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000' }, fontWeight: 600, px: 4, py: 1.5 }}>
                Add to Cart
              </Button>
              <IconButton onClick={() => toggleItem({ id: fabric.id, name: fabric.name, price: fabric.price, image: fabric.images[0], inStock: fabric.inStock })}
                sx={{ color: isInWishlist(fabric.id) ? '#ff6b6b' : '#ccc', border: '1px solid', borderColor: 'divider' }}>
                <FavoriteBorderIcon />
              </IconButton>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalShippingIcon sx={{ color: '#666', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: '#666' }}>Fast Shipping</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ContentCutIcon sx={{ color: '#666', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: '#666' }}>Sold by the Yard</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <VerifiedUserIcon sx={{ color: '#666', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: '#666' }}>Quality Guaranteed</Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {relatedProducts.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
              More {categories.find(c => c.id === fabric.category)?.name || 'Fabrics'}
            </Typography>
            <Grid container spacing={2}>
              {relatedProducts.map(rp => (
                <Grid item xs={6} md={3} key={rp.id}>
                  <Box
                    onClick={() => navigate(`/shop/${rp.slug}`)}
                    sx={{ cursor: 'pointer', border: '1px solid', borderColor: 'divider', transition: 'all 0.3s', position: 'relative', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' } }}>
                    <Box sx={{ position: 'absolute', top: 6, left: 6, zIndex: 1, display: 'flex', flexDirection: 'column', gap: 0.3 }}>
                      {rp.status !== 'active' && <ProductBadge type={rp.status} />}
                      {rp.stockQuantity === 0 && rp.status === 'active' && <ProductBadge type="sold-out" />}
                      {rp.stockQuantity > 0 && rp.stockQuantity <= 5 && rp.status === 'active' && <ProductBadge type="almost-sold-out" />}
                      {rp.isNew && <ProductBadge isNew />}
                    </Box>
                    <Box component="img" src={rp.images[0]} alt={rp.name} sx={{ width: '100%', height: { xs: 160, md: 240 }, objectFit: 'cover', backgroundColor: '#f5f5f5' }} />
                    <Box sx={{ p: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>{rp.name}</Typography>
                      {rp.soldQuantity > 0 && (
                        <Typography variant="caption" sx={{ color: '#999', display: 'block', fontSize: '0.65rem' }}>
                          {rp.soldQuantity} sold
                        </Typography>
                      )}
                      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#ff6b6b' }}>₦{rp.price.toFixed(2)}</Typography>
                    </Box>
                  </Box>
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
