import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Paper, Button, Stack, Card, CardContent,
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleIcon from '@mui/icons-material/People';
import VerifiedIcon from '@mui/icons-material/Verified';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SEO from '../components/SEO';

const Marketplace = () => {
  const navigate = useNavigate();

  const benefits = [
    { icon: <PeopleIcon sx={{ fontSize: 48 }} />, title: 'Access Serious Buyers', description: 'Connect with thousands of verified businesses and fashion designers looking for quality materials.' },
    { icon: <VerifiedIcon sx={{ fontSize: 48 }} />, title: 'Verified & Trusted', description: 'Our verification system ensures you deal with genuine buyers and sellers. No fraud, no stress.' },
    { icon: <TrendingUpIcon sx={{ fontSize: 48 }} />, title: 'Grow Your Business', description: 'Scale your reach beyond your local market. List products, manage orders, and track growth.' },
    { icon: <StorefrontIcon sx={{ fontSize: 48 }} />, title: 'Easy Listing', description: 'Create your storefront in minutes. Upload products, set prices, and start selling.' },
  ];

  const steps = [
    { number: '01', title: 'Create Your Account', description: 'Sign up as a vendor and complete your profile verification.' },
    { number: '02', title: 'Set Up Your Store', description: 'List your products with images, descriptions, and prices.' },
    { number: '03', title: 'Receive Orders', description: 'Get notified when buyers place orders and manage them from your dashboard.' },
    { number: '04', title: 'Get Paid', description: 'Receive payments securely through Paystack. Withdraw anytime.' },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <SEO title="Marketplace" description="Join LSM Enterprise marketplace. Connect with buyers and sellers of premium African fabrics." />
      <Box sx={{ background: 'linear-gradient(135deg, #5C4A32 0%, #8B7355 100%)', color: '#FAF6F1', py: 8, textAlign: 'center' }}>
        <Container>
          <StorefrontIcon sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontFamily: '"Playfair Display", serif' }}>
            LSM Marketplace
          </Typography>
          <Typography variant="h6" sx={{ color: '#E8DDD0', mb: 4, maxWidth: 600, mx: 'auto' }}>
            The premier marketplace for African fashion fabrics. Connect vendors with buyers on a secure, trusted platform.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained" size="large"
              onClick={() => navigate('/register')}
              sx={{ backgroundColor: '#D4A574', color: '#2C1810', fontWeight: 700, '&:hover': { backgroundColor: '#E8C9A0' } }}
            >
              Start Selling
            </Button>
            <Button
              variant="outlined" size="large"
              onClick={() => navigate('/shop')}
              sx={{ borderColor: '#D4A574', color: '#FAF6F1', fontWeight: 600, '&:hover': { backgroundColor: 'rgba(212,165,116,0.15)' } }}
            >
              Start Buying
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center', color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
          Why Join Our Marketplace?
        </Typography>
        <Grid container spacing={3}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper elevation={0} sx={{ p: 3, textAlign: 'center', border: '1px solid #E8DDD0', borderRadius: 2, height: '100%' }}>
                <Box sx={{ color: '#8B7355', mb: 2 }}>{benefit.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
                  {benefit.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#6B5B4F' }}>{benefit.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ backgroundColor: '#FAF6F1', py: 8, borderTop: '1px solid #E8DDD0', borderBottom: '1px solid #E8DDD0' }}>
        <Container>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 6, textAlign: 'center', color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
            How It Works
          </Typography>
          <Grid container spacing={3}>
            {steps.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 64, height: 64, borderRadius: '50%',
                      backgroundColor: '#D4A574', color: '#2C1810',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.5rem', fontWeight: 800, mx: 'auto', mb: 2,
                    }}
                  >
                    {step.number}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6B5B4F' }}>{step.description}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container sx={{ py: 8 }}>
        <Paper elevation={0} sx={{ p: 6, textAlign: 'center', border: '1px solid #E8DDD0', borderRadius: 2, backgroundColor: '#FAF6F1' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
            Ready to Join?
          </Typography>
          <Typography variant="body1" sx={{ color: '#8B7355', mb: 4, maxWidth: 500, mx: 'auto' }}>
            Whether you're a vendor looking to sell or a buyer looking for quality fabrics, LSM Marketplace is the place.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained" size="large"
              onClick={() => navigate('/register')}
              sx={{ backgroundColor: '#8B7355', '&:hover': { backgroundColor: '#5C4A32' }, fontWeight: 700, px: 4 }}
            >
              Join as Vendor
            </Button>
            <Button
              variant="outlined" size="large"
              onClick={() => navigate('/shop')}
              sx={{ borderColor: '#C4A882', color: '#6B5B4F', fontWeight: 600, px: 4 }}
            >
              Browse Products
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Marketplace;
