"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  PhoneCall,
  XCircle,
  Truck,
  CheckCircle2,
  RotateCcw,
  MapPin,
  ShoppingBag,
  Eye,
} from "lucide-react";
import { OrderItemRecord } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import Pagination from "./Pagination";
import OrderDetailsModal from "./OrderDetailsModal";

interface OrdersTableProps {
  orders: OrderItemRecord[];
  onUpdateOrderStatus: (
    orderId: string,
    newStatus: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
  ) => void;
  initialSearchQuery?: string;
}

export default function OrdersTable({
  orders,
  onUpdateOrderStatus,
  initialSearchQuery = "",
}: OrdersTableProps) {
  // Modal state for full order details
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const selectedOrder = useMemo(
    () => orders.find((o) => o.id === selectedOrderId) || null,
    [orders, selectedOrderId]
  );

  // Filters state
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [zoneFilter, setZoneFilter] = useState<string>("ALL");

  // Sorting state
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Sync external search query
  React.useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Status options with counts
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: orders.length };
    orders.forEach((o) => {
      counts[o.orderStatus] = (counts[o.orderStatus] || 0) + 1;
    });
    return counts;
  }, [orders]);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // Status filter
    if (statusFilter !== "ALL") {
      result = result.filter((o) => o.orderStatus === statusFilter);
    }

    // Zone filter
    if (zoneFilter !== "ALL") {
      result = result.filter((o) => o.deliveryZone === zoneFilter);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerPhone.includes(q) ||
          o.shippingAddress.toLowerCase().includes(q)
      );
    }

    // Sort by createdAt
    result.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortOrder === "desc" ? timeB - timeA : timeA - timeB;
    });

    return result;
  }, [orders, statusFilter, zoneFilter, searchQuery, sortOrder]);

  // Pagination
  const totalItems = filteredOrders.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentSafePage = Math.min(currentPage, totalPages);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentSafePage - 1) * pageSize;
    return filteredOrders.slice(startIndex, startIndex + pageSize);
  }, [filteredOrders, currentSafePage, pageSize]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("ALL");
    setZoneFilter("ALL");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery || zoneFilter !== "ALL" || statusFilter !== "ALL";

  return (
    <div className="space-y-3.5">
      {/* Streamlined Filter Toolbar */}
      <div className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3.5 sm:p-4 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative min-w-[240px] max-w-md flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by order #, customer phone, address..."
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-black dark:focus:border-[#0088ff] transition"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Zone filter */}
            <select
              value={zoneFilter}
              onChange={(e) => {
                setZoneFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-medium focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Delivery Zones</option>
              <option value="INSIDE_DHAKA">Inside Dhaka (৳80)</option>
              <option value="OUTSIDE_DHAKA">Outside Dhaka (৳150)</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
          {[
            { id: "ALL", label: "All Orders" },
            { id: "PENDING", label: "Pending Call" },
            { id: "CONFIRMED", label: "Confirmed" },
            { id: "SHIPPED", label: "Dispatched" },
            { id: "DELIVERED", label: "Delivered" },
            { id: "CANCELLED", label: "Cancelled" },
          ].map((st) => {
            const count = statusCounts[st.id] || 0;
            const isActive = statusFilter === st.id;

            return (
              <button
                key={st.id}
                onClick={() => {
                  setStatusFilter(st.id);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-2 text-xs ${
                  isActive
                    ? "bg-gradient-to-r from-[#0066ff] to-[#00a3ff] text-white shadow-md shadow-[#0088ff]/20 font-black"
                    : "bg-zinc-100/80 dark:bg-zinc-800/70 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <span>{st.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? "bg-white/20 dark:bg-black/20"
                      : "bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders Prominent Data Table */}
      <div className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-100 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 font-mono text-xs uppercase font-bold tracking-wider select-none border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-3.5 px-4">Order ID & Date</th>
                <th className="py-3.5 px-4">Customer Info</th>
                <th className="py-3.5 px-4">Delivery Address</th>
                <th className="py-3.5 px-4">Items Ordered</th>
                <th className="py-3.5 px-4">Total Payable</th>
                <th className="py-3.5 px-4">COD Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/80">
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition group"
                  >
                    {/* Column 1: Order ID & Date */}
                    <td className="py-4 px-4 font-mono whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setSelectedOrderId(order.id)}
                        className="font-bold text-zinc-950 dark:text-white text-sm hover:text-[#0088ff] dark:hover:text-[#00a3ff] transition flex items-center gap-1.5 text-left group/id"
                        title="Click to view full order details"
                      >
                        <span>{order.orderNumber}</span>
                        <Eye className="w-3.5 h-3.5 opacity-0 group-hover/id:opacity-100 text-[#0088ff] dark:text-[#00a3ff] transition" />
                      </button>
                      <div className="text-xs text-zinc-400 mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString("en-BD", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>

                    {/* Column 2: Customer & Phone */}
                    <td className="py-4 px-4 min-w-[160px]">
                      <div className="font-bold text-zinc-950 dark:text-white text-sm">
                        {order.customerName}
                      </div>
                      <a
                        href={`tel:${order.customerPhone}`}
                        className="inline-flex items-center gap-1.5 text-zinc-800 dark:text-[#00a3ff] font-mono hover:underline text-xs font-bold mt-1 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md"
                        title="Click to dial customer"
                      >
                        <PhoneCall className="w-3 h-3 text-[#0088ff] dark:text-[#00a3ff]" />
                        <span>{order.customerPhone}</span>
                      </a>
                    </td>

                    {/* Column 3: Destination */}
                    <td className="py-4 px-4 max-w-xs">
                      <div className="flex items-center gap-1 text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                        <span>
                          {order.deliveryZone === "INSIDE_DHAKA" ? "Inside Dhaka" : "Outside Dhaka"}
                        </span>
                      </div>
                      <div
                        className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-relaxed"
                        title={order.shippingAddress}
                      >
                        {order.shippingAddress}
                      </div>
                    </td>

                    {/* Column 4: Items */}
                    <td className="py-4 px-4 min-w-[180px]">
                      <div className="space-y-1">
                        {order.items.map((it, idx) => (
                          <div
                            key={idx}
                            className="text-zinc-800 dark:text-zinc-200 text-xs flex items-center gap-1.5"
                          >
                            <span className="font-mono font-bold text-black dark:text-[#00a3ff]">
                              {it.quantity}x
                            </span>
                            <span className="truncate max-w-[150px]">{it.title}</span>
                            <span className="text-[11px] text-zinc-400 font-mono">
                              ({it.size}, {it.color})
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Column 5: Payable */}
                    <td className="py-4 px-4 font-mono font-black text-sm sm:text-base text-zinc-950 dark:text-white whitespace-nowrap">
                      {formatPrice(order.totalAmount)}
                    </td>

                    {/* Column 6: Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase font-mono ${
                          order.orderStatus === "CONFIRMED"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30"
                            : order.orderStatus === "PENDING"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30"
                            : order.orderStatus === "SHIPPED"
                            ? "bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-400 border border-sky-300 dark:border-sky-500/30"
                            : order.orderStatus === "DELIVERED"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-400 border border-purple-300 dark:border-purple-500/30"
                            : "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400 border border-red-300 dark:border-red-500/30"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>

                    {/* Column 7: Actions */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Eye Button ALWAYS visible */}
                        <button
                          type="button"
                          onClick={() => setSelectedOrderId(order.id)}
                          className="p-1.5 px-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:text-black dark:hover:text-white rounded-xl transition flex items-center gap-1.5 text-xs font-bold border border-zinc-200 dark:border-zinc-700 shadow-2xs"
                          title="View Full Order Details"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#0088ff] dark:text-[#00a3ff]" />
                          <span>Details</span>
                        </button>

                        {order.orderStatus === "PENDING" && (
                          <button
                            onClick={() => onUpdateOrderStatus(order.id, "CONFIRMED")}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition shadow-xs flex items-center gap-1.5"
                            title="Mark as phone verified"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>Confirm</span>
                          </button>
                        )}

                        {order.orderStatus === "CONFIRMED" && (
                          <button
                            onClick={() => onUpdateOrderStatus(order.id, "SHIPPED")}
                            className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition shadow-xs flex items-center gap-1.5"
                            title="Courier dispatch"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Dispatch</span>
                          </button>
                        )}

                        {order.orderStatus === "SHIPPED" && (
                          <button
                            onClick={() => onUpdateOrderStatus(order.id, "DELIVERED")}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition shadow-xs flex items-center gap-1.5"
                            title="Delivered & paid"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Delivered</span>
                          </button>
                        )}

                        {order.orderStatus !== "CANCELLED" && order.orderStatus !== "DELIVERED" && (
                          <button
                            onClick={() => onUpdateOrderStatus(order.id, "CANCELLED")}
                            className="p-1.5 text-zinc-400 hover:text-red-600 rounded-lg transition"
                            title="Cancel Order"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-500">
                    <div className="flex flex-col items-center justify-center space-y-2 py-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#0088ff]/10 flex items-center justify-center text-[#0088ff] dark:text-[#00a3ff]">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                      <div className="font-bold text-sm text-zinc-800 dark:text-zinc-200">
                        {orders.length === 0 ? "No customer orders placed yet" : "No orders match filter"}
                      </div>
                      <p className="text-xs text-zinc-500 max-w-sm">
                        {orders.length === 0
                          ? "New cash-on-delivery orders placed by shoppers on the storefront will appear here instantly."
                          : "Try clearing status or search filters to view orders."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Clear Pagination */}
        <Pagination
          currentPage={currentSafePage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
          pageSizeOptions={[5, 10, 20, 50]}
          itemName="orders"
        />
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={Boolean(selectedOrder)}
        onClose={() => setSelectedOrderId(null)}
        onUpdateStatus={onUpdateOrderStatus}
      />
    </div>
  );
}
