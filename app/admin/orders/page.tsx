"use client";

import React, { useState } from "react";
import { Search, Filter, Eye } from "lucide-react";
import { useOrders } from "@/context/OrderContext";
import AdminGuard from "@/components/AdminGuard";
import { Order } from "@/lib/orders";
import Link from "next/link";

export default function AdminOrdersPage() {
  const { orders } = useOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      order.id.toLowerCase().includes(term) ||
      order.items.some((item) => item.name.toLowerCase().includes(term));
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: "all", label: "All Orders" },
    { value: "Processing", label: "Processing" },
    { value: "Confirmed", label: "Confirmed" },
    { value: "In Progress", label: "In Progress" },
    { value: "On the way", label: "On the way" },
    { value: "Delivered", label: "Delivered" },
    { value: "Cancelled", label: "Cancelled" },
  ];

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Processing":
      case "Confirmed":
      case "In Progress":
      case "On the way":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <AdminGuard>
      <div className="flex flex-col gap-8 pb-12 min-h-screen bg-background">
        {/* Header */}
        <header className="px-6 pt-8 flex items-center justify-between bg-white border-b border-black/5">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Orders Management</h1>
            <p className="text-sm text-subtitle">{orders.length} total orders</p>
          </div>
        </header>

        {/* Filters */}
        <section className="px-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-subtitle"
              size={20}
            />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-white rounded-2xl border border-black/5 focus:border-primary focus:outline-none premium-shadow text-foreground placeholder:text-subtitle"
            />
          </div>
          <div className="relative">
            <Filter
              className="absolute left-4 top-1/2 -translate-y-1/2 text-subtitle"
              size={20}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-48 h-14 pl-12 pr-4 bg-white rounded-2xl border border-black/5 focus:border-primary focus:outline-none premium-shadow text-foreground"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Orders List */}
        <section className="px-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center premium-shadow">
              <p className="text-subtitle font-medium">No orders found</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl overflow-hidden premium-shadow">
              <div className="divide-y divide-black/5">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="p-6 hover:bg-black/2 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-lg text-foreground">
                          Order {order.id}
                        </span>
                        <span className="text-xs text-subtitle">{order.date}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-lg text-primary">
                          ${order.total.toFixed(2)}
                        </span>
                        <span
                          className={`px-4 py-2 rounded-full text-xs font-semibold ${getStatusColor(
                            order.status,
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs text-subtitle">
                        {order.items.length} item
                        {order.items.length !== 1 ? "s" : ""}
                      </span>
                      {order.address && (
                        <>
                          <span className="text-subtitle">•</span>
                          <span className="text-xs text-subtitle truncate">
                            {order.address}
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-xl font-semibold text-xs hover:bg-primary/20 transition-colors flex items-center gap-2"
                      >
                        <Eye size={14} />
                        View Details
                      </Link>
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

