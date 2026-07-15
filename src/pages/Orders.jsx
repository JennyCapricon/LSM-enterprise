import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Tabs, Tab, Paper, Stack, Chip, Button, Avatar, Grid, TextField, Divider,
} from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReplyIcon from '@mui/icons-material/Reply';
import RateReviewIcon from '@mui/icons-material/RateReview';
import MessageIcon from '@mui/icons-material/Message';
import SendIcon from '@mui/icons-material/Send';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SEO from '../components/SEO';
import { useOrders } from '../contexts/OrderContext';
import { useAuth } from '../contexts/AuthContext';
import { getVendorById } from '../data/vendors';

const tabs = [
  { label: 'All Orders', icon: <ShoppingBagIcon />, filter: () => true },
  { label: 'Processing', icon: <LocalShippingIcon />, filter: (o) => o.status === 'processing' },
  { label: 'Shipped', icon: <LocalShippingIcon />, filter: (o) => o.status === 'shipped' },
  { label: 'Delivered', icon: <CheckCircleIcon />, filter: (o) => o.status === 'delivered' },
  { label: 'Returns', icon: <ReplyIcon />, filter: (o) => o.status === 'returned' },
];

const statusColors = {
  processing: '#f7c948',
  shipped: '#ff6b6b',
  delivered: '#4caf50',
  returned: '#f44336',
};

const steps = [
  { key: 'placed', label: 'Order Placed', icon: <ShoppingBagIcon sx={{ fontSize: 18 }} /> },
  { key: 'processing', label: 'Processing', icon: <InventoryIcon sx={{ fontSize: 18 }} /> },
  { key: 'shipped', label: 'Shipped', icon: <LocalShippingIcon sx={{ fontSize: 18 }} /> },
  { key: 'out', label: 'Out for Delivery', icon: <LocalPostOfficeIcon sx={{ fontSize: 18 }} /> },
  { key: 'delivered', label: 'Delivered', icon: <CheckCircleIcon sx={{ fontSize: 18 }} /> },
];

const statusStepMap = { placed: 0, processing: 1, shipped: 2, delivered: 4 };
const returnSteps = [
  { key: 'placed', label: 'Order Placed', icon: <ShoppingBagIcon sx={{ fontSize: 18 }} /> },
  { key: 'processing', label: 'Processing', icon: <InventoryIcon sx={{ fontSize: 18 }} /> },
  { key: 'returned', label: 'Return Initiated', icon: <ReplyIcon sx={{ fontSize: 18 }} /> },
];

