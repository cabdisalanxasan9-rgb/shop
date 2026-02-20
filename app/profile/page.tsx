"use client";

import React from "react";
import { ChevronLeft, User, Package, Heart, MapPin, Bell, Globe, HelpCircle, Shield, LogOut, Camera, MoreVertical, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useOrders } from "@/context/OrderContext";
import { useAuth } from "@/context/SecureAuthContext";
import AuthGuard from "@/components/AuthGuard";
import { languageLabel, usePreferences } from "@/context/PreferencesContext";

export default function ProfilePage() {
    const router = useRouter();
    const { orders } = useOrders();
    const { user, logout, isAdmin } = useAuth();
    const { language } = usePreferences();
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [avatarOverride, setAvatarOverride] = React.useState<string | null>(null);
    const activeOrdersCount = orders.filter(order => 
        order.status === "In Progress" || order.status === "Processing" || order.status === "Confirmed" || order.status === "On the way"
    ).length;

    const avatarStorageKey = React.useMemo(() => {
        const id = user?.email || "guest";
        return `veggiefresh:avatar:v1:${id}`;
    }, [user?.email]);

    React.useEffect(() => {
        try {
            const saved = window.localStorage.getItem(avatarStorageKey);
            setAvatarOverride(saved || null);
        } catch {
            setAvatarOverride(null);
        }
    }, [avatarStorageKey]);

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/auth/secure-login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handlePickAvatar = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // allow re-selecting same file
        e.target.value = "";

        if (!file.type.startsWith("image/")) return;
        const maxBytes = 2 * 1024 * 1024; // 2MB
        if (file.size > maxBytes) {
            alert("Image is too large. Please choose a file under 2MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const result = typeof reader.result === "string" ? reader.result : null;
            if (!result) return;
            setAvatarOverride(result);
            try {
                window.localStorage.setItem(avatarStorageKey, result);
            } catch {
                // ignore storage failures (quota, private mode, etc.)
            }
        };
        reader.readAsDataURL(file);
    };

    // If user is not logged in, show guest profile
    const displayUser = user || {
        name: "Guest User",
        email: "guest@example.com",
        avatar: "https://ui-avatars.com/api/?name=Guest&background=random"
    };
    const avatarSrc = avatarOverride || displayUser.avatar;

    const profileSections = [
        {
            title: "Account Overview",
            items: [
                { icon: Package, label: "My Orders", path: "/orders/list", badge: activeOrdersCount > 0 ? activeOrdersCount.toString() : undefined },
                { icon: Heart, label: "Favorite Items", path: "/favorites" },
                { icon: MapPin, label: "Shipping Addresses", path: "/addresses" },
                { icon: Bell, label: "Settings", path: "/settings" },
            ]
        },
    {
        title: "Settings & Support",
        items: [
            { icon: Bell, label: "Notification Settings", path: "/settings" },
            { icon: Globe, label: "Language", value: languageLabel(language), path: "/settings" },
            { icon: HelpCircle, label: "Help Center", path: "/settings" },
            { icon: Shield, label: "Privacy Policy", path: "/settings" },
        ]
    }
];

    return (
        <div className="flex flex-col gap-0 pb-12 bg-background min-h-screen">
            {/* Custom Header */}
            <header className="px-6 pt-8 pb-4 flex items-center justify-between bg-card/50 backdrop-blur-sm sticky top-0 z-20">
                <button
                    onClick={() => router.back()}
                    className="w-11 h-11 bg-card rounded-full flex items-center justify-center premium-shadow"
                >
                    <ChevronLeft size={20} className="text-foreground" />
                </button>
                <h1 className="text-xl font-bold text-foreground">Profile</h1>
                <button className="w-11 h-11 bg-card rounded-full flex items-center justify-center premium-shadow">
                    <MoreVertical size={20} className="text-foreground" />
                </button>
            </header>

            {/* Profile Info */}
            <div className="flex flex-col items-center gap-6 py-8 relative">
                <div className="relative group">
                    <div className="w-36 h-36 rounded-full border-[6px] border-background premium-shadow overflow-hidden bg-card">
                        <img
                            src={avatarSrc}
                            alt="Profile"
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                    />
                    <button
                        onClick={handlePickAvatar}
                        className="absolute bottom-2 right-2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center border-4 border-white premium-shadow transition-transform hover:scale-110 active:scale-95"
                    >
                        <Camera size={18} />
                    </button>
                </div>

                <div className="flex flex-col items-center gap-1.5">
                    <h2 className="text-2xl font-bold text-foreground">{displayUser.name}</h2>
                    <p className="text-sm text-primary font-medium opacity-70">{displayUser.email}</p>
                </div>
            </div>

            {/* Profile Sections */}
            <div className="flex flex-col gap-8 px-6 pb-8">
                {/* Admin shortcut - only show for admin users */}
                {isAdmin() && (
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] px-2">
                            Store Management
                        </h3>
                        <button
                            onClick={() => router.push("/admin")}
                            className="w-full px-6 py-5 flex items-center justify-between bg-card rounded-[2.5rem] premium-shadow hover:bg-black/1 transition-colors group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                                    <Shield size={20} />
                                </div>
                                <span className="font-bold text-sm text-foreground">
                                    Open Admin Dashboard
                                </span>
                            </div>
                            <ChevronRight
                                size={18}
                                className="text-subtitle/30 group-hover:text-primary transition-colors group-hover:translate-x-0.5"
                            />
                        </button>
                    </div>
                )}

                {profileSections.map((section) => (
                    <div key={section.title} className="flex flex-col gap-4">
                        <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] px-2">
                            {section.title}
                        </h3>
                        <div className="bg-card rounded-[2.5rem] overflow-hidden premium-shadow divide-y divide-black/3">
                            {section.items.map((item) => (
                                <button
                                    key={item.label}
                                    onClick={() => router.push(item.path)}
                                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-black/1 transition-colors group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                                            <item.icon size={20} />
                                        </div>
                                        <span className="font-bold text-sm text-foreground">{item.label}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {item.badge && (
                                            <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                        {item.value && (
                                            <span className="text-xs font-semibold text-subtitle">{item.value}</span>
                                        )}
                                        <ChevronRight size={18} className="text-subtitle/30 group-hover:text-primary transition-colors group-hover:translate-x-0.5" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Logout Button - Only show if user is logged in */}
                {user && (
                    <button 
                        onClick={handleLogout}
                        className="mt-4 w-full h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center gap-3 font-bold border border-red-100/50 hover:bg-red-100 transition-all active:scale-[0.98] premium-shadow shadow-red-500/5 group"
                    >
                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Logout
                    </button>
                )}

                {/* Footer Branding */}
                <div className="flex justify-center mt-4 opacity-30">
                    <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-subtitle">
                        JannoFresh v2.4.1
                    </p>
                </div>
            </div>
        </div>
    );
}
