"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useProducts } from "@/context/ProductContext";

export default function HeroBanner() {
  const { settings } = useProducts();

  const banner = settings.heroBanner || {
    imageUrl: "/uploads/hero-banner-asos.png",
    title: "NEW-SEASON EDIT",
    buttonText: "SHOP NOW",
    linkUrl: "/shop",
    textColor: "dark",
  };

  const showOverlay = banner.showOverlay === true;
  const isDarkText = banner.textColor !== "light";
  const linkTarget = banner.linkUrl || "/shop";
  const imageFit = banner.imageFit || "cover";
  // Default focal point to top so models' faces & heads are never cut off
  const imagePosition = banner.imagePosition || "top";
  const bannerHeight = banner.bannerHeight || "screen";

  const isAutoHeight = bannerHeight === "auto" || imageFit === "auto";

  // Height container sizing classes
  let heightContainerClasses = "h-[65vh] sm:h-[75vh] md:h-[82vh] lg:h-[88vh] min-h-[440px] max-h-[960px]";
  if (isAutoHeight) {
    heightContainerClasses = "h-auto max-h-[90vh]";
  } else if (bannerHeight === "large") {
    heightContainerClasses = "h-[54vh] sm:h-[62vh] md:h-[70vh] min-h-[380px] max-h-[820px]";
  } else if (bannerHeight === "medium") {
    heightContainerClasses = "h-[42vh] sm:h-[50vh] md:h-[58vh] min-h-[320px] max-h-[660px]";
  }

  // Object position for CSS
  let objectPositionStyle = "center top";
  if (imagePosition === "center") objectPositionStyle = "center center";
  if (imagePosition === "bottom") objectPositionStyle = "center bottom";

  return (
    <section className="relative w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950 group">
      {/* Full Screen / Full Width Banner Container */}
      <Link
        href={linkTarget}
        className={`relative block w-full ${heightContainerClasses} overflow-hidden select-none cursor-pointer`}
        aria-label={`${banner.title || "Banner"} - ${banner.buttonText || "Shop Now"}`}
      >
        {/* Background Banner Image Rendering */}
        {isAutoHeight ? (
          <div className="w-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-950">
            <img
              src={banner.imageUrl || "/uploads/hero-banner-asos.png"}
              alt={banner.title || "Hero Banner"}
              className="w-full h-auto max-h-[88vh] object-contain block mx-auto transition-transform duration-700 ease-out group-hover:scale-[1.005]"
            />
          </div>
        ) : imageFit === "contain" ? (
          <div className="absolute inset-0 w-full h-full bg-zinc-950/80 flex items-center justify-center overflow-hidden">
            {/* Ambient subtle blurred backdrop to eliminate harsh letterbox */}
            <img
              src={banner.imageUrl || "/uploads/hero-banner-asos.png"}
              alt=""
              className="absolute inset-0 w-full h-full object-cover filter blur-3xl opacity-25 scale-110 pointer-events-none"
            />
            <img
              src={banner.imageUrl || "/uploads/hero-banner-asos.png"}
              alt={banner.title || "Hero Banner"}
              className="relative z-1 max-w-full max-h-full object-contain mx-auto transition-transform duration-700 ease-out group-hover:scale-[1.005]"
            />
          </div>
        ) : (
          <div className="absolute inset-0 w-full h-full">
            <img
              src={banner.imageUrl || "/uploads/hero-banner-asos.png"}
              alt={banner.title || "Hero Banner"}
              style={{ objectPosition: objectPositionStyle }}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.01]"
            />
          </div>
        )}

        {/* Optional Floating Typography Layout (when showOverlay is enabled) */}
        {showOverlay && (
          <>
            {/* Subtle Edge Vignette for Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 pointer-events-none" />

            <div className="absolute inset-0 z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between pointer-events-none">
              {/* Left Headline */}
              <div className="pt-12 sm:pt-0 pointer-events-auto">
                <h1
                  className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight transition-all duration-300 drop-shadow-xs ${
                    isDarkText ? "text-zinc-950" : "text-white"
                  }`}
                >
                  {banner.title || "NEW-SEASON EDIT"}
                </h1>
              </div>

              {/* Right Action / Button Link */}
              <div className="pb-12 sm:pb-0 pointer-events-auto">
                <div
                  className={`inline-flex items-center gap-2 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight transition-all duration-300 group-hover:translate-x-1 ${
                    isDarkText ? "text-zinc-950" : "text-white"
                  }`}
                >
                  <span className="border-b-2 sm:border-b-4 border-current pb-0.5 sm:pb-1">
                    {banner.buttonText || "SHOP NOW"}
                  </span>
                  <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
              </div>
            </div>
          </>
        )}
      </Link>
    </section>
  );
}
