import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => {
    return (
        <div className="w-64 h-full bg-gray-800 text-white p-4">
            <h2 className="text-lg font-bold mb-4">Menu</h2>
            <ul className="space-y-2">
                {role === 'student' && (
                    <>
                        <li><Link to="/student" className="block hover:bg-gray-700 p-2 rounded">Dashboard</Link></li>
                        <li><Link to="/student/profile" className="block hover:bg-gray-700 p-2 rounded">Profile</Link></li>
                        <li><Link to="/student/apply" className="block hover:bg-gray-700 p-2 rounded">Apply for Drive</Link></li>
                        <li><Link to="/student/status" className="block hover:bg-gray-700 p-2 rounded">Application Status</Link></li>
                    </>
                )}
                {role === 'admin' && (
                    <>
                        <li><Link to="/admin" className="block hover:bg-gray-700 p-2 rounded">Dashboard</Link></li>
                        <li><Link to="/admin/create-drive" className="block hover:bg-gray-700 p-2 rounded">Create Drive</Link></li>
                        <li><Link to="/admin/students" className="block hover:bg-gray-700 p-2 rounded">Manage Students</Link></li>
                        <li><Link to="/admin/shortlist" className="block hover:bg-gray-700 p-2 rounded">Shortlist</Link></li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;
