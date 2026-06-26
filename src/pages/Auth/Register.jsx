import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container, Box, Typography, TextField, Button, Paper, Stack, Link, Alert, Divider,
} from '@mui/material';
import SEO from '../../components/SEO';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    register(form.name, form.email, form.password);
    navigate('/account');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <SEO title="Create Account" />
      <Paper elevation={0} sx={{ p: 4, border: '1px solid #E8DDD0', borderRadius: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#2C1810', mb: 1, textAlign: 'center', fontFamily: '"Playfair Display", serif' }}>
          Create Account
        </Typography>
        <Typography variant="body1" sx={{ color: '#8B7355', mb: 4, textAlign: 'center' }}>
          Join LSM Enterprise today
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField fullWidth label="Full Name" name="name" value={form.name} onChange={handleChange} required />
            <TextField fullWidth label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
            <TextField fullWidth label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
            <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required />
            <Button
              type="submit" fullWidth variant="contained" size="large"
              sx={{ backgroundColor: '#8B7355', '&:hover': { backgroundColor: '#5C4A32' }, fontWeight: 700, py: 1.5 }}
            >
              Create Account
            </Button>
          </Stack>
        </form>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Link component={RouterLink} to="/login" underline="hover" sx={{ color: '#8B7355', cursor: 'pointer' }}>
            Already have an account? Sign in
          </Link>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Button
          fullWidth variant="outlined"
          sx={{ borderColor: '#C4A882', color: '#6B5B4F', fontWeight: 600 }}
        >
          Sign up with Google
        </Button>
      </Paper>
    </Container>
  );
};

export default Register;
