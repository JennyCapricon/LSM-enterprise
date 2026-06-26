import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Link,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
  useMediaQuery,
  useTheme,
  InputBase,
  Slide,
  Paper,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import { useSearch } from '../contexts/SearchContext';
import { products } from '../data/products';

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const { searchQuery, setSearchQuery, searchOpen, openSearch, closeSearch } = useSearch();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Deals', path: '/deals' },
    { label: 'Measurement Guide', path: '/measurement-guide' },
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const results = products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results.slice(0, 8));
  };

  const handleSearchSelect = (slug) => {
    closeSearch();
    navigate(`/shop/${slug}`);
  };

  const drawer = (
    <Box sx={{ width: 280, backgroundColor: '#FAF6F1', height: '100%' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid #E8DDD0' }}>
        <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: '#2C1810' }}>
          LSM Enterprise
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label}>
            <ListItemText>
              <Link
                component={RouterLink}
                to={item.path}
                underline="none"
                color="inherit"
                onClick={() => setDrawerOpen(false)}
                sx={{ color: '#2C1810', fontWeight: 500 }}
              >
                {item.label}
              </Link>
            </ListItemText>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText>
            <Link component={RouterLink} to="/marketplace" underline="none" onClick={() => setDrawerOpen(false)} sx={{ color: '#2C1810', fontWeight: 500 }}>Marketplace</Link>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <Link component={RouterLink} to="/vendors" underline="none" onClick={() => setDrawerOpen(false)} sx={{ color: '#2C1810', fontWeight: 500 }}>Vendors</Link>
          </ListItemText>
        </ListItem>
        {isAuthenticated ? (
          <>
            <ListItem>
              <ListItemText>
                <Link component={RouterLink} to="/account" underline="none" onClick={() => setDrawerOpen(false)} sx={{ color: '#2C1810', fontWeight: 500 }}>My Account</Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Link component={RouterLink} to="/" underline="none" onClick={() => { setDrawerOpen(false); logout(); }} sx={{ color: '#2C1810', fontWeight: 500 }}>Logout</Link>
              </ListItemText>
            </ListItem>
          </>
        ) : (
          <ListItem>
            <ListItemText>
              <Link component={RouterLink} to="/login" underline="none" onClick={() => setDrawerOpen(false)} sx={{ color: '#2C1810', fontWeight: 500 }}>Sign In</Link>
            </ListItemText>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={2} sx={{ backgroundColor: '#FAF6F1', color: '#2C1810' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isMobile && (
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)} sx={{ mr: 1 }}>
                <MenuIcon />
              </IconButton>
            )}
            <Link component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit' }}>
              <Box
                component="img"
                src="/images/Drip.jpg"
                alt="LSM Enterprise"
                sx={{ width: 42, height: 42, borderRadius: 1, objectFit: 'cover' }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  fontSize: { xs: '1rem', md: '1.3rem' },
                  color: '#2C1810',
                }}
              >
                LSM Enterprise
              </Typography>
            </Link>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 3, flex: 1, justifyContent: 'center' }}>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  component={RouterLink}
                  to={item.path}
                  underline="none"
                  sx={{
                    fontWeight: 500,
                    color: '#6B5B4F',
                    fontSize: '0.95rem',
                    transition: 'color 0.2s',
                    '&:hover': { color: '#8B7355' },
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton color="inherit" onClick={openSearch} size="large">
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate('/wishlist')} size="large">
              <Badge badgeContent={wishlistCount} color="secondary" sx={{ '& .MuiBadge-badge': { backgroundColor: '#D4A574', color: '#2C1810' } }}>
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate('/cart')} size="large">
              <Badge badgeContent={itemCount} color="secondary" sx={{ '& .MuiBadge-badge': { backgroundColor: '#D4A574', color: '#2C1810' } }}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {isAuthenticated ? (
              <IconButton color="inherit" onClick={() => navigate('/account')} size="large">
                <PersonIcon />
              </IconButton>
            ) : (
              <Button
                variant="contained"
                size={isMobile ? 'small' : 'medium'}
                onClick={() => navigate('/login')}
                sx={{
                  backgroundColor: '#8B7355',
                  color: '#FAF6F1',
                  ml: 1,
                  '&:hover': { backgroundColor: '#5C4A32' },
                }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Search Overlay */}
      <Slide direction="down" in={searchOpen} mountOnEnter unmountOnExit>
        <Paper
          sx={{
            position: 'fixed',
            top: 64,
            left: 0,
            right: 0,
            zIndex: 1200,
            borderRadius: 0,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            backgroundColor: '#FAF6F1',
          }}
        >
          <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SearchIcon sx={{ color: '#8B7355' }} />
              <InputBase
                fullWidth
                autoFocus
                placeholder="Search products, categories..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                sx={{ fontSize: '1.1rem' }}
              />
              <IconButton size="small" onClick={closeSearch}>
                <CloseIcon />
              </IconButton>
            </Box>
            {searchResults.length > 0 && (
              <Box sx={{ mt: 1, borderTop: '1px solid #E8DDD0' }}>
                {searchResults.map(product => (
                  <Box
                    key={product.id}
                    onClick={() => handleSearchSelect(product.slug)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      py: 1.5,
                      px: 1,
                      cursor: 'pointer',
                      borderRadius: 1,
                      '&:hover': { backgroundColor: 'rgba(139,115,85,0.08)' },
                    }}
                  >
                    <Box
                      component="img"
                      src={product.images[0]}
                      alt={product.name}
                      sx={{ width: 50, height: 50, borderRadius: 1, objectFit: 'cover' }}
                    />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#2C1810' }}>
                        {product.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#8B7355' }}>
                        ₦{product.price.toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
            {searchQuery && searchResults.length === 0 && (
              <Typography variant="body2" sx={{ color: '#8B7355', py: 2, textAlign: 'center' }}>
                No products found for "{searchQuery}"
              </Typography>
            )}
          </Box>
        </Paper>
      </Slide>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
