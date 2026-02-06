import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentSidebar from '../../components/StudentSidebar';

const ResumeIntelligence = () => {
    const [resumeFile, setResumeFile] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const navigate = useNavigate();

    const mockAnalysis = {
        score: 85,
        strengths: [
            'Strong technical skills in React and Node.js',
            'Good project descriptions with measurable impact',
            'Clear and concise formatting',
            'Relevant internship experience'
        ],
        weaknesses: [
            'Missing certifications section',
            'Could add more quantifiable achievements',
            'Limited leadership experience mentioned',
            'No links to GitHub or portfolio'
        ],
        skillGaps: ['Docker', 'Kubernetes', 'AWS', 'System Design'],
        recommendations: [
            'Add a certifications section with relevant courses',
            'Include GitHub profile link',
            'Quantify achievements with numbers and percentages',
            'Add leadership roles or team projects',
            'Consider adding a portfolio website link'
        ],
        matchedJobs: [
            { company: 'Google', role: 'Software Engineer', match: 95 },
            { company: 'Microsoft', role: 'SDE Intern', match: 88 },
            { company: 'Amazon', role: 'Backend Developer', match: 82 }
        ]
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setResumeFile(file);
            setAnalyzing(true);
            // Simulate analysis
            setTimeout(() => {
                setAnalysis(mockAnalysis);
                setAnalyzing(false);
            }, 2000);
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
            <StudentSidebar />
            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Resume Intelligence</h1>
                        <p className="text-gray-600 text-lg">AI-powered insights to improve your resume and profile</p>
                    </div>

                    {/* Upload Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Your Resume</h2>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-indigo-400 transition-colors">
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileUpload}
                                className="hidden"
                                id="resume-upload"
                            />
                            <label htmlFor="resume-upload" className="cursor-pointer">
                                <div className="text-6xl mb-4">📄</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {resumeFile ? resumeFile.name : 'Click to upload your resume'}
                                </h3>
                                <p className="text-gray-600">Supports PDF, DOC, DOCX (Max 5MB)</p>
                            </label>
                        </div>
                    </div>

                    {analyzing && (
                        <div className="bg-white rounded-2xl shadow-lg p-12 text-center mb-8">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
                            <p className="text-gray-600 font-medium">Analyzing your resume...</p>
                        </div>
                    )}

                    {analysis && !analyzing && (
                        <>
                            {/* Score Card */}
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8 mb-8 border border-amber-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Resume Score</h2>
                                        <p className="text-gray-600">Based on industry standards and job requirements</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-4xl shadow-xl">
                                            {analysis.score}%
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2 font-medium">
                                            {analysis.score >= 80 ? 'Excellent' : analysis.score >= 60 ? 'Good' : 'Needs Improvement'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                {/* Strengths */}
                                <div className="bg-white rounded-2xl shadow-lg p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="text-4xl">✅</div>
                                        <h3 className="text-2xl font-bold text-gray-900">Strengths</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {analysis.strengths.map((strength, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <span className="text-green-500 mt-1">●</span>
                                                <span className="text-gray-700">{strength}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Weaknesses */}
                                <div className="bg-white rounded-2xl shadow-lg p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="text-4xl">⚠️</div>
                                        <h3 className="text-2xl font-bold text-gray-900">Areas to Improve</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {analysis.weaknesses.map((weakness, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <span className="text-amber-500 mt-1">●</span>
                                                <span className="text-gray-700">{weakness}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Skill Gaps */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="text-4xl">💡</div>
                                    <h3 className="text-2xl font-bold text-gray-900">Skill Gaps</h3>
                                </div>
                                <p className="text-gray-600 mb-4">Skills that would improve your job match percentage:</p>
                                <div className="flex flex-wrap gap-3">
                                    {analysis.skillGaps.map((skill, index) => (
                                        <span key={index} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Recommendations */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="text-4xl">🎯</div>
                                    <h3 className="text-2xl font-bold text-gray-900">Recommendations</h3>
                                </div>
                                <ul className="space-y-4">
                                    {analysis.recommendations.map((rec, index) => (
                                        <li key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                            <span className="text-indigo-600 font-bold">{index + 1}.</span>
                                            <span className="text-gray-700">{rec}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Job Matches */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="text-4xl">🎯</div>
                                    <h3 className="text-2xl font-bold text-gray-900">Top Job Matches</h3>
                                </div>
                                <div className="space-y-4">
                                    {analysis.matchedJobs.map((job, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center text-xl font-bold text-indigo-600">
                                                    {job.company.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900">{job.company}</h4>
                                                    <p className="text-sm text-gray-600">{job.role}</p>
                                                </div>
                                            </div>
                                            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${job.match >= 80 ? 'bg-green-100 text-green-700' :
                                                job.match >= 60 ? 'bg-amber-100 text-amber-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                {job.match}% Match
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {!analysis && !analyzing && (
                        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                            <div className="text-6xl mb-4">📊</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Upload your resume to get started</h3>
                            <p className="text-gray-600">Get AI-powered insights and recommendations to improve your profile</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ResumeIntelligence;
