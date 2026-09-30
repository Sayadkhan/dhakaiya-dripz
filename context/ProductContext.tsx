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

interface ProductContextType {
  products: ProductItem[];
  categories: CategoryItem[];
  sizes: string[];
  colors: ColorItem[];
  addProduct: (product: ProductItem) => void;
  deleteProduct: (id: string) => void;
  updateStock: (productId: string, size: string, delta: number) => void;
  addCategory: (name: string, description?: string, image?: string) => void;
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
  { id: "cat-1", name: "Pants", slug: "Pants", description: "Tactical twill trousers & parachute cargos" },
  { id: "cat-2", name: "Oversized Tees", slug: "Oversized-Tees", description: "Heavyweight 260GSM combed boxy tees" },
  { id: "cat-3", name: "Shirts", slug: "Shirts", description: "Raw-edge Cuban camp collar shirts" },
  { id: "cat-4", name: "Jackets & Hoodies", slug: "Jackets-&-Hoodies", description: "Distressed acid-wash French Terry" },
  { id: "cat-5", name: "Accessories", slug: "Accessories", description: "Tactical cross-body rigs & belts" },
];

const DEFAULT_COLORS: ColorItem[] = [
  { name: "Pitch Black", hex: "#111111" },
  { name: "Acid Lime", hex: "#D4FF00" },
  { name: "Wood Green", hex: "#2E3A2F" },
  { name: "Cement Grey", hex: "#7E827A" },
  { name: "Chalk Off-White", hex: "#F4F3EF" },
  { name: "Battleship Grey", hex: "#4A4D4F" },
  { name: "Ecru Linen", hex: "#E3DAC9" },
  { name: "Mineral Charcoal", hex: "#2B2D2F" },
  { name: "Washed Sage", hex: "#7D8C7C" },
  { name: "Desert Khaki", hex: "#A89F91" },
];

const DEFAULT_SIZES = ["S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "ONE SIZE"];

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<CategoryItem[]>(DEFAULT_CATEGORIES);
  const [colors, setColors] = useState<ColorItem[]>(DEFAULT_COLORS);
  const [sizes, setSizes] = useState<string[]>(DEFAULT_SIZES);
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved state from localStorage
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem("dhakaiya_dyn_products");
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedCategories = localStorage.getItem("dhakaiya_dyn_categories");
      if (savedCategories) setCategories(JSON.parse(savedCategories));

      const savedColors = localStorage.getItem("dhakaiya_dyn_colors");
      if (savedColors) setColors(JSON.parse(savedColors));

      const savedSizes = localStorage.getItem("dhakaiya_dyn_sizes");
      if (savedSizes) setSizes(JSON.parse(savedSizes));

      const savedLogo = localStorage.getItem("dhakaiya_custom_logo");
      if (savedLogo) setCustomLogoUrl(savedLogo);
    } catch {
      // Fallback
    } finally {
      setIsLoaded(true);
    }

    // Also sync logo from server storage
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data?.settings?.logoUrl !== undefined) {
          setCustomLogoUrl(data.settings.logoUrl);
          if (data.settings.logoUrl) {
            localStorage.setItem("dhakaiya_custom_logo", data.settings.logoUrl);
          } else {
            localStorage.removeItem("dhakaiya_custom_logo");
          }
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch server settings:", err);
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
    setProducts((prev) => [newProduct, ...prev]);
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
      body: JSON.stringify({ name: newCat.name, slug: newCat.slug, description: newCat.description }),
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

  const updateLogo = (url: string | null) => {
    setCustomLogoUrl(url);
    try {
      if (url) {
        localStorage.setItem("dhakaiya_custom_logo", url);
      } else {
        localStorage.removeItem("dhakaiya_custom_logo");
      }
    } catch (e) {
      console.error("Failed to update custom logo in localStorage:", e);
    }

    // Persist to server
    fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ logoUrl: url }),
    }).catch((err) => {
      console.warn("Failed to persist logo to server:", err);
    });
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
