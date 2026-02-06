import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentSidebar from '../../components/StudentSidebar';

const PlacementHistory = () => {
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();

    const mockHistory = {
        finalPlacement: {
            company: 'Adobe',
            role: 'UI/UX Developer',
            package: '₹22-28 LPA',
            joiningDate: '2026-07-01',
            location: 'Noida',
            offerLetter: '/offers/adobe-offer.pdf'
        },
        pastApplications: [
            {
                id: 1,
                company: 'Google',
                role: 'Software Engineer',
                appliedDate: '2026-01-28',
                status: 'Interview',
                finalStatus: 'Rejected after final round',
                package: '₹25-30 LPA'
            },
            {
                id: 2,
                company: 'Microsoft',
                role: 'SDE Intern',
                appliedDate: '2026-01-23',
                status: 'Test Scheduled',
                finalStatus: 'Did not clear assessment',
                package: '₹1L/month'
            },
            {
                id: 3,
                company: 'Amazon',
                role: 'Backend Developer',
                appliedDate: '2026-01-20',
                status: 'Applied',
                finalStatus: 'Application withdrawn',
                package: '₹20-25 LPA'
            },
            {
                id: 4,
                company: 'Flipkart',
                role: 'Full Stack Developer',
                appliedDate: '2026-01-15',
                status: 'Rejected',
                finalStatus: 'Did not meet requirements',
                package: '₹18-22 LPA'
            },
            {
                id: 5,
                company: 'Adobe',
                role: 'UI/UX Developer',
                appliedDate: '2026-02-01',
                status: 'Offer',
                finalStatus: 'Offer Accepted',
                package: '₹22-28 LPA'
            }
        ],
        statistics: {
            totalApplications: 5,
            offersReceived: 1,
            interviewsAttended: 3,
            successRate: 20
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
            <StudentSidebar />
            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Placement History</h1>
                        <p className="text-gray-600 text-lg">Your complete placement journey and final outcome</p>
                    </div>

                    {/* Final Placement Card */}
                    {mockHistory.finalPlacement && (
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-green-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="text-5xl">🎉</div>
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900">Final Placement</h2>
                                    <p className="text-green-700 font-medium">Congratulations on your placement!</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl p-6 shadow-md">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center text-3xl font-bold text-indigo-600">
                                            {mockHistory.finalPlacement.company.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-2xl text-gray-900">{mockHistory.finalPlacement.company}</h3>
                                            <p className="text-gray-600">{mockHistory.finalPlacement.role}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <span>💰</span>
                                            <span className="font-semibold">{mockHistory.finalPlacement.package}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <span>📍</span>
                                            <span>{mockHistory.finalPlacement.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <span>📅</span>
                                            <span>Joining: {new Date(mockHistory.finalPlacement.joiningDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-6 shadow-md flex flex-col justify-center">
                                    <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg mb-3">
                                        📄 Download Offer Letter
                                    </button>
                                    <button className="w-full border-2 border-indigo-600 text-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
                                        📋 View Joining Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="text-3xl mb-2">📊</div>
                            <div className="text-3xl font-bold text-gray-900">{mockHistory.statistics.totalApplications}</div>
                            <div className="text-sm text-gray-600">Total Applications</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="text-3xl mb-2">🎉</div>
                            <div className="text-3xl font-bold text-green-600">{mockHistory.statistics.offersReceived}</div>
                            <div className="text-sm text-gray-600">Offers Received</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="text-3xl mb-2">💼</div>
                            <div className="text-3xl font-bold text-purple-600">{mockHistory.statistics.interviewsAttended}</div>
                            <div className="text-sm text-gray-600">Interviews Attended</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="text-3xl mb-2">📈</div>
                            <div className="text-3xl font-bold text-indigo-600">{mockHistory.statistics.successRate}%</div>
                            <div className="text-sm text-gray-600">Success Rate</div>
                        </div>
                    </div>

                    {/* Past Applications */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Timeline</h2>
                        <div className="space-y-4">
                            {mockHistory.pastApplications.map((app, index) => (
                                <div key={app.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center text-xl font-bold text-indigo-600">
                                        {app.company.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900">{app.company}</h3>
                                                <p className="text-gray-600">{app.role}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${app.status === 'Offer' ? 'bg-green-100 text-green-700' :
                                                app.status === 'Interview' ? 'bg-purple-100 text-purple-700' :
                                                    app.status === 'Test Scheduled' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {app.finalStatus}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <span>💰 {app.package}</span>
                                            <span>📅 Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PlacementHistory;
