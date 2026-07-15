import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Paper, Stack, TextField, Button, Chip, Avatar, Grid,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SEO from '../components/SEO';
import { useOrders } from '../contexts/OrderContext';

const steps = [
  { key: 'placed', label: 'Order Placed', icon: <ShoppingBagIcon sx={{ fontSize: 18 }} /> },
  { key: 'processing', label: 'Processing', icon: <InventoryIcon sx={{ fontSize: 18 }} /> },
  { key: 'shipped', label: 'Shipped', icon: <LocalShippingIcon sx={{ fontSize: 18 }} /> },
  { key: 'out', label: 'Out for Delivery', icon: <LocalPostOfficeIcon sx={{ fontSize: 18 }} /> },
  { key: 'delivered', label: 'Delivered', icon: <CheckCircleIcon sx={{ fontSize: 18 }} /> },
];

const statusStepMap = { placed: 0, processing: 1, shipped: 2, delivered: 4 };
const statusColors = {
  placed: '#f7c948', processing: '#f7c948', shipped: '#ff6b6b', delivered: '#4caf50',
};

const OrderTracking = ({ status }) => {
  const currentIdx = statusStepMap[status] ?? 0;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 2, px: { xs: 0, sm: 2 } }}>
      {steps.map((step, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <Box key={step.key} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative' }}>
            {i > 0 && (
              <Box sx={{ position: 'absolute', top: 14, right: '50%', width: '100%', height: 2, backgroundColor: done ? '#4caf50' : '#e0e0e0', zIndex: 0 }} />
            )}
            <Box sx={{
              width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1,
              backgroundColor: done ? '#4caf50' : active ? statusColors[status] || '#ff6b6b' : '#e0e0e0',
              color: '#fff',
            }}>
              {done ? <CheckCircleIcon sx={{ fontSize: 16 }} /> : step.icon}
            </Box>
            <Typography variant="caption" sx={{
              mt: 0.5, fontSize: '0.6rem', fontWeight: active ? 700 : 400, textAlign: 'center',
              color: active ? (statusColors[status] || '#ff6b6b') : done ? '#4caf50' : '#999',
              whiteSpace: 'nowrap',
            }}>
              {step.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

const generateUpdates = (status, date) => {
  const d = new Date(date);
  const updates = [
    { time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), date: d.toLocaleDateString(), label: 'Order placed', done: true },
  ];
  if (status === 'processing' || status === 'shipped' || status === 'delivered') {
    const p = new Date(d.getTime() + 3600000);
    updates.push({ time: p.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), date: p.toLocaleDateString(), label: 'Payment confirmed — processing started', done: true });
  }
  if (status === 'shipped' || status === 'delivered') {
    const s = new Date(d.getTime() + 86400000);
    updates.push({ time: s.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), date: s.toLocaleDateString(), label: 'Package shipped', done: true });
  }
  if (status === 'delivered') {
    const dl = new Date(d.getTime() + 172800000);
    updates.push({ time: dl.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), date: dl.toLocaleDateString(), label: 'Delivered successfully', done: true });
  }
  const remaining = [
    { label: 'Out for delivery', done: status === 'delivered' },
    { label: 'Delivered', done: status === 'delivered' },
  ];
  return [...updates, ...remaining];
};

