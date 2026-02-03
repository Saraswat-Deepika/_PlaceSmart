import React, { useEffect, useState } from 'react';
import studentService from '../../services/studentService';

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await studentService.getProfile();
            setProfile(data);
        };
        fetchProfile();
    }, []);

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            <div className="bg-white p-6 rounded shadow max-w-md">
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Branch:</strong> {profile.branch}</p>
                <p><strong>CGPA:</strong> {profile.cgpa}</p>
            </div>
        </div>
    );
};

export default Profile;
