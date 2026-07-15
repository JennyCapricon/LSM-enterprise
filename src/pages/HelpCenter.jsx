import React, { useState } from 'react';
import { Container, Box, Typography, Paper, Stack, Accordion, AccordionSummary, AccordionDetails, TextField, Button, InputAdornment } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import HelpIcon from '@mui/icons-material/Help';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReplyIcon from '@mui/icons-material/Reply';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SEO from '../components/SEO';
import { vendors, formatWhatsAppNumber } from '../data/vendors';

const faqs = [
  { section: 'Orders & Payments', icon: <PaymentIcon />, questions: [
    { q: 'How do I place an order?', a: 'Browse our shop, add items to your cart, and proceed to checkout. Fill in your delivery details and choose your payment method (bank transfer or pay-on-delivery).' },
    { q: 'What payment methods do you accept?', a: 'We accept bank transfers and pay-on-delivery. After placing your order, transfer the amount and confirm via WhatsApp for quick processing.' },
    { q: 'Can I modify or cancel my order?', a: 'You can modify or cancel your order within 24 hours of placement by contacting us via WhatsApp or email. After that, the order enters processing.' },
    { q: 'Is my payment information secure?', a: 'Yes. We use industry-standard encryption and secure payment processing. Your payment details are never stored on our servers.' },
  ]},
  { section: 'Shipping & Delivery', icon: <LocalShippingIcon />, questions: [
    { q: 'How long does shipping take?', a: 'Orders are processed within 1-2 business days. Delivery typically takes 3-7 business days depending on your location.' },
    { q: 'How much does shipping cost?', a: 'Shipping is free on orders over ₦100. For orders under ₦100, a flat rate of ₦15 applies.' },
    { q: 'Do you ship internationally?', a: 'Yes, we ship worldwide. International delivery times vary by destination and customs clearance.' },
    { q: 'Can I track my order?', a: 'Yes, once your order is shipped, you will receive a tracking number via email or WhatsApp.' },
  ]},
  { section: 'Returns & Refunds', icon: <ReplyIcon />, questions: [
    { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery for unused fabrics in original condition. Custom-cut items are non-returnable.' },
    { q: 'How do I initiate a return?', a: 'Contact us via WhatsApp or email with your order number and reason for return. We will provide a return authorization and instructions.' },
    { q: 'When will I get my refund?', a: 'Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund is issued to your original payment method.' },
  ]},
  { section: 'Account & Support', icon: <AccountCircleIcon />, questions: [
    { q: 'How do I create an account?', a: 'Click "Sign In" in the top menu and select "Create Account". You can register with your email or use Google Sign-In.' },
    { q: 'How do I reset my password?', a: 'On the login page, click "Forgot Password" and follow the instructions sent to your email.' },
    { q: 'How can I contact customer support?', a: 'You can reach us via WhatsApp, email at hello@jayfabrics.com, or use the Messages feature in your account dashboard.' },
  ]},
];

const HelpCenter = () => {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(false);


  const filtered = faqs.map(section => ({
    ...section,
    questions: section.questions.filter(q =>
      q.q.toLowerCase().includes(search.toLowerCase()) ||
      q.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(s => s.questions.length > 0);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
      <SEO title="Help Center" />
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <HelpIcon sx={{ fontSize: 48, color: '#ff6b6b', mb: 2 }} />
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
          Help Center
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
          Find answers to common questions or get in touch with our team
        </Typography>
        <TextField
          fullWidth placeholder="Search for answers..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          sx={{ maxWidth: { xs: '100%', md: 560 } }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#999' }} /></InputAdornment>,
            sx: { backgroundColor: '#f8f6f2', borderRadius: 2, '& fieldset': { border: 'none' } },
          }}
        />
      </Box>

      <Stack spacing={3}>
        {filtered.map((section, idx) => (
          <Paper key={idx} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 3, py: 2, backgroundColor: '#f8f6f2' }}>
              <Box sx={{ color: '#ff6b6b' }}>{section.icon}</Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>
                {section.section}
              </Typography>
            </Box>
            {section.questions.map((item, i) => (
              <Accordion key={i} elevation={0} disableGutters sx={{ borderTop: '1px solid', borderColor: 'divider', '&:before': { display: 'none' } }}
                expanded={expanded === `${idx}-${i}`}
                onChange={(e, isExp) => setExpanded(isExp ? `${idx}-${i}` : false)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3, '&:hover': { backgroundColor: 'rgba(0,0,0,0.02)' } }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.q}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>{item.a}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        ))}
      </Stack>

      <Paper elevation={0} sx={{ mt: 4, p: 4, textAlign: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Still need help?</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>Our support team is ready to assist you</Typography>
        <Button variant="contained" onClick={() => {
          const mainVendor = vendors[4];
          const whatsappNumber = formatWhatsAppNumber(mainVendor.whatsappNumber);
          const msg = encodeURIComponent(
            `Hi, my name is [Your Name].\n\nI need help with:\n[Describe your issue here]\n\nOrder ID (if any): [Order ID]\n\nThank you!`
          );
          window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
        }}
          sx={{ backgroundColor: '#1a1a2e', '&:hover': { backgroundColor: '#2d2d4e' }, fontWeight: 600 }}>
          Contact via WhatsApp
        </Button>
      </Paper>
    </Container>
  );
};

export default HelpCenter;
