import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

const createDrive = async (driveData) => {
    // const response = await axios.post(`${API_URL}/drives`, driveData);
    // return response.data;
    return { success: true, message: 'Drive created' };
};

const getStudents = async () => {
    // const response = await axios.get(`${API_URL}/students`);
    // return response.data;
    return [{ id: 1, name: 'John Doe', cgpa: 8.5 }, { id: 2, name: 'Jane Smith', cgpa: 9.0 }];
};

const shortlistStudent = async (studentId, driveId) => {
    // const response = await axios.post(`${API_URL}/shortlist`, { studentId, driveId });
    // return response.data;
    return { success: true, message: 'Student shortlisted' };
};

const adminService = {
    createDrive,
    getStudents,
    shortlistStudent
};

export default adminService;
