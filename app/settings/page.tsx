"use client";

import React from "react";
import { ChevronLeft, User, Lock, Link as LinkIcon, Bell, Mail, Globe, Moon, FileText, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { languageLabel, usePreferences } from "@/context/PreferencesContext";
import { useAuth } from "@/context/SecureAuthContext";

export default function SettingsPage() {
    const router = useRouter();
    const { logout, user, isLoading } = useAuth();
    const {
        theme,
        toggleTheme,
        language,
        setLanguage,
        pushNotifications,
        emailNotifications,
        setPushNotifications,
        setEmailNotifications
    } = usePreferences();

    const settingsGroups = React.useMemo(() => ([
        {
            title: "Account Settings",
            items: [
                { icon: User, label: "Edit Profile", desc: "Name, Email, Phone number" },
                { icon: Lock, label: "Change Password" },
                { icon: LinkIcon, label: "Linked Accounts" },
            ]
        },
        {
            title: "Notifications",
            items: [
                { icon: Bell, label: "Push Notifications", toggle: true, enabled: pushNotifications },
                { icon: Mail, label: "Email Notifications", toggle: true, enabled: emailNotifications },
            ]
        },
        {
            title: "Preferences",
            items: [
                { icon: Globe, label: "Language", value: languageLabel(language) },
                { icon: Moon, label: "Dark Mode", toggle: true, enabled: theme === "dark" },
            ]
        },
        {
            title: "Support & Legal",
            items: [
                { icon: FileText, label: "Terms of Service" },
                { icon: Shield, label: "Privacy Policy" },
                { icon: HelpCircle, label: "Help Center" },
            ]
        }
    ]), [emailNotifications, language, pushNotifications, theme]);

    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            router.replace("/auth/secure-login");
        }
    };

    return (
        <div className="flex flex-col gap-0 pb-12 bg-background min-h-screen">
            {/* Header */}
            <header className="px-6 pt-8 pb-6 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10">
                <button
                    onClick={() => router.back()}
                    className="w-11 h-11 bg-card rounded-full flex items-center justify-center premium-shadow"
                >
                    <ChevronLeft size={20} className="text-foreground" />
                </button>
                <h1 className="text-xl font-bold text-foreground">Settings</h1>
                <div className="w-11" />
            </header>

            {/* Settings Groups */}
            <div className="flex flex-col gap-10 px-6 pb-8">
                {settingsGroups.map((group) => (
                    <div key={group.title} className="flex flex-col gap-5">
                        <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] px-2">
                            {group.title}
                        </h3>
                        <div className="bg-card rounded-[2.5rem] overflow-hidden premium-shadow divide-y divide-black/3">
                            {group.items.map((item) => (
                                <div
                                    key={item.label}
                                    onClick={() => {
                                        if (item.label === "Dark Mode") {
                                            toggleTheme();
                                            return;
                                        }
                                        if (item.label === "Push Notifications") {
                                            setPushNotifications(!pushNotifications);
                                            return;
                                        }
                                        if (item.label === "Email Notifications") {
                                            setEmailNotifications(!emailNotifications);
                                            return;
                                        }
                                    }}
                                    className={cn(
                                        "w-full px-6 py-5 flex items-center justify-between transition-colors group",
                                        item.toggle ? "cursor-pointer hover:bg-black/1" : "cursor-default"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                                            <item.icon size={18} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm text-foreground">{item.label}</span>
                                            {item.desc && <span className="text-[10px] text-subtitle">{item.desc}</span>}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {item.label === "Language" ? (
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-primary opacity-60">
                                                    {languageLabel(language)}
                                                </span>
                                                <select
                                                    aria-label="Language"
                                                    value={language}
                                                    onClick={(e) => e.stopPropagation()}
                                                    onChange={(e) => {
                                                        const v = e.target.value;
                                                        if (v === "en" || v === "so" || v === "ar") setLanguage(v);
                                                    }}
                                                    className="text-[11px] font-bold bg-transparent text-foreground outline-none border border-black/10 rounded-xl px-2 py-1"
                                                >
                                                    <option value="en">English</option>
                                                    <option value="so">Somali</option>
                                                    <option value="ar">Arabic</option>
                                                </select>
                                            </div>
                                        ) : item.value ? (
                                            <span className="text-xs font-bold text-primary opacity-60">{item.value}</span>
                                        ) : null}
                                        {item.toggle ? (
                                            <div className={cn(
                                                "w-12 h-6 rounded-full p-1 transition-colors duration-300",
                                                item.enabled ? "bg-primary" : "bg-subtitle/20"
                                            )}>
                                                <div className={cn(
                                                    "w-4 h-4 bg-card rounded-full shadow-sm transition-transform duration-300",
                                                    item.enabled ? "translate-x-6" : "translate-x-0"
                                                )} />
                                            </div>
                                        ) : (
                                            <ChevronRight size={18} className="text-subtitle/30 group-hover:text-primary transition-colors group-hover:translate-x-0.5" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    disabled={!user || isLoading}
                    className={cn(
                        "mt-4 w-full h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center gap-3 font-bold border border-red-100/50 transition-all premium-shadow shadow-red-500/5 group",
                        (!user || isLoading) ? "opacity-50 cursor-not-allowed" : "hover:bg-red-100 active:scale-[0.98]"
                    )}
                >
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Logout
                </button>

                <div className="flex flex-col items-center mt-4 opacity-30 gap-1">
                    <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-subtitle">
                        App Version 2.4.1(Build 108)
                    </p>
                </div>
            </div>
        </div>
    );
}
