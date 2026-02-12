import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const StudentSidebar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSectionChange = (section) => {
        const routes = {
            'dashboard': '/student/dashboard',
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

    const menuItems = [
        { id: 'dashboard', icon: '📊', label: 'Dashboard', path: '/student/dashboard' },
        { id: 'profile', icon: '👤', label: 'My Profile', path: '/student/profile' },
        { id: 'drives', icon: '🎯', label: 'Eligible Drives', path: '/student/drives' },
        { id: 'applications', icon: '📝', label: 'My Applications', path: '/student/applications' },
        { id: 'resume', icon: '📄', label: 'Resume Intelligence', path: '/student/resume' },
        { id: 'history', icon: '📚', label: 'Placement History', path: '/student/history' },
        { id: 'settings', icon: '⚙️', label: 'Settings', path: '/student/settings' }
    ];

    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (
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
                        <span className="text-xs font-bold">75%</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2">
                        <div
                            className="bg-white h-2 rounded-full transition-all duration-500"
                            style={{ width: '75%' }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-4 overflow-y-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 text-gray-600 hover:bg-gray-100 transition-all duration-300"
                >
                    <span className="text-2xl">⬅️</span>
                    <span className="font-semibold">Back</span>
                </button>

                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleSectionChange(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${isActive(item.path)
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
    );
};

export default StudentSidebar;
