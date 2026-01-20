const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const ERROR_MESSAGES = require('../utils/errorMessages');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorResponse(ERROR_MESSAGES.AUTH.USER_NOT_FOUND, 404));
  }

  res.json({
    success: true,
    data: user
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    address: req.body.address
  };

  const user = await User.findByIdAndUpdate(
    req.user.id,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true
    }
  );

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: user
  });
});

// @desc    Upload profile image
// @route   POST /api/users/profile/image
// @access  Private
exports.uploadProfileImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorResponse(ERROR_MESSAGES.FILE.NO_FILE, 400));
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { profileImage: req.file.filename },
    { new: true }
  );

  res.json({
    success: true,
    message: 'Profile image uploaded successfully',
    data: {
      profileImage: user.profileImage
    }
  });
});

// @desc    Upload verification documents
// @route   POST /api/users/verification/documents
// @access  Private
exports.uploadVerificationDocuments = asyncHandler(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next(new ErrorResponse(ERROR_MESSAGES.FILE.NO_FILE, 400));
  }

  const user = await User.findById(req.user.id);

  const documents = req.files.map(file => ({
    type: req.body.type || 'id_card',
    filename: file.filename,
    status: 'pending'
  }));

  user.verificationDocuments.push(...documents);
  await user.save();

  res.json({
    success: true,
    message: 'Verification documents uploaded successfully',
    data: user.verificationDocuments
  });
});