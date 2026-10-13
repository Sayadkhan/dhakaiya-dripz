"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { formatPrice } from "@/lib/utils";

export default function FeaturedDropsSection() {
  const { products, isLoaded } = useProducts();
  const sliderRef = useRef<HTMLDivElement>(null);

  // Filter featured products or take products from database
  const featured = products.filter((p) => p.isFeatured);
  const activeProducts = featured.length > 0 ? featured : products;

  if (activeProducts.length === 0) {
    return null;
  }

  const items = activeProducts.map((p) => ({
    id: p.id,
    title: p.title,
    price: p.salePrice ?? p.basePrice,
    slug: p.slug || p.id,
    imageUrl: p.images[0] || "/uploads/hero-banner-asos.png",
  }));

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.clientWidth * 0.5;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-white dark:bg-zinc-950 py-10 sm:py-14 border-b border-zinc-200 dark:border-zinc-900 select-none">
      {/* Top Header Row (ASOS Style: Left title, Right boxed Shop Now button) */}
      <div className="w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between mb-5 sm:mb-7">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-zinc-950 dark:text-white">
          The latest drops
        </h2>
        <Link
          href="/shop"
          className="border border-zinc-900 dark:border-white px-5 py-2 sm:px-6 sm:py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition shrink-0"
        >
          SHOP NOW
        </Link>
      </div>

      {/* FULL-WIDTH EDGE-TO-EDGE PRODUCT SECTION (NO CONTAINER) */}
      <div className="relative w-full group/slider overflow-hidden">
        {/* Navigation Arrow Left */}
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-2 top-[42%] -translate-y-1/2 z-20 w-10 h-14 sm:w-12 sm:h-18 bg-white/90 dark:bg-zinc-900/90 hover:bg-white dark:hover:bg-zinc-900 text-zinc-900 dark:text-white shadow-md flex items-center justify-center transition border border-zinc-200 dark:border-zinc-800"
          aria-label="Previous drops"
        >
          <ChevronLeft className="w-6 h-6 stroke-[1.75]" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-2 top-[42%] -translate-y-1/2 z-20 w-10 h-14 sm:w-12 sm:h-18 bg-white/90 dark:bg-zinc-900/90 hover:bg-white dark:hover:bg-zinc-900 text-zinc-900 dark:text-white shadow-md flex items-center justify-center transition border border-zinc-200 dark:border-zinc-800"
          aria-label="Next drops"
        >
          <ChevronRight className="w-6 h-6 stroke-[1.75]" />
        </button>

        {/* Edge-to-edge scroll track with exactly 4 columns visible on desktop */}
        <div
          ref={sliderRef}
          className="w-full flex items-stretch overflow-x-auto scroll-smooth scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item, idx) => (
            <Link
              key={item.id || idx}
              href={`/product/${item.slug}`}
              className="w-[72vw] sm:w-[48vw] md:w-[33.333vw] lg:w-[25vw] shrink-0 flex flex-col group cursor-pointer border-r border-zinc-200/70 dark:border-zinc-800/70 last:border-r-0 bg-white dark:bg-zinc-950"
            >
              {/* Image Area (Tall ASOS Portrait Aspect Ratio) */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading={idx < 4 ? "eager" : "lazy"}
                />
              </div>

              {/* Text Description & Price Row */}
              <div className="p-3.5 sm:p-4.5 flex flex-col justify-between flex-1 bg-white dark:bg-zinc-950">
                <p className="text-xs sm:text-[13px] text-zinc-800 dark:text-zinc-200 font-normal leading-snug line-clamp-2 group-hover:underline">
                  {item.title}
                </p>
                <div className="pt-2 text-xs sm:text-sm font-bold text-zinc-950 dark:text-white">
                  {formatPrice(item.price)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
