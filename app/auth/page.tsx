"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AuthGuard from "@/components/AuthGuard";

export default function AuthPage() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    // Redirect to login if not authenticated, or home if authenticated
    React.useEffect(() => {
        if (isAuthenticated) {
            router.push("/");
        } else {
            router.push("/auth/login");
        }
    }, [isAuthenticated, router]);

    return (
        <AuthGuard requireAuth={false}>
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-subtitle">Redirecting...</p>
                </div>
            </div>
        </AuthGuard>
    );
}
