"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, Phone, X, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import { formatPrice } from "@/lib/utils";

// Authentic Messenger SVG Icon (exact match to user's screenshot)
function MessengerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.914 1.455 5.526 3.735 7.202V22l3.39-1.86c.925.257 1.905.397 2.875.397 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.066 12.443l-2.613-2.787-5.097 2.787 5.607-5.952 2.68 2.787 5.03-2.787-5.607 5.952z" />
    </svg>
  );
}

// Authentic WhatsApp SVG Icon (exact match to user's screenshot)
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.301-.15-1.779-.877-2.054-.977-.276-.1-.476-.15-.676.15s-.777.977-.952 1.177c-.176.2-.351.225-.652.075s-1.272-.469-2.423-1.496c-.895-.798-1.5-1.784-1.675-2.085s-.019-.463.131-.613c.135-.134.301-.35.451-.525.15-.175.2-.3.3-.5.101-.2.05-.376-.025-.526s-.676-1.63-1.026-2.233c-.34-.585-.688-.507-.952-.52-.246-.013-.526-.016-.807-.016s-.735.105-1.12.525c-.385.42-1.47 1.436-1.47 3.504s1.503 4.067 1.714 4.348c.21.28 2.957 4.516 7.163 6.333 1.001.433 1.782.692 2.39.885 1.004.319 1.918.274 2.64.166.804-.12 2.474-1.011 2.824-1.988.351-.977.351-1.815.246-1.988-.105-.174-.306-.275-.607-.426zM12.04 21.786c-1.748 0-3.461-.462-4.97-1.336l-.356-.205-3.702.971.988-3.609-.23-.367c-.96-1.528-1.467-3.3-1.467-5.116 0-5.32 4.328-9.648 9.648-9.648 2.578 0 5 1.004 6.822 2.827s2.825 4.246 2.825 6.824c-.001 5.32-4.329 9.648-9.649 9.648zm7.886-17.533C17.822 2.148 15.034 1 12.04 1 5.969 1 1.024 5.945 1.024 12.016c0 1.939.505 3.834 1.465 5.501L1 23l5.644-1.48c1.606.876 3.418 1.337 5.396 1.337 6.07 0 11.016-4.945 11.016-12.016 0-2.943-1.147-5.711-3.23-7.795z" />
    </svg>
  );
}

