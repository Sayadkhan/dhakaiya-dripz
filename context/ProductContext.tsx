"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { INITIAL_PRODUCTS, ProductItem } from "@/lib/mock-data";

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface ColorItem {
  name: string;
  hex: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  whatsapp?: string;
  youtube?: string;
  twitter?: string;
  messenger?: string;
}

export interface StoreSettings {
  logoUrl: string | null;
  deliveryInsideDhaka: number;
  deliveryOutsideDhaka: number;
  freeShippingThreshold: number;
  socialLinks: SocialLinks;
  phone?: string;
  email?: string;
  address?: string;
  adminUsername?: string;
  adminPassword?: string;
  updatedAt?: string;
}

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  logoUrl: "/uploads/drip-062eabdb-e093-4aef-8-1790770654393-4474.png",
  deliveryInsideDhaka: 80,
  deliveryOutsideDhaka: 150,
  freeShippingThreshold: 3000,
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    whatsapp: "https://wa.me/8801799445851",
    youtube: "",
    twitter: "",
  },
  phone: "+880 1799-445851",
  email: "support@dhakaiyadripz.com",
  address: "Gulshan 1 / Banani Hub, Dhaka, Bangladesh",
  adminUsername: "admin",
  adminPassword: "admin",
};

interface ProductContextType {
  products: ProductItem[];
  categories: CategoryItem[];
  sizes: string[];
  colors: ColorItem[];
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => Promise<void>;
  updateDeliveryCharges: (inside: number, outside: number, threshold?: number) => Promise<void>;
  updateSocialLinks: (links: SocialLinks) => Promise<void>;
  updateContactInfo: (contact: { phone?: string; email?: string; address?: string }) => Promise<void>;
  addProduct: (product: ProductItem) => void;
  updateProduct: (product: ProductItem) => void;
  deleteProduct: (id: string) => void;
  updateStock: (productId: string, size: string, delta: number) => void;
  addCategory: (name: string, description?: string, image?: string) => void;
  updateCategory: (category: CategoryItem) => void;
  deleteCategory: (id: string) => void;
  addColor: (name: string, hex: string) => void;
  deleteColor: (name: string) => void;
  addSize: (size: string) => void;
  deleteSize: (size: string) => void;
  toggleFeaturedProduct: (productId: string) => void;
  customLogoUrl: string | null;
  updateLogo: (url: string | null) => void;
  getProductBySlug: (slug: string) => ProductItem | undefined;
  isLoaded: boolean;
}

const DEFAULT_CATEGORIES: CategoryItem[] = [
  {
    id: "cat-1",
    name: "Pants",
    slug: "Pants",
    description: "Tactical twill trousers & parachute cargos",
  },
  {
    id: "cat-2",
    name: "Oversized Tees",
    slug: "Oversized-Tees",
    description: "Heavyweight 260GSM combed boxy tees",
  },
  {
    id: "cat-3",
    name: "Shirts",
    slug: "Shirts",
    description: "Raw-edge Cuban camp collar shirts",
  },
  {
    id: "cat-4",
    name: "Jackets & Hoodies",
    slug: "Jackets-&-Hoodies",
    description: "Distressed acid-wash French Terry",
  },
  {
    id: "cat-5",
    name: "Accessories",
    slug: "Accessories",
    description: "Tactical cross-body rigs & belts",
  },
];

const DEFAULT_COLORS: ColorItem[] = [
  { name: "Pitch Black", hex: "#0A0E17" },
  { name: "Cyber Cyan", hex: "#00A3FF" },
  { name: "Electric Blue", hex: "#0066FF" },
  { name: "Ice Blue", hex: "#38BDF8" },
  { name: "Chalk Off-White", hex: "#F4F3EF" },
  { name: "Battleship Grey", hex: "#4A4D4F" },
  { name: "Mineral Charcoal", hex: "#2B2D2F" },
  { name: "Washed Sage", hex: "#7D8C7C" },
  { name: "Cement Grey", hex: "#7E827A" },
  { name: "Ecru Linen", hex: "#E3DAC9" },
];

