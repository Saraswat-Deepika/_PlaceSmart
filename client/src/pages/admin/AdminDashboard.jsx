import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const AdminDashboard = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 overflow-y-auto p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                    <p className="text-gray-600">Overview of placement activities</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Students</p>
                                <h3 className="text-3xl font-bold text-gray-800 mt-2">120</h3>
                            </div>
                            <span className="bg-blue-100 text-blue-600 p-2 rounded-lg text-xl">👥</span>
                        </div>
                        <p className="text-green-500 text-sm mt-4 flex items-center">
                            <span className="mr-1">↑</span> 12% increase
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Active Drives</p>
                                <h3 className="text-3xl font-bold text-gray-800 mt-2">5</h3>
                            </div>
                            <span className="bg-purple-100 text-purple-600 p-2 rounded-lg text-xl">🏢</span>
                        </div>
                        <p className="text-gray-400 text-sm mt-4">2 closing soon</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Placed Students</p>
                                <h3 className="text-3xl font-bold text-gray-800 mt-2">45</h3>
                            </div>
                            <span className="bg-green-100 text-green-600 p-2 rounded-lg text-xl">🎓</span>
                        </div>
                        <p className="text-green-500 text-sm mt-4">38% placement rate</p>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Placement Activities</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                        T
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">TechCorp Drive Completed</h4>
                                        <p className="text-sm text-gray-500">2 hours ago</p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">View Details →</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
