import React, { Suspense } from "react";
import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";
import ShopCatalogClient from "@/components/store/ShopCatalogClient";

export default function ShopPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white selection:bg-[#d4ff00] selection:text-black transition-colors duration-200">
      <Navbar />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-4 py-16 text-center text-zinc-500">
              Loading catalog matrix...
            </div>
          }
        >
          <ShopCatalogClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
