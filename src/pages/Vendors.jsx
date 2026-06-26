import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Paper, Button, Stack, Avatar, Card, CardContent,
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';
import SEO from '../components/SEO';

const Vendors = () => {
  const navigate = useNavigate();

  const vendors = [
    { name: 'Lagos Fabrics Co.', rating: 4.8, products: 45, verified: true, since: '2021' },
    { name: 'Premium Textiles NG', rating: 4.9, products: 32, verified: true, since: '2020' },
    { name: 'African Lace House', rating: 4.7, products: 28, verified: true, since: '2022' },
    { name: 'Silk & Satin Ltd', rating: 4.6, products: 18, verified: false, since: '2023' },
    { name: 'Brocade World', rating: 4.8, products: 52, verified: true, since: '2020' },
    { name: 'Cotton Craft NG', rating: 4.5, products: 15, verified: true, since: '2022' },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <SEO title="Explore Vendors" description="Discover verified vendors of premium African fabrics on LSM Enterprise." />
      <Box sx={{ background: 'linear-gradient(135deg, #5C4A32 0%, #8B7355 100%)', color: '#FAF6F1', py: 8, textAlign: 'center' }}>
        <Container>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontFamily: '"Playfair Display", serif' }}>
            Explore Vendors
          </Typography>
          <Typography variant="h6" sx={{ color: '#E8DDD0', mb: 4 }}>
            Connect with trusted suppliers of premium African fabrics
          </Typography>
          <Button
            variant="contained" size="large"
            onClick={() => navigate('/marketplace')}
            sx={{ backgroundColor: '#D4A574', color: '#2C1810', fontWeight: 700, '&:hover': { backgroundColor: '#E8C9A0' } }}
          >
            Become a Vendor
          </Button>
        </Container>
      </Box>

      <Container sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
          Verified Vendors
        </Typography>
        <Grid container spacing={3}>
          {vendors.map((vendor, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  border: '1px solid #E8DDD0', boxShadow: 'none', cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(44,24,16,0.12)' },
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{ width: 80, height: 80, bgcolor: '#D4A574', fontSize: 32, mx: 'auto', mb: 2 }}
                  >
                    {vendor.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
                      {vendor.name}
                    </Typography>
                    {vendor.verified && <VerifiedIcon sx={{ color: '#D4A574', fontSize: 20 }} />}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 1 }}>
                    <StarIcon sx={{ color: '#D4A574', fontSize: 20 }} />
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#2C1810' }}>{vendor.rating}</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#8B7355' }}>
                    {vendor.products} products • Since {vendor.since}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ backgroundColor: '#FAF6F1', py: 8, borderTop: '1px solid #E8DDD0' }}>
        <Container>
          <Paper elevation={0} sx={{ p: 6, textAlign: 'center', border: '1px solid #E8DDD0', borderRadius: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
              Are You a Vendor?
            </Typography>
            <Typography variant="body1" sx={{ color: '#8B7355', mb: 4, maxWidth: 500, mx: 'auto' }}>
              Join our marketplace and connect with thousands of serious buyers looking for quality African fabrics.
            </Typography>
            <Button
              variant="contained" size="large"
              onClick={() => navigate('/register')}
              sx={{ backgroundColor: '#8B7355', '&:hover': { backgroundColor: '#5C4A32' }, fontWeight: 700, px: 4 }}
            >
              Register as Vendor
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Vendors;
