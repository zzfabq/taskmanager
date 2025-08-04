const express = require('express');
const {
    createProperty,
    getMyProperties,
    getAllProperties,
    getPropertyById,
    updateProperty,
    deleteProperty
} = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Public routes
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);

// Protected routes
router.post('/', protect, createProperty);
router.get('/my/properties', protect, getMyProperties);
router.put('/:id', protect, updateProperty);
router.delete('/:id', protect, deleteProperty);

module.exports = router;
