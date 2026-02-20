"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order, ordersData } from '@/lib/orders';

interface OrderContextType {
    orders: Order[];
    updateOrderStatus: (orderId: string, status: Order['status']) => void;
    addOrder: (order: Order) => void;
    getOrderById: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<Order[]>(ordersData);

    const updateOrderStatus = (orderId: string, status: Order['status']) => {
        setOrders(prev => 
            prev.map(order => 
                order.id === orderId 
                    ? { ...order, status, statusColor: getStatusColor(status) }
                    : order
            )
        );
    };

    const addOrder = (order: Order) => {
        setOrders(prev => [order, ...prev]);
    };

    const getOrderById = (id: string): Order | undefined => {
        return orders.find(order => order.id === id);
    };

    return (
        <OrderContext.Provider value={{
            orders,
            updateOrderStatus,
            addOrder,
            getOrderById
        }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
}

function getStatusColor(status: Order['status']): string {
    switch (status) {
        case "Delivered":
            return "text-primary bg-primary/10";
        case "In Progress":
        case "Processing":
        case "Confirmed":
        case "On the way":
            return "text-orange-500 bg-orange-50";
        case "Cancelled":
            return "text-red-500 bg-red-50";
        default:
            return "text-primary bg-primary/10";
    }
}
