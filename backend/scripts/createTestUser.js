// Script to create a test user for quick testing
// Usage: node scripts/createTestUser.js

const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/userModel');

const createTestUser = async () => {
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

    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@test.com' });
    
    if (existingUser) {
      console.log('\n✅ Test user already exists!');
      console.log('-----------------------------------');
      console.log(`Email: ${existingUser.email}`);
      console.log(`Password: test123`);
      console.log(`Role: ${existingUser.role}`);
      console.log(`Approved: ${existingUser.isApproved}`);
      console.log('-----------------------------------');
      console.log('You can login with these credentials');
      process.exit(0);
    }

    // Create test user
    const testUser = await User.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@test.com',
      password: 'test123',
      phone: '+251911111111',
      role: 'seller',
      isApproved: true,
      isVerified: true
    });

    console.log('\n✅ Test user created successfully!');
    console.log('-----------------------------------');
    console.log(`Email: ${testUser.email}`);
    console.log(`Password: test123`);
    console.log(`Role: ${testUser.role}`);
    console.log(`Approved: ${testUser.isApproved}`);
    console.log('-----------------------------------');
    console.log('You can now login with these credentials!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createTestUser();
