import React from 'react';
import { Container, Box, Typography, Paper, Stack } from '@mui/material';
import SEO from '../../components/SEO';

const Privacy = () => {
  const sections = [
    { title: 'Information We Collect', content: 'We collect information you provide directly to us, including your name, email address, phone number, shipping address, and payment information when you create an account, place an order, or contact us.' },
    { title: 'How We Use Your Information', content: 'We use your information to process orders, communicate with you about your purchases, send you promotional materials (with your consent), improve our services, and comply with legal obligations.' },
    { title: 'Information Sharing', content: 'We do not sell your personal information. We may share your data with trusted third-party service providers who assist in operating our platform (payment processors, shipping companies) under strict confidentiality agreements.' },
    { title: 'Data Security', content: 'We implement industry-standard security measures including SSL encryption, secure payment processing via Paystack, and regular security audits to protect your personal information.' },
    { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal data. You can update your information in your account settings or contact us to request data deletion.' },
    { title: 'Cookies', content: 'We use essential cookies for site functionality and analytics cookies to improve your experience. You can control cookie preferences through your browser settings.' },
    { title: 'Contact Us', content: 'If you have questions about this privacy policy, please contact us at hello@lsmenterprises.com or visit our Contact page.' },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <SEO title="Privacy Policy" />
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: '#2C1810', textAlign: 'center', fontFamily: '"Playfair Display", serif' }}>
        Privacy Policy
      </Typography>
      <Typography variant="body1" sx={{ color: '#8B7355', mb: 4, textAlign: 'center' }}>
        Last updated: January 2024
      </Typography>
      <Paper elevation={0} sx={{ p: 4, border: '1px solid #E8DDD0', borderRadius: 2 }}>
        <Stack spacing={3}>
          {sections.map((section, index) => (
            <Box key={index}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
                {section.title}
              </Typography>
              <Typography variant="body1" sx={{ color: '#6B5B4F', lineHeight: 1.8 }}>
                {section.content}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Paper>
    </Container>
  );
};

export default Privacy;
