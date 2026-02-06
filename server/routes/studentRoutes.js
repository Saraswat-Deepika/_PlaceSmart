const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getProfile,
    updateProfile,
    getDashboardStats,
    getApplications,
    getEligibleDrives,
    applyForDrive
} = require('../controllers/studentController');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/dashboard-stats', protect, getDashboardStats);
router.get('/applications', protect, getApplications);
router.get('/drives', protect, getEligibleDrives);
router.post('/apply/:driveId', protect, applyForDrive);

module.exports = router;
