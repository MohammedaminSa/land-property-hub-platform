const { validationResult } = require('express-validator');
const Property = require('../models/propertyModel');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const ERROR_MESSAGES = require('../utils/errorMessages');

// @desc    Get all approved properties with filtering
// @route   GET /api/properties
// @access  Public
exports.getProperties = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    });
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  // Build filter object
  const filter = { status: 'approved', isActive: true };

  // Category filter
  if (req.query.category) {
    filter.category = req.query.category;
  }

  // Property type filter
  if (req.query.type) {
    filter.type = req.query.type;
  }

  // Location filters
  if (req.query.city) {
    filter['location.city'] = new RegExp(req.query.city, 'i');
  }

  if (req.query.subcity) {
    filter['location.subcity'] = new RegExp(req.query.subcity, 'i');
  }

  // Price range filter
  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {};
    if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
    if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
  }

  // Area size filter
  if (req.query.minArea || req.query.maxArea) {
    filter['area.size'] = {};
    if (req.query.minArea) filter['area.size'].$gte = parseFloat(req.query.minArea);
    if (req.query.maxArea) filter['area.size'].$lte = parseFloat(req.query.maxArea);
  }

  // Bedrooms filter
  if (req.query.bedrooms) {
    filter['features.bedrooms'] = parseInt(req.query.bedrooms);
  }

  // Bathrooms filter
  if (req.query.bathrooms) {
    filter['features.bathrooms'] = parseInt(req.query.bathrooms);
  }

  // Features filters
  if (req.query.parking === 'true') {
    filter['features.parking'] = true;
  }

  if (req.query.furnished === 'true') {
    filter['features.furnished'] = true;
  }

  if (req.query.garden === 'true') {
    filter['features.garden'] = true;
  }

  if (req.query.security === 'true') {
    filter['features.security'] = true;
  }

  // Text search
  if (req.query.search) {
    filter.$text = { $search: req.query.search };
  }

  // Sort options
  let sort = { createdAt: -1 };
  if (req.query.sortBy === 'price_asc') sort = { price: 1 };
  if (req.query.sortBy === 'price_desc') sort = { price: -1 };
  if (req.query.sortBy === 'area_asc') sort = { 'area.size': 1 };
  if (req.query.sortBy === 'area_desc') sort = { 'area.size': -1 };
  if (req.query.sortBy === 'views') sort = { views: -1 };

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
      limit,
      pages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    },
    data: properties
  });
});

// @desc    Get single property by ID
// @route   GET /api/properties/:id
// @access  Public
exports.getPropertyById = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id)
    .populate('owner', 'firstName lastName phone email profileImage');

  if (!property) {
    return next(new ErrorResponse(ERROR_MESSAGES.PROPERTY.NOT_FOUND, 404));
  }

  // Increment view count
  property.views += 1;
  await property.save();

  res.json({
    success: true,
    data: property
  });
});

// @desc    Create new property
// @route   POST /api/properties
// @access  Private (Seller, Landlord, Agent)
exports.createProperty = asyncHandler(async (req, res, next) => {
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
});

// @desc    Get current user's properties
// @route   GET /api/properties/my/listings
// @access  Private
exports.getMyProperties = asyncHandler(async (req, res, next) => {
  const properties = await Property.find({ owner: req.user.id })
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: properties.length,
    data: properties
  });
});

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private (Owner only)
exports.updateProperty = asyncHandler(async (req, res, next) => {
  let property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorResponse(ERROR_MESSAGES.PROPERTY.NOT_FOUND, 404));
  }

  // Check if user is the owner
  if (property.owner.toString() !== req.user.id) {
    return next(new ErrorResponse(ERROR_MESSAGES.PROPERTY.NOT_OWNER, 403));
  }

  // Update property
  property = await Property.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.json({
    success: true,
    message: 'Property updated successfully',
    data: property
  });
});

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private (Owner only)
exports.deleteProperty = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorResponse(ERROR_MESSAGES.PROPERTY.NOT_FOUND, 404));
  }

  // Check if user is the owner
  if (property.owner.toString() !== req.user.id) {
    return next(new ErrorResponse(ERROR_MESSAGES.PROPERTY.NOT_OWNER, 403));
  }

  await property.deleteOne();

  res.json({
    success: true,
    message: 'Property deleted successfully'
  });
});

// @desc    Upload property images
// @route   POST /api/properties/:id/images
// @access  Private (Owner only)
exports.uploadPropertyImages = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorResponse(ERROR_MESSAGES.PROPERTY.NOT_FOUND, 404));
  }

  // Check if user is the owner
  if (property.owner.toString() !== req.user.id) {
    return next(new ErrorResponse(ERROR_MESSAGES.PROPERTY.NOT_OWNER, 403));
  }

  if (!req.files || req.files.length === 0) {
    return next(new ErrorResponse(ERROR_MESSAGES.FILE.NO_FILE, 400));
  }

  // Add images to property
  const images = req.files.map((file, index) => ({
    filename: file.filename,
    isPrimary: index === 0 && property.images.length === 0
  }));

  property.images.push(...images);
  await property.save();

  res.json({
    success: true,
    message: 'Images uploaded successfully',
    data: property
  });
});