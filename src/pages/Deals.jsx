import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Card, CardMedia, CardContent, CardActions,
  Button, TextField, Stack, Paper,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductBadge from '../components/ProductBadge';
import SEO from '../components/SEO';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';

const Deals = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 12, minutes: 30, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter(p => p.discount > 0).slice(0, 4);
  const deals = dealProducts.map(p => ({
    id: p.id, name: p.name, originalPrice: p.comparePrice || Math.round(p.price / (1 - p.discount / 100)),
    dealPrice: p.price, discount: p.discount, image: p.images[0],
    soldQuantity: p.soldQuantity, stockQuantity: p.stockQuantity, status: p.status, isNew: p.isNew,
  }));

  const TimeUnit = ({ value, label }) => (
    <Box sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          fontSize: '2.5rem', fontWeight: 700, color: '#f5f5f5',
          backgroundColor: '#000000', padding: '12px 20px', borderRadius: 2,
          mb: 1, minWidth: '80px',
        }}
      >
        {String(value).padStart(2, '0')}
      </Box>
      <Typography variant="caption" sx={{ color: '#1a1a1a' }}>{label}</Typography>
    </Box>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <SEO title="Deals & Offers" description="Limited time offers on fashion apparel and accessories. Up to 40% off on selected items at JAY." />
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #ff6b6b 100%)',
          color: '#f5f5f5', py: 6, textAlign: 'center',
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, fontFamily: '"Playfair Display", serif' }}>
          Hot Deals & Offers
        </Typography>
        <Typography variant="h6" sx={{ color: '#e0e0e0' }}>
          Limited time offers – Up to 40% off!
        </Typography>
      </Box>

      <Container sx={{ py: 6 }}>
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
            color: '#f5f5f5', p: 4, textAlign: 'center', mb: 6, borderRadius: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
            Flash Sale Ends In:
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <TimeUnit value={timeLeft.days} label="Days" />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
          </Stack>
        </Paper>

        <Grid container spacing={3} sx={{ mb: 8 }}>
          {deals.map((deal) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={deal.id}>
              <Card
                sx={{
                  height: '100%', display: 'flex', flexDirection: 'column', position: 'relative',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { transform: 'scale(1.03)', boxShadow: '0 12px 40px rgba(44,24,16,0.15)' },
                }}
              >
                <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {deal.status !== 'active' && <ProductBadge type={deal.status} />}
                  {deal.stockQuantity === 0 && deal.status === 'active' && <ProductBadge type="sold-out" />}
                  {deal.stockQuantity > 0 && deal.stockQuantity <= 5 && deal.status === 'active' && <ProductBadge type="almost-sold-out" />}
                  {deal.isNew && <ProductBadge isNew />}
                </Box>
                <Box
                  sx={{
                    position: 'absolute', top: 10, right: 10,
                    backgroundColor: '#ff6b6b', color: '#1a1a1a',
                    padding: '6px 12px', borderRadius: 1, fontWeight: 700, zIndex: 1,
                  }}
                >
                  -{deal.discount}%
                </Box>
                <CardMedia
                  component="img" height="250"
                  image={deal.image} alt={deal.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
                    {deal.name}
                  </Typography>
                  {deal.soldQuantity > 0 && (
                    <Typography variant="caption" sx={{ color: '#999', display: 'block', mt: 0.5, fontSize: '0.7rem' }}>
                      {deal.soldQuantity} yards sold
                    </Typography>
                  )}
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
                    <Typography variant="body1" sx={{ textDecoration: 'line-through', color: '#ccc' }}>
                      ₦{deal.originalPrice.toLocaleString()}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                      ₦{deal.dealPrice.toLocaleString()}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    fullWidth variant="contained" startIcon={<ShoppingCartIcon />}
                    onClick={() => addItem({ id: deal.id, name: deal.name, price: deal.dealPrice, image: deal.image })}
                    sx={{ backgroundColor: '#ff6b6b', color: '#1a1a1a', fontWeight: 700, '&:hover': { backgroundColor: '#E8C9A0' } }}
                  >
                    Shop Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Newsletter */}
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
            color: '#f5f5f5', p: 6, textAlign: 'center', borderRadius: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
            Get Exclusive Deals In Your Inbox!
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ maxWidth: 500, mx: 'auto' }}>
            <TextField
              placeholder="Enter your email"
              type="email" variant="outlined" fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f5f5f5',
                  '& fieldset': { borderColor: '#ccc' },
                },
              }}
            />
            <Button
              variant="contained"
              size="large"
              sx={{ backgroundColor: '#ff6b6b', color: '#1a1a1a', fontWeight: 700, minWidth: 150, '&:hover': { backgroundColor: '#E8C9A0' } }}
            >
              Subscribe
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Deals;
