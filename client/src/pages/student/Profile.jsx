import React, { useEffect, useState } from 'react';
import studentService from '../../services/studentService';

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        branch: '',
        cgpa: '',
        backlogs: 0,
        phone: '',
        gitHubLink: '',
        linkedInLink: '',
        resume: '',
        skills: ''
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const data = await studentService.getProfile();
            setFormData({
                branch: data.branch || '',
                cgpa: data.cgpa || '',
                backlogs: data.backlogs || 0,
                phone: data.phone || '',
                gitHubLink: data.gitHubLink || '',
                linkedInLink: data.linkedInLink || '',
                resume: data.resume || '',
                skills: data.skills ? data.skills.join(', ') : ''
            });
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            // Convert skills string back to array
            const profileToUpdate = {
                ...formData,
                skills: formData.skills.split(',').map(skill => skill.trim()).filter(s => s)
            };

            await studentService.updateProfile(profileToUpdate);
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error(error);
            setMessage('Failed to update profile.');
        }
    };

    if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

            {message && (
                <div className={`p-4 mb-6 rounded-md ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message}
                </div>
            )}

            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                <div className="bg-indigo-600 px-6 py-4">
                    <h2 className="text-xl font-semibold text-white">Personal & Academic Details</h2>
                    <p className="text-indigo-100 text-sm">Keep your profile updated to see eligible drives.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Contact Information</h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-shadow"
                                    placeholder="+91 9876543210"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                                <input
                                    type="text"
                                    name="linkedInLink"
                                    value={formData.linkedInLink}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-shadow"
                                    placeholder="https://linkedin.com/in/username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Profile</label>
                                <input
                                    type="text"
                                    name="gitHubLink"
                                    value={formData.gitHubLink}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-shadow"
                                    placeholder="https://github.com/username"
                                />
                            </div>
                        </div>

                        {/* Academic Info */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Academic Details</h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                                <select
                                    name="branch"
                                    value={formData.branch}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-shadow bg-white"
                                >
                                    <option value="">Select Branch</option>
                                    <option value="CSE">Computer Science (CSE)</option>
                                    <option value="ECE">Electronics (ECE)</option>
                                    <option value="ME">Mechanical</option>
                                    <option value="CE">Civil</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">CGPA</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="cgpa"
                                        value={formData.cgpa}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-shadow"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Backlogs</label>
                                    <input
                                        type="number"
                                        name="backlogs"
                                        value={formData.backlogs}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-shadow"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resume & Skills */}
                    <div className="space-y-6 border-t pt-6">
                        <h3 className="text-lg font-medium text-gray-900">Resume & Skills</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                            <input
                                type="text"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-shadow"
                                placeholder="React, Python, Java..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Resume Link (Google Drive/Dropbox)</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="resume"
                                    value={formData.resume}
                                    onChange={handleChange}
                                    className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-shadow"
                                    placeholder="https://drive.google.com/file/d/..."
                                />
                                {formData.resume && (
                                    <a
                                        href={formData.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
                                    >
                                        Views
                                    </a>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Make sure the link is accessible to public/recruiters.</p>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition-all transform hover:-translate-y-0.5"
                        >
                            Save Profile Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
