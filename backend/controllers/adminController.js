const User = require('../models/userModel');
const Property = require('../models/propertyModel');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin only)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Get Users Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Approve user
// @route   PUT /api/admin/users/:id/approve
// @access  Private (Admin only)
exports.approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isApproved = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User approved successfully',
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        isApproved: user.isApproved
      }
    });
  } catch (error) {
    console.error('Approve User Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Approve property
// @route   PUT /api/admin/properties/:id/approve
// @access  Private (Admin only)
exports.approveProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    property.status = 'approved';
    property.approvedBy = req.user.id;
    property.approvedAt = Date.now();
    await property.save();

    res.status(200).json({
      success: true,
      message: 'Property approved successfully',
      data: {
        _id: property._id,
        title: property.title,
        status: property.status
      }
    });
  } catch (error) {
    console.error('Approve Property Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
