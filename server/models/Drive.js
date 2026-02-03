const mongoose = require('mongoose');

const driveSchema = new mongoose.Schema({
    company: { type: String, required: true },
    role: { type: String, required: true },
    package: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String },
    eligibility: { type: String }
});

module.exports = mongoose.model('Drive', driveSchema);
