const mongoose = require('mongoose');
const User = require('../models/userModel');
require('dotenv').config();

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.log('❌ Please provide an email');
  console.log('Usage: node scripts/approveUser.js <email>');
  process.exit(1);
}

const approveUser = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log(`❌ User with email ${email} not found`);
      process.exit(1);
    }

    // Check if already approved
    if (user.isApproved) {
      console.log(`✅ User ${user.firstName} ${user.lastName} is already approved`);
      process.exit(0);
    }

    // Approve user
    user.isApproved = true;
    await user.save();

    console.log('✅ User approved successfully!');
    console.log(`📧 Email: ${user.email}`);
    console.log(`👤 Name: ${user.firstName} ${user.lastName}`);
    console.log(`🎭 Role: ${user.role}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

approveUser();
