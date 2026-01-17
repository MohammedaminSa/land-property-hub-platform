import React from 'react';
import { Container, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Please login to access your dashboard.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Welcome back, {currentUser.name}!
      </Typography>
      <Typography variant="body1">
        Dashboard functionality will be implemented here.
      </Typography>
    </Container>
  );
};

export default Dashboard;