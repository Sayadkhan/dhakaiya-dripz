import React from "react";
import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";
import ProductDetailWrapper from "@/components/store/ProductDetailWrapper";
import { INITIAL_PRODUCTS } from "@/lib/mock-data";

export const dynamicParams = true;

export async function generateStaticParams() {
  return INITIAL_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white selection:bg-[#0088ff] selection:text-white transition-colors duration-200">
      <Navbar />
      <main className="flex-1">
        <ProductDetailWrapper slug={slug} />
      </main>
      <Footer />
    </div>
  );
}
