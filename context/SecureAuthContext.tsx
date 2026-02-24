"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '@/lib/api';

interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    createdAt: string;
    role?: 'user' | 'admin';
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
    isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const extractErrorMessage = (error: any, fallback: string) => {
    if (error?.error && typeof error.error === 'string') return error.error;
    if (error?.message && typeof error.message === 'string') return error.message;
    if (typeof error === 'string') return error;
    return fallback;
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isLoading: true,
        isAuthenticated: false,
        error: null
    });

    // Check authentication status on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (authAPI.isAuthenticated()) {
                    const user = authAPI.getUser();
                    setAuthState({
                        user,
                        isLoading: false,
                        isAuthenticated: true,
                        error: null
                    });
                } else {
                    setAuthState({
                        user: null,
                        isLoading: false,
                        isAuthenticated: false,
                        error: null
                    });
                }
            } catch (error) {
                setAuthState({
                    user: null,
                    isLoading: false,
                    isAuthenticated: false,
                    error: 'Authentication check failed'
                });
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
            
            const response = await authAPI.login({ email, password });
            
            setAuthState({
                user: response.user,
                isLoading: false,
                isAuthenticated: true,
                error: null
            });
        } catch (error: any) {
            setAuthState(prev => ({
                ...prev,
                isLoading: false,
                error: extractErrorMessage(error, 'Login failed')
            }));
            throw error;
        }
    };

    const register = async (name: string, email: string, password: string, phone?: string) => {
        try {
            setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
            
            const response = await authAPI.register({ name, email, password, phone });
            
            setAuthState({
                user: response.user,
                isLoading: false,
                isAuthenticated: true,
                error: null
            });
        } catch (error: any) {
            setAuthState(prev => ({
                ...prev,
                isLoading: false,
                error: extractErrorMessage(error, 'Registration failed')
            }));
            throw error;
        }
    };

    const logout = async () => {
        try {
            setAuthState(prev => ({ ...prev, isLoading: true }));
            
            await authAPI.logout();
            
            setAuthState({
                user: null,
                isLoading: false,
                isAuthenticated: false,
                error: null
            });
        } catch (error) {
            console.error('Logout error:', error);
            // Force logout even if API call fails
            setAuthState({
                user: null,
                isLoading: false,
                isAuthenticated: false,
                error: null
            });
        }
    };

    const clearError = () => {
        setAuthState(prev => ({ ...prev, error: null }));
    };

    const isAdmin = () => {
        // Only treat specific accounts as shop owners/admins.
        const email = authState.user?.email?.toLowerCase();
        return email === "cabdalakh52@gmail.com";
    };

    const value: AuthContextType = {
        ...authState,
        login,
        register,
        logout,
        clearError,
        isAdmin
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export type { User };
