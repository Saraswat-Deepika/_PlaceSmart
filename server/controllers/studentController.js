const Student = require('../models/Student');
const Application = require('../models/Application');
const Drive = require('../models/Drive');

// @desc    Get student profile
// @route   GET /api/student/profile
// @access  Private
const getProfile = async (req, res) => {
    try {
        let student = await Student.findOne({ user: req.user.id }).populate('user', 'name email');
        if (!student) {
            student = await Student.create({ user: req.user.id });
            // Re-fetch to populate user details
            student = await Student.findById(student._id).populate('user', 'name email');
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update student profile
// @route   PUT /api/student/profile
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const { branch, cgpa, backlogs, phone, gitHubLink, linkedInLink, skills, resume } = req.body;

        const student = await Student.findOne({ user: req.user.id });

        if (student) {
            student.branch = branch || student.branch;
            student.cgpa = cgpa || student.cgpa;
            student.backlogs = backlogs !== undefined ? backlogs : student.backlogs;
            student.phone = phone || student.phone;
            student.gitHubLink = gitHubLink || student.gitHubLink;
            student.linkedInLink = linkedInLink || student.linkedInLink;
            student.skills = skills || student.skills;
            student.resume = resume || student.resume;

            const updatedStudent = await student.save();
            res.json(updatedStudent);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get dashboard stats
// @route   GET /api/student/dashboard-stats
// @access  Private
const getDashboardStats = async (req, res) => {
    try {
        let student = await Student.findOne({ user: req.user.id });

        if (!student) {
            student = await Student.create({ user: req.user.id });
        }

        const applicationCount = await Application.countDocuments({ student: req.user.id });

        // Logic for upcoming drives (e.g., drives with date in future)
        const upcomingDrivesCount = await Drive.countDocuments({ date: { $gte: new Date() } });

        // Logic for profile status
        const isProfileComplete =
            student.resume &&
            student.cgpa &&
            student.branch &&
            student.phone;

        res.json({
            upcomingDrives: upcomingDrivesCount,
            applicationsApplied: applicationCount,
            profileComplete: isProfileComplete ? true : false,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get student applications
// @route   GET /api/student/applications
// @access  Private
const getApplications = async (req, res) => {
    try {
        const applications = await Application.find({ student: req.user.id })
            .populate('drive', 'company role date')
            .sort({ appliedAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get eligible drives
// @route   GET /api/student/drives
// @access  Private
const getEligibleDrives = async (req, res) => {
    try {
        const student = await Student.findOne({ user: req.user.id });

        if (!student) {
            return res.status(404).json({ message: 'Student profile not found' });
        }

        // Build query for drives
        // 1. Minimum CGPA check
        // 2. Maximum backlogs check
        // 3. Branch check (if drive specifies allowed branches)

        const query = {
            date: { $gte: new Date() }, // Only upcoming drives
            $and: [
                { minCGPA: { $lte: student.cgpa || 0 } },
                { maxBacklogs: { $gte: student.backlogs || 0 } }
            ]
        };

        // If student has a branch, filter drives that either allow all branches (empty) or include this branch
        if (student.branch) {
            query.$or = [
                { allowedBranches: { $size: 0 } }, // Empty array means open to all
                { allowedBranches: student.branch }
            ];
        }

        const drives = await Drive.find(query).sort({ date: 1 });
        res.json(drives);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc    Apply for a drive
// @route   POST /api/student/apply/:driveId
// @access  Private
const applyForDrive = async (req, res) => {
    const { driveId } = req.params;

    try {
        const existingApplication = await Application.findOne({
            student: req.user.id,
            drive: driveId
        });

        if (existingApplication) {
            return res.status(400).json({ message: 'Already applied to this drive' });
        }

        const application = await Application.create({
            student: req.user.id,
            drive: driveId
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    getDashboardStats,
    getApplications,
    getEligibleDrives,
    applyForDrive
};
