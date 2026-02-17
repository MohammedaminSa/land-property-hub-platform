import api from './api';

// Get all properties with filters
export const getProperties = async (filters = {}) => {
  const params = new URLSearchParams();
  
  Object.keys(filters).forEach(key => {
    if (filters[key] !== undefined && filters[key] !== '') {
      params.append(key, filters[key]);
    }
  });
  
  const response = await api.get(`/properties?${params.toString()}`);
  return response.data;
};

// Get single property
export const getProperty = async (id) => {
  const response = await api.get(`/properties/${id}`);
  return response.data;
};

// Create new property
export const createProperty = async (propertyData) => {
  const response = await api.post('/properties', propertyData);
  return response.data;
};

// Update property
export const updateProperty = async (id, propertyData) => {
  const response = await api.put(`/properties/${id}`, propertyData);
  return response.data;
};

// Delete property
export const deleteProperty = async (id) => {
  const response = await api.delete(`/properties/${id}`);
  return response.data;
};

// Get my properties
export const getMyProperties = async () => {
  const response = await api.get('/properties/my/listings');
  return response.data;
};

// Upload property images
export const uploadPropertyImages = async (id, images) => {
  const formData = new FormData();
  
  // Append multiple images
  for (let i = 0; i < images.length; i++) {
    formData.append('images', images[i]);
  }
  
  const response = await api.post(`/properties/${id}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response.data;
};
