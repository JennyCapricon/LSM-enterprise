import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Paper, Button, Stack, Avatar, Card, CardContent,
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';
import SEO from '../components/SEO';
import { useVendors, useProducts } from '../services/useLiveData';

const Vendors = () => {
  const navigate = useNavigate();
  const vendors = useVendors();
  const products = useProducts();

  const vendorProductCounts = {};
  products.forEach(p => {
    const vId = p.vendorId || p.vendor_id;
    if (vId) vendorProductCounts[vId] = (vendorProductCounts[vId] || 0) + 1;
  });

  return (
    <Box sx={{ width: '100%' }}>
      <SEO title="Explore Vendors" description="Discover trusted fashion brands and designers on JAY." />
      <Box sx={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)', color: '#f5f5f5', py: 8, textAlign: 'center' }}>
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontFamily: '"Playfair Display", serif' }}>
            Explore Vendors
          </Typography>
          <Typography variant="h6" sx={{ color: '#e0e0e0', mb: 4 }}>
            Connect with trusted fashion brands from around the world
          </Typography>
          <Button
            variant="contained" size="large"
            onClick={() => navigate('/marketplace')}
            sx={{ backgroundColor: '#ff6b6b', color: '#1a1a1a', fontWeight: 700, '&:hover': { backgroundColor: '#E8C9A0' } }}
          >
            Become a Vendor
          </Button>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
          Verified Vendors
        </Typography>
        <Grid container spacing={3}>
          {vendors.map((vendor) => (
            <Grid item xs={12} sm={6} md={4} key={vendor.id}>
              <Card
                sx={{
                  border: '1px solid #e0e0e0', boxShadow: 'none', cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(44,24,16,0.12)' },
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{ width: 80, height: 80, bgcolor: '#ff6b6b', fontSize: 32, mx: 'auto', mb: 2 }}
                  >
                    {(vendor.businessName || vendor.name).charAt(0)}
                  </Avatar>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
                      {vendor.name}
                    </Typography>
                    {vendor.verified && <VerifiedIcon sx={{ color: '#ff6b6b', fontSize: 20 }} />}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 1 }}>
                    <StarIcon sx={{ color: '#ff6b6b', fontSize: 20 }} />
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#1a1a1a' }}>{vendor.rating}</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#1a1a1a' }}>
                    {vendorProductCounts[vendor.id] || 0} products • Since {vendor.since}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Vendors;
