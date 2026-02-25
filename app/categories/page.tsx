"use client";

import React from "react";
import { ChevronLeft, Search, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import CategoryItem from "@/components/CategoryItem";

import { useProducts } from "@/context/ProductsContext";
import { CATEGORIES as categories } from "@/lib/products";

export default function CategoriesPage() {
    const router = useRouter();
    const { searchQuery, setSearchQuery } = useProducts();
    const [isSearching, setIsSearching] = React.useState(false);

    const filteredCategories = categories.filter(cat =>
        cat.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-8 pb-32">
            {/* Header */}
            <header className="px-6 pt-8 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="w-11 h-11 bg-white rounded-full flex items-center justify-center premium-shadow"
                    >
                        <ChevronLeft size={20} className="text-foreground" />
                    </button>
                    {!isSearching ? (
                        <h1 className="text-xl font-bold text-foreground">Categories</h1>
                    ) : (
                        <div className="flex-1 px-4">
                            <input
                                type="text"
                                autoFocus
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search categories..."
                                className="w-full h-11 bg-card rounded-xl px-4 text-sm focus:outline-none premium-shadow border border-black/5"
                            />
                        </div>
                    )}
                    <button
                        onClick={() => {
                            setIsSearching(!isSearching);
                            if (isSearching) setSearchQuery("");
                        }}
                        className={`w-11 h-11 rounded-full flex items-center justify-center premium-shadow transition-colors ${isSearching ? 'bg-primary text-white' : 'bg-white text-foreground'}`}
                    >
                        <Search size={20} />
                    </button>
                </div>
            </header>

            {/* Categories Grid */}
            <div className="px-6">
                {filteredCategories.length > 0 ? (
                    <div className="grid grid-cols-4 gap-x-4 gap-y-8">
                        {filteredCategories.map((cat) => (
                            <CategoryItem key={cat.label} {...cat} />
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center opacity-50">
                        <p className="font-bold">No categories found</p>
                    </div>
                )}
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
