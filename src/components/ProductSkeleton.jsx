import React from 'react';
import { Card, CardContent, Box, Skeleton } from '@mui/material';

const ProductSkeleton = ({ count = 4 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Card
          key={i}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 2px 12px rgba(44, 24, 16, 0.08)',
            borderRadius: 2,
          }}
        >
          <Skeleton variant="rectangular" height={250} sx={{ borderRadius: '12px 12px 0 0' }} />
          <CardContent sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" width="80%" height={28} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="50%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="40%" height={32} />
          </CardContent>
          <Box sx={{ px: 2, pb: 2 }}>
            <Skeleton variant="rounded" height={44} sx={{ borderRadius: 2 }} />
          </Box>
        </Card>
      ))}
    </>
  );
};

export default ProductSkeleton;
