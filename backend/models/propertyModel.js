const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Property title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Property description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Property category is required'],
    enum: ['residential_land', 'apartment_sale', 'house_rent', 'house_sale', 'commercial_land', 'commercial_rent', 'villa_sale', 'condominium_sale']
  },
  type: {
    type: String,
    required: [true, 'Property type is required'],
    enum: ['land', 'apartment', 'house', 'villa', 'condominium', 'commercial']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  currency: {
    type: String,
    default: 'ETB',
    enum: ['ETB', 'USD']
  },
  area: {
    size: {
      type: Number,
      required: [true, 'Area size is required'],
      min: [0, 'Area cannot be negative']
    },
    unit: {
      type: String,
      default: 'sqm',
      enum: ['sqm', 'hectare']
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
      default: 0
    },
    bathrooms: {
      type: Number,
      default: 0
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
      enum: ['title_deed', 'lease_agreement', 'building_permit']
    },
    filename: String,
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
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  rejectionReason: String,
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
  approvedAt: Date
}, {
  timestamps: true
});

// Indexes for faster queries
propertySchema.index({ owner: 1 });
propertySchema.index({ status: 1 });
propertySchema.index({ category: 1 });
propertySchema.index({ 'location.city': 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ createdAt: -1 });

// Text index for search
propertySchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Property', propertySchema);
