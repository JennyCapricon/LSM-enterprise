import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Paper, Button, Stack, Avatar, Divider,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import SEO from '../../components/SEO';
import { useAuth } from '../../contexts/AuthContext';

const Account = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <SEO title="My Account" />
      <Box sx={{ background: 'linear-gradient(135deg, #5C4A32 0%, #8B7355 100%)', color: '#FAF6F1', py: 4, textAlign: 'center' }}>
        <Container>
          <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>My Account</Typography>
        </Container>
      </Box>
      <Container sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid #E8DDD0', borderRadius: 2, textAlign: 'center' }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: '#D4A574', fontSize: 32, mx: 'auto', mb: 2 }}>
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C1810' }}>{user.name}</Typography>
              <Typography variant="body2" sx={{ color: '#8B7355', mb: 2 }}>{user.email}</Typography>
              <Button
                fullWidth variant="outlined" startIcon={<LogoutIcon />}
                onClick={() => { logout(); navigate('/'); }}
                sx={{ borderColor: '#C4A882', color: '#6B5B4F', fontWeight: 600 }}
              >
                Sign Out
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <Paper elevation={0} sx={{ p: 3, border: '1px solid #E8DDD0', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C1810', mb: 3, fontFamily: '"Playfair Display", serif' }}>
                  Account Overview
                </Typography>
                <Grid container spacing={3}>
                  {[
                    { icon: <ShoppingBagIcon />, label: 'My Orders', count: '0', path: '/shop' },
                    { icon: <FavoriteIcon />, label: 'Wishlist', count: 'View', path: '/wishlist' },
                    { icon: <PersonIcon />, label: 'Profile', count: 'Edit', path: '/account' },
                  ].map((item, idx) => (
                    <Grid item xs={12} sm={4} key={idx}>
                      <Paper
                        elevation={0}
                        onClick={() => navigate(item.path)}
                        sx={{
                          p: 2, textAlign: 'center', cursor: 'pointer',
                          border: '1px solid #E8DDD0', borderRadius: 2,
                          transition: 'all 0.2s',
                          '&:hover': { borderColor: '#C4A882', backgroundColor: 'rgba(196,168,130,0.05)' },
                        }}
                      >
                        <Box sx={{ color: '#8B7355', mb: 1 }}>{item.icon}</Box>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#2C1810' }}>{item.label}</Typography>
                        <Typography variant="body2" sx={{ color: '#C4A882' }}>{item.count}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
              <Paper elevation={0} sx={{ p: 3, border: '1px solid #E8DDD0', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C1810', mb: 2, fontFamily: '"Playfair Display", serif' }}>
                  Recent Orders
                </Typography>
                <Typography variant="body2" sx={{ color: '#8B7355' }}>
                  You haven't placed any orders yet.
                </Typography>
                <Button
                  variant="contained" onClick={() => navigate('/shop')}
                  sx={{ mt: 2, backgroundColor: '#8B7355', '&:hover': { backgroundColor: '#5C4A32' }, fontWeight: 600 }}
                >
                  Start Shopping
                </Button>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Account;
