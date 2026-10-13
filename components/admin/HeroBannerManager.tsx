"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  Link as LinkIcon,
  Check,
  Eye,
  Sparkles,
  ArrowRight,
  Sun,
  Moon,
  RefreshCw,
  Image as ImageIcon,
} from "lucide-react";
import { StoreSettings, HeroBannerConfig } from "@/context/ProductContext";

interface HeroBannerManagerProps {
  settings: StoreSettings;
  onUpdateSettings: (newSettings: Partial<StoreSettings>) => Promise<void>;
  onTriggerToast: (msg: string) => void;
}

export default function HeroBannerManager({
  settings,
  onUpdateSettings,
  onTriggerToast,
}: HeroBannerManagerProps) {
  const currentBanner: HeroBannerConfig = settings.heroBanner || {
    imageUrl: "/uploads/hero-banner-asos.png",
    title: "NEW-SEASON EDIT",
    buttonText: "SHOP NOW",
    linkUrl: "/shop",
    textColor: "dark",
  };

  const [imageUrl, setImageUrl] = useState(currentBanner.imageUrl || "/uploads/hero-banner-asos.png");
  const [title, setTitle] = useState(currentBanner.title || "NEW-SEASON EDIT");
  const [buttonText, setButtonText] = useState(currentBanner.buttonText || "SHOP NOW");
  const [linkUrl, setLinkUrl] = useState(currentBanner.linkUrl || "/shop");
  const [textColor, setTextColor] = useState<"dark" | "light">(currentBanner.textColor || "dark");
  const [showOverlay, setShowOverlay] = useState<boolean>(currentBanner.showOverlay === true);
  const [imageFit, setImageFit] = useState<"cover" | "contain" | "auto">(currentBanner.imageFit || "cover");
  const [imagePosition, setImagePosition] = useState<"top" | "center" | "bottom">(currentBanner.imagePosition || "top");
  const [bannerHeight, setBannerHeight] = useState<"screen" | "large" | "medium" | "auto">(currentBanner.bannerHeight || "screen");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle direct image file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      onTriggerToast("Please select a valid image file (PNG, JPG, WEBP)");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data?.success && data?.url) {
        setImageUrl(data.url);
        onTriggerToast("Banner image uploaded successfully!");
      } else {
        onTriggerToast(data?.error || "Failed to upload image");
      }
    } catch (err) {
      console.error("Upload error:", err);
      onTriggerToast("Network error uploading banner image");
    } finally {
      setIsUploading(false);
    }
  };

  // Save changes
  const handleSaveBanner = async () => {
    try {
      setIsSaving(true);
      const updatedBanner: HeroBannerConfig = {
        imageUrl: imageUrl.trim() || "/uploads/hero-banner-asos.png",
        title: title.trim() || "NEW-SEASON EDIT",
        buttonText: buttonText.trim() || "SHOP NOW",
        linkUrl: linkUrl.trim() || "/shop",
        textColor,
        showOverlay,
        imageFit,
        imagePosition,
        bannerHeight,
      };

      await onUpdateSettings({ heroBanner: updatedBanner });
      onTriggerToast("Homepage Hero Banner updated live!");
    } catch (err) {
      console.error("Failed to save banner:", err);
      onTriggerToast("Failed to save hero banner settings");
    } finally {
      setIsSaving(false);
    }
  };

  const isDarkText = textColor === "dark";

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <span>Homepage Hero Banner</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Customize the full-screen editorial ASOS hero banner on your homepage. Change images, text, and destination links in real-time.
          </p>
        </div>
        <button
          onClick={handleSaveBanner}
          disabled={isSaving}
          className="px-6 py-2.5 bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
        >
          {isSaving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          <span>{isSaving ? "Saving..." : "Save Live Banner"}</span>
        </button>
      </div>

      {/* Live Interactive Preview Card */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-zinc-500 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-blue-600" />
            <span>Real-time Live Preview</span>
          </span>
          <span className="text-[11px] font-mono font-normal">Full-Screen Display</span>
        </div>

        <div className={`relative w-full ${bannerHeight === 'auto' ? 'h-auto max-h-[460px]' : bannerHeight === 'medium' ? 'h-[260px] sm:h-[320px]' : bannerHeight === 'large' ? 'h-[300px] sm:h-[380px]' : 'h-[340px] sm:h-[440px]'} rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-lg group flex items-center justify-center`}>
          {/* Background image preview */}
          {imageFit === 'contain' ? (
            <div className="absolute inset-0 w-full h-full bg-zinc-950/80 flex items-center justify-center overflow-hidden">
              <img
                src={imageUrl || "/uploads/hero-banner-asos.png"}
                alt=""
                className="absolute inset-0 w-full h-full object-cover filter blur-3xl opacity-30 scale-110 pointer-events-none"
              />
              <img
                src={imageUrl || "/uploads/hero-banner-asos.png"}
                alt="Hero Banner Preview"
                className="relative z-1 max-w-full max-h-full object-contain mx-auto"
              />
            </div>
          ) : (
            <img
              src={imageUrl || "/uploads/hero-banner-asos.png"}
              alt="Hero Banner Preview"
              style={{
                objectPosition: imagePosition === 'top' ? 'center top' : imagePosition === 'bottom' ? 'center bottom' : 'center center'
              }}
              className={`w-full ${bannerHeight === 'auto' ? 'h-auto max-h-[460px] object-contain' : 'h-full object-cover'} transition-transform duration-700 ease-out group-hover:scale-[1.01]`}
            />
          )}

          {/* Vignette */}
          {showOverlay && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 pointer-events-none" />
          )}

          {/* Overlay Typography (when enabled) */}
          {showOverlay ? (
            <div className="absolute inset-0 p-6 sm:p-12 flex flex-col sm:flex-row items-center justify-between pointer-events-none">
              {/* Headline */}
              <div>
                <h3
                  className={`text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight drop-shadow-xs transition ${
                    isDarkText ? "text-zinc-950" : "text-white"
                  }`}
                >
                  {title || "NEW-SEASON EDIT"}
                </h3>
              </div>

              {/* Action */}
              <div>
                <div
                  className={`inline-flex items-center gap-1.5 text-lg sm:text-2xl md:text-3xl font-black uppercase tracking-tight transition ${
                    isDarkText ? "text-zinc-950" : "text-white"
                  }`}
                >
                  <span className="border-b-2 sm:border-b-4 border-current pb-0.5">
                    {buttonText || "SHOP NOW"}
                  </span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
              <span className="bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-1 rounded-md uppercase tracking-wider">
                Direct Image Mode • Position: {imagePosition.toUpperCase()} • Fit: {imageFit.toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Configuration Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        
        {/* Card 1: Banner Image Upload & URL */}
        <div className="p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-600" />
              <span>Banner Photograph</span>
            </h4>
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Recommended: 1920x800+</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1.5">
                Image URL
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/uploads/hero-banner-asos.png"
                className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex-1 h-10 px-4 bg-zinc-900 hover:bg-black text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Upload className="w-4 h-4" />
                <span>{isUploading ? "Uploading..." : "Upload New Photograph"}</span>
              </button>

              <button
                type="button"
                onClick={() => setImageUrl("/uploads/hero-banner-asos.png")}
                className="h-10 px-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl text-xs font-medium transition"
                title="Reset to default ASOS banner"
              >
                Reset Default
              </button>
            </div>
          </div>

          {/* Focal Point / Subject Focus */}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Focal Point / Subject Position
              </label>
              <span className="text-[10px] text-zinc-400 font-mono">Keeps heads &amp; faces in view</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setImagePosition("top")}
                className={`h-9 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition ${
                  imagePosition === "top"
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-xs"
                    : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                }`}
              >
                <span>Top Focus</span>
                <span className="text-[9px] opacity-70 font-normal">Faces / Heads</span>
              </button>
              <button
                type="button"
                onClick={() => setImagePosition("center")}
                className={`h-9 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition ${
                  imagePosition === "center"
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-xs"
                    : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                }`}
              >
                <span>Center</span>
                <span className="text-[9px] opacity-70 font-normal">Middle</span>
              </button>
              <button
                type="button"
                onClick={() => setImagePosition("bottom")}
                className={`h-9 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition ${
                  imagePosition === "bottom"
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-xs"
                    : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                }`}
              >
                <span>Bottom</span>
                <span className="text-[9px] opacity-70 font-normal">Ground / Feet</span>
              </button>
            </div>
          </div>

          {/* Sizing & Fit Options */}
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Image Fit Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setImageFit("cover")}
                  className={`h-8 px-2 rounded-xl text-xs font-bold transition ${
                    imageFit === "cover"
                      ? "bg-black text-white dark:bg-white dark:text-black shadow-xs"
                      : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  Cover (Full-bleed)
                </button>
                <button
                  type="button"
                  onClick={() => setImageFit("contain")}
                  className={`h-8 px-2 rounded-xl text-xs font-bold transition ${
                    imageFit === "contain"
                      ? "bg-black text-white dark:bg-white dark:text-black shadow-xs"
                      : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  Contain (100% Uncropped)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setImageFit("auto");
                    setBannerHeight("auto");
                  }}
                  className={`h-8 px-2 rounded-xl text-xs font-bold transition ${
                    imageFit === "auto"
                      ? "bg-black text-white dark:bg-white dark:text-black shadow-xs"
                      : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  Auto / Natural
                </button>
              </div>
            </div>

            {imageFit !== "auto" && (
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Banner Height
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setBannerHeight("screen")}
                    className={`h-8 px-1.5 rounded-xl text-[11px] font-bold transition ${
                      bannerHeight === "screen"
                        ? "bg-black text-white dark:bg-white dark:text-black shadow-xs"
                        : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    Full Screen
                  </button>
                  <button
                    type="button"
                    onClick={() => setBannerHeight("large")}
                    className={`h-8 px-1.5 rounded-xl text-[11px] font-bold transition ${
                      bannerHeight === "large"
                        ? "bg-black text-white dark:bg-white dark:text-black shadow-xs"
                        : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    Cinematic
                  </button>
                  <button
                    type="button"
                    onClick={() => setBannerHeight("medium")}
                    className={`h-8 px-1.5 rounded-xl text-[11px] font-bold transition ${
                      bannerHeight === "medium"
                        ? "bg-black text-white dark:bg-white dark:text-black shadow-xs"
                        : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    Compact
                  </button>
                  <button
                    type="button"
                    onClick={() => setBannerHeight("auto")}
                    className={`h-8 px-1.5 rounded-xl text-[11px] font-bold transition ${
                      bannerHeight === "auto"
                        ? "bg-black text-white dark:bg-white dark:text-black shadow-xs"
                        : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    Auto Ratio
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Typography & Link Targeting */}
        <div className="p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs space-y-4">
          <h4 className="text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-blue-600" />
            <span>Text &amp; Link Settings</span>
          </h4>

          <div className="space-y-4">
            {/* Destination Link */}
            <div>
              <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">
                Destination Link URL (Banner Click)
              </label>
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="/shop or /shop?category=Pants"
                className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
              />
              <p className="text-[11px] text-zinc-400 mt-1">
                Where users are taken when clicking anywhere on the full-screen banner.
              </p>
            </div>

            {/* Overlay Mode Switch */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1.5">
                Text Overlay Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setShowOverlay(false)}
                  className={`h-10 px-3 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition ${
                    !showOverlay
                      ? "bg-black text-white dark:bg-white dark:text-black shadow-xs"
                      : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <span>No Text Overlay</span>
                  <span className="text-[9px] opacity-70 font-normal">Use image text directly</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowOverlay(true)}
                  className={`h-10 px-3 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition ${
                    showOverlay
                      ? "bg-black text-white dark:bg-white dark:text-black shadow-xs"
                      : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <span>Floating Text Overlay</span>
                  <span className="text-[9px] opacity-70 font-normal">Render Title & Button</span>
                </button>
              </div>
            </div>

            {/* Conditionally display headline and button text inputs when showOverlay is true */}
            {showOverlay && (
              <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800 animate-in fade-in duration-200">
                {/* Headline */}
                <div>
                  <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">
                    Headline / Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="NEW-SEASON EDIT"
                    className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-bold uppercase focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                  />
                </div>

                {/* Button Text */}
                <div>
                  <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">
                    Action Text (Button Link)
                  </label>
                  <input
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    placeholder="SHOP NOW"
                    className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-bold uppercase focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                  />
                </div>

                {/* Text Color Contrast Toggle */}
                <div className="pt-1">
                  <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1.5">
                    Typography Contrast
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTextColor("dark")}
                      className={`h-9 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                        isDarkText
                          ? "bg-black text-white dark:bg-white dark:text-black shadow-xs"
                          : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      <Moon className="w-3.5 h-3.5" />
                      <span>Dark (Black Text)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTextColor("light")}
                      className={`h-9 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                        !isDarkText
                          ? "bg-black text-white dark:bg-white dark:text-black shadow-xs"
                          : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5" />
                      <span>Light (White Text)</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Save Button Footer */}
      <div className="pt-4 flex justify-end">
        <button
          onClick={handleSaveBanner}
          disabled={isSaving}
          className="w-full sm:w-auto px-8 py-3.5 bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSaving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          <span>{isSaving ? "Saving..." : "Save & Publish Hero Banner"}</span>
        </button>
      </div>
    </div>
  );
}
