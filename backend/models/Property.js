const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Property title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Property description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Property category is required'],
    enum: ['residential_land', 'apartment_sale', 'house_rent']
  },
  type: {
    type: String,
    required: [true, 'Property type is required'],
    enum: ['land', 'apartment', 'house', 'villa', 'condominium']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  currency: {
    type: String,
    enum: ['ETB', 'USD'],
    default: 'ETB'
  },
  area: {
    size: {
      type: Number,
      required: [true, 'Area size is required'],
      min: [1, 'Area must be at least 1 square meter']
    },
    unit: {
      type: String,
      enum: ['sqm', 'hectare'],
      default: 'sqm'
    }
  },
  location: {
    city: {
      type: String,
      required: [true, 'City is required']
    },
    subcity: {
      type: String,
      required: [true, 'Subcity is required']
    },
    woreda: String,
    kebele: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  features: {
    bedrooms: {
      type: Number,
      min: 0
    },
    bathrooms: {
      type: Number,
      min: 0
    },
    parking: {
      type: Boolean,
      default: false
    },
    furnished: {
      type: Boolean,
      default: false
    },
    garden: {
      type: Boolean,
      default: false
    },
    security: {
      type: Boolean,
      default: false
    }
  },
  images: [{
    filename: {
      type: String,
      required: true
    },
    caption: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  documents: [{
    type: {
      type: String,
      enum: ['title_deed', 'lease_agreement', 'building_permit'],
      required: true
    },
    filename: {
      type: String,
      required: true
    },
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'sold', 'rented'],
    default: 'pending'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: Date,
  rejectionReason: String
}, {
  timestamps: true
});

// Index for search optimization
propertySchema.index({ 
  'location.city': 1, 
  'location.subcity': 1, 
  category: 1, 
  price: 1 
});

propertySchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Property', propertySchema);