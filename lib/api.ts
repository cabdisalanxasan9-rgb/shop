import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            Cookies.remove('token');
            Cookies.remove('user');
            window.location.href = '/auth/secure-login';
        }
        return Promise.reject(error);
    }
);

// Auth API functions
export const authAPI = {
    register: async (userData: { name: string; email: string; password: string; phone?: string }) => {
        try {
            const response = await api.post('/auth/register', userData);
            
            // Store token and user data
            const { token, user } = response.data;
            const isDevelopment = process.env.NODE_ENV === 'development';
            Cookies.set('token', token, { 
                expires: 7, 
                secure: !isDevelopment, 
                sameSite: isDevelopment ? 'lax' : 'strict' 
            });
            Cookies.set('user', JSON.stringify(user), { 
                expires: 7, 
                secure: !isDevelopment, 
                sameSite: isDevelopment ? 'lax' : 'strict' 
            });
            
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Registration failed' };
        }
    },

    login: async (credentials: { email: string; password: string }) => {
        try {
            const response = await api.post('/auth/login', credentials);
            
            // Store token and user data
            const { token, user } = response.data;
            const isDevelopment = process.env.NODE_ENV === 'development';
            Cookies.set('token', token, { 
                expires: 7, 
                secure: !isDevelopment, 
                sameSite: isDevelopment ? 'lax' : 'strict' 
            });
            Cookies.set('user', JSON.stringify(user), { 
                expires: 7, 
                secure: !isDevelopment, 
                sameSite: isDevelopment ? 'lax' : 'strict' 
            });
            
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Login failed' };
        }
    },

    logout: async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Always remove cookies on logout
            Cookies.remove('token');
            Cookies.remove('user');
        }
    },

    getCurrentUser: async () => {
        try {
            const response = await api.get('/auth/me');
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Failed to get user data' };
        }
    },

    isAuthenticated: () => {
        return !!Cookies.get('token');
    },

    getUser: () => {
        const userCookie = Cookies.get('user');
        return userCookie ? JSON.parse(userCookie) : null;
    },

    getToken: () => {
        return Cookies.get('token');
    }
};

export default api;
