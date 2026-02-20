"use client";

import React from "react";
import { X, Package, MapPin, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOrders } from "@/context/OrderContext";

interface OrderDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderId: string;
}

export default function OrderDetailsModal({ isOpen, onClose, orderId }: OrderDetailsModalProps) {
    if (!isOpen) return null;

    const { getOrderById } = useOrders();
    const orderData = getOrderById(orderId) || {
        id: orderId,
        status: "Unknown",
        date: "Unknown",
        total: 0,
        items: [],
        driver: { name: "Unknown", rating: 0, image: "", phone: "" },
        address: "Unknown"
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center sm:p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-background rounded-t-[2.5rem] md:rounded-[2.5rem] overflow-hidden max-h-[90vh] flex flex-col premium-shadow animate-in slide-in-from-bottom-full duration-300">

                {/* Header */}
                <div className="px-6 py-6 bg-white border-b border-black/5 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-foreground">Order Details</h2>
                        <span className="text-sm text-primary font-bold">#{orderData.id}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center text-foreground hover:bg-black/10 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">

                    {/* Status Card */}
                    <div className="bg-white rounded-[2rem] p-5 premium-shadow flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-subtitle font-bold uppercase">Status</span>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="font-bold text-primary">{orderData.status}</span>
                            </div>
                        </div>
                        <div className="bg-primary/10 px-3 py-1.5 rounded-full">
                            <Package size={18} className="text-primary" />
                        </div>
                    </div>

                    {/* Items */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Items</h3>
                        {orderData.items.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl p-3 flex items-center gap-3 premium-shadow">
                                <div className="w-14 h-14 rounded-xl bg-background overflow-hidden flex-shrink-0 border border-black/5">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col flex-1 gap-0.5">
                                    <h4 className="font-bold text-foreground text-sm line-clamp-1">{item.name}</h4>
                                    <span className="text-xs text-subtitle">{item.weight}</span>
                                </div>
                                <span className="font-bold text-primary text-sm">${item.price}</span>
                            </div>
                        ))}
                    </div>

                    {/* Delivery Info */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Delivery</h3>
                        <div className="bg-white rounded-[2rem] p-5 premium-shadow flex flex-col gap-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-500">
                                    <MapPin size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-subtitle font-bold">Address</span>
                                    <p className="text-sm font-bold text-foreground leading-tight mt-1">{orderData.address}</p>
                                </div>
                            </div>

                            <div className="h-px bg-black/5 w-full" />

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white premium-shadow">
                                        <img src={orderData.driver.image} alt="Driver" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-foreground">{orderData.driver.name}</span>
                                        <span className="text-[10px] text-primary font-bold">Driver • ★ {orderData.driver.rating}</span>
                                    </div>
                                </div>
                                <a href={`tel:${orderData.driver.phone}`} className="w-9 h-9 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors">
                                    <Phone size={16} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-white rounded-[2rem] p-5 premium-shadow flex items-center justify-between">
                        <span className="font-bold text-foreground">Total Paid</span>
                        <span className="text-xl font-bold text-primary">${orderData.total.toFixed(2)}</span>
                    </div>

                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 bg-background/50 backdrop-blur-sm sticky bottom-0">
                    <button className="w-full h-14 bg-primary text-white rounded-2xl flex items-center justify-center font-bold premium-shadow">
                        Track Live Order
                    </button>
                </div>
            </div>
        </div>
    );
}
