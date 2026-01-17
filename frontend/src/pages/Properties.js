import React from 'react';
import { Container, Typography } from '@mui/material';

const Properties = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Properties
      </Typography>
      <Typography variant="body1">
        Property listings will be displayed here.
      </Typography>
    </Container>
  );
};

export default Properties;