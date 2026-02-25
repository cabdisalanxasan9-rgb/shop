"use client";

import React, { useState } from "react";
import { Heart, Plus, Minus, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

import { useCart } from "@/context/CartContext";

interface ProductCardProps {
    id?: string;
    title: string;
    price: number;
    unit: string;
    image: string;
    isFavorite?: boolean;
}

export default function ProductCard({ id = "1", title, price, unit, image, isFavorite: initialFavorite = false }: ProductCardProps) {
    const [isFavorite, setIsFavorite] = useState(initialFavorite);
    const [quantity, setQuantity] = useState(1);
    const [imageSrc, setImageSrc] = useState(image);
    const { addToCart } = useCart();

    React.useEffect(() => {
        setImageSrc(image);
    }, [image]);

    const handleAddToCart = () => {
        addToCart({ id, title, price, unit, image }, quantity);
    };

    return (
        <div className="bg-card rounded-[2.5rem] p-4 flex flex-col gap-3 premium-shadow group hover:translate-y-[-4px] transition-all duration-300">
            <Link href={`/product/${id}`} className="block relative h-40 w-full rounded-3xl overflow-hidden mb-1">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    onError={() => setImageSrc("/images/veg-tomato.jpg")}
                />
                {/* Favorite Toggle */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsFavorite(!isFavorite);
                    }}
                    className="absolute top-3 right-3 w-9 h-9 bg-card/90 backdrop-blur-sm rounded-xl flex items-center justify-center premium-shadow transition-colors active:scale-90"
                >
                    <Heart size={18} className={cn(isFavorite ? "fill-red-500 text-red-500" : "text-subtitle")} />
                </button>
            </Link>

            <Link href={`/product/${id}`} className="flex flex-col gap-1 px-1">
                <h3 className="text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-xs font-bold text-primary">
                    ${price.toFixed(2)} <span className="text-[10px] font-bold text-subtitle uppercase ml-0.5">/ {unit}</span>
                </p>
            </Link>

            <div className="flex flex-col gap-3 mt-1 px-1">
                <div className="flex items-center justify-between bg-background rounded-xl p-1.5 h-11">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-primary hover:bg-card transition-colors"
                    >
                        <Minus size={14} />
                    </button>
                    <span className="text-xs font-bold text-foreground">{quantity} {unit}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-primary hover:bg-card transition-colors"
                    >
                        <Plus size={14} />
                    </button>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="w-full h-11 bg-primary text-white rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all hover:bg-primary-dark active:scale-[0.98] premium-shadow group/btn"
                >
                    <ShoppingCart size={16} className="transition-transform group-hover/btn:-translate-y-0.5" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
