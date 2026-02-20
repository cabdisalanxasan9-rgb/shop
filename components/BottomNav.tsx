"use client";

import React from "react";
import { Home, LayoutGrid, ShoppingCart, ReceiptText, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: LayoutGrid, label: "Categories", path: "/categories" },
    { icon: ShoppingCart, label: "Cart", path: "/cart", isCenter: true },
    { icon: ReceiptText, label: "Orders", path: "/orders/list" },
    { icon: User, label: "Profile", path: "/profile" },
];

export default function BottomNav() {
    const pathname = usePathname();
    const { itemCount } = useCart();

    return (
        <nav className="fixed bottom-0 left-0 right-0 md:bottom-8 md:left-1/2 md:-translate-x-1/2 md:w-fit md:min-w-[500px] md:rounded-3xl max-w-7xl mx-auto bg-card/80 backdrop-blur-xl border border-black/5 px-6 py-4 flex justify-between items-center z-50 premium-shadow">
            {navItems.map((item) => {
                const isActive = pathname === item.path;

                if (item.isCenter) {
                    return (
                        <div key={item.path} className="relative">
                            <Link
                                href={item.path}
                                className="absolute -top-12 left-1/2 -translate-x-1/2 w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white premium-shadow border-4 border-background transition-transform hover:scale-110 active:scale-95"
                            >
                                <item.icon size={24} />
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full border-2 border-white flex items-center justify-center">
                                        {itemCount}
                                    </span>
                                )}
                            </Link>
                            <span className={cn(
                                "text-[10px] font-semibold mt-8 block",
                                isActive ? "text-primary" : "text-subtitle"
                            )}>
                                {item.label}
                            </span>
                        </div>
                    );
                }

                return (
                    <Link
                        key={item.path}
                        href={item.path}
                        className="flex flex-col items-center gap-1 group"
                    >
                        <item.icon
                            size={20}
                            className={cn(
                                "transition-all group-hover:scale-110",
                                isActive ? "text-primary scale-110" : "text-subtitle"
                            )}
                        />
                        <span className={cn(
                            "text-[10px] font-semibold transition-colors",
                            isActive ? "text-primary" : "text-subtitle group-hover:text-foreground"
                        )}>
                            {item.label}
                        </span>
                        {isActive && (
                            <div className="w-1 h-1 bg-primary rounded-full mt-0.5" />
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}
