"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AdminGuard from "@/components/AdminGuard";
import { useOrders } from "@/context/OrderContext";
import { Order } from "@/lib/orders";
import { ArrowLeft, Save } from "lucide-react";
import Image from "next/image";

export default function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { getOrderById, updateOrderStatus } = useOrders();
    const resolvedParams = React.use(params);
    const id = resolvedParams.id;
    const order = getOrderById(id);
    const [selectedStatus, setSelectedStatus] = useState<Order['status']>(order?.status || "Processing");

    if (!order) {
        return (
            <AdminGuard>
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-subtitle">Order not found</p>
                </div>
            </AdminGuard>
        );
    }

    const statusOptions: Order['status'][] = [
        "Processing",
        "Confirmed",
        "In Progress",
        "On the way",
        "Delivered",
        "Cancelled"
    ];

    const handleStatusUpdate = () => {
        updateOrderStatus(order.id, selectedStatus);
        router.push("/admin/orders");
    };

    return (
        <AdminGuard>
            <div className="flex flex-col gap-8 pb-12 min-h-screen bg-background">
                {/* Header */}
                <header className="px-6 pt-8 flex items-center gap-4 bg-white border-b border-black/5">
                    <button
                        onClick={() => router.back()}
                        className="w-11 h-11 bg-white rounded-full flex items-center justify-center premium-shadow"
                    >
                        <ArrowLeft size={20} className="text-foreground" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-foreground">Order {order.id}</h1>
                        <p className="text-sm text-subtitle">{order.date}</p>
                    </div>
                </header>

                {/* Order Info */}
                <section className="px-6">
                    <div className="bg-white rounded-2xl p-6 premium-shadow flex flex-col gap-6">
                        {/* Status Update */}
                        <div className="flex flex-col gap-4">
                            <label className="text-sm font-bold text-foreground">Update Order Status</label>
                            <div className="flex gap-3">
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value as Order['status'])}
                                    className="flex-1 h-12 px-4 rounded-xl border border-black/5 focus:border-primary focus:outline-none text-foreground bg-white"
                                >
                                    {statusOptions.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                                <button
                                    onClick={handleStatusUpdate}
                                    className="px-6 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors flex items-center gap-2"
                                >
                                    <Save size={18} />
                                    Update
                                </button>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-sm font-bold text-foreground">Order Items</h3>
                            <div className="flex flex-col gap-3">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 p-4 bg-background rounded-xl">
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-sm text-foreground">{item.name}</p>
                                            <p className="text-xs text-subtitle">{item.weight}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-sm text-foreground">${item.price.toFixed(2)}</p>
                                            <p className="text-xs text-subtitle">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="border-t border-black/5 pt-4 flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-subtitle">Subtotal</span>
                                <span className="font-bold text-foreground">${order.total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-foreground">Total</span>
                                <span className="text-xl font-bold text-primary">${order.total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Address */}
                        {order.address && (
                            <div className="border-t border-black/5 pt-4">
                                <h3 className="text-sm font-bold text-foreground mb-2">Delivery Address</h3>
                                <p className="text-sm text-subtitle">{order.address}</p>
                            </div>
                        )}

                        {/* Driver Info */}
                        {order.driver && (
                            <div className="border-t border-black/5 pt-4">
                                <h3 className="text-sm font-bold text-foreground mb-2">Driver</h3>
                                <div className="flex items-center gap-3">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                        <Image
                                            src={order.driver.image}
                                            alt={order.driver.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-foreground">{order.driver.name}</p>
                                        <p className="text-xs text-subtitle">{order.driver.phone}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </AdminGuard>
    );
}
