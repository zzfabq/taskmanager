const express = require('express');
const { addRenter, getRenter, updateRenter, getAllRenters,deleteRenter } = require('../controllers/renterController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getAllRenters).post(protect, addRenter);
router.route('/:id').get(protect, getRenter).put(protect, updateRenter).delete(protect, deleteRenter);

module.exports = router;