const ShippingInfo = () => {
  const navigate = useNavigate();
  const { orders } = useOrders();
  const [trackingId, setTrackingId] = useState('');
  const [tracked, setTracked] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleTrack = () => {
    if (!trackingId.trim()) return;
    const order = orders.find(o => o.id.toString() === trackingId.trim());
    setTracked(order || 'not-found');
  };

  const recentOrders = orders.slice(0, 3);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
      <SEO title="Live Shipping Tracker" />
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <LocalShippingIcon sx={{ fontSize: 48, color: '#ff6b6b', mb: 2 }} />
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
          Live Shipping Tracker
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Track your orders in real-time
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <SearchIcon sx={{ color: '#ff6b6b' }} /> Track Your Order
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
          <TextField
            fullWidth size="small" placeholder="Enter order ID (e.g. 1712345678)"
            value={trackingId} onChange={(e) => setTrackingId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
          />
          <Button variant="contained" onClick={handleTrack} sx={{ backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000' }, minWidth: 140, whiteSpace: 'nowrap' }}>
            Track Now
          </Button>
        </Stack>

        {tracked === 'not-found' && (
          <Typography variant="body2" sx={{ color: '#c62828', mt: 1.5, fontWeight: 500 }}>
            No order found with ID &quot;{trackingId}&quot;. Please check and try again.
          </Typography>
        )}

        {tracked && tracked !== 'not-found' && (
          <Box sx={{ mt: 3, p: 2, backgroundColor: '#fafafa', borderRadius: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 1 }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>Order #{tracked.id}</Typography>
                <Typography variant="caption" sx={{ color: '#999' }}>Placed on {new Date(tracked.date).toLocaleDateString()}</Typography>
              </Box>
              <Chip label={tracked.status.charAt(0).toUpperCase() + tracked.status.slice(1)} size="small"
                sx={{ backgroundColor: statusColors[tracked.status] || '#999', color: '#fff', fontWeight: 600 }} />
            </Box>
            <OrderTracking status={tracked.status} />
            <Stack spacing={1} sx={{ mt: 1 }}>
              {generateUpdates(tracked.status, tracked.date).map((u, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, opacity: u.done ? 1 : 0.4 }}>
                  <FiberManualRecordIcon sx={{ fontSize: 10, color: u.done ? '#4caf50' : '#ccc' }} />
                  <Typography variant="caption" sx={{ color: u.done ? '#1a1a1a' : '#999', fontWeight: u.done ? 500 : 400 }}>
                    {u.label}
                  </Typography>
                  {u.time && <Typography variant="caption" sx={{ color: '#bbb', ml: 'auto' }}>{u.date} {u.time}</Typography>}
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Paper>

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <LocalShippingIcon sx={{ color: '#ff6b6b', fontSize: 22 }} /> Recent Orders
      </Typography>

      {recentOrders.length === 0 ? (
        <Paper elevation={0} sx={{ p: 4, mb: 4, textAlign: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          <ShoppingBagIcon sx={{ fontSize: 48, color: '#ccc', mb: 1 }} />
          <Typography variant="body1" sx={{ color: '#999', mb: 2 }}>No orders yet</Typography>
          <Button variant="contained" onClick={() => navigate('/shop')} sx={{ backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000' } }}>
            Start Shopping
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {recentOrders.map((order) => (
            <Grid item xs={12} md={4} key={order.id}>
              <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="caption" sx={{ color: '#999', fontWeight: 600 }}>#{order.id}</Typography>
                  <Chip label={order.status} size="small" sx={{ backgroundColor: statusColors[order.status] || '#999', color: '#fff', fontWeight: 600, fontSize: '0.65rem', height: 22 }} />
                </Box>
                <Stack spacing={0.5} sx={{ mb: 1 }}>
                  {order.items.slice(0, 2).map((item, idx) => (
                    <Box key={idx} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Avatar src={item.image} variant="rounded" sx={{ width: 32, height: 32 }} />
                      <Typography variant="caption" sx={{ fontWeight: 500, fontSize: '0.7rem' }}>{item.name}</Typography>
                    </Box>
                  ))}
                </Stack>
                <Typography variant="caption" sx={{ color: '#bbb', display: 'block', mb: 0.5 }}>
                  {new Date(order.date).toLocaleDateString()}
                </Typography>
                <Box sx={{ height: 2, backgroundColor: '#f0f0f0', borderRadius: 1, overflow: 'hidden', mb: 1 }}>
                  <Box sx={{ width: `${((statusStepMap[order.status] ?? 0) / 4) * 100}%`, height: '100%', backgroundColor: statusColors[order.status] || '#999', transition: 'width 0.5s' }} />
                </Box>
                <Typography variant="caption" sx={{ color: '#ff6b6b', fontWeight: 600, fontSize: '0.65rem' }}>
                  ₦{order.total.toFixed(2)}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Live Updates
        </Typography>
        <Stack spacing={1.5}>
          {mounted && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <FiberManualRecordIcon sx={{ fontSize: 10, color: '#4caf50' }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  System active — {orders.length} order{orders.length !== 1 ? 's' : ''} being tracked
                </Typography>
                <Typography variant="caption" sx={{ color: '#bbb', ml: 'auto' }}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Box>
              {orders.filter(o => o.status === 'shipped').length > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <FiberManualRecordIcon sx={{ fontSize: 10, color: '#ff6b6b' }} />
                  <Typography variant="body2">{orders.filter(o => o.status === 'shipped').length} package{orders.filter(o => o.status === 'shipped').length !== 1 ? 's' : ''} in transit</Typography>
                  <Typography variant="caption" sx={{ color: '#bbb', ml: 'auto' }}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Box>
              )}
              {orders.filter(o => o.status === 'delivered').length > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <FiberManualRecordIcon sx={{ fontSize: 10, color: '#4caf50' }} />
                  <Typography variant="body2">{orders.filter(o => o.status === 'delivered').length} order{orders.filter(o => o.status === 'delivered').length !== 1 ? 's' : ''} delivered successfully</Typography>
                  <Typography variant="caption" sx={{ color: '#bbb', ml: 'auto' }}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Box>
              )}
              {orders.length === 0 && (
                <Typography variant="body2" sx={{ color: '#999' }}>No orders tracked yet. Place an order to see live updates here.</Typography>
              )}
            </>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};

export default ShippingInfo;
