import React from 'react';

const ApplyPlacement = () => {
    const drives = [
        { id: 1, company: 'Google', role: 'SDE', package: '30 LPA' },
        { id: 2, company: 'Amazon', role: 'SDE 1', package: '25 LPA' },
    ];

    const handleApply = (id) => {
        console.log(`Applying for drive ${id}`);
        // Call service
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Open Drives</h2>
            <div className="grid gap-4">
                {drives.map(drive => (
                    <div key={drive.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                        <div>
                            <h3 className="font-bold">{drive.company}</h3>
                            <p>{drive.role} - {drive.package}</p>
                        </div>
                        <button onClick={() => handleApply(drive.id)} className="bg-blue-600 text-white px-4 py-2 rounded">
                            Apply
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApplyPlacement;
