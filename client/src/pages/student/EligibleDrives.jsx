import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import studentService from '../../services/studentService';


const EligibleDrives = () => {
    const [drives, setDrives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDrives = async () => {
            try {
                const data = await studentService.getEligibleDrives();
                setDrives(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching drives:', error);
                setLoading(false);
            }
        };
        fetchDrives();
    }, []);

    const mockDrives = [
        {
            id: 1,
            company: 'Google',
            role: 'Software Engineer',
            package: '₹25-30 LPA',
            location: 'Bangalore',
            deadline: '2026-02-15',
            eligibility: { cgpa: 7.5, branch: ['CSE', 'IT'], backlogs: 0 },
            description: 'Looking for talented software engineers to join our team.',
            matchPercentage: 95,
            status: 'Open'
        },
        {
            id: 2,
            company: 'Microsoft',
            role: 'SDE Intern',
            package: '₹1L/month',
            location: 'Hyderabad',
            deadline: '2026-02-20',
            eligibility: { cgpa: 7.0, branch: ['CSE', 'IT', 'ECE'], backlogs: 0 },
            description: 'Summer internship program for aspiring software developers.',
            matchPercentage: 88,
            status: 'Open'
        },
        {
            id: 3,
            company: 'Amazon',
            role: 'Backend Developer',
            package: '₹20-25 LPA',
            location: 'Mumbai',
            deadline: '2026-02-25',
            eligibility: { cgpa: 7.0, branch: ['CSE', 'IT'], backlogs: 1 },
            description: 'Join our backend team to build scalable systems.',
            matchPercentage: 82,
            status: 'Open'
        },
        {
            id: 4,
            company: 'Flipkart',
            role: 'Full Stack Developer',
            package: '₹18-22 LPA',
            location: 'Bangalore',
            deadline: '2026-03-01',
            eligibility: { cgpa: 6.5, branch: ['CSE', 'IT'], backlogs: 2 },
            description: 'Work on cutting-edge e-commerce solutions.',
            matchPercentage: 78,
            status: 'Open'
        },
        {
            id: 5,
            company: 'Adobe',
            role: 'UI/UX Developer',
            package: '₹22-28 LPA',
            location: 'Noida',
            deadline: '2026-02-28',
            eligibility: { cgpa: 7.5, branch: ['CSE', 'IT'], backlogs: 0 },
            description: 'Create amazing user experiences for millions of users.',
            matchPercentage: 90,
            status: 'Open'
        }
    ];

    const displayDrives = drives.length > 0 ? drives : mockDrives;

    const DriveCard = ({ drive }) => (
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center text-2xl font-bold text-indigo-600">
                        {drive.company.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-gray-900">{drive.company}</h3>
                        <p className="text-gray-600">{drive.role}</p>
                    </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${drive.matchPercentage >= 80 ? 'bg-green-100 text-green-700' :
                    drive.matchPercentage >= 60 ? 'bg-amber-100 text-amber-700' :
                        'bg-gray-100 text-gray-700'
                    }`}>
                    {drive.matchPercentage}% Match
                </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">{drive.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>💰</span>
                    <span>{drive.package}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>📍</span>
                    <span>{drive.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>📅</span>
                    <span>Deadline: {new Date(drive.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>📊</span>
                    <span>CGPA: {drive.eligibility.cgpa}+</span>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={() => navigate(`/student/apply/${drive.id}`)}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    Apply Now →
                </button>
                <button className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                    View Details
                </button>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
                <div className="flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Eligible Drives</h1>
                <p className="text-gray-600 text-lg">Browse and apply to placement opportunities matching your profile</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <div className="flex items-center gap-4 flex-wrap">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        All Drives ({displayDrives.length})
                    </button>
                    <button
                        onClick={() => setFilter('high-match')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'high-match' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        High Match (80%+)
                    </button>
                    <button
                        onClick={() => setFilter('deadline-soon')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'deadline-soon' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Deadline Soon
                    </button>
                </div>
            </div>

            {/* Drives Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayDrives.map((drive) => (
                    <DriveCard key={drive.id} drive={drive} />
                ))}
            </div>

            {displayDrives.length === 0 && (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Eligible Drives Found</h3>
                    <p className="text-gray-600">Check back later for new opportunities!</p>
                </div>
            )}
        </div>
    );
};

export default EligibleDrives;
