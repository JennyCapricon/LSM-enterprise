import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Paper, Button, Stack, Avatar,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import SEO from '../../components/SEO';
import { useAuth } from '../../contexts/AuthContext';
import { useOrders } from '../../contexts/OrderContext';

const Account = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { orders } = useOrders();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <SEO title="My Account" />
      <Box sx={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)', color: '#f5f5f5', py: 4, textAlign: 'center' }}>
        <Container>
          <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>My Account</Typography>
        </Container>
      </Box>
      <Container sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, textAlign: 'center' }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: '#ff6b6b', fontSize: 32, mx: 'auto', mb: 2 }}>
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>{user.name}</Typography>
              <Typography variant="body2" sx={{ color: '#1a1a1a', mb: 2 }}>{user.email}</Typography>
              <Button
                fullWidth variant="outlined" startIcon={<LogoutIcon />}
                onClick={() => { logout(); navigate('/'); }}
                sx={{ borderColor: '#ccc', color: '#6B5B4F', fontWeight: 600 }}
              >
                Sign Out
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 3, fontFamily: '"Playfair Display", serif' }}>
                  Account Overview
                </Typography>
                <Grid container spacing={3}>
                  {[
                    { icon: <ShoppingBagIcon />, label: 'My Orders', count: orders.length.toString(), path: '/orders' },
                    { icon: <FavoriteIcon />, label: 'Wishlist', count: 'View', path: '/wishlist' },
                    { icon: <PersonIcon />, label: 'Profile', count: 'Edit', path: '/account' },
                  ].map((item, idx) => (
                    <Grid item xs={12} sm={4} key={idx}>
                      <Paper
                        elevation={0}
                        onClick={() => navigate(item.path)}
                        sx={{
                          p: 2, textAlign: 'center', cursor: 'pointer',
                          border: '1px solid #e0e0e0', borderRadius: 2,
                          transition: 'all 0.2s',
                          '&:hover': { borderColor: '#ccc', backgroundColor: 'rgba(196,168,130,0.05)' },
                        }}
                      >
                        <Box sx={{ color: '#1a1a1a', mb: 1 }}>{item.icon}</Box>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#1a1a1a' }}>{item.label}</Typography>
                        <Typography variant="body2" sx={{ color: '#ccc' }}>{item.count}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
              <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 2 }}>
                  Recent Orders
                </Typography>
                {orders.length === 0 ? (
                  <>
                    <Typography variant="body2" sx={{ color: '#1a1a1a' }}>
                      You haven't placed any orders yet.
                    </Typography>
                    <Button variant="contained" onClick={() => navigate('/shop')}
                      sx={{ mt: 2, backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000000' }, fontWeight: 600 }}>
                      Start Shopping
                    </Button>
                  </>
                ) : (
                  <Stack spacing={1.5}>
                    {orders.slice(0, 3).map((order) => (
                      <Box key={order.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, backgroundColor: '#f8f6f2', borderRadius: 1 }}>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>Order #{order.id}</Typography>
                          <Typography variant="caption" sx={{ color: '#999' }}>{order.items.length} item(s) · {new Date(order.date).toLocaleDateString()}</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>₦{order.total.toFixed(2)}</Typography>
                          <Typography variant="caption" sx={{ color: '#ff6b6b', fontWeight: 600, textTransform: 'capitalize' }}>{order.status}</Typography>
                        </Box>
                      </Box>
                    ))}
                    <Button variant="outlined" onClick={() => navigate('/orders')}
                      sx={{ borderColor: '#ccc', color: '#1a1a1a', fontWeight: 600 }}>
                      View All Orders
                    </Button>
                  </Stack>
                )}
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Account;
