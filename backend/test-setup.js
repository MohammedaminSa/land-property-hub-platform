// Simple test script to verify the setup
const mongoose = require('mongoose');
const User = require('./models/User');
const Property = require('./models/Property');

async function testSetup() {
  try {
    // Test MongoDB connection
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/property-platform');
    console.log('✅ MongoDB connection successful');

    // Test User model
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword',
      phone: '1234567890',
      userType: 'seller'
    });
    
    const validationError = testUser.validateSync();
    if (!validationError) {
      console.log('✅ User model validation successful');
    } else {
      console.log('❌ User model validation failed:', validationError.message);
    }

    // Test Property model
    const testProperty = new Property({
      title: 'Test Property',
      description: 'A beautiful test property',
      type: 'apartment',
      listingType: 'sale',
      price: 100000,
      location: {
        address: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        zipCode: '12345'
      },
      owner: testUser._id
    });

    const propertyValidationError = testProperty.validateSync();
    if (!propertyValidationError) {
      console.log('✅ Property model validation successful');
    } else {
      console.log('❌ Property model validation failed:', propertyValidationError.message);
    }

    console.log('\n🎉 Setup verification complete!');
    console.log('You can now start the application with: npm run dev');
    
  } catch (error) {
    console.log('❌ Setup verification failed:', error.message);
    console.log('\nPlease check:');
    console.log('1. MongoDB is running');
    console.log('2. Environment variables are set correctly');
    console.log('3. All dependencies are installed');
  } finally {
    await mongoose.disconnect();
  }
}

// Load environment variables
require('dotenv').config();

// Run the test
testSetup();