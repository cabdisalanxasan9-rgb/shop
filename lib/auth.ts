// Authentication types
export interface User {
    id: string;
    _id?: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    createdAt: string;
}

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials {
    name: string;
    email: string;
    password: string;
    phone?: string;
}

// Get backend URL from environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Normalize user object (_id → id)
function normalizeUser(user: any): User {
    return {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        avatar: user.avatar || '',
        createdAt: user.createdAt || new Date().toISOString(),
    };
}

// Save token to localStorage
function saveToken(token: string) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', token);
    }
}

// Get token from localStorage
export function getToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('auth_token');
    }
    return null;
}

// Remove token from localStorage
export function removeToken() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
    }
}

// Login
export async function login(credentials: LoginCredentials): Promise<User> {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || 'Login failed');
    }

    saveToken(data.token);
    return normalizeUser(data.user);
}

// Signup
export async function signup(credentials: SignupCredentials): Promise<User> {
    const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
    }

    saveToken(data.token);
    return normalizeUser(data.user);
}

// Logout
export async function logout(): Promise<void> {
    const token = getToken();

    if (token) {
        try {
            await fetch(`${API_URL}/api/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
        } catch {
            // Even if server fails, clear local data
        }
    }

    removeToken();
}

// Validate email format
export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate password
export function validatePassword(password: string): { isValid: boolean; message?: string } {
    if (password.length < 6) {
        return { isValid: false, message: 'Password must be at least 6 characters' };
    }
    return { isValid: true };
}

// Validate phone
export function validatePhone(phone: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
}
