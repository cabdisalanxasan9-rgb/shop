"use client";

import React from "react";
import { ChevronLeft, MapPin, Package, Clock, CreditCard, ChevronRight, Phone, MessageCircle } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useOrders } from "@/context/OrderContext";
import AuthGuard from "@/components/AuthGuard";

export default function OrderDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const { getOrderById } = useOrders();
    const orderData = getOrderById(params.id as string) || {
        id: "Unknown",
        status: "Unknown",
        date: "Unknown",
        total: 0,
        items: [],
        timeline: [],
        driver: { name: "Unknown", rating: 0, image: "", phone: "" },
        address: "Unknown"
    };

    return (
        <div className="flex flex-col gap-6 pb-24 bg-background min-h-screen">
            {/* Header */}
            <header className="px-6 pt-8 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10 pb-4">
                <button
                    onClick={() => router.back()}
                    className="w-11 h-11 bg-white rounded-full flex items-center justify-center premium-shadow"
                >
                    <ChevronLeft size={20} className="text-foreground" />
                </button>
                <h1 className="text-xl font-bold text-foreground">Order Details</h1>
                <div className="w-11" />
            </header>

            {/* Status Card */}
            <div className="px-6">
                <div className="bg-white rounded-[2.5rem] p-6 premium-shadow overflow-hidden relative">
                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <div>
                            <span className="text-subtitle text-xs font-bold uppercase tracking-wider">Order ID</span>
                            <h2 className="text-2xl font-bold text-primary mt-1">#{params.id || orderData.id}</h2>
                        </div>
                        <div className="bg-primary/10 px-3 py-1.5 rounded-full">
                            <span className="text-primary text-xs font-bold uppercase">{orderData.status}</span>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex justify-between items-end relative z-10 pt-4">
                        {/* Simple visual timeline or progress bar could go here, 
                             but let's do a vertical list or a driver card if it's active */}
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-subtitle font-medium">Estimated Arrival</span>
                            <span className="text-sm font-bold text-foreground">Delivered at 11:45 AM</span>
                        </div>
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white premium-shadow">
                            <Package size={20} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Items List */}
            <div className="px-6 flex flex-col gap-4">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider ml-2">Items</h3>
                <div className="flex flex-col gap-4">
                    {orderData.items.map((item) => (
                        <div key={item.id} className="bg-white rounded-[2rem] p-4 flex items-center gap-4 premium-shadow">
                            <div className="w-20 h-20 rounded-2xl bg-background overflow-hidden flex-shrink-0 border border-black/5">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = "/images/veg-tomato.jpg";
                                    }}
                                />
                            </div>
                            <div className="flex flex-col flex-1 gap-1">
                                <h4 className="font-bold text-foreground text-sm line-clamp-1">{item.name}</h4>
                                <span className="text-xs text-subtitle">{item.weight}</span>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="font-bold text-primary">${item.price}</span>
                                    <span className="text-xs font-bold text-foreground bg-black/5 px-2 py-1 rounded-lg">x{item.quantity}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Driver/Delivery Info */}
            <div className="px-6 flex flex-col gap-4">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider ml-2">Delivery Details</h3>
                <div className="bg-white rounded-[2.5rem] p-6 premium-shadow flex flex-col gap-6">
                    {/* Address */}
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-500">
                            <MapPin size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-subtitle font-bold uppercase mb-1">Shipping Address</span>
                            <p className="text-sm font-bold text-foreground leading-relaxed">{orderData.address}</p>
                        </div>
                    </div>

                    <div className="h-px bg-black/[0.05] w-full" />

                    {/* Driver */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white premium-shadow">
                                <img
                                    src={orderData.driver.image}
                                    alt={orderData.driver.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = "/images/driver-omar.svg";
                                    }}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-foreground">{orderData.driver.name}</span>
                                <div className="flex items-center gap-1">
                                    <span className="text-xs font-bold text-primary">★ {orderData.driver.rating}</span>
                                    <span className="text-xs text-subtitle">Driver</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors">
                                <Phone size={18} />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors">
                                <MessageCircle size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="px-6 pb-6">
                <div className="bg-white rounded-[2.5rem] p-6 premium-shadow flex flex-col gap-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-subtitle font-medium">Subtotal</span>
                        <span className="font-bold text-foreground">$21.50</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-subtitle font-medium">Delivery Fee</span>
                        <span className="font-bold text-foreground">$3.00</span>
                    </div>
                    <div className="h-px bg-black/[0.05] w-full my-2" />
                    <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-foreground">Total</span>
                        <span className="text-xl font-bold text-primary">${orderData.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="px-6">
                <button className="w-full h-14 bg-primary text-white rounded-2xl flex items-center justify-center font-bold premium-shadow">
                    Reorder All Items
                </button>
            </div>
        </div>
    );
}
