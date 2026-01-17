import React from 'react';
import { Container, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const AddProperty = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Typography>Please login to add a property listing.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Property
      </Typography>
      <Typography variant="body1">
        Property creation form will be implemented here.
      </Typography>
    </Container>
  );
};

export default AddProperty;