const express = require('express');
const router = express.Router();
const { getMe, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Profile routes - all protected
router.get('/me', protect, getMe);       // Fetch profile
router.put('/me', protect, updateProfile); // Update profile

module.exports = router;
