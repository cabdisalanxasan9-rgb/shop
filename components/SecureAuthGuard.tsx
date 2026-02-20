"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/SecureAuthContext';

interface SecureAuthGuardProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    redirectTo?: string;
}

export default function SecureAuthGuard({ 
    children, 
    requireAuth = true, 
    redirectTo = '/auth/secure-login' 
}: SecureAuthGuardProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (requireAuth && !isAuthenticated) {
                router.push(redirectTo);
            }
        }
    }, [isLoading, isAuthenticated, requireAuth, redirectTo, router]);

    // Show loading spinner while checking auth
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-gray-600 font-medium">Verifying authentication...</p>
                    <p className="text-gray-500 text-sm mt-2">Please wait while we secure your session</p>
                </div>
            </div>
        );
    }

    // If auth is required and user is not authenticated, don't render children
    if (requireAuth && !isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
