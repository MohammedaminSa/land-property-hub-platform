const Inquiry = require('../models/inquiryModel');
const Property = require('../models/propertyModel');

// @desc    Send inquiry
// @route   POST /api/inquiries
// @access  Private
exports.sendInquiry = async (req, res) => {
  try {
    const { property, subject, message } = req.body;

    // Check if property exists
    const propertyExists = await Property.findById(property);
    if (!propertyExists) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Create inquiry
    const inquiry = await Inquiry.create({
      property,
      sender: req.user.id,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry sent successfully',
      data: inquiry
    });
  } catch (error) {
    console.error('Send Inquiry Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get my inquiries
// @route   GET /api/inquiries
// @access  Private
exports.getInquiries = async (req, res) => {
  try {
    const { type, status } = req.query;

    let query = {};

    // Filter by type (sent or received)
    if (type === 'sent') {
      query.sender = req.user.id;
    } else if (type === 'received') {
      // Get properties owned by user
      const myProperties = await Property.find({ owner: req.user.id }).select('_id');
      const propertyIds = myProperties.map(p => p._id);
      query.property = { $in: propertyIds };
    } else {
      // Both sent and received
      const myProperties = await Property.find({ owner: req.user.id }).select('_id');
      const propertyIds = myProperties.map(p => p._id);
      query.$or = [
        { sender: req.user.id },
        { property: { $in: propertyIds } }
      ];
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    const inquiries = await Inquiry.find(query)
      .populate('property', 'title price images')
      .populate('sender', 'firstName lastName email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    console.error('Get Inquiries Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update inquiry status
// @route   PUT /api/inquiries/:id
// @access  Private
exports.updateInquiry = async (req, res) => {
  try {
    const { status, response } = req.body;

    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    // Check if user is property owner
    const property = await Property.findById(inquiry.property);
    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this inquiry'
      });
    }

    // Update inquiry
    if (status) inquiry.status = status;
    if (response) {
      inquiry.response = {
        message: response,
        respondedAt: Date.now()
      };
    }

    await inquiry.save();

    res.status(200).json({
      success: true,
      message: 'Inquiry updated successfully',
      data: inquiry
    });
  } catch (error) {
    console.error('Update Inquiry Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
