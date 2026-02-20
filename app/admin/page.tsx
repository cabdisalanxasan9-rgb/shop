"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AdminGuard from "@/components/AdminGuard";
import { useProducts } from "@/context/ProductsContext";
import { useOrders } from "@/context/OrderContext";
import { useAuth } from "@/context/SecureAuthContext";
import { Package, ShoppingBag, Users, TrendingUp, DollarSign, Clock } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    const router = useRouter();
    const { products } = useProducts();
    const { orders } = useOrders();
    const { user } = useAuth();

    const totalOrders = orders.length;
    const totalProducts = products.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(
        order => order.status === "Processing" || order.status === "Confirmed" || order.status === "In Progress"
    ).length;

    const stats = [
        {
            label: "Total Products",
            value: totalProducts,
            icon: Package,
            color: "bg-blue-500",
            link: "/admin/products"
        },
        {
            label: "Total Orders",
            value: totalOrders,
            icon: ShoppingBag,
            color: "bg-green-500",
            link: "/admin/orders"
        },
        {
            label: "Pending Orders",
            value: pendingOrders,
            icon: Clock,
            color: "bg-orange-500",
            link: "/admin/orders?status=pending"
        },
        {
            label: "Total Revenue",
            value: `$${totalRevenue.toFixed(2)}`,
            icon: DollarSign,
            color: "bg-purple-500",
            link: "/admin/orders"
        }
    ];

    const recentOrders = orders.slice(0, 5);

    return (
        <AdminGuard>
            <div className="flex flex-col gap-8 pb-12 min-h-screen bg-background">
                {/* Header */}
                <header className="px-6 pt-8 flex items-center justify-between bg-white border-b border-black/5">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
                        <p className="text-sm text-subtitle">Welcome back, {user?.name || 'Admin'}</p>
                    </div>
                    <button
                        onClick={() => router.push("/")}
                        className="px-4 py-2 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors"
                    >
                        View Store
                    </button>
                </header>

                {/* Stats Grid */}
                <section className="px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        <Link
                            key={stat.label}
                            href={stat.link}
                            className="bg-white rounded-2xl p-6 premium-shadow hover:translate-y-[-2px] transition-all"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white`}>
                                    <stat.icon size={24} />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                            <p className="text-xs text-subtitle">{stat.label}</p>
                        </Link>
                    ))}
                </section>

                {/* Quick Actions */}
                <section className="px-6">
                    <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <Link
                            href="/admin/products/new"
                            className="bg-white rounded-2xl p-6 premium-shadow hover:translate-y-[-2px] transition-all flex flex-col items-center justify-center gap-3"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <Package size={32} />
                            </div>
                            <span className="font-bold text-sm text-foreground">Add Product</span>
                        </Link>
                        <Link
                            href="/admin/orders"
                            className="bg-white rounded-2xl p-6 premium-shadow hover:translate-y-[-2px] transition-all flex flex-col items-center justify-center gap-3"
                        >
                            <div className="w-16 h-16 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
                                <ShoppingBag size={32} />
                            </div>
                            <span className="font-bold text-sm text-foreground">Manage Orders</span>
                        </Link>
                        <Link
                            href="/admin/users"
                            className="bg-white rounded-2xl p-6 premium-shadow hover:translate-y-[-2px] transition-all flex flex-col items-center justify-center gap-3"
                        >
                            <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                                <Users size={32} />
                            </div>
                            <span className="font-bold text-sm text-foreground">View Users</span>
                        </Link>
                    </div>
                </section>

                {/* Recent Orders */}
                <section className="px-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-foreground">Recent Orders</h2>
                        <Link href="/admin/orders" className="text-primary text-sm font-semibold hover:underline">
                            View All
                        </Link>
                    </div>
                    <div className="bg-white rounded-2xl overflow-hidden premium-shadow">
                        {recentOrders.length === 0 ? (
                            <div className="p-8 text-center text-subtitle">
                                <p>No orders yet</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-black/5">
                                {recentOrders.map((order) => (
                                    <Link
                                        key={order.id}
                                        href={`/admin/orders/${order.id}`}
                                        className="p-4 flex items-center justify-between hover:bg-black/2 transition-colors"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold text-sm text-foreground">Order {order.id}</span>
                                            <span className="text-xs text-subtitle">{order.date}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-bold text-sm text-primary">${order.total.toFixed(2)}</span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                order.status === "Delivered" ? "bg-green-100 text-green-700" :
                                                order.status === "Cancelled" ? "bg-red-100 text-red-700" :
                                                "bg-orange-100 text-orange-700"
                                            }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </AdminGuard>
    );
}
