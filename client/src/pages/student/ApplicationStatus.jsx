import React, { useEffect, useState } from 'react';
import studentService from '../../services/studentService';

const ApplicationStatus = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApps = async () => {
            const data = await studentService.getApplications();
            setApplications(data);
        };
        fetchApps();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Application Status</h2>
            <div className="bg-white rounded shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="p-4">Company</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app, index) => (
                            <tr key={index} className="border-b">
                                <td className="p-4">{app.company}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-sm ${app.status === 'Shortlisted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {app.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApplicationStatus;
