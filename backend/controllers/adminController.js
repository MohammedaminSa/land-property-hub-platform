const User = require('../models/userModel');
const Property = require('../models/propertyModel');
const Inquiry = require('../models/inquiryModel');

// @desc    Get admin dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private (Admin only)
exports.getDashboard = async (req, res) => {
  try {
    // Get statistics
    const totalUsers = await User.countDocuments();
    const totalProperties = await Property.countDocuments();
    const pendingProperties = await Property.countDocuments({ status: 'pending' });
    const approvedProperties = await Property.countDocuments({ status: 'approved' });
    const totalInquiries = await Inquiry.countDocuments();
    const pendingInquiries = await Inquiry.countDocuments({ status: 'pending' });

    // Get recent users (last 5)
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('firstName lastName email role isApproved createdAt');

    // Get pending properties (last 5)
    const pendingPropertiesList = await Property.find({ status: 'pending' })
      .populate('owner', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
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
  } catch (error) {
    console.error('Get Dashboard Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin only)
exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, isApproved } = req.query;

    // Build query
    const query = {};
    if (role) query.role = role;
    if (isApproved !== undefined) query.isApproved = isApproved === 'true';

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .select('-password');

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      pagination: {
        page: pageNum,
        pages: Math.ceil(total / limitNum)
      },
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

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent deleting admin users
    if (user.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Cannot delete admin users'
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete User Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all properties (admin)
// @route   GET /api/admin/properties
// @access  Private (Admin only)
exports.getProperties = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    // Build query
    const query = {};
    if (status) query.status = status;

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const properties = await Property.find(query)
      .populate('owner', 'firstName lastName email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Property.countDocuments(query);

    res.status(200).json({
      success: true,
      count: properties.length,
      total,
      pagination: {
        page: pageNum,
        pages: Math.ceil(total / limitNum)
      },
      data: properties
    });
  } catch (error) {
    console.error('Get Properties Error:', error);
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
        status: property.status,
        approvedBy: property.approvedBy,
        approvedAt: property.approvedAt
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

// @desc    Reject property
// @route   PUT /api/admin/properties/:id/reject
// @access  Private (Admin only)
exports.rejectProperty = async (req, res) => {
  try {
    const { reason } = req.body;

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    property.status = 'rejected';
    property.rejectionReason = reason || 'Property does not meet our standards';
    await property.save();

    res.status(200).json({
      success: true,
      message: 'Property rejected',
      data: {
        _id: property._id,
        status: property.status,
        rejectionReason: property.rejectionReason
      }
    });
  } catch (error) {
    console.error('Reject Property Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
