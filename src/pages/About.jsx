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
import styles from './About.module.css';

const About = () => {
  const features = [
    { icon: <LocalShippingIcon sx={{ fontSize: 40 }} />, title: 'Free Shipping', description: 'Free shipping on orders over ₦100' },
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
      <SEO title="About Us" description="JAY – modern fashion destination for women, men, and children. Curated collections shipped worldwide." />
      <Box sx={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)', color: '#f5f5f5', py: 8, textAlign: 'center' }}>
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontFamily: '"Playfair Display", serif' }}>
            About JAY
          </Typography>
          <Typography variant="h6" sx={{ color: '#e0e0e0' }}>
            Your destination for modern fashion. Curated collections for every style and occasion.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
              Our Story
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8, color: '#666' }}>
              Founded in 2020, JAY started with a simple mission: to make modern fashion accessible to everyone. We believe that great style shouldn't be hard to find.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: '#666' }}>
              Today, we serve thousands of happy customers worldwide with our curated collection of fashion apparel and accessories. Every piece is sourced with care and quality-checked before it reaches you.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/p1.jpg"
              alt="Our Story"
              sx={{ width: '40%', borderRadius: 2, boxShadow: '0 8px 20px rgba(44,24,16,0.12)' }}
            />
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ backgroundColor: '#f5f5f5', py: 8, borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0' }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {['Shop Smart. Shop Safe.', 'Authentic Fabrics', 'Secure Delivery'].map((title, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card sx={{ height: '100%', border: '1px solid #e0e0e0', boxShadow: 'none' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                      {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {idx === 0 && 'Every fabric is quality-checked before it reaches you.'}
                      {idx === 1 && 'Premium fabrics sourced from trusted mills worldwide.'}
                      {idx === 2 && 'Track your orders in real-time and receive them safely.'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center', color: '#1a1a1a' }}>
          Our Mission
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, color: '#666', maxWidth: { xs: '100%', md: 800 }, mx: 'auto' }}>
          To make quality fabrics accessible to everyone — from home sewists to professional designers. We believe great style starts with great materials.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
                For Vendors
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Partner with us and showcase your collections to a global audience. List your products and grow your reach.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
                For Everyone
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Curated fashion collections for women, men, and children. Discover your next favorite look.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ backgroundColor: '#f5f5f5', py: 8, borderTop: '1px solid #e0e0e0' }}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center', color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
            Why Choose Us
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%', textAlign: 'center', border: '1px solid #e0e0e0', boxShadow: 'none',
                    transition: 'all 0.3s',
                    '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 8px 24px rgba(44,24,16,0.12)' },
                  }}
                >
                  <CardContent>
                    <Box sx={{ color: '#1a1a1a', mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
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

      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center', color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
          Meet Our Team
        </Typography>
        <div className={styles['team-grid']} role="grid" aria-label="Meet our team">
          {teamMembers.map((member) => (
            <div className={styles['team-grid__item']} key={member.name}>
              <Card
                sx={{
                  width: '100%', textAlign: 'center', border: '1px solid #e0e0e0', boxShadow: 'none',
                  transition: 'all 0.3s',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              >
                <Box component="img" src={member.image} alt={member.name} sx={{ width: '100%', height: { xs: 240, md: 320 }, objectFit: 'cover' }} />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">{member.role}</Typography>
                  <Typography variant="body2" sx={{ color: '#1a1a1a', mt: 1 }}>{member.bio}</Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </Container>

      <Box sx={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)', color: '#f5f5f5', py: 8 }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 4, md: 8 }} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={3} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>{stat.number}</Typography>
                  <Typography variant="body1" sx={{ color: '#e0e0e0' }}>{stat.label}</Typography>
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
