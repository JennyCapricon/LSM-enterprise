import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Paper, TextField, Button,
  Stack, Divider, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel,
  Chip, Alert, Snackbar, CircularProgress,
} from '@mui/material';
import SEO from '../components/SEO';
import { useCart } from '../contexts/CartContext';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const bankDetails = {
  bank: 'GTBank',
  accountName: 'LSM Enterprise',
  accountNumber: '0123456789',
};

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
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

  const shipping = subtotal >= 10000 ? 0 : 1500;
  const total = subtotal + shipping;

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
      setProcessing(false);
      setSuccess(true);
    }, 800);
  };

  const handlePaid = () => {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '234XXXXXXXXXX';
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

  if (success) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <SEO title="Order Placed" />
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: '#4CAF50' }} />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#2C1810', mb: 1, fontFamily: '"Playfair Display", serif' }}>
          Order Placed Successfully!
        </Typography>
        <Typography variant="body1" sx={{ color: '#6B5B4F', mb: 1 }}>
          Transaction Ref: <strong>{txRef}</strong>
        </Typography>
        <Typography variant="body2" sx={{ color: '#8B7355', mb: 4 }}>
          Please save this reference for your records.
        </Typography>

        {paymentMethod === 'transfer' && !paid && (
          <Paper elevation={0} sx={{ maxWidth: 500, mx: 'auto', p: 4, border: '1px solid #E8DDD0', borderRadius: 2, mb: 3, textAlign: 'left' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C1810', mb: 2, fontFamily: '"Playfair Display", serif' }}>
              Make Your Payment
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              Transfer the exact amount to the account below, then click "I've Made Payment" to verify with the seller on WhatsApp.
            </Alert>
            <Stack spacing={1.5} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, backgroundColor: '#FAF6F1', borderRadius: 1 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#8B7355' }}>Bank</Typography>
                  <Typography sx={{ fontWeight: 600, color: '#2C1810' }}>{bankDetails.bank}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, backgroundColor: '#FAF6F1', borderRadius: 1 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#8B7355' }}>Account Name</Typography>
                  <Typography sx={{ fontWeight: 600, color: '#2C1810' }}>{bankDetails.accountName}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, backgroundColor: '#FAF6F1', borderRadius: 1 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#8B7355' }}>Account Number</Typography>
                  <Typography sx={{ fontWeight: 700, color: '#2C1810', fontSize: '1.1rem', letterSpacing: 2 }}>
                    {bankDetails.accountNumber}
                  </Typography>
                </Box>
                <Button
                  size="small"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => copyToClipboard(bankDetails.accountNumber, 'account')}
                  sx={{ color: '#8B7355', minWidth: 'auto' }}
                >
                  {copied === 'account' ? 'Copied!' : 'Copy'}
                </Button>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, backgroundColor: '#FAF6F1', borderRadius: 1 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#8B7355' }}>Amount</Typography>
                  <Typography sx={{ fontWeight: 700, color: '#D4A574', fontSize: '1.2rem' }}>
                    ₦{total.toLocaleString()}
                  </Typography>
                </Box>
                <Button
                  size="small"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => copyToClipboard(total.toString(), 'amount')}
                  sx={{ color: '#8B7355', minWidth: 'auto' }}
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
          <Paper elevation={0} sx={{ maxWidth: 500, mx: 'auto', p: 4, border: '1px solid #E8DDD0', borderRadius: 2, mb: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <WhatsAppIcon sx={{ fontSize: 48, color: '#25D366', mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C1810', mb: 1 }}>
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
            sx={{ backgroundColor: '#8B7355', '&:hover': { backgroundColor: '#5C4A32' }, fontWeight: 600 }}
          >
            Continue Shopping
          </Button>
        )}

        {paymentMethod === 'transfer' && !paid && (
          <Button
            variant="outlined"
            onClick={() => navigate('/shop')}
            sx={{ borderColor: '#C4A882', color: '#8B7355', fontWeight: 600 }}
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
      <Box sx={{ background: 'linear-gradient(135deg, #5C4A32 0%, #8B7355 100%)', color: '#FAF6F1', py: 4, textAlign: 'center' }}>
        <Container>
          <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>Checkout</Typography>
        </Container>
      </Box>

      <Container sx={{ py: 4 }}>
        <form onSubmit={handlePlaceOrder}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Paper elevation={0} sx={{ p: 3, border: '1px solid #E8DDD0', borderRadius: 2, mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C1810', mb: 3, fontFamily: '"Playfair Display", serif' }}>
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

              <Paper elevation={0} sx={{ p: 3, border: '1px solid #E8DDD0', borderRadius: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
                    Delivery Address
                  </Typography>
                  <Button
                    size="small"
                    startIcon={locating ? <CircularProgress size={16} /> : <MyLocationIcon />}
                    onClick={detectLocation}
                    disabled={locating}
                    sx={{ color: '#8B7355', fontWeight: 600, textTransform: 'none' }}
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

              <Paper elevation={0} sx={{ p: 3, border: '1px solid #E8DDD0', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C1810', mb: 2, fontFamily: '"Playfair Display", serif' }}>
                  Payment Method
                </Typography>
                <FormControl>
                  <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <FormControlLabel
                      value="transfer"
                      control={<Radio sx={{ '&.Mui-checked': { color: '#8B7355' } }} />}
                      label={
                        <Box>
                          <Typography sx={{ fontWeight: 600, color: '#2C1810' }}>Bank Transfer</Typography>
                          <Typography variant="caption" sx={{ color: '#8B7355' }}>
                            Pay via bank transfer and confirm with WhatsApp
                          </Typography>
                        </Box>
                      }
                    />
                    {paymentMethod === 'transfer' && (
                      <Box sx={{ ml: 4, mb: 2, p: 2, backgroundColor: '#FAF6F1', borderRadius: 1 }}>
                        <Stack spacing={1}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" sx={{ color: '#8B7355' }}>Bank:</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#2C1810' }}>{bankDetails.bank}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" sx={{ color: '#8B7355' }}>Account Name:</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#2C1810' }}>{bankDetails.accountName}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" sx={{ color: '#8B7355' }}>Account Number:</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: '#2C1810', letterSpacing: 1 }}>
                                {bankDetails.accountNumber}
                              </Typography>
                              <Button
                                size="small"
                                startIcon={<ContentCopyIcon fontSize="small" />}
                                onClick={() => copyToClipboard(bankDetails.accountNumber, 'acc')}
                                sx={{ color: '#8B7355', minWidth: 'auto', fontSize: '0.7rem' }}
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
                      control={<Radio sx={{ '&.Mui-checked': { color: '#8B7355' } }} />}
                      label={
                        <Box>
                          <Typography sx={{ fontWeight: 600, color: '#2C1810' }}>Pay on Delivery</Typography>
                          <Typography variant="caption" sx={{ color: '#8B7355' }}>
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
                    backgroundColor: '#8B7355',
                    '&:hover': { backgroundColor: '#5C4A32' },
                    fontWeight: 700, py: 1.5,
                  }}
                >
                  {processing ? 'Processing...' : `Place Order — ₦${total.toLocaleString()}`}
                </Button>

                {paymentMethod === 'transfer' && (
                  <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 1, color: '#8B7355' }}>
                    After placing order, you'll need to transfer the amount and confirm via WhatsApp.
                  </Typography>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={5}>
              <Paper elevation={0} sx={{ p: 3, border: '1px solid #E8DDD0', borderRadius: 2, position: 'sticky', top: 80 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C1810', mb: 3, fontFamily: '"Playfair Display", serif' }}>
                  Order Summary
                </Typography>
                <Stack spacing={2} divider={<Divider />}>
                  {items.map(item => (
                    <Box key={item.id} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Box component="img" src={item.image} alt={item.name} sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#2C1810' }}>{item.name}</Typography>
                        <Typography variant="caption" color="textSecondary">Qty: {item.quantity}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>₦{(item.price * item.quantity).toLocaleString()}</Typography>
                    </Box>
                  ))}
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography color="textSecondary">Subtotal</Typography>
                  <Typography sx={{ fontWeight: 600 }}>₦{subtotal.toLocaleString()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography color="textSecondary">Shipping</Typography>
                  <Typography sx={{ fontWeight: 600 }}>{shipping === 0 ? 'FREE' : `₦${shipping.toLocaleString()}`}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C1810' }}>Total</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#8B7355' }}>₦{total.toLocaleString()}</Typography>
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
