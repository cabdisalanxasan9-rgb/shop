"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/SecureAuthContext";

interface AuthGuardProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    redirectTo?: string;
}

export default function AuthGuard({ 
    children, 
    requireAuth = true, 
    redirectTo = "/auth/login" 
}: AuthGuardProps) {
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
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-subtitle">Loading...</p>
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
