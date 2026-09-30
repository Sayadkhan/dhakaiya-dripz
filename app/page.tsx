import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Sparkles, TrendingUp } from "lucide-react";
import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";
import ProductCard from "@/components/store/ProductCard";
import HeroLookbookSlider from "@/components/store/HeroLookbookSlider";
import { INITIAL_PRODUCTS } from "@/lib/mock-data";

export default function HomePage() {
  const featuredProducts = INITIAL_PRODUCTS.filter((p) => p.isFeatured);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white selection:bg-[#d4ff00] selection:text-black transition-colors duration-200">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-900 bg-gradient-to-b from-zinc-100/60 via-white to-white dark:from-zinc-900/50 dark:via-zinc-950 dark:to-zinc-950">
        {/* Glow Accent */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#d4ff00]/15 dark:bg-[#d4ff00]/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3.5 py-1.5 rounded-full text-xs font-bold text-zinc-800 dark:text-zinc-300 shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-[#a4cc00] dark:bg-[#d4ff00] animate-pulse" />
                <span className="text-[#729200] dark:text-[#d4ff00] font-black">SEASON 2026 // DROP 01</span>
                <span className="text-zinc-400 dark:text-zinc-500">•</span>
                <span className="font-mono">LIMITED RUN</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[0.95] text-zinc-950 dark:text-white">
                DHAKA&apos;S UNISEX <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500">
                  STREETWEAR
                </span> <br />
                <span className="text-black dark:text-[#d4ff00] underline decoration-[#d4ff00] underline-offset-8">
                  MATRIX.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Heavyweight combed cotton, tactical twill silhouettes, and architectural tailoring built to conquer Dhaka weather. Zero compromises.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/shop?filter=new"
                  className="w-full sm:w-auto bg-[#d4ff00] hover:bg-[#c3ec00] text-black font-black text-sm uppercase tracking-wider px-8 py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-[#d4ff00]/25 transition transform hover:-translate-y-0.5"
                >
                  <span>Explore New Drop</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/shop?category=Pants"
                  className="w-full sm:w-auto bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-800 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-xs"
                >
                  <span>View Trousers & Cargos</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-zinc-200 dark:border-zinc-900/80 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="font-mono text-base font-bold text-zinc-950 dark:text-white">৳ COD</div>
                  <div className="text-[11px] text-zinc-500">Zero Upfront Risk</div>
                </div>
                <div>
                  <div className="font-mono text-base font-bold text-[#627d00] dark:text-[#d4ff00]">24 - 48H</div>
                  <div className="text-[11px] text-zinc-500">Next-Day Dhaka Dispatch</div>
                </div>
                <div>
                  <div className="font-mono text-base font-bold text-zinc-950 dark:text-white">320+ GSM</div>
                  <div className="text-[11px] text-zinc-500">Heavyweight Combed Weave</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual / Dynamic Lookbook Slider (Admin Controlled) */}
            <div className="lg:col-span-5 relative">
              <HeroLookbookSlider />
            </div>

          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="py-16 sm:py-20 border-b border-zinc-200 dark:border-zinc-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-[#729200] dark:text-[#d4ff00] font-mono text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Curated Silhouettes
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 dark:text-white">
              Select Your Armor
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white flex items-center gap-1.5 transition"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              title: "Tactical Trousers",
              desc: "Center Pleats & Heavy Twill",
              image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop",
              href: "/shop?category=Pants",
            },
            {
              title: "Boxy Heavyweight Tees",
              desc: "260 GSM Dense Drop Collar",
              image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
              href: "/shop?category=Oversized+Tees",
            },
            {
              title: "Parachute Cargos",
              desc: "6-Pocket Bungee Cuffs",
              image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop",
              href: "/shop?category=Pants",
            },
            {
              title: "French Terry Fleece",
              desc: "Distressed Acid Washed",
              image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop",
              href: "/shop?category=Jackets+%26+Hoodies",
            },
          ].map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-900 shadow-sm hover:shadow-xl transition"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-4 inset-x-4 text-white">
                <h3 className="text-sm sm:text-base font-black uppercase text-white group-hover:text-[#d4ff00] transition">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-zinc-300 font-mono mt-0.5">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Drops / Products Section */}
      <section className="py-16 sm:py-20 border-b border-zinc-200 dark:border-zinc-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-[#729200] dark:text-[#d4ff00] font-mono text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> High-Rotation Staples
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 dark:text-white">
              Featured New Drops
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white flex items-center gap-1.5 transition"
          >
            <span>See All Products ({INITIAL_PRODUCTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 3} />
          ))}
        </div>
      </section>

      {/* Streetwear Ethos Banner */}
      <section className="py-20 bg-zinc-100/70 dark:bg-zinc-900/30 border-b border-zinc-200 dark:border-zinc-900">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-block bg-[#d4ff00] text-black text-xs font-black uppercase px-3.5 py-1 rounded-full shadow-xs">
            THE DHAKAIYA MANIFESTO
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-zinc-950 dark:text-white">
            ENGINEERED FOR THE STREETS, <br />
            TAILORED FOR THE OBSESSED.
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed font-medium">
            Mass-market brands treat Dhaka as an afterthought with thin, flimsy cotton that curls after one wash. We obsess over 320+ GSM twill, twin pinch pleats, anti-bacon neckbands, and gender-fluid silhouettes that hold their structure through torrential rains, rickshaw jams, and rooftop raves.
          </p>
          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-zinc-950 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition shadow-md"
            >
              <span>Explore The Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
