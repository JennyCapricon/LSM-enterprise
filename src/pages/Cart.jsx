import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Paper, IconButton, Button,
  Stack, Divider, Chip, TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SEO from '../components/SEO';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const shipping = subtotal >= 10000 ? 0 : 1500;
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const handleApplyCoupon = () => {
    if (coupon.toLowerCase() === 'welcome10') {
      setCouponApplied(true);
    }
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <SEO title="Shopping Cart" />
        <ShoppingBagIcon sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
        <Typography variant="h5" sx={{ color: '#1a1a1a', mb: 1, fontFamily: '"Playfair Display", serif' }}>
          Your Cart is Empty
        </Typography>
        <Typography variant="body1" sx={{ color: '#1a1a1a', mb: 3 }}>
          Looks like you haven't added anything yet.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/shop')}
          sx={{ backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000000' }, fontWeight: 600 }}
        >
          Start Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <SEO title="Shopping Cart" />
      <Box sx={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)', color: '#f5f5f5', py: 4, textAlign: 'center' }}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>
            Shopping Cart
          </Typography>
          <Typography variant="body1" sx={{ color: '#e0e0e0' }}>{items.length} item{items.length > 1 ? 's' : ''} in your cart</Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              {items.map((item) => (
                <Paper
                  key={item.id}
                  elevation={0}
                  sx={{ p: 2, display: 'flex', gap: 2, border: '1px solid #e0e0e0', borderRadius: 2, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: '0 4px 16px rgba(44,24,16,0.06)' } }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{ width: { xs: 80, md: 130 }, height: { xs: 80, md: 130 }, objectFit: 'cover', borderRadius: 1, cursor: 'pointer', flexShrink: 0 }}
                    onClick={() => navigate(`/shop/${item.id}`)}
                  />
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', mt: 0.5 }}>
                      ₦{item.price.toLocaleString()}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto', pt: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        sx={{ border: '1px solid #ccc', borderRadius: 1, '&:hover': { backgroundColor: 'rgba(139,115,85,0.08)' } }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ fontWeight: 600, px: 2, minWidth: 30, textAlign: 'center' }}>{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        sx={{ border: '1px solid #ccc', borderRadius: 1, '&:hover': { backgroundColor: 'rgba(139,115,85,0.08)' } }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => removeItem(item.id)}
                        sx={{ ml: 'auto', color: '#ccc', '&:hover': { color: '#C62828' } }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Stack>
            <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/shop')}
                sx={{ color: '#1a1a1a', fontWeight: 600 }}
              >
                Continue Shopping
              </Button>
              <Button
                onClick={clearCart}
                sx={{ color: '#ccc', fontWeight: 500 }}
              >
                Clear Cart
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 2, fontFamily: '"Playfair Display", serif' }}>
                  Coupon Code
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Enter code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#ccc' } } }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleApplyCoupon}
                    disabled={!coupon || couponApplied}
                    sx={{ backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000000' }, fontWeight: 600, whiteSpace: 'nowrap' }}
                  >
                    Apply
                  </Button>
                </Box>
                {couponApplied && (
                  <Chip
                    icon={<LocalOfferIcon />}
                    label="10% OFF applied!"
                    size="small"
                    sx={{ mt: 1, backgroundColor: '#E8F5E9', color: '#2E7D32', fontWeight: 600 }}
                  />
                )}
                {coupon && !couponApplied && (
                  <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#1a1a1a' }}>
                    Try "WELCOME10" for 10% off
                  </Typography>
                )}
              </Paper>

              <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 3, fontFamily: '"Playfair Display", serif' }}>
                  Order Summary
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" color="textSecondary">Subtotal</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>₦{subtotal.toLocaleString()}</Typography>
                  </Box>
                  {couponApplied && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body1" color="textSecondary">Discount (10%)</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#2E7D32' }}>-₦{discount.toLocaleString()}</Typography>
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" color="textSecondary">Shipping</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {shipping === 0 ? 'FREE' : `₦${shipping.toLocaleString()}`}
                    </Typography>
                  </Box>
                  {shipping > 0 && (
                    <Typography variant="caption" sx={{ color: '#ff6b6b' }}>
                      Free shipping on orders over ₦10,000
                    </Typography>
                  )}
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>Total</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>₦{total.toLocaleString()}</Typography>
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/checkout')}
                    sx={{ backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000000' }, fontWeight: 700, py: 1.5 }}
                  >
                    Proceed to Checkout
                  </Button>
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Cart;
