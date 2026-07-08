import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleOAuthProvider } from '@react-oauth/google';
import theme from './theme';
import Header from './components/Header';
import Footer from './components/Footer/Footer';
import BottomNav from './components/BottomNav';
import BackToTop from './components/BackToTop';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { AuthProvider } from './contexts/AuthContext';
import { SearchProvider } from './contexts/SearchContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { RecentlyViewedProvider } from './contexts/RecentlyViewedContext';
import { OrderProvider } from './contexts/OrderContext';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Deals from './pages/Deals';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Account from './pages/Account/Account';
import Marketplace from './pages/Marketplace';
import Vendors from './pages/Vendors';
import Privacy from './pages/Legal/Privacy';
import Terms from './pages/Legal/Terms';
import MeasurementGuide from './pages/MeasurementGuide';
import WomensGallery from './pages/WomensGallery';
import ChildrenFashion from './pages/ChildrenFashion';
import MensFashion from './pages/MensFashion';
import WomensFashion from './pages/WomensFashion';
import HelpCenter from './pages/HelpCenter';
import ShippingInfo from './pages/ShippingInfo';
import NotFound from './pages/NotFound';
import './App.css';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotificationProvider>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <CartProvider>
              <OrderProvider>
              <WishlistProvider>
                <RecentlyViewedProvider>
                  <SearchProvider>
                    <Router>
                      <Box className="app" sx={{ pb: { xs: 7, md: 0 } }}>
                        <Header />
                        <Box sx={{ flexGrow: 1 }}>
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/shop/:slug" element={<ProductDetail />} />
                            <Route path="/deals" element={<Deals />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/wishlist" element={<Wishlist />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/account" element={<Account />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/marketplace" element={<Marketplace />} />
                            <Route path="/vendors" element={<Vendors />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="/measurement-guide" element={<MeasurementGuide />} />
                            <Route path="/womens-gallery" element={<WomensGallery />} />
                            <Route path="/children-fashion" element={<ChildrenFashion />} />
                            <Route path="/mens-fashion" element={<MensFashion />} />
                            <Route path="/womens-fashion" element={<WomensFashion />} />
                            <Route path="/help" element={<HelpCenter />} />
                            <Route path="/shipping" element={<ShippingInfo />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </Box>
                        <Footer />
                        <BottomNav />
                        <BackToTop />
                      </Box>
                    </Router>
                  </SearchProvider>
                </RecentlyViewedProvider>
              </WishlistProvider>
            </OrderProvider>
            </CartProvider>
          </AuthProvider>
            </GoogleOAuthProvider>
          </NotificationProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
