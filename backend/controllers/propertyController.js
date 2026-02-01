const Property = require('../models/propertyModel');

// @desc    Get all properties with filters
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search,
      category,
      type,
      city,
      subcity,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      bedrooms,
      bathrooms,
      parking,
      furnished,
      sortBy = 'createdAt'
    } = req.query;

    // Build query - only show approved and active properties
    const query = { status: 'approved', isActive: true };

    // Text search in title and description
    if (search) {
      query.$text = { $search: search };
    }

    // Filters
    if (category) query.category = category;
    if (type) query.type = type;
    if (city) query['location.city'] = new RegExp(city, 'i');
    if (subcity) query['location.subcity'] = new RegExp(subcity, 'i');

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Area range
    if (minArea || maxArea) {
      query['area.size'] = {};
      if (minArea) query['area.size'].$gte = Number(minArea);
      if (maxArea) query['area.size'].$lte = Number(maxArea);
    }

    // Features
    if (bedrooms) query['features.bedrooms'] = { $gte: Number(bedrooms) };
    if (bathrooms) query['features.bathrooms'] = { $gte: Number(bathrooms) };
    if (parking === 'true') query['features.parking'] = true;
    if (furnished === 'true') query['features.furnished'] = true;

    // Sorting
    let sort = {};
    switch (sortBy) {
      case 'price_asc':
        sort = { price: 1 };
        break;
      case 'price_desc':
        sort = { price: -1 };
        break;
      case 'area_asc':
        sort = { 'area.size': 1 };
        break;
      case 'area_desc':
        sort = { 'area.size': -1 };
        break;
      case 'views':
        sort = { views: -1 };
        break;
      default:
        sort = { createdAt: -1 };
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const properties = await Property.find(query)
      .populate('owner', 'firstName lastName phone email')
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    // Get total count
    const total = await Property.countDocuments(query);

    res.status(200).json({
      success: true,
      count: properties.length,
      total,
      pagination: {
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
        hasNext: pageNum * limitNum < total,
        hasPrev: pageNum > 1
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

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('owner', 'firstName lastName phone email profileImage');

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if property is approved and active (for public access)
    if (property.status !== 'approved' || !property.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Increment views
    property.views += 1;
    await property.save();

    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error('Get Property Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new property
// @route   POST /api/properties
// @access  Private (Seller, Landlord, Agent)
exports.createProperty = async (req, res) => {
  try {
    // Add logged-in user as owner
    req.body.owner = req.user.id;

    const property = await Property.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Property created successfully and pending approval',
      data: property
    });
  } catch (error) {
    console.error('Create Property Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private (Property owner)
exports.updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check ownership
    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this property'
      });
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Property updated successfully',
      data: property
    });
  } catch (error) {
    console.error('Update Property Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private (Property owner)
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check ownership
    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this property'
      });
    }

    await property.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    console.error('Delete Property Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get my properties
// @route   GET /api/properties/my/listings
// @access  Private
exports.getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    console.error('Get My Properties Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
