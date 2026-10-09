"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  Play,
  Image as ImageIcon,
  Flame,
  Check,
  ArrowRight,
  Share2,
} from "lucide-react";
import { ProductItem } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SizeGuideModal from "./SizeGuideModal";
import ProductCard from "./ProductCard";

interface ProductDetailClientProps {
  product: ProductItem;
  relatedProducts: ProductItem[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Selected options
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Standard");
  const availableSizes = product.sizes.filter((s) => s.stock > 0);
  const [selectedSize, setSelectedSize] = useState<string>(
    availableSizes[0]?.size || product.sizes[0]?.size || ""
  );

  // Active media tab: "image" or "catwalk"
  const [activeMedia, setActiveMedia] = useState<"image" | "catwalk">("image");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const isLiked = isInWishlist(product.id);
  const selectedSizeObj = product.sizes.find((s) => s.size === selectedSize);
  const isOutOfStock = !selectedSizeObj || selectedSizeObj.stock === 0;
  const isLowStock = selectedSizeObj && selectedSizeObj.stock > 0 && selectedSizeObj.stock <= 3;

  const currentPrice = product.salePrice ?? product.basePrice;
  const hasDiscount = product.salePrice && product.salePrice < product.basePrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.basePrice - product.salePrice!) / product.basePrice) * 100)
    : 0;

  const handleAddToBag = () => {
    if (isOutOfStock) return;
    addItem(product, selectedSize, selectedColor, 1);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addItem(product, selectedSize, selectedColor, 1);
    router.push("/checkout");
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-zinc-500 mb-6 font-mono">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-black dark:hover:text-white transition">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-black dark:hover:text-white transition">Shop</Link>
          <span>/</span>
          <span className="text-zinc-800 dark:text-zinc-300 truncate">{product.title}</span>
        </div>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1 rounded-full text-xs"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copiedLink ? "Link Copied!" : "Share Look"}</span>
        </button>
      </div>

      {/* ASOS Split-Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Media & Catwalk Video Container */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Media Switcher Tab (Photos vs Catwalk Video) */}
          {product.catwalkVideoUrl && (
            <div className="inline-flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold">
              <button
                onClick={() => setActiveMedia("image")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition ${
                  activeMedia === "image"
                    ? "bg-white dark:bg-zinc-800 text-black dark:text-white shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Editorial Photos ({product.images.length})</span>
              </button>
              <button
                onClick={() => setActiveMedia("catwalk")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition ${
                  activeMedia === "catwalk"
                    ? "bg-gradient-to-r from-[#0066ff] to-[#00a3ff] text-white shadow-xs font-black"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Live Catwalk Clip</span>
              </button>
            </div>
          )}

          {/* Main Visual Display */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 shadow-sm">
            {activeMedia === "catwalk" && product.catwalkVideoUrl ? (
              <video
                src={product.catwalkVideoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            )}

            {/* Float Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.isNewDrop && (
                <span className="bg-gradient-to-r from-[#0066ff] to-[#00a3ff] text-white font-black text-xs uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                  New Drop
                </span>
              )}
              {hasDiscount && (
                <span className="bg-red-600 text-white font-black text-xs uppercase px-2.5 py-0.5 rounded-full shadow-md">
                  -{discountPercent}%
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all z-10 ${
                isLiked
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-white/80 dark:bg-black/50 text-zinc-800 dark:text-white hover:bg-white dark:hover:bg-black/80 hover:text-red-600 shadow-md"
              }`}
              aria-label="Wishlist toggle"
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-white" : ""}`} />
            </button>
          </div>

          {/* Thumbnail Gallery (When photos active) */}
          {activeMedia === "image" && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition ${
                    selectedImageIndex === idx
                      ? "border-black dark:border-[#00a3ff] ring-2 ring-black/10 dark:ring-[#00a3ff]/20"
                      : "border-zinc-200 dark:border-zinc-800 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} view ${idx + 1}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Sticky Buy Box & Workflows */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-6">
            
            {/* Header / Titles */}
            <div className="space-y-2 border-b border-zinc-200 dark:border-zinc-900 pb-5">
              <div className="flex items-center gap-2 text-xs flex-wrap">
                <span className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-[#00a3ff] font-mono font-bold px-2 py-0.5 rounded uppercase">
                  {product.category}
                </span>
                <span className="text-zinc-400 font-mono">•</span>
                <span className="text-zinc-600 dark:text-zinc-400 font-bold uppercase">{product.fit} FIT</span>
                <span className="text-zinc-400 font-mono">•</span>
                <span className="text-zinc-600 dark:text-zinc-400 uppercase">{product.gender}</span>
                {product.productCode && (
                  <>
                    <span className="text-zinc-400 font-mono">•</span>
                    <span className="text-zinc-500 font-mono text-[11px] font-semibold tracking-wider bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded">
                      CODE: {product.productCode}
                    </span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 dark:text-white">
                {product.title}
              </h1>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                {product.tagline}
              </p>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-2xl sm:text-3xl font-mono font-black text-zinc-950 dark:text-white">
                  {formatPrice(currentPrice)}
                </span>
                {hasDiscount && (
                  <span className="text-sm font-mono text-zinc-400 dark:text-zinc-500 line-through">
                    {formatPrice(product.basePrice)}
                  </span>
                )}
                <span className="text-[11px] text-zinc-500 font-medium">
                  VAT Included • Cash on Delivery
                </span>
              </div>
            </div>

            {/* Color Swatches */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Color: <strong className="text-zinc-950 dark:text-white font-mono">{selectedColor}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`group flex items-center gap-2 p-1.5 rounded-xl border transition ${
                      selectedColor === color.name
                        ? "border-black dark:border-[#00a3ff] bg-zinc-100 dark:bg-zinc-900 shadow-xs"
                        : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-400 dark:hover:border-zinc-700"
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-lg border border-black/20 shadow-xs inline-block"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs font-medium text-zinc-800 dark:text-zinc-300 pr-1 hidden sm:inline">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing Grid & Scarcity Alerts */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Select Size:
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs font-bold text-zinc-900 dark:text-[#00a3ff] hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" /> Size Chart
                </button>
              </div>

              {/* Interactive Sizing Modules */}
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s) => {
                  const outOfStock = s.stock === 0;
                  const isSelected = selectedSize === s.size;
                  return (
                    <button
                      key={s.size}
                      disabled={outOfStock}
                      onClick={() => setSelectedSize(s.size)}
                      className={`relative py-3 rounded-xl font-mono text-xs font-bold transition flex flex-col items-center justify-center border ${
                        isSelected
                          ? "border-[#00a3ff] bg-gradient-to-r from-[#0066ff] to-[#00a3ff] text-white shadow-lg shadow-[#0088ff]/25"
                          : outOfStock
                          ? "border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950 text-zinc-400 dark:text-zinc-600 line-through opacity-40 cursor-not-allowed"
                          : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-900 dark:text-zinc-200"
                      }`}
                    >
                      <span>{s.size}</span>
                      {outOfStock ? (
                        <span className="text-[9px] uppercase font-sans mt-0.5">Sold</span>
                      ) : s.stock <= 2 ? (
                        <span className={`text-[9px] font-sans mt-0.5 ${isSelected ? "text-white" : "text-amber-600 dark:text-amber-400"}`}>
                          {s.stock} left
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>

              {/* Urgency Alert */}
              {isLowStock && (
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-300 flex items-center gap-2 animate-pulse">
                  <Flame className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Selling fast! Only {selectedSizeObj?.stock} items left in size {selectedSize}.</span>
                </div>
              )}
            </div>

            {/* CTAs: Add to Bag & Instant Buy COD */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleAddToBag}
                disabled={isOutOfStock}
                className="w-full bg-gradient-to-r from-[#0066ff] to-[#00a3ff] hover:from-[#0052cc] hover:to-[#0088ff] disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-600 text-white font-black text-sm uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-[#0088ff]/25 transition group"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition" />
                <span>{isOutOfStock ? "Out of Stock" : "Add to Bag (Slide Drawer)"}</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="w-full bg-zinc-900 hover:bg-black dark:bg-zinc-900 dark:hover:bg-zinc-800 disabled:opacity-50 text-white border border-zinc-800 font-bold text-sm uppercase tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <span>Instant Cash on Delivery Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Assurances & Shipping Info */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-900 space-y-3 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-[#0088ff] dark:text-[#00a3ff] flex-shrink-0" />
                <div>
                  <strong className="text-zinc-950 dark:text-white">Nationwide COD Shipping:</strong> Inside Dhaka (24-48h, ৳80), Outside Dhaka (48-72h, ৳150).
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#0088ff] dark:text-[#00a3ff] flex-shrink-0" />
                <div>
                  <strong className="text-zinc-950 dark:text-white">Pay on Delivery:</strong> Inspect the parcel at your doorstep before handing over cash.
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-4 h-4 text-[#0088ff] dark:text-[#00a3ff] flex-shrink-0" />
                <div>
                  <strong className="text-zinc-950 dark:text-white">7-Day Replacement:</strong> Effortless size exchange if it doesn&apos;t match your drape.
                </div>
              </div>
            </div>

            {/* Garment Details & Tech Specs */}
            <div className="border-t border-zinc-200 dark:border-zinc-900 pt-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
                Garment Specifications & Craft
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#0088ff] dark:text-[#00a3ff] mt-0.5 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-zinc-500 pt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-zinc-200 dark:border-zinc-900">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-950 dark:text-white">
              Complete The Rotation
            </h2>
            <Link
              href="/shop"
              className="text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white flex items-center gap-1.5 transition"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
}
