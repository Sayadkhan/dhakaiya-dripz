"use client";

import React from "react";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";
import ProductCard from "@/components/store/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { INITIAL_PRODUCTS } from "@/lib/mock-data";

export default function WishlistPage() {
  const { wishlistIds } = useWishlist();
  const wishlistedProducts = INITIAL_PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white selection:bg-[#d4ff00] selection:text-black transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Page Header */}
        <div className="mb-8 space-y-1">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-500">
            Home / Wishlist
          </div>
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950 dark:text-white">
              Saved Pieces ({wishlistedProducts.length})
            </h1>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Keep track of garments you love. Items in your wishlist are saved to your device.
          </p>
        </div>

        {wishlistedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900/30 rounded-3xl border border-zinc-200 dark:border-zinc-900 space-y-5">
            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 mx-auto flex items-center justify-center text-zinc-400 dark:text-zinc-600">
              <Heart className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-950 dark:text-white">Your wishlist is empty</h2>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                Explore our latest drops and tap the heart icon on any piece you want to save for later.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#d4ff00] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-full hover:bg-[#b8dd00] transition shadow-xs"
            >
              <span>Discover New Drops</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
