import React, { useState, useRef } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
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
  ListItemButton,
  Badge,
  useMediaQuery,
  useTheme,
  InputBase,
  Slide,
  Paper,
  Divider,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import Logo from './Logo';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import { useSearch } from '../contexts/SearchContext';
import { useCart } from '../contexts/CartContext';
import { products } from '../data/products';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuAnchorRef = useRef(null);
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const { searchQuery, setSearchQuery, searchOpen, openSearch, closeSearch } = useSearch();

  const visibleLinks = [
    { label: 'Home', path: '/' },
  ];

  const moreLinks = [
    { label: 'Shop All', path: '/shop' },
    { label: "Women's Gallery", path: '/womens-gallery' },
    { label: "Women's Fashion", path: '/womens-fashion' },
    { label: "Men's Fashion", path: '/mens-fashion' },
    { label: 'Children Fashion', path: '/children-fashion' },
    { label: 'Measurement Guide', path: '/measurement-guide' },
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Help Center', path: '/help' },
    { label: 'Shipping Info', path: '/shipping' },
    { label: 'Contact', path: '/contact' },
    { label: 'Marketplace', path: '/marketplace' },
    { label: 'Vendors', path: '/vendors' },
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

  const handleToggleMenu = () => setMenuOpen((prev) => !prev);
  const handleCloseMenu = () => setMenuOpen(false);

  const drawer = (
    <Box sx={{ width: 280, height: '100%', backgroundColor: '#fff' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Logo />
      </Box>
      <List sx={{ pt: 1 }}>
        {moreLinks.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={() => setDrawerOpen(false)}
              sx={{ '&.Mui-selected': { backgroundColor: 'rgba(255,107,107,0.08)', borderRight: '3px solid #ff6b6b' } }}
            >
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 500, fontSize: '0.95rem' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mx: 2 }} />
      <List>
        {isAuthenticated ? (
          <>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/account" onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="My Account" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => { setDrawerOpen(false); logout(); }}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/login" onClick={() => setDrawerOpen(false)}>
              <ListItemText primary="Sign In" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ backgroundColor: '#fff', color: '#1a1a1a', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: { xs: 56, md: 64 }, px: { xs: 2, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isMobile && (
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)} sx={{ mr: 0.5 }}>
                <MenuIcon />
              </IconButton>
            )}
            <Link component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <Logo />
            </Link>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
              {visibleLinks.map((item) => (
                <Link key={item.label} component={RouterLink} to={item.path} underline="none"
                  sx={{ px: 1.5, py: 1, fontWeight: 500, fontSize: '0.85rem', color: location.pathname === item.path ? '#1a1a1a' : '#666', '&:hover': { color: '#1a1a1a' },
                    borderBottom: location.pathname === item.path ? '2px solid #ff6b6b' : '2px solid transparent' }}>
                  {item.label}
                </Link>
              ))}

              {/* THREE-DOT MORE MENU */}
              <IconButton ref={menuAnchorRef} onClick={handleToggleMenu} size="small" sx={{ ml: 0.5, color: '#666', '&:hover': { color: '#1a1a1a' } }}>
                <MoreHorizIcon />
              </IconButton>
              <Popper open={menuOpen} anchorEl={menuAnchorRef.current} transition disablePortal placement="bottom-start" sx={{ zIndex: 1300 }}>
                {({ TransitionProps }) => (
                  <Grow {...TransitionProps}>
                    <Paper elevation={8} sx={{ mt: 1, borderRadius: 1, minWidth: 200, overflow: 'hidden' }}>
                      <ClickAwayListener onClickAway={handleCloseMenu}>
                        <MenuList>
                          {moreLinks.map((item) => (
                            <MenuItem key={item.label} onClick={() => { navigate(item.path); handleCloseMenu(); }}
                              selected={location.pathname === item.path}
                              sx={{ fontSize: '0.85rem', fontWeight: 500, py: 1.2, '&.Mui-selected': { backgroundColor: 'rgba(255,107,107,0.08)' } }}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton color="inherit" onClick={openSearch} size="small"><SearchIcon /></IconButton>
            <IconButton color="inherit" onClick={() => navigate('/wishlist')} size="small">
              <Badge badgeContent={wishlistCount} color="secondary" sx={{ '& .MuiBadge-badge': { backgroundColor: '#ff6b6b', color: '#fff', fontSize: '0.65rem', minWidth: 16, height: 16 } }}>
                <FavoriteBorderIcon fontSize="small" />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate('/cart')} size="small">
              <Badge badgeContent={itemCount} color="secondary" sx={{ '& .MuiBadge-badge': { backgroundColor: '#ff6b6b', color: '#fff', fontSize: '0.65rem', minWidth: 16, height: 16 } }}>
                <ShoppingCartIcon fontSize="small" />
              </Badge>
            </IconButton>
            {isAuthenticated ? (
              <IconButton color="inherit" onClick={() => navigate('/account')} size="small"><PersonIcon fontSize="small" /></IconButton>
            ) : (
              <Button variant="outlined" size="small" onClick={() => navigate('/login')}
                sx={{ ml: 1, borderColor: '#1a1a1a', color: '#1a1a1a', '&:hover': { backgroundColor: '#1a1a1a', color: '#fff' }, fontSize: '0.8rem', py: 0.5, px: 2 }}>
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* SEARCH OVERLAY */}
      <Slide direction="top" in={searchOpen} mountOnEnter unmountOnExit>
        <Paper sx={{ position: 'fixed', top: { xs: 56, md: 64 }, left: 0, right: 0, zIndex: 1200, borderRadius: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SearchIcon sx={{ color: '#999' }} />
              <InputBase fullWidth autoFocus placeholder="Search fabrics..." value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)} sx={{ fontSize: '1rem' }} />
              <IconButton size="small" onClick={closeSearch}><CloseIcon /></IconButton>
            </Box>
            {searchResults.length > 0 && (
              <Box sx={{ mt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                {searchResults.map(product => (
                  <Box key={product.id} onClick={() => handleSearchSelect(product.slug)}
                    sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5, px: 1, cursor: 'pointer', borderRadius: 1, '&:hover': { backgroundColor: '#f5f5f5' } }}>
                    <Box component="img" src={product.images[0]} alt={product.name} sx={{ width: 50, height: 50, objectFit: 'cover' }} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a1a' }}>{product.name}</Typography>
                      <Typography variant="caption" sx={{ color: '#999' }}>₦{product.price.toFixed(2)} / yd</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
            {searchQuery && searchResults.length === 0 && (
              <Typography variant="body2" sx={{ color: '#999', py: 2, textAlign: 'center' }}>No fabrics found for &quot;{searchQuery}&quot;</Typography>
            )}
          </Box>
        </Paper>
      </Slide>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>{drawer}</Drawer>
    </>
  );
};

export default Header;
