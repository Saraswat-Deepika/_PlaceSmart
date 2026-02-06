import React, { useEffect, useState } from 'react';
import studentService from '../../services/studentService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
    const { currentUser, logout } = useAuth();
    const [stats, setStats] = useState({
        upcomingDrives: 0,
        applicationsApplied: 0,
        interviewsScheduled: 0,
        offersReceived: 0,
        profileComplete: false,
        profileCompletionPercentage: 0,
        recentApplications: [],
        eligibleDrives: [],
        resumeScore: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState('dashboard');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const data = await studentService.getDashboardStats();
                setStats(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching dashboard stats:", err);
                setError("Failed to load dashboard data. Please try again.");
                setLoading(false);
                if (err.response && err.response.status === 401) {
                    navigate('/login');
                }
            }
        };

        fetchDashboardData();
    }, [navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
        // Navigate to different routes based on section
        const routes = {
            'profile': '/student/profile',
            'drives': '/student/drives',
            'applications': '/student/applications',
            'resume': '/student/resume',
            'history': '/student/history',
            'settings': '/student/settings'
        };
        if (routes[section]) {
            navigate(routes[section]);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const menuItems = [
        { id: 'dashboard', icon: '📊', label: 'Dashboard' },
        { id: 'profile', icon: '👤', label: 'My Profile' },
        { id: 'drives', icon: '🎯', label: 'Eligible Drives' },
        { id: 'applications', icon: '📝', label: 'My Applications' },
        { id: 'resume', icon: '📄', label: 'Resume Intelligence' },
        { id: 'history', icon: '📚', label: 'Placement History' },
        { id: 'settings', icon: '⚙️', label: 'Settings' }
    ];

    const StatCard = ({ title, value, icon, color, trend, subtitle }) => {
        const colorClasses = {
            indigo: 'bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-600',
            emerald: 'bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600',
            purple: 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600',
            amber: 'bg-gradient-to-br from-amber-100 to-amber-200 text-amber-600'
        };

        return (
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 ${colorClasses[color]} rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-110 transition-transform duration-500`}></div>
                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                        <div className={`text-4xl p-3 ${colorClasses[color]} rounded-xl`}>
                            {icon}
                        </div>
                        {trend && (
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
                            </span>
                        )}
                    </div>
                    <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
                    <p className={`text-3xl font-bold ${color === 'indigo' ? 'text-indigo-600' : color === 'emerald' ? 'text-emerald-600' : color === 'purple' ? 'text-purple-600' : 'text-amber-600'} mb-1`}>{value}</p>
                    {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
                </div>
            </div>
        );
    };

    const QuickActionCard = ({ icon, title, description, onClick, color }) => {
        const colorClasses = {
            indigo: 'bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 hover:shadow-indigo-200',
            purple: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-purple-200',
            emerald: 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:shadow-emerald-200',
            amber: 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 hover:shadow-amber-200'
        };

        return (
            <button
                onClick={onClick}
                className={`${colorClasses[color]} rounded-xl p-6 text-left hover:shadow-lg transition-all duration-300 border hover:scale-105 group w-full`}
            >
                <div className="text-4xl mb-3">{icon}</div>
                <h4 className="font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">{title}</h4>
                <p className="text-sm text-gray-600">{description}</p>
            </button>
        );
    };

    const DriveCard = ({ company, role, package: pkg, deadline, matchPercentage }) => (
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center text-2xl font-bold text-indigo-600">
                        {company.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900">{company}</h4>
                        <p className="text-sm text-gray-600">{role}</p>
                    </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${matchPercentage >= 80 ? 'bg-green-100 text-green-700' : matchPercentage >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}>
                    {matchPercentage}% Match
                </div>
            </div>
            <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-gray-600">💰 {pkg}</span>
                <span className="text-gray-600">📅 Deadline: {deadline}</span>
            </div>
            <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg">
                Apply Now →
            </button>
        </div>
    );

    const ApplicationStatusCard = ({ company, role, status, date }) => {
        const statusConfig = {
            'Applied': { color: 'blue', icon: '📤', bg: 'bg-blue-100', text: 'text-blue-700' },
            'Test Scheduled': { color: 'amber', icon: '📝', bg: 'bg-amber-100', text: 'text-amber-700' },
            'Interview': { color: 'purple', icon: '💼', bg: 'bg-purple-100', text: 'text-purple-700' },
            'Offer': { color: 'green', icon: '🎉', bg: 'bg-green-100', text: 'text-green-700' },
            'Rejected': { color: 'red', icon: '❌', bg: 'bg-red-100', text: 'text-red-700' }
        };
        const config = statusConfig[status] || statusConfig['Applied'];

        return (
            <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center text-lg font-bold text-indigo-600">
                            {company.charAt(0)}
                        </div>
                        <div>
                            <h5 className="font-semibold text-gray-900">{company}</h5>
                            <p className="text-xs text-gray-600">{role}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} inline-flex items-center gap-1`}>
                            <span>{config.icon}</span>
                            {status}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{date}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-72 bg-white shadow-2xl flex flex-col border-r border-gray-200">
                {/* Profile Section */}
                <div className="p-6 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-indigo-600 shadow-lg">
                            👨‍🎓
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{currentUser?.name || 'Student'}</h3>
                            <p className="text-sm text-indigo-100">{currentUser?.department || 'Computer Science'}</p>
                        </div>
                    </div>
                    {/* Profile Completion */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium">Profile Completion</span>
                            <span className="text-xs font-bold">{stats.profileCompletionPercentage || 75}%</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2">
                            <div
                                className="bg-white h-2 rounded-full transition-all duration-500"
                                style={{ width: `${stats.profileCompletionPercentage || 75}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleSectionChange(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${activeSection === item.id
                                    ? 'bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-700 shadow-md'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <span className="text-2xl">{item.icon}</span>
                            <span className="font-semibold">{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300 font-semibold"
                    >
                        <span className="text-2xl">🚪</span>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-8">
                    {/* Header */}
                    <header className="mb-8">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                            Welcome back, {currentUser?.name || 'Student'}! 👋
                        </h1>
                        <p className="text-gray-600 text-lg">Here's your placement journey overview</p>
                    </header>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="Eligible Drives"
                            value={stats.upcomingDrives || 12}
                            icon="🎯"
                            color="indigo"
                            trend={15}
                            subtitle="New this week"
                        />
                        <StatCard
                            title="Applications"
                            value={stats.applicationsApplied || 8}
                            icon="📝"
                            color="emerald"
                            trend={25}
                            subtitle="Submitted"
                        />
                        <StatCard
                            title="Interviews"
                            value={stats.interviewsScheduled || 3}
                            icon="💼"
                            color="purple"
                            subtitle="Scheduled"
                        />
                        <StatCard
                            title="Offers"
                            value={stats.offersReceived || 1}
                            icon="🎉"
                            color="amber"
                            trend={100}
                            subtitle="Received"
                        />
                    </div>

                    {/* Quick Actions */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <QuickActionCard
                                icon="📄"
                                title="Upload Resume"
                                description="Update your latest resume"
                                onClick={() => handleSectionChange('resume')}
                                color="indigo"
                            />
                            <QuickActionCard
                                icon="🎯"
                                title="View Drives"
                                description="Browse eligible opportunities"
                                onClick={() => handleSectionChange('drives')}
                                color="purple"
                            />
                            <QuickActionCard
                                icon="📊"
                                title="Track Status"
                                description="Check application progress"
                                onClick={() => handleSectionChange('applications')}
                                color="emerald"
                            />
                            <QuickActionCard
                                icon="✏️"
                                title="Update Profile"
                                description="Complete your profile"
                                onClick={() => handleSectionChange('profile')}
                                color="amber"
                            />
                        </div>
                    </section>

                    {/* Eligible Drives Preview */}
                    <section className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Eligible Drives</h2>
                            <button
                                onClick={() => handleSectionChange('drives')}
                                className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                            >
                                View All →
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <DriveCard
                                company="Google"
                                role="Software Engineer"
                                package="₹25-30 LPA"
                                deadline="15 Feb 2026"
                                matchPercentage={95}
                            />
                            <DriveCard
                                company="Microsoft"
                                role="SDE Intern"
                                package="₹1L/month"
                                deadline="20 Feb 2026"
                                matchPercentage={88}
                            />
                            <DriveCard
                                company="Amazon"
                                role="Backend Developer"
                                package="₹20-25 LPA"
                                deadline="25 Feb 2026"
                                matchPercentage={82}
                            />
                        </div>
                    </section>

                    {/* Application Status Tracker */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Applications</h2>
                        <div className="space-y-3">
                            <ApplicationStatusCard
                                company="Google"
                                role="Software Engineer"
                                status="Interview"
                                date="2 days ago"
                            />
                            <ApplicationStatusCard
                                company="Microsoft"
                                role="SDE Intern"
                                status="Test Scheduled"
                                date="5 days ago"
                            />
                            <ApplicationStatusCard
                                company="Amazon"
                                role="Backend Developer"
                                status="Applied"
                                date="1 week ago"
                            />
                        </div>
                    </section>

                    {/* Resume Intelligence Widget */}
                    <section className="mb-8">
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200 shadow-lg">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Resume Intelligence</h2>
                                    <p className="text-gray-600">AI-powered insights to improve your profile</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                                        {stats.resumeScore || 85}%
                                    </div>
                                    <p className="text-xs text-gray-600 mt-2">Match Score</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <div className="text-2xl mb-2">💡</div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Skill Gaps</h4>
                                    <p className="text-sm text-gray-600">Add React, Node.js</p>
                                </div>
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <div className="text-2xl mb-2">📈</div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Improvements</h4>
                                    <p className="text-sm text-gray-600">Update projects section</p>
                                </div>
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <div className="text-2xl mb-2">🎯</div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Recommendations</h4>
                                    <p className="text-sm text-gray-600">Add certifications</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;
