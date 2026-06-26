import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Paper, IconButton, Button,
  Stack, Divider, Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SEO from '../components/SEO';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  const shipping = subtotal >= 10000 ? 0 : 1500;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <SEO title="Shopping Cart" />
        <ShoppingBagIcon sx={{ fontSize: 80, color: '#C4A882', mb: 2 }} />
        <Typography variant="h5" sx={{ color: '#2C1810', mb: 1, fontFamily: '"Playfair Display", serif' }}>
          Your Cart is Empty
        </Typography>
        <Typography variant="body1" sx={{ color: '#8B7355', mb: 3 }}>
          Looks like you haven't added anything yet.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/shop')}
          sx={{ backgroundColor: '#8B7355', '&:hover': { backgroundColor: '#5C4A32' }, fontWeight: 600 }}
        >
          Start Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <SEO title="Shopping Cart" />
      <Box sx={{ background: 'linear-gradient(135deg, #5C4A32 0%, #8B7355 100%)', color: '#FAF6F1', py: 4, textAlign: 'center' }}>
        <Container>
          <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>
            Shopping Cart
          </Typography>
          <Typography variant="body1" sx={{ color: '#E8DDD0' }}>{items.length} item{items.length > 1 ? 's' : ''} in your cart</Typography>
        </Container>
      </Box>

      <Container sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              {items.map((item) => (
                <Paper
                  key={item.id}
                  elevation={0}
                  sx={{ p: 2, display: 'flex', gap: 2, border: '1px solid #E8DDD0', borderRadius: 2 }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 1, cursor: 'pointer' }}
                    onClick={() => navigate(`/shop/${item.id}`)}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#8B7355', mt: 1 }}>
                      ₦{item.price.toLocaleString()}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        sx={{ border: '1px solid #C4A882', borderRadius: 1 }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ fontWeight: 600, px: 2 }}>{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        sx={{ border: '1px solid #C4A882', borderRadius: 1 }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => removeItem(item.id)}
                        sx={{ ml: 'auto', color: '#C4A882' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Stack>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/shop')}
              sx={{ color: '#8B7355', mt: 3, fontWeight: 600 }}
            >
              Continue Shopping
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid #E8DDD0', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C1810', mb: 3, fontFamily: '"Playfair Display", serif' }}>
                Order Summary
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" color="textSecondary">Subtotal</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>₦{subtotal.toLocaleString()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" color="textSecondary">Shipping</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {shipping === 0 ? 'FREE' : `₦${shipping.toLocaleString()}`}
                  </Typography>
                </Box>
                {shipping > 0 && (
                  <Typography variant="caption" sx={{ color: '#D4A574' }}>
                    Free shipping on orders over ₦10,000
                  </Typography>
                )}
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C1810' }}>Total</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#8B7355' }}>₦{total.toLocaleString()}</Typography>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/checkout')}
                  sx={{ backgroundColor: '#8B7355', '&:hover': { backgroundColor: '#5C4A32' }, fontWeight: 700, py: 1.5 }}
                >
                  Proceed to Checkout
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Cart;