"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { formatPrice } from "@/lib/utils";

export default function HeroLookbookSlider() {
  const { products, isLoaded, customLogoUrl } = useProducts();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Filter products that the admin selected for the Hero Slider (isFeatured === true)
  const heroProducts = products.filter((p) => p.isFeatured);

  // Fallback: If no products are featured, show the first 3 products
  const activeProducts = heroProducts.length > 0 ? heroProducts : products.slice(0, 3);

  // Auto-play timer (slides every 4.5 seconds)
  useEffect(() => {
    if (activeProducts.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeProducts.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [activeProducts.length, isPaused]);

  // Reset index if out of bounds
  useEffect(() => {
    if (currentIndex >= activeProducts.length) {
      setCurrentIndex(0);
    }
  }, [activeProducts.length, currentIndex]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + activeProducts.length) % activeProducts.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % activeProducts.length);
  };

  // Touch Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  if (!isLoaded) {
    return (
      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-900 animate-pulse" />
    );
  }

  if (activeProducts.length === 0) {
    return (
      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-950 via-[#0a0e17] to-zinc-900 shadow-2xl flex flex-col justify-between p-8 text-white select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#0088ff]/20 blur-[90px] rounded-full pointer-events-none" />

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase px-3 py-1 rounded-full border border-white/10 shadow-lg">
            <Sparkles className="w-3 h-3 text-[#00a3ff]" />
            <span>SEASON 2026 // ATELIER</span>
          </div>
          <span className="font-mono text-xs text-[#00a3ff] font-bold">LIMITED</span>
        </div>

        {/* Center Brand Identity */}
        <div className="relative z-10 text-center my-auto space-y-4">
          {customLogoUrl ? (
            <img
              src={customLogoUrl}
              alt="Dhakaiya Dripz"
              className="h-20 w-auto max-w-[240px] mx-auto object-contain drop-shadow-[0_4px_20px_rgba(0,163,255,0.4)]"
            />
          ) : (
            <div className="text-2xl font-black tracking-tight uppercase">
              DHAKAIYA <span className="text-[#00a3ff]">DRIPZ</span>
            </div>
          )}
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-widest text-[#00a3ff] font-bold">
              Exclusive Drop Preparation
            </div>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto">
              Heavyweight silhouettes and architectural streetwear currently in production.
            </p>
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="relative z-10 bg-white/10 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-zinc-400">Vault Access</div>
            <div className="text-xs font-bold text-white">New Drops Releasing Soon</div>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-[#0066ff] to-[#00a3ff] text-white rounded-xl text-xs font-bold shadow-md hover:opacity-90 transition"
          >
            <span>Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  const currentProduct = activeProducts[currentIndex] || activeProducts[0];
  const lookNumber = String(currentIndex + 1).padStart(2, "0");
  const imageUrl = currentProduct?.images?.[0] || customLogoUrl || "/uploads/drip-062eabdb-e093-4aef-8-1790770654393-4474.png";

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-2xl group select-none"
    >
      {/* Background Lookbook Image with Cross-fade transition */}
      {activeProducts.map((p, idx) => (
        <div
          key={p.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <Image
            src={p.images[0] || imageUrl}
            alt={p.title}
            fill
            priority={idx === 0}
            className="object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Cinematic Shadow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
        </div>
      ))}

      {/* Top Slider Navigation Header */}
      <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between">
        {/* Streetwear Badge */}
        <div className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-white/10 shadow-lg">
          <Sparkles className="w-3 h-3 text-[#00a3ff]" />
          <span>Curated Lookbook</span>
        </div>

        {/* Slide Progress Indicator Dots / Bars */}
        {activeProducts.length > 1 && (
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            {activeProducts.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-6 bg-gradient-to-r from-[#0066ff] to-[#00a3ff]"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Prev / Next Chevrons (Visible on Hover / Desktop) */}
      {activeProducts.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10"
            aria-label="Previous Look"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10"
            aria-label="Next Look"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Floating Product Card (Bottom) */}
      <div className="absolute bottom-5 inset-x-5 z-20 bg-white/95 dark:bg-zinc-950/90 backdrop-blur-md p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl flex items-center justify-between transition-all duration-300 hover:border-black dark:hover:border-[#00a3ff]">
        <div className="min-w-0 pr-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-gradient-to-r from-[#0066ff] to-[#00a3ff] text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded shadow-xs">
              LOOK {lookNumber}
            </span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold truncate">
              {currentProduct.category} • {currentProduct.fit}
            </span>
          </div>
          <h4 className="text-sm font-black text-zinc-950 dark:text-white truncate">
            {currentProduct.title}
          </h4>
          <p className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-300">
            {formatPrice(currentProduct.salePrice ?? currentProduct.basePrice)}
          </p>
        </div>

        <Link
          href={`/product/${currentProduct.slug}`}
          className="p-3 bg-zinc-950 dark:bg-gradient-to-r dark:from-[#0066ff] dark:to-[#00a3ff] text-white hover:scale-105 rounded-xl transition shadow-lg shrink-0 flex items-center justify-center"
          title={`View ${currentProduct.title}`}
          aria-label="View Product"
        >
          <ArrowRight className="w-4 h-4 font-bold" />
        </Link>
      </div>
    </div>
  );
}
