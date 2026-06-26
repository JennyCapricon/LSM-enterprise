import React from 'react';
import {
  Container, Box, Typography, Grid, Card, CardContent, Paper, Stack, Avatar,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SEO from '../components/SEO';
import { teamMembers } from '../data/products';

const About = () => {
  const features = [
    { icon: <LocalShippingIcon sx={{ fontSize: 40 }} />, title: 'Free Shipping', description: 'Free shipping on orders over ₦10,000' },
    { icon: <AssignmentReturnIcon sx={{ fontSize: 40 }} />, title: 'Easy Returns', description: '30-day return policy, no questions asked' },
    { icon: <LockIcon sx={{ fontSize: 40 }} />, title: 'Secure Payment', description: '100% secure transactions via Paystack' },
    { icon: <VerifiedUserIcon sx={{ fontSize: 40 }} />, title: 'Quality Guarantee', description: 'All fabrics verified by our quality team' },
  ];

  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '500+', label: 'Products' },
    { number: '50+', label: 'Vendors' },
    { number: '99%', label: 'Satisfaction' },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <SEO title="About Us" description="LSM Enterprise – premium African fashion fabrics marketplace founded in 2020. Connecting vendors with buyers." />
      <Box sx={{ background: 'linear-gradient(135deg, #5C4A32 0%, #8B7355 100%)', color: '#FAF6F1', py: 8, textAlign: 'center' }}>
        <Container>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontFamily: '"Playfair Display", serif' }}>
            About LSM Enterprise
          </Typography>
          <Typography variant="h6" sx={{ color: '#E8DDD0' }}>
            Your destination for premium African fashion fabrics. We connect vendors with serious buyers on a trusted platform.
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
              Our Story
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8, color: '#6B5B4F' }}>
              Founded in 2020, LSM Enterprise started with a simple mission: to make premium African fashion fabrics accessible to everyone. We believe that quality materials shouldn't be hard to find.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: '#6B5B4F' }}>
              Today, we serve thousands of happy customers with our curated collection of authentic African fabrics — from jonkoso, lace, silk, and duchess to stripe, cubana, and vintage. Every product is sourced from verified vendors and quality-checked before it reaches you.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/p1.jpg"
              alt="Our Story"
              sx={{ width: '100%', borderRadius: 2, boxShadow: '0 8px 24px rgba(44,24,16,0.12)' }}
            />
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ backgroundColor: '#FAF6F1', py: 8, borderTop: '1px solid #E8DDD0', borderBottom: '1px solid #E8DDD0' }}>
        <Container>
          <Grid container spacing={3}>
            {['Shop Smart. Shop Safe.', 'Authentic Fabrics', 'Secure Delivery'].map((title, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card sx={{ height: '100%', border: '1px solid #E8DDD0', boxShadow: 'none' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
                      {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6B5B4F' }}>
                      {idx === 0 && 'Our verification system ensures all vendors are trusted and all products are authentic.'}
                      {idx === 1 && 'Access high-quality fabrics, accessories, and raw materials from verified vendors across Nigeria.'}
                      {idx === 2 && 'Track your orders in real-time and receive your items safely and on time.'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center', color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
          Our Mission
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, color: '#6B5B4F', maxWidth: 700, mx: 'auto' }}>
          Entrepreneurs can focus on scaling their businesses confidently while accessing a market of trustworthy suppliers.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid #E8DDD0', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
                For Vendors
              </Typography>
              <Typography variant="body2" sx={{ color: '#6B5B4F' }}>
                Connect with serious buyers and grow your business through our trusted platform. List your products, manage orders, and scale your reach.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid #E8DDD0', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
                For Business
              </Typography>
              <Typography variant="body2" sx={{ color: '#6B5B4F' }}>
                Source quality materials from verified suppliers without worrying about authenticity. Bulk ordering and wholesale pricing available.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ backgroundColor: '#FAF6F1', py: 8, borderTop: '1px solid #E8DDD0' }}>
        <Container>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center', color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
            Why Choose Us
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%', textAlign: 'center', border: '1px solid #E8DDD0', boxShadow: 'none',
                    transition: 'all 0.3s',
                    '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 8px 24px rgba(44,24,16,0.12)' },
                  }}
                >
                  <CardContent>
                    <Box sx={{ color: '#8B7355', mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">{feature.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center', color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={3}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%', textAlign: 'center', border: '1px solid #E8DDD0', boxShadow: 'none',
                  transition: 'all 0.3s',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              >
                <Box component="img" src={member.image} alt={member.name} sx={{ width: '100%', height: 280, objectFit: 'cover' }} />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">{member.role}</Typography>
                  <Typography variant="body2" sx={{ color: '#8B7355', mt: 1 }}>{member.bio}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ background: 'linear-gradient(135deg, #5C4A32 0%, #8B7355 100%)', color: '#FAF6F1', py: 8 }}>
        <Container>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>{stat.number}</Typography>
                  <Typography variant="body1" sx={{ color: '#E8DDD0' }}>{stat.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
