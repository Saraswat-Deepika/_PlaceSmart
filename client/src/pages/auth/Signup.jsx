import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student' // default
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/signup', formData);
            navigate('/login');
        } catch (error) {
            console.error('Signup failed:', error);
            alert('Signup failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input name="name" type="text" className="w-full p-2 border rounded" onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input name="email" type="email" className="w-full p-2 border rounded" onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input name="password" type="password" className="w-full p-2 border rounded" onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Role</label>
                    <select name="role" className="w-full p-2 border rounded" onChange={handleChange}>
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
