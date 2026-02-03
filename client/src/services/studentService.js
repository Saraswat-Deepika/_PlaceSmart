import axios from 'axios';

const API_URL = 'http://localhost:5000/api/student';

const getProfile = async () => {
    // const response = await axios.get(`${API_URL}/profile`);
    // return response.data;
    return { name: 'John Doe', branch: 'CSE', cgpa: 8.5 }; // Mock data
};

const applyForDrive = async (driveId) => {
    // const response = await axios.post(`${API_URL}/apply/${driveId}`);
    // return response.data;
    return { success: true, message: 'Applied successfully' };
};

const getApplications = async () => {
    // const response = await axios.get(`${API_URL}/applications`);
    // return response.data;
    return [{ company: 'Google', status: 'Applied' }, { company: 'Microsoft', status: 'Shortlisted' }];
};

const studentService = {
    getProfile,
    applyForDrive,
    getApplications
};

export default studentService;
