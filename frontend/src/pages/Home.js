import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Paper
} from '@mui/material';
import { Search, LocationOn } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    type: '',
    listingType: '',
    city: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      const response = await axios.get('/api/properties?limit=6');
      setFeaturedProperties(response.data.properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleSearchChange = (field, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    Object.entries(searchFilters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    window.location.href = `/properties?${queryParams.toString()}`;
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          color: 'white'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Find Your Dream Property
          </Typography>
          <Typography variant="h5" component="p" gutterBottom align="center" sx={{ mb: 4 }}>
            Discover the perfect home, apartment, or land for sale or rent
          </Typography>
          
          {/* Search Form */}
          <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  select
                  label="Property Type"
                  value={searchFilters.type}
                  onChange={(e) => handleSearchChange('type', e.target.value)}
                >
                  <MenuItem value="">All Types</MenuItem>
                  <MenuItem value="apartment">Apartment</MenuItem>
                  <MenuItem value="house">House</MenuItem>
                  <MenuItem value="land">Land</MenuItem>
                  <MenuItem value="commercial">Commercial</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  select
                  label="Listing Type"
                  value={searchFilters.listingType}
                  onChange={(e) => handleSearchChange('listingType', e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="sale">For Sale</MenuItem>
                  <MenuItem value="rent">For Rent</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="City"
                  value={searchFilters.city}
                  onChange={(e) => handleSearchChange('city', e.target.value)}
                  placeholder="Enter city name"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<Search />}
                  onClick={handleSearch}
                  sx={{ height: '56px' }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* Featured Properties */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h3" component="h2" gutterBottom align="center">
          Featured Properties
        </Typography>
        <Typography variant="h6" component="p" gutterBottom align="center" color="text.secondary" sx={{ mb: 4 }}>
          Discover our handpicked selection of premium properties
        </Typography>
        
        <Grid container spacing={3}>
          {featuredProperties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={property.images[0] ? `/uploads/${property.images[0]}` : '/placeholder.jpg'}
                  alt={property.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h3">
                    {property.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn color="action" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {property.location.city}, {property.location.state}
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    ${property.price.toLocaleString()}
                    {property.listingType === 'rent' && '/month'}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/property/${property._id}`}
                    variant="outlined"
                    fullWidth
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            component={Link}
            to="/properties"
            variant="contained"
            size="large"
          >
            View All Properties
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;