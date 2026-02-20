"use client";

import React, { useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import { useAuth } from "@/context/SecureAuthContext";
import { Search, User, Mail, Phone, Calendar } from "lucide-react";

// Mock users data (in real app, this would come from API)
const mockUsers = [
    {
        id: "1",
        name: "Ahmed Mohamed",
        email: "ahmed.m@example.com",
        phone: "+252 61 555 0123",
        createdAt: "2024-01-15",
        role: "user"
    },
    {
        id: "2",
        name: "Fatima Ali",
        email: "fatima.a@example.com",
        phone: "+252 61 555 0456",
        createdAt: "2024-01-20",
        role: "user"
    },
    {
        id: "3",
        name: "Admin User",
        email: "admin@veggiefresh.com",
        phone: "+252 61 555 0000",
        createdAt: "2024-01-01",
        role: "admin"
    },
];

export default function AdminUsersPage() {
    const { user: currentUser } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminGuard>
            <div className="flex flex-col gap-8 pb-12 min-h-screen bg-background">
                {/* Header */}
                <header className="px-6 pt-8 flex items-center justify-between bg-white border-b border-black/5">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Users Management</h1>
                        <p className="text-sm text-subtitle">{mockUsers.length} total users</p>
                    </div>
                </header>

                {/* Search */}
                <section className="px-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-subtitle" size={20} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-14 pl-12 pr-4 bg-white rounded-2xl border border-black/5 focus:border-primary focus:outline-none premium-shadow text-foreground placeholder:text-subtitle"
                        />
                    </div>
                </section>

                {/* Users List */}
                <section className="px-6">
                    {filteredUsers.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center premium-shadow">
                            <User size={48} className="mx-auto mb-4 text-subtitle" />
                            <p className="text-subtitle font-medium">No users found</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl overflow-hidden premium-shadow">
                            <div className="divide-y divide-black/5">
                                {filteredUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className="p-6 hover:bg-black/2 transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                                    <User size={24} />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-sm text-foreground">{user.name}</span>
                                                        {user.role === "admin" && (
                                                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-[10px] font-semibold">
                                                                Admin
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs text-subtitle">
                                                        <div className="flex items-center gap-1">
                                                            <Mail size={12} />
                                                            <span>{user.email}</span>
                                                        </div>
                                                        {user.phone && (
                                                            <div className="flex items-center gap-1">
                                                                <Phone size={12} />
                                                                <span>{user.phone}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs text-subtitle mt-1">
                                                        <Calendar size={12} />
                                                        <span>Joined: {user.createdAt}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </AdminGuard>
    );
}
