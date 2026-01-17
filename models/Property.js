const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['apartment', 'house', 'land', 'commercial'],
    required: true
  },
  listingType: {
    type: String,
    enum: ['sale', 'rent'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  features: {
    bedrooms: Number,
    bathrooms: Number,
    area: Number,
    parking: Boolean,
    furnished: Boolean,
    petFriendly: Boolean,
    garden: Boolean,
    balcony: Boolean
  },
  images: [{
    type: String
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'sold', 'rented', 'inactive'],
    default: 'active'
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

propertySchema.index({ 'location.city': 1, type: 1, listingType: 1 });
propertySchema.index({ price: 1 });

module.exports = mongoose.model('Property', propertySchema);