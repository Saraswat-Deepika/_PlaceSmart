const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    branch: { type: String },
    cgpa: { type: Number },
    backlogs: { type: Number, default: 0 },
    phone: { type: String },
    gitHubLink: { type: String },
    linkedInLink: { type: String },
    skills: [String],
    resume: { type: String } // URL to resume
});

module.exports = mongoose.model('Student', studentSchema);
