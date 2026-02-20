"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone, ShoppingBag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { validateEmail, validatePassword, validatePhone } from "@/lib/auth";

export default function SignupPage() {
    const router = useRouter();
    const { signup, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; phone?: string; general?: string }>({});

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

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

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

        if (formData.phone && !validatePhone(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        try {
            await signup(formData);
            router.push("/");
        } catch (error) {
            setErrors({ general: error instanceof Error ? error.message : "Signup failed" });
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
                    href="/auth/login"
                    className="text-primary text-sm font-bold hover:underline"
                >
                    Sign In
                </Link>
            </header>

            {/* Welcome Section */}
            <div className="px-6 flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-foreground">Create Account</h2>
                <p className="text-subtitle">Join us to get fresh vegetables delivered to your door</p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="px-6 flex flex-col gap-6">
                {/* Name Field */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-foreground">Full Name</label>
                    <div className="relative">
                        <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtitle" />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className={`w-full h-14 pl-12 pr-4 bg-white rounded-2xl border ${errors.name ? 'border-red-500' : 'border-black/5'} focus:border-primary focus:outline-none premium-shadow text-foreground placeholder:text-subtitle`}
                            disabled={isLoading}
                        />
                    </div>
                    {errors.name && (
                        <p className="text-red-500 text-xs font-medium">{errors.name}</p>
                    )}
                </div>

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

                {/* Phone Field */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-foreground">Phone (Optional)</label>
                    <div className="relative">
                        <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtitle" />
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+252 61 555 0123"
                            className={`w-full h-14 pl-12 pr-4 bg-white rounded-2xl border ${errors.phone ? 'border-red-500' : 'border-black/5'} focus:border-primary focus:outline-none premium-shadow text-foreground placeholder:text-subtitle`}
                            disabled={isLoading}
                        />
                    </div>
                    {errors.phone && (
                        <p className="text-red-500 text-xs font-medium">{errors.phone}</p>
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
                            placeholder="Create a password"
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
                            Create Account
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>
            </form>

            {/* Terms */}
            <div className="px-6">
                <div className="bg-primary/5 rounded-4xl p-6 border border-primary/10">
                    <p className="text-xs text-subtitle leading-relaxed">
                        By creating an account, you agree to our{" "}
                        <span className="text-primary font-bold">Terms of Service</span> and{" "}
                        <span className="text-primary font-bold">Privacy Policy</span>. 
                        We'll use your information to personalize your experience and send you relevant updates.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 flex flex-col items-center gap-4 mt-auto">
                <p className="text-subtitle text-sm">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-primary font-bold hover:underline">
                        Sign In
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
