import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const status = error.response?.status;

        if (status === 401) {
            console.error('Unauthorized - Redirecting to login...');
        } else if (status === 500) {
            console.error('Internal server error - Try again later.');
        }

        return Promise.reject(error);
    }
);

export default apiClient;
