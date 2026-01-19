const { validationResult } = require('express-validator');
const Inquiry = require('../models/inquiryModel');
const Property = require('../models/propertyModel');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const ERROR_MESSAGES = require('../utils/errorMessages');

// @desc    Create new inquiry
// @route   POST /api/inquiries
// @access  Private
exports.createInquiry = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    });
  }

  const { property: propertyId, subject, message } = req.body;

  // Check if property exists
  const property = await Property.findById(propertyId).populate('owner');
  if (!property) {
    return next(new ErrorResponse(ERROR_MESSAGES.PROPERTY.NOT_FOUND, 404));
  }

  // Check if user is not inquiring about their own property
  if (property.owner._id.toString() === req.user.id) {
    return next(new ErrorResponse(ERROR_MESSAGES.INQUIRY.OWN_PROPERTY, 400));
  }

  const inquiry = await Inquiry.create({
    property: propertyId,
    inquirer: req.user.id,
    propertyOwner: property.owner._id,
    subject,
    message,
    inquirerContact: {
      email: req.user.email,
      phone: req.user.phone
    }
  });

  await inquiry.populate([
    { path: 'property', select: 'title category price location' },
    { path: 'inquirer', select: 'firstName lastName email phone' }
  ]);

  res.status(201).json({
    success: true,
    message: 'Inquiry sent successfully',
    data: inquiry
  });
});

// @desc    Get inquiries received by current user
// @route   GET /api/inquiries/received
// @access  Private
exports.getReceivedInquiries = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = { propertyOwner: req.user.id };
  if (req.query.status) {
    filter.status = req.query.status;
  }

  const inquiries = await Inquiry.find(filter)
    .populate('property', 'title category price location images')
    .populate('inquirer', 'firstName lastName email phone profileImage')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Inquiry.countDocuments(filter);

  res.json({
    success: true,
    count: inquiries.length,
    total,
    pagination: {
      page,
      pages: Math.ceil(total / limit)
    },
    data: inquiries
  });
});

// @desc    Get inquiries sent by current user
// @route   GET /api/inquiries/sent
// @access  Private
exports.getSentInquiries = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const inquiries = await Inquiry.find({ inquirer: req.user.id })
    .populate('property', 'title category price location images')
    .populate('propertyOwner', 'firstName lastName email phone')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Inquiry.countDocuments({ inquirer: req.user.id });

  res.json({
    success: true,
    count: inquiries.length,
    total,
    pagination: {
      page,
      pages: Math.ceil(total / limit)
    },
    data: inquiries
  });
});

// @desc    Respond to an inquiry
// @route   PUT /api/inquiries/:id/respond
// @access  Private
exports.respondToInquiry = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    });
  }

  const inquiry = await Inquiry.findById(req.params.id);

  if (!inquiry) {
    return next(new ErrorResponse(ERROR_MESSAGES.INQUIRY.NOT_FOUND, 404));
  }

  // Check if user is the property owner
  if (inquiry.propertyOwner.toString() !== req.user.id) {
    return next(new ErrorResponse(ERROR_MESSAGES.INQUIRY.NOT_AUTHORIZED, 403));
  }

  inquiry.response = {
    message: req.body.message,
    respondedAt: new Date(),
    respondedBy: req.user.id
  };
  inquiry.status = 'responded';

  await inquiry.save();

  res.json({
    success: true,
    message: 'Response sent successfully',
    data: inquiry
  });
});