import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Sparkles, TrendingUp } from "lucide-react";
import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";
import HeroBanner from "@/components/store/HeroBanner";
import FeaturedDropsSection from "@/components/store/FeaturedDropsSection";

export default function HomePage() {

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-200">
      <Navbar />

      {/* Full-Screen ASOS Editorial Hero Banner (Admin Controlled) */}
      <HeroBanner />

      {/* ASOS High-Impact Dual Campaign Banner Strip */}
      <section className="bg-black text-white py-4 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            
            <Link
              href="/shop?filter=new"
              className="group relative overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-white p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 rounded-xl"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase font-bold">
                  DROP 01 // ARCHIVAL EDITION
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-zinc-200">
                  Heavyweight Streetwear Edit
                </h3>
                <p className="text-xs text-zinc-400 font-medium pt-1">
                  Engineered with 320+ GSM twill & parachute silhouettes for Dhaka streets.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-2 text-xs font-black tracking-widest uppercase text-white group-hover:translate-x-1 transition-transform">
                <span>Shop The Edit</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link
              href="/shop"
              className="group relative overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-white p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 rounded-xl"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase font-bold">
                  NATIONWIDE LOGISTICS
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-zinc-200">
                  Cash on Delivery Across Bangladesh
                </h3>
                <p className="text-xs text-zinc-400 font-medium pt-1">
                  Inspect your parcel at doorstep before payment. 24-48h Dhaka dispatch.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-2 text-xs font-black tracking-widest uppercase text-white group-hover:translate-x-1 transition-transform">
                <span>Discover All Drops</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Featured Drops / Products Section (Dynamic from useProducts) */}
      <FeaturedDropsSection />

      {/* Streetwear Ethos Banner */}
      <section className="relative overflow-hidden py-20 bg-zinc-100/70 dark:bg-zinc-900/30 border-b border-zinc-200 dark:border-zinc-900">
        {/* Subtle DD Crest Watermark */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.03] dark:opacity-[0.04] pointer-events-none select-none">
          <Image
            src="/uploads/dhakaiya-crest-black.png"
            alt=""
            width={256}
            height={256}
            className="object-contain block dark:hidden"
          />
          <Image
            src="/uploads/dhakaiya-crest-white.png"
            alt=""
            width={256}
            height={256}
            className="object-contain hidden dark:block"
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-black text-white dark:bg-white dark:text-black text-xs font-black uppercase px-4 py-1.5 rounded-full shadow-xs tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-black" />
            <span>THE DHAKAIYA MANIFESTO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-zinc-950 dark:text-white">
            ENGINEERED FOR THE STREETS, <br />
            <span className="font-typewriter tracking-wider text-xl sm:text-3xl text-zinc-700 dark:text-zinc-300 block pt-1 font-normal">
              Tailored for the Obsessed.
            </span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed font-medium">
            Mass-market brands treat Dhaka as an afterthought with thin, flimsy cotton that curls after one wash. We obsess over 320+ GSM twill, twin pinch pleats, anti-bacon neckbands, and gender-fluid silhouettes that hold their structure through torrential rains, rickshaw jams, and rooftop raves.
          </p>
          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition shadow-md"
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
