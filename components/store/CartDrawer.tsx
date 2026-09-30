"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, ShieldCheck } from "lucide-react";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    deliveryZone,
    setDeliveryZone,
    deliveryCharge,
    amountNeededForFreeShipping,
    totalAmount,
  } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeCart]);

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-900 shadow-2xl flex flex-col text-zinc-900 dark:text-white animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-900 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/40">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-black dark:text-[#d4ff00]" />
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
                Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dynamic Free Shipping Threshold Meter */}
          <div className="bg-zinc-100/70 dark:bg-zinc-900/60 p-3.5 border-b border-zinc-200 dark:border-zinc-900 text-xs">
            <div className="flex items-center justify-between mb-1.5 font-medium">
              <span className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
                <Truck className="w-4 h-4 text-black dark:text-[#d4ff00]" />
                {amountNeededForFreeShipping > 0 ? (
                  <span>
                    Add <strong className="text-black dark:text-white font-mono">{formatPrice(amountNeededForFreeShipping)}</strong> more for <strong>FREE Delivery</strong>
                  </span>
                ) : (
                  <span className="text-emerald-600 dark:text-[#d4ff00] font-bold">
                    🎉 You unlocked FREE Delivery across Bangladesh!
                  </span>
                )}
              </span>
              <span className="font-mono text-zinc-500 dark:text-zinc-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#d4ff00] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-zinc-500 dark:text-zinc-400 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 dark:text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">Your bag is empty</h3>
                  <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                    Explore our latest unisex streetwear drop and elevate your rotation.
                  </p>
                </div>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="bg-[#d4ff00] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-full hover:bg-[#b8dd00] transition shadow-xs"
                >
                  Shop New Drops
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-800 transition"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-800 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="text-sm font-bold text-zinc-900 dark:text-white hover:text-black dark:hover:text-[#d4ff00] transition line-clamp-1"
                        >
                          {item.title}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <span className="bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-semibold px-2 py-0.5 rounded">
                          Size: {item.size}
                        </span>
                        <span className="text-zinc-500 dark:text-zinc-400 truncate text-[11px]">
                          {item.color}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-zinc-300 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-950">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-[#d4ff00] transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-xs font-bold px-2.5 text-zinc-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="p-1 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-[#d4ff00] disabled:opacity-30 transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total for item */}
                      <div className="font-mono font-bold text-sm text-zinc-950 dark:text-white">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/60 space-y-3.5">
              
              {/* Delivery Zone Selector */}
              <div className="bg-white dark:bg-zinc-950 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800/80 shadow-xs">
                <div className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Shipping Zone</span>
                  <span className="text-zinc-950 dark:text-[#d4ff00] font-black text-[10px]">CASH ON DELIVERY</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setDeliveryZone("INSIDE_DHAKA")}
                    className={`py-2 px-2.5 rounded-lg border text-center transition font-semibold ${
                      deliveryZone === "INSIDE_DHAKA"
                        ? "border-black dark:border-[#d4ff00] bg-zinc-100 dark:bg-[#d4ff00]/10 text-black dark:text-[#d4ff00]"
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    <div>Inside Dhaka</div>
                    <div className="text-[10px] font-mono opacity-80">
                      {amountNeededForFreeShipping === 0 ? "FREE" : "৳80"}
                    </div>
                  </button>
                  <button
                    onClick={() => setDeliveryZone("OUTSIDE_DHAKA")}
                    className={`py-2 px-2.5 rounded-lg border text-center transition font-semibold ${
                      deliveryZone === "OUTSIDE_DHAKA"
                        ? "border-black dark:border-[#d4ff00] bg-zinc-100 dark:bg-[#d4ff00]/10 text-black dark:text-[#d4ff00]"
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    <div>Outside Dhaka</div>
                    <div className="text-[10px] font-mono opacity-80">
                      {amountNeededForFreeShipping === 0 ? "FREE" : "৳150"}
                    </div>
                  </button>
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-zinc-950 dark:text-white font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-mono text-zinc-950 dark:text-white font-bold">
                    {deliveryCharge === 0 ? (
                      <span className="text-emerald-600 dark:text-[#d4ff00] font-bold">FREE</span>
                    ) : (
                      formatPrice(deliveryCharge)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-zinc-950 dark:text-white pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <span>Estimated Total</span>
                  <span className="font-mono text-zinc-950 dark:text-[#d4ff00] text-base font-black">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full bg-[#d4ff00] hover:bg-[#c2ea00] text-black font-black text-sm uppercase tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#d4ff00]/20 transition group"
              >
                <span>Proceed to COD Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-black dark:text-[#d4ff00]" />
                <span>Pay cash upon parcel delivery | Inspect before you receive</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
