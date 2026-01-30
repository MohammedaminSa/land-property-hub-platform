const mongoose = require('mongoose');
const User = require('../models/userModel');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@realestate.com' });
    if (adminExists) {
      console.log('❌ Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@realestate.com',
      phone: '+251911111111',
      password: 'admin123',
      role: 'admin',
      isApproved: true,
      isVerified: true
    });

    console.log('✅ Admin user created successfully');
    console.log('📧 Email: admin@realestate.com');
    console.log('🔑 Password: admin123');
    console.log('⚠️  Please change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
