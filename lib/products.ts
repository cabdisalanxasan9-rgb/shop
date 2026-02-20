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

// Initial products data
export const initialProducts: Product[] = [
    {
        id: "p1",
        categoryId: "fruits",
        title: "Fresh Red Tomatoes",
        price: 2.50,
        unit: "kg",
        image: "/images/veg-tomato.jpg",
        isFavorite: true,
    },
    {
        id: "p2",
        categoryId: "leafy-greens",
        title: "Organic Broccoli",
        price: 3.20,
        unit: "pc",
        image: "/images/veg-broccoli.jpg",
    },
    {
        id: "p3",
        categoryId: "root-vegies",
        title: "Sweet Carrots",
        price: 1.80,
        unit: "kg",
        image: "/images/veg-carrot.jpg",
    },
    {
        id: "p4",
        categoryId: "peppers",
        title: "Bell Peppers",
        price: 4.50,
        unit: "kg",
        image: "/images/veg-peppers-mix.jpg",
    },
    {
        id: "p5",
        categoryId: "leafy-greens",
        title: "Organic Cucumbers",
        price: 1.20,
        unit: "pc",
        image: "/images/veg-cucumber.jpg",
    },
    {
        id: "p6",
        categoryId: "herbs",
        title: "Fresh Garlic",
        price: 0.50,
        unit: "pc",
        image: "/images/veg-garlic.jpg",
    },
    {
        id: "p7",
        categoryId: "root-vegies",
        title: "Yellow Onions",
        price: 1.50,
        unit: "kg",
        image: "/images/veg-onion.jpg",
    },
    {
        id: "p8",
        categoryId: "leafy-greens",
        title: "Baby Spinach",
        price: 2.80,
        unit: "kg",
        image: "/images/veg-spinach.jpg",
    },
    {
        id: "p9",
        categoryId: "root-vegies",
        title: "Fresh Eggplant",
        price: 2.00,
        unit: "kg",
        image: "/images/veg-eggplant.jpg",
    },
    {
        id: "p10",
        categoryId: "root-vegies",
        title: "Organic Potatoes",
        price: 1.40,
        unit: "kg",
        image: "/images/veg-potato.jpg",
    },
    {
        id: "p11",
        categoryId: "fungi",
        title: "Wild Mushrooms",
        price: 5.50,
        unit: "kg",
        image: "/images/veg-mushroom.jpg",
    },
    {
        id: "p12",
        categoryId: "peppers",
        title: "Bell Pepper Mix",
        price: 4.80,
        unit: "kg",
        image: "/images/veg-peppers-mix.jpg",
    },
    {
        id: "p13",
        categoryId: "grains",
        title: "Organic Rolled Oats",
        price: 3.50,
        unit: "kg",
        image: "/images/veg-oats.jpg",
    },
];

export function getProductById(id: string, products: Product[]): Product | undefined {
    return products.find(product => product.id === id);
}

export function getProductsByCategory(categoryId: string, products: Product[]): Product[] {
    if (!categoryId || categoryId === "all") return products;
    return products.filter(product => product.categoryId === categoryId);
}
