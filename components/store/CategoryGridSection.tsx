"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, FolderPlus } from "lucide-react";
import { useProducts } from "@/context/ProductContext";

export default function CategoryGridSection() {
  const { categories } = useProducts();

  // Curated categories with fallback images if none set
  const displayCategories = categories.slice(0, 4);

  return (
    <section className="py-16 sm:py-20 border-b border-zinc-200 dark:border-zinc-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="text-[#0066ff] dark:text-[#00a3ff] font-mono text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Curated Silhouettes
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 dark:text-white">
            Select Your Armor
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white flex items-center gap-1.5 transition"
        >
          <span>View All Categories</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {displayCategories.map((cat) => {
          return (
            <Link
              key={cat.id || cat.name}
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-[#0e1422] to-[#06080e] shadow-sm hover:shadow-xl hover:border-[#0088ff]/50 transition duration-300 flex flex-col justify-end p-4 sm:p-5"
            >
              {cat.image ? (
                <>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </>
              ) : (
                <>
                  {/* High-tech ambient background when no custom image uploaded */}
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#0088ff]/15 rounded-full blur-2xl group-hover:bg-[#00a3ff]/25 transition" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition">
                    <FolderPlus className="w-20 h-20 text-[#00a3ff]" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </>
              )}
              <div className="absolute bottom-4 inset-x-4 text-white">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#00a3ff] font-bold mb-0.5">
                  <FolderPlus className="w-3 h-3" />
                  <span>Silhouette</span>
                </div>
                <h3 className="text-sm sm:text-base font-black uppercase text-white group-hover:text-[#00a3ff] transition">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-zinc-300 font-mono mt-0.5 line-clamp-1">
                  {cat.description || "Dhakaiya Streetwear Edition"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
