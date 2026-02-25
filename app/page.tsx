"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/SecureAuthContext";
import SecureAuthGuard from "@/components/SecureAuthGuard";
import { useProducts } from "@/context/ProductsContext";
import { CATEGORIES as categories } from "@/lib/products";
import SearchHeader from "@/components/SearchHeader";
import CategoryItem from "@/components/CategoryItem";
import ProductCard from "@/components/ProductCard";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { products, searchQuery, setSearchQuery } = useProducts();

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.categoryId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get featured products (first 6 products)
  const featuredProducts = filteredProducts.slice(0, 6);

  // Get products by category
  const getProductsByCategory = (categoryId: string) => {
    return filteredProducts.filter(product => product.categoryId === categoryId).slice(0, 3);
  };

  return (
    <div className="flex flex-col gap-8">
      <SearchHeader />

      {searchQuery ? (
        <section className="px-6 flex flex-col gap-6 pb-12">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg md:text-xl font-bold text-foreground">Search Results</h2>
            <span className="text-xs text-subtitle font-bold">Found {filteredProducts.length} items</span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center gap-4 text-center">
              <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center text-4xl premium-shadow">
                🔍
              </div>
              <p className="font-bold text-foreground text-lg">No Items Found</p>
              <p className="text-sm text-subtitle max-w-[200px]">We couldn't find any products matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-primary font-bold text-sm mt-2"
              >
                Clear Search
              </button>
            </div>
          )}
        </section>
      ) : (
        <>
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
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
