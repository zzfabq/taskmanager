// backend/controllers/ownerController.js
const Owner = require("../models/Owner");

// @desc    Create new owner profile
// @route   POST /api/owners
// @access  Private
const addOwner = async (req, res) => {
    try {
        const { phone, address } = req.body;
        
        // Check if owner already exists for this user
        const existingOwner = await Owner.findOne({ userId: req.user.id });
        if (existingOwner) {
            return res.status(400).json({ message: 'Owner profile already exists for this user' });
        }

        const owner = await Owner.create({
            userId: req.user.id,
            phone,
            address
        });

        const populatedOwner = await Owner.findById(owner._id).populate('user', 'name email');
        res.status(201).json(populatedOwner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get owner profile
// @route   GET /api/owners/profile
// @access  Private
const getOwner = async (req, res) => {
    try {
        const owner = await Owner.findOne({ userId: req.user.id })
            .populate('user', 'name email university')
            .populate('properties');
        
        if (!owner) {
            return res.status(404).json({ message: 'Owner profile not found' });
        }

        res.json(owner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update owner profile
// @route   PUT /api/owners/profile
// @access  Private
const updateOwner = async (req, res) => {
    try {
        const { phone, address } = req.body;
        
        const owner = await Owner.findOne({ userId: req.user.id });
        if (!owner) {
            return res.status(404).json({ message: 'Owner profile not found' });
        }

        owner.phone = phone || owner.phone;
        owner.address = address || owner.address;

        await owner.save();
        
        const updatedOwner = await Owner.findById(owner._id)
            .populate('user', 'name email university')
            .populate('properties');
        
        res.json(updatedOwner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all owners (admin only)
// @route   GET /api/owners
// @access  Private
const getAllOwners = async (req, res) => {
    try {
        const owners = await Owner.find({})
            .populate('user', 'name email')
            .populate('properties', 'title status propertyType');
        
        res.json(owners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete owner profile
// @route   DELETE /api/owners/profile
// @access  Private
const deleteOwner = async (req, res) => {
    try {
        const owner = await Owner.findOne({ userId: req.user.id });
        if (!owner) {
            return res.status(404).json({ message: 'Owner profile not found' });
        }

        await Owner.findByIdAndDelete(owner._id);
        res.json({ message: 'Owner profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addOwner,
    getOwner,
    updateOwner,
    getAllOwners,
    deleteOwner
};