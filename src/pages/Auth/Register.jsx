import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container, Box, Typography, TextField, Button, Paper, Stack, Link, Alert, Divider,
} from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import SEO from '../../components/SEO';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, googleLogin } = useAuth();
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

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
    googleLogin(decoded);
    navigate('/account');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <SEO title="Create Account" />
      <Paper elevation={0} sx={{ p: 4, border: '1px solid #e0e0e0', borderRadius: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1, textAlign: 'center' }}>
          Create Account
        </Typography>
        <Typography variant="body1" sx={{ color: '#1a1a1a', mb: 4, textAlign: 'center' }}>
          Join JAY today
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
              sx={{ backgroundColor: '#1a1a2e', '&:hover': { backgroundColor: '#2d2d4e' }, fontWeight: 700, py: 1.5 }}
            >
              Create Account
            </Button>
          </Stack>
        </form>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Link component={RouterLink} to="/login" underline="hover" sx={{ color: '#1a1a2e', cursor: 'pointer' }}>
            Already have an account? Sign in
          </Link>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google sign-in failed. Please try again.')}
            size="large"
            text="signup_with"
            shape="rectangular"
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
