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
  Paper,
  Pagination,
  Chip
} from '@mui/material';
import { LocationOn, Bed, Bathtub, SquareFoot } from '@mui/icons-material';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    listingType: searchParams.get('listingType') || '',
    city: searchParams.get('city') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || ''
  });

  useEffect(() => {
    fetchProperties();
  }, [currentPage, searchParams]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v))
      });
      
      const response = await axios.get(`/api/properties?${queryParams}`);
      setProperties(response.data.properties);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
    setLoading(false);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    setCurrentPage(1);
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    setSearchParams(queryParams);
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      listingType: '',
      city: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: ''
    });
    setSearchParams({});
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Properties
      </Typography>
      
      {/* Filters */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Search Filters
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              select
              label="Property Type"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
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
              value={filters.listingType}
              onChange={(e) => handleFilterChange('listingType', e.target.value)}
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
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              select
              label="Bedrooms"
              value={filters.bedrooms}
              onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="1">1+</MenuItem>
              <MenuItem value="2">2+</MenuItem>
              <MenuItem value="3">3+</MenuItem>
              <MenuItem value="4">4+</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Min Price"
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Max Price"
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSearch}
              sx={{ height: '56px' }}
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              onClick={clearFilters}
              sx={{ height: '56px' }}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Properties Grid */}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {properties.map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property._id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={property.images[0] ? `/uploads/${property.images[0]}` : '/placeholder.jpg'}
                    alt={property.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <Chip 
                        label={property.type} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                      />
                      <Chip 
                        label={property.listingType === 'sale' ? 'For Sale' : 'For Rent'} 
                        size="small" 
                        color="secondary" 
                      />
                    </Box>
                    
                    <Typography gutterBottom variant="h6" component="h3">
                      {property.title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOn color="action" sx={{ mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {property.location.city}, {property.location.state}
                      </Typography>
                    </Box>
                    
                    {property.features && (
                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        {property.features.bedrooms && (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Bed sx={{ fontSize: 16, mr: 0.5 }} />
                            <Typography variant="body2">{property.features.bedrooms}</Typography>
                          </Box>
                        )}
                        {property.features.bathrooms && (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Bathtub sx={{ fontSize: 16, mr: 0.5 }} />
                            <Typography variant="body2">{property.features.bathrooms}</Typography>
                          </Box>
                        )}
                        {property.features.area && (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <SquareFoot sx={{ fontSize: 16, mr: 0.5 }} />
                            <Typography variant="body2">{property.features.area} sq ft</Typography>
                          </Box>
                        )}
                      </Box>
                    )}
                    
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
          
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default Properties;