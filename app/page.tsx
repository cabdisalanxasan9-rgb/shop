"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/SecureAuthContext";
import SecureAuthGuard from "@/components/SecureAuthGuard";
import { useProducts } from "@/context/ProductsContext";
import SearchHeader from "@/components/SearchHeader";
import CategoryItem from "@/components/CategoryItem";
import ProductCard from "@/components/ProductCard";
import { MoveRight, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const categories = [
  { id: "leafy-greens", label: "Leafy Greens", icon: "/images/cat-greens.jpg", color: "bg-emerald-50 text-emerald-600" },
  { id: "root-vegies", label: "Root Vegies", icon: "/images/cat-root.jpg", color: "bg-orange-50 text-orange-600" },
  { id: "peppers", label: "Peppers", icon: "/images/cat-peppers.jpg", color: "bg-red-50 text-red-600" },
  { id: "fruits", label: "Fruits", icon: "/images/cat-fruits.jpg", color: "bg-yellow-50 text-yellow-600" },
  { id: "grains", label: "Grains", icon: "/images/cat-grains.jpg", color: "bg-amber-50 text-amber-600" },
  { id: "herbs", label: "Herbs", icon: "/images/cat-herbs.jpg", color: "bg-teal-50 text-teal-600" },
  { id: "fungi", label: "Fungi", icon: "/images/cat-fungi.jpg", color: "bg-stone-50 text-stone-600" },
  { id: "berries", label: "Berries", icon: "/images/cat-berries.jpg", color: "bg-purple-50 text-purple-600" },
];

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { products } = useProducts();

  // Get featured products (first 6 products)
  const featuredProducts = products.slice(0, 6);

  // Get products by category
  const getProductsByCategory = (categoryId: string) => {
    return products.filter(product => product.categoryId === categoryId).slice(0, 3);
  };

  return (
    <div className="flex flex-col gap-8">
      <SearchHeader />

      {/* Hero Banner */}
      <section className="px-6">
        <div className="relative h-48 md:h-64 w-full rounded-[2.5rem] overflow-hidden group premium-shadow ring-1 ring-black/5">
          <Image
            src="/images/hero-banner.jpg"
            alt="Fresh farm banner"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/40 to-transparent flex flex-col justify-center px-10 md:px-16 gap-2.5">
            <span className="bg-accent/90 backdrop-blur-sm text-white text-[10px] md:text-xs font-bold px-4 py-1.5 rounded-full self-start shadow-lg shadow-accent/20">
              LIMITED OFFER
            </span>
            <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight max-w-[200px] md:max-w-[400px] drop-shadow-md">
              Fresh from the farm! 20% Off Today - JannoFresh
            </h2>
            <button className="bg-white text-primary-dark font-bold text-xs md:text-sm px-8 md:px-10 py-3 md:py-4 rounded-2xl self-start transition-all hover:bg-primary-light active:scale-95 shadow-xl shadow-black/20">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 flex flex-col gap-5">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-lg md:text-xl font-bold text-foreground">Categories</h2>
          <Link href="/categories" className="text-primary font-bold text-xs md:text-sm flex items-center gap-1.5 hover:translate-x-1 transition-transform">
            See all <MoveRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {categories.map((cat) => (
            <CategoryItem key={cat.label} {...cat} />
          ))}
        </div>
      </section>

      {/* Recommended */}
      <section className="px-6 flex flex-col gap-6 pb-12">
        <div className="flex justify-between items-center px-1">
          <div className="flex flex-col gap-0.5">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-lg md:text-xl font-bold text-foreground">Recommended</h2>
              <Link href="/categories" className="text-primary font-bold text-xs md:text-sm flex items-center gap-1.5 hover:translate-x-1 transition-transform">
                See all <MoveRight size={14} />
              </Link>
            </div>
            <span className="text-[10px] md:text-xs uppercase tracking-wider text-subtitle font-bold">Showing {products.length} items</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </section>
    </div>
  );
}
