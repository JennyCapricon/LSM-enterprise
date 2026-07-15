import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import SEO from '../components/SEO';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" sx={{ py: 12, textAlign: 'center' }}>
      <SEO title="Page Not Found" />
      <Typography
        variant="h1"
        sx={{
          fontWeight: 800,
          fontSize: { xs: '6rem', md: '10rem' },
          color: '#e0e0e0',
          lineHeight: 1,
          mb: 2,
          fontFamily: '"Playfair Display", serif',
        }}
      >
        404
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 2, fontFamily: '"Playfair Display", serif' }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ color: '#1a1a1a', mb: 6, maxWidth: { xs: '100%', md: 560 }, mx: 'auto' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
          sx={{ backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000000' }, fontWeight: 600 }}
        >
          Go Home
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<StoreIcon />}
          onClick={() => navigate('/shop')}
          sx={{ borderColor: '#ccc', color: '#1a1a1a', fontWeight: 600 }}
        >
          Browse Shop
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
