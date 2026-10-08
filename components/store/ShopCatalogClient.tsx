"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Filter, X, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/components/store/ProductCard";

const GENDERS = ["ALL", "UNISEX", "MEN", "WOMEN"];
const FITS = ["ALL", "OVERSIZED", "RELAXED", "REGULAR", "TAILORED"];

export default function ShopCatalogClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, categories, sizes } = useProducts();

  // URL state synchronization
  const selectedCategory = searchParams.get("category") || "All";
  const selectedGender = searchParams.get("gender") || "ALL";
  const selectedFit = searchParams.get("fit") || "ALL";
  const selectedSize = searchParams.get("size") || "ALL";
  const sortBy = searchParams.get("sort") || "featured";
  const filterParam = searchParams.get("filter") || "";

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Category names list
  const categoryNames = useMemo(() => {
    return ["All", ...categories.map((c) => c.name)];
  }, [categories]);

  // Size list with ALL
  const sizeOptions = useMemo(() => {
    return ["ALL", ...sizes];
  }, [sizes]);

  // Helper to update query parameters in URL
  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "ALL" || value === "All" || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.replace(`/shop?${params.toString()}`, { scroll: false });
  };

  const clearAllFilters = () => {
    router.replace("/shop", { scroll: false });
  };

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (filterParam === "new" && !product.isNewDrop) return false;
      if (selectedCategory !== "All" && product.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
      if (selectedGender !== "ALL" && product.gender !== selectedGender && product.gender !== "UNISEX") return false;
      if (selectedFit !== "ALL" && product.fit !== selectedFit) return false;
      if (selectedSize !== "ALL") {
        const hasSize = product.sizes.some((s) => s.size === selectedSize && s.stock > 0);
        if (!hasSize) return false;
      }
      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice ?? a.basePrice;
      const priceB = b.salePrice ?? b.basePrice;
      if (sortBy === "price-asc") return priceA - priceB;
      if (sortBy === "price-desc") return priceB - priceA;
      return 0;
    });
  }, [products, selectedCategory, selectedGender, selectedFit, selectedSize, sortBy, filterParam]);

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedGender !== "ALL" ? 1 : 0) +
    (selectedFit !== "ALL" ? 1 : 0) +
    (selectedSize !== "ALL" ? 1 : 0) +
    (filterParam ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Title & Breadcrumb */}
      <div className="mb-6 space-y-1">
        <div className="text-xs font-mono uppercase tracking-wider text-zinc-500">
          Home / Catalog / {selectedCategory}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950 dark:text-white">
            {selectedCategory === "All" ? "All Streetwear Silhouettes" : selectedCategory}
          </h1>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            Showing <strong className="text-zinc-950 dark:text-white">{filteredProducts.length}</strong> items
          </span>
        </div>
      </div>

      {/* ASOS Sticky Top Filter Architecture */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md py-3 border-y border-zinc-200 dark:border-zinc-900 mb-8 transition-colors duration-200">
        <div className="flex items-center justify-between gap-4">
          
          {/* Quick Category Pills (Desktop) */}
          <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categoryNames.map((cat) => (
              <button
                key={cat}
                onClick={() => updateQuery("category", cat)}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-full border transition whitespace-nowrap ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? "bg-gradient-to-r from-[#0066ff] to-[#00a3ff] text-white border-[#00a3ff] shadow-xs font-black"
                    : "bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#0066ff] dark:text-[#00a3ff]" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => updateQuery("sort", e.target.value)}
              className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-xs font-bold py-1.5 px-3 rounded-xl focus:outline-none focus:border-black dark:focus:border-[#00a3ff]"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Secondary Desktop Filter Row (Gender, Fit, Size) */}
        <div className="hidden lg:flex items-center gap-6 mt-3 pt-3 border-t border-zinc-200/80 dark:border-zinc-900/60 text-xs">
          {/* Gender Filter */}
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Gender:</span>
            <div className="flex gap-1">
              {GENDERS.map((g) => (
                <button
                  key={g}
                  onClick={() => updateQuery("gender", g)}
                  className={`px-2.5 py-1 rounded-md font-mono font-bold transition ${
                    selectedGender === g
                      ? "bg-zinc-950 text-white dark:bg-white dark:text-black shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Fit Filter */}
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Fit:</span>
            <div className="flex gap-1">
              {FITS.map((fit) => (
                <button
                  key={fit}
                  onClick={() => updateQuery("fit", fit)}
                  className={`px-2.5 py-1 rounded-md font-bold transition ${
                    selectedFit === fit
                      ? "bg-zinc-950 text-white dark:bg-white dark:text-black shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {fit}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Size:</span>
            <div className="flex gap-1 overflow-x-auto max-w-sm no-scrollbar py-0.5">
              {sizeOptions.map((size) => (
                <button
                  key={size}
                  onClick={() => updateQuery("size", size)}
                  className={`px-2.5 py-1 rounded-md font-mono font-bold transition whitespace-nowrap ${
                    selectedSize === size
                      ? "bg-zinc-950 text-white dark:bg-white dark:text-black shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Filters Pill */}
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="ml-auto text-red-600 dark:text-red-400 hover:underline font-bold flex items-center gap-1 transition"
            >
              <X className="w-3.5 h-3.5" /> Clear Filters ({activeFiltersCount})
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Badges / Tags */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs text-zinc-500 font-medium">Active:</span>
          {selectedCategory !== "All" && (
            <span className="inline-flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs px-2.5 py-1 rounded-full text-zinc-800 dark:text-zinc-200">
              Category: {selectedCategory}
              <button onClick={() => updateQuery("category", "All")}>
                <X className="w-3 h-3 text-zinc-500 hover:text-black dark:hover:text-white" />
              </button>
            </span>
          )}
          {selectedGender !== "ALL" && (
            <span className="inline-flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs px-2.5 py-1 rounded-full text-zinc-800 dark:text-zinc-200">
              Gender: {selectedGender}
              <button onClick={() => updateQuery("gender", "ALL")}>
                <X className="w-3 h-3 text-zinc-500 hover:text-black dark:hover:text-white" />
              </button>
            </span>
          )}
          {selectedFit !== "ALL" && (
            <span className="inline-flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs px-2.5 py-1 rounded-full text-zinc-800 dark:text-zinc-200">
              Fit: {selectedFit}
              <button onClick={() => updateQuery("fit", "ALL")}>
                <X className="w-3 h-3 text-zinc-500 hover:text-black dark:hover:text-white" />
              </button>
            </span>
          )}
          {selectedSize !== "ALL" && (
            <span className="inline-flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs px-2.5 py-1 rounded-full text-zinc-800 dark:text-zinc-200">
              Size: {selectedSize}
              <button onClick={() => updateQuery("size", "ALL")}>
                <X className="w-3 h-3 text-zinc-500 hover:text-black dark:hover:text-white" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Product Catalog Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/30 rounded-3xl border border-zinc-200 dark:border-zinc-900 space-y-4">
          <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-900 mx-auto flex items-center justify-center text-zinc-500 dark:text-zinc-600">
            <Filter className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
              {products.length === 0 ? "Catalog In Preparation" : "No products found"}
            </h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
              {products.length === 0
                ? "The upcoming drop is currently in assembly. New collection drops will appear here shortly."
                : "We couldn't find any items matching your selected filter parameters. Try clearing some filters."}
            </p>
          </div>
          {products.length > 0 && (
            <button
              onClick={clearAllFilters}
              className="bg-gradient-to-r from-[#0066ff] to-[#00a3ff] hover:from-[#0052cc] hover:to-[#0088ff] text-white font-extrabold text-xs uppercase px-5 py-2.5 rounded-full shadow-lg shadow-[#0088ff]/25 transition"
            >
              Reset All Filters
            </button>
          )}
        </div>
      )}

      {/* Mobile Filter Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-xs bg-white dark:bg-zinc-950 h-full p-6 overflow-y-auto space-y-6 text-zinc-900 dark:text-white border-l border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="font-black uppercase tracking-wider text-base">Filter Catalog</h3>
              <button onClick={() => setIsMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>

            {/* Category */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Category</div>
              <div className="flex flex-col space-y-1">
                {categoryNames.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      updateQuery("category", cat);
                      setIsMobileFilterOpen(false);
                    }}
                    className={`text-left text-xs py-2 px-3 rounded-lg font-semibold ${
                      selectedCategory.toLowerCase() === cat.toLowerCase()
                        ? "bg-gradient-to-r from-[#0066ff] to-[#00a3ff] text-white"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Gender</div>
              <div className="grid grid-cols-2 gap-2">
                {GENDERS.map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      updateQuery("gender", g);
                      setIsMobileFilterOpen(false);
                    }}
                    className={`text-xs py-2 rounded-lg font-bold ${
                      selectedGender === g
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Fit */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Fit</div>
              <div className="grid grid-cols-2 gap-2">
                {FITS.map((fit) => (
                  <button
                    key={fit}
                    onClick={() => {
                      updateQuery("fit", fit);
                      setIsMobileFilterOpen(false);
                    }}
                    className={`text-xs py-2 rounded-lg font-bold ${
                      selectedFit === fit
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {fit}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Size</div>
              <div className="grid grid-cols-4 gap-2">
                {sizeOptions.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => {
                      updateQuery("size", sz);
                      setIsMobileFilterOpen(false);
                    }}
                    className={`text-xs py-2 rounded-lg font-mono font-bold ${
                      selectedSize === sz
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
              <button
                onClick={() => {
                  clearAllFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-bold text-xs py-3 rounded-xl"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-gradient-to-r from-[#0066ff] to-[#00a3ff] hover:from-[#0052cc] hover:to-[#0088ff] text-white font-black text-xs uppercase py-3 rounded-xl shadow-lg shadow-[#0088ff]/25 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
