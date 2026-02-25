"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, initialProducts } from '@/lib/products';

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

    // Load products from localStorage or use initial data
    useEffect(() => {
        try {
            const saved = localStorage.getItem('jannofresh:products_v3');
            if (saved) {
                setProducts(JSON.parse(saved));
            } else {
                setProducts(initialProducts);
                localStorage.setItem('jannofresh:products_v3', JSON.stringify(initialProducts));
            }
        } catch {
            setProducts(initialProducts);
        }
    }, []);

    // Save to localStorage whenever products change
    useEffect(() => {
        try {
            localStorage.setItem('jannofresh:products_v3', JSON.stringify(products));
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
