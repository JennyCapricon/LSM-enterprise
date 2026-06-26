import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container, Box, Typography, TextField, Button, Paper, Stack, Link, Alert, Divider,
} from '@mui/material';
import SEO from '../../components/SEO';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }
    login(form.email, form.password);
    navigate('/account');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <SEO title="Sign In" />
      <Paper elevation={0} sx={{ p: 4, border: '1px solid #E8DDD0', borderRadius: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#2C1810', mb: 1, textAlign: 'center', fontFamily: '"Playfair Display", serif' }}>
          Welcome Back
        </Typography>
        <Typography variant="body1" sx={{ color: '#8B7355', mb: 4, textAlign: 'center' }}>
          Sign in to your LSM Enterprise account
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField fullWidth label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
            <TextField fullWidth label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
            <Button
              type="submit" fullWidth variant="contained" size="large"
              sx={{ backgroundColor: '#8B7355', '&:hover': { backgroundColor: '#5C4A32' }, fontWeight: 700, py: 1.5 }}
            >
              Sign In
            </Button>
          </Stack>
        </form>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Link component={RouterLink} to="/register" underline="hover" sx={{ color: '#8B7355', cursor: 'pointer' }}>
            Don't have an account? Sign up
          </Link>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Button
          fullWidth variant="outlined"
          sx={{ borderColor: '#C4A882', color: '#6B5B4F', fontWeight: 600 }}
        >
          Continue with Google
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
