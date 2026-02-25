"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, initialProducts } from '@/lib/products';

const PRODUCTS_STORAGE_KEY = 'jannofresh:products_v4';
const LEGACY_PRODUCTS_STORAGE_KEYS = ['jannofresh:products_v3'];

const isLocalImagePath = (image?: string) => {
    if (!image || typeof image !== 'string') return false;
    return image.startsWith('/images/') || image.startsWith('data:image/');
};

const normalizeProducts = (savedProducts: Product[]): Product[] => {
    const baseById = new Map(initialProducts.map((product) => [product.id, product]));
    const savedById = new Map(savedProducts.map((product) => [product.id, product]));

    const normalizedDefaults = initialProducts.map((defaultProduct) => {
        const saved = savedById.get(defaultProduct.id);
        if (!saved) return defaultProduct;

        const resolvedImage = isLocalImagePath(saved.image) ? saved.image : defaultProduct.image;
        return {
            ...defaultProduct,
            ...saved,
            image: resolvedImage,
        };
    });

    const customProducts = savedProducts.filter((product) => !baseById.has(product.id));
    return [...normalizedDefaults, ...customProducts];
};

interface ProductsContextType {
    products: Product[];
    addProduct: (product: Product) => void;
    updateProduct: (id: string, product: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    getProductById: (id: string) => Product | undefined;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Load products from localStorage (with migration) or use initial data
    useEffect(() => {
        try {
            const currentSaved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
            if (currentSaved) {
                const parsed = JSON.parse(currentSaved) as Product[];
                const normalized = normalizeProducts(parsed);
                setProducts(normalized);
                localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(normalized));
                return;
            }

            let legacyProducts: Product[] | null = null;
            for (const legacyKey of LEGACY_PRODUCTS_STORAGE_KEYS) {
                const legacyRaw = localStorage.getItem(legacyKey);
                if (!legacyRaw) continue;

                legacyProducts = JSON.parse(legacyRaw) as Product[];
                break;
            }

            const resolvedProducts = legacyProducts ? normalizeProducts(legacyProducts) : initialProducts;
            setProducts(resolvedProducts);
            localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(resolvedProducts));

            for (const legacyKey of LEGACY_PRODUCTS_STORAGE_KEYS) {
                localStorage.removeItem(legacyKey);
            }
        } catch {
            setProducts(initialProducts);
            try {
                localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(initialProducts));
            } catch {
                // Ignore storage errors
            }
        }
    }, []);

    // Save to localStorage whenever products change
    useEffect(() => {
        try {
            localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
        } catch {
            // Ignore storage errors
        }
    }, [products]);

    const addProduct = (product: Product) => {
        setProducts(prev => [...prev, product]);
    };

    const updateProduct = (id: string, updates: Partial<Product>) => {
        setProducts(prev =>
            prev.map(product =>
                product.id === id ? { ...product, ...updates } : product
            )
        );
    };

    const deleteProduct = (id: string) => {
        setProducts(prev => prev.filter(product => product.id !== id));
    };

    const getProductById = (id: string): Product | undefined => {
        return products.find(product => product.id === id);
    };

    return (
        <ProductsContext.Provider value={{
            products,
            addProduct,
            updateProduct,
            deleteProduct,
            getProductById,
            searchQuery,
            setSearchQuery
        }}>
            {children}
        </ProductsContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductsContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
}
