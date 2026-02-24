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

// Initial products data with high-quality cloud images
export const initialProducts: Product[] = [
    {
        id: "p1",
        categoryId: "fruits",
        title: "Fresh Red Tomatoes",
        price: 2.50,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1518977676601-b53f02bad675?auto=format&fit=crop&q=80&w=600",
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
        categoryId: "root-vegies",
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
        image: "https://images.unsplash.com/photo-1563212623-0df1567bc7d2?auto=format&fit=crop&q=80&w=600",
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
];

export function getProductById(id: string, products: Product[]): Product | undefined {
    return products.find(product => product.id === id);
}

export function getProductsByCategory(categoryId: string, products: Product[]): Product[] {
    if (!categoryId || categoryId === "all") return products;
    return products.filter(product => product.categoryId === categoryId);
}
