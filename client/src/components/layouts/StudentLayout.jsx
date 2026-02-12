import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentSidebar from '../StudentSidebar';

const StudentLayout = () => {
    return (
        <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
            <StudentSidebar />
            <div className="flex-1 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default StudentLayout;
