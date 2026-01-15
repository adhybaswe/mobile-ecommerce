import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        // Token will be added here if needed
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Server responded with error status
        } else if (error.request) {
            // Request made but no response
        } else {
            // Something else happened
        }
        return Promise.reject(error);
    }
);
