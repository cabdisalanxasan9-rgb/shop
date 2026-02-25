// Shared order types and data management
export interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    weight: string;
}

export interface Driver {
    name: string;
    rating: number;
    image: string;
    phone: string;
}

export interface Order {
    id: string;
    status: "Delivered" | "In Progress" | "Cancelled" | "Processing" | "Confirmed" | "On the way";
    date: string;
    total: number;
    items: OrderItem[];
    timeline?: {
        status: string;
        time: string;
        completed: boolean;
    }[];
    driver?: Driver;
    address?: string;
    itemCount?: number;
    labels?: string;
    statusColor?: string;
}

// Centralized order data
export const ordersData: Order[] = [
    {
        id: "VF-98721",
        status: "Delivered",
        date: "Oct 24, 2023",
        total: 24.50,
        itemCount: 5,
        labels: "Fresh Red Tomatoes, Organic Broccoli, Sweet Carrots...",
        items: [
            {
                id: 1,
                name: "Fresh Red Tomatoes",
                price: 2.50,
                quantity: 4,
                image: "/images/veg-tomato.jpg",
                weight: "2kg"
            },
            {
                id: 2,
                name: "Organic Broccoli",
                price: 3.20,
                quantity: 2,
                image: "/images/veg-broccoli.jpg",
                weight: "2pcs"
            },
            {
                id: 3,
                name: "Sweet Carrots",
                price: 1.80,
                quantity: 3,
                image: "/images/veg-carrot.jpg",
                weight: "3kg"
            }
        ],
        timeline: [
            { status: "Order Placed", time: "10:30 AM", completed: true },
            { status: "Confirmed", time: "10:35 AM", completed: true },
            { status: "Processing", time: "11:00 AM", completed: true },
            { status: "On the way", time: "11:20 AM", completed: true },
            { status: "Delivered", time: "11:45 AM", completed: true },
        ],
        driver: {
            name: "Omar Ali",
            rating: 4.8,
            image: "/images/driver-omar.svg",
            phone: "+252 61 555 0123"
        },
        address: "Maka Al-Mukarama Street, Waberi District, Mogadishu"
    },
    {
        id: "VF-98552",
        status: "In Progress",
        statusColor: "text-orange-500 bg-orange-50",
        date: "Today, 10:30 AM",
        total: 18.20,
        itemCount: 3,
        labels: "Leafy Greens, Bell Peppers, Onions",
        items: [
            {
                id: 4,
                name: "Baby Spinach",
                price: 2.80,
                quantity: 2,
                image: "/images/veg-spinach.jpg",
                weight: "1kg"
            },
            {
                id: 5,
                name: "Bell Pepper Mix",
                price: 4.80,
                quantity: 1,
                image: "/images/veg-peppers-mix.jpg",
                weight: "1kg"
            }
        ],
        timeline: [
            { status: "Order Placed", time: "10:30 AM", completed: true },
            { status: "Confirmed", time: "10:35 AM", completed: true },
            { status: "Processing", time: "11:00 AM", completed: true },
            { status: "On the way", time: "11:20 AM", completed: false },
            { status: "Delivered", time: "11:45 AM", completed: false },
        ],
        driver: {
            name: "Ahmed Hassan",
            rating: 4.9,
            image: "/images/driver-ahmed.svg",
            phone: "+252 61 555 0456"
        },
        address: "Hodan District, Near KM5, Mogadishu"
    },
    {
        id: "VF-98410",
        status: "Cancelled",
        statusColor: "text-red-500 bg-red-50",
        date: "Oct 18, 2023",
        total: 42.00,
        itemCount: 2,
        labels: "Wild Mushrooms, Strawberries",
        items: [
            {
                id: 6,
                name: "Wild Mushrooms",
                price: 5.50,
                quantity: 2,
                image: "/images/veg-mushroom.jpg",
                weight: "500g"
            },
            {
                id: 7,
                name: "Fresh Strawberries",
                price: 6.50,
                quantity: 1,
                image: "/images/cat-berries.jpg",
                weight: "500g"
            }
        ],
        timeline: [
            { status: "Order Placed", time: "2:30 PM", completed: true },
            { status: "Cancelled", time: "2:45 PM", completed: true },
        ]
    }
];

// Helper functions
export function getOrderById(id: string): Order | undefined {
    return ordersData.find(order => order.id === id);
}

export function getOrdersByStatus(status?: string, orders?: Order[]): Order[] {
    const ordersToFilter = orders || ordersData;
    if (!status || status === "All") return ordersToFilter;
    if (status === "Ongoing") return ordersToFilter.filter(order =>
        order.status === "In Progress" || order.status === "Processing" || order.status === "Confirmed" || order.status === "On the way"
    );
    if (status === "History") return ordersToFilter.filter(order =>
        order.status === "Delivered" || order.status === "Cancelled"
    );
    return ordersToFilter.filter(order => order.status === status);
}

export function getOrderImages(order: Order): string[] {
    return order.items.slice(0, 3).map(item => item.image);
}
