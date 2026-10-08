"use client";

import React from "react";
import Link from "next/link";
import {
  Menu,
  Plus,
  ExternalLink,
  PhoneCall,
  Search,
  LogOut,
} from "lucide-react";
import ThemeToggle from "@/components/store/ThemeToggle";
import { AdminTab } from "./AdminSidebar";

interface AdminHeaderProps {
  activeTab: AdminTab;
  onOpenMobileSidebar: () => void;
  onOpenAddProduct: () => void;
  pendingOrderCount: number;
  totalRevenueFormatted: string;
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  onLogout?: () => void;
}

export default function AdminHeader({
  activeTab,
  onOpenMobileSidebar,
  onOpenAddProduct,
  pendingOrderCount,
  totalRevenueFormatted,
  globalSearchQuery,
  setGlobalSearchQuery,
  onLogout,
}: AdminHeaderProps) {
  const getTabTitle = (tab: AdminTab) => {
    switch (tab) {
      case "overview":
        return "Dashboard Overview";
      case "products":
        return "Products Catalog";
      case "orders":
        return "Orders & Cash On Delivery";
      case "categories":
        return "Categories Taxonomy";
      case "attributes":
        return "Color Swatches & Sizes";
      case "branding":
        return "Store Brand & Logo";
      default:
        return "Admin Control";
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-900 transition-colors">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger + Clear Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            title="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <span>Admin</span>
              <span>/</span>
              <span className="text-zinc-600 dark:text-zinc-300 font-bold capitalize">
                {activeTab}
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-black text-zinc-950 dark:text-white uppercase tracking-tight">
              {getTabTitle(activeTab)}
            </h1>
          </div>
        </div>

        {/* Center: Global Search */}
        <div className="hidden md:flex items-center flex-1 max-w-sm mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              placeholder="Search catalog, order #, customer phone..."
              className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-black dark:focus:border-[#0088ff] transition"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          {pendingOrderCount > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold px-3 py-1.5 rounded-xl">
              <PhoneCall className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{pendingOrderCount} COD Calls</span>
            </div>
          )}

          <button
            onClick={onOpenAddProduct}
            className="bg-gradient-to-r from-[#0066ff] to-[#00a3ff] hover:from-[#0055dd] hover:to-[#0092ee] text-white font-black text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-2 shadow-md shadow-[#0088ff]/25 transition shrink-0 uppercase tracking-tight"
            title="Create new product"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Product</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition shadow-2xs"
            title="Open customer storefront in new tab"
          >
            <span>Live Store</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 bg-zinc-100 dark:bg-zinc-900 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-red-200 dark:hover:border-red-900/50 transition shadow-2xs"
              title="Sign out of Admin Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}

          <div className="lg:hidden">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
