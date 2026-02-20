"use client";

import React from "react";
import { ChevronLeft, Check, Truck, MapPin, MoveRight, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useOrders } from "@/context/OrderContext";

export default function OrdersPage() {
    const router = useRouter();
    const { orders } = useOrders();
    const latestOrder = orders[0];

    return (
        <div className="flex flex-col gap-8 pb-12 overflow-hidden">
            {/* Header */}
            <header className="px-6 pt-8 flex items-center justify-between">
                <button
                    onClick={() => router.push("/")}
                    className="w-11 h-11 bg-white rounded-full flex items-center justify-center premium-shadow"
                >
                    <ChevronLeft size={20} className="text-foreground" />
                </button>
                <h1 className="text-xl font-bold text-foreground">Order Status</h1>
                <div className="w-11" />
            </header>

            {/* Success Animation Area */}
            <div className="px-6 flex flex-col items-center gap-6 mt-4">
                <div className="relative">
                    <div className="w-32 h-32 bg-primary/10 rounded-full animate-pulse absolute inset-0 scale-125" />
                    <div className="w-32 h-32 bg-primary/20 rounded-full animate-pulse absolute inset-0 scale-110" />
                    <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center text-white premium-shadow relative z-10 border-4 border-white">
                        <Truck size={48} className="animate-bounce" />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2 text-center">
                    <h2 className="text-2xl font-bold text-foreground leading-tight">
                        Order Placed<br />Successfully!
                    </h2>
                    <p className="text-sm text-subtitle px-8 leading-relaxed">
                        Thank you! Your fresh greens are being prepared for delivery.
                    </p>
                </div>
            </div>

            {/* Order Info Card */}
            <div className="px-6">
                <div className="bg-white rounded-[2.5rem] p-8 flex flex-col gap-6 premium-shadow relative overflow-hidden">
                    <div className="flex justify-between items-center relative z-10">
                        <span className="text-subtitle font-medium">Order ID</span>
                        <span className="font-bold text-primary">#{latestOrder?.id || 'Unknown'}</span>
                    </div>

                    <div className="flex items-center gap-4 bg-background rounded-2xl p-4 relative z-10">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-subtitle uppercase tracking-wider">Estimated Delivery</span>
                            <span className="font-bold text-sm">Today, 20-30 mins</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 relative z-10">
                        <button
                            onClick={() => router.push(`/orders/${latestOrder?.id || 'unknown'}`)}
                            className="w-full h-14 bg-primary text-white rounded-2xl flex items-center justify-center gap-3 font-bold premium-shadow hover:bg-primary-dark transition-colors"
                        >
                            Track Order
                            <ShoppingBag size={18} />
                        </button>
                        <Link
                            href="/"
                            className="w-full h-14 bg-white text-primary border border-primary/10 rounded-2xl flex items-center justify-center font-bold premium-shadow hover:bg-primary-light transition-all"
                        >
                            Continue Shopping
                        </Link>
                    </div>

                    {/* Decorative Circle */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full" />
                </div>
            </div>

            {/* Notification Card */}
            <div className="px-6">
                <div className="bg-primary/5 rounded-[2rem] p-6 flex gap-4 border border-primary/10">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary premium-shadow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <h3 className="font-bold text-sm">Order Confirmation</h3>
                        <p className="text-[11px] text-subtitle leading-relaxed">
                            We've sent a detailed receipt and tracking information to your registered email address.
                        </p>
                        <button className="text-primary text-[11px] font-bold mt-1 self-start flex items-center gap-1 group">
                            View Order Details
                            <MoveRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Live Map Preview */}
            <div className="px-6 pb-8">
                <div className="relative h-44 rounded-[2.5rem] overflow-hidden premium-shadow group">
                    <img
                        src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800"
                        alt="Delivery map"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white border-4 border-white premium-shadow">
                            <MapPin size={24} />
                        </div>
                        <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full premium-shadow text-[10px] font-bold text-primary uppercase tracking-widest">
                            Live Tracking Available
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Branding */}
            <div className="flex justify-center pb-8 opacity-40">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-subtitle">
                    VeggieFresh Marketplace © 2024
                </p>
            </div>
        </div>
    );
}
