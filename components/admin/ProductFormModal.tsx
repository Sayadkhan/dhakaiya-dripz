"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  X,
  UploadCloud,
  Image as ImageIcon,
  Star,
  Film,
  Loader2,
  Check,
  Package,
} from "lucide-react";
import { ProductItem } from "@/lib/mock-data";
import { CategoryItem, ColorItem } from "@/context/ProductContext";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProduct: (product: ProductItem, isEdit: boolean) => void;
  initialProduct: ProductItem | null;
  categories: CategoryItem[];
  colors: ColorItem[];
  sizes: string[];
}

export default function ProductFormModal({
  isOpen,
  onClose,
  onSaveProduct,
  initialProduct,
  categories,
  colors,
  sizes,
}: ProductFormModalProps) {
  const isEditMode = Boolean(initialProduct);

  // Form states
  const [prodTitle, setProdTitle] = useState("");
  const [prodCategory, setProdCategory] = useState("");
  const [prodGender, setProdGender] = useState<"UNISEX" | "MEN" | "WOMEN">("UNISEX");
  const [prodFit, setProdFit] = useState<"OVERSIZED" | "RELAXED" | "REGULAR" | "TAILORED">("OVERSIZED");
  const [prodBasePrice, setProdBasePrice] = useState<number>(2500);
  const [prodSalePrice, setProdSalePrice] = useState<string>("");
  const [prodTagline, setProdTagline] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodIsFeatured, setProdIsFeatured] = useState<boolean>(true);
  const [prodImages, setProdImages] = useState<string[]>([]);
  const [prodCatwalkVideo, setProdCatwalkVideo] = useState("");
  const [selectedProdColors, setSelectedProdColors] = useState<{ name: string; hex: string }[]>([]);
  const [selectedProdSizes, setSelectedProdSizes] = useState<{ size: string; stock: number }[]>([]);

  // Image upload helpers
  const [isUploading, setIsUploading] = useState(false);
  const [manualUrlInput, setManualUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Prepopulate form when initialProduct changes
  useEffect(() => {
    if (initialProduct) {
      setProdTitle(initialProduct.title);
      setProdCategory(initialProduct.category);
      setProdGender(initialProduct.gender);
      setProdFit(initialProduct.fit);
      setProdBasePrice(initialProduct.basePrice);
      setProdSalePrice(initialProduct.salePrice ? String(initialProduct.salePrice) : "");
      setProdTagline(initialProduct.tagline);
      setProdDesc(initialProduct.description);
      setProdIsFeatured(initialProduct.isFeatured);
      setProdImages(initialProduct.images || []);
      setProdCatwalkVideo(initialProduct.catwalkVideoUrl || "");
      setSelectedProdColors(initialProduct.colors || []);
      setSelectedProdSizes(initialProduct.sizes || []);
    } else {
      setProdTitle("");
      setProdCategory(categories[0]?.name || "Pants");
      setProdGender("UNISEX");
      setProdFit("OVERSIZED");
      setProdBasePrice(2500);
      setProdSalePrice("");
      setProdTagline("");
      setProdDesc("");
      setProdIsFeatured(true);
      setProdImages([]);
      setProdCatwalkVideo("");
      setSelectedProdColors([]);
      setSelectedProdSizes([]);
    }
  }, [initialProduct, categories]);

  if (!isOpen) return null;

  // Handle Multi-file Upload to Server API
  const handleFilesSelected = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (f.size > 25 * 1024 * 1024) {
        alert(`File "${f.name}" is larger than 25MB. Please choose a smaller image.`);
        continue;
      }
      validFiles.push(f);
    }
    if (validFiles.length === 0) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < validFiles.length; i++) {
        formData.append("files", validFiles[i]);
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch {
        // Response was not JSON
      }

      if (res.ok && data?.urls && data.urls.length > 0) {
        setProdImages((prev) => [...prev, ...data.urls]);
      } else {
        const errorMsg =
          data?.error ||
          (res.status === 413
            ? "File size exceeds server upload limits."
            : `Upload failed (Status ${res.status || "Unknown"}). Please check image format.`);
        alert(errorMsg);
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      alert(err?.message || "Error uploading images. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleAddManualUrl = () => {
    if (!manualUrlInput.trim()) return;
    setProdImages((prev) => [...prev, manualUrlInput.trim()]);
    setManualUrlInput("");
  };

  const handleSetCover = (index: number) => {
    if (index === 0) return;
    setProdImages((prev) => {
      const target = prev[index];
      const remaining = prev.filter((_, i) => i !== index);
      return [target, ...remaining];
    });
  };

  const handleRemoveImage = (index: number) => {
    setProdImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleSizeForProduct = (size: string) => {
    setSelectedProdSizes((prev) => {
      const exists = prev.find((s) => s.size === size);
      if (exists) {
        return prev.filter((s) => s.size !== size);
      } else {
        return [...prev, { size, stock: 5 }];
      }
    });
  };

  const updateNewProdSizeStock = (size: string, stockVal: number) => {
    setSelectedProdSizes((prev) =>
      prev.map((s) => (s.size === size ? { ...s, stock: Math.max(0, stockVal) } : s))
    );
  };

  const toggleColorForProduct = (c: { name: string; hex: string }) => {
    setSelectedProdColors((prev) => {
      const exists = prev.find((item) => item.name === c.name);
      if (exists) {
        return prev.filter((item) => item.name !== c.name);
      } else {
        return [...prev, c];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) {
      alert("Images are currently uploading. Please wait a moment until upload finishes.");
      return;
    }
    if (!prodTitle.trim()) {
      alert("Please enter product title");
      return;
    }

    const rawSlug = prodTitle
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const slug = initialProduct
      ? initialProduct.slug
      : `${rawSlug || "drip-drop"}-${Date.now().toString().slice(-4)}`;

    const fallbackImg =
      "/uploads/drip-062eabdb-e093-4aef-8-1790770654393-4474.png";
    const finalImages = prodImages.length > 0 ? prodImages : [fallbackImg];

    const finalSizes =
      selectedProdSizes.length > 0
        ? selectedProdSizes
        : [{ size: "M", stock: 10 }, { size: "L", stock: 10 }];

    const finalColors =
      selectedProdColors.length > 0
        ? selectedProdColors
        : [{ name: "Standard Black", hex: "#111111" }];

    const totalStock = finalSizes.reduce((acc, s) => acc + s.stock, 0);

    const productPayload: ProductItem = {
      id: initialProduct ? initialProduct.id : `drip-prod-${Date.now()}`,
      title: prodTitle.trim(),
      slug,
      tagline:
        prodTagline.trim() ||
        `${prodFit} silhouette casualwear crafted for Dhaka urban aesthetic.`,
      description:
        prodDesc.trim() ||
        "Heavyweight custom combed weave garment with architectural drape.",
      basePrice: Number(prodBasePrice) || 2200,
      salePrice: prodSalePrice ? Number(prodSalePrice) : undefined,
      gender: prodGender,
      category: (prodCategory || categories[0]?.name || "Pants") as any,
      fit: prodFit,
      isNewDrop: initialProduct ? initialProduct.isNewDrop : true,
      isFeatured: prodIsFeatured,
      stockCount: totalStock,
      catwalkVideoUrl: prodCatwalkVideo.trim() || undefined,
      images: finalImages,
      sizes: finalSizes,
      colors: finalColors,
      details: initialProduct?.details || [
        "Architectural heavyweight combed cotton construction",
        "Reinforced stress seams for active durability",
        "Permanent structure wash finish",
        "Engineered for humid Dhaka weather",
      ],
    };

    onSaveProduct(productPayload, isEditMode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl text-zinc-900 dark:text-white overflow-hidden">
        {/* Sticky Header */}
        <div className="shrink-0 flex items-center justify-between px-5 py-3 sm:px-6 sm:py-3.5 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm z-20">
          <div>
            <span className="text-[10px] font-mono text-[#0088ff] dark:text-[#00a3ff] uppercase font-bold tracking-widest">
              Catalog Engine • {isEditMode ? "Edit Product" : "New Silhouette"}
            </span>
            <h3 className="font-black text-base sm:text-lg uppercase tracking-tight text-zinc-950 dark:text-white">
              {isEditMode ? `Edit: ${initialProduct?.title}` : "Add New Silhouette"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* Row 1: Title, Category, Gender, Fit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tactical Pleated Crease Trouser"
                  value={prodTitle}
                  onChange={(e) => setProdTitle(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs font-bold text-zinc-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-[#0088ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Category
                </label>
                <select
                  value={prodCategory}
                  onChange={(e) => setProdCategory(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs font-bold text-zinc-900 dark:text-white focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Gender
                </label>
                <select
                  value={prodGender}
                  onChange={(e) => setProdGender(e.target.value as any)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs font-bold text-zinc-900 dark:text-white focus:outline-none"
                >
                  <option value="UNISEX">UNISEX</option>
                  <option value="MEN">MEN</option>
                  <option value="WOMEN">WOMEN</option>
                </select>
              </div>
            </div>

            {/* Row 2: Pricing & Fit */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Base Price (৳ BDT) *
                </label>
                <input
                  type="number"
                  required
                  value={prodBasePrice}
                  onChange={(e) => setProdBasePrice(Number(e.target.value))}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-zinc-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-[#00a3ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Sale Price (Optional ৳)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1950 (leave empty if regular)"
                  value={prodSalePrice}
                  onChange={(e) => setProdSalePrice(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-zinc-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-[#00a3ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Structural Fit
                </label>
                <select
                  value={prodFit}
                  onChange={(e) => setProdFit(e.target.value as any)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs font-bold text-zinc-900 dark:text-white focus:outline-none"
                >
                  <option value="OVERSIZED">OVERSIZED</option>
                  <option value="RELAXED">RELAXED</option>
                  <option value="REGULAR">REGULAR</option>
                  <option value="TAILORED">TAILORED</option>
                </select>
              </div>
            </div>

            {/* Tagline & Description */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Tagline (Short Summary)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Architectural drape heavyweight twill casual trouser."
                  value={prodTagline}
                  onChange={(e) => setProdTagline(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Product Description
                </label>
                <input
                  type="text"
                  placeholder="Detailed garment specifications and fabrics"
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            {/* MULTIPLE IMAGES UPLOAD SYSTEM */}
            <div className="p-4 sm:p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#0088ff] dark:text-[#00a3ff]" />
                  <span>Product Gallery Images ({prodImages.length})</span>
                </h4>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  First image is the Primary Cover photo. Second is the hover flip photo.
                </p>
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFilesSelected(e.dataTransfer.files);
                }}
                className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-[#0088ff] rounded-2xl p-6 text-center cursor-pointer transition bg-white dark:bg-zinc-950 flex flex-col items-center justify-center space-y-2 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFilesSelected(e.target.files)}
                  className="hidden"
                />
                {isUploading ? (
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 py-2">
                    <Loader2 className="w-5 h-5 animate-spin text-[#0088ff]" />
                    <span>Uploading images to server...</span>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition">
                      <UploadCloud className="w-6 h-6 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-[#00a3ff]" />
                    </div>
                    <div className="text-xs font-bold text-zinc-900 dark:text-white">
                      Click to browse or Drag & Drop Multiple Images
                    </div>
                    <div className="text-[11px] text-zinc-500 font-mono">
                      PNG, JPG, WEBP • Unlimited uploads
                    </div>
                  </>
                )}
              </div>

              {/* Uploaded Gallery Previews */}
              {prodImages.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                    Uploaded Photos Preview:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {prodImages.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 bg-zinc-200 dark:bg-zinc-900 group shadow-xs ${
                          idx === 0
                            ? "border-[#0088ff] dark:border-[#00a3ff] ring-2 ring-[#0088ff]/20 dark:ring-[#00a3ff]/20"
                            : "border-zinc-200 dark:border-zinc-800"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imgUrl}
                          alt={`Uploaded photo ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {idx === 0 ? (
                          <span className="absolute top-1 left-1 bg-gradient-to-r from-[#0066ff] to-[#00a3ff] text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded shadow-xs uppercase">
                            Cover
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSetCover(idx)}
                            title="Set as Cover Image"
                            className="absolute top-1 left-1 bg-black/75 text-white hover:text-[#00a3ff] p-1 rounded opacity-0 group-hover:opacity-100 transition"
                          >
                            <Star className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          title="Remove image"
                          className="absolute top-1 right-1 bg-red-600/90 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Paste URL */}
              <div className="flex items-center gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <span className="text-[11px] font-bold text-zinc-500 whitespace-nowrap">
                  Or paste external URL:
                </span>
                <input
                  type="url"
                  placeholder="https://... (or upload image above)"
                  value={manualUrlInput}
                  onChange={(e) => setManualUrlInput(e.target.value)}
                  className="flex-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-900 dark:text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddManualUrl}
                  className="px-3 py-1.5 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-xs font-bold rounded-xl text-zinc-900 dark:text-white transition"
                >
                  Add URL
                </button>
              </div>
            </div>

            {/* Catwalk Video URL Field */}
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2">
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <Film className="w-4 h-4 text-[#0088ff] dark:text-[#00a3ff]" />
                <span>Catwalk Video MP4 URL (Runway simulation)</span>
              </label>
              <input
                type="url"
                placeholder="https://commondatastorage.googleapis.com/.../catwalk.mp4"
                value={prodCatwalkVideo}
                onChange={(e) => setProdCatwalkVideo(e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none"
              />
            </div>

            {/* Hero Slider Feature Toggle */}
            <label className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-black dark:hover:border-[#0088ff] transition">
              <input
                type="checkbox"
                checked={prodIsFeatured}
                onChange={(e) => setProdIsFeatured(e.target.checked)}
                className="w-4 h-4 accent-[#0088ff] rounded cursor-pointer"
              />
              <div>
                <span className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-[#0088ff] dark:text-[#00a3ff] fill-current" />
                  Feature in Homepage Hero Lookbook Slider
                </span>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  Highlights this product in the rotating showcase on the customer storefront homepage.
                </p>
              </div>
            </label>

            {/* Color Swatches Selection */}
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span>Select Garment Colors:</span>
                <span className="text-zinc-500 font-normal">Click to toggle</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => {
                  const isSelected = selectedProdColors.some((item) => item.name === c.name);
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => toggleColorForProduct(c)}
                      className={`flex items-center gap-2 p-1.5 px-3 rounded-xl border text-xs font-medium transition ${
                        isSelected
                          ? "border-black dark:border-[#00a3ff] bg-white dark:bg-zinc-800 shadow-xs font-bold"
                          : "border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/30 shadow-xs"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-black dark:text-[#00a3ff]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sizes & Stock Allocation */}
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span>Select Sizes & Allocate Stock:</span>
                <span className="text-zinc-500 font-normal">Toggle sizes to include</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {sizes.map((sz) => {
                  const isSelected = selectedProdSizes.some((s) => s.size === sz);
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => toggleSizeForProduct(sz)}
                      className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-bold transition ${
                        isSelected
                          ? "border-[#0088ff] dark:border-[#00a3ff] bg-gradient-to-r from-[#0066ff] to-[#00a3ff] text-white shadow-xs"
                          : "border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>

              {/* Stock inputs */}
              {selectedProdSizes.length > 0 && (
                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {selectedProdSizes.map((s) => (
                    <div
                      key={s.size}
                      className="bg-white dark:bg-zinc-950 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between"
                    >
                      <span className="font-mono font-bold text-xs">{s.size}:</span>
                      <input
                        type="number"
                        min={0}
                        value={s.stock}
                        onChange={(e) => updateNewProdSizeStock(s.size, Number(e.target.value))}
                        className="w-16 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2 py-1 text-xs font-mono font-bold text-center focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="shrink-0 px-5 py-3 sm:px-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/95 dark:bg-zinc-900/95 backdrop-blur-sm flex items-center justify-between gap-3 z-20">
            <div className="text-[10px] text-zinc-400 font-mono hidden sm:block">
              {prodImages.length} image(s) • {selectedProdSizes.length} sizes configured
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className="px-5 py-1.5 rounded-lg text-xs font-black bg-gradient-to-r from-[#0066ff] to-[#00a3ff] hover:from-[#0055dd] hover:to-[#0092ee] disabled:opacity-50 text-white uppercase tracking-wider shadow-md shadow-[#0088ff]/25 transition flex items-center gap-1.5"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <span>{isEditMode ? "Save Changes" : "Publish Product"}</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
