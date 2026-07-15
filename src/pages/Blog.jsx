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
  const [expandedPost, setExpandedPost] = useState(null);

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
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontFamily: '"Playfair Display", serif' }}>
            JAY Blog
          </Typography>
          <Typography variant="h6" sx={{ color: '#e0e0e0' }}>Fashion inspiration, tips, and trends</Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
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
      {selectedCategory === 'all' && featured && (
        <Container maxWidth="xl" sx={{ py: 4, mb: 4 }}>
          <Paper elevation={0} sx={{ overflow: 'hidden', border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Box component="img" src={featured.image} alt={featured.title} sx={{ width: '100%', height: { xs: 240, md: 400 }, objectFit: 'cover' }} />
              </Grid>
              <Grid item xs={12} md={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Chip label="Featured" size="small" sx={{ backgroundColor: '#ff6b6b', color: '#1a1a1a', fontWeight: 700, width: 'fit-content', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
                  {featured.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: '#6B5B4F', lineHeight: 1.6 }}>
                  {featured.excerpt}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap' }}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <PersonIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />
                    <Typography variant="caption" color="textSecondary">{featured.author}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <CalendarTodayIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />
                    <Typography variant="caption" color="textSecondary">{featured.date}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <AccessTimeIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />
                    <Typography variant="caption" color="textSecondary">{featured.readTime}</Typography>
                  </Stack>
                </Stack>
                <Button
                  variant="contained" endIcon={<ArrowForwardIcon />}
                  onClick={() => setExpandedPost(expandedPost === featured.id ? null : featured.id)}
                  sx={{ width: 'fit-content', backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000000' }, fontWeight: 600 }}
                >
                  {expandedPost === featured.id ? 'Show Less' : 'Read More'}
                </Button>
                {expandedPost === featured.id && (
                  <Typography variant="body2" sx={{ mt: 2, color: '#1a1a1a', lineHeight: 1.8 }}>
                    {featured.content}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Container>
      )}

      {/* Second Post (Hero Style) */}
      {selectedCategory === 'all' && filteredPosts[1] && (
        <Container maxWidth="xl" sx={{ py: 4, mb: 4 }}>
          <Paper elevation={0} sx={{ overflow: 'hidden', border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              <Box sx={{ width: { xs: '100%', md: '50%' }, flexShrink: 0 }}>
                <Box component="img" src={filteredPosts[1].image} alt={filteredPosts[1].title} sx={{ width: '100%', height: { xs: 240, md: 400 }, objectFit: 'cover', display: 'block' }} />
              </Box>
              <Box sx={{ width: { xs: '100%', md: '50%' }, p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Chip label="Trends" size="small" sx={{ backgroundColor: '#ff6b6b', color: '#1a1a1a', fontWeight: 700, width: 'fit-content', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
                  {filteredPosts[1].title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: '#6B5B4F', lineHeight: 1.6 }}>
                  {filteredPosts[1].excerpt}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap' }}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <PersonIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />
                    <Typography variant="caption" color="textSecondary">{filteredPosts[1].author}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <CalendarTodayIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />
                    <Typography variant="caption" color="textSecondary">{filteredPosts[1].date}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <AccessTimeIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />
                    <Typography variant="caption" color="textSecondary">{filteredPosts[1].readTime}</Typography>
                  </Stack>
                </Stack>
                <Button
                  variant="contained" endIcon={<ArrowForwardIcon />}
                  onClick={() => setExpandedPost(expandedPost === filteredPosts[1].id ? null : filteredPosts[1].id)}
                  sx={{ width: 'fit-content', backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000000' }, fontWeight: 600 }}
                >
                  {expandedPost === filteredPosts[1].id ? 'Show Less' : 'Read More'}
                </Button>
                  {expandedPost === filteredPosts[1].id && (
                    <Typography variant="body2" sx={{ mt: 2, color: '#1a1a1a', lineHeight: 1.8 }}>
                      {filteredPosts[1].content}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Paper>
          </Container>
        )}

      {/* Third Post (Hero Style) */}
      {selectedCategory === 'all' && filteredPosts[2] && (
        <Container maxWidth="xl" sx={{ py: 4, mb: 4 }}>
          <Paper elevation={0} sx={{ overflow: 'hidden', border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              <Box sx={{ width: { xs: '100%', md: '50%' }, flexShrink: 0 }}>
                <Box component="img" src={filteredPosts[2].image} alt={filteredPosts[2].title} sx={{ width: '100%', height: { xs: 240, md: 400 }, objectFit: 'cover', display: 'block' }} />
              </Box>
              <Box sx={{ width: { xs: '100%', md: '50%' }, p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Chip label="Style Guide" size="small" sx={{ backgroundColor: '#ff6b6b', color: '#1a1a1a', fontWeight: 700, width: 'fit-content', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
                  {filteredPosts[2].title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: '#6B5B4F', lineHeight: 1.6 }}>
                  {filteredPosts[2].excerpt}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap' }}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <PersonIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />
                    <Typography variant="caption" color="textSecondary">{filteredPosts[2].author}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <CalendarTodayIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />
                    <Typography variant="caption" color="textSecondary">{filteredPosts[2].date}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <AccessTimeIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />
                    <Typography variant="caption" color="textSecondary">{filteredPosts[2].readTime}</Typography>
                  </Stack>
                </Stack>
                <Button
                  variant="contained" endIcon={<ArrowForwardIcon />}
                  onClick={() => setExpandedPost(expandedPost === filteredPosts[2].id ? null : filteredPosts[2].id)}
                  sx={{ width: 'fit-content', backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000000' }, fontWeight: 600 }}
                >
                  {expandedPost === filteredPosts[2].id ? 'Show Less' : 'Read More'}
                </Button>
                  {expandedPost === filteredPosts[2].id && (
                    <Typography variant="body2" sx={{ mt: 2, color: '#1a1a1a', lineHeight: 1.8 }}>
                      {filteredPosts[2].content}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Paper>
          </Container>
        )}

      {/* Fourth Post (Hero Style) */}
      {selectedCategory === 'all' && filteredPosts[3] && (
        <Container maxWidth="xl" sx={{ py: 4, mb: 4 }}>
          <Paper elevation={0} sx={{ overflow: 'hidden', border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              <Box sx={{ width: { xs: '100%', md: '50%' }, flexShrink: 0 }}>
                <Box component="img" src={filteredPosts[3].image} alt={filteredPosts[3].title} sx={{ width: '100%', height: { xs: 240, md: 400 }, objectFit: 'cover', display: 'block' }} />
              </Box>
              <Box sx={{ width: { xs: '100%', md: '50%' }, p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Chip label="Sustainability" size="small" sx={{ backgroundColor: '#ff6b6b', color: '#1a1a1a', fontWeight: 700, width: 'fit-content', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
                  {filteredPosts[3].title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: '#6B5B4F', lineHeight: 1.6 }}>
                  {filteredPosts[3].excerpt}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap' }}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <PersonIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />
                    <Typography variant="caption" color="textSecondary">{filteredPosts[3].author}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <CalendarTodayIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />
                    <Typography variant="caption" color="textSecondary">{filteredPosts[3].date}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <AccessTimeIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />
                    <Typography variant="caption" color="textSecondary">{filteredPosts[3].readTime}</Typography>
                  </Stack>
                </Stack>
                <Button
                  variant="contained" endIcon={<ArrowForwardIcon />}
                  onClick={() => setExpandedPost(expandedPost === filteredPosts[3].id ? null : filteredPosts[3].id)}
                  sx={{ width: 'fit-content', backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000000' }, fontWeight: 600 }}
                >
                  {expandedPost === filteredPosts[3].id ? 'Show Less' : 'Read More'}
                </Button>
                  {expandedPost === filteredPosts[3].id && (
                    <Typography variant="body2" sx={{ mt: 2, color: '#1a1a1a', lineHeight: 1.8 }}>
                      {filteredPosts[3].content}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Paper>
          </Container>
        )}

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {filteredPosts.filter((_, i) => selectedCategory !== 'all' || i > 3).map(post => (
            <Grid item xs={12} key={post.id}>
              <Card
                onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                sx={{
                  height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer',
                  border: '1px solid #e0e0e0', boxShadow: 'none', transition: 'all 0.3s',
                  '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 40px rgba(44,24,16,0.12)' },
                }}
              >
                <CardMedia component="img" height={{ xs: 180, md: 240 }} image={post.image} alt={post.title} sx={{ width: '100%', objectFit: 'cover' }} loading="lazy" />
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
                  {expandedPost === post.id && (
                    <Typography variant="body2" sx={{ mb: 2, color: '#1a1a1a', lineHeight: 1.8 }}>
                      {post.content}
                    </Typography>
                  )}
                  <Stack direction="row" spacing={1} sx={{ color: '#1a1a1a', fontSize: '0.8rem' }}>
                    <Typography variant="caption">By {post.author}</Typography>
                    <Typography variant="caption">•</Typography>
                    <Typography variant="caption">{post.date}</Typography>
                  </Stack>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button color="primary" endIcon={<ArrowForwardIcon />} sx={{ color: '#1a1a1a', fontWeight: 600 }}>
                    {expandedPost === post.id ? 'Show Less' : 'Read More'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Paper elevation={0} sx={{ p: 6, textAlign: 'center', border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f5f5f5' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
            Subscribe to Our Newsletter
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: '#1a1a1a' }}>
            Get the latest fashion tips and exclusive offers delivered to your inbox
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ maxWidth: { xs: '100%', md: 560 }, mx: 'auto' }}>
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
