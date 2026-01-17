import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { Add, Edit, Delete, Reply } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [properties, setProperties] = useState([]);
  const [receivedInquiries, setReceivedInquiries] = useState([]);
  const [sentInquiries, setSentInquiries] = useState([]);
  const [responseDialog, setResponseDialog] = useState({ open: false, inquiry: null });
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (currentUser) {
      fetchUserProperties();
      fetchReceivedInquiries();
      fetchSentInquiries();
    }
  }, [currentUser]);

  const fetchUserProperties = async () => {
    try {
      const response = await axios.get('/api/properties/user/my-properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const fetchReceivedInquiries = async () => {
    try {
      const response = await axios.get('/api/inquiries/received');
      setReceivedInquiries(response.data);
    } catch (error) {
      console.error('Error fetching received inquiries:', error);
    }
  };

  const fetchSentInquiries = async () => {
    try {
      const response = await axios.get('/api/inquiries/sent');
      setSentInquiries(response.data);
    } catch (error) {
      console.error('Error fetching sent inquiries:', error);
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await axios.delete(`/api/properties/${propertyId}`);
        fetchUserProperties();
      } catch (error) {
        console.error('Error deleting property:', error);
      }
    }
  };

  const handleRespondToInquiry = async () => {
    try {
      await axios.put(`/api/inquiries/${responseDialog.inquiry._id}/respond`, {
        response
      });
      setResponseDialog({ open: false, inquiry: null });
      setResponse('');
      fetchReceivedInquiries();
    } catch (error) {
      console.error('Error responding to inquiry:', error);
    }
  };

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
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="My Properties" />
          <Tab label="Received Inquiries" />
          <Tab label="Sent Inquiries" />
        </Tabs>
      </Box>
      
      {/* My Properties Tab */}
      {tabValue === 0 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5">My Properties</Typography>
            <Button
              component={Link}
              to="/add-property"
              variant="contained"
              startIcon={<Add />}
            >
              Add Property
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {properties.map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {property.title}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      {property.location.city}, {property.location.state}
                    </Typography>
                    <Typography variant="h6" color="primary" gutterBottom>
                      ${property.price.toLocaleString()}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip 
                        label={property.status} 
                        color={property.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                      <Chip label={property.type} size="small" />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        component={Link}
                        to={`/property/${property._id}`}
                        size="small"
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        startIcon={<Edit />}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<Delete />}
                        onClick={() => handleDeleteProperty(property._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      
      {/* Received Inquiries Tab */}
      {tabValue === 1 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Received Inquiries
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Property</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {receivedInquiries.map((inquiry) => (
                  <TableRow key={inquiry._id}>
                    <TableCell>{inquiry.property.title}</TableCell>
                    <TableCell>{inquiry.inquirer.name}</TableCell>
                    <TableCell>{inquiry.message.substring(0, 50)}...</TableCell>
                    <TableCell>
                      <Chip 
                        label={inquiry.status} 
                        color={inquiry.status === 'responded' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<Reply />}
                        onClick={() => setResponseDialog({ open: true, inquiry })}
                        disabled={inquiry.status === 'responded'}
                      >
                        Respond
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      
      {/* Sent Inquiries Tab */}
      {tabValue === 2 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Sent Inquiries
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Property</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Response</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sentInquiries.map((inquiry) => (
                  <TableRow key={inquiry._id}>
                    <TableCell>
                      <Link to={`/property/${inquiry.property._id}`}>
                        {inquiry.property.title}
                      </Link>
                    </TableCell>
                    <TableCell>{inquiry.message.substring(0, 50)}...</TableCell>
                    <TableCell>
                      <Chip 
                        label={inquiry.status} 
                        color={inquiry.status === 'responded' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {inquiry.response || 'No response yet'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      
      {/* Response Dialog */}
      <Dialog 
        open={responseDialog.open} 
        onClose={() => setResponseDialog({ open: false, inquiry: null })}
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle>Respond to Inquiry</DialogTitle>
        <DialogContent>
          {responseDialog.inquiry && (
            <>
              <Typography variant="subtitle2" gutterBottom>
                From: {responseDialog.inquiry.inquirer?.name}
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ mb: 2 }}>
                Message: {responseDialog.inquiry.message}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Your Response"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResponseDialog({ open: false, inquiry: null })}>
            Cancel
          </Button>
          <Button onClick={handleRespondToInquiry} variant="contained">
            Send Response
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;