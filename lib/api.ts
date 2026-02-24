import axios from 'axios';
import Cookies from 'js-cookie';

// Uses Next.js built-in API routes — works on local AND live deployment
const API_BASE_URL = '/api';

const normalizeApiError = (error: any, fallback: string) => {
    if (!error.response) {
        return { error: 'Cannot reach authentication server. Check NEXT_PUBLIC_API_URL and backend deployment.' };
    }

    const status = error.response.status;
    const data = error.response.data;

    if (status === 404) {
        return { error: 'Auth API endpoint not found. Deploy backend and verify NEXT_PUBLIC_API_URL.' };
    }

    if (typeof data === 'string') {
        return { error: data || fallback };
    }

    if (data?.error) {
        return { error: data.error };
    }

    return { error: fallback };
};

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
        } catch (error: any) {
            throw normalizeApiError(error, 'Registration failed');
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
        } catch (error: any) {
            throw normalizeApiError(error, 'Login failed');
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
