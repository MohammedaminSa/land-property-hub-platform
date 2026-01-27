// Script to manually approve a user account
// Usage: node scripts/approveUser.js <email>

const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/userModel');

const approveUser = async (email) => {
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

    const user = await User.findOne({ email });
    
    if (!user) {
      console.log(`User with email ${email} not found`);
      process.exit(1);
    }

    if (user.isApproved) {
      console.log(`User ${email} is already approved`);
      process.exit(0);
    }

    user.isApproved = true;
    await user.save();

    console.log(`✅ User ${email} has been approved successfully!`);
    console.log(`Name: ${user.firstName} ${user.lastName}`);
    console.log(`Role: ${user.role}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

const email = process.argv[2];

if (!email) {
  console.log('Usage: node scripts/approveUser.js <email>');
  process.exit(1);
}

approveUser(email);
