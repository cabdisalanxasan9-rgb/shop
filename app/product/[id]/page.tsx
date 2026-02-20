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
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { addToCart } = useCart();
    const { id } = React.use(params);
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    // Mock products data (should be in a shared lib in real app)
    const products = [
        {
            id: "p1",
            title: "Fresh Red Tomatoes",
            price: 2.50,
            unit: "kg",
            image: "/images/veg-tomato.jpg",
            description: "These vine-ripened tomatoes are locally grown and bursting with flavor. Rich in lycopene and vitamin C, they are perfect for salads, sauces, or just eating raw.",
            tags: ["Non-GMO", "Vine-Ripened"],
            features: [
                { icon: Leaf, label: "ORIGIN", value: "Tuscany Farm" },
                { icon: Calendar, label: "SHELF LIFE", value: "4-6 Days" },
                { icon: Apple, label: "VITAMINS", value: "C, A, K" },
            ],
            highlights: ["Hand-picked at peak ripeness", "No synthetic pesticides", "Rich in antioxidants"],
            benefits: [
                { title: "Heart Health", description: "Lycopene-rich superfood", icon: Heart },
                { title: "Skin Health", description: "Supports collagen production", icon: Activity },
            ]
        },
        {
            id: "p2",
            title: "Organic Broccoli",
            price: 3.20,
            unit: "pc",
            image: "/images/veg-broccoli.jpg",
            description: "Our organic broccoli is locally sourced and harvested daily to ensure peak freshness. It's packed with essential nutrients, including high concentrations of Vitamin C and Vitamin K.",
            tags: ["Pesticide Free", "Organic"],
            features: [
                { icon: Leaf, label: "ORIGIN", value: "Local Green" },
                { icon: Calendar, label: "SHELF LIFE", value: "5-7 Days" },
                { icon: Apple, label: "VITAMINS", value: "C, K, A" },
            ],
            highlights: ["100% Certified Organic", "High in dietary fiber", "Sourced from local farms"],
            benefits: [
                { title: "Immune Support", description: "High Vitamin C content", icon: ShieldCheck },
                { title: "Digestion", description: "Fiber-rich superfood", icon: Activity },
            ]
        },
        {
            id: "p3",
            title: "Sweet Carrots",
            price: 1.80,
            unit: "kg",
            image: "/images/veg-carrot.jpg",
            description: "Crunchy, sweet, and vibrant carrots. These root vegetables are an excellent source of beta carotene, fiber, vitamin K1, and potassium.",
            tags: ["Sweet & Crisp", "High Beta Carotene"],
            features: [
                { icon: Leaf, label: "ORIGIN", value: "Root Valley" },
                { icon: Calendar, label: "SHELF LIFE", value: "10-14 Days" },
                { icon: Apple, label: "VITAMINS", value: "A, K, B6" },
            ],
            highlights: ["Triple washed and ready to use", "Sourced from organic soil", "Great for vision and immunity"],
            benefits: [
                { title: "Vision Support", description: "Rich in Beta Carotene", icon: ShieldCheck },
                { title: "Skin Glow", description: "Healthy vitamin A levels", icon: Activity },
            ]
        },
        {
            id: "p4",
            title: "Bell Peppers",
            price: 4.50,
            unit: "kg",
            image: "/images/veg-peppers-mix.jpg",
            description: "Colorful and crisp bell peppers. These peppers are incredibly versatile and packed with vitamin C and other antioxidants.",
            tags: ["Extra Sweet", "Rich Color"],
            features: [
                { icon: Leaf, label: "ORIGIN", value: "Sunny Ridge" },
                { icon: Calendar, label: "SHELF LIFE", value: "7-9 Days" },
                { icon: Apple, label: "VITAMINS", value: "C, E, A" },
            ],
            highlights: ["Crunchy texture", "Excellent for roasting or fresh", "Low calorie superfood"],
            benefits: [
                { title: "Anti-Inflammatory", description: "High antioxidant content", icon: Heart },
                { title: "Immunity", description: "Mega-dose of Vitamin C", icon: ShieldCheck },
            ]
        },
        {
            id: "p5",
            title: "Organic Cucumbers",
            price: 1.20,
            unit: "pc",
            image: "/images/veg-cucumber.jpg",
            description: "Cool and refreshing organic cucumbers. Perfect for salads, pickling, or a healthy low-calorie snack.",
            tags: ["Cool & Crisp", "High Hydration"],
            features: [
                { icon: Leaf, label: "ORIGIN", value: "River Valley" },
                { icon: Calendar, label: "SHELF LIFE", value: "5-6 Days" },
                { icon: Apple, label: "VITAMINS", value: "K, C, B1" },
            ],
            highlights: ["High water content", "Thin skin, no need to peel", "Grown without pesticides"],
            benefits: [
                { title: "Hydration", description: "95% water content", icon: Activity },
                { title: "Skin Health", description: "Soothes and rejuvenates", icon: ShieldCheck },
            ]
        },
        {
            id: "p6",
            title: "Fresh Garlic",
            price: 0.50,
            unit: "pc",
            image: "/images/veg-garlic.jpg",
            description: "Pungent and flavorful fresh garlic. An essential ingredient in kitchens worldwide, known for its health benefits.",
            tags: ["Strong Flavor", "Natural Antibiotic"],
            features: [
                { icon: Leaf, label: "ORIGIN", value: "Garlic Hills" },
                { icon: Calendar, label: "SHELF LIFE", value: "30-60 Days" },
                { icon: Apple, label: "VITAMINS", value: "C, B6, Manganese" },
            ],
            highlights: ["Tight bulbs for longevity", "Aromatic and sharp", "Supports cardiovascular health"],
            benefits: [
                { title: "Heart Health", description: "Lowers cholesterol", icon: Heart },
                { title: "Immunity", description: "Boosts white blood cells", icon: ShieldCheck },
            ]
        },
        {
            id: "p7",
            title: "Yellow Onions",
            price: 1.50,
            unit: "kg",
            image: "/images/veg-onion.jpg",
            description: "Versatile yellow onions with a rich, complex flavor that sweetens when cooked. A staple for soups and stews.",
            tags: ["Staple Ingredient", "Rich Flavor"],
            features: [
                { icon: Leaf, label: "ORIGIN", value: "Local Plains" },
                { icon: Calendar, label: "SHELF LIFE", value: "20-30 Days" },
                { icon: Apple, label: "VITAMINS", value: "C, B6, Folate" },
            ],
            highlights: ["Long shelf life", "Crisp when raw, sweet when caramelized", "Sourced from reliable growers"],
            benefits: [
                { title: "Anti-Bacterial", description: "Fights infections", icon: ShieldCheck },
                { title: "Digestion", description: "Prebiotic fiber source", icon: Activity },
            ]
        },
        {
            id: "p8",
            title: "Baby Spinach",
            price: 2.80,
            unit: "kg",
            image: "/images/veg-spinach.jpg",
            description: "Tender and nutrient-dense baby spinach. Excellent source of iron and vitamins, perfect for salads or quick sautés.",
            tags: ["Nutrient Dense", "Freshly Picked"],
            features: [
                { icon: Leaf, label: "ORIGIN", value: "Leafy Acres" },
                { icon: Calendar, label: "SHELF LIFE", value: "3-5 Days" },
                { icon: Apple, label: "VITAMINS", value: "K, A, C, Iron" },
            ],
            highlights: ["Pre-washed and ready to eat", "Young, tender leaves", "Grown in nutrient-rich soil"],
            benefits: [
                { title: "Energy Boost", description: "High iron content", icon: Activity },
                { title: "Bone Health", description: "Rich in Vitamin K", icon: ShieldCheck },
            ]
        },
        {
            id: "p9",
            title: "Fresh Eggplant",
            price: 2.00,
            unit: "kg",
            image: "/images/veg-eggplant.jpg",
            description: "Glossy, deep purple eggplants with a creamy texture when cooked. These are excellent for roasting, grilling, or making traditional dishes like baba ganoush.",
            tags: ["High Fiber", "Low Calorie"],
            features: [
                { icon: Leaf, label: "ORIGIN", value: "Sunny Meadows" },
                { icon: Calendar, label: "SHELF LIFE", value: "5-7 Days" },
                { icon: Apple, label: "VITAMINS", value: "B6, K, Potassium" },
            ],
            highlights: ["Grown without chemical pesticides", "Rich in antioxidants", "Perfect meat substitute"],
            benefits: [
                { title: "Heart Health", description: "Contains fiber and potassium", icon: ShieldCheck },
                { title: "Weight Loss", description: "Very low in calories", icon: Activity },
            ]
        },
        {
            id: "p10",
            title: "Organic Potatoes",
            price: 1.40,
            unit: "kg",
            image: "/images/veg-potato.jpg",
            description: "Solid, earthy organic potatoes. These all-purpose potatoes are great for mashing, roasting, or frying.",
            tags: ["Energy Source", "All-Purpose"],
            features: [
                { icon: Leaf, label: "ORIGIN", value: "Mountain Root" },
                { icon: Calendar, label: "SHELF LIFE", value: "30-45 Days" },
                { icon: Apple, label: "VITAMINS", value: "C, B6, Potassium" },
            ],
            highlights: ["Grown in mineral-rich soil", "Versatile for any dish", "Naturally gluten-free"],
            benefits: [
                { title: "Energy Source", description: "Complex carbohydrates", icon: Activity },
                { title: "Fullness", description: "High satiety index", icon: ShieldCheck },
            ]
        },
        {
            id: "p11",
            title: "Wild Mushrooms",
            price: 5.50,
            unit: "kg",
            image: "/images/veg-mushroom.jpg",
            description: "Earthy and aromatic wild mushrooms. These provide a rich, savory flavor known as umami and are a great meat substitute.",
            tags: ["Umami Rich", "Wild Harvest"],
            features: [
                { icon: Leaf, label: "ORIGIN", value: "Forest Edge" },
                { icon: Calendar, label: "SHELF LIFE", value: "3-5 Days" },
                { icon: Apple, label: "VITAMINS", value: "D, B-Complex" },
            ],
            highlights: ["Grown in natural shade", "Rich in Vitamin D", "Intense savory flavor"],
            benefits: [
                { title: "Immune Support", description: "Rich in beta-glucans", icon: ShieldCheck },
                { title: "Metabolism", description: "High B vitamin content", icon: Activity },
            ]
        },
        {
            id: "p12",
            title: "Bell Pepper Mix",
            price: 4.80,
            unit: "kg",
            image: "/images/veg-peppers-mix.jpg",
            description: "A vibrant medley of fresh bell peppers. Perfect for fajitas, roasting, or fresh dipping.",
            tags: ["High Vitamin C", "Colorful Mix"],
            features: [
                { icon: Leaf, label: "ORIGIN", value: "Greenhouse Elite" },
                { icon: Calendar, label: "SHELF LIFE", value: "5-8 Days" },
                { icon: Apple, label: "VITAMINS", value: "A, C" },
            ],
            highlights: ["Sweet and crunchy", "Excellent source of antioxidants", "Vibrant addition to any meal"],
            benefits: [
                { title: "Skin Health", description: "Rich in Vitamin C", icon: ShieldCheck },
                { title: "Indigestion", description: "Lowers acidity", icon: Activity },
            ]
        },
        {
            id: "p13",
            title: "Organic Rolled Oats",
            price: 3.50,
            unit: "kg",
            image: "/images/veg-oats.jpg",
            description: "High-quality organic rolled oats. A Heart-healthy staple for breakfast porridge, baking, or granola.",
            tags: ["Heart Healthy", "Slow Energy"],
            features: [
                { icon: Leaf, label: "ORIGIN", value: "Northern Fields" },
                { icon: Calendar, label: "SHELF LIFE", value: "6-12 Months" },
                { icon: Apple, label: "VITAMINS", value: "B1, Iron, Magnesium" },
            ],
            highlights: ["100% whole grain", "Excellent source of fiber", "Quick and easy to prepare"],
            benefits: [
                { title: "Heart Health", description: "Reduces cholesterol", icon: Heart },
                { title: "Digestion", description: "High in beta-glucan fiber", icon: Activity },
            ]
        },
    ];

    // Find the product by ID or default to p2 (Broccoli) if not found
    const product = products.find(p => p.id === id) || products[1];

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
                    {product.features.map((feature, idx) => (
                        <div key={idx} className="bg-white rounded-3xl p-4 flex flex-col items-center gap-2 premium-shadow ring-1 ring-black/5 text-center">
                            <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center text-primary">
                                <feature.icon size={20} />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[9px] font-bold text-subtitle uppercase tracking-widest">{feature.label}</span>
                                <span className="text-[11px] font-extrabold text-foreground">{feature.value}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Description Section */}
                <div className="flex flex-col gap-4 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-primary rounded-full"></div>
                        <h2 className="text-xl font-bold text-foreground tracking-tight">Product Information</h2>
                    </div>
                    <p className="text-sm leading-relaxed text-subtitle font-medium">
                        {product.description}
                    </p>
                    <div className="flex flex-col gap-3 mt-2">
                        {product.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <CheckCircle2 size={18} className="text-primary shrink-0" />
                                <span className="text-sm font-semibold text-foreground/80">{highlight}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Health Benefits Scroller */}
                <div className="flex overflow-x-auto gap-4 py-4 no-scrollbar -mx-6 px-6">
                    {product.benefits.map((benefit, idx) => (
                        <div key={idx} className="min-w-[180px] bg-primary-light/30 border border-primary/5 rounded-3xl p-5 flex flex-col gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                <benefit.icon size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-foreground">{benefit.title}</span>
                                <span className="text-[11px] font-bold text-subtitle">{benefit.description}</span>
                            </div>
                        </div>
                    ))}
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
