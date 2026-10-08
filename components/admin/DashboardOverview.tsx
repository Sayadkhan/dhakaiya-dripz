"use client";

import React from "react";
import {
  TrendingUp,
  Package,
  PhoneCall,
  ShoppingBag,
  FolderPlus,
  ArrowRight,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { OrderItemRecord, ProductItem } from "@/lib/mock-data";
import { CategoryItem } from "@/context/ProductContext";
import { formatPrice } from "@/lib/utils";
import { AdminTab } from "./AdminSidebar";

interface DashboardOverviewProps {
  products: ProductItem[];
  orders: OrderItemRecord[];
  categories: CategoryItem[];
  onNavigateTab: (tab: AdminTab) => void;
  onOpenAddProduct: () => void;
  onUpdateOrderStatus: (
    orderId: string,
    newStatus: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
  ) => void;
}

export default function DashboardOverview({
  products,
  orders,
  categories,
  onNavigateTab,
  onOpenAddProduct,
  onUpdateOrderStatus,
}: DashboardOverviewProps) {
  // Calculations
  const totalRevenue = orders
    .filter((o) => o.orderStatus !== "CANCELLED")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingOrders = orders.filter((o) => o.orderStatus === "PENDING");
  const confirmedOrders = orders.filter((o) => o.orderStatus === "CONFIRMED");
  const shippedOrders = orders.filter((o) => o.orderStatus === "SHIPPED");
  const deliveredOrders = orders.filter((o) => o.orderStatus === "DELIVERED");
  const cancelledOrders = orders.filter((o) => o.orderStatus === "CANCELLED");

  const totalStockCount = products.reduce((sum, p) => sum + p.stockCount, 0);
  const lowStockProducts = products.filter((p) => p.stockCount <= 5);

  // Recent 5 orders
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top 4 KPI Metrics - Prominent & Clear */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Revenue */}
        <div className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
            <span>Sales Revenue</span>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-[#00a3ff]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-black text-zinc-950 dark:text-white">
            {formatPrice(totalRevenue)}
          </div>
          <div className="flex items-center justify-between text-xs text-zinc-500 pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
            <span>Cash on Delivery</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              {orders.length - cancelledOrders.length} verified orders
            </span>
          </div>
        </div>

        {/* Metric 2: Pending COD Calls */}
        <div
          onClick={() => onNavigateTab("orders")}
          className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 space-y-2 shadow-xs hover:border-amber-400 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
            <span>Pending COD Calls</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <PhoneCall className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-black text-amber-600 dark:text-amber-400 flex items-center justify-between">
            <span>{pendingOrders.length}</span>
            {pendingOrders.length > 0 && (
              <span className="text-[10px] uppercase font-sans font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                Action Required
              </span>
            )}
          </div>
          <div className="flex items-center justify-between text-xs text-zinc-500 pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
            <span>Phone verification queue</span>
            <span className="text-zinc-700 dark:text-zinc-300 font-bold group-hover:underline flex items-center gap-1">
              Review <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Metric 3: Active Silhouettes & Stock */}
        <div
          onClick={() => onNavigateTab("products")}
          className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 space-y-2 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
            <span>Product Catalog</span>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-black text-zinc-950 dark:text-white flex items-center justify-between">
            <span>{products.length}</span>
            <span className="text-xs font-mono font-bold text-zinc-400">
              {totalStockCount} units
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-zinc-500 pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
            <span>
              {lowStockProducts.length > 0 ? (
                <span className="text-red-500 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {lowStockProducts.length} low in stock
                </span>
              ) : (
                "Healthy stock"
              )}
            </span>
            <span className="text-zinc-700 dark:text-zinc-300 font-bold group-hover:underline flex items-center gap-1">
              Table <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Metric 4: Categories & Taxonomy */}
        <div
          onClick={() => onNavigateTab("categories")}
          className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 space-y-2 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
            <span>Categories</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <FolderPlus className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-black text-zinc-950 dark:text-white">
            {categories.length}
          </div>
          <div className="flex items-center justify-between text-xs text-zinc-500 pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
            <span>Silhouettes architecture</span>
            <span className="text-zinc-700 dark:text-zinc-300 font-bold group-hover:underline flex items-center gap-1">
              Taxonomy <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Middle Row: Fulfillment Pipeline & Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Orders Pipeline Breakdown */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="font-bold text-sm uppercase tracking-tight text-zinc-950 dark:text-white">
              Fulfillment Pipeline
            </h3>
            <button
              onClick={() => onNavigateTab("orders")}
              className="text-xs font-bold text-zinc-500 hover:text-black dark:hover:text-white flex items-center gap-1"
            >
              <span>View all ({orders.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-5 gap-3">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
              <div className="text-[10px] font-mono font-bold uppercase text-amber-700 dark:text-amber-400">
                Pending Call
              </div>
              <div className="text-xl font-mono font-black text-amber-700 dark:text-amber-400 mt-1">
                {pendingOrders.length}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <div className="text-[10px] font-mono font-bold uppercase text-emerald-700 dark:text-emerald-400">
                Confirmed
              </div>
              <div className="text-xl font-mono font-black text-emerald-700 dark:text-emerald-400 mt-1">
                {confirmedOrders.length}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-center">
              <div className="text-[10px] font-mono font-bold uppercase text-sky-700 dark:text-sky-400">
                Dispatched
              </div>
              <div className="text-xl font-mono font-black text-sky-700 dark:text-sky-400 mt-1">
                {shippedOrders.length}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
              <div className="text-[10px] font-mono font-bold uppercase text-purple-700 dark:text-purple-400">
                Delivered
              </div>
              <div className="text-xl font-mono font-black text-purple-700 dark:text-purple-400 mt-1">
                {deliveredOrders.length}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-500/10 border border-zinc-500/20 text-center">
              <div className="text-[10px] font-mono font-bold uppercase text-zinc-600 dark:text-zinc-400">
                Cancelled
              </div>
              <div className="text-xl font-mono font-black text-zinc-600 dark:text-zinc-400 mt-1">
                {cancelledOrders.length}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Operations */}
        <div className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 space-y-3 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm uppercase tracking-tight text-zinc-950 dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-800">
              Quick Operations
            </h3>
            <div className="space-y-2 mt-3">
              <button
                onClick={onOpenAddProduct}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 hover:bg-[#0088ff]/10 border border-zinc-200 dark:border-zinc-800 hover:border-[#0088ff]/40 transition text-xs font-bold text-left group"
              >
                <span className="text-zinc-800 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-[#00a3ff]">
                  + Add Product Silhouette
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-black dark:group-hover:text-[#00a3ff]" />
              </button>

              <button
                onClick={() => onNavigateTab("branding")}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition text-xs font-bold text-left group"
              >
                <span className="text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#0088ff] dark:text-[#00a3ff]" />
                  Update Store Brand Logo
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-black dark:group-hover:text-white" />
              </button>
            </div>
          </div>

          <div className="text-xs text-zinc-400 font-mono pt-2">
            Catalog and storage live synced
          </div>
        </div>
      </div>

      {/* Recent Orders Snippet Table */}
      <div className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h3 className="font-bold text-sm uppercase tracking-tight text-zinc-950 dark:text-white">
              Recent Customer Orders
            </h3>
            <p className="text-xs text-zinc-500">Latest 5 orders awaiting or in fulfillment</p>
          </div>
          <button
            onClick={() => onNavigateTab("orders")}
            className="text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white flex items-center gap-1"
          >
            <span>Full Orders Table</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-zinc-100 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 font-mono text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Zone</th>
                <th className="py-3 px-4">Payable</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/80">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-zinc-500">
                    <div className="flex flex-col items-center justify-center space-y-1">
                      <ShoppingBag className="w-6 h-6 text-zinc-400 mb-1" />
                      <span className="font-bold text-xs text-zinc-700 dark:text-zinc-300">
                        No customer orders placed yet
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        Live orders placed from checkout will appear here in real time.
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition">
                  <td className="py-3.5 px-4 font-mono">
                    <span className="font-bold text-zinc-950 dark:text-white text-sm">{order.orderNumber}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-zinc-900 dark:text-white text-xs">{order.customerName}</div>
                    <div className="font-mono text-xs text-zinc-400">{order.customerPhone}</div>
                  </td>

                  <td className="py-3.5 px-4 text-xs text-zinc-600 dark:text-zinc-400">
                    {order.deliveryZone === "INSIDE_DHAKA" ? "Inside Dhaka" : "Outside Dhaka"}
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-sm text-zinc-950 dark:text-white">
                    {formatPrice(order.totalAmount)}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-extrabold uppercase font-mono ${
                        order.orderStatus === "CONFIRMED"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400"
                          : order.orderStatus === "PENDING"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400"
                          : order.orderStatus === "SHIPPED"
                          ? "bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-400"
                          : order.orderStatus === "DELIVERED"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-400"
                          : "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {order.orderStatus === "PENDING" ? (
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, "CONFIRMED")}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1 rounded-lg transition"
                      >
                        Confirm
                      </button>
                    ) : (
                      <button
                        onClick={() => onNavigateTab("orders")}
                        className="text-zinc-400 hover:text-black dark:hover:text-white text-xs font-bold"
                      >
                        Details
                      </button>
                    )}
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
