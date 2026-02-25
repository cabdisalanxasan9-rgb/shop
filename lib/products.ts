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
    { id: "leafy-greens", label: "Leafy Greens", icon: "/images/cat-greens.jpg", color: "bg-emerald-50 text-emerald-600" },
    { id: "root-vegies", label: "Root Vegies", icon: "/images/cat-root.jpg", color: "bg-orange-50 text-orange-600" },
    { id: "peppers", label: "Peppers", icon: "/images/cat-peppers.jpg", color: "bg-red-50 text-red-600" },
    { id: "fruits", label: "Fruits", icon: "/images/cat-fruits.jpg", color: "bg-yellow-50 text-yellow-600" },
    { id: "grains", label: "Grains", icon: "/images/cat-grains.jpg", color: "bg-amber-50 text-amber-600" },
    { id: "herbs", label: "Herbs", icon: "/images/cat-herbs.jpg", color: "bg-teal-50 text-teal-600" },
    { id: "fungi", label: "Fungi", icon: "/images/cat-fungi.jpg", color: "bg-stone-50 text-stone-600" },
    { id: "berries", label: "Berries", icon: "/images/cat-berries.jpg", color: "bg-purple-50 text-purple-600" },
];

// Initial products data with high-quality cloud images
export const initialProducts: Product[] = [
    {
        id: "p1",
        categoryId: "fruits",
        title: "Fresh Red Tomatoes",
        price: 2.50,
        unit: "kg",
        image: "/images/veg-tomato.jpg",
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
        image: "/images/veg-broccoli.jpg",
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
        image: "/images/veg-carrot.jpg",
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
        image: "/images/veg-peppers.jpg",
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
        image: "/images/veg-cucumber.jpg",
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
        image: "/images/veg-garlic.jpg",
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
        image: "/images/veg-onion.jpg",
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
        image: "/images/veg-spinach.jpg",
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
        image: "/images/veg-eggplant.jpg",
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
        image: "/images/veg-potato.jpg",
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
        image: "/images/veg-mushroom.jpg",
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
        image: "/images/veg-peppers-mix.jpg",
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
        image: "/images/veg-oats.jpg",
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
        image: "/images/cat-berries.jpg",
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
        image: "/images/cat-fruits.jpg",
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
