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
      {/* Top Utility Promotional Ticker Banner */}
      <div className="bg-zinc-950 text-zinc-300 text-xs py-2 px-4 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-hidden">
            <span className="inline-flex items-center gap-1 bg-[#d4ff00] text-black font-extrabold text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider">
              <Zap className="w-3 h-3" /> Flash Drop
            </span>
            <span className="truncate text-xs font-medium">
              Free Delivery Across Bangladesh on Orders Over ৳3,000 | Next-Day Dhaka Shipping ⚡
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs font-medium text-zinc-400">
            <Link href="/admin" className="hover:text-[#d4ff00] transition flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4ff00]" /> Admin Portal
            </Link>
            <span className="text-zinc-600">|</span>
            <span className="hover:text-white cursor-pointer transition">Cash on Delivery (COD)</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header with 2 Tiers (ASOS Architecture) */}
      <header className="sticky top-0 z-40 bg-zinc-950 text-white shadow-md transition-colors duration-200">
        
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

              {/* Brand Logo */}
              <Link href="/" className="inline-flex items-center group shrink-0">
                {customLogoUrl && !logoLoadError ? (
                  <img
                    src={customLogoUrl}
                    alt="Dhakaiya Dripz Logo"
                    onError={() => setLogoLoadError(true)}
                    className="h-8 sm:h-10 lg:h-11 w-auto max-w-[150px] sm:max-w-[200px] object-contain group-hover:opacity-90 transition"
                  />
                ) : (
                  <span className="font-black text-xl sm:text-2xl lg:text-3xl tracking-tighter text-white uppercase group-hover:opacity-90 transition">
                    DHAKAIYA<span className="text-[#d4ff00]">DRIPZ</span>
                  </span>
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
                  className="w-full h-10 sm:h-11 pl-5 pr-11 bg-white text-zinc-900 placeholder-zinc-500 rounded-full text-xs sm:text-sm font-medium focus:outline-none cursor-pointer shadow-inner border border-transparent hover:border-zinc-300 transition"
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 group-hover:text-black transition">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            </div>

            {/* Right: Actions (Theme Toggle, Account, Wishlist, Bag) */}
            <div className="flex items-center space-x-1.5 sm:space-x-3.5 shrink-0 text-white">
              
              {/* Theme Toggle (Light / Dark) */}
              <ThemeToggle />

              {/* Account / Admin Portal */}
              <Link
                href="/admin"
                className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-full transition hidden sm:inline-flex"
                title="Admin Dashboard & Account"
                aria-label="Account"
              >
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>

              {/* Wishlist Heart Icon with Badge */}
              <Link
                href="/wishlist"
                className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-full transition relative"
                aria-label="Wishlist"
                title="Saved Items"
              >
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalWishlistItems}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Drawer Trigger */}
              <button
                onClick={openCart}
                className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-full transition relative group"
                aria-label="Open Cart Drawer"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-[#d4ff00] transition" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#d4ff00] text-black font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
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
        <div className="bg-[#525050] dark:bg-zinc-900 border-t border-zinc-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-6 sm:space-x-8 overflow-x-auto no-scrollbar py-2.5 sm:py-3 text-xs sm:text-[13px] font-medium tracking-wide whitespace-nowrap text-zinc-200">
              
              <Link
                href="/shop?filter=new"
                className="hover:text-[#d4ff00] transition flex items-center gap-1.5 shrink-0 font-bold"
              >
                <span className="w-2 h-2 rounded-full bg-[#d4ff00] animate-pulse" />
                <span>New in</span>
              </Link>

              {/* Dynamic Categories from Context & Database */}
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${encodeURIComponent(cat.name)}`}
                  className="hover:text-white hover:underline transition shrink-0"
                >
                  {cat.name}
                </Link>
              ))}

              <Link
                href="/shop?sort=price-asc"
                className="hover:text-white hover:underline transition shrink-0"
              >
                Trending
              </Link>

              <Link
                href="/shop?filter=sale"
                className="bg-red-600 hover:bg-red-700 text-white font-black text-[11px] uppercase tracking-wider px-2 py-0.5 rounded transition shrink-0 shadow-xs"
              >
                Sale
              </Link>

            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-800 bg-zinc-950 px-4 pt-4 pb-6 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-center bg-zinc-900 p-1 rounded-full mb-4">
              {(["WOMEN", "MEN", "UNISEX"] as const).map((gender) => (
                <button
                  key={gender}
                  onClick={() => {
                    handleGenderSwitch(gender);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-full ${
                    activeGender === gender ? "bg-white text-black" : "text-zinc-400"
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
                className="px-3 py-2 text-sm font-semibold text-[#d4ff00] hover:bg-zinc-900 rounded-lg flex items-center justify-between"
              >
                <span>New in Drops</span>
                <ArrowRight className="w-4 h-4 text-[#d4ff00]" />
              </Link>

              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${encodeURIComponent(cat.name)}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-semibold text-zinc-200 hover:text-white hover:bg-zinc-900 rounded-lg flex items-center justify-between"
                >
                  <span>{cat.name}</span>
                  <ArrowRight className="w-4 h-4 text-zinc-600" />
                </Link>
              ))}

              <div className="pt-3 border-t border-zinc-800">
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-semibold text-[#d4ff00] hover:bg-zinc-900 rounded-lg flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#d4ff00]" /> Admin Portal
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Predictive Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
