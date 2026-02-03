import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome to PlaceSmart</h1>
            <p className="text-xl mb-8">Streamlining Campus Placements for Everyone</p>
            <div className="space-x-4">
                <Link to="/login" className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition">Login</Link>
                <Link to="/signup" className="border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-blue-600 transition">Sign Up</Link>
            </div>
        </div>
    );
};

export default Landing;
