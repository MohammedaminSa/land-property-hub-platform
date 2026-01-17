const express = require('express');
const multer = require('multer');
const path = require('path');
const Property = require('../models/Property');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Get all properties with filters
router.get('/', async (req, res) => {
  try {
    const {
      type,
      listingType,
      city,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      page = 1,
      limit = 12
    } = req.query;

    const filter = { status: 'active' };

    if (type) filter.type = type;
    if (listingType) filter.listingType = listingType;
    if (city) filter['location.city'] = new RegExp(city, 'i');
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (bedrooms) filter['features.bedrooms'] = Number(bedrooms);
    if (bathrooms) filter['features.bathrooms'] = Number(bathrooms);

    const properties = await Property.find(filter)
      .populate('owner', 'name email phone userType')
      .sort({ featured: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Property.countDocuments(filter);

    res.json({
      properties,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single property
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('owner', 'name email phone userType');
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create property
router.post('/', auth, upload.array('images', 10), async (req, res) => {
  try {
    const propertyData = JSON.parse(req.body.propertyData);
    
    const images = req.files ? req.files.map(file => file.filename) : [];

    const property = new Property({
      ...propertyData,
      images,
      owner: req.userId
    });

    await property.save();
    await property.populate('owner', 'name email phone userType');

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update property
router.put('/:id', auth, upload.array('images', 10), async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const propertyData = JSON.parse(req.body.propertyData);
    const newImages = req.files ? req.files.map(file => file.filename) : [];

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      {
        ...propertyData,
        images: [...property.images, ...newImages]
      },
      { new: true }
    ).populate('owner', 'name email phone userType');

    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete property
router.delete('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's properties
router.get('/user/my-properties', auth, async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.userId })
      .sort({ createdAt: -1 });
    
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;