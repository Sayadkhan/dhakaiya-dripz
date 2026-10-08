"use client";

import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import CartDrawer from "@/components/store/CartDrawer";
import FloatingActionWidgets from "@/components/store/FloatingActionWidgets";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ProductProvider>
        <WishlistProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <FloatingActionWidgets />
          </CartProvider>
        </WishlistProvider>
      </ProductProvider>
    </ThemeProvider>
  );
}
