import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Button, Card, CardMedia, CardContent, CardActions,
  Grid, Chip, Rating, Paper, Stack, IconButton,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SEO from '../components/SEO';
import { products, categories, shades } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const Home = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const featured = products.filter(p => p.featured);

  return (
    <Box sx={{ width: '100%' }}>
      <SEO title="Home" description="Premium African fashion fabrics marketplace. Source quality jonkoso, lace, silk, scuba, duchess, crepe, stockflow, stripe, cubana, vintage and more." />

      {/* HERO */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #5C4A32 0%, #8B7355 50%, #C4A882 100%)',
          color: '#FAF6F1',
          py: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip
                label="Exclusive Offer 20% Off This Week"
                sx={{ mb: 2, borderColor: '#D4A574', color: '#D4A574', fontWeight: 600 }}
                variant="outlined"
              />
              <Typography
                variant="h3"
                component="h1"
                sx={{ fontWeight: 800, mb: 2, lineHeight: 1.2, fontFamily: '"Playfair Display", serif' }}
              >
                Safe. Stylish. Scalable.
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.95, color: '#E8DDD0' }}>
                Premium African fashion fabrics. Sourced with care, delivered with trust.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} sx={{ mb: 4 }}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: '#D4A574', color: '#FAF6F1', fontWeight: 600,
                    '&:hover': { backgroundColor: 'rgba(212,165,116,0.15)', borderColor: '#E8C9A0' },
                  }}
                  onClick={() => navigate('/shop')}
                >
                  Select Category
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/deals')}
                  sx={{
                    backgroundColor: '#D4A574', color: '#2C1810', fontWeight: 700,
                    '&:hover': { backgroundColor: '#E8C9A0' },
                  }}
                >
                  Shop Now
                </Button>
              </Stack>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Rating value={4.8} readOnly precision={0.1} sx={{ '& .MuiRating-iconFilled': { color: '#D4A574' } }} />
                <Typography variant="body2">4.8 (450+ Reviews)</Typography>
              </Box>
              <Box
                sx={{
                  mt: 4, p: 2, backgroundColor: 'rgba(255,255,255,0.08)',
                  borderRadius: 2, backdropFilter: 'blur(10px)',
                }}
              >
                <Typography variant="body2">Not Yet a Member?</Typography>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => navigate('/register')}
                  sx={{ mt: 1, backgroundColor: '#D4A574', color: '#2C1810', '&:hover': { backgroundColor: '#E8C9A0' } }}
                >
                  Sign Up Now
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/model.png"
                alt="LSM Enterprise fashion"
                sx={{ width: '100%', height: 'auto', borderRadius: 2, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* PREMIUM SHADES */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: '#2C1810' }}>
          Premium Shades
        </Typography>
        <Grid container spacing={2}>
          {shades.map((shade, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                onClick={() => navigate(shade.path)}
                sx={{
                  p: 3, textAlign: 'center', cursor: 'pointer',
                  border: '1px solid #E8DDD0', borderRadius: 2,
                  transition: 'all 0.3s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(44,24,16,0.12)', borderColor: '#C4A882' },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
                  {shade.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CATEGORIES */}
      <Box sx={{ backgroundColor: '#FAF6F1', py: 8, borderTop: '1px solid #E8DDD0', borderBottom: '1px solid #E8DDD0' }}>
        <Container>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: '#2C1810' }}>
            Categories
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {categories.map((cat, index) => (
              <Chip
                key={cat.id}
                label={cat.name}
                onClick={() => navigate(`/shop?category=${cat.id}`)}
                variant={index === 0 ? 'filled' : 'outlined'}
                clickable
                sx={{
                  fontWeight: 500,
                  backgroundColor: index === 0 ? '#8B7355' : 'transparent',
                  color: index === 0 ? '#FAF6F1' : '#6B5B4F',
                  borderColor: '#C4A882',
                  '&:hover': { backgroundColor: index === 0 ? '#5C4A32' : 'rgba(139,115,85,0.08)' },
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* MEASUREMENT GUIDE */}
      <Box sx={{ backgroundColor: '#2C1810', py: 6 }}>
        <Container>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#D4A574', mb: 1, fontFamily: '"Playfair Display", serif' }}>
                Not Sure How Much Fabric You Need?
              </Typography>
              <Typography variant="body1" sx={{ color: '#E8DDD0' }}>
                Use our Fabric Measurement Guide to calculate the perfect yardage for your dress, shirt, trousers, and more.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/measurement-guide')}
                sx={{ backgroundColor: '#D4A574', color: '#2C1810', fontWeight: 700, '&:hover': { backgroundColor: '#E8C9A0' } }}
              >
                Calculate Now
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FEATURED PRODUCTS */}
      <Container sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#2C1810' }}>
            Featured Products
          </Typography>
          <Button
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/shop')}
            sx={{ color: '#8B7355', fontWeight: 600 }}
          >
            View All
          </Button>
        </Box>
        <Grid container spacing={3}>
          {featured.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 40px rgba(44,24,16,0.15)' },
                }}
                onClick={() => navigate(`/shop/${product.slug}`)}
              >
                <CardMedia
                  component="img"
                  height="260"
                  image={product.images[0]}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: '#2C1810', fontFamily: '"Playfair Display", serif' }}>
                    {product.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, mt: 1 }}>
                    <Rating value={product.rating} readOnly precision={0.1} size="small" sx={{ '& .MuiRating-iconFilled': { color: '#D4A574' } }} />
                    <Typography variant="caption" color="textSecondary">({product.reviews})</Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#8B7355' }}>
                    ₦{product.price.toLocaleString()}
                  </Typography>
                </CardContent>
                <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    onClick={(e) => { e.stopPropagation(); addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0] }); }}
                    sx={{ backgroundColor: '#8B7355', '&:hover': { backgroundColor: '#5C4A32' }, fontWeight: 600 }}
                  >
                    Add to Cart
                  </Button>
                  <IconButton
                    onClick={(e) => { e.stopPropagation(); toggleItem({ id: product.id, name: product.name, price: product.price, image: product.images[0] }); }}
                    sx={{ color: isInWishlist(product.id) ? '#D4A574' : '#C4A882' }}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
