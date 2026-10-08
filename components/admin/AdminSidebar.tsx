"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  FolderTree,
  Palette,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Store,
  Layers,
  LogOut,
} from "lucide-react";
import ThemeToggle from "@/components/store/ThemeToggle";

export type AdminTab =
  | "overview"
  | "products"
  | "orders"
  | "categories"
  | "attributes"
  | "branding";

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  productCount: number;
  orderCount: number;
  pendingOrderCount: number;
  customLogoUrl: string | null;
  onLogout?: () => void;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  productCount,
  orderCount,
  pendingOrderCount,
  customLogoUrl,
  onLogout,
}: AdminSidebarProps) {
  const [logoError, setLogoError] = React.useState(false);

  React.useEffect(() => {
    setLogoError(false);
  }, [customLogoUrl]);

  const navItems = [
    {
      id: "overview" as AdminTab,
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "products" as AdminTab,
      label: "Products Catalog",
      icon: Package,
      badge: `${productCount}`,
      badgeColor: "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300",
    },
    {
      id: "orders" as AdminTab,
      label: "Orders & COD",
      icon: ShoppingBag,
      badge: pendingOrderCount > 0 ? `${pendingOrderCount} New` : `${orderCount}`,
      badgeColor:
        pendingOrderCount > 0
          ? "bg-amber-400 text-black font-extrabold"
          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300",
    },
    {
      id: "categories" as AdminTab,
      label: "Categories",
      icon: FolderTree,
      badge: null,
    },
    {
      id: "attributes" as AdminTab,
      label: "Colors & Sizes",
      icon: Palette,
      badge: null,
    },
    {
      id: "branding" as AdminTab,
      label: "Settings & Branding",
      icon: Sparkles,
      badge: customLogoUrl ? "Active" : null,
      badgeColor: "bg-emerald-500 text-white",
    },
  ];

  const handleNavClick = (tab: AdminTab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-900 transition-all duration-200 select-none">
      {/* Top Brand & Header */}
      <div>
        <div className="h-20 px-3.5 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50/40 dark:bg-zinc-950/40">
          <div className="flex items-center gap-2.5 overflow-hidden">
            {collapsed && !mobileOpen ? (
              <div
                className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-1 shadow-xs cursor-pointer"
                onClick={() => setCollapsed(false)}
                title="Expand Dhakaiya Dripz Menu"
              >
                {customLogoUrl && !logoError ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={customLogoUrl}
                    alt="Logo"
                    onError={() => setLogoError(true)}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="font-black text-xs text-[#00a3ff]">DD</span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 py-1">
                {customLogoUrl && !logoError ? (
                  <div className="flex flex-col">
                    {/* eslint-disable-next-line @next/next/no-img-element */ }
                    <img
                      src={customLogoUrl}
                      alt="Dhakaiya Dripz"
                      onError={() => setLogoError(true)}
                      className="h-11 sm:h-12 w-auto max-w-[170px] object-contain drop-shadow-sm filter"
                    />
                    <span className="text-[9px] text-[#00a3ff] font-mono tracking-widest uppercase font-bold pl-1 mt-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00a3ff] animate-pulse" />
                      Control Center
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0066ff] to-[#00d2ff] text-white flex items-center justify-center font-black text-xs shadow-md shadow-[#0088ff]/25">
                      DD
                    </div>
                    <div>
                      <div className="font-black text-base tracking-tight text-zinc-950 dark:text-white uppercase leading-none">
                        DHAKAIYA<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0088ff] to-[#00d2ff]">DRIPZ</span>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase block mt-1">
                        Control Center
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile close toggle */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="p-3 space-y-1.5">
          {(!collapsed || mobileOpen) && (
            <div className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
              <span>Main Menu</span>
              <span className="text-[9px] text-[#00a3ff] font-bold">CYBER V2</span>
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                title={collapsed && !mobileOpen ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition relative group ${
                  isActive
                    ? "bg-gradient-to-r from-[#0066ff] to-[#00a3ff] text-white font-bold shadow-md shadow-[#0088ff]/25"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900/60"
                } ${collapsed && !mobileOpen ? "justify-center px-0" : ""}`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white"
                  }`}
                />

                {(!collapsed || mobileOpen) && (
                  <div className="flex-1 flex items-center justify-between overflow-hidden">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ml-2 ${
                          isActive
                            ? "bg-white/20 text-white"
                            : item.badgeColor || "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Area: Customer Store link, Theme Toggle & Admin Profile */}
      <div className="p-3 border-t border-zinc-200 dark:border-zinc-900 space-y-2.5 bg-zinc-50/50 dark:bg-zinc-950">
        <Link
          href="/"
          target="_blank"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[#00a3ff]/40 transition shadow-2xs ${
            collapsed && !mobileOpen ? "justify-center px-0" : ""
          }`}
          title="Open customer storefront in new tab"
        >
          <Store className="w-4 h-4 text-[#00a3ff] shrink-0" />
          {(!collapsed || mobileOpen) && (
            <div className="flex-1 flex items-center justify-between">
              <span>View Store</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </div>
          )}
        </Link>

        {(!collapsed || mobileOpen) ? (
          <div className="flex items-center justify-between px-1.5 pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-xs font-black">
                OP
              </div>
              <div>
                <div className="text-xs font-bold leading-tight text-zinc-900 dark:text-white">Admin Staff</div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition"
                  title="Sign out of Admin Portal"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <ThemeToggle />
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition"
                title="Sign out of Admin Portal"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block fixed top-0 bottom-0 left-0 z-40 transition-all duration-200 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden animate-in fade-in duration-150"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 lg:hidden transition-transform duration-200 transform ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
