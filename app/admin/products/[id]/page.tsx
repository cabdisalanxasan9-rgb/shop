"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminGuard from "@/components/AdminGuard";
import { useProducts } from "@/context/ProductsContext";
import { Product, CATEGORIES as categories } from "@/lib/products";
import { ArrowLeft, Save } from "lucide-react";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { getProductById, updateProduct } = useProducts();
    const resolvedParams = React.use(params);
    const id = resolvedParams.id;
    const [formData, setFormData] = useState<Partial<Product>>({
        title: "",
        categoryId: "",
        price: 0,
        unit: "kg",
        image: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const product = getProductById(id);
        if (product) {
            setFormData(product);
        } else {
            router.push("/admin/products");
        }
    }, [id, getProductById, router]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.title?.trim()) newErrors.title = "Title is required";
        if (!formData.categoryId) newErrors.categoryId = "Category is required";
        if (!formData.price || formData.price <= 0) newErrors.price = "Valid price is required";
        if (!formData.unit?.trim()) newErrors.unit = "Unit is required";
        if (!formData.image?.trim()) newErrors.image = "Product image is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        updateProduct(id, formData);
        router.push("/admin/products");
    };

    if (!formData.title) {
        return (
            <AdminGuard>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            </AdminGuard>
        );
    }

    return (
        <AdminGuard>
            <div className="flex flex-col gap-8 pb-12 min-h-screen bg-background">
                {/* Header */}
                <header className="px-6 pt-8 flex items-center gap-4 bg-card border-b border-black/5">
                    <button
                        onClick={() => router.back()}
                        className="w-11 h-11 bg-white rounded-full flex items-center justify-center premium-shadow"
                    >
                        <ArrowLeft size={20} className="text-foreground" />
                    </button>
                    <h1 className="text-2xl font-bold text-foreground">Edit Product</h1>
                </header>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 flex flex-col gap-6">
                    <div className="bg-card rounded-2xl p-6 premium-shadow flex flex-col gap-6">
                        {/* Title */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-foreground">Product Title</label>
                            <input
                                type="text"
                                value={formData.title ?? ""}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className={`w-full h-12 px-4 rounded-xl border ${errors.title ? 'border-red-500' : 'border-black/5'} focus:border-primary focus:outline-none text-foreground`}
                            />
                            {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                        </div>

                        {/* Category */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-foreground">Category</label>
                            <select
                                value={formData.categoryId ?? ""}
                                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                className={`w-full h-12 px-4 rounded-xl border ${errors.categoryId ? 'border-red-500' : 'border-black/5'} focus:border-primary focus:outline-none text-foreground bg-card`}
                            >
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                                ))}
                            </select>
                            {errors.categoryId && <p className="text-red-500 text-xs">{errors.categoryId}</p>}
                        </div>

                        {/* Price and Unit */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-foreground">Price</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.price ?? 0}
                                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value || "0") })}
                                    className={`w-full h-12 px-4 rounded-xl border ${errors.price ? 'border-red-500' : 'border-black/5'} focus:border-primary focus:outline-none text-foreground`}
                                />
                                {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-foreground">Unit</label>
                                <input
                                    type="text"
                                    value={formData.unit ?? ""}
                                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                    className={`w-full h-12 px-4 rounded-xl border ${errors.unit ? 'border-red-500' : 'border-black/5'} focus:border-primary focus:outline-none text-foreground`}
                                />
                                {errors.unit && <p className="text-red-500 text-xs">{errors.unit}</p>}
                            </div>
                        </div>

                        {/* Product Image (Upload or URL) */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-foreground">Product Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        const result = typeof reader.result === "string" ? reader.result : null;
                                        if (!result) return;
                                        setFormData(prev => ({ ...prev, image: result }));
                                        setErrors(prev => ({ ...prev, image: "" }));
                                    };
                                    reader.readAsDataURL(file);
                                }}
                                className="w-full text-xs text-subtitle file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                            />
                            <span className="text-[11px] text-subtitle">
                                You can upload an image file or paste an existing URL below.
                            </span>
                            <input
                                type="text"
                                value={formData.image ?? ""}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className={`w-full h-12 px-4 rounded-xl border ${errors.image ? 'border-red-500' : 'border-black/5'} focus:border-primary focus:outline-none text-foreground`}
                            />
                            {errors.image && <p className="text-red-500 text-xs">{errors.image}</p>}
                            {formData.image && (
                                <div className="relative h-32 w-full rounded-xl overflow-hidden border border-black/5">
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "/images/veg-tomato.jpg";
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full h-14 bg-primary text-white rounded-2xl flex items-center justify-center gap-3 font-bold premium-shadow hover:bg-primary-dark transition-colors"
                    >
                        <Save size={20} />
                        Update Product
                    </button>
                </form>
            </div>
        </AdminGuard>
    );
}
