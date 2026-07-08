import React from 'react';
import { Box, Typography } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import InventoryIcon from '@mui/icons-material/Inventory';
import BlockIcon from '@mui/icons-material/Block';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import FiberNewIcon from '@mui/icons-material/FiberNew';

const badgeConfig = {
  'almost-sold-out': {
    label: 'Almost Sold Out',
    icon: <LocalFireDepartmentIcon sx={{ fontSize: 14 }} />,
    color: '#e65100',
    bg: '#fff3e0',
  },
  'new-deal': {
    label: 'New Deal',
    icon: <NewReleasesIcon sx={{ fontSize: 14 }} />,
    color: '#2e7d32',
    bg: '#e8f5e9',
  },
  'sold-out': {
    label: 'Sold Out',
    icon: <BlockIcon sx={{ fontSize: 14 }} />,
    color: '#b71c1c',
    bg: '#ffebee',
  },
  'out-of-stock': {
    label: 'Out of Stock',
    icon: <InventoryIcon sx={{ fontSize: 14 }} />,
    color: '#b71c1c',
    bg: '#ffebee',
  },
  finished: {
    label: 'Finished',
    icon: <DoDisturbIcon sx={{ fontSize: 14 }} />,
    color: '#4a148c',
    bg: '#f3e5f5',
  },
  'out-of-market': {
    label: 'Out of Market',
    icon: <DoDisturbIcon sx={{ fontSize: 14 }} />,
    color: '#4a148c',
    bg: '#f3e5f5',
  },
  new: {
    label: 'New In',
    icon: <FiberNewIcon sx={{ fontSize: 14 }} />,
    color: '#1565c0',
    bg: '#e3f2fd',
  },
};

const ProductBadge = ({ type, discount, soldQuantity, stockQuantity, totalStock, isNew }) => {
  const isSoldOut = stockQuantity === 0;
  const isAlmostSoldOut = stockQuantity > 0 && stockQuantity <= 5;
  const isOutOfStock = type === 'out-of-stock' || (!isSoldOut && !isAlmostSoldOut && type === 'sold-out');

  let badgeKey = null;

  if (type === 'out-of-market') {
    badgeKey = 'out-of-market';
  } else if (type === 'finished') {
    badgeKey = 'finished';
  } else if (isSoldOut || type === 'sold-out') {
    badgeKey = 'sold-out';
  } else if (isOutOfStock) {
    badgeKey = 'out-of-stock';
  } else if (discount && discount > 0) {
    badgeKey = 'new-deal';
  } else if (isAlmostSoldOut) {
    badgeKey = 'almost-sold-out';
  } else if (isNew) {
    badgeKey = 'new';
  }

  if (!badgeKey) return null;

  const config = badgeConfig[badgeKey];

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        px: 1,
        py: 0.3,
        borderRadius: '4px',
        backgroundColor: config.bg,
        color: config.color,
        fontSize: '0.7rem',
        fontWeight: 700,
        lineHeight: 1.3,
        whiteSpace: 'nowrap',
      }}
    >
      {config.icon}
      <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 700, color: 'inherit', lineHeight: 1 }}>
        {config.label}
      </Typography>
    </Box>
  );
};

export default ProductBadge;
