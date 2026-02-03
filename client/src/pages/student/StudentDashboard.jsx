import React from 'react';

const StudentDashboard = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Upcoming Drives</h2>
                    <p className="text-gray-600">3 new drives available</p>
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Applications Applied</h2>
                    <p className="text-gray-600">5 applications</p>
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Profile Status</h2>
                    <p className="text-green-600">Complete</p>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
