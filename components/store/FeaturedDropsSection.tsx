"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp, Sparkles, Package } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "./ProductCard";

export default function FeaturedDropsSection() {
  const { products, isLoaded } = useProducts();

  const featured = products.filter((p) => p.isFeatured);
  const displayProducts = featured.length > 0 ? featured : products.slice(0, 6);

  if (!isLoaded) {
    return (
      <section className="py-16 sm:py-20 border-b border-zinc-200 dark:border-zinc-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full animate-pulse">
        <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-64 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-[3/4] bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 border-b border-zinc-200 dark:border-zinc-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="text-[#0066ff] dark:text-[#00a3ff] font-mono text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" /> High-Rotation Staples
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 dark:text-white">
            Featured New Drops
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white flex items-center gap-1.5 transition"
        >
          <span>See All Products ({products.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {displayProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 3} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-zinc-200 dark:border-zinc-800/80 space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-[#0088ff]/10 border border-[#00a3ff]/20 mx-auto flex items-center justify-center text-[#0066ff] dark:text-[#00a3ff]">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#00a3ff] font-bold">
              VAULT STATUS: IN PREPARATION
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-950 dark:text-white">
              Upcoming Collection Dropping Soon
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our atelier is tailoring the next limited-run streetwear drop. New inventory will automatically appear here once released.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0066ff] to-[#00a3ff] text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-full hover:from-[#0052cc] hover:to-[#0088ff] transition shadow-md shadow-[#0088ff]/20"
            >
              <span>Explore Catalog Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
