import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Alert,
  ImageList,
  ImageListItem
} from '@mui/material';
import { LocationOn, Bed, Bathtub, SquareFoot, Email, Phone } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const PropertyDetail = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    message: '',
    contactPreference: 'email'
  });
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await axios.get(`/api/properties/${id}`);
      setProperty(response.data);
    } catch (error) {
      console.error('Error fetching property:', error);
    }
    setLoading(false);
  };

  const handleInquirySubmit = async () => {
    setInquiryLoading(true);
    try {
      await axios.post('/api/inquiries', {
        propertyId: id,
        ...inquiryData
      });
      setInquirySuccess(true);
      setInquiryOpen(false);
      setInquiryData({ message: '', contactPreference: 'email' });
    } catch (error) {
      console.error('Error sending inquiry:', error);
    }
    setInquiryLoading(false);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!property) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Property not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {inquirySuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Your inquiry has been sent successfully!
        </Alert>
      )}
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {/* Images */}
          {property.images && property.images.length > 0 && (
            <ImageList sx={{ mb: 3 }} cols={2} rowHeight={300}>
              {property.images.map((image, index) => (
                <ImageListItem key={index}>
                  <img
                    src={`/uploads/${image}`}
                    alt={`Property ${index + 1}`}
                    loading="lazy"
                    style={{ objectFit: 'cover' }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
          
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip label={property.type} color="primary" />
            <Chip 
              label={property.listingType === 'sale' ? 'For Sale' : 'For Rent'} 
              color="secondary" 
            />
          </Box>
          
          <Typography variant="h3" component="h1" gutterBottom>
            {property.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocationOn color="action" sx={{ mr: 1 }} />
            <Typography variant="h6" color="text.secondary">
              {property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}
            </Typography>
          </Box>
          
          <Typography variant="h4" color="primary" sx={{ mb: 3 }}>
            ${property.price.toLocaleString()}
            {property.listingType === 'rent' && '/month'}
          </Typography>
          
          {property.features && (
            <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
              {property.features.bedrooms && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Bed sx={{ mr: 1 }} />
                  <Typography variant="h6">{property.features.bedrooms} Bedrooms</Typography>
                </Box>
              )}
              {property.features.bathrooms && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Bathtub sx={{ mr: 1 }} />
                  <Typography variant="h6">{property.features.bathrooms} Bathrooms</Typography>
                </Box>
              )}
              {property.features.area && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SquareFoot sx={{ mr: 1 }} />
                  <Typography variant="h6">{property.features.area} sq ft</Typography>
                </Box>
              )}
            </Box>
          )}
          
          <Typography variant="h5" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" paragraph>
            {property.description}
          </Typography>
          
          {property.features && (
            <>
              <Typography variant="h5" gutterBottom>
                Features & Amenities
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {property.features.parking && <Chip label="Parking" variant="outlined" />}
                {property.features.furnished && <Chip label="Furnished" variant="outlined" />}
                {property.features.petFriendly && <Chip label="Pet Friendly" variant="outlined" />}
                {property.features.garden && <Chip label="Garden" variant="outlined" />}
                {property.features.balcony && <Chip label="Balcony" variant="outlined" />}
              </Box>
            </>
          )}
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contact {property.owner.userType}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {property.owner.name}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Email sx={{ mr: 1 }} />
                <Typography>{property.owner.email}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Phone sx={{ mr: 1 }} />
                <Typography>{property.owner.phone}</Typography>
              </Box>
              
              {currentUser && currentUser.id !== property.owner._id && (
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={() => setInquiryOpen(true)}
                >
                  Send Inquiry
                </Button>
              )}
              
              {!currentUser && (
                <Alert severity="info">
                  Please login to contact the property owner.
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Inquiry Dialog */}
      <Dialog open={inquiryOpen} onClose={() => setInquiryOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Send Inquiry</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Message"
            value={inquiryData.message}
            onChange={(e) => setInquiryData(prev => ({ ...prev, message: e.target.value }))}
            margin="normal"
            placeholder="I'm interested in this property..."
          />
          <TextField
            fullWidth
            select
            label="Preferred Contact Method"
            value={inquiryData.contactPreference}
            onChange={(e) => setInquiryData(prev => ({ ...prev, contactPreference: e.target.value }))}
            margin="normal"
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="both">Both</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInquiryOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleInquirySubmit} 
            variant="contained"
            disabled={inquiryLoading || !inquiryData.message}
          >
            {inquiryLoading ? 'Sending...' : 'Send Inquiry'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PropertyDetail;