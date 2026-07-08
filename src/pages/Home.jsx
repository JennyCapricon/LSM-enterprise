import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Button, Card, CardMedia, CardContent, CardActions,
  Grid, Paper, Stack, IconButton, Rating,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import InstagramIcon from '@mui/icons-material/Instagram';
import StraightenIcon from '@mui/icons-material/Straighten';
import SEO from '../components/SEO';
import ProductBadge from '../components/ProductBadge';
import { products, collections, styleIdeas } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const Home = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const featured = products.filter(p => p.featured).slice(0, 8);

  return (
    <Box sx={{ width: '100%' }}>
      <SEO title="Home" description="JAY Fabrics — premium fabrics by the yard. Browse our collection, find style inspiration, and bring your sewing projects to life." />

      {/* HERO */}
      <Box sx={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d4e 40%, #ff6b6b 100%)' }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, background: 'radial-gradient(circle at 20% 80%, rgba(247,201,72,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)' }} />
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: { xs: 'auto', md: '80vh' }, position: 'relative', zIndex: 1 }}>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', py: { xs: 8, md: 0 }, px: { xs: 3, md: 4 } }}>
            <Box sx={{ maxWidth: 520 }}>
              <Typography variant="overline" sx={{ color: '#f7c948', fontWeight: 700, letterSpacing: '0.15em', fontSize: '0.7rem', mb: 2, display: 'block' }}>
                Premium Fabrics by the Yard
              </Typography>
              <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, lineHeight: 1.1, fontSize: { xs: '2.5rem', md: '4rem' }, letterSpacing: '-0.03em', color: '#fff' }}>
                Your Fabric<br />Destination
              </Typography>
              <Typography variant="body1" sx={{ mb: 5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: 420, fontSize: '1.05rem' }}>
                Curated fabrics for every project. From luxurious silks to durable cottons — find quality materials and style inspiration all in one place.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                <Button variant="contained" size="large" onClick={() => navigate('/womens-gallery')}
                  sx={{ backgroundColor: '#f7c948', color: '#1a1a2e', fontWeight: 700, px: 4, py: 1.5, '&:hover': { backgroundColor: '#e0b032' } }}>
                  Browse Gallery
                </Button>
                <Button variant="outlined" size="large" onClick={() => navigate('/shop')}
                  sx={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff', fontWeight: 600, px: 4, py: 1.5, '&:hover': { borderColor: '#fff', backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                  Shop All Fabrics
                </Button>
              </Stack>
            </Box>
          </Box>
          <Box sx={{ flex: { md: 0.6 }, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: { xs: 200, md: 'auto' } }}>
            <Box component="img" src="/images/Homm.jpg.png" alt="Fabric showcase"
              sx={{ width: '100%', maxWidth: 500, height: 'auto', objectFit: 'contain' }} />
          </Box>
        </Box>
      </Box>

      {/* COLLECTIONS */}
      <Container sx={{ py: { xs: 6, md: 8 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}>
          Browse by Collection
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
          Style galleries to inspire your next sewing project
        </Typography>
        <Grid container spacing={2}>
          {collections.map((collection, idx) => {
            const gradients = [
              'linear-gradient(135deg, #1a1a2e 0%, #ff6b6b 100%)',
              'linear-gradient(135deg, #f7c948 0%, #ff6b6b 100%)',
              'linear-gradient(135deg, #2d2d4e 0%, #f7c948 100%)',
              'linear-gradient(135deg, #ff6b6b 0%, #f7c948 100%)',
            ];
            return (
              <Grid item xs={6} md={3} key={collection.id}>
                <Paper elevation={0} onClick={() => navigate(`/${collection.slug}`)}
                  sx={{ background: gradients[idx % gradients.length], color: '#fff', p: { xs: 3, md: 4 }, textAlign: 'center', cursor: 'pointer', borderRadius: 2, transition: 'all 0.3s', height: '100%', '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 12px 32px rgba(0,0,0,0.2)' } }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
                    {collection.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1, display: 'block' }}>
                    {collection.description}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* STYLE INSPIRATION GALLERY */}
      <Box sx={{ backgroundColor: '#fff', py: { xs: 6, md: 8 }, borderTop: '1px solid', borderColor: 'divider' }}>
        <Container>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}>
            Style Inspiration
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
            See what you can create with our fabrics
          </Typography>
          <Grid container spacing={2}>
            {styleIdeas.slice(0, 4).map((style, i) => (
              <Grid item xs={6} md={3} key={i}>
                <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', cursor: 'pointer', border: '1px solid', borderColor: 'divider', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' } }}
                  onClick={() => navigate('/womens-gallery')}>
                  <Box component="img" src={style.image} alt={style.name} sx={{ width: '100%', height: 240, objectFit: 'cover' }} />
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>{style.name}</Typography>
                    <Typography variant="caption" sx={{ color: '#999' }}>{style.description}</Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button endIcon={<ArrowForwardIcon />} onClick={() => navigate('/womens-gallery')} sx={{ color: '#ff6b6b', fontWeight: 600 }}>
              View All Styles
            </Button>
          </Box>
        </Container>
      </Box>

      {/* FEATURED FABRICS */}
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', md: '2rem' } }}>
              Featured Fabrics
            </Typography>
            <Button endIcon={<ArrowForwardIcon />} onClick={() => navigate('/shop')} sx={{ color: '#ff6b6b', fontWeight: 600, fontSize: '0.85rem' }}>
              View All
            </Button>
          </Box>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
            Our most popular fabrics, ready for your next project
          </Typography>
          <Grid container spacing={2}>
            {featured.slice(0, 4).map((fabric) => (
              <Grid item xs={6} md={3} key={fabric.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'relative', transition: 'all 0.3s', border: '1px solid', borderColor: 'divider', boxShadow: 'none', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' } }}
                  onClick={() => navigate(`/shop/${fabric.slug}`)}>
                  <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {fabric.status !== 'active' && <ProductBadge type={fabric.status} />}
                    {fabric.stockQuantity === 0 && fabric.status === 'active' && <ProductBadge type="sold-out" />}
                    {fabric.stockQuantity > 0 && fabric.stockQuantity <= 5 && fabric.status === 'active' && <ProductBadge type="almost-sold-out" />}
                    {fabric.isNew && <ProductBadge isNew />}
                  </Box>
                  {fabric.discount > 0 && <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, backgroundColor: '#ff6b6b', color: '#fff', padding: '2px 8px', fontSize: '0.7rem', fontWeight: 700 }}>-{fabric.discount}%</Box>}
                  <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
                    <CardMedia component="img" height="260" image={fabric.images[0]} alt={fabric.name} sx={{ objectFit: 'cover', transition: 'transform 0.5s', '&:hover': { transform: 'scale(1.06)' } }} />
                  </Box>
                  <CardContent sx={{ px: 2, pt: 2, pb: 1, flexGrow: 1 }}>
                    <Typography variant="overline" sx={{ color: '#999', fontSize: '0.6rem', letterSpacing: '0.1em' }}>{fabric.category}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, fontSize: '0.9rem' }}>{fabric.name}</Typography>
                    {fabric.soldQuantity > 0 && (
                      <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 0.5, fontSize: '0.65rem' }}>
                        {fabric.soldQuantity} yards sold
                      </Typography>
                    )}
                    <Stack direction="row" spacing={1} alignItems="baseline">
                      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', color: '#ff6b6b' }}>₦{fabric.price.toFixed(2)}</Typography>
                      <Typography variant="caption" sx={{ color: '#999' }}>{fabric.unit}</Typography>
                      {fabric.comparePrice && <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#ccc', fontSize: '0.8rem' }}>₦{fabric.comparePrice.toFixed(2)}</Typography>}
                    </Stack>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                    <Button fullWidth variant="contained" size="small" startIcon={<ShoppingCartIcon />}
                      onClick={(e) => { e.stopPropagation(); addItem({ id: fabric.id, name: fabric.name, price: fabric.price, image: fabric.images[0] }); }}
                      sx={{ backgroundColor: '#1a1a2e', '&:hover': { backgroundColor: '#2d2d4e' }, fontWeight: 600, fontSize: '0.8rem' }}>
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* BANNER */}
      <Box sx={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #ff6b6b 100%)', color: '#fff', py: { xs: 5, md: 7 } }}>
        <Container>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1.5, fontSize: { xs: '1.5rem', md: '2.2rem' } }}>
                Not Sure How Much Fabric You Need?
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', maxWidth: 500, lineHeight: 1.7 }}>
                Use our Measurement Guide to calculate the perfect yardage for dresses, shirts, trousers, and more. Save time and money.
              </Typography>
            </Grid>
            <Grid item xs={12} md={5} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Button variant="contained" size="large" onClick={() => navigate('/measurement-guide')}
                sx={{ backgroundColor: '#f7c948', color: '#1a1a2e', fontWeight: 700, px: 4, py: 1.5, '&:hover': { backgroundColor: '#e0b032' } }}>
                Measurement Guide
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* MORE FABRICS */}
      <Container sx={{ py: { xs: 6, md: 8 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}>
          More to Explore
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
          Discover more fabrics for your creative projects
        </Typography>
        <Grid container spacing={2}>
          {featured.slice(4, 8).map((fabric) => (
            <Grid item xs={6} md={3} key={fabric.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'relative', transition: 'all 0.3s', border: '1px solid', borderColor: 'divider', boxShadow: 'none', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' } }}
                onClick={() => navigate(`/shop/${fabric.slug}`)}>
                <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {fabric.status !== 'active' && <ProductBadge type={fabric.status} />}
                  {fabric.stockQuantity === 0 && fabric.status === 'active' && <ProductBadge type="sold-out" />}
                  {fabric.stockQuantity > 0 && fabric.stockQuantity <= 5 && fabric.status === 'active' && <ProductBadge type="almost-sold-out" />}
                    {fabric.isNew && <ProductBadge isNew />}
                  </Box>
                {fabric.discount > 0 && <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, backgroundColor: '#ff6b6b', color: '#fff', padding: '2px 8px', fontSize: '0.7rem', fontWeight: 700 }}>-{fabric.discount}%</Box>}
                <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
                  <CardMedia component="img" height="260" image={fabric.images[0]} alt={fabric.name} sx={{ objectFit: 'cover', transition: 'transform 0.5s', '&:hover': { transform: 'scale(1.06)' } }} />
                </Box>
                <CardContent sx={{ px: 2, pt: 2, pb: 1, flexGrow: 1 }}>
                  <Typography variant="overline" sx={{ color: '#999', fontSize: '0.6rem', letterSpacing: '0.1em' }}>{fabric.category}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, fontSize: '0.9rem' }}>{fabric.name}</Typography>
                  {fabric.soldQuantity > 0 && (
                    <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 0.5, fontSize: '0.65rem' }}>
                      {fabric.soldQuantity} yards sold
                    </Typography>
                  )}
                  <Stack direction="row" spacing={1} alignItems="baseline">
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', color: '#ff6b6b' }}>₦{fabric.price.toFixed(2)}</Typography>
                    <Typography variant="caption" sx={{ color: '#999' }}>{fabric.unit}</Typography>
                  </Stack>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                  <Button fullWidth variant="contained" size="small"
                    onClick={(e) => { e.stopPropagation(); addItem({ id: fabric.id, name: fabric.name, price: fabric.price, image: fabric.images[0] }); }}
                    sx={{ backgroundColor: '#1a1a2e', '&:hover': { backgroundColor: '#2d2d4e' }, fontWeight: 600, fontSize: '0.8rem' }}>
                    Quick Add
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FEATURES */}
      <Box sx={{ backgroundColor: '#fff', py: { xs: 5, md: 7 }, borderTop: '1px solid', borderColor: 'divider' }}>
        <Container>
          <Grid container spacing={3}>
            {[
              { icon: <LocalShippingIcon />, title: 'Fast Shipping', desc: 'Delivered in 3-5 business days' },
              { icon: <SupportAgentIcon />, title: 'Fabric Experts', desc: 'We help you choose' },
              { icon: <ContentCutIcon />, title: 'Sold by the Yard', desc: 'Any quantity you need' },
              { icon: <StraightenIcon />, title: 'Measurement Guide', desc: 'Calculate yardage easily' },
            ].map((item, i) => (
              <Grid item xs={6} md={3} key={i}>
                <Box sx={{ textAlign: 'center', py: 2, cursor: i === 3 ? 'pointer' : 'default' }} onClick={i === 3 ? () => navigate('/measurement-guide') : undefined}>
                  <Box sx={{ color: '#ff6b6b', mb: 1, fontSize: '1.5rem' }}>{item.icon}</Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>{item.title}</Typography>
                  <Typography variant="caption" sx={{ color: '#999' }}>{item.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