export default function FloatingActionWidgets() {
  const pathname = usePathname();
  const { totalItems, subtotal, openCart } = useCart();
  const { settings } = useProducts();

  // Speed-dial open/closed state (open by default, closed by tap)
  const [isOpen, setIsOpen] = useState(false);

  // Hide widgets inside admin panel
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Formatting phone link
  const rawPhone = settings?.phone || "+880 1799-445851";
  const telLink = `tel:${rawPhone.replace(/\s+/g, "")}`;

  // Formatting WhatsApp link
  const getWhatsAppUrl = () => {
    const wa = settings?.socialLinks?.whatsapp;
    if (wa && wa.startsWith("http")) return wa;
    if (wa) {
      const digits = wa.replace(/[^0-9]/g, "");
      return `https://wa.me/${digits.startsWith("88") ? digits : "88" + digits}`;
    }
    return "https://wa.me/8801799445851";
  };

  // Formatting Messenger link
  const getMessengerUrl = () => {
    const directMessenger = settings?.socialLinks?.messenger;
    if (directMessenger) {
      if (directMessenger.startsWith("http")) return directMessenger;
      return `https://m.me/${directMessenger.replace(/^@/, "")}`;
    }
    const fb = settings?.socialLinks?.facebook;
    if (fb) {
      try {
        const url = new URL(fb);
        const parts = url.pathname.split("/").filter(Boolean);
        if (parts.length > 0) {
          return `https://m.me/${parts[0]}`;
        }
      } catch {}
      return fb;
    }
    return "https://m.me/dhakaiyadripz";
  };

  return (
    <>
      {/* ===================================================================== */}
      {/* 1. FLOATING CART WIDGET PINNED TO RIGHT EDGE (VERTICALLY CENTERED)     */}
      {/* ===================================================================== */}
      <aside
        id="floating-cart-widget"
        onClick={openCart}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 cursor-pointer group flex flex-col items-center rounded-l-xl shadow-2xl shadow-black/30 overflow-hidden transition-all duration-300 hover:-translate-x-1.5 hover:shadow-indigo-500/20 border-y border-l border-white/20 select-none animate-in fade-in slide-in-from-right-4"
        title="Open Shopping Bag"
        aria-label="View Shopping Cart"
      >
        {/* Top Part: Violet/Purple Header with Bag Icon & Item Count */}
        <div className="bg-[#6035D0] dark:bg-[#5328c7] group-hover:bg-[#6c40e0] text-white px-3.5 pt-2.5 pb-2 flex flex-col items-center justify-center transition-colors min-w-[74px]">
          <ShoppingBag className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
          <span className="text-[11px] font-bold tracking-tight mt-0.5 whitespace-nowrap">
            {totalItems} {totalItems === 1 ? "Item" : "Items"}
          </span>
        </div>

        {/* Bottom Part: White / Light Box with Price */}
        <div className="bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white px-3.5 py-1.5 w-full text-center font-mono font-black text-xs border-t border-zinc-200/80 dark:border-zinc-800 transition-colors">
          <span>{formatPrice(subtotal)}</span>
        </div>
      </aside>

      {/* ===================================================================== */}
      {/* 2. FLOATING SPEED DIAL (MESSENGER, WHATSAPP, CALL, TOGGLE BUTTON)     */}
      {/* ===================================================================== */}
      <aside
        id="floating-speed-dial"
        className="fixed bottom-10 sm:bottom-12 right-5 sm:right-6 z-50 flex flex-col items-center gap-3 select-none"
        aria-label="Quick Customer Support Actions"
      >
        {/* Expanded Action Buttons (Vertical Stack) */}
        {isOpen && (
          <div className="flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
            {/* 1. Messenger Button */}
            <a
              href={getMessengerUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#0084FF] hover:bg-[#0073e6] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-[#0084FF]/35 transition-all duration-200 transform hover:scale-110 group relative"
              title="Chat with us on Facebook Messenger"
              aria-label="Facebook Messenger"
            >
              <MessengerIcon className="w-6 h-6 transition-transform group-hover:scale-105" />
              {/* Tooltip on left */}
              <span className="absolute right-14 whitespace-nowrap bg-zinc-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity hidden sm:block">
                Messenger
              </span>
            </a>

            {/* 2. WhatsApp Button */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-[#25D366]/35 transition-all duration-200 transform hover:scale-110 group relative"
              title="Chat with us on WhatsApp"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="w-6 h-6 transition-transform group-hover:scale-105" />
              {/* Tooltip on left */}
              <span className="absolute right-14 whitespace-nowrap bg-zinc-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity hidden sm:block">
                WhatsApp
              </span>
            </a>

            {/* 3. Direct Phone Call Button */}
            <a
              href={telLink}
              className="w-12 h-12 rounded-full bg-[#00E676] hover:bg-[#00c864] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-[#00E676]/35 transition-all duration-200 transform hover:scale-110 group relative"
              title={`Call Hotline: ${rawPhone}`}
              aria-label="Call Hotline"
            >
              <Phone className="w-6 h-6 fill-white text-white transition-transform group-hover:scale-105" />
              {/* Tooltip on left */}
              <span className="absolute right-14 whitespace-nowrap bg-zinc-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity hidden sm:block">
                {rawPhone}
              </span>
            </a>
          </div>
        )}

        {/* Main Circular Toggle Button (Blue Circle with 'X' / Chat icon) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0084FF] hover:bg-[#0073e6] active:scale-95 text-white flex items-center justify-center shadow-xl shadow-[#0084FF]/40 transition-all duration-300 transform hover:scale-105 focus:outline-none"
          title={isOpen ? "Close Quick Actions" : "Open Customer Support"}
          aria-label={isOpen ? "Close Quick Actions" : "Open Customer Support"}
        >
          {isOpen ? (
            <X className="w-7 h-7 text-white stroke-[2.5] transition-transform duration-200 rotate-0 hover:rotate-90" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white stroke-[2.2] transition-transform duration-200" />
          )}
        </button>
      </aside>
    </>
  );
}
