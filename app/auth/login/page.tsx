"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, ShoppingBag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { validateEmail, validatePassword } from "@/lib/auth";

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else {
            const passwordValidation = validatePassword(formData.password);
            if (!passwordValidation.isValid) {
                newErrors.password = passwordValidation.message;
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        try {
            await login(formData);
            router.push("/");
        } catch (error) {
            setErrors({ general: error instanceof Error ? error.message : "Login failed" });
        }
    };

    return (
        <div className="flex flex-col gap-8 pb-12 min-h-screen bg-background">
            {/* Header */}
            <header className="px-6 pt-8 flex items-center justify-between">
                <div className="w-11" />
                <div className="flex items-center gap-2">
                    <ShoppingBag size={24} className="text-primary" />
                    <h1 className="text-xl font-bold text-foreground">VeggieFresh</h1>
                </div>
                <Link 
                    href="/auth/signup"
                    className="text-primary text-sm font-bold hover:underline"
                >
                    Sign Up
                </Link>
            </header>

            {/* Welcome Section */}
            <div className="px-6 flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-foreground">Welcome Back!</h2>
                <p className="text-subtitle">Sign in to access your fresh vegetables and orders</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="px-6 flex flex-col gap-6">
                {/* Email Field */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-foreground">Email</label>
                    <div className="relative">
                        <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtitle" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            className={`w-full h-14 pl-12 pr-4 bg-white rounded-2xl border ${errors.email ? 'border-red-500' : 'border-black/5'} focus:border-primary focus:outline-none premium-shadow text-foreground placeholder:text-subtitle`}
                            disabled={isLoading}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-red-500 text-xs font-medium">{errors.email}</p>
                    )}
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-foreground">Password</label>
                    <div className="relative">
                        <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtitle" />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            className={`w-full h-14 pl-12 pr-12 bg-white rounded-2xl border ${errors.password ? 'border-red-500' : 'border-black/5'} focus:border-primary focus:outline-none premium-shadow text-foreground placeholder:text-subtitle`}
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-subtitle hover:text-primary transition-colors"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-xs font-medium">{errors.password}</p>
                    )}
                </div>

                {/* General Error */}
                {errors.general && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                        <p className="text-red-500 text-sm font-medium">{errors.general}</p>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 bg-primary text-white rounded-2xl flex items-center justify-center gap-3 font-bold premium-shadow hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <>
                            Sign In
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>
            </form>

            {/* Demo Accounts */}
            <div className="px-6">
                <div className="bg-primary/5 rounded-4xl p-6 border border-primary/10">
                    <h3 className="font-bold text-sm text-foreground mb-3">Demo Accounts</h3>
                    <div className="flex flex-col gap-2 text-xs">
                        <div className="bg-white rounded-xl p-3">
                            <p className="font-bold text-primary">Ahmed Mohamed</p>
                            <p className="text-subtitle">ahmed.m@example.com</p>
                            <p className="text-subtitle">password: password123</p>
                        </div>
                        <div className="bg-white rounded-xl p-3">
                            <p className="font-bold text-primary">Fatima Ali</p>
                            <p className="text-subtitle">fatima.a@example.com</p>
                            <p className="text-subtitle">password: password456</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 flex flex-col items-center gap-4 mt-auto">
                <p className="text-subtitle text-sm">
                    Don't have an account?{" "}
                    <Link href="/auth/signup" className="text-primary font-bold hover:underline">
                        Sign Up
                    </Link>
                </p>
                <div className="flex justify-center opacity-40">
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-subtitle">
                        VeggieFresh v2.4.1
                    </p>
                </div>
            </div>
        </div>
    );
}
