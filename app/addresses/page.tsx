"use client";

import React, { useState } from "react";
import { ChevronLeft, MapPin, Plus, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Mock data
const addresses = [
    {
        id: 1,
        title: "Home",
        details: "Maka Al-Mukarama Street, Waberi District, Mogadishu",
        isDefault: true
    },
    {
        id: 2,
        title: "Office",
        details: "KM4 Junction, Hodan District, Mogadishu",
        isDefault: false
    }
];

export default function AddressesPage() {
    const router = useRouter();
    const [selectedAddress, setSelectedAddress] = useState(addresses[0].id);

    return (
        <div className="flex flex-col gap-6 pb-24 bg-background min-h-screen">
            {/* Header */}
            <header className="px-6 pt-8 pb-4 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10">
                <button
                    onClick={() => router.back()}
                    className="w-11 h-11 bg-white rounded-full flex items-center justify-center premium-shadow"
                >
                    <ChevronLeft size={20} className="text-foreground" />
                </button>
                <h1 className="text-xl font-bold text-foreground">Addresses</h1>
                <button className="w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center premium-shadow hover:bg-primary-dark transition-colors">
                    <Plus size={20} />
                </button>
            </header>

            {/* Address List */}
            <div className="px-6 flex flex-col gap-4">
                {addresses.map((address) => (
                    <div
                        key={address.id}
                        onClick={() => setSelectedAddress(address.id)}
                        className={cn(
                            "bg-white rounded-[2.5rem] p-6 flex items-start gap-4 premium-shadow cursor-pointer transition-all border-2 relative overflow-hidden",
                            selectedAddress === address.id ? "border-primary bg-primary/[0.02]" : "border-transparent hover:border-black/5"
                        )}
                    >
                        <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
                            selectedAddress === address.id ? "bg-primary text-white" : "bg-black/5 text-subtitle"
                        )}>
                            <MapPin size={20} />
                        </div>

                        <div className="flex flex-col flex-1 gap-1">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-foreground text-sm">{address.title}</h3>
                                {address.isDefault && (
                                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Default</span>
                                )}
                            </div>
                            <p className="text-xs text-subtitle font-medium leading-relaxed pr-8">
                                {address.details}
                            </p>
                        </div>

                        {selectedAddress === address.id && (
                            <div className="absolute top-6 right-6 text-primary">
                                <Check size={18} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Empty State / Add New Hint */}
            <div className="px-10 py-8 text-center opacity-40">
                <p className="text-xs font-bold text-subtitle">Tap + to add a new location</p>
            </div>

            {/* Save Button */}
            <div className="fixed bottom-6 left-6 right-6">
                <button
                    onClick={() => router.back()}
                    className="w-full h-14 bg-primary text-white rounded-2xl flex items-center justify-center font-bold premium-shadow hover:bg-primary-dark transition-all active:scale-[0.98]"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
