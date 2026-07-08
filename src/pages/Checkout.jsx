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

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const ref = genTxRef();
    setTxRef(ref);
    setProcessing(true);
    setTimeout(() => {
      const order = {
        id: ref,
        date: new Date().toISOString(),
        status: 'processing',
        items: [...items],
        total: total,
        shipping: shipping,
        address: `${form.address}, ${form.city}, ${form.state} ${form.zip}`,
        customer: { name: form.fullName, email: form.email, phone: form.phone },
      };
      addOrder(order);
      setProcessing(false);
      setSuccess(true);
    }, 800);
  };

  const handlePaid = () => {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '2349027089929';
    const itemList = items.map(i => `• ${i.name} x${i.quantity} = ₦${(i.price * i.quantity).toLocaleString()}`).join('\n');
    const message = encodeURIComponent(
      `🛒 *NEW ORDER - PAYMENT CONFIRMATION*\n\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `*Customer:* ${form.fullName}\n` +
      `*Phone:* ${form.phone}\n` +
      `*Email:* ${form.email}\n` +
      `*Transaction Ref:* ${txRef}\n\n` +
      `━━━━ *ORDER ITEMS* ━━━━\n${itemList}\n\n` +
      `*Subtotal:* ₦${subtotal.toLocaleString()}\n` +
        `*Shipping:* ${shipping === 0 ? 'FREE' : `₦${shipping.toLocaleString()}`}\n` +
      `*Total Paid:* ₦${total.toLocaleString()}\n\n` +
      `━━━━ *DELIVERY ADDRESS* ━━━━\n` +
      `${form.address}\n${form.city}, ${form.state} ${form.zip}\n\n` +
      `*Delivery Note:* ${form.deliveryNote || 'N/A'}\n\n` +
      `Please verify and confirm this payment. 🙏`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    setPaid(true);
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
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <SEO title="Order Placed" />
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: '#4CAF50' }} />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1, fontFamily: '"Playfair Display", serif' }}>
          Order Placed Successfully!
        </Typography>

        <Paper elevation={0} sx={{ maxWidth: 500, mx: 'auto', p: 3, mb: 3, border: '1px solid #e0e0e0', borderRadius: 2, textAlign: 'left' }}>
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

        <Paper elevation={0} sx={{ maxWidth: 500, mx: 'auto', p: 3, mb: 3, border: '1px solid #e0e0e0', borderRadius: 2, textAlign: 'left' }}>
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
          <Paper elevation={0} sx={{ maxWidth: 500, mx: 'auto', p: 4, border: '1px solid #e0e0e0', borderRadius: 2, mb: 3, textAlign: 'left' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 2, fontFamily: '"Playfair Display", serif' }}>
              Make Your Payment
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              Transfer the exact amount to the account below, then click "I've Made Payment" to verify with the seller on WhatsApp.
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
              startIcon={<WhatsAppIcon />}
              onClick={handlePaid}
              sx={{
                backgroundColor: '#25D366',
                color: '#fff',
                fontWeight: 700,
                py: 1.5,
                '&:hover': { backgroundColor: '#20BD5A' },
              }}
            >
              I've Made Payment — Confirm via WhatsApp
            </Button>
          </Paper>
        )}

        {paid && (
          <Paper elevation={0} sx={{ maxWidth: 500, mx: 'auto', p: 4, border: '1px solid #e0e0e0', borderRadius: 2, mb: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <WhatsAppIcon sx={{ fontSize: 48, color: '#25D366', mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                WhatsApp Opened
              </Typography>
              <Typography variant="body2" sx={{ color: '#6B5B4F', mb: 2 }}>
                Send the pre-filled message to the seller for payment verification. Your order will be confirmed once payment is verified.
              </Typography>
              <Chip
                icon={<CheckCircleIcon />}
                label="Awaiting Seller Confirmation"
                sx={{ backgroundColor: '#FFF3E0', color: '#E65100', fontWeight: 600 }}
              />
            </Box>
          </Paper>
        )}

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
        <Container>
          <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>Checkout</Typography>
        </Container>
      </Box>

      <Container sx={{ py: 4 }}>
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
                      value="transfer"
                      control={<Radio sx={{ '&.Mui-checked': { color: '#1a1a1a' } }} />}
                      label={
                        <Box>
                          <Typography sx={{ fontWeight: 600, color: '#1a1a1a' }}>Bank Transfer</Typography>
                          <Typography variant="caption" sx={{ color: '#1a1a1a' }}>
                            Pay via bank transfer and confirm with WhatsApp
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
                  {processing ? 'Processing...' : `Place Order — ₦${total.toLocaleString()}`}
                </Button>

                {paymentMethod === 'transfer' && (
                  <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 1, color: '#1a1a1a' }}>
                    After placing order, you'll need to transfer the amount and confirm via WhatsApp.
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
                      <Box component="img" src={item.image} alt={item.name} sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }} />
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
