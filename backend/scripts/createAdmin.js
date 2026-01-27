// Script to create an admin user
// Usage: node scripts/createAdmin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/userModel');

const createAdmin = async () => {
  try {
    // Support both MONGO_URI and MONGODB_URI
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.error('Error: MongoDB URI not found in .env file');
      console.log('Please add MONGODB_URI to your .env file');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@ethiopiarealestate.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log(`Email: ${existingAdmin.email}`);
      console.log('Use this account to login');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@ethiopiarealestate.com',
      password: 'admin123', // Will be hashed by the model
      phone: '+251911000000',
      role: 'admin',
      isApproved: true,
      isVerified: true
    });

    console.log('✅ Admin user created successfully!');
    console.log('-----------------------------------');
    console.log(`Email: ${admin.email}`);
    console.log(`Password: admin123`);
    console.log('-----------------------------------');
    console.log('⚠️  Please change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
