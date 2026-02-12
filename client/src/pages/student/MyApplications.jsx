import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import studentService from '../../services/studentService';


const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const data = await studentService.getApplications();
                setApplications(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching applications:', error);
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    const mockApplications = [
        {
            id: 1,
            company: 'Google',
            role: 'Software Engineer',
            appliedDate: '2026-01-28',
            status: 'Interview',
            statusDate: '2 days ago',
            nextStep: 'Technical Interview on Feb 10',
            package: '₹25-30 LPA'
        },
        {
            id: 2,
            company: 'Microsoft',
            role: 'SDE Intern',
            appliedDate: '2026-01-23',
            status: 'Test Scheduled',
            statusDate: '5 days ago',
            nextStep: 'Online Assessment on Feb 8',
            package: '₹1L/month'
        },
        {
            id: 3,
            company: 'Amazon',
            role: 'Backend Developer',
            appliedDate: '2026-01-20',
            status: 'Applied',
            statusDate: '1 week ago',
            nextStep: 'Awaiting response',
            package: '₹20-25 LPA'
        },
        {
            id: 4,
            company: 'Flipkart',
            role: 'Full Stack Developer',
            appliedDate: '2026-01-15',
            status: 'Rejected',
            statusDate: '2 weeks ago',
            nextStep: 'Application closed',
            package: '₹18-22 LPA'
        },
        {
            id: 5,
            company: 'Adobe',
            role: 'UI/UX Developer',
            appliedDate: '2026-02-01',
            status: 'Offer',
            statusDate: 'Today',
            nextStep: 'Accept offer by Feb 15',
            package: '₹22-28 LPA'
        }
    ];

    const displayApplications = applications.length > 0 ? applications : mockApplications;

    const statusConfig = {
        'Applied': { icon: '📤', bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
        'Test Scheduled': { icon: '📝', bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
        'Interview': { icon: '💼', bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
        'Offer': { icon: '🎉', bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
        'Rejected': { icon: '❌', bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' }
    };

    const ApplicationCard = ({ application }) => {
        const config = statusConfig[application.status] || statusConfig['Applied'];

        return (
            <div className={`bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 ${config.border}`}>
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center text-2xl font-bold text-indigo-600">
                            {application.company.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-gray-900">{application.company}</h3>
                            <p className="text-gray-600">{application.role}</p>
                            <p className="text-sm text-gray-500">Applied: {new Date(application.appliedDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold ${config.bg} ${config.text} inline-flex items-center gap-2`}>
                        <span>{config.icon}</span>
                        {application.status}
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Next Step:</span>
                        <span className="text-xs text-gray-500">{application.statusDate}</span>
                    </div>
                    <p className="text-gray-900 font-medium">{application.nextStep}</p>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-gray-600">💰 {application.package}</span>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                        View Details →
                    </button>
                </div>
            </div>
        );
    };

    const filteredApplications = displayApplications.filter(app => {
        if (filter === 'all') return true;
        if (filter === 'active') return ['Applied', 'Test Scheduled', 'Interview'].includes(app.status);
        if (filter === 'offers') return app.status === 'Offer';
        return true;
    });

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
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">My Applications</h1>
                <p className="text-gray-600 text-lg">Track your placement application progress</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="text-3xl mb-2">📊</div>
                    <div className="text-2xl font-bold text-gray-900">{displayApplications.length}</div>
                    <div className="text-sm text-gray-600">Total Applications</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="text-3xl mb-2">⏳</div>
                    <div className="text-2xl font-bold text-amber-600">
                        {displayApplications.filter(a => ['Applied', 'Test Scheduled', 'Interview'].includes(a.status)).length}
                    </div>
                    <div className="text-sm text-gray-600">In Progress</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="text-3xl mb-2">🎉</div>
                    <div className="text-2xl font-bold text-green-600">
                        {displayApplications.filter(a => a.status === 'Offer').length}
                    </div>
                    <div className="text-sm text-gray-600">Offers Received</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="text-3xl mb-2">📈</div>
                    <div className="text-2xl font-bold text-indigo-600">
                        {Math.round((displayApplications.filter(a => a.status === 'Offer').length / displayApplications.length) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <div className="flex items-center gap-4 flex-wrap">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        All ({displayApplications.length})
                    </button>
                    <button
                        onClick={() => setFilter('active')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'active' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Active ({displayApplications.filter(a => ['Applied', 'Test Scheduled', 'Interview'].includes(a.status)).length})
                    </button>
                    <button
                        onClick={() => setFilter('offers')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'offers' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Offers ({displayApplications.filter(a => a.status === 'Offer').length})
                    </button>
                </div>
            </div>

            {/* Applications Grid */}
            <div className="grid grid-cols-1 gap-6">
                {filteredApplications.map((application) => (
                    <ApplicationCard key={application.id} application={application} />
                ))}
            </div>

            {filteredApplications.length === 0 && (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Applications Found</h3>
                    <p className="text-gray-600 mb-6">Start applying to drives to track your progress here!</p>
                    <button
                        onClick={() => navigate('/student/drives')}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                        Browse Drives
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyApplications;
