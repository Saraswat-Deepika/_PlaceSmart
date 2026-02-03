import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Total Students</h2>
                    <p className="text-gray-600">120 registered</p>
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Active Drives</h2>
                    <p className="text-gray-600">2 active</p>
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Placements</h2>
                    <p className="text-gray-600">45 placed</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
