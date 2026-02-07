import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSectionChange = (section) => {
        const routes = {
            'dashboard': '/admin/dashboard',
            'students': '/admin/students',
            'drives': '/admin/drives',
            'applications': '/admin/applications',
            'settings': '/admin/settings'
        };
        if (routes[section]) {
            navigate(routes[section]);
        }
    };

    const menuItems = [
        { id: 'dashboard', icon: '📊', label: 'Dashboard', path: '/admin/dashboard' },
        { id: 'students', icon: '👨‍🎓', label: 'Manage Students', path: '/admin/students' },
        { id: 'drives', icon: '🏢', label: 'Manage Drives', path: '/admin/drives' },
        { id: 'applications', icon: '📝', label: 'Applications', path: '/admin/applications' },
        { id: 'settings', icon: '⚙️', label: 'Settings', path: '/admin/settings' }
    ];

    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (
        <aside className="w-72 bg-white shadow-2xl flex flex-col border-r border-gray-200 min-h-screen">
            {/* Admin Profile Section */}
            <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-gray-800 shadow-lg">
                        🛡️
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">{currentUser?.name || 'Admin'}</h3>
                        <p className="text-sm text-gray-400">Administrator</p>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-4 overflow-y-auto">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleSectionChange(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${isActive(item.path)
                                ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-md'
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

export default AdminSidebar;
