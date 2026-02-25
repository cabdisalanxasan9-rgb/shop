// Centralized products data management
export interface Product {
    id: string;
    categoryId: string;
    title: string;
    price: number;
    unit: string;
    image: string;
    isFavorite?: boolean;
    description?: string;
    tags?: string[];
    features?: Array<{ icon?: string; label: string; value: string }>;
    highlights?: string[];
    benefits?: Array<{ title: string; description: string; icon?: string }>;
}

export const CATEGORIES = [
    { id: "leafy-greens", label: "Leafy Greens", icon: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=200", color: "bg-emerald-50 text-emerald-600" },
    { id: "root-vegies", label: "Root Vegies", icon: "https://images.unsplash.com/photo-1590779033100-9f60705a2f3b?auto=format&fit=crop&q=80&w=200", color: "bg-orange-50 text-orange-600" },
    { id: "peppers", label: "Peppers", icon: "https://images.unsplash.com/photo-1566232392379-afd9298e6a46?auto=format&fit=crop&q=80&w=200", color: "bg-red-50 text-red-600" },
    { id: "fruits", label: "Fruits", icon: "https://images.unsplash.com/photo-1619566639371-13ed1100293a?auto=format&fit=crop&q=80&w=200", color: "bg-yellow-50 text-yellow-600" },
    { id: "grains", label: "Grains", icon: "https://images.unsplash.com/photo-1586439702132-73016aae2449?auto=format&fit=crop&q=80&w=200", color: "bg-amber-50 text-amber-600" },
    { id: "herbs", label: "Herbs", icon: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&q=80&w=200", color: "bg-teal-50 text-teal-600" },
    { id: "fungi", label: "Fungi", icon: "https://images.unsplash.com/photo-1563212623-0df1567bc7d2?auto=format&fit=crop&q=80&w=200", color: "bg-stone-50 text-stone-600" },
    { id: "berries", label: "Berries", icon: "https://images.unsplash.com/photo-1543528176-61b2395143a4?auto=format&fit=crop&q=80&w=200", color: "bg-purple-50 text-purple-600" },
];

// Initial products data with high-quality cloud images
export const initialProducts: Product[] = [
    {
        id: "p1",
        categoryId: "fruits",
        title: "Fresh Red Tomatoes",
        price: 2.50,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600",
        isFavorite: true,
        description: "These vine-ripened tomatoes are locally grown and bursting with flavor. Rich in lycopene and vitamin C, they are perfect for salads, sauces, or just eating raw.",
        tags: ["Non-GMO", "Vine-Ripened"],
        features: [
            { icon: "Leaf", label: "ORIGIN", value: "Tuscany Farm" },
            { icon: "Calendar", label: "SHELF LIFE", value: "4-6 Days" },
            { icon: "Apple", label: "VITAMINS", value: "C, A, K" },
        ],
        highlights: ["Hand-picked at peak ripeness", "No synthetic pesticides", "Rich in antioxidants"],
        benefits: [
            { title: "Heart Health", description: "Lycopene-rich superfood" },
            { title: "Skin Health", description: "Supports collagen production" },
        ]
    },
    {
        id: "p2",
        categoryId: "leafy-greens",
        title: "Organic Broccoli",
        price: 3.20,
        unit: "pc",
        image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&q=80&w=600",
        description: "Our organic broccoli is locally sourced and harvested daily to ensure peak freshness. It's packed with essential nutrients, including high concentrations of Vitamin C and Vitamin K.",
        tags: ["Pesticide Free", "Organic"],
        features: [
            { icon: "Leaf", label: "ORIGIN", value: "Local Green" },
            { icon: "Calendar", label: "SHELF LIFE", value: "5-7 Days" },
            { icon: "Apple", label: "VITAMINS", value: "C, K, A" },
        ],
        highlights: ["100% Certified Organic", "High in dietary fiber", "Sourced from local farms"],
        benefits: [
            { title: "Immune Support", description: "High Vitamin C content" },
            { title: "Digestion", description: "Fiber-rich superfood" },
        ]
    },
    {
        id: "p3",
        categoryId: "root-vegies",
        title: "Sweet Carrots",
        price: 1.80,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=600",
        description: "Crunchy, sweet, and vibrant carrots. These root vegetables are an excellent source of beta carotene, fiber, vitamin K1, and potassium.",
        tags: ["Sweet & Crisp", "High Beta Carotene"],
        features: [
            { icon: "Leaf", label: "ORIGIN", value: "Root Valley" },
            { icon: "Calendar", label: "SHELF LIFE", value: "10-14 Days" },
            { icon: "Apple", label: "VITAMINS", value: "A, K, B6" },
        ],
        highlights: ["Triple washed and ready to use", "Sourced from organic soil", "Great for vision and immunity"],
        benefits: [
            { title: "Vision Support", description: "Rich in Beta Carotene" },
            { title: "Skin Glow", description: "Healthy vitamin A levels" },
        ]
    },
    {
        id: "p4",
        categoryId: "peppers",
        title: "Bell Peppers",
        price: 4.50,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1566232392379-afd9298e6a46?auto=format&fit=crop&q=80&w=600",
        description: "Colorful and crisp bell peppers. These peppers are incredibly versatile and packed with vitamin C and other antioxidants.",
        tags: ["Extra Sweet", "Rich Color"],
        features: [
            { icon: "Leaf", label: "ORIGIN", value: "Sunny Ridge" },
            { icon: "Calendar", label: "SHELF LIFE", value: "7-9 Days" },
            { icon: "Apple", label: "VITAMINS", value: "C, E, A" },
        ],
        highlights: ["Crunchy texture", "Excellent for roasting or fresh", "Low calorie superfood"],
        benefits: [
            { title: "Anti-Inflammatory", description: "High antioxidant content" },
            { title: "Immunity", description: "Mega-dose of Vitamin C" },
        ]
    },
    {
        id: "p5",
        categoryId: "leafy-greens",
        title: "Organic Cucumbers",
        price: 1.20,
        unit: "pc",
        image: "https://images.unsplash.com/photo-1449339854873-750e6df51301?auto=format&fit=crop&q=80&w=600",
        description: "Cool and refreshing organic cucumbers. Perfect for salads, pickling, or a healthy low-calorie snack.",
        tags: ["Cool & Crisp", "High Hydration"],
        features: [
            { icon: "Leaf", label: "ORIGIN", value: "River Valley" },
            { icon: "Calendar", label: "SHELF LIFE", value: "5-6 Days" },
            { icon: "Apple", label: "VITAMINS", value: "K, C, B1" },
        ],
        highlights: ["High water content", "Thin skin, no need to peel", "Grown without pesticides"],
        benefits: [
            { title: "Hydration", description: "95% water content" },
            { title: "Skin Health", description: "Soothes and rejuvenates" },
        ]
    },
    {
        id: "p6",
        categoryId: "herbs",
        title: "Fresh Garlic",
        price: 0.50,
        unit: "pc",
        image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&q=80&w=600",
        description: "Pungent and flavorful fresh garlic. An essential ingredient in kitchens worldwide, known for its health benefits.",
        tags: ["Strong Flavor", "Natural Antibiotic"],
        features: [
            { icon: "Leaf", label: "ORIGIN", value: "Garlic Hills" },
            { icon: "Calendar", label: "SHELF LIFE", value: "30-60 Days" },
            { icon: "Apple", label: "VITAMINS", value: "C, B6, Manganese" },
        ],
        highlights: ["Tight bulbs for longevity", "Aromatic and sharp", "Supports cardiovascular health"],
        benefits: [
            { title: "Heart Health", description: "Lowers cholesterol" },
            { title: "Immunity", description: "Boosts white blood cells" },
        ]
    },
    {
        id: "p7",
        categoryId: "root-vegies",
        title: "Yellow Onions",
        price: 1.50,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=600",
        description: "Versatile yellow onions with a rich, complex flavor that sweetens when cooked. A staple for soups and stews.",
        tags: ["Staple Ingredient", "Rich Flavor"],
        features: [
            { icon: "Leaf", label: "ORIGIN", value: "Local Plains" },
            { icon: "Calendar", label: "SHELF LIFE", value: "20-30 Days" },
            { icon: "Apple", label: "VITAMINS", value: "C, B6, Folate" },
        ],
        highlights: ["Long shelf life", "Crisp when raw, sweet when caramelized", "Sourced from reliable growers"],
        benefits: [
            { title: "Anti-Bacterial", description: "Fights infections" },
            { title: "Digestion", description: "Prebiotic fiber source" },
        ]
    },
    {
        id: "p8",
        categoryId: "leafy-greens",
        title: "Baby Spinach",
        price: 2.80,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=600",
        description: "Tender and nutrient-dense baby spinach. Excellent source of iron and vitamins, perfect for salads or quick saut\u00e9s.",
        tags: ["Nutrient Dense", "Freshly Picked"],
        features: [
            { icon: "Leaf", label: "ORIGIN", value: "Leafy Acres" },
            { icon: "Calendar", label: "SHELF LIFE", value: "3-5 Days" },
            { icon: "Apple", label: "VITAMINS", value: "K, A, C, Iron" },
        ],
        highlights: ["Pre-washed and ready to eat", "Young, tender leaves", "Grown in nutrient-rich soil"],
        benefits: [
            { title: "Energy Boost", description: "High iron content" },
            { title: "Bone Health", description: "Rich in Vitamin K" },
        ]
    },
    {
        id: "p9",
        categoryId: "fruits",
        title: "Fresh Eggplant",
        price: 2.00,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1528137858148-d018f3a34494?auto=format&fit=crop&q=80&w=600",
        description: "Glossy, deep purple eggplants with a creamy texture when cooked. These are excellent for roasting, grilling, or making traditional dishes like baba ganoush.",
        tags: ["High Fiber", "Low Calorie"],
        features: [
            { icon: "Leaf", label: "ORIGIN", value: "Sunny Meadows" },
            { icon: "Calendar", label: "SHELF LIFE", value: "5-7 Days" },
            { icon: "Apple", label: "VITAMINS", value: "B6, K, Potassium" },
        ],
        highlights: ["Grown without chemical pesticides", "Rich in antioxidants", "Perfect meat substitute"],
        benefits: [
            { title: "Heart Health", description: "Contains fiber and potassium" },
            { title: "Weight Loss", description: "Very low in calories" },
        ]
    },
    {
        id: "p10",
        categoryId: "root-vegies",
        title: "Organic Potatoes",
        price: 1.40,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1518977676601-b53f02bad675?auto=format&fit=crop&q=80&w=600",
        description: "Solid, earthy organic potatoes. These all-purpose potatoes are great for mashing, roasting, or frying.",
        tags: ["Energy Source", "All-Purpose"],
        features: [
            { icon: "Leaf", label: "ORIGIN", value: "Mountain Root" },
            { icon: "Calendar", label: "SHELF LIFE", value: "30-45 Days" },
            { icon: "Apple", label: "VITAMINS", value: "C, B6, Potassium" },
        ],
        highlights: ["Grown in mineral-rich soil", "Versatile for any dish", "Naturally gluten-free"],
        benefits: [
            { title: "Energy Source", description: "Complex carbohydrates" },
            { title: "Fullness", description: "High satiety index" },
        ]
    },
    {
        id: "p11",
        categoryId: "fungi",
        title: "Wild Mushrooms",
        price: 5.50,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1504670610472-104991317221?auto=format&fit=crop&q=80&w=600",
        description: "Earthy and aromatic wild mushrooms. These provide a rich, savory flavor known as umami and are a great meat substitute.",
        tags: ["Umami Rich", "Wild Harvest"],
        features: [
            { icon: "Leaf", label: "ORIGIN", value: "Forest Edge" },
            { icon: "Calendar", label: "SHELF LIFE", value: "3-5 Days" },
            { icon: "Apple", label: "VITAMINS", value: "D, B-Complex" },
        ],
        highlights: ["Grown in natural shade", "Rich in Vitamin D", "Intense savory flavor"],
        benefits: [
            { title: "Immune Support", description: "Rich in beta-glucans" },
            { title: "Metabolism", description: "High B vitamin content" },
        ]
    },
    {
        id: "p12",
        categoryId: "peppers",
        title: "Bell Pepper Mix",
        price: 4.80,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1518977822534-7049a6feec45?auto=format&fit=crop&q=80&w=600",
        description: "A vibrant medley of fresh bell peppers. Perfect for fajitas, roasting, or fresh dipping.",
        tags: ["High Vitamin C", "Colorful Mix"],
        features: [
            { icon: "Leaf", label: "ORIGIN", value: "Greenhouse Elite" },
            { icon: "Calendar", label: "SHELF LIFE", value: "5-8 Days" },
            { icon: "Apple", label: "VITAMINS", value: "A, C" },
        ],
        highlights: ["Sweet and crunchy", "Excellent source of antioxidants", "Vibrant addition to any meal"],
        benefits: [
            { title: "Skin Health", description: "Rich in Vitamin C" },
            { title: "Indigestion", description: "Lowers acidity" },
        ]
    },
    {
        id: "p13",
        categoryId: "grains",
        title: "Organic Rolled Oats",
        price: 3.50,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1586439702132-73016aae2449?auto=format&fit=crop&q=80&w=600",
        description: "High-quality organic rolled oats. A Heart-healthy staple for breakfast porridge, baking, or granola.",
        tags: ["Heart Healthy", "Slow Energy"],
        features: [
            { icon: "Leaf", label: "ORIGIN", value: "Northern Fields" },
            { icon: "Calendar", label: "SHELF LIFE", value: "6-12 Months" },
            { icon: "Apple", label: "VITAMINS", value: "B1, Iron, Magnesium" },
        ],
        highlights: ["100% whole grain", "Excellent source of fiber", "Quick and easy to prepare"],
        benefits: [
            { title: "Heart Health", description: "Reduces cholesterol" },
            { title: "Digestion", description: "High in beta-glucan fiber" },
        ]
    },
    {
        id: "p14",
        categoryId: "berries",
        title: "Fresh Strawberries",
        price: 6.50,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1543528176-61b2395143a4?auto=format&fit=crop&q=80&w=600",
        description: "Sweet, juicy, and aromatic strawberries harvested at the peak of ripeness. High in Vitamin C and antioxidants.",
        tags: ["Super Sweet", "Organic"],
        features: [
            { icon: "Leaf", label: "ORIGIN", value: "Berry Patch" },
            { icon: "Calendar", label: "SHELF LIFE", value: "2-3 Days" },
            { icon: "Apple", label: "VITAMINS", value: "C, Manganese" },
        ],
        highlights: ["No synthetic fertilizers", "Grown in open air", "Perfect for desserts"],
        benefits: [
            { title: "Heart Health", description: "Rich in anthocyanins" },
            { title: "Immunity", description: "High Vitamin C" },
        ]
    },
    {
        id: "p15",
        categoryId: "fruits",
        title: "Sweet Bananas",
        price: 1.20,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1571771894821-ad99c9a3c747?auto=format&fit=crop&q=80&w=600",
        description: "Perfectly ripe and sweet bananas, rich in potassium and quick energy. A perfect snack for any time of the day.",
        tags: ["Quick Energy", "Potassium Rich"],
        features: [
            { icon: "Leaf", label: "ORIGIN", value: "Tropical Belt" },
            { icon: "Calendar", label: "SHELF LIFE", value: "3-5 Days" },
            { icon: "Apple", label: "VITAMINS", value: "B6, C, Potassium" },
        ],
        highlights: ["Ethically sourced", "Great for smoothies", "Naturally protected by peel"],
        benefits: [
            { title: "Energy", description: "Natural sugars and fiber" },
            { title: "Muscle", description: "Supports muscle function" },
        ]
    },
];

export function getProductById(id: string, products: Product[]): Product | undefined {
    return products.find(product => product.id === id);
}

export function getProductsByCategory(categoryId: string, products: Product[]): Product[] {
    if (!categoryId || categoryId === "all") return products;
    return products.filter(product => product.categoryId === categoryId);
}
