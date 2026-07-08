import React, { useState } from 'react';
import {
  Container, Box, Typography, Grid, Paper, FormControl, InputLabel, Select, MenuItem,
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import SEO from '../components/SEO';

const garmentOptions = [
  { value: 'dress-short', label: 'Short Dress (Knee-length)', yards: { xs: 2, s: 2.5, m: 3, l: 3.5, xl: 4, xxl: 4.5 } },
  { value: 'dress-long', label: 'Long Dress (Floor-length)', yards: { xs: 3, s: 3.5, m: 4, l: 4.5, xl: 5, xxl: 5.5 } },
  { value: 'shirt', label: 'Shirt/Blouse', yards: { xs: 1.5, s: 1.8, m: 2, l: 2.3, xl: 2.5, xxl: 3 } },
  { value: 'trousers', label: 'Trousers/Pants', yards: { xs: 2, s: 2.3, m: 2.5, l: 2.8, xl: 3, xxl: 3.3 } },
  { value: 'skirt-short', label: 'Short Skirt (Knee-length)', yards: { xs: 1, s: 1.2, m: 1.5, l: 1.8, xl: 2, xxl: 2.3 } },
  { value: 'skirt-long', label: 'Long Skirt (Floor-length)', yards: { xs: 2, s: 2.3, m: 2.5, l: 3, xl: 3.3, xxl: 3.5 } },
  { value: 'gown-evening', label: 'Evening/Formal Gown', yards: { xs: 3.5, s: 4, m: 4.5, l: 5, xl: 5.5, xxl: 6 } },
  { value: 'jacket', label: 'Jacket/Blazer', yards: { xs: 2, s: 2.3, m: 2.5, l: 2.8, xl: 3, xxl: 3.5 } },
  { value: 'suit-2pc', label: '2-Piece Suit', yards: { xs: 3.5, s: 4, m: 4.5, l: 5, xl: 5.5, xxl: 6 } },
  { value: 'traditional', label: 'Traditional Outfit (Agbada/Kaftan)', yards: { xs: 3, s: 3.5, m: 4, l: 4.5, xl: 5, xxl: 6 } },
  { value: 'headtie', label: 'Head Tie/Gear', yards: { xs: 1.5, s: 1.5, m: 2, l: 2, xl: 2, xxl: 2.5 } },
  { value: 'scarf', label: 'Scarf/Stole', yards: { xs: 0.5, s: 0.5, m: 0.5, l: 0.8, xl: 0.8, xxl: 1 } },
];

const sizeLabels = { xs: 'XS (0-2)', s: 'S (4-6)', m: 'M (8-10)', l: 'L (12-14)', xl: 'XL (16-18)', xxl: 'XXL (20-22)' };

const tips = [
  'Always add 10-15% extra fabric for pattern matching, shrinkage, and seam allowance.',
  'Wider fabric (54-60 inches) requires less yardage than narrower fabric (36-44 inches).',
  'For patterned fabrics, add extra yardage to match prints at seams.',
  'If in doubt, consult a tailor before purchasing your final fabric quantity.',
  'Consider buying a small swatch first to test the fabric drape and quality.',
];

const MeasurementGuide = () => {
  const [selectedGarment, setSelectedGarment] = useState('dress-long');
  const [selectedSize, setSelectedSize] = useState('m');
  const calculation = garmentOptions.find(g => g.value === selectedGarment);

  return (
    <Box sx={{ width: '100%' }}>
      <SEO
        title="Fabric Measurement Guide"
        description="Use our fabric measurement guide to calculate how much fabric you need for your next project. Estimate yardage for dresses, shirts, trousers, and more."
      />
      <Box
        sx={{
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
          color: '#f5f5f5', py: 6, textAlign: 'center',
        }}
      >
        <Container>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontFamily: '"Playfair Display", serif' }}>
            Fabric Measurement Guide
          </Typography>
          <Typography variant="h6" sx={{ color: '#e0e0e0' }}>
            Calculate the perfect yardage for your next project
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Paper elevation={0} sx={{ p: 4, border: '1px solid #e0e0e0', borderRadius: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 3, fontFamily: '"Playfair Display", serif' }}>
                Estimate Your Fabric Needs
              </Typography>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel sx={{ color: '#6B5B4F' }}>Garment Type</InputLabel>
                <Select
                  value={selectedGarment}
                  label="Garment Type"
                  onChange={(e) => setSelectedGarment(e.target.value)}
                  sx={{ '&.MuiOutlinedInput-root': { '& fieldset': { borderColor: '#ccc' } } }}
                >
                  {garmentOptions.map(g => (
                    <MenuItem key={g.value} value={g.value}>{g.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel sx={{ color: '#6B5B4F' }}>Size</InputLabel>
                <Select
                  value={selectedSize}
                  label="Size"
                  onChange={(e) => setSelectedSize(e.target.value)}
                  sx={{ '&.MuiOutlinedInput-root': { '& fieldset': { borderColor: '#ccc' } } }}
                >
                  {Object.entries(sizeLabels).map(([val, label]) => (
                    <MenuItem key={val} value={val}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {calculation && (
                <Box
                  sx={{
                    p: 3, backgroundColor: 'rgba(139,115,85,0.08)', borderRadius: 2,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="body2" sx={{ color: '#6B5B4F', mb: 1 }}>
                    Recommended Fabric (44-45" width)
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: '#1a1a1a' }}>
                    {calculation.yards[selectedSize]} yards
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#1a1a1a', mt: 1, display: 'block' }}>
                    ≈ {Math.round(calculation.yards[selectedSize] * 91.44)} cm
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => window.open('/shop', '_self')}
                    sx={{ mt: 2, backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#000000' }, fontWeight: 600 }}
                  >
                    Browse Fabrics
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={7}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 3, fontFamily: '"Playfair Display", serif' }}>
              Complete Yardage Reference
            </Typography>
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2, mb: 4 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#1a1a1a' }}>
                    <TableCell sx={{ color: '#f5f5f5', fontWeight: 700 }}>Garment Type</TableCell>
                    {Object.entries(sizeLabels).map(([val, label]) => (
                      <TableCell key={val} align="center" sx={{ color: '#f5f5f5', fontWeight: 600, fontSize: '0.75rem' }}>
                        {val.toUpperCase()}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {garmentOptions.map((g) => (
                    <TableRow
                      key={g.value}
                      sx={{
                        '&:nth-of-type(even)': { backgroundColor: 'rgba(139,115,85,0.04)' },
                        '&:hover': { backgroundColor: 'rgba(139,115,85,0.08)' },
                        backgroundColor: g.value === selectedGarment ? 'rgba(212,165,116,0.15)' : 'inherit',
                      }}
                    >
                      <TableCell sx={{ fontWeight: 600, color: '#1a1a1a', fontSize: '0.85rem' }}>
                        {g.label}
                      </TableCell>
                      {Object.entries(g.yards).map(([size, yards]) => (
                        <TableCell
                          key={size}
                          align="center"
                          sx={{
                            color: '#6B5B4F', fontSize: '0.85rem',
                            fontWeight: g.value === selectedGarment && size === selectedSize ? 700 : 400,
                            backgroundColor: g.value === selectedGarment && size === selectedSize ? 'rgba(212,165,116,0.3)' : 'inherit',
                          }}
                        >
                          {yards}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 2, fontFamily: '"Playfair Display", serif' }}>
              Pro Tips
            </Typography>
            <Box sx={{ pl: 2 }}>
              {tips.map((tip, idx) => (
                <Box key={idx} sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
                  <Typography sx={{ color: '#ff6b6b', fontWeight: 700 }}>•</Typography>
                  <Typography variant="body2" sx={{ color: '#6B5B4F', lineHeight: 1.6 }}>{tip}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MeasurementGuide;