const OrderTracking = ({ status }) => {
  const isReturned = status === 'returned';
  const trackSteps = isReturned ? returnSteps : steps;
  const currentIdx = isReturned ? 2 : (statusStepMap[status] ?? 0);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 2, px: { xs: 0, sm: 2 } }}>
      {trackSteps.map((step, i) => {
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
              color: '#fff', boxShadow: active ? `0 0 0 4px ${(statusColors[status] || '#ff6b6b')}40` : 'none',
              transition: 'all 0.3s',
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

const Orders = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { orders } = useOrders();
  const [tab, setTab] = useState(0);
  const [reviewText, setReviewText] = useState({});
  const [reviews, setReviews] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lsm_reviews') || '[]'); }
    catch { return []; }
  });
  const [messages, setMessages] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lsm_messages') || '[]'); }
    catch { return []; }
  });
  const [newMessage, setNewMessage] = useState('');

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const filtered = orders.filter(tabs[tab].filter);

  const handleSubmitReview = (orderId) => {
    const text = reviewText[orderId]?.trim();
    if (!text) return;
    const review = { id: Date.now(), orderId, text, user: user.name, date: new Date().toISOString() };
    const updated = [review, ...reviews];
    setReviews(updated);
    localStorage.setItem('lsm_reviews', JSON.stringify(updated));
    setReviewText({ ...reviewText, [orderId]: '' });
  };

  const handleSendMessage = () => {
    const text = newMessage.trim();
    if (!text) return;
    const msg = { id: Date.now(), text, user: user.name, date: new Date().toISOString(), side: 'sent' };
    const updated = [...messages, msg];
    setMessages(updated);
    localStorage.setItem('lsm_messages', JSON.stringify(updated));
    setNewMessage('');
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
      <SEO title="My Orders" />
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>My Orders</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Track, review, and manage your orders
      </Typography>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} variant="scrollable" scrollButtons="auto" sx={{ mb: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        {tabs.map((t, i) => (
          <Tab key={t.label} label={t.label} icon={t.icon} iconPosition="start" sx={{ minHeight: 48, textTransform: 'none', fontWeight: 600 }} />
        ))}
      </Tabs>

      {filtered.length === 0 ? (
        <Paper elevation={0} sx={{ p: 6, textAlign: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          <ShoppingBagIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>No orders found</Typography>
          <Typography variant="body2" sx={{ color: '#999', mb: 3 }}>{tab === 0 ? 'You haven\'t placed any orders yet.' : `No ${tabs[tab].label.toLowerCase()} orders.`}</Typography>
          <Button variant="contained" onClick={() => navigate('/shop')} sx={{ backgroundColor: '#1a1a2e', '&:hover': { backgroundColor: '#2d2d4e' }, fontWeight: 600 }}>
            Start Shopping
          </Button>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {filtered.map((order) => (
            <Paper key={order.id} elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#999', fontSize: '0.8rem' }}>Order #{order.id}</Typography>
                  <Typography variant="caption" sx={{ color: '#bbb', fontSize: '0.75rem' }}>Placed on {new Date(order.date).toLocaleDateString()}</Typography>
                </Box>
                <Chip label={order.status.charAt(0).toUpperCase() + order.status.slice(1)} size="small" sx={{ backgroundColor: statusColors[order.status], color: '#fff', fontWeight: 600, fontSize: '0.75rem' }} />
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={1.5}>
                {order.items.map((item, idx) => {
                  const vendor = getVendorById(item.vendorId);
                  return (
                    <Box key={idx} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Avatar src={item.image} variant="rounded" sx={{ width: 56, height: 56 }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.name}</Typography>
                        <Typography variant="caption" sx={{ color: '#999' }}>Qty: {item.quantity} × ₦{item.price.toFixed(2)}</Typography>
                        {vendor && (
                          <Typography variant="caption" sx={{ color: '#999', display: 'block', fontSize: '0.65rem' }}>
                            Vendor: {vendor.businessName || vendor.name}
                            {vendor.whatsappNumber && ` · WhatsApp: ${vendor.whatsappNumber}`}
                          </Typography>
                        )}
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>₦{(item.price * item.quantity).toFixed(2)}</Typography>
                    </Box>
                  );
                })}
              </Stack>
              {order.status !== 'returned' && (
                <Box sx={{ mt: 1, px: { xs: 0, sm: 2 } }}>
                  <Typography variant="caption" sx={{ color: '#999', fontWeight: 600, display: 'block', mb: 0.5 }}>TRACKING</Typography>
                  <OrderTracking status={order.status} />
                </Box>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>Total: ₦{order.total.toFixed(2)}</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {order.status === 'delivered' && (
                    <Button size="small" variant="outlined" sx={{ borderColor: '#ccc', color: '#666', fontSize: '0.75rem' }}>
                      Return
                    </Button>
                  )}
                  <Button size="small" variant="outlined" sx={{ borderColor: '#ccc', color: '#666', fontSize: '0.75rem' }}>
                    View Details
                  </Button>
                </Box>
              </Box>

              {order.status === 'delivered' && (
                <Box sx={{ mt: 2, pt: 2, borderTop: '1px dashed', borderColor: 'divider' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <RateReviewIcon sx={{ fontSize: 16 }} /> Leave a Review
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      size="small" fullWidth placeholder="Share your thoughts about this order..."
                      value={reviewText[order.id] || ''}
                      onChange={(e) => setReviewText({ ...reviewText, [order.id]: e.target.value })}
                    />
                    <Button variant="contained" size="small" onClick={() => handleSubmitReview(order.id)}
                      sx={{ backgroundColor: '#1a1a2e', '&:hover': { backgroundColor: '#2d2d4e' }, whiteSpace: 'nowrap' }}>
                      Submit
                    </Button>
                  </Box>
                </Box>
              )}
            </Paper>
          ))}
        </Stack>
      )}

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <RateReviewIcon /> My Reviews
            </Typography>
            {reviews.length === 0 ? (
              <Typography variant="body2" sx={{ color: '#999' }}>No reviews yet. Review your delivered orders above.</Typography>
            ) : (
              <Stack spacing={2} sx={{ maxHeight: 300, overflow: 'auto' }}>
                {reviews.map((r) => (
                  <Box key={r.id} sx={{ p: 2, backgroundColor: '#f8f6f2', borderRadius: 1 }}>
                    <Typography variant="caption" sx={{ color: '#999' }}>{r.user} · {new Date(r.date).toLocaleDateString()}</Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>{r.text}</Typography>
                  </Box>
                ))}
              </Stack>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <MessageIcon /> Messages
            </Typography>
            <Box sx={{ maxHeight: 260, overflow: 'auto', mb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              {messages.length === 0 ? (
                <Typography variant="body2" sx={{ color: '#999', py: 4, textAlign: 'center' }}>No messages yet. Send us a message below.</Typography>
              ) : (
                messages.map((m) => (
                  <Box key={m.id} sx={{ alignSelf: m.side === 'sent' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                    <Paper elevation={0} sx={{ p: 1.5, backgroundColor: m.side === 'sent' ? '#1a1a2e' : '#f0f0f0', borderRadius: m.side === 'sent' ? '12px 12px 4px 12px' : '12px 12px 12px 4px' }}>
                      <Typography variant="body2" sx={{ color: m.side === 'sent' ? '#fff' : '#1a1a1a' }}>{m.text}</Typography>
                      <Typography variant="caption" sx={{ color: m.side === 'sent' ? 'rgba(255,255,255,0.6)' : '#999', display: 'block', mt: 0.3 }}>{new Date(m.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
                    </Paper>
                  </Box>
                ))
              )}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField size="small" fullWidth placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} />
              <Button variant="contained" size="small" onClick={handleSendMessage} sx={{ backgroundColor: '#1a1a2e', '&:hover': { backgroundColor: '#2d2d4e' }, minWidth: 40 }}>
                <SendIcon sx={{ fontSize: 18 }} />
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Orders;
