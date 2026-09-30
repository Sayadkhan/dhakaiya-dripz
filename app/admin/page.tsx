"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Package,
  PhoneCall,
  ShoppingBag,
  ExternalLink,
  Plus,
  Search,
  XCircle,
  FolderPlus,
  Palette,
  Ruler,
  X,
  Check,
  Eye,
  Trash2,
  UploadCloud,
  Image as ImageIcon,
  Star,
  Film,
  Loader2,
  Heart,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { INITIAL_ORDERS, OrderItemRecord, ProductItem } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import ThemeToggle from "@/components/store/ThemeToggle";
import { useProducts } from "@/context/ProductContext";

export default function AdminPage() {
  const {
    products,
    categories,
    sizes,
    colors,
    addProduct,
    deleteProduct,
    updateStock,
    addCategory,
    deleteCategory,
    addColor,
    deleteColor,
    addSize,
    deleteSize,
    toggleFeaturedProduct,
    customLogoUrl,
    updateLogo,
  } = useProducts();

  const [orders, setOrders] = useState<OrderItemRecord[]>(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState<"orders" | "inventory" | "attributes" | "branding">("inventory");
  const [orderFilter, setOrderFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Logo upload state
  const [isLogoUploading, setIsLogoUploading] = useState(false);
  const [logoInputUrl, setLogoInputUrl] = useState("");
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const [adminLogoLoadError, setAdminLogoLoadError] = useState(false);

  React.useEffect(() => {
    setAdminLogoLoadError(false);
  }, [customLogoUrl]);

  // Modals state
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddColorOpen, setIsAddColorOpen] = useState(false);
  const [isAddSizeOpen, setIsAddSizeOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ProductItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    const title = productToDelete.title;
    deleteProduct(productToDelete.id);
    setProductToDelete(null);
    triggerToast(`"${title}" has been permanently deleted!`);
  };

  // Logo Upload & Management Handlers
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

      const data = await res.json();
      if (data.urls && data.urls.length > 0) {
        updateLogo(data.urls[0]);
        triggerToast("Brand logo uploaded and applied successfully across entire store!");
      } else {
        alert("Logo upload failed. Please try a valid image file.");
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
    updateLogo(logoInputUrl.trim());
    setLogoInputUrl("");
    triggerToast("Custom logo URL applied successfully!");
  };

  const handleResetLogo = () => {
    updateLogo(null);
    triggerToast("Brand logo reset to default typographic DHAKAIYA DRIPZ logo.");
  };

  // New Category Form state
  const [catName, setCatName] = useState("");
  const [catDesc, setCatDesc] = useState("");

  // New Color Form state (With Color Hex Code)
  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState("#D4FF00");

  // New Size Form state
  const [newSizeName, setNewSizeName] = useState("");

  // New Product Form state
  const [prodTitle, setProdTitle] = useState("");
  const [prodCategory, setProdCategory] = useState(categories[0]?.name || "Pants");
  const [prodGender, setProdGender] = useState<"UNISEX" | "MEN" | "WOMEN">("UNISEX");
  const [prodFit, setProdFit] = useState<"OVERSIZED" | "RELAXED" | "REGULAR" | "TAILORED">("OVERSIZED");
  const [prodBasePrice, setProdBasePrice] = useState<number>(2500);
  const [prodSalePrice, setProdSalePrice] = useState<string>("");
  const [prodTagline, setProdTagline] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodIsFeatured, setProdIsFeatured] = useState<boolean>(true);
  
  // MULTIPLE IMAGES UPLOAD STATE
  const [prodImages, setProdImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [manualUrlInput, setManualUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [prodCatwalkVideo, setProdCatwalkVideo] = useState("");
  
  // Selected colors & sizes for new product
  const [selectedProdColors, setSelectedProdColors] = useState<{ name: string; hex: string }[]>([]);
  const [selectedProdSizes, setSelectedProdSizes] = useState<{ size: string; stock: number }[]>([]);

  // Update order status
  const updateOrderStatus = (
    orderId: string,
    newStatus: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
  };

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter !== "ALL" && o.orderStatus !== orderFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.includes(q)
      );
    }
    return true;
  });

  // Calculate metrics
  const totalRevenue = orders
    .filter((o) => o.orderStatus !== "CANCELLED")
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrders = orders.filter((o) => o.orderStatus === "PENDING").length;
  const totalStockCount = products.reduce((sum, p) => sum + p.stockCount, 0);

  // Submit Category
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;
    addCategory(catName, catDesc);
    setCatName("");
    setCatDesc("");
    setIsAddCategoryOpen(false);
  };

  // Submit Color with HEX
  const handleSaveColor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!colorName.trim() || !colorHex.trim()) return;
    addColor(colorName, colorHex);
    setColorName("");
    setIsAddColorOpen(false);
  };

  // Submit Size
  const handleSaveSize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSizeName.trim()) return;
    addSize(newSizeName);
    setNewSizeName("");
    setIsAddSizeOpen(false);
  };

  // Handle Multi-file Upload to Server API
  const handleFilesSelected = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.urls && data.urls.length > 0) {
        setProdImages((prev) => [...prev, ...data.urls]);
      } else {
        alert("Upload failed. Please check file format.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading images. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Add URL manually
  const handleAddManualUrl = () => {
    if (!manualUrlInput.trim()) return;
    setProdImages((prev) => [...prev, manualUrlInput.trim()]);
    setManualUrlInput("");
  };

  // Set image as cover
  const handleSetCover = (index: number) => {
    if (index === 0) return;
    setProdImages((prev) => {
      const target = prev[index];
      const remaining = prev.filter((_, i) => i !== index);
      return [target, ...remaining];
    });
  };

  // Remove uploaded image
  const handleRemoveImage = (index: number) => {
    setProdImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Toggle size for new product
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

  // Update size stock for new product
  const updateNewProdSizeStock = (size: string, stockVal: number) => {
    setSelectedProdSizes((prev) =>
      prev.map((s) => (s.size === size ? { ...s, stock: Math.max(0, stockVal) } : s))
    );
  };

  // Toggle color for new product
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

  // Save new product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodTitle.trim()) {
      alert("Please enter product title");
      return;
    }

    const slug = prodTitle
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");

    const fallbackImg = "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop";
    const finalImages = prodImages.length > 0 ? prodImages : [fallbackImg];

    const finalSizes = selectedProdSizes.length > 0
      ? selectedProdSizes
      : [{ size: "M", stock: 10 }, { size: "L", stock: 10 }];

    const finalColors = selectedProdColors.length > 0
      ? selectedProdColors
      : [{ name: "Standard Black", hex: "#111111" }];

    const totalStock = finalSizes.reduce((acc, s) => acc + s.stock, 0);

    const newProd: ProductItem = {
      id: `prod-${Date.now()}`,
      title: prodTitle.trim(),
      slug,
      tagline: prodTagline.trim() || `${prodFit} silhouette casualwear crafted for Dhaka urban aesthetic.`,
      description: prodDesc.trim() || "Heavyweight custom combed weave garment with architectural drape.",
      basePrice: Number(prodBasePrice) || 2200,
      salePrice: prodSalePrice ? Number(prodSalePrice) : undefined,
      gender: prodGender,
      category: prodCategory as any,
      fit: prodFit,
      isNewDrop: true,
      isFeatured: prodIsFeatured,
      stockCount: totalStock,
      catwalkVideoUrl: prodCatwalkVideo.trim() || undefined,
      images: finalImages,
      sizes: finalSizes,
      colors: finalColors,
      details: [
        "Architectural heavyweight combed cotton construction",
        "Reinforced stress seams for active durability",
        "Permanent structure wash finish",
        "Engineered for humid Dhaka weather",
      ],
    };

    addProduct(newProd);

    // Reset Form
    setProdTitle("");
    setProdTagline("");
    setProdDesc("");
    setProdImages([]);
    setProdCatwalkVideo("");
    setSelectedProdColors([]);
    setSelectedProdSizes([]);
    setIsAddProductOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white selection:bg-[#d4ff00] selection:text-black transition-colors duration-200">
      {/* Admin Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-900 bg-white/90 dark:bg-zinc-900/60 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#d4ff00] text-black font-black text-xs shadow-xs">
              ADMIN
            </div>
            <div>
              {customLogoUrl && !adminLogoLoadError ? (
                <img
                  src={customLogoUrl}
                  alt="Dhakaiya Dripz Logo"
                  onError={() => setAdminLogoLoadError(true)}
                  className="h-7 w-auto object-contain max-w-[150px]"
                />
              ) : (
                <span className="font-black text-lg uppercase tracking-tight text-zinc-950 dark:text-white">
                  DHAKAIYA<span className="text-[#a4cc00] dark:text-[#d4ff00]">DRIPZ</span>
                </span>
              )}
              <span className="text-[10px] text-zinc-500 font-mono block -mt-0.5">
                Dynamic Catalog & Operations Control
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Link
              href="/"
              className="text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800/80 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700/60 transition shadow-xs"
            >
              <span>View Customer Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-5 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              <span>Total Revenue</span>
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-[#d4ff00]" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-black text-zinc-950 dark:text-white">
              {formatPrice(totalRevenue)}
            </div>
            <div className="text-[11px] text-zinc-500">From verified Cash on Delivery</div>
          </div>

          <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-5 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              <span>Pending COD Calls</span>
              <PhoneCall className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-black text-amber-600 dark:text-amber-400">
              {pendingOrders}
            </div>
            <div className="text-[11px] text-zinc-500">Requires phone confirmation</div>
          </div>

          <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-5 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              <span>Dynamic Categories</span>
              <FolderPlus className="w-4 h-4 text-sky-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-black text-zinc-950 dark:text-white">
              {categories.length}
            </div>
            <div className="text-[11px] text-zinc-500">{colors.length} Color Swatches • {sizes.length} Sizes</div>
          </div>

          <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-5 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              <span>Total Units in Stock</span>
              <Package className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-black text-zinc-950 dark:text-white">
              {totalStockCount}
            </div>
            <div className="text-[11px] text-zinc-500">{products.length} live catalog silhouettes</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-900 pb-2 text-sm font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab("inventory")}
            className={`px-4 py-2 rounded-xl transition whitespace-nowrap ${
              activeTab === "inventory"
                ? "bg-zinc-950 text-white dark:bg-[#d4ff00] dark:text-black font-black shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            }`}
          >
            Product Catalog ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("attributes")}
            className={`px-4 py-2 rounded-xl transition whitespace-nowrap ${
              activeTab === "attributes"
                ? "bg-zinc-950 text-white dark:bg-[#d4ff00] dark:text-black font-black shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            }`}
          >
            Categories, Colors & Sizes
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-xl transition whitespace-nowrap ${
              activeTab === "orders"
                ? "bg-zinc-950 text-white dark:bg-[#d4ff00] dark:text-black font-black shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            }`}
          >
            Orders & COD Verification ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("branding")}
            className={`px-4 py-2 rounded-xl transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === "branding"
                ? "bg-zinc-950 text-white dark:bg-[#d4ff00] dark:text-black font-black shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Store Logo & Branding</span>
            {customLogoUrl && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" title="Custom Logo Active" />
            )}
          </button>
        </div>

        {/* TAB 1: PRODUCT CATALOG & INVENTORY */}
        {activeTab === "inventory" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white dark:bg-zinc-900/30 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="font-bold text-sm text-zinc-950 dark:text-white">Active Product Matrix</h3>
                  <span className="bg-[#d4ff00]/20 text-[#698500] dark:text-[#d4ff00] border border-[#d4ff00]/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                    <Star className="w-3 h-3 fill-current" />
                    {products.filter((p) => p.isFeatured).length} in Hero Slider
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Click the Star (⭐) on any product to feature it in the rotating Homepage Hero Lookbook Slider.
                </p>
              </div>
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="bg-[#d4ff00] hover:bg-[#c2ea00] text-black font-black text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md shadow-[#d4ff00]/20 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product Silhouette</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-20 rounded-xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative flex-shrink-0 border border-zinc-200 dark:border-zinc-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                      {product.images.length > 1 && (
                        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-mono font-bold px-1 rounded">
                          +{product.images.length - 1}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-zinc-900 dark:text-[#d4ff00] uppercase font-bold">
                          {product.category} • {product.fit}
                        </span>
                        <span className="text-zinc-400">•</span>
                        <span className="text-zinc-600 dark:text-zinc-400">{product.gender}</span>
                      </div>
                      <h4 className="font-bold text-zinc-950 dark:text-white text-sm">{product.title}</h4>
                      
                      {/* Colors with HEX swatch preview */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase">Colors:</span>
                        <div className="flex items-center gap-1.5">
                          {product.colors.map((c) => (
                            <span
                              key={c.name}
                              title={`${c.name} (${c.hex})`}
                              className="w-4 h-4 rounded-full border border-black/30 shadow-xs inline-block"
                              style={{ backgroundColor: c.hex }}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-mono text-zinc-500 ml-2">
                          Price: {formatPrice(product.salePrice ?? product.basePrice)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Size Stock Controls & Actions */}
                  <div className="flex flex-wrap items-center gap-3">
                    {product.sizes.map((s) => (
                      <div
                        key={s.size}
                        className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1.5 rounded-xl text-center shadow-xs"
                      >
                        <div className="text-[10px] text-zinc-500 font-bold uppercase font-mono">
                          {s.size}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => updateStock(product.id, s.size, -1)}
                            className="w-5 h-5 rounded bg-zinc-200 dark:bg-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-bold flex items-center justify-center text-xs"
                          >
                            -
                          </button>
                          <span
                            className={`font-mono text-xs font-bold ${
                              s.stock === 0
                                ? "text-red-500 line-through"
                                : s.stock <= 2
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-zinc-950 dark:text-white"
                            }`}
                          >
                            {s.stock}
                          </span>
                          <button
                            onClick={() => updateStock(product.id, s.size, 1)}
                            className="w-5 h-5 rounded bg-zinc-200 dark:bg-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-bold flex items-center justify-center text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center gap-2 pl-2 border-l border-zinc-200 dark:border-zinc-800">
                      {/* Hero Slider Feature Toggle Button */}
                      <button
                        type="button"
                        onClick={() => {
                          toggleFeaturedProduct(product.id);
                          triggerToast(
                            product.isFeatured
                              ? `"${product.title}" removed from Hero Slider`
                              : `"${product.title}" added to Hero Slider!`
                          );
                        }}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition shadow-xs ${
                          product.isFeatured
                            ? "bg-[#d4ff00] text-black border border-black/20 font-black shadow-[#d4ff00]/20"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-black dark:hover:text-white border border-zinc-200 dark:border-zinc-700"
                        }`}
                        title={product.isFeatured ? "Remove from Hero Slider" : "Add to Homepage Hero Slider"}
                      >
                        <Star className={`w-3.5 h-3.5 ${product.isFeatured ? "fill-black text-black" : "text-zinc-400"}`} />
                        <span className="hidden sm:inline">
                          {product.isFeatured ? "Hero Active" : "Add to Hero"}
                        </span>
                      </button>

                      <Link
                        href={`/product/${product.slug}`}
                        className="p-2 text-zinc-500 hover:text-black dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                        title="View Live PDP"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setProductToDelete(product)}
                        className="p-2 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: DYNAMIC ATTRIBUTES (CATEGORIES, SIZES, COLORS WITH HEX CODE) */}
        {activeTab === "attributes" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 1. Dynamic Categories Card */}
            <div className="bg-white dark:bg-zinc-900/30 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <FolderPlus className="w-4 h-4 text-sky-500" />
                  <h3 className="font-bold text-sm text-zinc-950 dark:text-white uppercase tracking-wider">
                    Categories ({categories.length})
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddCategoryOpen(true)}
                  className="bg-zinc-900 dark:bg-zinc-800 hover:bg-black text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {categories.map((cat) => {
                  const assignedCount = products.filter(
                    (p) => p.category.toLowerCase() === cat.name.toLowerCase()
                  ).length;
                  return (
                    <div
                      key={cat.id}
                      className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between group hover:border-zinc-400 dark:hover:border-zinc-700 transition"
                    >
                      <div>
                        <div className="font-bold text-xs text-zinc-900 dark:text-white">{cat.name}</div>
                        <div className="text-[11px] font-mono text-zinc-500">{cat.slug}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 font-bold px-2 py-0.5 rounded-full">
                          {assignedCount} items
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            if (assignedCount > 0) {
                              alert(`Cannot delete "${cat.name}" because ${assignedCount} product(s) are assigned to it. Please delete or reassign those products first.`);
                              return;
                            }
                            deleteCategory(cat.id);
                            triggerToast(`Category "${cat.name}" deleted successfully!`);
                          }}
                          className="p-1.5 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                          title={`Delete Category "${cat.name}"`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Dynamic Colors with HEX Code */}
            <div className="bg-white dark:bg-zinc-900/30 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-emerald-500" />
                  <h3 className="font-bold text-sm text-zinc-950 dark:text-white uppercase tracking-wider">
                    Colors & HEX Codes ({colors.length})
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddColorOpen(true)}
                  className="bg-zinc-900 dark:bg-zinc-800 hover:bg-black text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Color
                </button>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {colors.map((color) => (
                  <div
                    key={color.name}
                    className="p-2.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between group hover:border-zinc-400 dark:hover:border-zinc-700 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-6 h-6 rounded-lg border border-black/20 shadow-xs inline-block shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div>
                        <div className="font-bold text-xs text-zinc-900 dark:text-white">{color.name}</div>
                        <div className="font-mono text-[10px] text-zinc-500">{color.hex}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="font-mono text-[10px] px-2 py-0.5 rounded font-bold"
                        style={{
                          backgroundColor: `${color.hex}22`,
                          color: color.hex === "#FFFFFF" || color.hex === "#F4F3EF" ? "#111" : color.hex,
                        }}
                      >
                        {color.hex}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          deleteColor(color.name);
                          triggerToast(`Color "${color.name}" deleted!`);
                        }}
                        className="p-1.5 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                        title={`Delete color "${color.name}"`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Dynamic Sizes Card */}
            <div className="bg-white dark:bg-zinc-900/30 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[#7ba000] dark:text-[#d4ff00]" />
                  <h3 className="font-bold text-sm text-zinc-950 dark:text-white uppercase tracking-wider">
                    Garment Sizes ({sizes.length})
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddSizeOpen(true)}
                  className="bg-zinc-900 dark:bg-zinc-800 hover:bg-black text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Size
                </button>
              </div>

              <div className="flex flex-wrap gap-2 max-h-96 overflow-y-auto pr-1">
                {sizes.map((sz) => (
                  <div
                    key={sz}
                    className="flex items-center gap-2 pl-3 pr-1.5 py-1.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono font-bold text-xs text-zinc-900 dark:text-white shadow-xs group hover:border-zinc-400 dark:hover:border-zinc-700 transition"
                  >
                    <span>{sz}</span>
                    <button
                      type="button"
                      onClick={() => {
                        deleteSize(sz);
                        triggerToast(`Size "${sz}" removed!`);
                      }}
                      className="p-1 rounded-md text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                      title={`Delete size ${sz}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-zinc-900/30 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search order number or customer phone..."
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-black dark:focus:border-[#d4ff00]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                {["ALL", "PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
                      orderFilter === st
                        ? "bg-zinc-950 text-white dark:bg-white dark:text-black shadow-xs"
                        : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 shadow-xs">
              <table className="w-full text-xs text-left">
                <thead className="bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Order ID & Date</th>
                    <th className="py-3 px-4">Customer & Phone</th>
                    <th className="py-3 px-4">Delivery Zone & Address</th>
                    <th className="py-3 px-4">Items Ordered</th>
                    <th className="py-3 px-4">Payable (৳)</th>
                    <th className="py-3 px-4">COD Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/80">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition">
                        <td className="py-4 px-4 font-mono">
                          <div className="font-bold text-zinc-950 dark:text-white text-sm">{order.orderNumber}</div>
                          <div className="text-[10px] text-zinc-500">
                            {new Date(order.createdAt).toLocaleDateString("en-BD", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-bold text-zinc-950 dark:text-white">{order.customerName}</div>
                          <a
                            href={`tel:${order.customerPhone}`}
                            className="text-zinc-950 dark:text-[#d4ff00] font-mono hover:underline flex items-center gap-1 mt-0.5 font-bold"
                          >
                            <PhoneCall className="w-3 h-3 text-[#a4cc00] dark:text-[#d4ff00]" />
                            <span>{order.customerPhone}</span>
                          </a>
                        </td>

                        <td className="py-4 px-4 max-w-xs">
                          <div className="font-semibold text-zinc-800 dark:text-zinc-300">
                            {order.deliveryZone === "INSIDE_DHAKA" ? "Inside Dhaka (৳80)" : "Outside Dhaka (৳150)"}
                          </div>
                          <div className="text-[11px] text-zinc-500 truncate" title={order.shippingAddress}>
                            {order.shippingAddress}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            {order.items.map((it, idx) => (
                              <div key={idx} className="text-zinc-700 dark:text-zinc-300 text-[11px]">
                                <strong>{it.quantity}x</strong> {it.title} ({it.size}, {it.color})
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="py-4 px-4 font-mono font-bold text-sm text-zinc-950 dark:text-white">
                          {formatPrice(order.totalAmount)}
                        </td>

                        <td className="py-4 px-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                              order.orderStatus === "CONFIRMED"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30"
                                : order.orderStatus === "PENDING"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30"
                                : order.orderStatus === "SHIPPED"
                                ? "bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-400 border border-sky-300 dark:border-sky-500/30"
                                : order.orderStatus === "DELIVERED"
                                ? "bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-400 border border-purple-300 dark:border-purple-500/30"
                                : "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400 border border-red-300 dark:border-red-500/30"
                            }`}
                          >
                            {order.orderStatus}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {order.orderStatus === "PENDING" && (
                              <button
                                onClick={() => updateOrderStatus(order.id, "CONFIRMED")}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] px-2.5 py-1.5 rounded-lg transition shadow-xs"
                                title="Mark as phone verified"
                              >
                                Confirm Call
                              </button>
                            )}
                            {order.orderStatus === "CONFIRMED" && (
                              <button
                                onClick={() => updateOrderStatus(order.id, "SHIPPED")}
                                className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-[10px] px-2.5 py-1.5 rounded-lg transition shadow-xs"
                                title="Hand over to courier"
                              >
                                Dispatch
                              </button>
                            )}
                            {order.orderStatus === "SHIPPED" && (
                              <button
                                onClick={() => updateOrderStatus(order.id, "DELIVERED")}
                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-[10px] px-2.5 py-1.5 rounded-lg transition shadow-xs"
                                title="Cash collected"
                              >
                                Delivered
                              </button>
                            )}
                            {order.orderStatus !== "CANCELLED" && order.orderStatus !== "DELIVERED" && (
                              <button
                                onClick={() => updateOrderStatus(order.id, "CANCELLED")}
                                className="text-zinc-400 hover:text-red-600 p-1"
                                title="Cancel order"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-zinc-500">
                        No orders match the selected criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: STORE LOGO & BRANDING */}
        {activeTab === "branding" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-zinc-900 via-zinc-950 to-black text-white p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4ff00]/20 text-[#d4ff00] text-[11px] font-extrabold uppercase tracking-wider border border-[#d4ff00]/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  Brand Identity Management
                </div>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                  Store Logo & Visual Identity
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Upload your custom brand logo to automatically replace the default logo across the entire site — including the 2-Tier Sticky Navbar, Mobile Navigation Drawer, Customer Footer, and Admin Portal.
                </p>
              </div>
              <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-10 pointer-events-none">
                <Sparkles className="w-72 h-72 text-white" />
              </div>
            </div>

            {/* Main 2-Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* LEFT: Upload & Management Controls (5 cols) */}
              <div className="lg:col-span-5 space-y-5">
                
                {/* Card: File Upload */}
                <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
                        Upload Logo File
                      </h3>
                      <p className="text-[11px] text-zinc-500">From your computer or phone</p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-bold">
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

                  {/* Drag & Drop / Click Zone */}
                  <div
                    onClick={() => !isLogoUploading && logoFileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-3 ${
                      isLogoUploading
                        ? "border-zinc-400 bg-zinc-100 dark:bg-zinc-800/40 cursor-wait"
                        : "border-zinc-300 dark:border-zinc-700 hover:border-[#d4ff00] hover:bg-[#d4ff00]/5 dark:hover:bg-[#d4ff00]/10"
                    }`}
                  >
                    {isLogoUploading ? (
                      <>
                        <Loader2 className="w-10 h-10 text-[#d4ff00] animate-spin" />
                        <div className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                          Uploading logo to server...
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300 group-hover:scale-105 transition">
                          <UploadCloud className="w-7 h-7 text-[#8bb800] dark:text-[#d4ff00]" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-zinc-950 dark:text-white">
                            Click to browse or drop brand logo here
                          </div>
                          <div className="text-[11px] text-zinc-400 mt-1">
                            Transparent PNG or SVG with light/white lettering recommended
                          </div>
                        </div>
                        <button
                          type="button"
                          className="bg-zinc-950 text-white dark:bg-white dark:text-black font-bold text-[11px] px-4 py-2 rounded-xl uppercase tracking-wider hover:opacity-90 transition shadow-xs pointer-events-none"
                        >
                          Choose File
                        </button>
                      </>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-3 text-[11px] text-zinc-400">
                    <span className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
                    <span>OR PASTE IMAGE URL</span>
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
                        className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-black dark:focus:border-[#d4ff00]"
                      />
                      <button
                        type="button"
                        onClick={handleApplyLogoUrl}
                        disabled={!logoInputUrl.trim()}
                        className="px-4 py-2 bg-zinc-900 text-white dark:bg-[#d4ff00] dark:text-black font-bold text-xs rounded-xl disabled:opacity-40 transition whitespace-nowrap shadow-xs"
                      >
                        Apply URL
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <p className="text-[10px] text-zinc-400">
                        Host your logo on Cloudinary, Imgur, or direct CDN links.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          updateLogo("/uploads/dhakaiya-brand-logo.svg");
                          triggerToast("Applied official SVG vector brand logo!");
                        }}
                        className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white border border-zinc-200 dark:border-zinc-700 transition flex items-center gap-1 shadow-2xs"
                      >
                        <Sparkles className="w-3 h-3 text-[#a4cc00] dark:text-[#d4ff00]" />
                        <span>Use Official Vector Logo</span>
                      </button>
                    </div>
                  </div>

                  {/* Action: Reset to default */}
                  <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                    <div className="text-xs text-zinc-500 font-medium">
                      Status: {customLogoUrl ? "Custom logo active" : "Default text logo active"}
                    </div>
                    {customLogoUrl && (
                      <button
                        type="button"
                        onClick={handleResetLogo}
                        className="text-xs font-bold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1.5 transition"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset to Default Logo</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Specifications Guide Card */}
                <div className="bg-zinc-100/70 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                  <h4 className="font-bold text-zinc-950 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#8bb800] dark:text-[#d4ff00]" />
                    Logo Best Practices
                  </h4>
                  <ul className="space-y-1.5 text-[11px] list-disc list-inside">
                    <li><strong>Background:</strong> Use a transparent PNG or SVG for clean integration.</li>
                    <li><strong>Color:</strong> Since the Navbar is deep pitch black (`#09090b`), light or neon/white text logos look best.</li>
                    <li><strong>Height:</strong> Recommended logo height is 36px to 60px (auto-scaled by system).</li>
                    <li><strong>Aspect Ratio:</strong> Horizontal wide logos (3:1 or 4:1) fit best in standard ASOS-style navigation bars.</li>
                  </ul>
                </div>

              </div>

              {/* RIGHT: Live Storefront Previews (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* Live Preview Card */}
                <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white flex items-center gap-2">
                        <span>Real-Time Storefront Previews</span>
                        {customLogoUrl ? (
                          <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                            Custom Logo Active
                          </span>
                        ) : (
                          <span className="bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Default Text Logo Active
                          </span>
                        )}
                      </h3>
                      <p className="text-[11px] text-zinc-500">See how your logo renders on customer-facing screens</p>
                    </div>

                    <Link
                      href="/"
                      target="_blank"
                      className="text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 transition"
                    >
                      <span>View Storefront</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* PREVIEW 1: Sticky Navbar on Dark Background (Primary Store Look) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      <span>Preview 1: Dark Sticky Navbar (Main Store Header)</span>
                      <span className="text-[10px] text-zinc-400 font-mono">bg-zinc-950</span>
                    </div>
                    
                    <div className="bg-zinc-950 rounded-2xl p-4 border border-zinc-800 shadow-md">
                      <div className="flex items-center justify-between gap-3">
                        {/* Logo Section */}
                        <div className="shrink-0 flex items-center">
                          {customLogoUrl && !adminLogoLoadError ? (
                            <img
                              src={customLogoUrl}
                              alt="Dhakaiya Dripz Logo"
                              onError={() => setAdminLogoLoadError(true)}
                              className="h-9 w-auto max-w-[170px] object-contain"
                            />
                          ) : (
                            <span className="font-black text-xl tracking-tighter text-white uppercase">
                              DHAKAIYA<span className="text-[#d4ff00]">DRIPZ</span>
                            </span>
                          )}
                        </div>

                        {/* Simulated Gender Tabs */}
                        <div className="hidden sm:flex items-center space-x-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                          <span className="text-white border-b-2 border-white pb-0.5">MEN</span>
                          <span>WOMEN</span>
                          <span>UNISEX</span>
                        </div>

                        {/* Simulated Search bar */}
                        <div className="flex-1 max-w-xs hidden md:block">
                          <div className="h-8 bg-white rounded-full px-3 flex items-center text-xs text-zinc-400">
                            <Search className="w-3.5 h-3.5 mr-2 text-zinc-500" />
                            <span>Search items...</span>
                          </div>
                        </div>

                        {/* Simulated Icons */}
                        <div className="flex items-center space-x-2 text-zinc-300">
                          <Heart className="w-4 h-4" />
                          <ShoppingBag className="w-4 h-4 text-[#d4ff00]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PREVIEW 2: Light Background Preview */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      <span>Preview 2: Light Background Contrast Check</span>
                      <span className="text-[10px] text-zinc-400 font-mono">bg-white</span>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-4 border border-zinc-300 shadow-xs flex items-center justify-between">
                      <div className="shrink-0 flex items-center">
                        {customLogoUrl && !adminLogoLoadError ? (
                          <img
                            src={customLogoUrl}
                            alt="Dhakaiya Dripz Logo"
                            onError={() => setAdminLogoLoadError(true)}
                            className="h-9 w-auto max-w-[170px] object-contain"
                          />
                        ) : (
                          <span className="font-black text-xl tracking-tighter text-zinc-950 uppercase">
                            DHAKAIYA<span className="text-[#a4cc00]">DRIPZ</span>
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-zinc-500 font-medium">
                        Verify transparency & visibility on white
                      </div>
                    </div>
                  </div>

                  {/* PREVIEW 3: Footer Brand Column Preview */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      <span>Preview 3: Storefront Footer Preview</span>
                      <span className="text-[10px] text-zinc-400 font-mono">Footer Column</span>
                    </div>
                    
                    <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800 space-y-2">
                      <div className="shrink-0 flex items-center">
                        {customLogoUrl && !adminLogoLoadError ? (
                          <img
                            src={customLogoUrl}
                            alt="Dhakaiya Dripz Logo"
                            onError={() => setAdminLogoLoadError(true)}
                            className="h-8 w-auto max-w-[160px] object-contain"
                          />
                        ) : (
                          <span className="font-black text-lg tracking-tighter text-zinc-950 dark:text-white uppercase">
                            DHAKAIYA<span className="text-[#a4cc00] dark:text-[#d4ff00]">DRIPZ</span>
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-500 max-w-md leading-relaxed">
                        Elevating Dhaka urban subculture through high-density heavyweight fabrics, architectural tailoring, and functional streetwear silhouettes.
                      </p>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* MODAL 1: ADD NEW CATEGORY                                                 */}
      {/* ========================================================================= */}
      {isAddCategoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl text-zinc-900 dark:text-white space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="font-bold text-base uppercase">Add New Category</h3>
              <button onClick={() => setIsAddCategoryOpen(false)}><X className="w-5 h-5 text-zinc-400" /></button>
            </div>
            <form onSubmit={handleSaveCategory} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Denim Jackets, Caps & Beanies"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-[#d4ff00]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Description</label>
                <input
                  type="text"
                  placeholder="Short tagline or silhouette summary"
                  value={catDesc}
                  onChange={(e) => setCatDesc(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-[#d4ff00]"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCategoryOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-black bg-[#d4ff00] text-black uppercase"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADD NEW COLOR WITH COLOR CODE (HEX PICKER & PREVIEW)              */}
      {/* ========================================================================= */}
      {isAddColorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl text-zinc-900 dark:text-white space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-emerald-500" />
                <h3 className="font-bold text-base uppercase">Add Color with HEX Code</h3>
              </div>
              <button onClick={() => setIsAddColorOpen(false)}><X className="w-5 h-5 text-zinc-400" /></button>
            </div>
            
            <form onSubmit={handleSaveColor} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Color Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Electric Cobalt, Crimson Red, Neon Lime"
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-[#d4ff00]"
                />
              </div>

              {/* Color Code Picker and Preview */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Pick Color & Enter HEX Code *
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={colorHex}
                    onChange={(e) => setColorHex(e.target.value.toUpperCase())}
                    className="w-12 h-12 rounded-xl cursor-pointer border border-zinc-300 dark:border-zinc-700 p-1 bg-transparent"
                  />

                  <div className="flex-1">
                    <input
                      type="text"
                      required
                      placeholder="#111111"
                      value={colorHex}
                      onChange={(e) => setColorHex(e.target.value.toUpperCase())}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 font-mono text-sm font-bold text-zinc-900 dark:text-white uppercase focus:outline-none focus:border-black dark:focus:border-[#d4ff00]"
                    />
                  </div>

                  <div
                    className="w-12 h-12 rounded-xl border border-black/30 shadow-md flex items-center justify-center"
                    style={{ backgroundColor: colorHex }}
                    title={`Preview: ${colorHex}`}
                  >
                    <Check className="w-5 h-5 text-white drop-shadow-md" />
                  </div>
                </div>
              </div>

              {/* Streetwear preset color pills */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                  Quick Streetwear Presets:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { name: "Obsidian", hex: "#0B0C10" },
                    { name: "Acid Lime", hex: "#D4FF00" },
                    { name: "Cement", hex: "#8D99AE" },
                    { name: "Army Olive", hex: "#4A5320" },
                    { name: "Deep Navy", hex: "#001F54" },
                    { name: "Rust Orange", hex: "#D84A1B" },
                    { name: "Chalk", hex: "#F8F9FA" },
                  ].map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => {
                        setColorHex(p.hex);
                        if (!colorName) setColorName(p.name);
                      }}
                      className="flex items-center gap-1.5 px-2 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-[10px] font-mono text-zinc-700 dark:text-zinc-300 hover:border-black dark:hover:border-white transition"
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.hex }} />
                      <span>{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddColorOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-black bg-[#d4ff00] text-black uppercase"
                >
                  Save Color Swatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ADD NEW SIZE                                                     */}
      {/* ========================================================================= */}
      {isAddSizeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl text-zinc-900 dark:text-white space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="font-bold text-base uppercase">Add New Size</h3>
              <button onClick={() => setIsAddSizeOpen(false)}><X className="w-5 h-5 text-zinc-400" /></button>
            </div>
            <form onSubmit={handleSaveSize} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Size Metric *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. XXL, 38, 40, FREE SIZE, 26"
                  value={newSizeName}
                  onChange={(e) => setNewSizeName(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-zinc-900 dark:text-white uppercase focus:outline-none focus:border-black dark:focus:border-[#d4ff00]"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddSizeOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-black bg-[#d4ff00] text-black uppercase"
                >
                  Save Size
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: FULL DYNAMIC PRODUCT CREATION FORM WITH MULTIPLE IMAGES UPLOAD    */}
      {/* ========================================================================= */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl text-zinc-900 dark:text-white overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* Pinned Sticky Header */}
            <div className="shrink-0 flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm z-20">
              <div>
                <span className="text-[10px] font-mono text-[#7ba000] dark:text-[#d4ff00] uppercase font-bold tracking-widest">
                  Catalog Engine • Dhakaiya Dripz
                </span>
                <h3 className="font-black text-lg sm:text-xl uppercase tracking-tight text-zinc-950 dark:text-white">
                  Add New Product Silhouette
                </h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsAddProductOpen(false)} 
                className="p-2 text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Container */}
            <form onSubmit={handleSaveProduct} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              
              {/* Row 1: Title, Category, Gender, Fit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Heavyweight Cyber Cargo Pant"
                    value={prodTitle}
                    onChange={(e) => setProdTitle(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs font-bold text-zinc-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-[#d4ff00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Dynamic Category</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs font-bold text-zinc-900 dark:text-white focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Gender</label>
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
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Base Price (৳ BDT) *</label>
                  <input
                    type="number"
                    required
                    value={prodBasePrice}
                    onChange={(e) => setProdBasePrice(Number(e.target.value))}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-zinc-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-[#d4ff00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Sale Price (Optional ৳)</label>
                  <input
                    type="number"
                    placeholder="e.g. 1950 (leave empty if regular)"
                    value={prodSalePrice}
                    onChange={(e) => setProdSalePrice(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-zinc-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-[#d4ff00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Structural Fit</label>
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

              {/* ======================================================== */}
              {/* ROW 3: MULTIPLE IMAGES UPLOAD SYSTEM                      */}
              {/* ======================================================== */}
              <div className="p-4 sm:p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#7ba000] dark:text-[#d4ff00]" />
                      <span>Multiple Product Gallery Images ({prodImages.length})</span>
                    </h4>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      First image is the Primary Cover photo. The second is the hover flip photo.
                    </p>
                  </div>
                </div>

                {/* Upload Dropzone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleFilesSelected(e.dataTransfer.files);
                  }}
                  className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-[#d4ff00] rounded-2xl p-6 text-center cursor-pointer transition bg-white dark:bg-zinc-950 flex flex-col items-center justify-center space-y-2 group"
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
                      <Loader2 className="w-5 h-5 animate-spin text-[#d4ff00]" />
                      <span>Uploading to local storage...</span>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition">
                        <UploadCloud className="w-6 h-6 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-[#d4ff00]" />
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
                              ? "border-black dark:border-[#d4ff00] ring-2 ring-black/10 dark:ring-[#d4ff00]/20"
                              : "border-zinc-200 dark:border-zinc-800"
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={imgUrl}
                            alt={`Uploaded photo ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />

                          {/* Cover badge */}
                          {idx === 0 ? (
                            <span className="absolute top-1 left-1 bg-black dark:bg-[#d4ff00] text-white dark:text-black font-extrabold text-[9px] px-1.5 py-0.5 rounded shadow-xs uppercase">
                              Cover
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSetCover(idx)}
                              title="Set as Cover Image"
                              className="absolute top-1 left-1 bg-black/75 text-white hover:text-[#d4ff00] p-1 rounded opacity-0 group-hover:opacity-100 transition"
                            >
                              <Star className="w-3 h-3" />
                            </button>
                          )}

                          {/* Delete button */}
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

                {/* Optional Manual URL Link */}
                <div className="flex items-center gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <span className="text-[11px] font-bold text-zinc-500 whitespace-nowrap">Or paste external URL:</span>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
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
                  <Film className="w-4 h-4 text-[#7ba000] dark:text-[#d4ff00]" />
                  <span>Catwalk Video MP4 URL (Optional for Runway Simulation)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://commondatastorage.googleapis.com/.../catwalk.mp4"
                  value={prodCatwalkVideo}
                  onChange={(e) => setProdCatwalkVideo(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none"
                />
              </div>

              {/* Feature in Homepage Hero Slider Checkbox */}
              <label className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-black dark:hover:border-[#d4ff00] transition">
                <input
                  type="checkbox"
                  checked={prodIsFeatured}
                  onChange={(e) => setProdIsFeatured(e.target.checked)}
                  className="w-4 h-4 accent-[#d4ff00] rounded cursor-pointer"
                />
                <div>
                  <span className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-[#d4ff00] fill-current" />
                    Feature in Homepage Hero Lookbook Slider
                  </span>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Checking this automatically adds this product to the rotating Hero Slider showcase on the store homepage.
                  </p>
                </div>
              </label>

              {/* Row 4: Dynamic Colors Selection (With Color Hex Swatches) */}
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Select Garment Colors (With Live HEX Swatches):</span>
                  <span className="text-zinc-500 font-normal">Click swatches to attach to product</span>
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
                            ? "border-black dark:border-[#d4ff00] bg-white dark:bg-zinc-800 shadow-xs font-bold"
                            : "border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/30 shadow-xs"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                        <span className="font-mono text-[10px] text-zinc-400">({c.hex})</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-black dark:text-[#d4ff00]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 5: Dynamic Sizes & Stock Matrix */}
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
                            ? "border-black dark:border-[#d4ff00] bg-zinc-950 text-white dark:bg-[#d4ff00] dark:text-black shadow-xs"
                            : "border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>

                {/* Stock allocation inputs for active sizes */}
                {selectedProdSizes.length > 0 && (
                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {selectedProdSizes.map((s) => (
                      <div key={s.size} className="bg-white dark:bg-zinc-950 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
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

              {/* Pinned Sticky Footer */}
              <div className="shrink-0 px-6 py-4 sm:px-8 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/95 dark:bg-zinc-900/95 backdrop-blur-sm flex items-center justify-between gap-3 z-20">
                <div className="text-[11px] text-zinc-500 font-mono hidden sm:block">
                  {prodImages.length} image(s) attached • {selectedProdSizes.length} sizes configured
                </div>
                <div className="flex items-center gap-2.5 ml-auto">
                  <button
                    type="button"
                    onClick={() => setIsAddProductOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="px-7 py-2.5 rounded-xl text-xs font-black bg-[#d4ff00] hover:bg-[#c2ea00] disabled:opacity-50 text-black uppercase tracking-wider shadow-lg shadow-[#d4ff00]/20 transition flex items-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <span>Create & Publish Product</span>
                    )}
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: CONFIRM DELETE PRODUCT MODAL (Replaces browser confirm)           */}
      {/* ========================================================================= */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-2xl text-zinc-900 dark:text-white space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/50 flex items-center justify-center text-red-600">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-black text-lg uppercase tracking-tight text-zinc-950 dark:text-white">
                Delete Product Silhouette?
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Are you sure you want to delete <span className="font-bold text-zinc-900 dark:text-white">&quot;{productToDelete.title}&quot;</span>? This action is permanent and will remove the item from your store catalog and database.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition flex items-center gap-1.5 shadow-lg shadow-red-600/20"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modern Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 border border-zinc-800 dark:border-zinc-200">
          <Check className="w-4 h-4 text-[#d4ff00] dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
