import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const AdminApplications = () => {
    // Mock data
    const [applications] = useState([
        { id: 1, student: 'John Doe', company: 'Google', role: 'SDE-1', date: '2024-03-01', status: 'Pending' },
        { id: 2, student: 'Jane Smith', company: 'Microsoft', role: 'Software Engineer', date: '2024-03-02', status: 'Shortlisted' },
        { id: 3, student: 'Mike Johnson', company: 'TCS', role: 'System Engineer', date: '2024-03-05', status: 'Rejected' },
    ]);

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 overflow-y-auto p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Applications</h1>
                    <p className="text-gray-600">Track and manage student applications</p>
                </header>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex gap-4">
                        <input
                            type="text"
                            placeholder="Search applications..."
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Student</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Company</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Role</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Applied Date</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {applications.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-gray-800">{app.student}</td>
                                    <td className="px-6 py-4 text-gray-600">{app.company}</td>
                                    <td className="px-6 py-4 text-gray-600">{app.role}</td>
                                    <td className="px-6 py-4 text-gray-600">{app.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${app.status === 'Shortlisted' ? 'bg-green-100 text-green-700' :
                                                app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-indigo-600 hover:text-indigo-800 mr-2 text-sm font-medium">Review</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminApplications;
