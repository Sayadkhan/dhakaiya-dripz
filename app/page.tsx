import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Sparkles, TrendingUp } from "lucide-react";
import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";
import HeroLookbookSlider from "@/components/store/HeroLookbookSlider";
import CategoryGridSection from "@/components/store/CategoryGridSection";
import FeaturedDropsSection from "@/components/store/FeaturedDropsSection";

export default function HomePage() {

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-200">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-900 bg-gradient-to-b from-zinc-50 via-white to-white dark:from-zinc-900/50 dark:via-zinc-950 dark:to-zinc-950">
        {/* Ambient Vignette Aura */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-zinc-200/50 dark:bg-zinc-800/20 blur-[140px] rounded-full pointer-events-none" />

        {/* Architectural DD Crest Subtle Luxury Watermark */}
        <div className="absolute right-[-4%] top-1/2 -translate-y-1/2 w-[440px] h-[440px] opacity-[0.035] dark:opacity-[0.05] pointer-events-none select-none -z-0 hidden lg:block">
          <Image
            src="/uploads/dhakaiya-crest-black.png"
            alt=""
            width={440}
            height={440}
            className="object-contain block dark:hidden"
            priority
          />
          <Image
            src="/uploads/dhakaiya-crest-white.png"
            alt=""
            width={440}
            height={440}
            className="object-contain hidden dark:block"
            priority
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-3.5 py-1.5 rounded-full text-xs font-black shadow-xs tracking-wider">
                <span className="flex h-2 w-2 rounded-full bg-white dark:bg-black animate-pulse" />
                <span>SEASON 2026 // DROP 01</span>
                <span className="opacity-40">•</span>
                <span className="font-mono text-[11px]">LIMITED RUN</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[0.95] text-zinc-950 dark:text-white">
                DHAKA&apos;S UNISEX <br />
                <span className="font-serif-brand italic font-normal tracking-normal text-3xl sm:text-5xl lg:text-6xl text-zinc-800 dark:text-zinc-200">
                  Haute Streetwear
                </span> <br />
                <span className="relative inline-block text-black dark:text-white underline decoration-black dark:decoration-white decoration-4 sm:decoration-8 underline-offset-8">
                  ARCHIVES.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Heavyweight combed cotton, tactical twill silhouettes, and architectural tailoring built to conquer Dhaka weather. Zero compromises.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/shop?filter=new"
                  className="w-full sm:w-auto bg-black hover:bg-zinc-800 text-white font-black text-sm uppercase tracking-wider px-8 py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl transition transform hover:-translate-y-0.5"
                >
                  <span>Explore New Drop</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/shop?category=Pants"
                  className="w-full sm:w-auto bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-white border-2 border-black dark:border-white font-black text-sm uppercase tracking-wider px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-xs"
                >
                  <span>View Trousers & Cargos</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-zinc-200 dark:border-zinc-900/80 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="font-mono text-base font-black text-zinc-950 dark:text-white">৳ COD</div>
                  <div className="text-[11px] text-zinc-500 font-medium">Zero Upfront Risk</div>
                </div>
                <div>
                  <div className="font-mono text-base font-black text-zinc-950 dark:text-white">24 - 48H</div>
                  <div className="text-[11px] text-zinc-500 font-medium">Next-Day Dhaka Dispatch</div>
                </div>
                <div>
                  <div className="font-mono text-base font-black text-zinc-950 dark:text-white">320+ GSM</div>
                  <div className="text-[11px] text-zinc-500 font-medium">Heavyweight Combed Weave</div>
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

      {/* Category Grid Section (Dynamic Categories from Context & Admin) */}
      <CategoryGridSection />

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
            <span className="font-serif-brand italic font-normal tracking-normal text-2xl sm:text-4xl text-zinc-700 dark:text-zinc-300">
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