const DEFAULT_SIZES = ["S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "ONE SIZE"];

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Helper to identify and purge legacy dummy/mock products
const isDummyProduct = (p: ProductItem) => {
  if (!p || !p.id) return true;
  const isOldMockId = /^prod-[1-8]$/.test(p.id) || p.id.startsWith("mock-");
  const hasMockUnsplash = Array.isArray(p.images) && p.images.some(
    (img) =>
      img.includes("images.unsplash.com/photo-1624378439575") ||
      img.includes("images.unsplash.com/photo-1521572267360") ||
      img.includes("images.unsplash.com/photo-1517445312882") ||
      img.includes("images.unsplash.com/photo-1596755094514") ||
      img.includes("images.unsplash.com/photo-1556905055") ||
      img.includes("images.unsplash.com/photo-1553062407")
  );
  return isOldMockId || hasMockUnsplash;
};

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<CategoryItem[]>(DEFAULT_CATEGORIES);
  const [colors, setColors] = useState<ColorItem[]>(DEFAULT_COLORS);
  const [sizes, setSizes] = useState<string[]>(DEFAULT_SIZES);
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(
    DEFAULT_STORE_SETTINGS.logoUrl
  );
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved state from localStorage and sanitize out any legacy dummy data
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem("dhakaiya_dyn_products");
      if (savedProducts) {
        const parsed: ProductItem[] = JSON.parse(savedProducts);
        const cleanProducts = parsed.filter((p) => !isDummyProduct(p));
        setProducts(cleanProducts);
        localStorage.setItem("dhakaiya_dyn_products", JSON.stringify(cleanProducts));
      } else {
        setProducts([]);
      }

      const savedCategories = localStorage.getItem("dhakaiya_dyn_categories");
      if (savedCategories) {
        const parsed: CategoryItem[] = JSON.parse(savedCategories);
        // Cleanse legacy unsplash images from categories so user has clean slate
        const cleansed = parsed.map((cat) => {
          if (cat.image && cat.image.includes("images.unsplash.com/photo-")) {
            return { ...cat, image: undefined };
          }
          return cat;
        });
        setCategories(cleansed);
        localStorage.setItem("dhakaiya_dyn_categories", JSON.stringify(cleansed));
      }

      const savedColors = localStorage.getItem("dhakaiya_dyn_colors");
      if (savedColors) setColors(JSON.parse(savedColors));

      const savedSizes = localStorage.getItem("dhakaiya_dyn_sizes");
      if (savedSizes) setSizes(JSON.parse(savedSizes));

      const savedSettings = localStorage.getItem("dhakaiya_store_settings");
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          setSettings((prev) => ({
            ...prev,
            ...parsed,
            socialLinks: { ...prev.socialLinks, ...(parsed.socialLinks || {}) },
          }));
        } catch {}
      }

      const savedLogo = localStorage.getItem("dhakaiya_custom_logo");
      if (savedLogo && !savedLogo.includes("shadcn.png")) {
        setCustomLogoUrl(savedLogo);
      } else {
        setCustomLogoUrl("/uploads/drip-062eabdb-e093-4aef-8-1790770654393-4474.png");
        localStorage.setItem("dhakaiya_custom_logo", "/uploads/drip-062eabdb-e093-4aef-8-1790770654393-4474.png");
      }
    } catch {
      // Fallback
    } finally {
      setIsLoaded(true);
    }

    // Also sync settings & logo from server storage
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data?.settings) {
          const s = data.settings;
          setSettings(s);
          localStorage.setItem("dhakaiya_store_settings", JSON.stringify(s));
          if (s.logoUrl && !s.logoUrl.includes("shadcn.png")) {
            setCustomLogoUrl(s.logoUrl);
            localStorage.setItem("dhakaiya_custom_logo", s.logoUrl);
          }
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch server settings:", err);
      });
    // Also sync products from server storage
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.products) && data.products.length > 0) {
          const serverProducts: ProductItem[] = data.products.filter((p: ProductItem) => !isDummyProduct(p));
          setProducts((prev) => {
            const map = new Map<string, ProductItem>();
            prev.filter((p) => !isDummyProduct(p)).forEach((p) => map.set(p.id, p));
            serverProducts.forEach((p) => map.set(p.id, p));
            const merged = Array.from(map.values());
            localStorage.setItem("dhakaiya_dyn_products", JSON.stringify(merged));
            return merged;
          });
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch server products:", err);
      });
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("dhakaiya_dyn_products", JSON.stringify(products));
      localStorage.setItem("dhakaiya_dyn_categories", JSON.stringify(categories));
      localStorage.setItem("dhakaiya_dyn_colors", JSON.stringify(colors));
      localStorage.setItem("dhakaiya_dyn_sizes", JSON.stringify(sizes));
    }
  }, [products, categories, colors, sizes, isLoaded]);

  const addProduct = (newProduct: ProductItem) => {
    setProducts((prev) => {
      const next = [newProduct, ...prev.filter((p) => p.id !== newProduct.id)];
      try {
        localStorage.setItem("dhakaiya_dyn_products", JSON.stringify(next));
      } catch (e) {
        console.error("Failed to save product in localStorage:", e);
      }
      return next;
    });

    // Also persist to server storage
    fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    }).catch((err) => {
      console.warn("Failed to persist product to server:", err);
    });
  };

  const updateProduct = (updated: ProductItem) => {
    setProducts((prev) => {
      const next = prev.map((p) => (p.id === updated.id ? updated : p));
      try {
        localStorage.setItem("dhakaiya_dyn_products", JSON.stringify(next));
      } catch (e) {
        console.error("Failed to update product in localStorage:", e);
      }
      return next;
    });

    // Also sync to server if applicable
    fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    }).catch(() => {});
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id || p.slug === id);
    const targetSlug = target?.slug || id;

    setProducts((prev) => {
      const filtered = prev.filter((p) => p.id !== id && p.slug !== id);
      try {
        localStorage.setItem("dhakaiya_dyn_products", JSON.stringify(filtered));
      } catch (e) {
        console.error("Failed to update localStorage on delete:", e);
      }
      return filtered;
    });

    // Also trigger server-side deletion in PostgreSQL database
    fetch(`/api/products?id=${encodeURIComponent(id)}&slug=${encodeURIComponent(targetSlug)}`, {
      method: "DELETE",
    }).catch((err) => {
      console.warn("Server delete sync warning:", err);
    });
  };

  const updateStock = (productId: string, size: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedSizes = p.sizes.map((s) => {
            if (s.size === size) {
              return { ...s, stock: Math.max(0, s.stock + delta) };
            }
            return s;
          });
          const totalStock = updatedSizes.reduce((sum, s) => sum + s.stock, 0);
          return { ...p, sizes: updatedSizes, stockCount: totalStock };
        }
        return p;
      })
    );
  };

  const addCategory = (name: string, description?: string, image?: string) => {
    const slug = name.trim().toLowerCase().replace(/\s+/g, "-");
    const newCat: CategoryItem = {
      id: `cat-${Date.now()}`,
      name: name.trim(),
      slug,
      description,
      image,
    };
    setCategories((prev) => {
      const next = [...prev, newCat];
      try {
        localStorage.setItem("dhakaiya_dyn_categories", JSON.stringify(next));
      } catch {}
      return next;
    });

    // Also sync to PostgreSQL database
    fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newCat.name,
        slug: newCat.slug,
        description: newCat.description,
        image: newCat.image,
      }),
    }).catch(() => {});
  };

  const updateCategory = (updated: CategoryItem) => {
    setCategories((prev) => {
      const next = prev.map((c) => (c.id === updated.id ? updated : c));
      try {
        localStorage.setItem("dhakaiya_dyn_categories", JSON.stringify(next));
      } catch {}
      return next;
    });

    // Also sync to PostgreSQL database
    fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: updated.id,
        name: updated.name,
        slug: updated.slug,
        description: updated.description,
        image: updated.image,
      }),
    }).catch(() => {});
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => {
      const next = prev.filter(
        (c) => c.id !== id && c.name.toLowerCase() !== id.toLowerCase() && c.slug.toLowerCase() !== id.toLowerCase()
      );
      try {
        localStorage.setItem("dhakaiya_dyn_categories", JSON.stringify(next));
      } catch {}
      return next;
    });

    // Sync deletion to PostgreSQL database
    fetch(`/api/categories?id=${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => {});
  };

  const addColor = (name: string, hex: string) => {
    const formattedHex = hex.startsWith("#") ? hex.toUpperCase() : `#${hex.toUpperCase()}`;
    const newColor: ColorItem = {
      name: name.trim(),
      hex: formattedHex,
    };
    setColors((prev) => {
      const filtered = prev.filter((c) => c.name.toLowerCase() !== name.toLowerCase());
      const next = [...filtered, newColor];
      try {
        localStorage.setItem("dhakaiya_dyn_colors", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const deleteColor = (name: string) => {
    setColors((prev) => {
      const next = prev.filter((c) => c.name.toLowerCase() !== name.toLowerCase());
      try {
        localStorage.setItem("dhakaiya_dyn_colors", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const addSize = (size: string) => {
    const s = size.trim().toUpperCase();
    setSizes((prev) => {
      if (prev.includes(s)) return prev;
      const next = [...prev, s];
      try {
        localStorage.setItem("dhakaiya_dyn_sizes", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const deleteSize = (size: string) => {
    const s = size.trim().toUpperCase();
    setSizes((prev) => {
      const next = prev.filter((item) => item.toUpperCase() !== s);
      try {
        localStorage.setItem("dhakaiya_dyn_sizes", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const toggleFeaturedProduct = (productId: string) => {
    setProducts((prev) => {
      const next = prev.map((p) =>
        p.id === productId ? { ...p, isFeatured: !p.isFeatured } : p
      );
      try {
        localStorage.setItem("dhakaiya_dyn_products", JSON.stringify(next));
      } catch (e) {
        console.error("Failed to update featured products in localStorage:", e);
      }
      return next;
    });
  };

  const updateSettings = async (newSettings: Partial<StoreSettings>) => {
    const updated: StoreSettings = {
      ...settings,
      ...newSettings,
      socialLinks: {
        ...settings.socialLinks,
        ...(newSettings.socialLinks || {}),
      },
    };
    setSettings(updated);
    if (newSettings.logoUrl !== undefined) {
      setCustomLogoUrl(newSettings.logoUrl);
    }
    try {
      localStorage.setItem("dhakaiya_store_settings", JSON.stringify(updated));
      if (updated.logoUrl) {
        localStorage.setItem("dhakaiya_custom_logo", updated.logoUrl);
      }
    } catch (e) {
      console.error("Failed to save settings to localStorage:", e);
    }

    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSettings),
      });
    } catch (err) {
      console.warn("Failed to persist settings to server:", err);
    }
  };

  const updateDeliveryCharges = async (inside: number, outside: number, threshold?: number) => {
    await updateSettings({
      deliveryInsideDhaka: inside,
      deliveryOutsideDhaka: outside,
      ...(threshold !== undefined ? { freeShippingThreshold: threshold } : {}),
    });
  };

  const updateSocialLinks = async (links: SocialLinks) => {
    await updateSettings({ socialLinks: links });
  };

  const updateContactInfo = async (contact: { phone?: string; email?: string; address?: string }) => {
    await updateSettings(contact);
  };

  const updateLogo = (url: string | null) => {
    setCustomLogoUrl(url);
    updateSettings({ logoUrl: url });
  };

  const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug === slug);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        sizes,
        colors,
        settings,
        updateSettings,
        updateDeliveryCharges,
        updateSocialLinks,
        updateContactInfo,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        addCategory,
        updateCategory,
        deleteCategory,
        addColor,
        deleteColor,
        addSize,
        deleteSize,
        toggleFeaturedProduct,
        customLogoUrl,
        updateLogo,
        getProductBySlug,
        isLoaded,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
