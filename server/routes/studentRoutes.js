const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
    res.json({ name: 'Student Name', branch: 'CSE', cgpa: 8.5 });
});

router.post('/apply/:driveId', (req, res) => {
    res.json({ success: true, message: 'Applied successfully' });
});

router.get('/applications', (req, res) => {
    res.json([{ company: 'Tech Corp', status: 'Applied' }]);
});

module.exports = router;
