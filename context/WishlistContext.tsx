"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ProductItem } from "@/lib/mock-data";

interface WishlistContextType {
  wishlistIds: string[];
  toggleWishlist: (product: ProductItem) => void;
  isInWishlist: (productId: string) => boolean;
  totalWishlistItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("dhakaiya_wishlist");
      if (saved) {
        const parsed: string[] = JSON.parse(saved);
        const cleanIds = parsed.filter((id) => !id.startsWith("prod-"));
        setWishlistIds(cleanIds);
        localStorage.setItem("dhakaiya_wishlist", JSON.stringify(cleanIds));
      }
    } catch {
      // Fallback
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("dhakaiya_wishlist", JSON.stringify(wishlistIds));
    }
  }, [wishlistIds, isLoaded]);

  const toggleWishlist = (product: ProductItem) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        totalWishlistItems: wishlistIds.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
