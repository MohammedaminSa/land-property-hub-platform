import api from './api';

// Send inquiry
export const sendInquiry = async (inquiryData) => {
  const response = await api.post('/inquiries', inquiryData);
  return response.data;
};

// Get my inquiries
export const getInquiries = async (type = '') => {
  const params = type ? `?type=${type}` : '';
  const response = await api.get(`/inquiries${params}`);
  return response.data;
};

// Update inquiry (respond)
export const updateInquiry = async (id, updateData) => {
  const response = await api.put(`/inquiries/${id}`, updateData);
  return response.data;
};
