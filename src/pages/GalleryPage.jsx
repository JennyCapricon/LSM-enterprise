import React, { useState } from 'react';
import { Container, Box, Typography, ImageList, ImageListItem, useMediaQuery, useTheme, IconButton, Modal } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';
import SEO from '../components/SEO';

const GalleryPage = ({ title, images, seoTitle }) => {
  const [selected, setSelected] = useState(null);
  const theme = useTheme();
  const cols = useMediaQuery(theme.breakpoints.up('md')) ? 4 : useMediaQuery(theme.breakpoints.up('sm')) ? 3 : 2;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <SEO title={seoTitle || title} />
      <Box sx={{ mb: 5 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>{title}</Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Click any item to view full size — videos play on hover
        </Typography>
      </Box>

      <ImageList variant="masonry" cols={cols} gap={12}>
        {images.map((item, i) => (
          <ImageListItem key={i} sx={{ cursor: 'pointer', overflow: 'hidden', borderRadius: 1, position: 'relative', '&:hover .overlay': { opacity: 1 } }}
            onClick={() => setSelected(item.src)}>
            {item.type === 'video' ? (
              <Box component="video" src={item.src} muted loop playsInline
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                sx={{ width: '100%', display: 'block', borderRadius: 1, transition: 'transform 0.4s', '&:hover': { transform: 'scale(1.03)' } }} />
            ) : (
              <Box component="img" src={item.src} alt={`${title} ${i + 1}`} loading="lazy"
                sx={{ width: '100%', display: 'block', borderRadius: 1, transition: 'transform 0.4s, box-shadow 0.4s', '&:hover': { transform: 'scale(1.03)', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' } }} />
            )}
            <Box className="overlay"
              sx={{ position: 'absolute', inset: 0, borderRadius: 1, backgroundColor: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s' }}>
              <IconButton sx={{ color: '#fff', backgroundColor: 'rgba(255,255,255,0.15)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.25)' } }}>
                <OpenInNewIcon />
              </IconButton>
            </Box>
          </ImageListItem>
        ))}
      </ImageList>

      <Modal open={!!selected} onClose={() => setSelected(null)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.92)' }}>
        <Box sx={{ position: 'relative', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton onClick={() => setSelected(null)} sx={{ position: 'absolute', top: 16, right: 16, color: '#fff', backgroundColor: 'rgba(255,255,255,0.1)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }, zIndex: 2 }}>
            <CloseIcon />
          </IconButton>
          <IconButton onClick={() => { if (selected) window.open(selected, '_blank'); }} sx={{ position: 'absolute', top: 16, right: 72, color: '#fff', backgroundColor: 'rgba(255,255,255,0.1)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }, zIndex: 2 }}>
            <OpenInNewIcon />
          </IconButton>
          {selected && selected.match(/\.(mp4|webm|mov)(\?.*)?$/i) ? (
            <Box component="video" src={selected} controls autoPlay sx={{ maxWidth: '95vw', maxHeight: '95vh', outline: 'none', borderRadius: 1 }} />
          ) : (
            <Box component="img" src={selected || ''} alt="Full size preview" sx={{ width: '100vw', height: '100vh', objectFit: 'contain', outline: 'none', p: 4 }} />
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default GalleryPage;
