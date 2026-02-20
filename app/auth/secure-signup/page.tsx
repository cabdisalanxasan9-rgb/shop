"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, ShoppingBag, Shield, Check, Phone } from "lucide-react";
import { useAuth } from "@/context/SecureAuthContext";

export default function SecureSignupPage() {
    const router = useRouter();
    const { register, isLoading, error, clearError } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; phone?: string }>({});

    const validateForm = () => {
        const newErrors: typeof errors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        } else if (formData.name.trim().length > 50) {
            newErrors.name = "Name cannot exceed 50 characters";
        }
        
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }
        
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        
        if (formData.phone && !/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();
        
        if (!validateForm()) return;

        try {
            await register(formData.name, formData.email, formData.password, formData.phone);
            router.push("/");
        } catch (error) {
            // Error is already handled in context
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear field error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo and Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <ShoppingBag className="w-8 h-8 text-green-600" />
                        <h1 className="text-2xl font-bold text-gray-900">VeggieFresh</h1>
                    </div>
                    <p className="text-gray-600">Create your secure account</p>
                </div>

                {/* Signup Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    {/* Security Badge */}
                    <div className="flex items-center justify-center mb-6">
                        <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
                            <Shield className="w-4 h-4 text-green-600" />
                            <span className="text-xs font-semibold text-green-700">Secure Registration</span>
                        </div>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {/* Signup Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    className={`w-full pl-10 pr-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-gray-900 placeholder:text-gray-400`}
                                    disabled={isLoading}
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-1 text-red-500 text-xs font-medium">{errors.name}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-gray-900 placeholder:text-gray-400`}
                                    disabled={isLoading}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-red-500 text-xs font-medium">{errors.email}</p>
                            )}
                        </div>

                        {/* Phone Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Phone Number (Optional)
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+252 61 555 0123"
                                    className={`w-full pl-10 pr-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-gray-900 placeholder:text-gray-400`}
                                    disabled={isLoading}
                                />
                            </div>
                            {errors.phone && (
                                <p className="mt-1 text-red-500 text-xs font-medium">{errors.phone}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Create a strong password"
                                    className={`w-full pl-10 pr-12 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-gray-900 placeholder:text-gray-400`}
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-red-500 text-xs font-medium">{errors.password}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    Create Secure Account
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Security Features */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Check className="w-4 h-4 text-green-600" />
                                <span>Password encryption</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Check className="w-4 h-4 text-green-600" />
                                <span>Data protection</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Check className="w-4 h-4 text-green-600" />
                                <span>Secure storage</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sign In Link */}
                <div className="text-center mt-6">
                    <p className="text-gray-600 text-sm">
                        Already have an account?{" "}
                        <Link 
                            href="/auth/secure-login" 
                            className="text-green-600 font-semibold hover:text-green-700 transition-colors"
                        >
                            Sign in securely
                        </Link>
                    </p>
                </div>

                {/* Terms */}
                <div className="text-center mt-4">
                    <p className="text-xs text-gray-500">
                        By creating an account, you agree to our{" "}
                        <span className="text-green-600 font-medium">Terms of Service</span> and{" "}
                        <span className="text-green-600 font-medium">Privacy Policy</span>
                    </p>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-xs text-gray-500">
                        © 2024 VeggieFresh. All rights reserved. | 
                        <span className="text-green-600 font-medium">Secure Platform</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
