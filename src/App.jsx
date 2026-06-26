import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import theme from './theme';
import Header from './components/Header';
import Footer from './components/Footer/Footer';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { AuthProvider } from './contexts/AuthContext';
import { SearchProvider } from './contexts/SearchContext';
import Home from './pages/Home';
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
import './App.css';

const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <SearchProvider>
                <Router>
                  <Box className="app">
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
                        <Route path="/marketplace" element={<Marketplace />} />
                        <Route path="/vendors" element={<Vendors />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/measurement-guide" element={<MeasurementGuide />} />
                      </Routes>
                    </Box>
                    <Footer />
                  </Box>
                </Router>
              </SearchProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
