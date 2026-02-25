"use client";

import React from "react";
import { ChevronLeft, Trash2, Plus, Minus, MoveRight, Info, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import SafeImage from "@/components/SafeImage";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, subtotal, deliveryFee, total } = useCart();
    const router = useRouter();

    return (
        <div className="flex flex-col gap-8 min-h-screen">
            {/* Header */}
            <header className="px-6 pt-8 flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="w-11 h-11 bg-white rounded-full flex items-center justify-center premium-shadow"
                >
                    <ChevronLeft size={20} className="text-foreground" />
                </button>
                <h1 className="text-xl font-bold text-foreground">My Cart</h1>
                <div className="w-11" /> {/* Spacer */}
            </header>

            {/* Cart Items */}
            <div className="flex-1 px-6 flex flex-col gap-4">
                {cart.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
                        <div className="w-24 h-24 bg-primary-light rounded-full flex items-center justify-center text-primary">
                            <ShoppingBag size={40} />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <h3 className="font-bold text-lg">Your cart is empty</h3>
                            <p className="text-sm text-subtitle">Looks like you haven't added anything yet.</p>
                        </div>
                        <Link
                            href="/"
                            className="mt-4 bg-primary text-white px-8 py-3 rounded-2xl font-bold text-sm premium-shadow"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    cart.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-[2rem] p-4 flex gap-4 premium-shadow relative group"
                        >
                            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-background flex-shrink-0 relative">
                                <SafeImage
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                    sizes="96px"
                                    fallbackSrc="/images/veg-tomato.jpg"
                                />
                            </div>

                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <h3 className="font-bold text-sm text-foreground">{item.title}</h3>
                                        <p className="text-primary font-bold">${item.price.toFixed(2)}<span className="text-[10px] text-subtitle font-normal">/{item.unit}</span></p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-2 text-subtitle hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 bg-background rounded-xl p-1 px-2 h-9">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="text-primary hover:bg-white p-1 rounded-lg transition-colors"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="text-xs font-bold text-foreground w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="text-primary hover:bg-white p-1 rounded-lg transition-colors"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <p className="font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Summary Footer */}
            {cart.length > 0 && (
                <div className="bg-white rounded-t-[3rem] p-8 pb-12 premium-shadow flex flex-col gap-6 sticky bottom-0 border-t border-black/5">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <span className="text-subtitle font-medium">Subtotal</span>
                            <span className="font-bold text-foreground">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1.5">
                                <span className="text-subtitle font-medium">Delivery Fee</span>
                                <Info size={14} className="text-subtitle/50" />
                            </div>
                            <span className="font-bold text-foreground">${deliveryFee.toFixed(2)}</span>
                        </div>
                        <div className="h-px bg-border my-1" />
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-foreground">Total Amount</span>
                            <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <Link
                        href="/checkout"
                        className="w-full h-16 bg-primary text-white rounded-2xl flex items-center justify-center gap-3 font-bold premium-shadow group active:scale-[0.98] transition-all"
                    >
                        Proceed to Checkout
                        <MoveRight size={20} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            )}
        </div>
    );
}
