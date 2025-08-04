// backend/controllers/renterController.js

const Renter = require("../models/Renter");

// @desc    Create new renter profile
// @route   POST /api/renters
// @access  Private
const addRenter = async (req, res) => {
    try {
        const { phone, address } = req.body;
        
        // Check if renter already exists for this user
        const existingRenter = await Renter.findOne({ userId: req.user.id });
        if (existingRenter) {
            return res.status(400).json({ message: 'Renter profile already exists for this user' });
        }

        const renter = await Renter.create({
            userId: req.user.id,
            phone,
            address
        });

        const populatedRenter = await Renter.findById(renter._id).populate('user', 'name email');
        res.status(201).json(populatedRenter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get renter profile
// @access  Private
const getRenter = async (req, res) => {
    try {
        const renter = await Renter.findOne({ userId: req.user.id })
            .populate('user', 'name email university')
            .populate('properties');
        
        if (!renter) {
            return res.status(404).json({ message: 'Renter profile not found' });
        }

        res.json(renter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update renter profile
// @access  Private
const updateRenter = async (req, res) => {
    try {
        const { phone, address } = req.body;
        
        const renter = await Renter.findOne({ userId: req.user.id });
        if (!renter) {
            return res.status(404).json({ message: 'Renter profile not found' });
        }

        renter.phone = phone || renter.phone;
        renter.address = address || renter.address;

        await renter.save();
        
        const updatedRenter = await Renter.findById(renter._id)
            .populate('user', 'name email university')
            .populate('properties');
        
        res.json(updatedRenter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all renters (admin only)
// @route   GET /api/renters
// @access  Private
const getAllRenters = async (req, res) => {
    try {
        const renters = await Renter.find({})
            .populate('user', 'name email')
            .populate('properties', 'title status propertyType');

        res.json(renters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete renter profile
// @route   DELETE /api/renters/profile
// @access  Private
const deleteRenter = async (req, res) => {
    try {
        const renter = await Renter.findOne({ userId: req.user.id });
        if (!renter) {
            return res.status(404).json({ message: 'Renter profile not found' });
        }

        await Renter.findByIdAndDelete(renter._id);
        res.json({ message: 'Renter profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addRenter,
    getRenter,
    updateRenter,
    getAllRenters,
    deleteRenter
};