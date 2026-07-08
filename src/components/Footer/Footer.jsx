import React, { useState } from 'react';
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
import Logo from '../Logo';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };
  const collectionLinks = [
    { label: "Women's Gallery", path: '/womens-gallery' },
    { label: "Women's Fashion", path: '/womens-fashion' },
    { label: "Men's Fashion", path: '/mens-fashion' },
    { label: 'Children Fashion', path: '/children-fashion' },
  ];

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop All', path: '/shop' },
    { label: 'About Us', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  const customerLinks = [
    { label: 'My Account', path: '/account' },
    { label: 'My Orders', path: '/orders' },
    { label: 'My Cart', path: '/cart' },
    { label: 'Wishlist', path: '/wishlist' },
    { label: 'Measurement Guide', path: '/measurement-guide' },
    { label: 'Help Center', path: '/help' },
    { label: 'Shipping Info', path: '/shipping' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1a1a1a',
        color: '#ccc',
        pt: 8,
        pb: 3,
        mt: 'auto',
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Logo />
            <Typography variant="body2" sx={{ my: 2, color: '#999', lineHeight: 1.8 }}>
              Modern fashion for everyone. Curated collections for women, men, and children — shipped worldwide.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton sx={{ color: '#999', '&:hover': { color: '#fff' } }} size="small">
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: '#999', '&:hover': { color: '#fff' } }} size="small">
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ color: '#999', '&:hover': { color: '#fff' } }} size="small">
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: '#999', '&:hover': { color: '#fff' } }} size="small">
                <PinterestIcon />
              </IconButton>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', mb: 2, fontSize: '0.85rem', letterSpacing: '0.05em' }}>
              COLLECTIONS
            </Typography>
            <Stack spacing={1.5}>
              {collectionLinks.map(link => (
                <Link
                  key={link.label}
                  component={RouterLink}
                  to={link.path}
                  underline="none"
                  sx={{ color: '#999', fontSize: '0.85rem', '&:hover': { color: '#fff' } }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', mb: 2, fontSize: '0.85rem', letterSpacing: '0.05em' }}>
              CUSTOMER SERVICE
            </Typography>
            <Stack spacing={1.5}>
              {customerLinks.map(link => (
                <Link
                  key={link.label}
                  component={RouterLink}
                  to={link.path}
                  underline="none"
                  sx={{ color: '#999', fontSize: '0.85rem', '&:hover': { color: '#fff' } }}
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
                  sx={{ color: '#999', fontSize: '0.85rem', '&:hover': { color: '#fff' } }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', mb: 2, fontSize: '0.85rem', letterSpacing: '0.05em' }}>
              CONTACT
            </Typography>
            <Stack spacing={1.5} sx={{ mb: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnIcon sx={{ fontSize: 16, color: '#999' }} />
                <Typography variant="body2" sx={{ color: '#999', fontSize: '0.85rem' }}>123 Fashion Street, Lagos</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneIcon sx={{ fontSize: 16, color: '#999' }} />
                <Typography variant="body2" sx={{ color: '#999', fontSize: '0.85rem' }}>09027089929</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <EmailIcon sx={{ fontSize: 16, color: '#999' }} />
                <Typography variant="body2" sx={{ color: '#999', fontSize: '0.85rem' }}>hello@jayfabrics.com</Typography>
              </Stack>
            </Stack>
            <Typography variant="body2" sx={{ mb: 1, color: '#999', fontSize: '0.85rem' }}>
              Subscribe for updates
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                placeholder="Your email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    color: '#ccc',
                    '& fieldset': { borderColor: '#444' },
                    '&:hover fieldset': { borderColor: '#ff6b6b' },
                  },
                  '& .MuiInputBase-input::placeholder': { color: '#666', opacity: 1 },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSubscribe}
                sx={{ backgroundColor: '#ff6b6b', color: '#fff', fontWeight: 600, whiteSpace: 'nowrap', '&:hover': { backgroundColor: '#e55a5a' } }}
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </Button>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ backgroundColor: '#333', my: 4 }} />

        <Typography variant="body2" sx={{ textAlign: 'center', color: '#666', fontSize: '0.8rem' }}>
          &copy; {new Date().getFullYear()} JAY. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
