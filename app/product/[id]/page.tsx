"use client";

import React, { useState } from "react";
import {
    ChevronLeft,
    Share2,
    Heart,
    Leaf,
    Calendar,
    Activity,
    CheckCircle2,
    ShieldCheck,
    Apple,
    ShoppingCart,
    Plus,
    Minus
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductsContext";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Icon mapping for dynamic features
const iconMap: Record<string, any> = {
    Leaf,
    Calendar,
    Apple,
    Activity,
    ShieldCheck,
    CheckCircle2,
    Heart,
};

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { addToCart } = useCart();
    const { products } = useProducts();
    const { id } = React.use(params);
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    // Find the product by ID from global state
    const product = products.find(p => p.id === id);

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-background">
                <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center text-4xl mb-4">
                    🔍
                </div>
                <h1 className="text-xl font-bold text-foreground mb-2">Product Not Found</h1>
                <p className="text-sm text-subtitle mb-8 max-w-[250px]">
                    We couldn't find the product you're looking for. It may have been removed or moved.
                </p>
                <button
                    onClick={() => router.push("/")}
                    className="bg-primary text-white font-bold py-3 px-8 rounded-2xl premium-shadow"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    // Default features if none specified
    const displayFeatures = product.features || [
        { icon: Leaf, label: "ORIGIN", value: "Fresh Farm" },
        { icon: Calendar, label: "SHELF LIFE", value: "5-7 Days" },
        { icon: Apple, label: "VITAMINS", value: "A, C, K" },
    ];

    const displayHighlights = product.highlights || ["100% Organic & Fresh", "Harvested daily", "No synthetic pesticides"];
    const displayBenefits = product.benefits || [
        { title: "Heart Health", description: "Lycopene-rich superfood", icon: Heart },
        { title: "Immune Support", description: "High antioxidant content", icon: Activity },
    ];

    const totalPrice = (product.price * quantity).toFixed(2);

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            unit: product.unit,
            image: product.image
        }, quantity);
        router.push("/cart");
    };

    return (
        <div className="flex flex-col bg-background min-h-screen pb-32">
            {/* Product Image Stage */}
            <div className="relative h-[450px] w-full">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                />

                {/* Overlay Actions */}
                <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start">
                    <button
                        onClick={() => router.back()}
                        className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center premium-shadow active:scale-90 transition-transform"
                    >
                        <ChevronLeft size={24} className="text-foreground" />
                    </button>

                    <div className="flex gap-3">
                        <button className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center premium-shadow active:scale-90 transition-transform">
                            <Share2 size={22} className="text-foreground" />
                        </button>
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center premium-shadow active:scale-90 transition-transform"
                        >
                            <Heart size={22} className={cn(isFavorite ? "fill-red-500 text-red-500" : "text-foreground")} />
                        </button>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="absolute bottom-6 right-6">
                    <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-xl shadow-lg shadow-black/20 uppercase tracking-widest">
                        Harvested Today
                    </span>
                </div>
            </div>

            {/* Product Title & Price */}
            <div className="px-6 -mt-8 relative z-10 bg-background rounded-t-[3rem] pt-10 flex flex-col gap-6">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                            {product.title}
                        </h1>
                        <div className="flex items-center gap-2 text-primary">
                            <ShieldCheck size={16} />
                            <span className="text-sm font-bold tracking-tight">Pesticide Free</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-3xl font-extrabold text-primary">${product.price.toFixed(2)}</span>
                        <span className="text-xs font-bold text-subtitle uppercase">per {product.unit}</span>
                    </div>
                </div>

                {/* Quantity Selector Box */}
                <div className="bg-primary-light/50 border border-primary/5 rounded-3xl p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <Leaf size={24} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-foreground">Quantity</span>
                            <span className="text-[10px] font-bold text-subtitle uppercase tracking-wider">Select weight in kg</span>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-1.5 flex items-center gap-6 premium-shadow ring-1 ring-black/5">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-subtitle hover:bg-primary-light transition-colors"
                        >
                            <Minus size={18} />
                        </button>
                        <span className="text-lg font-bold w-4 text-center">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white hover:bg-primary-dark transition-colors"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-3 gap-4">
                    {displayFeatures.map((feature, idx) => {
                        const Icon = typeof feature.icon === 'string' ? (iconMap[feature.icon] || Leaf) : (feature.icon || Leaf);
                        return (
                            <div key={idx} className="bg-white rounded-3xl p-4 flex flex-col items-center gap-2 premium-shadow ring-1 ring-black/5 text-center">
                                <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center text-primary">
                                    <Icon size={20} />
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[9px] font-bold text-subtitle uppercase tracking-widest">{feature.label}</span>
                                    <span className="text-[11px] font-extrabold text-foreground">{feature.value}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Description Section */}
                <div className="flex flex-col gap-4 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-primary rounded-full"></div>
                        <h2 className="text-xl font-bold text-foreground tracking-tight">Product Information</h2>
                    </div>
                    <p className="text-sm leading-relaxed text-subtitle font-medium">
                        {product.description || "Freshly sourced high-quality product, grown with care to ensure the best taste and nutrient content for your health."}
                    </p>
                    <div className="flex flex-col gap-3 mt-2">
                        {displayHighlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <CheckCircle2 size={18} className="text-primary shrink-0" />
                                <span className="text-sm font-semibold text-foreground/80">{highlight}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Health Benefits Scroller */}
                <div className="flex overflow-x-auto gap-4 py-4 no-scrollbar -mx-6 px-6">
                    {displayBenefits.map((benefit, idx) => {
                        const BenefitIcon = typeof benefit.icon === 'string' ? (iconMap[benefit.icon] || ShieldCheck) : (benefit.icon || ShieldCheck);
                        return (
                            <div key={idx} className="min-w-[180px] bg-primary-light/30 border border-primary/5 rounded-3xl p-5 flex flex-col gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                    <BenefitIcon size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-foreground">{benefit.title}</span>
                                    <span className="text-[11px] font-bold text-subtitle">{benefit.description}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 max-w-screen-xl mx-auto bg-white/90 backdrop-blur-xl border-t border-black/5 p-6 flex items-center justify-between z-50">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-subtitle uppercase tracking-widest leading-none mb-1">Total Price</span>
                    <span className="text-2xl font-black text-primary tracking-tight">${totalPrice}</span>
                </div>
                <button
                    onClick={handleAddToCart}
                    className="bg-primary text-white h-14 px-12 rounded-[1.25rem] font-bold flex items-center gap-3 premium-shadow transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] ring-4 ring-primary/10"
                >
                    <ShoppingCart size={20} />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    );
}
