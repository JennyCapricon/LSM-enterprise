import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Container, Box, Typography, Grid, TextField, Button, Paper, Stack, Card, CardContent, Alert,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import SEO from '../components/SEO';
import { faqs } from '../data/products';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.send(
        'service_default',
        'template_default',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'hello@jayfabrics.com',
        },
        'user_default'
      );
    } catch (err) {
      console.log('Email service not configured — message logged:', formData);
    }
    setSending(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactInfo = [
    { icon: <LocationOnIcon sx={{ fontSize: 40 }} />, title: 'Visit Us', details: ['123 Fashion Street', 'Lagos, Nigeria'] },
    { icon: <PhoneIcon sx={{ fontSize: 40 }} />, title: 'Call Us', details: ['09027089929', '08038777330'] },
    { icon: <EmailIcon sx={{ fontSize: 40 }} />, title: 'Email Us', details: ['hello@jayfabrics.com', 'support@jayfabrics.com'] },
    { icon: <AccessTimeIcon sx={{ fontSize: 40 }} />, title: 'Business Hours', details: ['Mon-Fri: 9am - 6pm', 'Sat: 10am - 4pm'] },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <SEO title="Contact Us" description="Get in touch with JAY. We're based in Lagos, Nigeria — serving customers worldwide." />
      <Box sx={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)', color: '#f5f5f5', py: 8, textAlign: 'center' }}>
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontFamily: '"Playfair Display", serif' }}>
            Get in Touch
          </Typography>
          <Typography variant="h6" sx={{ color: '#e0e0e0' }}>
            We'd love to hear from you! Send us a message and we'll respond as soon as possible.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
              Contact Information
            </Typography>
            <Stack spacing={3}>
              {contactInfo.map((info, index) => (
                <Card key={index} sx={{ border: '1px solid #e0e0e0', boxShadow: 'none' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <Box sx={{ color: '#1a1a1a' }}>{info.icon}</Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>{info.title}</Typography>
                        {info.details.map((detail, idx) => (
                          <Typography key={idx} variant="body2" sx={{ color: '#6B5B4F' }}>{detail}</Typography>
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ p: 4, border: '1px solid #e0e0e0', borderRadius: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
                Send us a Message
              </Typography>
              {submitted && (
                <Alert severity="success" sx={{ mb: 3, backgroundColor: '#E8F5E9', color: '#2E7D32' }}>
                  Thank you for your message! We will get back to you soon.
                </Alert>
              )}
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} required variant="outlined" />
                  <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required variant="outlined" />
                  <TextField fullWidth label="Subject" name="subject" value={formData.subject} onChange={handleChange} required variant="outlined" />
                  <TextField fullWidth label="Message" name="message" value={formData.message} onChange={handleChange} required multiline rows={5} variant="outlined" />
                  <Button
                    type="submit" variant="contained" size="large" disabled={sending}
                    startIcon={<SendIcon />}
                    sx={{ backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000000' }, fontWeight: 600 }}
                  >
                    {sending ? 'Sending...' : 'Send Message'}
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ width: '100%', py: 8, backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="xl">
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, textAlign: 'center', color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
            Find Us on the Map
          </Typography>
          <Paper elevation={0} sx={{ height: { xs: 280, md: 450 }, borderRadius: 2, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.576638258066!2d3.376718!3d6.465422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1648477654321!5m2!1sen!2sus"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Store Location"
            ></iframe>
          </Paper>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 4, textAlign: 'center', color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
          Frequently Asked Questions
        </Typography>
        <Grid container spacing={3}>
          {faqs.map((faq, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper elevation={0} sx={{ p: 3, height: '100%', border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a' }}>
                  {faq.question}
                </Typography>
                <Typography variant="body2" sx={{ color: '#6B5B4F' }}>
                  {faq.answer}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
