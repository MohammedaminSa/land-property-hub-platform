import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Check, X, Trash2, Eye } from 'lucide-react';
import { getAllProperties as adminGetAllProperties, approveProperty, deleteProperty } from '../services/adminService';
import property1 from '../assets/property-1.jpg';
import property2 from '../assets/property-2.jpg';
import property3 from '../assets/property-3.jpg';

// Mock data
const mockProperties = [
  {
    _id: '1',
    title: 'Modern Apartment in Bole',
    images: [{ url: property1 }],
    price: 2400000,
    location: { city: 