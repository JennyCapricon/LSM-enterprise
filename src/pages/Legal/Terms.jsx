import React from 'react';
import { Container, Box, Typography, Paper, Stack } from '@mui/material';
import SEO from '../../components/SEO';

const Terms = () => {
  const sections = [
    { title: 'Acceptance of Terms', content: 'By accessing and using LSM Enterprise, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.' },
    { title: 'Account Registration', content: 'You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials.' },
    { title: 'Products & Pricing', content: 'All product prices are listed in Nigerian Naira (₦) and are subject to change without notice. We reserve the right to modify or discontinue products at any time.' },
    { title: 'Orders & Payment', content: 'By placing an order, you agree to pay the specified price plus applicable shipping fees. Payment is processed securely through Paystack. Orders are confirmed upon payment verification.' },
    { title: 'Shipping & Delivery', content: 'We strive to process and ship orders within 1-2 business days. Delivery times vary by location. LSM Enterprise is not responsible for delays caused by customs or shipping carriers.' },
    { title: 'Returns & Refunds', content: 'We accept returns within 30 days of delivery for unused items in original condition. Refunds are processed within 5-7 business days after we receive the returned item.' },
    { title: 'Vendor Terms', content: 'Vendors listing on our marketplace agree to provide accurate product descriptions, maintain quality standards, and fulfill orders promptly. LSM Enterprise reserves the right to remove listings that violate our policies.' },
    { title: 'Limitation of Liability', content: 'LSM Enterprise shall not be liable for any indirect, incidental, or consequential damages arising from the use of our platform. Our total liability is limited to the purchase price of the product.' },
    { title: 'Changes to Terms', content: 'We reserve the right to update these terms at any time. Users will be notified of material changes via email or site notice. Continued use constitutes acceptance of updated terms.' },
    { title: 'Contact', content: 'For questions about these terms, contact us at hello@lsmenterprises.com.' },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <SEO title="Terms of Service" />
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: '#2C1810', textAlign: 'center', fontFamily: '"Playfair Display", serif' }}>
        Terms of Service
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

export default Terms;
