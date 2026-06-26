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
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <SEO title="Wishlist" />
        <FavoriteIcon sx={{ fontSize: 80, color: '#C4A882', mb: 2 }} />
        <Typography variant="h5" sx={{ color: '#2C1810', mb: 1, fontFamily: '"Playfair Display", serif' }}>
          Your Wishlist is Empty
        </Typography>
        <Typography variant="body1" sx={{ color: '#8B7355', mb: 3 }}>
          Save your favorite items here.
        </Typography>
        <Button
          variant="contained" onClick={() => navigate('/shop')}
          sx={{ backgroundColor: '#8B7355', '&:hover': { backgroundColor: '#5C4A32' }, fontWeight: 600 }}
        >
          Browse Products
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <SEO title="Wishlist" />
      <Box sx={{ background: 'linear-gradient(135deg, #5C4A32 0%, #8B7355 100%)', color: '#FAF6F1', py: 4, textAlign: 'center' }}>
        <Container>
          <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>
            My Wishlist ({wishlist.length})
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />} onClick={() => navigate('/shop')}
          sx={{ color: '#8B7355', mb: 3, fontWeight: 600 }}
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
                <CardMedia component="img" height="250" image={item.image} alt={item.name} sx={{ objectFit: 'cover' }} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#8B7355', mt: 1 }}>
                    ₦{item.price.toLocaleString()}
                  </Typography>
                </CardContent>
                <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
                  <Button
                    fullWidth variant="contained" startIcon={<ShoppingCartIcon />}
                    onClick={(e) => { e.stopPropagation(); addItem(item); }}
                    sx={{ backgroundColor: '#8B7355', '&:hover': { backgroundColor: '#5C4A32' }, fontWeight: 600 }}
                  >
                    Add to Cart
                  </Button>
                  <IconButton
                    onClick={(e) => { e.stopPropagation(); toggleItem(item); }}
                    sx={{ color: '#D4A574' }}
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
