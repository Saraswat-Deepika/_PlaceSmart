import axios from 'axios';

const API_URL = 'http://localhost:5000/api/student';

// Helper to get auth header
const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
};

const studentService = {
    async getProfile() {
        const response = await axios.get(`${API_URL}/profile`, { headers: getAuthHeader() });
        return response.data;
    },

    async updateProfile(profileData) {
        const response = await axios.put(`${API_URL}/profile`, profileData, { headers: getAuthHeader() });
        return response.data;
    },

    async getDashboardStats() {
        const response = await axios.get(`${API_URL}/dashboard-stats`, { headers: getAuthHeader() });
        return response.data;
    },

    async getApplications() {
        const response = await axios.get(`${API_URL}/applications`, { headers: getAuthHeader() });
        return response.data;
    },

    async getEligibleDrives() {
        const response = await axios.get(`${API_URL}/drives`, { headers: getAuthHeader() });
        return response.data;
    },

    async applyForDrive(driveId) {
        const response = await axios.post(`${API_URL}/apply/${driveId}`, {}, { headers: getAuthHeader() });
        return response.data;
    }
};

export default studentService;
