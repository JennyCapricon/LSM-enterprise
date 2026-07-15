import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Card, CardMedia, CardContent,
  Button, Stack, IconButton, Chip, Modal,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import ProductBadge from '../components/ProductBadge';
import SEO from '../components/SEO';
import { collections, styleIdeas } from '../data/products';
import { getVendorForProduct } from '../data/vendors';
import { useProducts } from '../services/useLiveData';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const CollectionPage = ({ collectionId }) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const [selectedFabric, setSelectedFabric] = useState(null);
  const products = useProducts();

  const collection = collections.find(c => c.id === collectionId);
  const filteredProducts = products.filter(p => p.collection === collectionId);

  if (!collection) return null;

  return (
    <Box sx={{ width: '100%' }}>
      <SEO title={collection.name} description={collection.description} />
      <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', py: { xs: 4, md: 6 } }}>
        <Container maxWidth="xl">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ color: 'text.secondary', mb: 2, '&:hover': { color: 'text.primary' } }}
          >
            Back to Home
          </Button>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
            {collection.name}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: { xs: '100%', md: 600 } }}>
            {collection.description}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={3}>
          {filteredProducts.map((fabric) => (
            <Grid item xs={12} sm={6} md={4} key={fabric.id}>
              <Card
                sx={{
                  height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer',
                  position: 'relative', transition: 'all 0.3s',
                  border: '1px solid', borderColor: 'divider', boxShadow: 'none',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' },
                }}
                onClick={() => setSelectedFabric(fabric)}
              >
                <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {fabric.status !== 'active' && <ProductBadge type={fabric.status} />}
                  {fabric.stockQuantity === 0 && fabric.status === 'active' && <ProductBadge type="sold-out" />}
                  {fabric.stockQuantity > 0 && fabric.stockQuantity <= 5 && fabric.status === 'active' && <ProductBadge type="almost-sold-out" />}
                  {fabric.isNew && <ProductBadge isNew />}
                </Box>
                {fabric.discount > 0 && (
                  <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1, backgroundColor: '#ff6b6b', color: '#fff', padding: '2px 10px', fontSize: '0.75rem', fontWeight: 700 }}>
                    -{fabric.discount}%
                  </Box>
                )}
                <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
                  <CardMedia
                    component="img"
                    height={{ xs: 200, md: 300 }}
                    image={fabric.images[0]}
                    alt={fabric.name}
                    sx={{ objectFit: 'cover', transition: 'transform 0.5s', '&:hover': { transform: 'scale(1.06)' } }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, px: 2, pt: 2, pb: 2 }}>
                  <Typography variant="overline" sx={{ color: '#999', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
                    {fabric.category}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, fontSize: '1rem' }}>
                    {fabric.name}
                  </Typography>
                  {fabric.soldQuantity > 0 && (
                    <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 0.5, fontSize: '0.65rem' }}>
                      {fabric.soldQuantity} yards sold
                    </Typography>
                  )}
                  <Typography variant="body2" sx={{ color: '#666', mb: 1.5, lineHeight: 1.5, fontSize: '0.85rem' }}>
                    {fabric.description}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="baseline" sx={{ mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#ff6b6b' }}>
                      ₦{fabric.price.toFixed(2)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#999' }}>{fabric.unit}</Typography>
                    {fabric.comparePrice && (
                      <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#ccc', fontSize: '0.8rem' }}>
                        ₦{fabric.comparePrice.toFixed(2)}
                      </Typography>
                    )}
                  </Stack>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                    {fabric.styleInspiration.slice(0, 3).map((style, i) => (
                      <Chip key={i} label={style} size="small" variant="outlined" sx={{ borderColor: '#ddd', fontSize: '0.7rem', height: 24 }} />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredProducts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>No fabrics in this collection yet.</Typography>
            <Button onClick={() => navigate('/shop')} sx={{ color: 'text.primary', fontWeight: 600 }}>
              Browse All Fabrics
            </Button>
          </Box>
        )}
      </Container>

      {/* FABRIC DETAIL MODAL */}
      <Modal open={Boolean(selectedFabric)} onClose={() => setSelectedFabric(null)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Box sx={{ backgroundColor: '#fff', maxWidth: 800, width: '100%', maxHeight: '90vh', overflow: 'auto', borderRadius: 1, outline: 'none', position: 'relative' }}>
          {selectedFabric && (
            <>
              <IconButton onClick={() => setSelectedFabric(null)} sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2, backgroundColor: 'rgba(255,255,255,0.9)' }}>
                <CloseIcon />
              </IconButton>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Box sx={{ backgroundColor: '#f5f5f5' }}>
                    <Box component="img" src={selectedFabric.images[0]} alt={selectedFabric.name} sx={{ width: '100%', height: { xs: 250, md: 400 }, objectFit: 'cover' }} />
                  </Box>
                  {selectedFabric.images.length > 1 && (
                    <Stack direction="row" spacing={0.5} sx={{ p: 1, overflow: 'auto' }}>
                      {selectedFabric.images.map((img, idx) => (
                        <Box key={idx} component="img" src={img} alt="" sx={{ width: { xs: 48, md: 64 }, height: { xs: 48, md: 64 }, objectFit: 'cover', cursor: 'pointer', border: '1px solid', borderColor: 'divider', flexShrink: 0 }} />
                      ))}
                    </Stack>
                  )}
                </Grid>
                <Grid item xs={12} md={6} sx={{ p: 3 }}>
                  <Typography variant="overline" sx={{ color: '#999', fontSize: '0.65rem', letterSpacing: '0.1em' }}>{selectedFabric.category}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{selectedFabric.name}</Typography>
                  <Stack direction="row" spacing={1} alignItems="baseline" sx={{ mb: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#ff6b6b' }}>₦{selectedFabric.price.toFixed(2)}</Typography>
                    <Typography variant="caption" sx={{ color: '#999' }}>{selectedFabric.unit}</Typography>
                    {selectedFabric.comparePrice && (
                      <Typography variant="body1" sx={{ textDecoration: 'line-through', color: '#ccc' }}>₦{selectedFabric.comparePrice.toFixed(2)}</Typography>
                    )}
                  </Stack>
                  <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>{selectedFabric.description}</Typography>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Fabric Details</Typography>
                  <Stack spacing={0.5} sx={{ mb: 2 }}>
                    {selectedFabric.details.map((d, i) => (
                      <Typography key={i} variant="body2" sx={{ color: '#666', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#ff6b6b', flexShrink: 0 }} />
                        {d}
                      </Typography>
                    ))}
                  </Stack>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Style Inspiration</Typography>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                      {selectedFabric.styleInspiration.map((style, i) => (
                        <Chip key={i} label={style} size="small" variant="outlined" sx={{ borderColor: '#ddd', fontSize: '0.75rem', mb: 0.5 }} />
                      ))}
                    </Stack>
                  </Box>

                  <Stack direction="row" spacing={1}>
                    <Button variant="contained" startIcon={<ShoppingCartIcon />} onClick={() => { const v = getVendorForProduct(selectedFabric.id); addItem({ id: selectedFabric.id, name: selectedFabric.name, price: selectedFabric.price, image: selectedFabric.images[0], vendorId: v?.id, inStock: selectedFabric.inStock }); }} sx={{ backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000' }, flex: 1 }}>
                      Add to Cart
                    </Button>
                    <IconButton onClick={() => toggleItem({ id: selectedFabric.id, name: selectedFabric.name, price: selectedFabric.price, image: selectedFabric.images[0], inStock: selectedFabric.inStock })} sx={{ color: isInWishlist(selectedFabric.id) ? '#ff6b6b' : '#ccc', border: '1px solid', borderColor: 'divider' }}>
                      <FavoriteBorderIcon />
                    </IconButton>
                  </Stack>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default CollectionPage;
