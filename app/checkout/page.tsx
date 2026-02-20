"use client";

import React, { useState } from "react";
import { ChevronLeft, MapPin, CreditCard, Wallet, Truck, Plus, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
    const router = useRouter();
    const { total, subtotal, deliveryFee } = useCart();
    const [selectedMethod, setSelectedMethod] = useState("standard");
    const [selectedPayment, setSelectedPayment] = useState("card");
    const [cardDetails, setCardDetails] = useState({
        name: "",
        number: "",
        expiry: "",
        cvv: "",
    });

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
                <h1 className="text-xl font-bold text-foreground">Checkout</h1>
                <div className="w-11" />
            </header>

            {/* Shipping Address */}
            <section className="px-6 flex flex-col gap-4">
                <div className="flex justify-between items-center px-1">
                    <h2 className="text-sm font-bold text-foreground">Shipping Address</h2>
                    <button className="text-primary text-xs font-bold">Edit</button>
                </div>
                <div className="bg-white rounded-[2rem] p-6 flex items-center gap-4 premium-shadow border border-black/5">
                    <div className="w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center text-primary">
                        <MapPin size={24} />
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <h3 className="font-bold text-sm">Home</h3>
                        <p className="text-xs text-subtitle leading-relaxed">123 Orchard Lane, Maplewood, NJ...</p>
                    </div>
                </div>
            </section>

            {/* Delivery Method */}
            <section className="px-6 flex flex-col gap-4">
                <h2 className="text-sm font-bold text-foreground px-1">Delivery Method</h2>
                <div className="flex flex-col gap-3">
                    {[
                        { id: "standard", label: "Standard Delivery", time: "Arrival in 2-3 hours", price: 2.00 },
                        { id: "express", label: "Express Delivery", time: "Arrival in 30-45 mins", price: 5.00 }
                    ].map((method) => (
                        <button
                            key={method.id}
                            onClick={() => setSelectedMethod(method.id)}
                            className={cn(
                                "bg-white rounded-[2rem] p-6 flex items-center justify-between transition-all border",
                                selectedMethod === method.id ? "border-primary ring-1 ring-primary/20" : "border-transparent premium-shadow"
                            )}
                        >
                            <div className="flex flex-col items-start gap-1">
                                <span className="font-bold text-sm text-foreground">{method.label}</span>
                                <span className="text-[11px] text-subtitle">{method.time}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-sm text-primary">${method.price.toFixed(2)}</span>
                                <div className={cn(
                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                                    selectedMethod === method.id ? "border-primary bg-primary" : "border-subtitle/20"
                                )}>
                                    {selectedMethod === method.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Payment Method */}
            <section className="px-6 flex flex-col gap-4">
                <h2 className="text-sm font-bold text-foreground px-1">Payment Method</h2>
                <div className="flex flex-col gap-3">
                    {[
                        { id: "card", label: "Credit / Debit Card", info: "**** **** **** 4242", icon: CreditCard },
                        { id: "zaad", label: "Zaad / Sahal", info: "Mobile Money Transfer", icon: Wallet },
                        { id: "cod", label: "Cash on Delivery", info: "Pay when you receive", icon: Truck }
                    ].map((method) => (
                        <button
                            key={method.id}
                            onClick={() => setSelectedPayment(method.id)}
                            className={cn(
                                "bg-white rounded-[2rem] p-6 flex items-center justify-between transition-all border",
                                selectedPayment === method.id ? "border-primary ring-1 ring-primary/20" : "border-transparent premium-shadow"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center text-primary group-hover:bg-primary-light transition-colors">
                                    <method.icon size={20} />
                                </div>
                                <div className="flex flex-col items-start gap-1">
                                    <span className="font-bold text-sm text-foreground">{method.label}</span>
                                    <span className="text-[11px] text-subtitle">{method.info}</span>
                                </div>
                            </div>
                            <div className={cn(
                                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                                selectedPayment === method.id ? "border-primary bg-primary" : "border-subtitle/20"
                            )}>
                                {selectedPayment === method.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Card payment form */}
                {selectedPayment === "card" && (
                    <div className="mt-2 bg-primary/5 border border-primary/10 rounded-4xl p-5 flex flex-col gap-4">
                        <h3 className="text-xs font-bold text-foreground uppercase tracking-[0.2em]">
                            Card Details
                        </h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-semibold text-subtitle">Name on Card</label>
                                <input
                                    type="text"
                                    value={cardDetails.name}
                                    onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Full name as on card"
                                    className="w-full h-10 px-3 rounded-xl border border-black/5 bg-white text-xs text-foreground placeholder:text-subtitle focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-semibold text-subtitle">Card Number</label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={cardDetails.number}
                                    onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                                    placeholder="1234 5678 9012 3456"
                                    className="w-full h-10 px-3 rounded-xl border border-black/5 bg-white text-xs text-foreground placeholder:text-subtitle focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-1 flex flex-col gap-1.5">
                                    <label className="text-[11px] font-semibold text-subtitle">Expiry</label>
                                    <input
                                        type="text"
                                        value={cardDetails.expiry}
                                        onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                                        placeholder="MM / YY"
                                        className="w-full h-10 px-3 rounded-xl border border-black/5 bg-white text-xs text-foreground placeholder:text-subtitle focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div className="w-24 flex flex-col gap-1.5">
                                    <label className="text-[11px] font-semibold text-subtitle">CVV</label>
                                    <input
                                        type="password"
                                        inputMode="numeric"
                                        value={cardDetails.cvv}
                                        onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                                        placeholder="***"
                                        className="w-full h-10 px-3 rounded-xl border border-black/5 bg-white text-xs text-foreground placeholder:text-subtitle focus:outline-none focus:border-primary"
                                    />
                                </div>
                            </div>
                            <p className="text-[10px] text-subtitle">
                                Your card information is used only to simulate payment in this demo. No real charge will be made.
                            </p>
                        </div>
                    </div>
                )}

                {/* Zaad / Sahal payment steps */}
                {selectedPayment === "zaad" && (
                    <div className="mt-2 bg-primary/5 border border-primary/10 rounded-4xl p-5 flex flex-col gap-3">
                        <h3 className="text-xs font-bold text-foreground uppercase tracking-[0.2em]">
                            Zaad / Sahal Payment Steps
                        </h3>
                        <ol className="space-y-2 text-[11px] text-subtitle">
                            <li className="flex gap-2">
                                <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold mt-0.5">
                                    1
                                </span>
                                <span>
                                    Ka fur telefoonkaaga adeegga <span className="font-semibold text-primary">Zaad</span> ama{" "}
                                    <span className="font-semibold text-primary">Sahal</span>.
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold mt-0.5">
                                    2
                                </span>
                                <span>
                                    Dooro menu‑ga <span className="font-semibold">"Send Money / Bixi lacag"</span> oo geli nambar ka‑qaadashada ganacsiga.
                                    <span className="block font-semibold text-foreground mt-1">
                                        Merchant Number: <span className="text-primary">61 000 0000</span>
                                    </span>
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold mt-0.5">
                                    3
                                </span>
                                <span>
                                    Geli lacagta <span className="font-semibold">Total Amount</span> ee kore ka muuqata, kadib xaqiiji macaamilka.
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold mt-0.5">
                                    4
                                </span>
                                <span>
                                    Marka aad hesho SMS‑ka xaqiijinta, riix badhanka{" "}
                                    <span className="font-semibold text-primary">"Place Order"</span> si aad u dhammaystirto dalabka.
                                </span>
                            </li>
                        </ol>
                    </div>
                )}
            </section>

            {/* Order Summary */}
            <section className="px-6 flex flex-col gap-6">
                <h2 className="text-sm font-bold text-foreground px-1">Order Summary</h2>
                <div className="bg-white rounded-[2.5rem] p-8 flex flex-col gap-4 premium-shadow">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-subtitle font-medium">Subtotal</span>
                        <span className="font-bold text-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-subtitle font-medium">Delivery Fee</span>
                        <span className="font-bold text-foreground">${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-subtitle font-medium">Service Fee</span>
                        <span className="font-bold text-foreground">$0.50</span>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-foreground">Total Amount</span>
                        <span className="text-xl font-bold text-primary">${(total + 0.50).toFixed(2)}</span>
                    </div>
                </div>
            </section>

            {/* Place Order Button */}
            <div className="px-6 mt-4">
                <button
                    onClick={() => router.push("/orders")}
                    className="w-full h-16 bg-primary text-white rounded-2xl flex items-center justify-center gap-3 font-bold premium-shadow group active:scale-[0.98] transition-all"
                >
                    Place Order
                    <MoveRight size={20} className="transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </div>
    );
}
