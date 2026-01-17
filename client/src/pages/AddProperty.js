import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const AddProperty = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    listingType: '',
    price: '',
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: ''
    },
    features: {
      bedrooms: '',
      bathrooms: '',
      area: '',
      parking: false,
      furnished: false,
      petFriendly: false,
      garden: false,
      balcony: false
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('propertyData', JSON.stringify(formData));
      
      images.forEach(image => {
        formDataToSend.append('images', image);
      });

      const response = await axios.post('/api/properties', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate(`/property/${response.data._id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create property');
    }
    setLoading(false);
  };

  if (!currentUser) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Alert severity="warning">
          Please login to add a property listing.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Property
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Property Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Property Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <MenuItem value="apartment">Apartment</MenuItem>
                <MenuItem value="house">House</MenuItem>
                <MenuItem value="land">Land</MenuItem>
                <MenuItem value="commercial">Commercial</MenuItem>
              </TextField>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Listing Type"
                name="listingType"
                value={formData.listingType}
                onChange={handleChange}
                required
              >
                <MenuItem value="sale">For Sale</MenuItem>
                <MenuItem value="rent">For Rent</MenuItem>
              </TextField>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Location
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="location.address"
                value={formData.location.address}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="City"
                name="location.city"
                value={formData.location.city}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="State"
                name="location.state"
                value={formData.location.state}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Zip Code"
                name="location.zipCode"
                value={formData.location.zipCode}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Features
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Bedrooms"
                name="features.bedrooms"
                type="number"
                value={formData.features.bedrooms}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Bathrooms"
                name="features.bathrooms"
                type="number"
                value={formData.features.bathrooms}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Area (sq ft)"
                name="features.area"
                type="number"
                value={formData.features.area}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="features.parking"
                      checked={formData.features.parking}
                      onChange={handleChange}
                    />
                  }
                  label="Parking"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="features.furnished"
                      checked={formData.features.furnished}
                      onChange={handleChange}
                    />
                  }
                  label="Furnished"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="features.petFriendly"
                      checked={formData.features.petFriendly}
                      onChange={handleChange}
                    />
                  }
                  label="Pet Friendly"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="features.garden"
                      checked={formData.features.garden}
                      onChange={handleChange}
                    />
                  }
                  label="Garden"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="features.balcony"
                      checked={formData.features.balcony}
                      onChange={handleChange}
                    />
                  }
                  label="Balcony"
                />
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Images
              </Typography>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginBottom: '16px' }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                fullWidth
              >
                {loading ? 'Creating Property...' : 'Create Property'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddProperty;