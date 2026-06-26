import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  IconButton,
  Divider,
  TextField,
  Button,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Deals', path: '/deals' },
    { label: 'About Us', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  const customerLinks = [
    { label: 'My Account', path: '/account' },
    { label: 'My Cart', path: '/cart' },
    { label: 'Wishlist', path: '/wishlist' },
    { label: 'Measurement Guide', path: '/measurement-guide' },
    { label: 'Order Tracking', path: '/account' },
    { label: 'Help & FAQ', path: '/contact' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#2C1810',
        color: '#E8DDD0',
        pt: 8,
        pb: 3,
        mt: 'auto',
      }}
    >
      <Container>
        <Grid container spacing={4}>
          {/* Brand */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                color: '#D4A574',
                mb: 2,
              }}
            >
              LSM Enterprise
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: '#C4A882', lineHeight: 1.8 }}>
              Premium African fashion fabrics marketplace. Connecting vendors and buyers with authentic, high-quality materials.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton sx={{ color: '#D4A574', '&:hover': { color: '#E8C9A0' } }} size="small">
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: '#D4A574', '&:hover': { color: '#E8C9A0' } }} size="small">
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ color: '#D4A574', '&:hover': { color: '#E8C9A0' } }} size="small">
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: '#D4A574', '&:hover': { color: '#E8C9A0' } }} size="small">
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#D4A574', mb: 2 }}>
              Quick Links
            </Typography>
            <Stack spacing={1.5}>
              {quickLinks.map(link => (
                <Link
                  key={link.label}
                  component={RouterLink}
                  to={link.path}
                  underline="none"
                  sx={{ color: '#C4A882', '&:hover': { color: '#E8C9A0' } }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Customer Service */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#D4A574', mb: 2 }}>
              Customer Service
            </Typography>
            <Stack spacing={1.5}>
              {customerLinks.map(link => (
                <Link
                  key={link.label}
                  component={RouterLink}
                  to={link.path}
                  underline="none"
                  sx={{ color: '#C4A882', '&:hover': { color: '#E8C9A0' } }}
                >
                  {link.label}
                </Link>
              ))}
              {legalLinks.map(link => (
                <Link
                  key={link.label}
                  component={RouterLink}
                  to={link.path}
                  underline="none"
                  sx={{ color: '#C4A882', '&:hover': { color: '#E8C9A0' } }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact & Newsletter */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#D4A574', mb: 2 }}>
              Contact Us
            </Typography>
            <Stack spacing={1.5} sx={{ mb: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnIcon sx={{ fontSize: 18, color: '#D4A574' }} />
                <Typography variant="body2">123 Fashion Street, Lagos, Nigeria</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneIcon sx={{ fontSize: 18, color: '#D4A574' }} />
                <Typography variant="body2">+234 123 456 7890</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <EmailIcon sx={{ fontSize: 18, color: '#D4A574' }} />
                <Typography variant="body2">hello@lsmenterprises.com</Typography>
              </Stack>
            </Stack>
            <Typography variant="body2" sx={{ mb: 1, color: '#C4A882' }}>
              Subscribe for deals
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                placeholder="Your email"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#E8DDD0',
                    '& fieldset': { borderColor: '#6B5B4F' },
                    '&:hover fieldset': { borderColor: '#D4A574' },
                  },
                  '& .MuiInputBase-input::placeholder': { color: '#8B7355', opacity: 1 },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#D4A574',
                  color: '#2C1810',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  '&:hover': { backgroundColor: '#E8C9A0' },
                }}
              >
                Subscribe
              </Button>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ backgroundColor: '#6B5B4F', my: 4 }} />

        <Typography variant="body2" sx={{ textAlign: 'center', color: '#8B7355' }}>
          &copy; {new Date().getFullYear()} LSM Enterprise. All rights reserved. | Safe. Stylish. Scalable.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
