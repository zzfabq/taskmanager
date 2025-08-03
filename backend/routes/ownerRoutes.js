const express = require('express');
const { addOwner, getOwner, updateOwner, getAllOwners,deleteOwner } = require('../controllers/ownerController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getAllOwners).post(protect, addOwner);
router.route('/:id').get(protect, getOwner).put(protect, updateOwner).delete(protect, deleteOwner);

module.exports = router;
