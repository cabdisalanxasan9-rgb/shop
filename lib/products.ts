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
    },
    {
        id: "p2",
        categoryId: "leafy-greens",
        title: "Organic Broccoli",
        price: 3.20,
        unit: "pc",
        image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: "p3",
        categoryId: "root-vegies",
        title: "Sweet Carrots",
        price: 1.80,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: "p4",
        categoryId: "peppers",
        title: "Bell Peppers",
        price: 4.50,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1566232392379-afd9298e6a46?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: "p5",
        categoryId: "leafy-greens",
        title: "Organic Cucumbers",
        price: 1.20,
        unit: "pc",
        image: "https://images.unsplash.com/photo-1449339854873-750e6df51301?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: "p6",
        categoryId: "herbs",
        title: "Fresh Garlic",
        price: 0.50,
        unit: "pc",
        image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: "p7",
        categoryId: "root-vegies",
        title: "Yellow Onions",
        price: 1.50,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: "p8",
        categoryId: "leafy-greens",
        title: "Baby Spinach",
        price: 2.80,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: "p9",
        categoryId: "fruits",
        title: "Fresh Eggplant",
        price: 2.00,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1528137858148-d018f3a34494?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: "p10",
        categoryId: "root-vegies",
        title: "Organic Potatoes",
        price: 1.40,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1518977676601-b53f02bad675?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: "p11",
        categoryId: "fungi",
        title: "Wild Mushrooms",
        price: 5.50,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1504670610472-104991317221?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: "p12",
        categoryId: "peppers",
        title: "Bell Pepper Mix",
        price: 4.80,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1566232392379-afd9298e6a46?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: "p13",
        categoryId: "grains",
        title: "Organic Rolled Oats",
        price: 3.50,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1586439702132-73016aae2449?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: "p14",
        categoryId: "berries",
        title: "Fresh Strawberries",
        price: 6.50,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1543528176-61b2395143a4?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: "p15",
        categoryId: "fruits",
        title: "Sweet Bananas",
        price: 1.20,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1571771894821-ad99c9a3c747?auto=format&fit=crop&q=80&w=600",
    },
];

export function getProductById(id: string, products: Product[]): Product | undefined {
    return products.find(product => product.id === id);
}

export function getProductsByCategory(categoryId: string, products: Product[]): Product[] {
    if (!categoryId || categoryId === "all") return products;
    return products.filter(product => product.categoryId === categoryId);
}
