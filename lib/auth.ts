// Authentication types and utilities
export interface User {
    id: string;
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

// Mock user database (in real app, this would be API calls)
const mockUsers: User[] = [
    {
        id: "1",
        name: "Ahmed Mohamed",
        email: "ahmed.m@example.com",
        phone: "+252 61 555 0123",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
        createdAt: "2023-10-01"
    },
    {
        id: "2", 
        name: "Fatima Ali",
        email: "fatima.a@example.com",
        phone: "+252 61 555 0456",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&q=80&w=400",
        createdAt: "2023-10-15"
    }
];

// Mock passwords (in real app, these would be hashed)
const mockPasswords: Record<string, string> = {
    "ahmed.m@example.com": "password123",
    "fatima.a@example.com": "password456"
};

// Authentication functions
export async function login(credentials: LoginCredentials): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === credentials.email);
    const password = mockPasswords[credentials.email];
    
    if (!user || password !== credentials.password) {
        throw new Error("Invalid email or password");
    }
    
    return user;
}

export async function signup(credentials: SignupCredentials): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === credentials.email);
    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    
    // Create new user
    const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        name: credentials.name,
        email: credentials.email,
        phone: credentials.phone,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(credentials.name)}&background=random`,
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    // Add to mock database
    mockUsers.push(newUser);
    mockPasswords[credentials.email] = credentials.password;
    
    return newUser;
}

export async function logout(): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // In real app, this would clear server-side session
}

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePassword(password: string): { isValid: boolean; message?: string } {
    if (password.length < 6) {
        return { isValid: false, message: "Password must be at least 6 characters" };
    }
    return { isValid: true };
}

export function validatePhone(phone: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
}
