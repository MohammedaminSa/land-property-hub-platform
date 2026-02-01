const mongoose = require('mongoose');
const Property = require('../models/propertyModel');
const User = require('../models/userModel');  // Import User model
require('dotenv').config();

// Get property ID from command line argument
const propertyId = process.argv[2];

if (!propertyId) {
  console.log('❌ Please provide a property ID');
  console.log('Usage: node scripts/approveProperty.js <property_id>');
  process.exit(1);
}

const approveProperty = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find property by ID
    const property = await Property.findById(propertyId).populate('owner', 'firstName lastName email');
    
    if (!property) {
      console.log(`❌ Property with ID ${propertyId} not found`);
      process.exit(1);
    }

    // Check if already approved
    if (property.status === 'approved') {
      console.log(`✅ Property "${property.title}" is already approved`);
      process.exit(0);
    }

    // Approve property
    property.status = 'approved';
    property.approvedAt = Date.now();
    await property.save();

    console.log('✅ Property approved successfully!');
    console.log(`📝 Title: ${property.title}`);
    console.log(`💰 Price: ${property.price} ${property.currency}`);
    console.log(`👤 Owner: ${property.owner.firstName} ${property.owner.lastName}`);
    console.log(`📍 Location: ${property.location.city}, ${property.location.subcity}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

approveProperty();
