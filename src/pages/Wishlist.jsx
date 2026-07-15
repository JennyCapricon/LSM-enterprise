import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Card, CardMedia, CardContent, CardActions,
  Button, IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SEO from '../components/SEO';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';

const Wishlist = () => {
  const navigate = useNavigate();
  const { items: wishlist, toggleItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  if (wishlist.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <SEO title="Wishlist" />
        <FavoriteIcon sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
        <Typography variant="h5" sx={{ color: '#1a1a1a', mb: 1, fontFamily: '"Playfair Display", serif' }}>
          Your Wishlist is Empty
        </Typography>
        <Typography variant="body1" sx={{ color: '#1a1a1a', mb: 3 }}>
          Save your favorite items here.
        </Typography>
        <Button
          variant="contained" onClick={() => navigate('/shop')}
          sx={{ backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000000' }, fontWeight: 600 }}
        >
          Browse Products
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <SEO title="Wishlist" />
      <Box sx={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)', color: '#f5f5f5', py: 4, textAlign: 'center' }}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>
            My Wishlist ({wishlist.length})
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />} onClick={() => navigate('/shop')}
          sx={{ color: '#1a1a1a', mb: 3, fontWeight: 600 }}
        >
          Continue Shopping
        </Button>
        <Grid container spacing={3}>
          {wishlist.map(item => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card
                sx={{
                  height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 40px rgba(44,24,16,0.15)' },
                }}
                onClick={() => navigate(`/shop/${item.id}`)}
              >
                <CardMedia component="img" height={{ xs: 200, md: 280 }} image={item.image} alt={item.name} sx={{ objectFit: 'cover' }} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', mt: 1 }}>
                    ₦{item.price.toLocaleString()}
                  </Typography>
                </CardContent>
                <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
                  <Button
                    fullWidth variant="contained" startIcon={<ShoppingCartIcon />}
                    onClick={(e) => { e.stopPropagation(); addItem(item); }}
                    sx={{ backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000000' }, fontWeight: 600 }}
                  >
                    Add to Cart
                  </Button>
                  <IconButton
                    onClick={(e) => { e.stopPropagation(); toggleItem(item); }}
                    sx={{ color: '#ff6b6b' }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Wishlist;
