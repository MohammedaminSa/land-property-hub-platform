const { validationResult } = require('express-validator');
const Property = require('../models/propertyModel');

// @desc    Get all approved properties with filtering
// @route   GET /api/properties
// @access  Public
const getProperties = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = { status: 'approved', isActive: true };

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.city) {
      filter['location.city'] = new RegExp(req.query.city, 'i');
    }

    if (req.query.subcity) {
      filter['location.subcity'] = new RegExp(req.query.subcity, 'i');
    }

    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
    }

    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    // Sort options
    let sort = { createdAt: -1 };
    if (req.query.sortBy === 'price_asc') sort = { price: 1 };
    if (req.query.sortBy === 'price_desc') sort = { price: -1 };

    const properties = await Property.find(filter)
      .populate('owner', 'firstName lastName phone email')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Property.countDocuments(filter);

    res.json({
      success: true,
      count: properties.length,
      total,
      pagination: {
        page,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      },
      data: properties
    });

  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single property by ID
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('owner', 'firstName lastName phone email profileImage');

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Increment view count
    property.views += 1;
    await property.save();

    res.json({
      success: true,
      data: property
    });

  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new property
// @route   POST /api/properties
// @access  Private (Seller, Landlord, Agent)
const createProperty = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const propertyData = {
      ...req.body,
      owner: req.user.id
    };

    const property = await Property.create(propertyData);

    res.status(201).json({
      success: true,
      message: 'Property created successfully and pending approval',
      data: property
    });

  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get current user's properties
// @route   GET /api/properties/my/listings
// @access  Private
const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: properties.length,
      data: properties
    });

  } catch (error) {
    console.error('Get my properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  getMyProperties
};