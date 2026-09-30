"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ProductItem } from "@/lib/mock-data";

export interface CartItemType {
  id: string; // unique item id: productId-size-color
  productId: string;
  title: string;
  slug: string;
  image: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  maxStock: number;
}

interface CartContextType {
  items: CartItemType[];
  addItem: (product: ProductItem, size: string, color: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  subtotal: number;
  totalItems: number;
  deliveryZone: "INSIDE_DHAKA" | "OUTSIDE_DHAKA";
  setDeliveryZone: (zone: "INSIDE_DHAKA" | "OUTSIDE_DHAKA") => void;
  deliveryCharge: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const FREE_SHIPPING_THRESHOLD = 3000;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryZone, setDeliveryZone] = useState<"INSIDE_DHAKA" | "OUTSIDE_DHAKA">("INSIDE_DHAKA");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dhakaiya_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Fallback
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("dhakaiya_cart", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = (product: ProductItem, size: string, color: string, quantity: number = 1) => {
    const sizeObj = product.sizes.find((s) => s.size === size);
    const maxStock = sizeObj ? sizeObj.stock : 10;
    const itemKey = `${product.id}-${size}-${color}`;
    const price = product.salePrice ?? product.basePrice;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, maxStock);
        return prev.map((item) => (item.id === itemKey ? { ...item, quantity: newQty } : item));
      }
      return [
        ...prev,
        {
          id: itemKey,
          productId: product.id,
          title: product.title,
          slug: product.slug,
          image: product.images[0] || "",
          size,
          color,
          price,
          quantity: Math.min(quantity, maxStock),
          maxStock,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const updated = item.quantity + delta;
            if (updated <= 0) return null;
            return { ...item, quantity: Math.min(updated, item.maxStock) };
          }
          return item;
        })
        .filter(Boolean) as CartItemType[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const deliveryCharge = items.length === 0 ? 0 : isFreeShipping ? 0 : deliveryZone === "INSIDE_DHAKA" ? 80 : 150;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const totalAmount = subtotal + deliveryCharge;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        subtotal,
        totalItems,
        deliveryZone,
        setDeliveryZone,
        deliveryCharge,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
