"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  UploadCloud,
  RotateCcw,
  ExternalLink,
  Heart,
  ShoppingBag,
  Loader2,
  Truck,
  Save,
  CheckCircle2,
  Share2,
  Globe,
  MapPin,
  PhoneCall,
  Mail,
  Building2,
  Clock,
  KeyRound,
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { StoreSettings, SocialLinks } from "@/context/ProductContext";

// Social Platform SVG Icons for authentic brand appearance
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

interface BrandingManagerProps {
  customLogoUrl: string | null;
  onUpdateLogo: (url: string | null) => void;
  onTriggerToast: (msg: string) => void;
  settings?: StoreSettings;
  onUpdateDeliveryCharges?: (inside: number, outside: number, threshold?: number) => Promise<void>;
  onUpdateSocialLinks?: (links: SocialLinks) => Promise<void>;
  onUpdateContactInfo?: (contact: { phone?: string; email?: string; address?: string }) => Promise<void>;
  onUpdateSettings?: (newSettings: Partial<StoreSettings>) => Promise<void>;
}

export default function BrandingManager({
  customLogoUrl,
  onUpdateLogo,
  onTriggerToast,
  settings,
  onUpdateDeliveryCharges,
  onUpdateSocialLinks,
  onUpdateContactInfo,
  onUpdateSettings,
}: BrandingManagerProps) {
  // Navigation sub-tab
  const [activeSection, setActiveSection] = useState<"delivery" | "contact" | "social" | "branding" | "security">("delivery");

  // Admin Security state
  const [adminUsername, setAdminUsername] = useState<string>(settings?.adminUsername ?? "admin");
  const [adminPassword, setAdminPassword] = useState<string>(settings?.adminPassword ?? "admin");
  const [showAdminPass, setShowAdminPass] = useState(false);
  const [isSavingSecurity, setIsSavingSecurity] = useState(false);
  const [securitySavedSuccess, setSecuritySavedSuccess] = useState(false);

  // Logo state
  const [isLogoUploading, setIsLogoUploading] = useState(false);
  const [logoInputUrl, setLogoInputUrl] = useState("");
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const [adminLogoLoadError, setAdminLogoLoadError] = useState(false);

  // Delivery Charges state
  const [insideDhaka, setInsideDhaka] = useState<number>(settings?.deliveryInsideDhaka ?? 80);
  const [outsideDhaka, setOutsideDhaka] = useState<number>(settings?.deliveryOutsideDhaka ?? 150);
  const [freeThreshold, setFreeThreshold] = useState<number>(settings?.freeShippingThreshold ?? 3000);
  const [isSavingDelivery, setIsSavingDelivery] = useState(false);
  const [deliverySavedSuccess, setDeliverySavedSuccess] = useState(false);

  // Contact Info state (Location, Phone, Email)
  const [address, setAddress] = useState<string>(settings?.address ?? "Gulshan 1 / Banani Hub, Dhaka, Bangladesh");
  const [phone, setPhone] = useState<string>(settings?.phone ?? "+880 1799-445851");
  const [email, setEmail] = useState<string>(settings?.email ?? "support@dhakaiyadripz.com");
  const [isSavingContact, setIsSavingContact] = useState(false);
  const [contactSavedSuccess, setContactSavedSuccess] = useState(false);

  // Social Links state
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    facebook: settings?.socialLinks?.facebook ?? "https://facebook.com",
    instagram: settings?.socialLinks?.instagram ?? "https://instagram.com",
    tiktok: settings?.socialLinks?.tiktok ?? "https://tiktok.com",
    whatsapp: settings?.socialLinks?.whatsapp ?? "https://wa.me/8801799445851",
    youtube: settings?.socialLinks?.youtube ?? "",
    twitter: settings?.socialLinks?.twitter ?? "",
  });
  const [isSavingSocial, setIsSavingSocial] = useState(false);
  const [socialSavedSuccess, setSocialSavedSuccess] = useState(false);

  // Sync with prop updates
  useEffect(() => {
    if (settings) {
      setInsideDhaka(settings.deliveryInsideDhaka ?? 80);
      setOutsideDhaka(settings.deliveryOutsideDhaka ?? 150);
      setFreeThreshold(settings.freeShippingThreshold ?? 3000);
      if (settings.address !== undefined) setAddress(settings.address);
      if (settings.phone !== undefined) setPhone(settings.phone);
      if (settings.email !== undefined) setEmail(settings.email);
      if (settings.adminUsername !== undefined) setAdminUsername(settings.adminUsername);
      if (settings.adminPassword !== undefined) setAdminPassword(settings.adminPassword);
      if (settings.socialLinks) {
        setSocialLinks({
          facebook: settings.socialLinks.facebook || "",
          instagram: settings.socialLinks.instagram || "",
          tiktok: settings.socialLinks.tiktok || "",
          whatsapp: settings.socialLinks.whatsapp || "",
          youtube: settings.socialLinks.youtube || "",
          twitter: settings.socialLinks.twitter || "",
        });
      }
    }
  }, [settings]);

  // Handle Save Admin Security Credentials
  const handleSaveSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUsername.trim() || !adminPassword.trim()) {
      onTriggerToast("Username and password cannot be empty!");
      return;
    }
    setIsSavingSecurity(true);
    try {
      if (onUpdateSettings) {
        await onUpdateSettings({
          adminUsername: adminUsername.trim(),
          adminPassword: adminPassword.trim(),
        });
      }
      setSecuritySavedSuccess(true);
      onTriggerToast("Admin credentials updated successfully!");
      setTimeout(() => setSecuritySavedSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      onTriggerToast("Failed to update admin credentials.");
    } finally {
      setIsSavingSecurity(false);
    }
  };

  useEffect(() => {
    setAdminLogoLoadError(false);
  }, [customLogoUrl]);

  // Handle Logo Upload
  const handleLogoFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsLogoUploading(true);
    try {
      const formData = new FormData();
      formData.append("files", files[0]);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch {}

      if (res.ok && data?.urls && data.urls.length > 0) {
        onUpdateLogo(data.urls[0]);
        onTriggerToast("Brand logo uploaded and applied successfully across entire store!");
      } else {
        const errorMsg = data?.error || `Logo upload failed (Status ${res.status || "Unknown"}). Please try a valid image file.`;
        alert(errorMsg);
      }
    } catch (err) {
      console.error("Logo upload error:", err);
      alert("Error uploading logo image. Please try again.");
    } finally {
      setIsLogoUploading(false);
      if (logoFileInputRef.current) logoFileInputRef.current.value = "";
    }
  };

  const handleApplyLogoUrl = () => {
    if (!logoInputUrl.trim()) return;
    onUpdateLogo(logoInputUrl.trim());
    setLogoInputUrl("");
    onTriggerToast("Custom logo URL applied successfully!");
  };

  const handleResetLogo = () => {
    onUpdateLogo(null);
    onTriggerToast("Brand logo reset to default typographic DHAKAIYA DRIPZ logo.");
  };

  // Handle Delivery Charges Save
  const handleSaveDeliveryCharges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdateDeliveryCharges) {
      onTriggerToast("Delivery charge update function not available.");
      return;
    }
    setIsSavingDelivery(true);
    try {
      await onUpdateDeliveryCharges(Number(insideDhaka), Number(outsideDhaka), Number(freeThreshold));
      setDeliverySavedSuccess(true);
      onTriggerToast(`Delivery rates updated: Inside ৳${insideDhaka}, Outside ৳${outsideDhaka}, Free at ৳${freeThreshold}!`);
      setTimeout(() => setDeliverySavedSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to update delivery charges:", err);
      alert("Error saving delivery charges. Please try again.");
    } finally {
      setIsSavingDelivery(false);
    }
  };

  // Handle Contact Info (Location, Phone, Email) Save
  const handleSaveContactInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdateContactInfo) {
      onTriggerToast("Contact info update function not available.");
      return;
    }
    setIsSavingContact(true);
    try {
      await onUpdateContactInfo({
        address: address.trim(),
        phone: phone.trim(),
        email: email.trim(),
      });
      setContactSavedSuccess(true);
      onTriggerToast("Store location, phone & email updated successfully across entire store!");
      setTimeout(() => setContactSavedSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to update contact info:", err);
      alert("Error saving contact info. Please try again.");
    } finally {
      setIsSavingContact(false);
    }
  };

  // Handle Social Links Save
  const handleSaveSocialLinks = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdateSocialLinks) {
      onTriggerToast("Social links update function not available.");
      return;
    }
    setIsSavingSocial(true);
    try {
      await onUpdateSocialLinks(socialLinks);
      setSocialSavedSuccess(true);
      onTriggerToast("Social media channels saved! Links are now active in the store footer.");
      setTimeout(() => setSocialSavedSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to update social links:", err);
      alert("Error saving social links. Please try again.");
    } finally {
      setIsSavingSocial(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-950 to-black text-white p-4 sm:p-5 rounded-2xl border border-zinc-800 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-xl space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0088ff]/20 text-[#00a3ff] text-[10px] font-extrabold uppercase tracking-wider border border-[#0088ff]/30">
              <Sparkles className="w-3 h-3" />
              Store Settings & Control Center
            </div>
            <h2 className="text-base sm:text-lg font-black uppercase tracking-tight">
              Delivery Rates, Location, Contact & Channels
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Manage nationwide shipping charges, store address & contact numbers, social media links in footer, and brand logos.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10 transition"
            >
              <Globe className="w-3.5 h-3.5 text-[#00a3ff]" />
              <span>View Storefront</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </Link>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="relative z-10 mt-5 pt-3 border-t border-zinc-800/80 flex flex-wrap gap-2">
          {/* Tab 1: Delivery Charges */}
          <button
            type="button"
            onClick={() => setActiveSection("delivery")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSection === "delivery"
                ? "bg-[#0088ff] text-white shadow-md shadow-[#0088ff]/25"
                : "bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Delivery Charges (৳)</span>
            <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-black/30">
              ৳{insideDhaka}/৳{outsideDhaka}
            </span>
          </button>

          {/* Tab 2: Contact & Location */}
          <button
            type="button"
            onClick={() => setActiveSection("contact")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSection === "contact"
                ? "bg-[#0088ff] text-white shadow-md shadow-[#0088ff]/25"
                : "bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Contact & Location</span>
            <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-black/30">
              {phone ? "Set" : "Config"}
            </span>
          </button>

          {/* Tab 3: Social Links */}
          <button
            type="button"
            onClick={() => setActiveSection("social")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSection === "social"
                ? "bg-[#0088ff] text-white shadow-md shadow-[#0088ff]/25"
                : "bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Social Media Links</span>
            <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-black/30">
              {Object.values(socialLinks).filter((v) => Boolean(v?.trim())).length} Active
            </span>
          </button>

          {/* Tab 4: Branding */}
          <button
            type="button"
            onClick={() => setActiveSection("branding")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSection === "branding"
                ? "bg-[#0088ff] text-white shadow-md shadow-[#0088ff]/25"
                : "bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Brand Logo & Identity</span>
            {customLogoUrl && (
              <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/30 text-emerald-300">
                Custom
              </span>
            )}
          </button>

          {/* Tab 5: Admin Security & Password */}
          <button
            type="button"
            onClick={() => setActiveSection("security")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSection === "security"
                ? "bg-[#0088ff] text-white shadow-md shadow-[#0088ff]/25"
                : "bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Admin Login & Password</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. SECTION: DELIVERY CHARGES CONTROL                                      */}
      {/* ========================================================================= */}
      {activeSection === "delivery" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Delivery Form (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0088ff]/10 text-[#0088ff] flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
                    Nationwide Delivery Rates
                  </h3>
                  <p className="text-[11px] text-zinc-500">
                    Live rates automatically sync to Cart Drawer, Checkout Page & Footer
                  </p>
                </div>
              </div>

              {deliverySavedSuccess && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Saved
                </span>
              )}
            </div>

            <form onSubmit={handleSaveDeliveryCharges} className="space-y-4">
              {/* Inside Dhaka */}
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-900 dark:text-zinc-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#0088ff]" />
                    Inside Dhaka Delivery Charge (৳ BDT)
                  </label>
                  <span className="text-[10px] font-mono text-zinc-500">24 - 48 Hours Delivery</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 font-bold font-mono text-sm">
                    ৳
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    value={insideDhaka}
                    onChange={(e) => setInsideDhaka(Math.max(0, Number(e.target.value)))}
                    required
                    placeholder="80"
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl pl-8 pr-4 py-2.5 text-sm font-mono font-bold text-zinc-900 dark:text-white focus:outline-none focus:border-[#0088ff] transition"
                  />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] text-zinc-400">Quick presets:</span>
                  {[60, 70, 80, 90, 100].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setInsideDhaka(rate)}
                      className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded border transition ${
                        insideDhaka === rate
                          ? "bg-[#0088ff] text-white border-[#0088ff]"
                          : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-zinc-400"
                      }`}
                    >
                      ৳{rate}
                    </button>
                  ))}
                </div>
              </div>

              {/* Outside Dhaka */}
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-900 dark:text-zinc-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    Outside Dhaka Delivery Charge (৳ BDT)
                  </label>
                  <span className="text-[10px] font-mono text-zinc-500">48 - 72 Hours Delivery</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 font-bold font-mono text-sm">
                    ৳
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    value={outsideDhaka}
                    onChange={(e) => setOutsideDhaka(Math.max(0, Number(e.target.value)))}
                    required
                    placeholder="150"
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl pl-8 pr-4 py-2.5 text-sm font-mono font-bold text-zinc-900 dark:text-white focus:outline-none focus:border-[#0088ff] transition"
                  />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] text-zinc-400">Quick presets:</span>
                  {[120, 130, 150, 160].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setOutsideDhaka(rate)}
                      className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded border transition ${
                        outsideDhaka === rate
                          ? "bg-[#0088ff] text-white border-[#0088ff]"
                          : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-zinc-400"
                      }`}
                    >
                      ৳{rate}
                    </button>
                  ))}
                </div>
              </div>

              {/* Free Shipping Order Minimum Threshold */}
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-900 dark:text-zinc-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Free Delivery Threshold (৳ BDT)
                  </label>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    Orders above this get 100% Free Shipping
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 font-bold font-mono text-sm">
                    ৳
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={freeThreshold}
                    onChange={(e) => setFreeThreshold(Math.max(0, Number(e.target.value)))}
                    required
                    placeholder="3000"
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl pl-8 pr-4 py-2.5 text-sm font-mono font-bold text-zinc-900 dark:text-white focus:outline-none focus:border-[#0088ff] transition"
                  />
                </div>
                <p className="text-[10px] text-zinc-500">
                  Set to 0 if you want to disable free shipping completely.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSavingDelivery}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0066ff] to-[#00a3ff] hover:from-[#0052cc] hover:to-[#0088ff] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#0088ff]/20 transition disabled:opacity-50"
              >
                {isSavingDelivery ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Delivery Changes...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Delivery Charges</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Live Simulator & Breakdown Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
                  Live Customer Experience Preview
                </h3>
                <span className="text-[10px] font-mono text-[#0088ff] font-bold">Simulator</span>
              </div>

              {/* Sample Checkout Cards */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-zinc-500">1. Checkout Location Selector:</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-xl border border-[#00a3ff] bg-zinc-50 dark:bg-[#0088ff]/10">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-zinc-950 dark:text-white text-[11px]">Inside Dhaka</span>
                      <span className="font-mono text-xs font-bold text-[#0088ff]">
                        ৳{insideDhaka}
                      </span>
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-1">24-48 Hours</div>
                  </div>

                  <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-zinc-950 dark:text-white text-[11px]">Outside Dhaka</span>
                      <span className="font-mono text-xs font-bold text-[#0088ff]">
                        ৳{outsideDhaka}
                      </span>
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-1">48-72 Hours</div>
                  </div>
                </div>
              </div>

              {/* Free Shipping Meter Preview */}
              <div className="space-y-1.5 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <div className="text-[11px] font-bold text-zinc-500">2. Cart Drawer Progress Meter:</div>
                <div className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Add <strong>৳1,200</strong> more for <strong>FREE Delivery</strong>
                    </span>
                    <span className="font-mono font-bold text-zinc-500">60%</span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#0066ff] to-[#00a3ff] h-full w-[60%]" />
                  </div>
                </div>
              </div>

              {/* Guarantees Bar in Footer */}
              <div className="space-y-1 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <div className="text-[11px] font-bold text-zinc-500">3. Storefront Footer Bar:</div>
                <div className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-[#0088ff] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[11px] text-zinc-900 dark:text-white">Fast Nationwide Shipping</div>
                    <div className="text-[10px] text-zinc-500">
                      Inside Dhaka 24-48h (৳{insideDhaka}), Outside Dhaka 48-72h (৳{outsideDhaka}).
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SECTION: CONTACT & LOCATION CONTROL (NEW!)                             */}
      {/* ========================================================================= */}
      {activeSection === "contact" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0088ff]/10 text-[#0088ff] flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
                    Store Location & Customer Helpline
                  </h3>
                  <p className="text-[11px] text-zinc-500">
                    Changes here immediately update the website footer, checkout notices, and verification details
                  </p>
                </div>
              </div>

              {contactSavedSuccess && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Saved
                </span>
              )}
            </div>

            <form onSubmit={handleSaveContactInfo} className="space-y-4">
              {/* Store Physical Address / Location */}
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-900 dark:text-zinc-200 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#0088ff]/10 text-[#0088ff] flex items-center justify-center">
                      <MapPin className="w-3.5 h-3.5" />
                    </span>
                    <span>Store Hub & Dispatch Address (লোকেশন) *</span>
                  </label>
                  <span className="text-[10px] text-zinc-400">Footer & Invoices</span>
                </div>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  placeholder="e.g. Gulshan 1 / Banani Hub, Dhaka, Bangladesh"
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0088ff] transition"
                />
                <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
                  <span className="text-[10px] text-zinc-400">Quick presets:</span>
                  {[
                    "Gulshan 1 / Banani Hub, Dhaka, Bangladesh",
                    "Dhanmondi 27 Hub, Dhaka, Bangladesh",
                    "Uttara Sector 3 Hub, Dhaka, Bangladesh",
                    "Mirpur 10 Hub, Dhaka, Bangladesh",
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAddress(preset)}
                      className="px-2 py-0.5 text-[10px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-[#0088ff] transition"
                    >
                      {preset.split(",")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile / Helpline Phone Number */}
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-900 dark:text-zinc-200 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <PhoneCall className="w-3.5 h-3.5" />
                    </span>
                    <span>Official Helpline / Mobile Number (মোবাইল নম্বর) *</span>
                  </label>
                  <span className="text-[10px] text-zinc-400">Click to call enabled</span>
                </div>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="e.g. +880 1799-445851"
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0088ff] transition"
                />
                <p className="text-[10px] text-zinc-500">
                  Customers can tap this directly to place inquiry calls or verify orders.
                </p>
              </div>

              {/* Official Support Email */}
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-900 dark:text-zinc-200 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                      <Mail className="w-3.5 h-3.5" />
                    </span>
                    <span>Customer Support Email (ইমেইল এড্রেস) *</span>
                  </label>
                  <span className="text-[10px] text-zinc-400">Inquiries & Returns</span>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="e.g. support@dhakaiyadripz.com"
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0088ff] transition"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSavingContact}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0066ff] to-[#00a3ff] hover:from-[#0052cc] hover:to-[#0088ff] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#0088ff]/20 transition disabled:opacity-50"
              >
                {isSavingContact ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Contact Info...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Location, Mobile & Email</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Live Storefront Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
                  Live Footer & Checkout Display Preview
                </h3>
                <span className="text-[10px] font-mono text-[#0088ff] font-bold">Storefront Live</span>
              </div>

              {/* 1. Footer Brand Contact Card */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-zinc-500">1. Storefront Footer Info:</div>
                <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2.5 text-xs">
                  <div className="flex items-center gap-2.5 text-zinc-700 dark:text-zinc-300">
                    <MapPin className="w-4 h-4 text-[#0088ff] shrink-0" />
                    <span className="font-semibold">{address || "No address set"}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-zinc-700 dark:text-zinc-300">
                    <PhoneCall className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-semibold font-mono">{phone || "No phone set"} (10 AM - 10 PM)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-zinc-700 dark:text-zinc-300">
                    <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="font-semibold">{email || "No email set"}</span>
                  </div>
                </div>
              </div>

              {/* 2. Checkout Verification Notice */}
              <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <div className="text-[11px] font-bold text-zinc-500">2. Checkout Order Notice:</div>
                <div className="bg-zinc-50 dark:bg-zinc-950 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#0088ff] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="font-bold text-[11px] text-zinc-900 dark:text-white">Order Verification Call</div>
                    <div className="text-[10px] text-zinc-500">
                      Expect a call from <strong className="text-zinc-900 dark:text-white font-mono">{phone}</strong> within 2 business hours.
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Action Preview */}
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex gap-2">
                <a
                  href={`tel:${phone?.replace(/\s+/g, "")}`}
                  className="flex-1 py-2 px-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-center font-bold text-[11px] text-zinc-800 dark:text-zinc-200 flex items-center justify-center gap-1.5 transition"
                >
                  <PhoneCall className="w-3 h-3 text-emerald-500" />
                  <span>Test Call Link</span>
                </a>
                <a
                  href={`mailto:${email}`}
                  className="flex-1 py-2 px-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-center font-bold text-[11px] text-zinc-800 dark:text-zinc-200 flex items-center justify-center gap-1.5 transition"
                >
                  <Mail className="w-3 h-3 text-amber-500" />
                  <span>Test Email Link</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SECTION: SOCIAL MEDIA CHANNELS CONTROL                                 */}
      {/* ========================================================================= */}
      {activeSection === "social" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Social Channels Form (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0088ff]/10 text-[#0088ff] flex items-center justify-center">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
                    Social Media Channels
                  </h3>
                  <p className="text-[11px] text-zinc-500">
                    Add or edit URLs for your official social media pages displayed in the website footer
                  </p>
                </div>
              </div>

              {socialSavedSuccess && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Saved
                </span>
              )}
            </div>

            <form onSubmit={handleSaveSocialLinks} className="space-y-3.5">
              {/* Facebook */}
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-900 dark:text-zinc-200 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center">
                      <FacebookIcon className="w-3.5 h-3.5" />
                    </span>
                    <span>Facebook Page / Group</span>
                  </label>
                  {socialLinks.facebook?.trim() && (
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-[#1877F2] hover:underline flex items-center gap-0.5"
                    >
                      <span>Test URL</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
                <input
                  type="url"
                  value={socialLinks.facebook || ""}
                  onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                  placeholder="https://facebook.com/dhakaiyadripz"
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#1877F2] transition"
                />
              </div>

              {/* Instagram */}
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-900 dark:text-zinc-200 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#E4405F]/10 text-[#E4405F] flex items-center justify-center">
                      <InstagramIcon className="w-3.5 h-3.5" />
                    </span>
                    <span>Instagram Profile</span>
                  </label>
                  {socialLinks.instagram?.trim() && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-[#E4405F] hover:underline flex items-center gap-0.5"
                    >
                      <span>Test URL</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
                <input
                  type="url"
                  value={socialLinks.instagram || ""}
                  onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                  placeholder="https://instagram.com/dhakaiyadripz"
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#E4405F] transition"
                />
              </div>

              {/* TikTok */}
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-900 dark:text-zinc-200 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
                      <TikTokIcon className="w-3.5 h-3.5" />
                    </span>
                    <span>TikTok Channel</span>
                  </label>
                  {socialLinks.tiktok?.trim() && (
                    <a
                      href={socialLinks.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200 hover:underline flex items-center gap-0.5"
                    >
                      <span>Test URL</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
                <input
                  type="url"
                  value={socialLinks.tiktok || ""}
                  onChange={(e) => setSocialLinks({ ...socialLinks, tiktok: e.target.value })}
                  placeholder="https://tiktok.com/@dhakaiyadripz"
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-black dark:focus:border-white transition"
                />
              </div>

              {/* WhatsApp */}
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-900 dark:text-zinc-200 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                    </span>
                    <span>WhatsApp Business Link / Number</span>
                  </label>
                  {socialLinks.whatsapp?.trim() && (
                    <a
                      href={socialLinks.whatsapp.startsWith("http") ? socialLinks.whatsapp : `https://wa.me/${socialLinks.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-[#25D366] hover:underline flex items-center gap-0.5"
                    >
                      <span>Test Chat</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
                <input
                  type="text"
                  value={socialLinks.whatsapp || ""}
                  onChange={(e) => setSocialLinks({ ...socialLinks, whatsapp: e.target.value })}
                  placeholder="https://wa.me/8801799445851 or 01799445851"
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#25D366] transition"
                />
              </div>

              {/* YouTube */}
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-900 dark:text-zinc-200 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#FF0000]/10 text-[#FF0000] flex items-center justify-center">
                      <YouTubeIcon className="w-3.5 h-3.5" />
                    </span>
                    <span>YouTube Channel (Optional)</span>
                  </label>
                  {socialLinks.youtube?.trim() && (
                    <a
                      href={socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-[#FF0000] hover:underline flex items-center gap-0.5"
                    >
                      <span>Test URL</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
                <input
                  type="url"
                  value={socialLinks.youtube || ""}
                  onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                  placeholder="https://youtube.com/@dhakaiyadripz"
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#FF0000] transition"
                />
              </div>

              {/* Twitter / X */}
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-900 dark:text-zinc-200 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-zinc-800 text-white flex items-center justify-center">
                      <TwitterXIcon className="w-3.5 h-3.5" />
                    </span>
                    <span>Twitter / X (Optional)</span>
                  </label>
                  {socialLinks.twitter?.trim() && (
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300 hover:underline flex items-center gap-0.5"
                    >
                      <span>Test URL</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
                <input
                  type="url"
                  value={socialLinks.twitter || ""}
                  onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                  placeholder="https://x.com/dhakaiyadripz"
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 transition"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSavingSocial}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0066ff] to-[#00a3ff] hover:from-[#0052cc] hover:to-[#0088ff] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#0088ff]/20 transition disabled:opacity-50"
              >
                {isSavingSocial ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Social Links...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Social Media Links</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Social Badges Footer Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
                  Footer Social Channels Preview
                </h3>
                <span className="text-[10px] font-mono text-[#0088ff] font-bold">Storefront Live</span>
              </div>

              <p className="text-xs text-zinc-500 leading-relaxed">
                Here is exactly how your social media icons and links will appear to visitors in the storefront footer:
              </p>

              {/* Footer Preview Card */}
              <div className="bg-zinc-100 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                  Connect With Dhakaiya Dripz
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {socialLinks.facebook?.trim() && (
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-[#1877F2] hover:scale-105 transition shadow-2xs"
                      title="Facebook"
                    >
                      <FacebookIcon className="w-4 h-4" />
                    </a>
                  )}

                  {socialLinks.instagram?.trim() && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-[#E4405F] hover:scale-105 transition shadow-2xs"
                      title="Instagram"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                  )}

                  {socialLinks.tiktok?.trim() && (
                    <a
                      href={socialLinks.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white hover:scale-105 transition shadow-2xs"
                      title="TikTok"
                    >
                      <TikTokIcon className="w-4 h-4" />
                    </a>
                  )}

                  {socialLinks.whatsapp?.trim() && (
                    <a
                      href={socialLinks.whatsapp.startsWith("http") ? socialLinks.whatsapp : `https://wa.me/${socialLinks.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-[#25D366] hover:scale-105 transition shadow-2xs"
                      title="WhatsApp"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                    </a>
                  )}

                  {socialLinks.youtube?.trim() && (
                    <a
                      href={socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-[#FF0000] hover:scale-105 transition shadow-2xs"
                      title="YouTube"
                    >
                      <YouTubeIcon className="w-4 h-4" />
                    </a>
                  )}

                  {socialLinks.twitter?.trim() && (
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200 hover:scale-105 transition shadow-2xs"
                      title="Twitter / X"
                    >
                      <TwitterXIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="text-[10px] text-zinc-500 pt-1">
                  Active channels open in a secure new tab for visitors.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SECTION: BRAND LOGO & VISUAL IDENTITY                                  */}
      {/* ========================================================================= */}
      {activeSection === "branding" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* LEFT: Upload & Management Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {/* Card: File Upload */}
            <div className="bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
                  Upload Logo File
                </h3>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-bold">
                  PNG / SVG / WebP
                </span>
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={logoFileInputRef}
                onChange={(e) => handleLogoFileUpload(e.target.files)}
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                className="hidden"
              />

              {/* Drag & Drop Zone */}
              <div
                onClick={() => !isLogoUploading && logoFileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-2 ${
                  isLogoUploading
                    ? "border-zinc-400 bg-zinc-100 dark:bg-zinc-800/40 cursor-wait"
                    : "border-zinc-300 dark:border-zinc-700 hover:border-[#0088ff] hover:bg-[#0088ff]/5 dark:hover:bg-[#0088ff]/10"
                }`}
              >
                {isLogoUploading ? (
                  <>
                    <Loader2 className="w-7 h-7 text-[#0088ff] animate-spin" />
                    <div className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      Uploading logo...
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300">
                      <UploadCloud className="w-5 h-5 text-[#0088ff] dark:text-[#00a3ff]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-950 dark:text-white">
                        Click to browse or drop brand logo
                      </div>
                      <div className="text-[10px] text-zinc-400">
                        Transparent PNG or SVG with light lettering recommended
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-mono">
                <span className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
                <span>OR PASTE URL</span>
                <span className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
              </div>

              {/* URL Input Form */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={logoInputUrl}
                    onChange={(e) => setLogoInputUrl(e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-black dark:focus:border-[#0088ff]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyLogoUrl}
                    disabled={!logoInputUrl.trim()}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-[#0066ff] to-[#00a3ff] text-white font-bold text-xs rounded-lg disabled:opacity-40 transition shadow-xs"
                  >
                    Apply
                  </button>
                </div>
                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <span className="text-[10px] text-zinc-400">Direct CDN / upload link</span>
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateLogo("/uploads/drip-062eabdb-e093-4aef-8-1790770654393-4474.png");
                      onTriggerToast("Applied authentic Dhakaiya Dripz brand logo!");
                    }}
                    className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-700 dark:text-zinc-300 hover:text-[#00a3ff] border border-zinc-200 dark:border-zinc-700 transition flex items-center gap-1"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-[#0066ff] dark:text-[#00a3ff]" />
                    <span>Authentic Cyber Logo</span>
                  </button>
                </div>
              </div>

              {/* Reset */}
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-zinc-500 text-[11px]">
                  {customLogoUrl ? "Custom logo active" : "Default logo active"}
                </span>
                {customLogoUrl && (
                  <button
                    type="button"
                    onClick={handleResetLogo}
                    className="text-[11px] font-bold text-red-600 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset to Default</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Live Storefront Previews (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
                  Live Storefront Previews
                </h3>
                <Link
                  href="/"
                  target="_blank"
                  className="text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white flex items-center gap-1"
                >
                  <span>Storefront</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              {/* PREVIEW 1: Sticky Navbar on Dark Background */}
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-zinc-500">Dark Sticky Navbar</div>
                <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-800 shadow-xs flex items-center justify-between gap-3">
                  <div className="shrink-0 flex items-center">
                    {customLogoUrl && !adminLogoLoadError ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={customLogoUrl}
                        alt="Dhakaiya Dripz Logo"
                        onError={() => setAdminLogoLoadError(true)}
                        className="h-10 w-auto max-w-[170px] object-contain"
                      />
                    ) : (
                      <span className="font-black text-base tracking-tight text-white uppercase">
                        DHAKAIYA<span className="text-[#00a3ff]">DRIPZ</span>
                      </span>
                    )}
                  </div>

                  <div className="hidden sm:flex items-center space-x-2 text-[11px] font-bold text-zinc-400">
                    <span className="text-white">MEN</span>
                    <span>WOMEN</span>
                    <span>UNISEX</span>
                  </div>

                  <div className="flex items-center space-x-2 text-zinc-400">
                    <Heart className="w-3.5 h-3.5" />
                    <ShoppingBag className="w-3.5 h-3.5 text-[#00a3ff]" />
                  </div>
                </div>
              </div>

              {/* PREVIEW 2: Light Background Preview */}
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-zinc-500">Light Background Contrast</div>
                <div className="bg-white rounded-xl p-3 border border-zinc-300 shadow-2xs flex items-center justify-between">
                  <div className="shrink-0 flex items-center">
                    {customLogoUrl && !adminLogoLoadError ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={customLogoUrl}
                        alt="Dhakaiya Dripz Logo"
                        onError={() => setAdminLogoLoadError(true)}
                        className="h-10 w-auto max-w-[170px] object-contain"
                      />
                    ) : (
                      <span className="font-black text-base tracking-tight text-zinc-950 uppercase">
                        DHAKAIYA<span className="text-[#0088ff]">DRIPZ</span>
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono">Contrast verification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SECTION: ADMIN SECURITY & LOGIN CREDENTIALS                            */}
      {/* ========================================================================= */}
      {activeSection === "security" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Security Form (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-5">
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <span className="text-[10px] font-mono text-[#0088ff] dark:text-[#00a3ff] uppercase font-bold tracking-widest flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Access Control • Authentication Security
              </span>
              <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-zinc-950 dark:text-white mt-1">
                Admin Login Credentials
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Manage the master administrative username and password required to access the /admin portal.
              </p>
            </div>

            <form onSubmit={handleSaveSecurity} className="space-y-4">
              {/* Username Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Admin Username or Master Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="e.g. admin or admin@dhakaiyadripz.com"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-3 py-2 text-xs font-mono font-bold text-zinc-900 dark:text-white focus:outline-none focus:border-[#0088ff]"
                  />
                </div>
                <p className="text-[11px] text-zinc-400 font-mono">
                  You can log in using either this username or admin@dhakaiyadripz.com.
                </p>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Admin Portal Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showAdminPass ? "text" : "password"}
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter new admin password"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-10 py-2 text-xs font-mono font-bold text-zinc-900 dark:text-white focus:outline-none focus:border-[#0088ff]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPass(!showAdminPass)}
                    className="p-1.5 text-zinc-400 hover:text-black dark:hover:text-white absolute right-2.5 top-1/2 -translate-y-1/2 rounded transition"
                  >
                    {showAdminPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-zinc-400 font-mono">
                  Default password is <span className="font-bold text-zinc-800 dark:text-zinc-200">admin</span>. You can change it anytime to a custom secure password.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                {securitySavedSuccess ? (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Credentials Updated & Synced!</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-zinc-400 font-mono">
                    Changes take effect immediately on next login
                  </span>
                )}

                <button
                  type="submit"
                  disabled={isSavingSecurity}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0066ff] to-[#00a3ff] hover:from-[#0055dd] hover:to-[#0092ee] disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-[#0088ff]/25 transition flex items-center gap-2 cursor-pointer"
                >
                  {isSavingSecurity ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Credentials</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Info Sidebox (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-zinc-900 text-white p-5 rounded-2xl border border-zinc-800 space-y-3">
              <span className="text-[10px] font-mono text-[#00a3ff] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5" />
                Security Architecture
              </span>
              <h3 className="font-bold text-sm uppercase">Portal Protection Active</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The /admin route is protected with browser session verification. Anyone attempting to visit the admin panel without logging in will be redirected to the secure Operations Login screen.
              </p>
              <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 space-y-1.5 text-xs font-mono">
                <div className="text-zinc-500 text-[10px] uppercase">Active Master Access:</div>
                <div className="text-zinc-200">
                  Username: <span className="font-bold text-[#00a3ff]">{adminUsername}</span>
                </div>
                <div className="text-zinc-200">
                  Password: <span className="font-bold text-emerald-400">{showAdminPass ? adminPassword : "••••••••"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
