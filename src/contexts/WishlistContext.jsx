import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useNotify } from './NotificationContext';

const WishlistContext = createContext();
const STORAGE_KEY = 'lsm_wishlist';

const loadWishlist = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE': {
      const exists = state.find(item => item.id === action.payload.id);
      if (exists) return state.filter(item => item.id !== action.payload.id);
      return [...state, action.payload];
    }
    case 'CLEAR':
      return [];
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [items, dispatch] = useReducer(wishlistReducer, [], loadWishlist);
  const notify = useNotify();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const toggleItem = (product) => {
    const exists = items.some(item => item.id === product.id);
    dispatch({ type: 'TOGGLE', payload: product });
    notify(exists ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`, exists ? 'info' : 'success');
  };
  const isInWishlist = (id) => items.some(item => item.id === id);
  const clearWishlist = () => {
    dispatch({ type: 'CLEAR' });
    notify('Wishlist cleared', 'info');
  };

  return (
    <WishlistContext.Provider value={{ items, toggleItem, isInWishlist, clearWishlist, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
