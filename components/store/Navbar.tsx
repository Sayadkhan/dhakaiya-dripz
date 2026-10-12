"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, Heart, Search, Menu, X, ArrowRight, ShieldCheck, Zap, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useProducts } from "@/context/ProductContext";
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

      {/* Main Sticky Header with 2 Tiers (Editorial ASOS Architecture - Clean High-Fashion) */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md text-zinc-950 dark:text-white shadow-xs border-b border-zinc-200/90 dark:border-zinc-800 transition-colors duration-200">
        
        {/* ========================================================================= */}
        {/* TIER 1: TOP MAIN BAR (Logo, Gender Tabs, Big Search Bar, User, Wishlist, Bag) */}
        {/* ========================================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
            
            {/* Left: Mobile Menu Toggle + Brand Logo + Gender Tabs */}
            <div className="flex items-center gap-2 sm:gap-6 shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1.5 text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Brand Logo - Crisp, Prominent & High-Legibility with Light/Dark Support */}
              <Link href="/" className="inline-flex items-center group shrink-0 py-1" aria-label="Dhakaiya Dripz Home">
                {customLogoUrl && !logoLoadError ? (
                  <div className="relative flex items-center">
                    {/* Light mode logo */}
                    <img
                      src={
                        customLogoUrl.includes("Dhakaiya Dripz-02")
                          ? "/uploads/dhakaiya-horizontal-black.png"
                          : customLogoUrl
                      }
                      alt="Dhakaiya Dripz"
                      onError={() => setLogoLoadError(true)}
                      className="h-10 sm:h-12 lg:h-13 w-auto max-w-[190px] sm:max-w-[240px] object-contain block dark:hidden transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Dark mode logo */}
                    <img
                      src={
                        customLogoUrl.includes("Dhakaiya Dripz-02") || customLogoUrl.includes("dhakaiya-horizontal-black")
                          ? "/uploads/dhakaiya-horizontal-white.png"
                          : customLogoUrl
                      }
                      alt="Dhakaiya Dripz"
                      className="h-10 sm:h-12 lg:h-13 w-auto max-w-[190px] sm:max-w-[240px] object-contain hidden dark:block transition-transform duration-300 group-hover:scale-105 dark:brightness-0 dark:invert"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/uploads/dhakaiya-crest-black.png"
                      alt="DD"
                      className="h-9 w-auto block dark:hidden"
                    />
                    <img
                      src="/uploads/dhakaiya-crest-white.png"
                      alt="DD"
                      className="h-9 w-auto hidden dark:block"
                    />
                    <div className="flex flex-col leading-none">
                      <span className="font-serif-brand text-lg sm:text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                        Dhakaiya
                      </span>
                      <span className="font-serif-brand text-xs sm:text-sm italic tracking-widest text-zinc-600 dark:text-zinc-400">
                        Dripz
                      </span>
                    </div>
                  </div>
                )}
              </Link>

              {/* ASOS-Style Gender Tabs (WOMEN | MEN | UNISEX) with Active Underline */}
              <div className="hidden md:flex items-center space-x-1 lg:space-x-2 h-16 sm:h-20 pl-2 lg:pl-5">
                {(["WOMEN", "MEN", "UNISEX"] as const).map((gender) => {
                  const isActive = activeGender === gender;
                  return (
                    <button
                      key={gender}
                      onClick={() => handleGenderSwitch(gender)}
                      className={`h-full px-3.5 flex items-center justify-center text-xs lg:text-sm font-black tracking-widest uppercase transition-colors relative ${
                        isActive ? "text-black dark:text-white" : "text-zinc-500 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      {gender}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-[3px] bg-black dark:bg-white rounded-t-full shadow-xs" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Middle: Prominent ASOS Search Bar */}
            <div className="flex-1 max-w-2xl min-w-0 mx-2 sm:mx-4">
              <div
                onClick={() => setIsSearchOpen(true)}
                className="w-full relative cursor-pointer group"
              >
                <input
                  type="text"
                  readOnly
                  placeholder="Search for items and brands"
                  onClick={() => setIsSearchOpen(true)}
                  className="w-full h-10 sm:h-11 pl-5 pr-11 bg-zinc-100 hover:bg-zinc-200/70 dark:bg-zinc-900 dark:hover:bg-zinc-800/80 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 rounded-full text-xs sm:text-sm font-medium focus:outline-none cursor-pointer border border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700 transition"
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            </div>

            {/* Right: Actions (Theme Toggle, Account, Wishlist, Bag) */}
            <div className="flex items-center space-x-1.5 sm:space-x-3.5 shrink-0 text-zinc-900 dark:text-zinc-100">
              
              {/* Theme Toggle (Light / Dark) */}
              <ThemeToggle />

              {/* Wishlist Heart Icon with Badge */}
              <Link
                href="/wishlist"
                className="p-2 text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition relative"
                aria-label="Wishlist"
                title="Saved Items"
              >
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white dark:bg-white dark:text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {totalWishlistItems}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Drawer Trigger */}
              <button
                onClick={openCart}
                className="p-2 text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition relative group"
                aria-label="Open Cart Drawer"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-105 transition" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white dark:bg-white dark:text-black font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
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
        <div className="bg-white/90 dark:bg-zinc-950/90 border-t border-zinc-100 dark:border-zinc-800/80 border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-6 sm:space-x-8 overflow-x-auto no-scrollbar py-2.5 sm:py-3 text-xs sm:text-[13px] font-medium tracking-wide whitespace-nowrap text-zinc-700 dark:text-zinc-300">
              
              <Link
                href="/shop?filter=new"
                className="text-black dark:text-white hover:underline transition flex items-center gap-1.5 shrink-0 font-black"
              >
                <span className="w-2 h-2 rounded-full bg-black dark:bg-white animate-pulse" />
                <span>New in</span>
              </Link>

              {/* Dynamic Categories from Context & Database */}
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${encodeURIComponent(cat.name)}`}
                  className="hover:text-black dark:hover:text-white hover:underline transition shrink-0 font-medium"
                >
                  {cat.name}
                </Link>
              ))}

              <Link
                href="/shop?sort=price-asc"
                className="hover:text-black dark:hover:text-white hover:underline transition shrink-0 font-medium"
              >
                Trending
              </Link>

              <Link
                href="/shop?filter=sale"
                className="bg-black hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-white font-black text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full transition shrink-0 shadow-xs"
              >
                Sale
              </Link>

            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-4 pb-6 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 p-1 rounded-full mb-4">
              {(["WOMEN", "MEN", "UNISEX"] as const).map((gender) => (
                <button
                  key={gender}
                  onClick={() => {
                    handleGenderSwitch(gender);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex-1 py-1.5 text-xs font-black rounded-full transition ${
                    activeGender === gender ? "bg-black text-white dark:bg-white dark:text-black" : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>

            <div className="flex flex-col space-y-2">
              <Link
                href="/shop?filter=new"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-bold text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg flex items-center justify-between"
              >
                <span>New in Drops</span>
                <ArrowRight className="w-4 h-4 text-black dark:text-white" />
              </Link>

              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${encodeURIComponent(cat.name)}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-6 h-6 rounded-md object-cover border border-zinc-200 dark:border-zinc-700"
                      />
                    ) : null}
                    <span>{cat.name}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                </Link>
              ))}

            </div>
          </div>
        )}
      </header>

      {/* Global Predictive Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
