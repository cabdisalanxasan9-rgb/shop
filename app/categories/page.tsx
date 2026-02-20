"use client";

import React from "react";
import { ChevronLeft, Search, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import CategoryItem from "@/components/CategoryItem";

const categories = [
    { id: "leafy-greens", label: "Leafy Greens", icon: "/images/cat-greens.jpg", color: "bg-emerald-50 text-emerald-600" },
    { id: "root-vegies", label: "Root Vegies", icon: "/images/cat-root.jpg", color: "bg-orange-50 text-orange-600" },
    { id: "peppers", label: "Peppers", icon: "/images/cat-peppers.jpg", color: "bg-red-50 text-red-600" },
    { id: "fruits", label: "Fruits", icon: "/images/cat-fruits.jpg", color: "bg-yellow-50 text-yellow-600" },
    { id: "grains", label: "Grains", icon: "/images/cat-grains.jpg", color: "bg-amber-50 text-amber-600" },
    { id: "herbs", label: "Herbs", icon: "/images/cat-herbs.jpg", color: "bg-teal-50 text-teal-600" },
    { id: "fungi", label: "Fungi", icon: "/images/cat-fungi.jpg", color: "bg-stone-50 text-stone-600" },
    { id: "berries", label: "Berries", icon: "/images/cat-berries.jpg", color: "bg-purple-50 text-purple-600" },
];

export default function CategoriesPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-8 pb-32">
            {/* Header */}
            <header className="px-6 pt-8 flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="w-11 h-11 bg-white rounded-full flex items-center justify-center premium-shadow"
                >
                    <ChevronLeft size={20} className="text-foreground" />
                </button>
                <h1 className="text-xl font-bold text-foreground">Categories</h1>
                <button className="w-11 h-11 bg-white rounded-full flex items-center justify-center premium-shadow">
                    <Search size={20} className="text-foreground" />
                </button>
            </header>

            {/* Categories Grid */}
            <div className="px-6 grid grid-cols-4 gap-x-4 gap-y-8">
                {categories.map((cat) => (
                    <CategoryItem key={cat.label} {...cat} />
                ))}
            </div>

            {/* Seasonal Picks (Placeholder) */}
            <section className="px-6 flex flex-col gap-4 mt-4">
                <h2 className="text-lg font-bold text-foreground px-1">Seasonal Picks</h2>
                <div className="bg-primary/5 rounded-[2.5rem] p-8 border border-primary/10 flex flex-col gap-4 relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Winter Specials</span>
                        <h3 className="text-xl font-bold text-foreground leading-tight">Fresh Root Vegetables<br />Harvest Bundle</h3>
                        <button className="flex items-center gap-2 text-xs font-bold text-primary mt-2">
                            Explore Bundle <MoveRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                    {/* Decorative icons */}
                    <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-20 group-hover:rotate-12 transition-transform duration-500 scale-150">
                        <span className="text-6xl">🥕</span>
                    </div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full" />
                </div>
            </section>
        </div>
    );
}
