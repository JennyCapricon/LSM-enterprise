import { useNavigate, useLocation } from 'react-router-dom';
import { Paper, BottomNavigation, BottomNavigationAction, Badge } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemCount } = useCart();
  const { isAuthenticated } = useAuth();

  const hiddenPaths = ['/login', '/register', '/checkout'];
  if (hiddenPaths.includes(location.pathname)) return null;

  const value = ['/', '/shop', '/cart', '/wishlist', isAuthenticated ? '/account' : '/login'].indexOf(location.pathname);
  const active = value >= 0 ? value : ['/shop', '/cart', '/wishlist', '/account', '/login'].includes(location.pathname) ? false : 0;

  return (
    <Paper elevation={4} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1100, display: { md: 'none' } }}>
      <BottomNavigation
        value={active === false ? undefined : active}
        onChange={(e, i) => {
          const paths = ['/', '/shop', '/cart', '/wishlist', isAuthenticated ? '/account' : '/login'];
          navigate(paths[i]);
        }}
        sx={{ height: 64, backgroundColor: '#fff', borderTop: '1px solid', borderColor: 'divider' }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} sx={{ '&.Mui-selected': { color: '#ff6b6b' } }} />
        <BottomNavigationAction label="Shop" icon={<ShoppingBagIcon />} sx={{ '&.Mui-selected': { color: '#ff6b6b' } }} />
        <BottomNavigationAction label="Cart" icon={<Badge badgeContent={itemCount} color="error"><ShoppingCartIcon /></Badge>} sx={{ '&.Mui-selected': { color: '#ff6b6b' } }} />
        <BottomNavigationAction label="Wishlist" icon={<FavoriteIcon />} sx={{ '&.Mui-selected': { color: '#ff6b6b' } }} />
        <BottomNavigationAction label={isAuthenticated ? 'Account' : 'Sign In'} icon={<PersonIcon />} sx={{ '&.Mui-selected': { color: '#ff6b6b' } }} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
