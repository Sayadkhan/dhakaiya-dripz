"use client";

import React, { useState } from "react";
import {
  X,
  PhoneCall,
  MapPin,
  Calendar,
  Clock,
  Printer,
  Copy,
  Check,
  ShoppingBag,
  Package,
  MessageCircle,
  Truck,
  CheckCircle2,
  AlertCircle,
  XCircle,
  User,
  CreditCard,
  ExternalLink,
} from "lucide-react";
import { OrderItemRecord } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

interface OrderDetailsModalProps {
  order: OrderItemRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (
    orderId: string,
    newStatus: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
  ) => void;
}

export default function OrderDetailsModal({
  order,
  isOpen,
  onClose,
  onUpdateStatus,
}: OrderDetailsModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen || !order) return null;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // WhatsApp Link formatting for Bangladesh (+880)
  const cleanPhone = order.customerPhone.replace(/\D/g, "");
  const waPhone = cleanPhone.startsWith("88")
    ? cleanPhone
    : cleanPhone.startsWith("0")
    ? `88${cleanPhone}`
    : `880${cleanPhone}`;
  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
    `Hello ${order.customerName},\nRegarding your Dhakaiya Dripz Order #${order.orderNumber} (BDT ৳${order.totalAmount}).\nYour parcel is being processed for dispatch.`
  )}`;

  const statusColors = {
    PENDING: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400 border-amber-300 dark:border-amber-500/30",
    CONFIRMED: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30",
    PROCESSING: "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400 border-blue-300 dark:border-blue-500/30",
    SHIPPED: "bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-400 border-sky-300 dark:border-sky-500/30",
    DELIVERED: "bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-400 border-purple-300 dark:border-purple-500/30",
    CANCELLED: "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400 border-red-300 dark:border-red-500/30",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-3xl max-h-[92vh] flex flex-col bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl text-zinc-900 dark:text-white overflow-hidden">
        {/* Modal Sticky Header */}
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0066ff] to-[#00a3ff] flex items-center justify-center text-white shadow-md shadow-[#0088ff]/20">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-base sm:text-lg tracking-tight text-zinc-950 dark:text-white">
                  Order #{order.orderNumber}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(order.orderNumber, "orderNumber")}
                  className="p-1 text-zinc-400 hover:text-black dark:hover:text-white rounded transition"
                  title="Copy Order ID"
                >
                  {copiedField === "orderNumber" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(order.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-xs font-bold transition text-zinc-700 dark:text-zinc-300"
              title="Print Order Receipt"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl transition"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Status Bar & Quick Status Changer */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Current Status:
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase font-mono border ${
                  statusColors[order.orderStatus] || statusColors.PENDING
                }`}
              >
                {order.orderStatus}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                Update Status:
              </span>
              <select
                value={order.orderStatus}
                onChange={(e) => onUpdateStatus(order.id, e.target.value as any)}
                className="bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-1.5 text-xs font-bold text-zinc-900 dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="PENDING">PENDING (Awaiting Call)</option>
                <option value="CONFIRMED">CONFIRMED (Phone Verified)</option>
                <option value="PROCESSING">PROCESSING (Packing Drop)</option>
                <option value="SHIPPED">SHIPPED (With Courier)</option>
                <option value="DELIVERED">DELIVERED (Cash Collected)</option>
                <option value="CANCELLED">CANCELLED (Order Void)</option>
              </select>
            </div>
          </div>

          {/* Customer & Shipping 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer Details Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#0088ff] dark:text-[#00a3ff]" />
                  <span>Customer Profile</span>
                </span>
              </div>

              <div className="space-y-2">
                <div>
                  <div className="text-[11px] text-zinc-400">Full Name</div>
                  <div className="text-sm font-bold text-zinc-950 dark:text-white">
                    {order.customerName}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-zinc-400">Contact Number</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono font-bold text-sm text-zinc-950 dark:text-white">
                      {order.customerPhone}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(order.customerPhone, "phone")}
                      className="p-1 text-zinc-400 hover:text-black dark:hover:text-white rounded"
                      title="Copy Phone"
                    >
                      {copiedField === "phone" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {order.customerEmail && (
                  <div>
                    <div className="text-[11px] text-zinc-400">Email</div>
                    <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                      {order.customerEmail}
                    </div>
                  </div>
                )}

                {/* Quick Contact Buttons */}
                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    href={`tel:${order.customerPhone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-xs font-bold rounded-xl transition"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#0088ff] dark:text-[#00a3ff]" />
                    <span>Call Customer</span>
                  </a>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Delivery Destination Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0088ff] dark:text-[#00a3ff]" />
                  <span>Delivery Address</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 font-bold uppercase">
                  {order.deliveryZone === "INSIDE_DHAKA" ? "Inside Dhaka" : "Outside Dhaka"}
                </span>
              </div>

              <div className="space-y-2">
                <div>
                  <div className="text-[11px] text-zinc-400">Full Shipping Address</div>
                  <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200 mt-0.5 leading-relaxed bg-white dark:bg-zinc-950 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    {order.shippingAddress}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-zinc-400">Payment Mode</div>
                  <div className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Cash on Delivery (Zero Advance Payment)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ordered Garments Table */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#0088ff] dark:text-[#00a3ff]" />
                <span>Ordered Garments ({order.items.length})</span>
              </span>
              <span className="text-[11px] font-mono text-zinc-500">
                {order.items.reduce((acc, it) => acc + it.quantity, 0)} total unit(s)
              </span>
            </div>

            <div className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-950">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center font-mono font-bold text-xs text-zinc-500 border border-zinc-200 dark:border-zinc-800">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-zinc-950 dark:text-white">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] font-mono font-bold text-zinc-700 dark:text-zinc-300">
                          Size: {item.size}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] font-medium text-zinc-700 dark:text-zinc-300">
                          Color: {item.color}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 sm:text-right pl-10 sm:pl-0">
                    <div>
                      <div className="text-[10px] text-zinc-400 font-mono">Unit Price</div>
                      <div className="text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
                        {formatPrice(item.price)} × {item.quantity}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-zinc-400 font-mono">Item Total</div>
                      <div className="font-mono font-black text-sm text-zinc-950 dark:text-white">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Payable Summary */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <div className="flex justify-between items-center text-xs text-zinc-600 dark:text-zinc-400">
              <span>Items Subtotal:</span>
              <span className="font-mono font-bold text-zinc-900 dark:text-white">
                {formatPrice(order.subtotal)}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs text-zinc-600 dark:text-zinc-400">
              <span>
                Delivery Fee ({order.deliveryZone === "INSIDE_DHAKA" ? "Inside Dhaka" : "Outside Dhaka"}):
              </span>
              <span className="font-mono font-bold text-zinc-900 dark:text-white">
                {formatPrice(order.deliveryCharge)}
              </span>
            </div>

            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
              <div>
                <span className="font-black text-xs sm:text-sm uppercase tracking-wider text-zinc-950 dark:text-white">
                  Total Collectible Amount (COD):
                </span>
                <div className="text-[10px] text-zinc-500 font-mono">
                  Cash collected from customer at doorstep
                </div>
              </div>
              <span className="font-mono font-black text-lg sm:text-2xl text-[#0066ff] dark:text-[#00a3ff]">
                {formatPrice(order.totalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer */}
        <div className="shrink-0 px-5 py-3.5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/95 dark:bg-zinc-900/95 backdrop-blur-sm flex items-center justify-between gap-3 z-20">
          <div className="text-[11px] text-zinc-500 font-mono hidden sm:block">
            Order Record ID: {order.id}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
