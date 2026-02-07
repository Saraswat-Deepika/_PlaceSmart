import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';

const ManageDrives = () => {
    const navigate = useNavigate();
    // Mock data
    const [drives] = useState([
        { id: 1, company: 'Google', role: 'SDE-1', package: '24 LPA', date: '2024-03-15', status: 'Active' },
        { id: 2, company: 'Microsoft', role: 'Software Engineer', package: '20 LPA', date: '2024-03-20', status: 'Upcoming' },
        { id: 3, company: 'TCS', role: 'System Engineer', package: '7 LPA', date: '2024-03-10', status: 'Closed' },
    ]);

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 overflow-y-auto p-8">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Manage Drives</h1>
                        <p className="text-gray-600">Create and manage placement drives</p>
                    </div>
                    <button
                        onClick={() => navigate('/admin/create-drive')}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                    >
                        <span>+</span> Create Drive
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {drives.map((drive) => (
                        <div key={drive.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-600 text-xl">
                                    {drive.company[0]}
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${drive.status === 'Active' ? 'bg-green-100 text-green-700' :
                                        drive.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' :
                                            'bg-gray-100 text-gray-600'
                                    }`}>
                                    {drive.status}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{drive.company}</h3>
                            <p className="text-gray-600 font-medium mb-4">{drive.role}</p>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center text-sm text-gray-500">
                                    <span className="w-6">💰</span> {drive.package}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <span className="w-6">📅</span> {drive.date}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="flex-1 py-2 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition text-sm font-semibold">
                                    Edit
                                </button>
                                <button className="flex-1 py-2 text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-sm font-semibold">
                                    View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageDrives;
