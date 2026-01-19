const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Property = require('../models/propertyModel');
const { protect, authorize, requireApproved } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/properties
// @desc    Get all approved properties with filtering
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('minPrice').optional().isNumeric().withMessage('Min price must be a number'),
  query('maxPrice').optional().isNumeric().withMessage('Max price must be a number')
], async (req, res) => {
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
});

// @route   GET /api/properties/:id
// @desc    Get single property by ID
// @access  Public
router.get('/:id', async (req, res) => {
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
});

// @route   POST /api/properties
// @desc    Create new property
// @access  Private (Seller, Landlord, Agent)
router.post('/', [
  protect,
  authorize('seller', 'landlord', 'agent'),
  requireApproved,
  body('title').trim().isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  body('description').trim().isLength({ min: 20, max: 1000 }).withMessage('Description must be between 20 and 1000 characters'),
  body('category').isIn(['residential_land', 'apartment_sale', 'house_rent']).withMessage('Invalid category'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('area.size').isNumeric().withMessage('Area size must be a number'),
  body('location.city').trim().notEmpty().withMessage('City is required'),
  body('location.subcity').trim().notEmpty().withMessage('Subcity is required')
], async (req, res) => {
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
});

// @route   GET /api/properties/my/listings
// @desc    Get current user's properties
// @access  Private
router.get('/my/listings', protect, async (req, res) => {
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
});

module.exports = router;