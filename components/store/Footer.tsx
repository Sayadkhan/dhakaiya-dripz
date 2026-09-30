"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Truck, RotateCcw, PhoneCall, Mail, MapPin } from "lucide-react";
import { useProducts } from "@/context/ProductContext";

export default function Footer() {
  const { customLogoUrl } = useProducts();
  const [logoLoadError, setLogoLoadError] = React.useState(false);

  React.useEffect(() => {
    setLogoLoadError(false);
  }, [customLogoUrl]);

  return (
    <footer className="bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 text-zinc-600 dark:text-zinc-400 text-xs transition-colors duration-200">
      {/* Guarantees Bar */}
      <div className="border-b border-zinc-200 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-[#d4ff00] shadow-xs">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider">Fast Nationwide Shipping</div>
              <p className="text-zinc-500 mt-1">Inside Dhaka 24-48h (৳80), Outside Dhaka 48-72h (৳150).</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-[#d4ff00] shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider">Cash on Delivery (COD)</div>
              <p className="text-zinc-500 mt-1">Zero upfront risk. Check parcel with rider before payment.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-[#d4ff00] shadow-xs">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider">Hassle-Free Size Exchange</div>
              <p className="text-zinc-500 mt-1">7-day simple replacement if size doesn&apos;t fit your silhouette.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-[#d4ff00] shadow-xs">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider">Order Verification</div>
              <p className="text-zinc-500 mt-1">Instant SMS/Call confirmation from our dispatch team.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="inline-block">
            {customLogoUrl && !logoLoadError ? (
              <img
                src={customLogoUrl}
                alt="Dhakaiya Dripz Logo"
                onError={() => setLogoLoadError(true)}
                className="h-8 sm:h-10 w-auto max-w-[180px] object-contain"
              />
            ) : (
              <span className="font-black text-2xl tracking-tighter text-zinc-950 dark:text-white uppercase">
                DHAKAIYA<span className="text-[#a4cc00] dark:text-[#d4ff00]">DRIPZ</span>
              </span>
            )}
          </Link>
          <p className="text-zinc-500 max-w-sm leading-relaxed">
            Elevating Dhaka urban subculture through high-density heavyweight fabrics, architectural tailoring, and functional streetwear silhouettes.
          </p>
          <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 pt-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-black dark:text-[#d4ff00]" />
              <span>Gulshan 1 / Banani Hub, Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-black dark:text-[#d4ff00]" />
              <span>+880 1799-445851 (10 AM - 10 PM)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-black dark:text-[#d4ff00]" />
              <span>support@dhakaiyadripz.com</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider mb-4">Categories</h4>
          <ul className="space-y-2">
            <li><Link href="/shop?category=Pants" className="hover:text-black dark:hover:text-[#d4ff00] transition">Tactical Trousers</Link></li>
            <li><Link href="/shop?category=Oversized+Tees" className="hover:text-black dark:hover:text-[#d4ff00] transition">Boxy Heavyweight Tees</Link></li>
            <li><Link href="/shop?category=Pants" className="hover:text-black dark:hover:text-[#d4ff00] transition">Parachute Cargos</Link></li>
            <li><Link href="/shop?category=Shirts" className="hover:text-black dark:hover:text-[#d4ff00] transition">Cuban Camp Shirts</Link></li>
            <li><Link href="/shop?category=Jackets+%26+Hoodies" className="hover:text-black dark:hover:text-[#d4ff00] transition">Distressed French Terry</Link></li>
          </ul>
        </div>

        {/* Support & Care */}
        <div>
          <h4 className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider mb-4">Client Support</h4>
          <ul className="space-y-2">
            <li><Link href="/shop" className="hover:text-black dark:hover:text-[#d4ff00] transition">Size & Fit Guide</Link></li>
            <li><Link href="/checkout" className="hover:text-black dark:hover:text-[#d4ff00] transition">Track COD Order</Link></li>
            <li><Link href="/shop" className="hover:text-black dark:hover:text-[#d4ff00] transition">Delivery & Shipping Rates</Link></li>
            <li><Link href="/shop" className="hover:text-black dark:hover:text-[#d4ff00] transition">Exchange & Return Policy</Link></li>
            <li><Link href="/admin" className="hover:text-black dark:hover:text-[#d4ff00] transition">Admin Operations</Link></li>
          </ul>
        </div>

        {/* Newsletter / Drops */}
        <div>
          <h4 className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider mb-4">VIP Drop Access</h4>
          <p className="text-zinc-500 text-xs mb-3">
            Get SMS alert before limited batch garments drop. Never miss your size.
          </p>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="017XXXXXXXX"
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-xl px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-400 text-xs focus:outline-none focus:border-black dark:focus:border-[#d4ff00]"
            />
            <button className="w-full bg-zinc-900 dark:bg-white hover:bg-black dark:hover:bg-zinc-200 text-white dark:text-black font-bold text-xs uppercase py-2.5 rounded-xl transition shadow-xs">
              Subscribe to Drops
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-200 dark:border-zinc-900 bg-zinc-200/50 dark:bg-black/60 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} Dhakaiya Dripz Ltd. Engineered for Dhaka City.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-zinc-700 dark:hover:text-zinc-400 cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-zinc-700 dark:hover:text-zinc-400 cursor-pointer">Terms of Service</span>
            <span className="text-black dark:text-[#d4ff00] font-bold">Cash on Delivery Guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
