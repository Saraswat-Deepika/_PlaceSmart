import React, { useState } from 'react';

const CreateDrive = () => {
    const [form, setForm] = useState({ company: '', role: '', package: '', date: '' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Drive Created', form);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Create New Drive</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-lg">
                <div className="mb-4"><label className="block mb-1">Company Name</label><input name="company" onChange={handleChange} className="w-full border p-2 rounded" required /></div>
                <div className="mb-4"><label className="block mb-1">Job Role</label><input name="role" onChange={handleChange} className="w-full border p-2 rounded" required /></div>
                <div className="mb-4"><label className="block mb-1">Package (LPA)</label><input name="package" onChange={handleChange} className="w-full border p-2 rounded" required /></div>
                <div className="mb-4"><label className="block mb-1">Date</label><input type="date" name="date" onChange={handleChange} className="w-full border p-2 rounded" required /></div>
                <button className="bg-green-600 text-white px-4 py-2 rounded">Create Drive</button>
            </form>
        </div>
    );
};

export default CreateDrive;
