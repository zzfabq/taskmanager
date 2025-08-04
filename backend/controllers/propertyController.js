const Property = require('../models/Property');
const Owner = require('../models/Owner');

// @desc    Create new property
// @route   POST /api/properties
// @access  Private (Owner only)
const createProperty = async (req, res) => {
    try {
        const owner = await Owner.findOne({ userId: req.user.id });
        if (!owner) {
            return res.status(404).json({ message: 'Owner profile not found. Please create an owner profile first.' });
        }

        const {
            title,
            description,
            address,
            propertyType,
            bedrooms,
            bathrooms,
            size,
            rent,
            amenities,
            images
        } = req.body;

        const property = await Property.create({
            ownerId: owner._id,
            title,
            description,
            address,
            propertyType,
            bedrooms,
            bathrooms,
            size,
            rent,
            amenities,
            images
        });

        // Add property to owner's properties array
        owner.properties.push(property._id);
        await owner.save();

        const populatedProperty = await Property.findById(property._id)
            .populate('ownerId', 'phone address');

        res.status(201).json(populatedProperty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all properties for the logged-in owner
// @route   GET /api/properties/my-properties
// @access  Private
const getMyProperties = async (req, res) => {
    try {
        const owner = await Owner.findOne({ userId: req.user.id });
        if (!owner) {
            return res.status(404).json({ message: 'Owner profile not found' });
        }

        const properties = await Property.find({ ownerId: owner._id })
            .populate('ownerId', 'phone address');

        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all available properties (public)
// @route   GET /api/properties
// @access  Public
const getAllProperties = async (req, res) => {
    try {
        const { 
            city, 
            propertyType, 
            minBedrooms, 
            maxRent, 
            status = 'available' 
        } = req.query;

        let query = { isActive: true, status };

        // Add filters if provided
        if (city) query['address.city'] = new RegExp(city, 'i');
        if (propertyType) query.propertyType = propertyType;
        if (minBedrooms) query.bedrooms = { $gte: parseInt(minBedrooms) };
        if (maxRent) query['rent.amount'] = { $lte: parseInt(maxRent) };

        const properties = await Property.find(query)
            .populate('ownerId', 'phone')
            .sort({ createdAt: -1 });

        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)
            .populate('ownerId', 'phone address');

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private (Owner only)
const updateProperty = async (req, res) => {
    try {
        const owner = await Owner.findOne({ userId: req.user.id });
        if (!owner) {
            return res.status(404).json({ message: 'Owner profile not found' });
        }

        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Check if the property belongs to the logged-in owner
        if (property.ownerId.toString() !== owner._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this property' });
        }

        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('ownerId', 'phone address');

        res.json(updatedProperty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private (Owner only)
const deleteProperty = async (req, res) => {
    try {
        const owner = await Owner.findOne({ userId: req.user.id });
        if (!owner) {
            return res.status(404).json({ message: 'Owner profile not found' });
        }

        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Check if the property belongs to the logged-in owner
        if (property.ownerId.toString() !== owner._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this property' });
        }

        await Property.findByIdAndDelete(req.params.id);

        // Remove property from owner's properties array
        owner.properties.pull(req.params.id);
        await owner.save();

        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProperty,
    getMyProperties,
    getAllProperties,
    getPropertyById,
    updateProperty,
    deleteProperty
};
