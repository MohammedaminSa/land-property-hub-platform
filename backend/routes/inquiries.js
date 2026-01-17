const express = require('express');
const Inquiry = require('../models/Inquiry');
const Property = require('../models/Property');
const auth = require('../middleware/auth');

const router = express.Router();

// Create inquiry
router.post('/', auth, async (req, res) => {
  try {
    const { propertyId, message, contactPreference } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const inquiry = new Inquiry({
      property: propertyId,
      inquirer: req.userId,
      message,
      contactPreference
    });

    await inquiry.save();
    await inquiry.populate(['property', 'inquirer']);

    res.status(201).json(inquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get inquiries for property owner
router.get('/received', auth, async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.userId });
    const propertyIds = properties.map(p => p._id);

    const inquiries = await Inquiry.find({ property: { $in: propertyIds } })
      .populate('property', 'title type listingType')
      .populate('inquirer', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's sent inquiries
router.get('/sent', auth, async (req, res) => {
  try {
    const inquiries = await Inquiry.find({ inquirer: req.userId })
      .populate('property', 'title type listingType images')
      .sort({ createdAt: -1 });

    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Respond to inquiry
router.put('/:id/respond', auth, async (req, res) => {
  try {
    const { response } = req.body;
    
    const inquiry = await Inquiry.findById(req.params.id)
      .populate('property');

    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    if (inquiry.property.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    inquiry.response = response;
    inquiry.status = 'responded';
    await inquiry.save();

    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;