"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AdminGuard from "@/components/AdminGuard";
import { useProducts } from "@/context/ProductsContext";
import { Product } from "@/lib/products";
import { Plus, Edit2, Trash2, Search, Package } from "lucide-react";
import Image from "next/image";

export default function AdminProductsPage() {
    const router = useRouter();
    const { products, deleteProduct } = useProducts();
    const [searchTerm, setSearchTerm] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.categoryId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: string) => {
        deleteProduct(id);
        setShowDeleteConfirm(null);
    };

    return (
        <AdminGuard>
            <div className="flex flex-col gap-8 pb-12 min-h-screen bg-background">
                {/* Header */}
                <header className="px-6 pt-8 flex items-center justify-between bg-white border-b border-black/5">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Products Management</h1>
                        <p className="text-sm text-subtitle">{products.length} total products</p>
                    </div>
                    <button
                        onClick={() => router.push("/admin/products/new")}
                        className="px-6 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Add Product
                    </button>
                </header>

                {/* Search */}
                <section className="px-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-subtitle" size={20} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-14 pl-12 pr-4 bg-white rounded-2xl border border-black/5 focus:border-primary focus:outline-none premium-shadow text-foreground placeholder:text-subtitle"
                        />
                    </div>
                </section>

                {/* Products List */}
                <section className="px-6">
                    {filteredProducts.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center premium-shadow">
                            <Package size={48} className="mx-auto mb-4 text-subtitle" />
                            <p className="text-subtitle font-medium">No products found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-2xl p-4 premium-shadow hover:translate-y-[-2px] transition-all"
                                >
                                    <div className="relative h-40 w-full rounded-xl overflow-hidden mb-3">
                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="font-bold text-sm text-foreground">{product.title}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-subtitle capitalize">{product.categoryId}</span>
                                            <span className="font-bold text-primary">${product.price.toFixed(2)}/{product.unit}</span>
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            <button
                                                onClick={() => router.push(`/admin/products/${product.id}`)}
                                                className="flex-1 px-3 py-2 bg-primary/10 text-primary rounded-xl font-semibold text-xs hover:bg-primary/20 transition-colors flex items-center justify-center gap-1"
                                            >
                                                <Edit2 size={14} />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => setShowDeleteConfirm(product.id)}
                                                className="flex-1 px-3 py-2 bg-red-50 text-red-500 rounded-xl font-semibold text-xs hover:bg-red-100 transition-colors flex items-center justify-center gap-1"
                                            >
                                                <Trash2 size={14} />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-6 max-w-md w-full premium-shadow">
                            <h3 className="text-lg font-bold text-foreground mb-2">Delete Product?</h3>
                            <p className="text-sm text-subtitle mb-6">
                                Are you sure you want to delete this product? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(null)}
                                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(showDeleteConfirm)}
                                    className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold text-sm hover:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminGuard>
    );
}
