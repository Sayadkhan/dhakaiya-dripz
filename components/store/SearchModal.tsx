"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { ProductItem } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { useProducts } from "@/context/ProductContext";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { products } = useProducts();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.productCode && p.productCode.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q) ||
        p.fit.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden text-zinc-900 dark:text-white">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
          <Search className="w-5 h-5 text-zinc-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search oversized tees, parachute cargos, twill trousers..."
            className="w-full bg-transparent text-sm sm:text-base text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-zinc-400 hover:text-black dark:hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700 font-bold font-mono"
          >
            ESC
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {query.trim() === "" ? (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                <Sparkles className="w-3.5 h-3.5 text-[#0066ff] dark:text-[#00a3ff]" /> Popular Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Tactical Pleated",
                  "Parachute Cargo",
                  "Oversized Tee",
                  "Cuban Collar",
                  "French Terry Hoodie",
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-300 hover:text-black dark:hover:text-white px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 transition font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-zinc-500 px-2 pb-1">
                Found {results.length} results
              </div>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900/80 transition group"
                >
                  <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-800 flex-shrink-0">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      sizes="64px"
                      className="object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-[#0066ff] dark:group-hover:text-[#00a3ff] transition truncate">
                      {product.title}
                    </div>
                    <div className="text-xs text-zinc-500 flex items-center gap-2 mt-0.5">
                      <span>{product.category}</span>
                      <span>•</span>
                      <span className="font-mono text-zinc-800 dark:text-zinc-300 font-bold">
                        {formatPrice(product.salePrice ?? product.basePrice)}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-[#0066ff] dark:group-hover:text-[#00a3ff] group-hover:translate-x-1 transition" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-zinc-500">
              <p className="text-sm">No drip found matching &quot;{query}&quot;</p>
              <p className="text-xs mt-1 text-zinc-400">Try searching for &quot;cargo&quot;, &quot;pleated&quot;, or &quot;oversized&quot;</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
