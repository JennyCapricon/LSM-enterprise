import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Paper, TextField, Button,
  Stack, Divider, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel,
  Chip, Alert, Snackbar, CircularProgress,
} from '@mui/material';
import SEO from '../components/SEO';
import { useCart } from '../contexts/CartContext';
import { useOrders } from '../contexts/OrderContext';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DiscountIcon from '@mui/icons-material/Discount';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PhoneIcon from '@mui/icons-material/Phone';
import PaymentIcon from '@mui/icons-material/Payment';
import { getVendorForProduct, formatWhatsAppNumber, generateVendorOrderMessage } from '../data/vendors';
import { initializePayment, isPaystackConfigured } from '../services/paystackService';
import { saveOrder } from '../services/supabaseService';

const bankDetails = {
  bank: 'GTBank',
  accountName: 'Jay Enterprise',
  accountNumber: '0123456789',
};

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paid, setPaid] = useState(false);
  const [locating, setLocating] = useState(false);
  const [copied, setCopied] = useState('');
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '',
    deliveryNote: '',
  });
  const [txRef, setTxRef] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (code.startsWith('WELCOME')) {
      setAppliedCoupon(code);
      setCouponDiscount(0.1);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setCouponDiscount(0);
      setAppliedCoupon('');
    }
  };

  const shipping = subtotal >= 10000 ? 0 : 1500;
  const discount = subtotal * couponDiscount;
  const total = subtotal + shipping - discount;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            { headers: { 'Accept-Language': 'en' } }
          );
          const data = await res.json();
          const addr = data.address || {};
          setForm(prev => ({
            ...prev,
            address: addr.road ? `${addr.road}${addr.house_number ? `, ${addr.house_number}` : ''}` : prev.address,
            city: addr.city || addr.town || addr.village || addr.county || prev.city,
            state: addr.state || prev.state,
            zip: addr.postcode || prev.zip,
          }));
        } catch {
          setForm(prev => ({
            ...prev,
            address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          }));
        }
        setLocating(false);
      },
      () => { setLocating(false); alert('Could not detect location. Please enter manually.'); },
      { enableHighAccuracy: true }
    );
  };

  const genTxRef = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let ref = 'TXN';
    for (let i = 0; i < 10; i++) ref += chars.charAt(Math.floor(Math.random() * chars.length));
    return ref;
  };

  const placeOrderLocally = (ref) => {
    const order = {
      id: ref,
      date: new Date().toISOString(),
      status: 'processing',
      items: [...items],
      total: total,
      shipping: shipping,
      discount: discount,
      address: `${form.address}, ${form.city}, ${form.state} ${form.zip}`,
      customer: { name: form.fullName, email: form.email, phone: form.phone },
    };
    addOrder(order);
    saveOrder({
      userId: null,
      customerName: form.fullName,
      customerEmail: form.email,
      customerPhone: form.phone,
      shippingAddress: { address: form.address, city: form.city, state: form.state, zip: form.zip },
      subtotal, shipping, discount, total,
      paymentMethod, paymentStatus: paymentMethod === 'paystack' ? 'paid' : 'pending',
      coupon: appliedCoupon,
      deliveryNote: form.deliveryNote,
      items,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (paymentMethod === 'paystack') {
      if (!isPaystackConfigured()) {
        alert('Payment gateway not configured. Please use Bank Transfer or Pay on Delivery.');
        return;
      }
      setProcessing(true);
      const result = await initializePayment({
        email: form.email,
        amount: total,
        metadata: { customer_name: form.fullName, customer_phone: form.phone },
        onSuccess: (response) => {
          const ref = response.reference;
          setTxRef(ref);
          placeOrderLocally(ref);
          setProcessing(false);
          setSuccess(true);
          setPaid(true);
        },
        onCancel: () => {
          setProcessing(false);
        },
      });
      if (!result) {
        setProcessing(false);
      }
      return;
    }

    const ref = genTxRef();
    setTxRef(ref);
    setProcessing(true);
    placeOrderLocally(ref);

    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 800);
  };

  const handlePaid = () => {
    setPaid(true);

    const itemsByVendor = items.reduce((groups, item) => {
      const vendor = getVendorForProduct(item.id);
      const vendorId = vendor?.id;
      if (!vendorId) return groups;
      if (!groups[vendorId]) groups[vendorId] = { vendor, items: [] };
      groups[vendorId].items.push(item);
      return groups;
    }, {});

    Object.values(itemsByVendor).forEach(({ vendor, items: vendorItems }) => {
      if (!vendor?.whatsappNumber) return;
      const itemLines = vendorItems.map((i, idx) =>
        `${idx + 1}. ${i.name}\n   Quantity: ${i.quantity}\n   Amount: ₦${(i.price * i.quantity).toLocaleString()}`
      ).join('\n\n');
      const vendorSubtotal = vendorItems.reduce((s, i) => s + i.price * i.quantity, 0);
      const msg = encodeURIComponent(
        `🛒 *PAYMENT CONFIRMATION*\n\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `*Customer:* ${form.fullName}\n` +
        `*Phone:* ${form.phone}\n` +
        `*Email:* ${form.email}\n` +
        `*Order Ref:* ${txRef}\n\n` +
        `━━━━ *ITEMS FROM ${vendor.businessName?.toUpperCase() || vendor.name?.toUpperCase()}* ━━━━\n${itemLines}\n\n` +
        `*Subtotal:* ₦${vendorSubtotal.toLocaleString()}\n` +
        `*Total Paid:* ₦${total.toLocaleString()}\n\n` +
        `━━━━ *DELIVERY ADDRESS* ━━━━\n` +
        `${form.address}\n${form.city}, ${form.state} ${form.zip}\n` +
        `*Note:* ${form.deliveryNote || 'N/A'}\n\n` +
        `Payment completed. Please verify and process this order. 🙏`
      );
      window.open(`https://wa.me/${formatWhatsAppNumber(vendor.whatsappNumber)}?text=${msg}`, '_blank');
    });
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const genCoupon = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'WELCOME';
    for (let i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    return code;
  };

  if (success) {
    const couponCode = genCoupon();
    return (
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <SEO title="Order Placed" />
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: '#4CAF50' }} />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1, fontFamily: '"Playfair Display", serif' }}>
          Order Placed Successfully!
        </Typography>

        <Paper elevation={0} sx={{ maxWidth: { xs: '100%', md: 540 }, mx: 'auto', p: 3, mb: 3, border: '1px solid #e0e0e0', borderRadius: 2, textAlign: 'left' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocalShippingIcon sx={{ color: '#ff6b6b', fontSize: 20 }} /> Track Your Order
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
            Use this Order ID to track your shipment in real-time:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.5, backgroundColor: '#f5f5f5', borderRadius: 1, mb: 1 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: 1, flex: 1, color: '#1a1a1a' }}>
              {txRef}
            </Typography>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => { navigator.clipboard.writeText(txRef); setCopied('orderId'); setTimeout(() => setCopied(''), 2000); }}
              sx={{ color: '#1a1a1a', minWidth: 'auto', fontSize: '0.7rem' }}>
              {copied === 'orderId' ? 'Copied!' : 'Copy'}
            </Button>
          </Box>
          <Button variant="outlined" size="small" startIcon={<LocalShippingIcon />} onClick={() => navigate('/shipping')}
            sx={{ borderColor: '#1a1a1a', color: '#1a1a1a', fontWeight: 600, fontSize: '0.75rem' }}>
            Track Now
          </Button>
        </Paper>

        <Paper elevation={0} sx={{ maxWidth: { xs: '100%', md: 540 }, mx: 'auto', p: 3, mb: 3, border: '1px solid #e0e0e0', borderRadius: 2, textAlign: 'left' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
            <DiscountIcon sx={{ color: '#ff6b6b', fontSize: 20 }} /> Your Coupon Code
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
            Enjoy 10% off your next order with this exclusive code:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.5, backgroundColor: '#fff3e0', borderRadius: 1, border: '1px dashed #ff6b6b' }}>
            <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: 2, flex: 1, color: '#e65100', textAlign: 'center' }}>
              {couponCode}
            </Typography>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => { navigator.clipboard.writeText(couponCode); setCopied('coupon'); setTimeout(() => setCopied(''), 2000); }}
              sx={{ color: '#1a1a1a', minWidth: 'auto', fontSize: '0.7rem' }}>
              {copied === 'coupon' ? 'Copied!' : 'Copy'}
            </Button>
          </Box>
          <Typography variant="caption" sx={{ color: '#999', display: 'block', mt: 1 }}>
            Enter this code at checkout on your next purchase. Valid for 30 days.
          </Typography>
        </Paper>

        {paymentMethod === 'transfer' && !paid && (
          <Paper elevation={0} sx={{ maxWidth: { xs: '100%', md: 540 }, mx: 'auto', p: 4, border: '1px solid #e0e0e0', borderRadius: 2, mb: 3, textAlign: 'left' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 2, fontFamily: '"Playfair Display", serif' }}>
              Make Your Payment
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              Transfer the exact amount to the account below, then click "I've Made Payment" to mark this order as paid. We'll verify and process your order.
            </Alert>
            <Stack spacing={1.5} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#1a1a1a' }}>Bank</Typography>
                  <Typography sx={{ fontWeight: 600, color: '#1a1a1a' }}>{bankDetails.bank}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#1a1a1a' }}>Account Name</Typography>
                  <Typography sx={{ fontWeight: 600, color: '#1a1a1a' }}>{bankDetails.accountName}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#1a1a1a' }}>Account Number</Typography>
                  <Typography sx={{ fontWeight: 700, color: '#1a1a1a', fontSize: '1.1rem', letterSpacing: 2 }}>
                    {bankDetails.accountNumber}
                  </Typography>
                </Box>
                <Button
                  size="small"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => copyToClipboard(bankDetails.accountNumber, 'account')}
                  sx={{ color: '#1a1a1a', minWidth: 'auto' }}
                >
                  {copied === 'account' ? 'Copied!' : 'Copy'}
                </Button>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#1a1a1a' }}>Amount</Typography>
                  <Typography sx={{ fontWeight: 700, color: '#ff6b6b', fontSize: '1.2rem' }}>
                    ₦{total.toLocaleString()}
                  </Typography>
                </Box>
                <Button
                  size="small"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => copyToClipboard(total.toString(), 'amount')}
                  sx={{ color: '#1a1a1a', minWidth: 'auto' }}
                >
                  {copied === 'amount' ? 'Copied!' : 'Copy'}
                </Button>
              </Box>
            </Stack>

            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<CheckCircleIcon />}
              onClick={handlePaid}
              sx={{
                backgroundColor: '#1a1a1a',
                color: '#fff',
                fontWeight: 700,
                py: 1.5,
                '&:hover': { backgroundColor: '#000000' },
              }}
            >
              I've Made Payment
            </Button>
          </Paper>
        )}

        {paid && (
          <Paper elevation={0} sx={{ maxWidth: { xs: '100%', md: 540 }, mx: 'auto', p: 4, border: '1px solid #e0e0e0', borderRadius: 2, mb: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <CheckCircleIcon sx={{ fontSize: 48, color: '#4CAF50', mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                Payment Confirmed
              </Typography>
              <Typography variant="body2" sx={{ color: '#6B5B4F', mb: 2 }}>
                Your payment has been recorded. Each vendor has been notified via WhatsApp with your order details for processing.
              </Typography>
              <Chip
                icon={<CheckCircleIcon />}
                label="Payment Received — Vendors Notified"
                sx={{ backgroundColor: '#E8F5E9', color: '#2E7D32', fontWeight: 600 }}
              />
            </Box>
          </Paper>
        )}

        {/* Multi-Vendor Checkout */}
        {(() => {
          const itemsByVendor = items.reduce((groups, item) => {
            const vendor = getVendorForProduct(item.id);
            const vendorId = vendor?.id || item.vendorId;
            if (!vendorId) return groups;
            if (!groups[vendorId]) {
              groups[vendorId] = { vendor, items: [] };
            }
            groups[vendorId].items.push(item);
            return groups;
          }, {});

          const vendorEntries = Object.entries(itemsByVendor).filter(([, g]) => g.vendor);

          if (vendorEntries.length === 0) {
            return (
              <Paper elevation={0} sx={{ maxWidth: { xs: '100%', md: 540 }, mx: 'auto', p: 3, mb: 3, border: '1px solid #e0e0e0', borderRadius: 2, textAlign: 'left' }}>
                <Alert severity="warning">
                  Vendor contact information is currently unavailable for some products. Please contact Drip City support.
                </Alert>
              </Paper>
            );
          }

          return vendorEntries.map(([vendorId, group]) => {
            const vendor = group.vendor;
            const vendorItems = group.items;
            const vendorSubtotal = vendorItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const whatsappUrl = `https://wa.me/${formatWhatsAppNumber(vendor.whatsappNumber)}?text=${generateVendorOrderMessage(vendor, vendorItems, { name: form.fullName, phone: form.phone }, txRef)}`;
            const missingVendorInfo = !vendor.whatsappNumber;

            return (
              <Paper key={vendorId} elevation={0} sx={{ maxWidth: { xs: '100%', md: 540 }, mx: 'auto', p: 3, mb: 3, border: '1px solid #e0e0e0', borderRadius: 2, textAlign: 'left' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <StorefrontIcon sx={{ color: '#ff6b6b', fontSize: 28 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                      {vendor.businessName || vendor.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#999', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <PhoneIcon sx={{ fontSize: 14 }} /> {vendor.phoneNumber || vendor.whatsappNumber || 'N/A'}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a1a', mb: 1 }}>
                  Products from this vendor:
                </Typography>

                <Stack spacing={1.5} sx={{ mb: 2 }}>
                  {vendorItems.map((item) => (
                    <Box key={item.id} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Box component="img" src={item.image} alt={item.name}
                        sx={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 1, backgroundColor: '#f5f5f5' }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a1a' }}>{item.name}</Typography>
                        <Typography variant="caption" sx={{ color: '#999' }}>
                          Qty: {item.quantity} × ₦{item.price.toLocaleString()}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#ff6b6b' }}>
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </Typography>
                    </Box>
                  ))}
                </Stack>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                    Subtotal
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#ff6b6b' }}>
                    ₦{vendorSubtotal.toLocaleString()}
                  </Typography>
                </Box>

                {missingVendorInfo ? (
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    Vendor contact information is currently unavailable for this product. Please contact Drip City support.
                  </Alert>
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<WhatsAppIcon />}
                    onClick={() => window.open(whatsappUrl, '_blank')}
                    sx={{
                      backgroundColor: '#25D366',
                      color: '#fff',
                      fontWeight: 700,
                      py: 1.5,
                      '&:hover': { backgroundColor: '#20BD5A' },
                    }}
                  >
                    Continue Order on WhatsApp — {vendor.name}
                  </Button>
                )}
              </Paper>
            );
          });
        })()}

        {(paid || paymentMethod === 'delivery') && (
          <Button
            variant="contained"
            onClick={() => { clearCart(); navigate('/'); }}
            sx={{ backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000000' }, fontWeight: 600 }}
          >
            Continue Shopping
          </Button>
        )}

        {paymentMethod === 'transfer' && !paid && (
          <Button
            variant="outlined"
            onClick={() => navigate('/shop')}
            sx={{ borderColor: '#ccc', color: '#1a1a1a', fontWeight: 600 }}
          >
            Continue Shopping
          </Button>
        )}
      </Container>
    );
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <SEO title="Checkout" />
      <Box sx={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)', color: '#f5f5f5', py: 4, textAlign: 'center' }}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>Checkout</Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <form onSubmit={handlePlaceOrder}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 3, fontFamily: '"Playfair Display", serif' }}>
                  Personal Information
                </Typography>
                <Stack spacing={2}>
                  <TextField fullWidth label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} required />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Phone" name="phone" value={form.phone} onChange={handleChange} required />
                    </Grid>
                  </Grid>
                </Stack>
              </Paper>

              <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
                    Delivery Address
                  </Typography>
                  <Button
                    size="small"
                    startIcon={locating ? <CircularProgress size={16} /> : <MyLocationIcon />}
                    onClick={detectLocation}
                    disabled={locating}
                    sx={{ color: '#1a1a1a', fontWeight: 600, textTransform: 'none' }}
                  >
                    {locating ? 'Detecting...' : 'Detect My Location'}
                  </Button>
                </Box>
                <Stack spacing={2}>
                  <TextField
                    fullWidth label="Street Address" name="address"
                    value={form.address} onChange={handleChange} required multiline rows={2}
                    placeholder="House number, street name, landmark"
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={5}>
                      <TextField fullWidth label="City" name="city" value={form.city} onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField fullWidth label="State" name="state" value={form.state} onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField fullWidth label="ZIP Code" name="zip" value={form.zip} onChange={handleChange} />
                    </Grid>
                  </Grid>
                  <TextField
                    fullWidth label="Delivery Note (optional)" name="deliveryNote"
                    value={form.deliveryNote} onChange={handleChange} multiline rows={2}
                    placeholder="e.g. Call before delivery, leave at gate, specific delivery time..."
                  />
                </Stack>
              </Paper>

              <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 2, fontFamily: '"Playfair Display", serif' }}>
                  Payment Method
                </Typography>
                <FormControl>
                  <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <FormControlLabel
                      value="paystack"
                      control={<Radio sx={{ '&.Mui-checked': { color: '#1a1a1a' } }} />}
                      label={
                        <Box>
                          <Typography sx={{ fontWeight: 600, color: '#1a1a1a' }}>Pay with Card (Paystack)</Typography>
                          <Typography variant="caption" sx={{ color: '#1a1a1a' }}>
                            Secure payment via card, USSD, or bank transfer
                          </Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="transfer"
                      control={<Radio sx={{ '&.Mui-checked': { color: '#1a1a1a' } }} />}
                      label={
                        <Box>
                          <Typography sx={{ fontWeight: 600, color: '#1a1a1a' }}>Bank Transfer</Typography>
                          <Typography variant="caption" sx={{ color: '#1a1a1a' }}>
                            Pay via bank transfer directly to our account
                          </Typography>
                        </Box>
                      }
                    />
                    {paymentMethod === 'transfer' && (
                      <Box sx={{ ml: 4, mb: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                        <Stack spacing={1}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" sx={{ color: '#1a1a1a' }}>Bank:</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a1a' }}>{bankDetails.bank}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" sx={{ color: '#1a1a1a' }}>Account Name:</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a1a' }}>{bankDetails.accountName}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" sx={{ color: '#1a1a1a' }}>Account Number:</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1a1a1a', letterSpacing: 1 }}>
                                {bankDetails.accountNumber}
                              </Typography>
                              <Button
                                size="small"
                                startIcon={<ContentCopyIcon fontSize="small" />}
                                onClick={() => copyToClipboard(bankDetails.accountNumber, 'acc')}
                                sx={{ color: '#1a1a1a', minWidth: 'auto', fontSize: '0.7rem' }}
                              >
                                {copied === 'acc' ? 'Copied' : 'Copy'}
                              </Button>
                            </Box>
                          </Box>
                        </Stack>
                      </Box>
                    )}
                    <FormControlLabel
                      value="delivery"
                      control={<Radio sx={{ '&.Mui-checked': { color: '#1a1a1a' } }} />}
                      label={
                        <Box>
                          <Typography sx={{ fontWeight: 600, color: '#1a1a1a' }}>Pay on Delivery</Typography>
                          <Typography variant="caption" sx={{ color: '#1a1a1a' }}>
                            Pay cash when your order is delivered
                          </Typography>
                        </Box>
                      }
                    />
                  </RadioGroup>
                </FormControl>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={processing}
                  sx={{
                    mt: 3,
                    backgroundColor: '#1a1a1a',
                    '&:hover': { backgroundColor: '#000000' },
                    fontWeight: 700, py: 1.5,
                  }}
                >
                  {processing ? 'Processing...' : paymentMethod === 'paystack' ? `Pay ₦${total.toLocaleString()} with Card` : `Place Order — ₦${total.toLocaleString()}`}
                </Button>

                {paymentMethod === 'transfer' && (
                  <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 1, color: '#1a1a1a' }}>
                    After placing order, you'll need to transfer the amount and confirm payment on this page.
                  </Typography>
                )}
                {paymentMethod === 'paystack' && (
                  <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 1, color: '#1a1a1a' }}>
                    You'll be redirected to Paystack's secure checkout to complete payment.
                  </Typography>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={5}>
              <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, position: 'sticky', top: 80 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 3, fontFamily: '"Playfair Display", serif' }}>
                  Order Summary
                </Typography>
                <Stack spacing={2} divider={<Divider />}>
                  {items.map(item => (
                    <Box key={item.id} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Box component="img" src={item.image} alt={item.name} sx={{ width: { xs: 48, md: 64 }, height: { xs: 48, md: 64 }, objectFit: 'cover', borderRadius: 1 }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a1a' }}>{item.name}</Typography>
                        <Typography variant="caption" color="textSecondary">Qty: {item.quantity}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>₦{(item.price * item.quantity).toLocaleString()}</Typography>
                    </Box>
                  ))}
                </Stack>

                <Box sx={{ mt: 2, mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#1a1a1a' }}>Coupon Code</Typography>
                  <Stack direction="row" spacing={1}>
                    <TextField size="small" fullWidth placeholder="Enter coupon code" value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())} />
                    <Button variant="outlined" size="small" onClick={applyCoupon}
                      sx={{ borderColor: '#1a1a1a', color: '#1a1a1a', whiteSpace: 'nowrap', fontWeight: 600 }}>
                      Apply
                    </Button>
                  </Stack>
                  {appliedCoupon && (
                    <Typography variant="caption" sx={{ color: '#2e7d32', display: 'block', mt: 0.5, fontWeight: 500 }}>
                      Coupon &quot;{appliedCoupon}&quot; applied — 10% off!
                    </Typography>
                  )}
                  {couponError && (
                    <Typography variant="caption" sx={{ color: '#c62828', display: 'block', mt: 0.5 }}>
                      {couponError}
                    </Typography>
                  )}
                </Box>

                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, mt: 2 }}>
                  <Typography color="textSecondary">Subtotal</Typography>
                  <Typography sx={{ fontWeight: 600 }}>₦{subtotal.toLocaleString()}</Typography>
                </Box>
                {couponDiscount > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography color="textSecondary">Discount (10%)</Typography>
                    <Typography sx={{ fontWeight: 600, color: '#2e7d32' }}>-₦{discount.toLocaleString()}</Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography color="textSecondary">Shipping</Typography>
                  <Typography sx={{ fontWeight: 600 }}>{shipping === 0 ? 'FREE' : `₦${shipping.toLocaleString()}`}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>Total</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>₦{total.toLocaleString()}</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Container>

      <Snackbar
        open={Boolean(copied)}
        autoHideDuration={2000}
        onClose={() => setCopied('')}
        message="Copied to clipboard!"
      />
    </Box>
  );
};

export default Checkout;
