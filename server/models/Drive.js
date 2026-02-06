const mongoose = require('mongoose');

const driveSchema = new mongoose.Schema({
    company: { type: String, required: true },
    role: { type: String, required: true },
    package: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String },
    eligibility: { type: String }, // Text description validation
    // Structured criteria for automated checking
    minCGPA: { type: Number, default: 0 },
    allowedBranches: [String], // e.g., ['CSE', 'ECE']
    maxBacklogs: { type: Number, default: 0 }
});

module.exports = mongoose.model('Drive', driveSchema);
