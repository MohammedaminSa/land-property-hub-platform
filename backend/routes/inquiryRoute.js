const express = require('express');
const { body, validationResult } = require('express-validator');
const Inquiry = require('../models/inquiryModel');
const Property = require('../models/propertyModel');
const { protect } = require('../middleware/auth');
const router = express.Router();

// @route   POST /api/inquiries
// @desc    Create new inquiry
// @access  Private
router.post('/', [
  protect,
  body('property').isMongoId().withMessage('Valid property ID is required'),
  body('subject').trim().isLength({ min: 5, max: 100 }).withMessage('Subject must be between 5 and 100 characters'),
  body('message').trim().isLength({ min: 10, max: 500 }).withMessage('Message must be between 10 and 500 characters')
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

    const { property: propertyId, subject, message } = req.body;

    // Check if property exists
    const property = await Property.findById(propertyId).populate('owner');
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if user is not inquiring about their own property
    if (property.owner._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot inquire about your own property'
      });
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

  } catch (error) {
    console.error('Create inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/inquiries/received
// @desc    Get inquiries received by current user
// @access  Private
router.get('/received', protect, async (req, res) => {
  try {
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

  } catch (error) {
    console.error('Get received inquiries error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/inquiries/sent
// @desc    Get inquiries sent by current user
// @access  Private
router.get('/sent', protect, async (req, res) => {
  try {
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

  } catch (error) {
    console.error('Get sent inquiries error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/inquiries/:id/respond
// @desc    Respond to an inquiry
// @access  Private
router.put('/:id/respond', [
  protect,
  body('message').trim().isLength({ min: 10, max: 500 }).withMessage('Response must be between 10 and 500 characters')
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

    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    // Check if user is the property owner
    if (inquiry.propertyOwner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to respond to this inquiry'
      });
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

  } catch (error) {
    console.error('Respond to inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;