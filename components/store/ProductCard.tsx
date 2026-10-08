"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Eye, Zap, Flame } from "lucide-react";
import { ProductItem } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: ProductItem;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isLiked = isInWishlist(product.id);
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const totalStock = product.sizes.reduce((acc, s) => acc + s.stock, 0);
  const isLowStock = totalStock > 0 && totalStock <= 5;

  const currentPrice = product.salePrice ?? product.basePrice;
  const hasDiscount = product.salePrice && product.salePrice < product.basePrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.basePrice - product.salePrice!) / product.basePrice) * 100)
    : 0;

  const handleQuickAdd = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const color = product.colors[0]?.name || "Standard";
    addItem(product, size, color, 1);
  };

  return (
    <div
      className="group relative flex flex-col bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-700 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSelectedSize(null);
      }}
    >
      {/* Product Image Area */}
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        
        {/* Primary and Secondary Hover Image */}
        <Image
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNewDrop && (
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-[#0066ff] to-[#00a3ff] text-white font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md">
              <Zap className="w-3 h-3" /> New Drop
            </span>
          )}
          {hasDiscount && (
            <span className="bg-red-600 text-white font-black text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md">
              -{discountPercent}%
            </span>
          )}
          {isLowStock && (
            <span className="inline-flex items-center gap-1 bg-amber-500 text-black font-bold text-[10px] px-2 py-0.5 rounded-full shadow-md">
              <Flame className="w-3 h-3" /> Only {totalStock} Left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isLiked
              ? "bg-red-600 text-white shadow-lg"
              : "bg-white/80 dark:bg-black/50 text-zinc-700 dark:text-white hover:bg-white dark:hover:bg-black/80 hover:text-red-600 shadow-sm"
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`} />
        </button>

        {/* Quick Size Select Bar (Reveals on hover) */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">
          <div className="bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5 px-1">
              Quick Add Size:
            </div>
            <div className="flex flex-wrap gap-1">
              {product.sizes.map((s) => {
                const outOfStock = s.stock === 0;
                return (
                  <button
                    key={s.size}
                    disabled={outOfStock}
                    onClick={(e) => handleQuickAdd(s.size, e)}
                    className={`flex-1 min-w-[28px] py-1 text-center text-xs font-mono font-bold rounded transition ${
                      outOfStock
                        ? "line-through opacity-30 text-zinc-400 dark:text-zinc-600 cursor-not-allowed bg-zinc-100 dark:bg-zinc-900"
                        : "bg-zinc-100 dark:bg-zinc-800 hover:bg-[#00a3ff] hover:text-black text-zinc-900 dark:text-white"
                    }`}
                  >
                    {s.size}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Link>

      {/* Product Information Card */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white dark:bg-zinc-950">
        <div>
          <div className="flex items-center justify-between text-xs text-zinc-500 font-medium mb-1">
            <span className="uppercase tracking-wider font-mono text-[11px]">{product.category}</span>
            <span className="bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400 px-1.5 py-0.5 rounded text-[10px] font-bold">
              {product.fit}
            </span>
          </div>

          <Link href={`/product/${product.slug}`} className="block group-hover:text-[#0066ff] dark:group-hover:text-[#00a3ff] transition">
            <h3 className="font-bold text-sm text-zinc-950 dark:text-zinc-100 line-clamp-1">
              {product.title}
            </h3>
          </Link>
          
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">
            {product.tagline}
          </p>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-3 mt-2 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base font-black text-zinc-950 dark:text-white">
              {formatPrice(currentPrice)}
            </span>
            {hasDiscount && (
              <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500 line-through">
                {formatPrice(product.basePrice)}
              </span>
            )}
          </div>

          <Link
            href={`/product/${product.slug}`}
            className="text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white flex items-center gap-1 transition"
          >
            <span>View</span>
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
