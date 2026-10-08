"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Truck, RotateCcw, PhoneCall, Mail, MapPin } from "lucide-react";
import { useProducts } from "@/context/ProductContext";

// Social Platform SVG Icons
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.99v9.19c.02 2.05-.72 4.12-2.14 5.61-1.55 1.66-3.83 2.53-6.07 2.37-2.18-.12-4.27-1.16-5.63-2.88-1.42-1.76-1.92-4.14-1.39-6.35.53-2.17 2.09-4.01 4.1-4.88 1.12-.49 2.36-.66 3.58-.55v4.13c-.6-.08-1.22-.05-1.8.12-.9.25-1.64.91-1.99 1.77-.38.9-.27 1.99.31 2.8.56.77 1.5 1.18 2.44 1.11.96-.05 1.83-.63 2.23-1.5.31-.66.41-1.41.39-2.15V.02h.63z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.301-.15-1.779-.877-2.054-.977-.276-.1-.476-.15-.676.15s-.777.977-.952 1.177c-.176.2-.351.225-.652.075s-1.272-.469-2.423-1.496c-.895-.798-1.5-1.784-1.675-2.085s-.019-.463.131-.613c.135-.134.301-.35.451-.525.15-.175.2-.3.3-.5.101-.2.05-.376-.025-.526s-.676-1.63-1.026-2.233c-.34-.585-.688-.507-.952-.52-.246-.013-.526-.016-.807-.016s-.735.105-1.12.525c-.385.42-1.47 1.436-1.47 3.504s1.503 4.067 1.714 4.348c.21.28 2.957 4.516 7.163 6.333 1.001.433 1.782.692 2.39.885 1.004.319 1.918.274 2.64.166.804-.12 2.474-1.011 2.824-1.988.351-.977.351-1.815.246-1.988-.105-.174-.306-.275-.607-.426zM12.04 21.786c-1.748 0-3.461-.462-4.97-1.336l-.356-.205-3.702.971.988-3.609-.23-.367c-.96-1.528-1.467-3.3-1.467-5.116 0-5.32 4.328-9.648 9.648-9.648 2.578 0 5 1.004 6.822 2.827s2.825 4.246 2.825 6.824c-.001 5.32-4.329 9.648-9.649 9.648zm7.886-17.533C17.822 2.148 15.034 1 12.04 1 5.969 1 1.024 5.945 1.024 12.016c0 1.939.505 3.834 1.465 5.501L1 23l5.644-1.48c1.606.876 3.418 1.337 5.396 1.337 6.07 0 11.016-4.945 11.016-12.016 0-2.943-1.147-5.711-3.23-7.795z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function TwitterXIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  const { customLogoUrl, settings } = useProducts();
  const [logoLoadError, setLogoLoadError] = React.useState(false);

  React.useEffect(() => {
    setLogoLoadError(false);
  }, [customLogoUrl]);

  const deliveryInside = settings?.deliveryInsideDhaka ?? 80;
  const deliveryOutside = settings?.deliveryOutsideDhaka ?? 150;
  const social = settings?.socialLinks || {};

  const getWhatsAppUrl = (val?: string) => {
    if (!val) return "";
    if (val.startsWith("http")) return val;
    const digits = val.replace(/[^0-9]/g, "");
    return `https://wa.me/${digits.startsWith("88") ? digits : "88" + digits}`;
  };

  return (
    <footer className="bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 text-zinc-600 dark:text-zinc-400 text-xs transition-colors duration-200">
      {/* Guarantees Bar with Dynamic Delivery Charges */}
      <div className="border-b border-zinc-200 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[#0066ff] dark:text-[#00a3ff] shadow-xs">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider">
                Fast Nationwide Shipping
              </div>
              <p className="text-zinc-500 mt-1">
                Inside Dhaka 24-48h (৳{deliveryInside}), Outside Dhaka 48-72h (৳{deliveryOutside}).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[#0066ff] dark:text-[#00a3ff] shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider">
                Cash on Delivery (COD)
              </div>
              <p className="text-zinc-500 mt-1">Zero upfront risk. Check parcel with rider before payment.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[#0066ff] dark:text-[#00a3ff] shadow-xs">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider">
                Hassle-Free Size Exchange
              </div>
              <p className="text-zinc-500 mt-1">7-day simple replacement if size doesn&apos;t fit your silhouette.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[#0066ff] dark:text-[#00a3ff] shadow-xs">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider">
                Order Verification
              </div>
              <p className="text-zinc-500 mt-1">Instant confirmation from our dispatch team.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand Column & Social Links */}
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="inline-block">
            {customLogoUrl && !logoLoadError ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={customLogoUrl}
                alt="Dhakaiya Dripz Logo"
                onError={() => setLogoLoadError(true)}
                className="h-10 sm:h-12 w-auto max-w-[200px] object-contain drop-shadow-[0_2px_10px_rgba(0,163,255,0.25)]"
              />
            ) : (
              <span className="font-black text-2xl tracking-tighter text-zinc-950 dark:text-white uppercase">
                DHAKAIYA<span className="bg-gradient-to-r from-[#0088ff] to-[#00d2ff] bg-clip-text text-transparent">DRIPZ</span>
              </span>
            )}
          </Link>
          <p className="text-zinc-500 max-w-sm leading-relaxed">
            Elevating Dhaka urban subculture through high-density heavyweight fabrics, architectural tailoring, and functional streetwear silhouettes.
          </p>

          {/* Social Media Channels (Admin Configured) */}
          <div className="pt-2 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-950 dark:text-white flex items-center gap-1.5">
              <span>Official Channels</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00a3ff] animate-pulse" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {social.facebook?.trim() && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition shadow-xs group"
                  title="Follow us on Facebook"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              )}

              {social.instagram?.trim() && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-[#E4405F] hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent transition shadow-xs group"
                  title="Follow us on Instagram"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              )}

              {social.tiktok?.trim() && (
                <a
                  href={social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black transition shadow-xs group"
                  title="Watch us on TikTok"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              )}

              {social.whatsapp?.trim() && (
                <a
                  href={getWhatsAppUrl(social.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition shadow-xs group"
                  title="Chat on WhatsApp"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              )}

              {social.youtube?.trim() && (
                <a
                  href={social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-[#FF0000] hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] transition shadow-xs group"
                  title="Subscribe on YouTube"
                  aria-label="YouTube"
                >
                  <YouTubeIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              )}

              {social.twitter?.trim() && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200 hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black transition shadow-xs group"
                  title="Follow us on X"
                  aria-label="X (Twitter)"
                >
                  <TwitterXIcon className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                </a>
              )}
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 pt-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#0066ff] dark:text-[#00a3ff] shrink-0" />
              <span>{settings?.address || "Gulshan 1 / Banani Hub, Dhaka, Bangladesh"}</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#0066ff] dark:text-[#00a3ff] shrink-0" />
              <a
                href={`tel:${(settings?.phone || "+880 1799-445851").replace(/\s+/g, "")}`}
                className="hover:text-black dark:hover:text-white transition"
              >
                {settings?.phone || "+880 1799-445851"} (10 AM - 10 PM)
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#0066ff] dark:text-[#00a3ff] shrink-0" />
              <a
                href={`mailto:${settings?.email || "support@dhakaiyadripz.com"}`}
                className="hover:text-black dark:hover:text-white transition"
              >
                {settings?.email || "support@dhakaiyadripz.com"}
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider mb-4">Categories</h4>
          <ul className="space-y-2">
            <li><Link href="/shop?category=Pants" className="hover:text-black dark:hover:text-[#00a3ff] transition">Tactical Trousers</Link></li>
            <li><Link href="/shop?category=Oversized+Tees" className="hover:text-black dark:hover:text-[#00a3ff] transition">Boxy Heavyweight Tees</Link></li>
            <li><Link href="/shop?category=Pants" className="hover:text-black dark:hover:text-[#00a3ff] transition">Parachute Cargos</Link></li>
            <li><Link href="/shop?category=Shirts" className="hover:text-black dark:hover:text-[#00a3ff] transition">Cuban Camp Shirts</Link></li>
            <li><Link href="/shop?category=Jackets+%26+Hoodies" className="hover:text-black dark:hover:text-[#00a3ff] transition">Distressed French Terry</Link></li>
          </ul>
        </div>

        {/* Support & Care */}
        <div>
          <h4 className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider mb-4">Client Support</h4>
          <ul className="space-y-2">
            <li><Link href="/shop" className="hover:text-black dark:hover:text-[#00a3ff] transition">Size & Fit Guide</Link></li>
            <li><Link href="/checkout" className="hover:text-black dark:hover:text-[#00a3ff] transition">Track COD Order</Link></li>
            <li><Link href="/shop" className="hover:text-black dark:hover:text-[#00a3ff] transition">Delivery & Shipping Rates</Link></li>
            <li><Link href="/shop" className="hover:text-black dark:hover:text-[#00a3ff] transition">Exchange & Return Policy</Link></li>
            <li><Link href="/shop" className="hover:text-black dark:hover:text-[#00a3ff] transition">Authenticity Guarantee</Link></li>
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
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-xl px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-400 text-xs focus:outline-none focus:border-black dark:focus:border-[#00a3ff]"
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
            <span className="text-zinc-950 dark:text-[#00a3ff] font-bold">Cash on Delivery Guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
