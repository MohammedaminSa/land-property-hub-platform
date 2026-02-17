import api from './api';

// Get dashboard statistics
export const getDashboard = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};

// Get all users
export const getUsers = async (filters = {}) => {
  const params = new URLSearchParams();
  
  Object.keys(filters).forEach(key => {
    if (filters[key] !== undefined && filters[key] !== '') {
      params.append(key, filters[key]);
    }
  });
  
  const response = await api.get(`/admin/users?${params.toString()}`);
  return response.data;
};

// Approve user
export const approveUser = async (id) => {
  const response = await api.put(`/admin/users/${id}/approve`);
  return response.data;
};

// Delete user
export const deleteUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};

// Get all properties (admin)
export const getAdminProperties = async (filters = {}) => {
  const params = new URLSearchParams();
  
  Object.keys(filters).forEach(key => {
    if (filters[key] !== undefined && filters[key] !== '') {
      params.append(key, filters[key]);
    }
  });
  
  const response = await api.get(`/admin/properties?${params.toString()}`);
  return response.data;
};

// Approve property
export const approveProperty = async (id) => {
  const response = await api.put(`/admin/properties/${id}/approve`);
  return response.data;
};

// Reject property
export const rejectProperty = async (id, reason) => {
  const response = await api.put(`/admin/properties/${id}/reject`, { reason });
  return response.data;
};
