import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B7355',
      light: '#C4A882',
      dark: '#5C4A32',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#D4A574',
      light: '#E8C9A0',
      dark: '#B8864E',
      contrastText: '#1A1A1A',
    },
    background: {
      default: '#FAF6F1',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C1810',
      secondary: '#6B5B4F',
    },
    divider: '#E8DDD0',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 700 },
    h2: { fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 700 },
    h3: { fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 600 },
    h4: { fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 600 },
    h5: { fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 600 },
    h6: { fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: '0 4px 12px rgba(139, 115, 85, 0.3)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px rgba(44, 24, 16, 0.08)',
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 20px rgba(44, 24, 16, 0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;
