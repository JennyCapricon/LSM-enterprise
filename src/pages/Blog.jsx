import React, { useState } from 'react';
import {
  Container, Box, Typography, Grid, Card, CardMedia, CardContent, CardActions,
  Button, Chip, Stack, Paper, TextField,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SEO from '../components/SEO';
import { blogPosts } from '../data/products';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'fashion-tips', name: 'Fashion Tips' },
    { id: 'trends', name: 'Trends' },
    { id: 'style-guide', name: 'Style Guide' },
    { id: 'sustainability', name: 'Sustainability' },
  ];

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featured = blogPosts[0];

  return (
    <Box sx={{ width: '100%' }}>
      <SEO title="Blog" description="Fashion inspiration, style tips, and trends from JAY." />
      <Box sx={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)', color: '#f5f5f5', py: 8, textAlign: 'center' }}>
        <Container>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontFamily: '"Playfair Display", serif' }}>
            JAY Blog
          </Typography>
          <Typography variant="h6" sx={{ color: '#e0e0e0' }}>Fashion inspiration, tips, and trends</Typography>
        </Container>
      </Box>

      <Container sx={{ py: 4 }}>
        <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
          {categories.map(category => (
            <Chip
              key={category.id}
              label={category.name}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? 'filled' : 'outlined'}
              sx={{
                fontWeight: 600,
                backgroundColor: selectedCategory === category.id ? '#1a1a1a' : 'transparent',
                color: selectedCategory === category.id ? '#f5f5f5' : '#6B5B4F',
                borderColor: '#ccc',
                '&:hover': { backgroundColor: selectedCategory === category.id ? '#000000' : 'rgba(139,115,85,0.08)' },
              }}
            />
          ))}
        </Stack>
      </Container>

      {/* Featured Post */}
      {selectedCategory === 'all' && (
        <Container sx={{ py: 4, mb: 4 }}>
          <Paper elevation={0} sx={{ overflow: 'hidden', border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Box component="img" src="/images/p1.jpg" alt="Featured" sx={{ width: '100%', height: 320, objectFit: 'cover' }} />
              </Grid>
              <Grid item xs={12} md={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Chip label="Featured" size="small" sx={{ backgroundColor: '#ff6b6b', color: '#1a1a1a', fontWeight: 700, width: 'fit-content', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
                  The Ultimate Guide to African Fabric Fashion
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: '#6B5B4F', lineHeight: 1.6 }}>
                  Explore the rich heritage of African textiles and discover how to incorporate them into modern fashion.
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap' }}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <PersonIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />
                    <Typography variant="caption" color="textSecondary">Sarah Johnson</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <CalendarTodayIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />
                    <Typography variant="caption" color="textSecondary">March 20, 2024</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <AccessTimeIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />
                    <Typography variant="caption" color="textSecondary">10 min read</Typography>
                  </Stack>
                </Stack>
                <Button
                  variant="contained" endIcon={<ArrowForwardIcon />}
                  sx={{ width: 'fit-content', backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000000' }, fontWeight: 600 }}
                >
                  Read More
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      )}

      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {filteredPosts.map(post => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={post.id}>
              <Card
                sx={{
                  height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer',
                  border: '1px solid #e0e0e0', boxShadow: 'none', transition: 'all 0.3s',
                  '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 40px rgba(44,24,16,0.12)' },
                }}
              >
                <CardMedia component="img" height="200" image={post.image} alt={post.title} sx={{ objectFit: 'cover' }} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Chip
                    label={categories.find(c => c.id === post.category)?.name}
                    size="small"
                    sx={{ backgroundColor: '#e0e0e0', color: '#000000', fontWeight: 600, mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6B5B4F', mb: 2, lineHeight: 1.6 }}>
                    {post.excerpt}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ color: '#1a1a1a', fontSize: '0.8rem' }}>
                    <Typography variant="caption">By {post.author}</Typography>
                    <Typography variant="caption">•</Typography>
                    <Typography variant="caption">{post.date}</Typography>
                  </Stack>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button color="primary" endIcon={<ArrowForwardIcon />} sx={{ color: '#1a1a1a', fontWeight: 600 }}>
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ py: 8 }}>
        <Paper elevation={0} sx={{ p: 6, textAlign: 'center', border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f5f5f5' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
            Subscribe to Our Newsletter
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: '#1a1a1a' }}>
            Get the latest fashion tips and exclusive offers delivered to your inbox
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ maxWidth: 500, mx: 'auto' }}>
            <TextField
              placeholder="Enter your email address"
              variant="outlined" size="small" fullWidth
              sx={{ backgroundColor: '#FFFFFF', borderRadius: 1 }}
            />
            <Button
              variant="contained" sx={{ minWidth: 120, backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000000' }, fontWeight: 600 }}
            >
              Subscribe
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Blog;
