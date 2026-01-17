import React from 'react';
import { Container, Typography } from '@mui/material';

const PropertyDetail = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Property Details
      </Typography>
      <Typography variant="body1">
        Property details will be displayed here.
      </Typography>
    </Container>
  );
};

export default PropertyDetail;