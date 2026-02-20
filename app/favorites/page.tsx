"use client";

import React from "react";
import { ChevronLeft, ShoppingCart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const favorites = [
    {
        id: 1,
        name: "Fresh Broccoli",
        price: 3.50,
        image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&q=80&w=200",
        category: "Vegetables",
        inStock: true
    },
    {
        id: 2,
        name: "Red Tomato",
        price: 2.10,
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=200",
        category: "Vegetables",
        inStock: true
    },
    {
        id: 3,
        name: "Sweet Corn",
        price: 1.80,
        image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=200",
        category: "Vegetables",
        inStock: false
    }
];

export default function FavoritesPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-6 pb-12 bg-background min-h-screen">
            {/* Header */}
            <header className="px-6 pt-8 pb-4 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10">
                <button
                    onClick={() => router.back()}
                    className="w-11 h-11 bg-white rounded-full flex items-center justify-center premium-shadow"
                >
                    <ChevronLeft size={20} className="text-foreground" />
                </button>
                <h1 className="text-xl font-bold text-foreground">Favorites</h1>
                <div className="w-11" />
            </header>

            {/* List */}
            <div className="px-6 grid grid-cols-1 gap-4">
                {favorites.map((item) => (
                    <div key={item.id} className="bg-white rounded-[2rem] p-4 flex items-center gap-4 premium-shadow relative group overflow-hidden">
                        <div className="w-20 h-20 rounded-2xl bg-background overflow-hidden flex-shrink-0 border border-black/5">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex flex-col flex-1 gap-1">
                            <h3 className="font-bold text-foreground text-sm">{item.name}</h3>
                            <span className="text-xs text-subtitle">{item.category}</span>
                            <div className="flex items-center justify-between mt-1">
                                <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
                                {!item.inStock && (
                                    <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Out of Stock</span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 relative z-10">
                            <button className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center premium-shadow hover:bg-primary-dark transition-colors">
                                <ShoppingCart size={18} />
                            </button>
                            <button className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center border border-red-100 hover:bg-red-100 transition-colors">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {favorites.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-50">
                    <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center">
                        <ShoppingCart size={32} className="text-subtitle" />
                    </div>
                    <p className="text-sm font-bold text-subtitle">No favorites yet</p>
                </div>
            )}
        </div>
    );
}
