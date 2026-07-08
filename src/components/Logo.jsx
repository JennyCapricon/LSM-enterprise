import { Box, Typography } from '@mui/material';

const Logo = ({ size = 36, showText = true }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="8" fill="url(#logo-grad)" />
      <path d="M10 26L18 10L26 26H22L18 17L14 26H10Z" fill="#fff" />
      <circle cx="18" cy="10" r="2" fill="#f7c948" />
      <path d="M8 28H28V30H8V28Z" fill="#f7c948" />
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="36" y2="36">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#ff6b6b" />
        </linearGradient>
      </defs>
    </svg>
    {showText && (
      <Typography variant="h6" sx={{ fontWeight: 800, fontSize: { xs: '1.3rem', md: '1.5rem' }, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #1a1a2e 0%, #ff6b6b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        JAY
      </Typography>
    )}
  </Box>
);

export default Logo;
