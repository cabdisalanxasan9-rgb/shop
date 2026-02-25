"use client";

import React, { useState } from "react";
import { ChevronLeft, RotateCcw, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import OrderDetailsModal from "@/components/OrderDetailsModal";
import { useOrders } from "@/context/OrderContext";
import { getOrdersByStatus, getOrderImages } from "@/lib/orders";
import AuthGuard from "@/components/AuthGuard";

export default function MyOrdersPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("All");
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
    const { orders } = useOrders();

    const filteredOrders = getOrdersByStatus(activeTab, orders);

    return (
        <div className="flex flex-col gap-6 pb-20">
            {/* Header */}
            <header className="px-6 pt-8 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10">
                <button
                    onClick={() => router.back()}
                    className="w-11 h-11 bg-white rounded-full flex items-center justify-center premium-shadow"
                >
                    <ChevronLeft size={20} className="text-foreground" />
                </button>
                <h1 className="text-xl font-bold text-foreground">My Orders</h1>
                <div className="w-11" />
            </header>

            {/* Tabs */}
            <div className="px-6 flex gap-4 border-b border-black/[0.03]">
                {["All", "Ongoing", "History"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "pb-4 px-2 text-sm font-bold transition-all relative",
                            activeTab === tab ? "text-primary" : "text-subtitle"
                        )}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
                        )}
                    </button>
                ))}
            </div>

            {/* Orders List */}
            <div className="px-6 flex flex-col gap-6">
                {filteredOrders.map((order) => (
                    <div key={order.id} className="bg-white rounded-[2.5rem] p-6 flex flex-col gap-5 premium-shadow group">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className={cn(
                                        "text-[10px] font-bold px-3 py-1 rounded-full",
                                        order.statusColor || "text-primary bg-primary/10"
                                    )}>
                                        {order.status}
                                    </span>
                                    <span className="text-[10px] font-bold text-subtitle">{order.date}</span>
                                </div>
                                <h3 className="text-lg font-bold text-foreground">#{order.id}</h3>
                            </div>
                            <span className="text-xl font-bold text-primary">${order.total.toFixed(2)}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-3">
                                    {getOrderImages(order).map((img, i) => (
                                        <div key={i} className="w-10 h-10 rounded-xl border-4 border-white overflow-hidden bg-background premium-shadow">
                                            <img
                                                src={img}
                                                alt="Product"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = "/images/veg-tomato.jpg";
                                                }}
                                            />
                                        </div>
                                    ))}
                                    {(order.itemCount || order.items.length) > getOrderImages(order).length && (
                                        <div className="w-10 h-10 rounded-xl border-4 border-white bg-primary-light flex items-center justify-center text-[10px] font-bold text-primary premium-shadow">
                                            +{(order.itemCount || order.items.length) - getOrderImages(order).length}
                                        </div>
                                    )}
                                </div>
                                <p className="text-[11px] text-subtitle font-medium max-w-[140px] line-clamp-1 ml-2">
                                    {order.labels}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {order.status === "Delivered" ? (
                                <>
                                    <button className="flex-1 h-12 bg-primary text-white rounded-xl flex items-center justify-center gap-2 text-xs font-bold premium-shadow">
                                        <RotateCcw size={16} /> Reorder
                                    </button>
                                    <button
                                        onClick={() => setSelectedOrder(order.id)}
                                        className="flex-1 h-12 bg-white text-foreground border border-black/5 rounded-xl flex items-center justify-center text-xs font-bold premium-shadow hover:bg-black/5 transition-colors"
                                    >
                                        Details
                                    </button>
                                </>
                            ) : order.status === "In Progress" ? (
                                <button
                                    onClick={() => setSelectedOrder(order.id)}
                                    className="w-full h-12 bg-white text-primary border border-primary/10 rounded-xl flex items-center justify-center gap-2 text-xs font-bold premium-shadow group/btn hover:bg-primary-light transition-colors"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                    Track Order
                                </button>
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>

            {/* Global Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
                    <OrderDetailsModal
                        isOpen={!!selectedOrder}
                        onClose={() => setSelectedOrder(null)}
                        orderId={selectedOrder}
                    />
                </div>
            )}
        </div>
    );
}
