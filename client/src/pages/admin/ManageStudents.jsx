import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const ManageStudents = () => {
    // Mock data
    const [students] = useState([
        { id: 1, name: 'John Doe', department: 'Computer Science', email: 'john@example.com', status: 'Placed' },
        { id: 2, name: 'Jane Smith', department: 'Electronics', email: 'jane@example.com', status: 'Active' },
        { id: 3, name: 'Mike Johnson', department: 'Mechanical', email: 'mike@example.com', status: 'Active' },
    ]);

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 overflow-y-auto p-8">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Manage Students</h1>
                        <p className="text-gray-600">View and manage registered students</p>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                        Add Student
                    </button>
                </header>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex gap-4">
                        <input
                            type="text"
                            placeholder="Search students..."
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="">All Departments</option>
                            <option value="cs">Computer Science</option>
                            <option value="ee">Electronics</option>
                            <option value="me">Mechanical</option>
                        </select>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Department</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Email</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {students.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-gray-800">{student.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{student.department}</td>
                                    <td className="px-6 py-4 text-gray-600">{student.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${student.status === 'Placed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-gray-400 hover:text-indigo-600 mr-2">Edit</button>
                                        <button className="text-gray-400 hover:text-red-600">Delete</button>
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

export default ManageStudents;
