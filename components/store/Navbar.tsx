"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Zap,
  User,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useProducts, CategoryItem } from "@/context/ProductContext";
import SearchModal from "./SearchModal";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems, openCart } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { categories, customLogoUrl } = useProducts();

  const [activeGender, setActiveGender] = useState<"WOMEN" | "MEN" | "UNISEX">("MEN");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoLoadError, setLogoLoadError] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<CategoryItem | null>(null);
  const [expandedMobileCat, setExpandedMobileCat] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCategoryMouseEnter = (cat: CategoryItem) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setHoveredCategory(cat);
  };

  const handleCategoryMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 350);
  };

  const handleMegaMenuMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  React.useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  React.useEffect(() => {
    setLogoLoadError(false);
  }, [customLogoUrl]);

  const handleGenderSwitch = (gender: "WOMEN" | "MEN" | "UNISEX") => {
    setActiveGender(gender);
    router.push(`/shop?gender=${gender}`);
  };

  return (
    <>
      {/* Top Utility Promotional Ticker Banner (High-Contrast Black Strip) */}
      <div className="bg-black text-white text-xs py-2 px-4 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-hidden">
            <span className="inline-flex items-center gap-1 bg-white text-black font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              <Zap className="w-3 h-3 fill-black text-black" /> Flash Drop
            </span>
            <span className="truncate text-xs font-semibold tracking-wide text-zinc-200">
              Free Delivery Across Bangladesh on Orders Over ৳3,000 | Next-Day Dhaka Shipping ⚡
            </span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-xs font-medium text-zinc-300">
            <span className="text-white font-semibold">Cash on Delivery (COD)</span>
            <span className="text-zinc-600">•</span>
            <span>Nationwide Bangladesh Shipping</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header with 2 Tiers (Authentic ASOS Architecture - Pure Black High-Contrast Fashion) */}
      <header className="sticky top-0 z-40 bg-[#000000] text-white shadow-lg border-b border-zinc-900 transition-colors duration-200">
        
        {/* ========================================================================= */}
        {/* TIER 1: TOP MAIN BAR (Logo, Gender Tabs, Big Search Bar, User, Wishlist, Bag) */}
        {/* ========================================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
            
            {/* Left: Mobile Menu Toggle + Brand Logo + Gender Tabs */}
            <div className="flex items-center gap-2 sm:gap-6 shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1.5 text-zinc-300 hover:text-white focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Brand Logo - Crisp, Pure White & High-Impact on ASOS Black Header */}
              <Link href="/" className="inline-flex items-center group shrink-0 py-1" aria-label="Dhakaiya Dripz Home">
                <div className="relative flex items-center">
                  <img
                    src="/uploads/dhakaiya-horizontal-white.png"
                    alt="Dhakaiya Dripz"
                    className="h-9 sm:h-11 lg:h-12 w-auto max-w-[190px] sm:max-w-[240px] object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>

              {/* ASOS-Style Gender Tabs (WOMEN | MEN | UNISEX) with Active White Underline */}
              <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 h-16 sm:h-20 pl-2 lg:pl-5">
                {(["WOMEN", "MEN", "UNISEX"] as const).map((gender) => {
                  const isActive = activeGender === gender;
                  return (
                    <button
                      key={gender}
                      onClick={() => handleGenderSwitch(gender)}
                      className={`h-full px-3.5 flex items-center justify-center text-xs lg:text-sm font-black tracking-widest uppercase transition-colors relative ${
                        isActive ? "text-white" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {gender}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-[3px] bg-white rounded-t-full shadow-xs" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Middle: Signature ASOS White Pill Search Bar */}
            <div className="flex-1 max-w-2xl min-w-[150px] sm:min-w-[200px] mx-2 sm:mx-4">
              <div
                onClick={() => setIsSearchOpen(true)}
                className="w-full relative cursor-pointer group"
              >
                <input
                  type="text"
                  readOnly
                  placeholder="Search for items and brands"
                  onClick={() => setIsSearchOpen(true)}
                  className="w-full h-10 sm:h-11 pl-4 sm:pl-5 pr-10 sm:pr-11 bg-white hover:bg-zinc-100 text-zinc-950 placeholder-zinc-500 rounded-full text-xs sm:text-sm font-medium focus:outline-none cursor-pointer shadow-sm transition truncate"
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-700 group-hover:text-black transition">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            </div>

            {/* Right: Actions (Theme Toggle, Wishlist, Bag) */}
            <div className="flex items-center space-x-1.5 sm:space-x-3.5 shrink-0 text-white">
              
              {/* Theme Toggle (Light / Dark) */}
              <ThemeToggle />

              {/* Wishlist Heart Icon with White Badge */}
              <Link
                href="/wishlist"
                className="p-2 text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition relative"
                aria-label="Wishlist"
                title="Saved Items"
              >
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {totalWishlistItems}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Drawer Trigger */}
              <button
                onClick={openCart}
                className="p-2 text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition relative group"
                aria-label="Open Cart Drawer"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-105 transition" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-black font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TIER 2: ASOS SUB-NAVBAR STRIP (Categories, New in, Sale, Trending)         */}
        {/* ========================================================================= */}
        <div
          className="bg-[#141414] border-t border-zinc-800/80 border-b border-zinc-900 relative"
          onMouseLeave={handleCategoryMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-5 sm:space-x-7 overflow-x-auto no-scrollbar py-2.5 sm:py-3 text-xs sm:text-[13px] font-medium tracking-wide whitespace-nowrap text-zinc-300">
              {/* Shop All Direct Link / Button */}
              <Link
                href="/shop"
                onMouseEnter={() => setHoveredCategory(null)}
                className="bg-white text-black hover:bg-zinc-200 font-black text-xs uppercase tracking-wider px-3.5 py-1 rounded-[2px] transition flex items-center gap-1.5 shrink-0 shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Shop</span>
              </Link>

              <Link
                href="/shop?filter=new"
                onMouseEnter={() => setHoveredCategory(null)}
                className="text-white hover:underline transition flex items-center gap-1.5 shrink-0 font-black"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>New in</span>
              </Link>

              {/* Dynamic Categories with Authentic ASOS Active Highlight */}
              {categories.map((cat) => {
                const isHovered = hoveredCategory?.id === cat.id;
                return (
                  <div
                    key={cat.id}
                    className="relative shrink-0 flex items-center"
                    onMouseEnter={() => handleCategoryMouseEnter(cat)}
                  >
                    <Link
                      href={`/shop?category=${encodeURIComponent(cat.name)}`}
                      className={`transition-colors shrink-0 text-xs sm:text-[13px] py-1 ${
                        isHovered
                          ? "bg-[#0055ff] text-white font-bold px-3.5 rounded-[2px]"
                          : "text-zinc-300 hover:text-white px-3 font-medium"
                      }`}
                    >
                      <span>{cat.name}</span>
                    </Link>
                  </div>
                );
              })}

              <Link
                href="/shop?sort=price-asc"
                onMouseEnter={() => setHoveredCategory(null)}
                className="hover:text-white hover:underline transition shrink-0 font-medium"
              >
                Trending
              </Link>

              <Link
                href="/shop?filter=sale"
                onMouseEnter={() => setHoveredCategory(null)}
                className="bg-white hover:bg-zinc-200 text-black font-black text-[11px] uppercase tracking-wider px-3 py-0.5 rounded-full transition shrink-0 shadow-xs"
              >
                Sale
              </Link>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* ASOS MEGA MENU DROPDOWN PANEL (EXACT 4-COLUMN SCREENSHOT REPLICA)         */}
          {/* ========================================================================= */}
          {hoveredCategory && (() => {
            const cat = hoveredCategory;
            const subs = cat.subcategories || [];

            // Split real subcategories across Column 2 and Column 3
            const mid = Math.ceil(subs.length / 2);
            const col2Subs = subs.slice(0, mid);
            const col3Subs = subs.slice(mid);

            const col2Title = `SHOP BY ${cat.name.toUpperCase()}`;
            const col3Title = `SHOP BY SILHOUETTES`;
            const editorialTitle = `${cat.name.toUpperCase()} EDIT`;
            const hasImage = Boolean(cat.image);

            return (
              <div
                onMouseEnter={handleMegaMenuMouseEnter}
                onMouseLeave={handleCategoryMouseLeave}
                className="absolute left-0 right-0 top-full z-50 flex justify-center"
              >
                <div className="w-full max-w-[1240px] mx-auto bg-white text-zinc-900 shadow-2xl border-x border-b border-zinc-200 px-6 sm:px-8 lg:px-12 py-8 animate-in fade-in duration-100">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
                    
                    {/* Column 1: SHOP BY PRODUCT (Text-only list) */}
                    <div className="md:col-span-3">
                      <h3 className="text-xs font-bold tracking-wider uppercase text-black mb-3">
                        SHOP BY PRODUCT
                      </h3>
                      <div className="space-y-1.5">
                        <Link
                          href={`/shop?category=${encodeURIComponent(cat.name)}`}
                          onClick={() => setHoveredCategory(null)}
                          className="block text-xs text-zinc-700 hover:text-black hover:underline transition font-bold"
                        >
                          View all
                        </Link>
                        <Link
                          href={`/shop?category=${encodeURIComponent(cat.name)}&filter=new`}
                          onClick={() => setHoveredCategory(null)}
                          className="block text-xs text-zinc-600 hover:text-black hover:underline transition"
                        >
                          New in
                        </Link>
                        <Link
                          href={`/shop?category=${encodeURIComponent(cat.name)}&sort=popular`}
                          onClick={() => setHoveredCategory(null)}
                          className="block text-xs text-zinc-600 hover:text-black hover:underline transition"
                        >
                          Selling Fast
                        </Link>
                        {subs.map((s, idx) => (
                          <Link
                            key={s.id || idx}
                            href={`/shop?category=${encodeURIComponent(cat.name)}&sub=${encodeURIComponent(s.name)}`}
                            onClick={() => setHoveredCategory(null)}
                            className="block text-xs text-zinc-600 hover:text-black hover:underline transition truncate"
                          >
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: SHOP BY [CATEGORY] (Circle avatar thumbnails if available) */}
                    <div className="md:col-span-3">
                      <h3 className="text-xs font-bold tracking-wider uppercase text-black mb-3">
                        {col2Title}
                      </h3>
                      <div className="space-y-2">
                        <Link
                          href={`/shop?category=${encodeURIComponent(cat.name)}`}
                          onClick={() => setHoveredCategory(null)}
                          className="flex items-center gap-2.5 group"
                        >
                          <div className="w-7 h-7 rounded-full overflow-hidden bg-zinc-900 border border-zinc-200/80 shrink-0 flex items-center justify-center text-white">
                            {hasImage ? (
                              <img
                                src={cat.image}
                                alt="View all"
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                              />
                            ) : (
                              <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                            )}
                          </div>
                          <span className="text-xs text-zinc-700 group-hover:text-black group-hover:underline transition">
                            View all
                          </span>
                        </Link>
                        {col2Subs.map((item, idx) => (
                          <Link
                            key={item.id || idx}
                            href={`/shop?category=${encodeURIComponent(cat.name)}&sub=${encodeURIComponent(item.name)}`}
                            onClick={() => setHoveredCategory(null)}
                            className="flex items-center gap-2.5 group"
                          >
                            <div className="w-7 h-7 rounded-full overflow-hidden bg-zinc-100 border border-zinc-200/80 shrink-0 flex items-center justify-center">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                />
                              ) : (
                                <span className="w-2 h-2 rounded-full bg-zinc-400 group-hover:bg-black transition" />
                              )}
                            </div>
                            <span className="text-xs text-zinc-700 group-hover:text-black group-hover:underline transition truncate">
                              {item.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Column 3: SHOP BY SILHOUETTES */}
                    <div className="md:col-span-3">
                      <h3 className="text-xs font-bold tracking-wider uppercase text-black mb-3">
                        {col3Title}
                      </h3>
                      <div className="space-y-2">
                        <Link
                          href={`/shop?category=${encodeURIComponent(cat.name)}`}
                          onClick={() => setHoveredCategory(null)}
                          className="flex items-center gap-2.5 group"
                        >
                          <div className="w-7 h-7 rounded-full overflow-hidden bg-zinc-900 border border-zinc-200/80 shrink-0 flex items-center justify-center text-white">
                            {hasImage ? (
                              <img
                                src={cat.image}
                                alt="View all"
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                              />
                            ) : (
                              <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                            )}
                          </div>
                          <span className="text-xs text-zinc-700 group-hover:text-black group-hover:underline transition">
                            View all
                          </span>
                        </Link>
                        {col3Subs.map((item, idx) => (
                          <Link
                            key={item.id || idx}
                            href={`/shop?category=${encodeURIComponent(cat.name)}&sub=${encodeURIComponent(item.name)}`}
                            onClick={() => setHoveredCategory(null)}
                            className="flex items-center gap-2.5 group"
                          >
                            <div className="w-7 h-7 rounded-full overflow-hidden bg-zinc-100 border border-zinc-200/80 shrink-0 flex items-center justify-center">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                />
                              ) : (
                                <span className="w-2 h-2 rounded-full bg-zinc-400 group-hover:bg-black transition" />
                              )}
                            </div>
                            <span className="text-xs text-zinc-700 group-hover:text-black group-hover:underline transition truncate">
                              {item.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Column 4: Category Editorial Card */}
                    <div className="md:col-span-3 flex justify-end">
                      <Link
                        href={`/shop?category=${encodeURIComponent(cat.name)}`}
                        onClick={() => setHoveredCategory(null)}
                        className="group relative block w-full max-w-[270px] aspect-[4/5] overflow-hidden bg-zinc-950 rounded-[2px] shadow-xs hover:shadow-md transition"
                      >
                        {hasImage ? (
                          <img
                            src={cat.image}
                            alt={editorialTitle}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 p-6 text-center space-y-3">
                            <img
                              src="/uploads/dhakaiya-crest-white.png"
                              alt="Dhakaiya Dripz"
                              className="w-14 h-14 object-contain opacity-80 group-hover:scale-110 transition duration-300"
                            />
                            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                              DHAKAIYA ARCHIVE
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        <div className="absolute bottom-5 inset-x-3 text-center">
                          <span className="text-xs sm:text-[13px] font-black uppercase tracking-widest text-white drop-shadow-md">
                            {editorialTitle}
                          </span>
                        </div>
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-800 bg-[#0a0a0a] px-4 pt-4 pb-6 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-center bg-zinc-900 p-1 rounded-full mb-4">
              {(["WOMEN", "MEN", "UNISEX"] as const).map((gender) => (
                <button
                  key={gender}
                  onClick={() => {
                    handleGenderSwitch(gender);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex-1 py-1.5 text-xs font-black rounded-full transition ${
                    activeGender === gender ? "bg-white text-black" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>

            <div className="flex flex-col space-y-2">
              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-black text-black bg-white hover:bg-zinc-200 rounded-lg flex items-center justify-between transition shadow-xs uppercase tracking-wider"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-black" />
                  <span>Shop All Drops</span>
                </span>
                <ArrowRight className="w-4 h-4 text-black" />
              </Link>

              <Link
                href="/shop?filter=new"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-bold text-white hover:bg-zinc-900 rounded-lg flex items-center justify-between"
              >
                <span>New in Drops</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>

              {categories.map((cat) => {
                const isExpanded = expandedMobileCat === cat.id;
                const hasSubs = cat.subcategories && cat.subcategories.length > 0;
                return (
                  <div key={cat.id} className="rounded-xl border border-zinc-900 overflow-hidden bg-zinc-950/40">
                    <div className="flex items-center justify-between p-3 hover:bg-zinc-900/70 transition">
                      <Link
                        href={`/shop?category=${encodeURIComponent(cat.name)}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 text-sm font-bold text-white flex-1"
                      >
                        {cat.image ? (
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-7 h-7 rounded-lg object-cover border border-zinc-700"
                          />
                        ) : null}
                        <span>{cat.name}</span>
                      </Link>

                      {hasSubs && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedMobileCat(isExpanded ? null : cat.id);
                          }}
                          className="p-1.5 text-zinc-400 hover:text-white rounded-lg"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? "rotate-180 text-white" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Mobile Subcategories Accordion */}
                    {hasSubs && isExpanded && (
                      <div className="px-4 pb-3 pt-1 space-y-1.5 bg-zinc-900/40 border-t border-zinc-900">
                        <Link
                          href={`/shop?category=${encodeURIComponent(cat.name)}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-xs font-bold text-[#00a3ff] py-1 hover:underline"
                        >
                          All {cat.name} →
                        </Link>
                        {cat.subcategories!.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/shop?category=${encodeURIComponent(cat.name)}&sub=${encodeURIComponent(sub.name)}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-between py-1.5 px-2 rounded-lg text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
                          >
                            <div className="flex items-center gap-2">
                              {sub.image && (
                                <img
                                  src={sub.image}
                                  alt={sub.name}
                                  className="w-5 h-5 rounded-md object-cover border border-zinc-800"
                                />
                              )}
                              <span>{sub.name}</span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Global Predictive Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
