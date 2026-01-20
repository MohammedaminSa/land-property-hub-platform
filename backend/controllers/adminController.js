const User = require('../models/userModel');
const Property = require('../models/propertyModel');
const Inquiry = require('../models/inquiryModel');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const ERROR_MESSAGES = require('../utils/errorMessages');

// @desc    Get admin dashboard data
// @route   GET /api/admin/dashboard
// @access  Private (Admin only)
exports.getAdminDashboard = asyncHandler(async (req, res) => {
  // Get statistics
  const totalUsers = await User.countDocuments();
  const totalProperties = await Property.countDocuments();
  const pendingProperties = await Property.countDocuments({ status: 'pending' });
  const approvedProperties = await Property.countDocuments({ status: 'approved' });
  const totalInquiries = await Inquiry.countDocuments();
  const pendingInquiries = await Inquiry.countDocuments({ status: 'pending' });

  // Get recent users
  const recentUsers = await User.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select('firstName lastName email role isApproved createdAt');

  // Get pending properties
  const pendingPropertiesList = await Property.find({ status: 'pending' })
    .populate('owner', 'firstName lastName email phone')
    .sort({ createdAt: -1 })
    .limit(10);

  res.json({
    success: true,
    data: {
      statistics: {
        totalUsers,
        totalProperties,
        pendingProperties,
        approvedProperties,
        totalInquiries,
        pendingInquiries
      },
      recentUsers,
      pendingProperties: pendingPropertiesList
    }
  });
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin only)
exports.getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.role) {
    filter.role = req.query.role;
  }
  if (req.query.isApproved) {
    filter.isApproved = req.query.isApproved === 'true';
  }

  const users = await User.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(filter);

  res.json({
    success: true,
    count: users.length,
    total,
    pagination: {
      page,
      pages: Math.ceil(total / limit)
    },
    data: users
  });
});

// @desc    Approve user
// @route   PUT /api/admin/users/:id/approve
// @access  Private (Admin only)
exports.approveUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(ERROR_MESSAGES.AUTH.USER_NOT_FOUND, 404));
  }

  user.isApproved = true;
  user.isVerified = true;
  await user.save();

  res.json({
    success: true,
    message: 'User approved successfully',
    data: user
  });
});

// @desc    Reject user
// @route   PUT /api/admin/users/:id/reject
// @access  Private (Admin only)
exports.rejectUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(ERROR_MESSAGES.AUTH.USER_NOT_FOUND, 404));
  }

  user.isApproved = false;
  await user.save();

  res.json({
    success: true,
    message: 'User rejected',
    data: user
  });
});

// @desc    Get all properties (admin view)
// @route   GET /api/admin/properties
// @access  Private (Admin only)
exports.getAllProperties = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.status) {
    filter.status = req.query.status;
  }

  const properties = await Property.find(filter)
    .populate('owner', 'firstName lastName email phone')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Property.countDocuments(filter);

  res.json({
    success: true,
    count: properties.length,
    total,
    pagination: {
      page,
      pages: Math.ceil(total / limit)
    },
    data: properties
  });
});

// @desc    Approve property
// @route   PUT /api/admin/properties/:id/approve
// @access  Private (Admin only)
exports.approveProperty = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorResponse(ERROR_MESSAGES.PROPERTY.NOT_FOUND, 404));
  }

  property.status = 'approved';
  property.approvedBy = req.user.id;
  property.approvedAt = new Date();
  await property.save();

  res.json({
    success: true,
    message: 'Property approved successfully',
    data: property
  });
});

// @desc    Reject property
// @route   PUT /api/admin/properties/:id/reject
// @access  Private (Admin only)
exports.rejectProperty = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorResponse(ERROR_MESSAGES.PROPERTY.NOT_FOUND, 404));
  }

  property.status = 'rejected';
  property.rejectionReason = req.body.reason || 'Not specified';
  await property.save();

  res.json({
    success: true,
    message: 'Property rejected',
    data: property
  });
});