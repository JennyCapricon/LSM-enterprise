import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Paper, Button, Stack, Card, CardContent, CardMedia, Chip,
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleIcon from '@mui/icons-material/People';
import VerifiedIcon from '@mui/icons-material/Verified';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SEO from '../components/SEO';
import ProductBadge from '../components/ProductBadge';
import { getVendorForProduct } from '../data/vendors';
import { useProducts } from '../services/useLiveData';
import { useCart } from '../contexts/CartContext';
import styles from './Marketplace.module.css';

const Marketplace = () => {
  const navigate = useNavigate();
  const [hoveredBenefit, setHoveredBenefit] = useState(null);
  const [hoveredStep, setHoveredStep] = useState(null);
  const { addItem } = useCart();
  const products = useProducts();
  const featuredProducts = products.slice(0, 6);

  const benefits = [
    { icon: <PeopleIcon sx={{ fontSize: 48 }} />, title: 'Access Serious Buyers', description: 'Connect with thousands of verified businesses and fashion designers looking for quality materials.' },
    { icon: <VerifiedIcon sx={{ fontSize: 48 }} />, title: 'Verified & Trusted', description: 'Our verification system ensures you deal with genuine buyers and sellers. No fraud, no stress.' },
    { icon: <TrendingUpIcon sx={{ fontSize: 48 }} />, title: 'Grow Your Business', description: 'Scale your reach beyond your local market. List products, manage orders, and track growth.' },
    { icon: <StorefrontIcon sx={{ fontSize: 48 }} />, title: 'Easy Listing', description: 'Create your storefront in minutes. Upload products, set prices, and start selling.' },
  ];

  const steps = [
    { number: '01', title: 'Create Your Account', description: 'Sign up as a vendor and complete your profile verification.' },
    { number: '02', title: 'Set Up Your Store', description: 'List your products with images, descriptions, and prices.' },
    { number: '03', title: 'Receive Orders', description: 'Get notified when buyers place orders and manage them from your dashboard.' },
    { number: '04', title: 'Get Paid', description: 'Receive payments securely through Paystack. Withdraw anytime.' },
  ];

  const cardSx = (isHovered) => ({
    p: { xs: 3, md: 3.5 },
    textAlign: 'center',
    border: '1px solid #e0e0e0',
    borderRadius: 2,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: { xs: 200, md: 240 },
    transition: 'transform 0.3s, box-shadow 0.3s',
    transform: isHovered ? { xs: 'none', md: 'translateY(-6px)' } : 'none',
    boxShadow: isHovered ? { xs: 'none', md: '0 12px 40px rgba(0,0,0,0.1)' } : 'none',
    cursor: 'default',
  });

  return (
    <Box sx={{ width: '100%' }}>
      <SEO title="Marketplace" description="Join JAY marketplace. Connect with fashion brands, designers, and shoppers worldwide." />

      {/* HERO */}
      <Box sx={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)', color: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden', py: { xs: 8, md: 10 }, px: { xs: 3, md: 4 } }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: { xs: 0, md: 0.06 }, background: 'radial-gradient(circle at 20% 50%, #ff6b6b 0%, transparent 50%), radial-gradient(circle at 80% 50%, #f7c948 0%, transparent 50%)' }} />
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          <StorefrontIcon sx={{ fontSize: { xs: 64, md: 80 }, mb: { xs: 2, md: 3 }, color: '#ff6b6b' }} />
          <Typography variant="h3" sx={{ fontWeight: 800, mb: { xs: 2, md: 3 }, fontFamily: '"Playfair Display", serif', fontSize: { xs: '2rem', md: '3.5rem' }, lineHeight: 1.15 }}>
            JAY Marketplace
          </Typography>
          <Typography variant="h6" sx={{ color: '#e0e0e0', mb: { xs: 4, md: 5 }, fontSize: { xs: '1rem', md: '1.2rem' }, maxWidth: 640, mx: 'auto', lineHeight: 1.7 }}>
            The modern marketplace for fashion. Connect brands with shoppers on a trusted platform.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
            <Button variant="contained" size="large" onClick={() => navigate('/register')}
              sx={{ backgroundColor: '#ff6b6b', color: '#1a1a1a', fontWeight: 700, px: { xs: 5, md: 6 }, py: { xs: 1.5, md: 2 }, fontSize: { xs: '0.9rem', md: '1.05rem' }, '&:hover': { backgroundColor: '#E8C9A0' } }}>
              Start Selling
            </Button>
            <Button variant="outlined" size="large" onClick={() => navigate('/shop')}
              sx={{ borderColor: '#ff6b6b', color: '#f5f5f5', fontWeight: 600, px: { xs: 5, md: 6 }, py: { xs: 1.5, md: 2 }, fontSize: { xs: '0.9rem', md: '1.05rem' }, '&:hover': { backgroundColor: 'rgba(212,165,116,0.15)' } }}>
              Start Buying
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* BENEFITS GRID */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: { xs: 5, md: 6 }, textAlign: 'center', color: '#1a1a1a', fontFamily: '"Playfair Display", serif', fontSize: { xs: '1.5rem', md: '2rem' } }}>
          Why Join Our Marketplace?
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center" alignItems="stretch">
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
              <Paper elevation={0} sx={cardSx(hoveredBenefit === index)} onMouseEnter={() => setHoveredBenefit(index)} onMouseLeave={() => setHoveredBenefit(null)}>
                <Box sx={{ color: '#1a1a1a', mb: { xs: 2, md: 2.5 } }}>{benefit.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: { xs: 1, md: 1.5 }, color: '#1a1a1a', fontFamily: '"Playfair Display", serif', fontSize: { xs: '1rem', md: '1.1rem' } }}>
                  {benefit.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#6B5B4F', lineHeight: { xs: 1.6, md: 1.7 }, fontSize: { xs: '0.8rem', md: '0.85rem' } }}>{benefit.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* STEPS GRID */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: { xs: 8, md: 10 }, borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: { xs: 5, md: 6 }, textAlign: 'center', color: '#1a1a1a', fontFamily: '"Playfair Display", serif', fontSize: { xs: '1.5rem', md: '2rem' } }}>
            How It Works
          </Typography>
          <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center" alignItems="stretch">
            {steps.map((step, index) => (
            <Grid item xs={12} sm={6} key={index}>
                <Paper elevation={0} sx={cardSx(hoveredStep === index)} onMouseEnter={() => setHoveredStep(index)} onMouseLeave={() => setHoveredStep(null)}>
                  <Box sx={{ width: { xs: 60, md: 68 }, height: { xs: 60, md: 68 }, borderRadius: '50%', backgroundColor: '#ff6b6b', color: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: { xs: '1.4rem', md: '1.6rem' }, fontWeight: 800, mb: { xs: 2, md: 2.5 } }}>
                    {step.number}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: { xs: 1, md: 1.5 }, color: '#1a1a1a', fontFamily: '"Playfair Display", serif', fontSize: { xs: '1rem', md: '1.1rem' } }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6B5B4F', lineHeight: { xs: 1.6, md: 1.7 }, fontSize: { xs: '0.8rem', md: '0.85rem' } }}>{step.description}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FEATURED PRODUCTS */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: { xs: 5, md: 6 }, textAlign: 'center', color: '#1a1a1a', fontFamily: '"Playfair Display", serif', fontSize: { xs: '1.5rem', md: '2rem' } }}>
          Featured Products
        </Typography>
        <div className={styles['product-grid']} role="grid" aria-label="Featured products">
          {featuredProducts.map((product) => (
            <div className={styles['product-card']} key={product.id}>
              <Card
                sx={{
                  height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer',
                  position: 'relative', transition: 'all 0.3s',
                  border: '1px solid', borderColor: 'divider', boxShadow: 'none', borderRadius: 2,
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' },
                }}
              >
                <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {product.status !== 'active' && <ProductBadge type={product.status} />}
                  {product.stockQuantity === 0 && product.status === 'active' && <ProductBadge type="sold-out" />}
                  {product.stockQuantity > 0 && product.stockQuantity <= 5 && product.status === 'active' && <ProductBadge type="almost-sold-out" />}
                  {product.isNew && <ProductBadge isNew />}
                </Box>
                {product.discount > 0 && (
                  <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, backgroundColor: '#ff6b6b', color: '#fff', padding: '2px 8px', fontSize: '0.7rem', fontWeight: 700, borderRadius: 1 }}>
                    -{product.discount}%
                  </Box>
                )}
                <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#f5f5f5', aspectRatio: '3/4' }}>
                  <CardMedia component="img" image={product.images[0]} alt={product.name} sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', '&:hover': { transform: 'scale(1.06)' } }} />
                </Box>
                <CardContent sx={{ flexGrow: 1, px: 2, pt: 2, pb: 1 }}>
                  <Typography variant="overline" sx={{ color: '#999', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{product.category}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, fontSize: '0.9rem', lineHeight: 1.3, minHeight: 42 }}>{product.name}</Typography>
                  <Stack direction="row" spacing={1} alignItems="baseline" sx={{ mt: 'auto' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', color: '#ff6b6b' }}>
                      ₦{product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#999' }}>{product.unit}</Typography>
                    {product.comparePrice && (
                      <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#ccc', fontSize: '0.8rem' }}>
                        ₦{product.comparePrice.toFixed(2)}
                      </Typography>
                    )}
                  </Stack>
                  <Stack direction="row" spacing={0.5} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
                    {product.styleInspiration?.slice(0, 2).map((style, i) => (
                      <Chip key={i} label={style} size="small" variant="outlined" sx={{ borderColor: '#ddd', fontSize: '0.65rem', height: 22 }} />
                    ))}
                  </Stack>
                </CardContent>
                <Box sx={{ px: 2, pb: 2, pt: 0 }}>
                  <Button fullWidth variant="contained" size="small" startIcon={<ShoppingCartIcon />}
                    onClick={(e) => { e.stopPropagation(); const v = getVendorForProduct(product.id); addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0], vendorId: v?.id, inStock: product.inStock }); }}
                    sx={{ backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000' }, fontWeight: 600, fontSize: '0.8rem', borderRadius: 1.5 }}>
                    Add to Cart
                  </Button>
                </Box>
              </Card>
            </div>
          ))}
        </div>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="outlined" onClick={() => navigate('/shop')}
            sx={{ borderColor: '#1a1a1a', color: '#1a1a1a', fontWeight: 600, px: 4 }}>
            View All Products
          </Button>
        </Box>
      </Container>

      {/* CTA */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        <Grid container spacing={{ xs: 3, md: 4 }} alignItems="stretch">
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: { xs: 5, md: 6 }, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f5f5f5', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: { xs: 2, md: 3 }, color: '#1a1a1a', fontFamily: '"Playfair Display", serif', fontSize: { xs: '1.5rem', md: '2rem' } }}>
                Ready to Join?
              </Typography>
              <Typography variant="body1" sx={{ color: '#1a1a1a', mb: { xs: 4, md: 5 }, maxWidth: { xs: '100%', md: 600 }, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                Whether you're a brand looking to sell or a shopper looking for quality fashion, JAY Marketplace is the place.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button variant="contained" size="large" onClick={() => navigate('/register')}
                  sx={{ backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000000' }, fontWeight: 700, px: { xs: 4, md: 5 } }}>
                  Join as Vendor
                </Button>
                <Button variant="outlined" size="large" onClick={() => navigate('/shop')}
                  sx={{ borderColor: '#ccc', color: '#6B5B4F', fontWeight: 600, px: { xs: 4, md: 5 } }}>
                  Browse Products
                </Button>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: { xs: 5, md: 6 }, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#1a1a1a', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: { xs: 1, md: 2 }, color: '#ff6b6b', fontFamily: '"Playfair Display", serif', fontSize: { xs: '1.3rem', md: '1.6rem' } }}>
                Free to Join
              </Typography>
              <Typography variant="body2" sx={{ color: '#ccc', fontSize: { xs: '0.8rem', md: '0.88rem' } }}>
                No setup fees. No hidden charges. Start selling today.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Marketplace;
