"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import ProductDetailClient from "./ProductDetailClient";

export default function ProductDetailWrapper({ slug }: { slug: string }) {
  const { products, isLoaded } = useProducts();

  // Search strictly in dynamic products
  const product = products.find((p) => p.slug === slug);

  // While localStorage is loading, display a graceful skeleton loader
  if (!product && !isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse space-y-8">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-48 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 aspect-[4/5] bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
          <div className="lg:col-span-5 space-y-6">
            <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
            <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3" />
            <div className="h-24 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
            <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-4 shadow-sm">
          <ShoppingBag className="w-8 h-8 text-zinc-400" />
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-[#0066ff] dark:text-[#00a3ff] font-bold mb-2">
          Piece Unavailable
        </span>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 dark:text-white mb-3">
          Product Not Found
        </h1>
        <p className="text-sm text-zinc-500 max-w-md mb-8">
          The streetwear drop you are looking for &quot;{slug}&quot; is either archived or unavailable in our catalog.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#0066ff] to-[#00a3ff] hover:from-[#0052cc] hover:to-[#0088ff] text-white font-black text-xs uppercase tracking-wider transition shadow-lg shadow-[#0088ff]/25"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore All Drops</span>
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
