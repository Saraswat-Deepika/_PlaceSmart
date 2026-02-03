const express = require('express');
const router = express.Router();

router.post('/drives', (req, res) => {
    res.json({ success: true, message: 'Drive created' });
});

router.get('/students', (req, res) => {
    res.json([{ id: 1, name: 'Student 1', cgpa: 8.0 }]);
});

module.exports = router;
