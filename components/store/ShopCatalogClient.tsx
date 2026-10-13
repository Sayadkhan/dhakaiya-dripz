"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Filter, X, SlidersHorizontal, ArrowUpDown, Check, Zap, Sparkles } from "lucide-react";
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
  const selectedSub = searchParams.get("sub") || "";
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

  // Product counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: products.length };
    categories.forEach((cat) => {
      counts[cat.name] = products.filter(
        (p) => p.category.toLowerCase() === cat.name.toLowerCase()
      ).length;
    });
    return counts;
  }, [products, categories]);

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
    return products
      .filter((product) => {
        if (filterParam === "new" && !product.isNewDrop) return false;
        if (
          filterParam === "sale" &&
          !(product.salePrice && product.salePrice < product.basePrice)
        )
          return false;
        if (
          selectedCategory !== "All" &&
          product.category.toLowerCase() !== selectedCategory.toLowerCase()
        )
          return false;
        if (selectedSub) {
          const subLower = selectedSub.toLowerCase();
          const matchesName = product.title.toLowerCase().includes(subLower);
          const matchesDesc = product.description.toLowerCase().includes(subLower);
          const matchesSub = (product as any).subcategory?.toLowerCase()?.includes(subLower);
          if (!matchesName && !matchesDesc && !matchesSub) return false;
        }
        if (
          selectedGender !== "ALL" &&
          product.gender !== selectedGender &&
          product.gender !== "UNISEX"
        )
          return false;
        if (selectedFit !== "ALL" && product.fit !== selectedFit) return false;
        if (selectedSize !== "ALL") {
          const hasSize = product.sizes.some((s) => s.size === selectedSize && s.stock > 0);
          if (!hasSize) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const priceA = a.salePrice ?? a.basePrice;
        const priceB = b.salePrice ?? b.basePrice;
        if (sortBy === "price-asc") return priceA - priceB;
        if (sortBy === "price-desc") return priceB - priceA;
        return 0;
      });
  }, [
    products,
    selectedCategory,
    selectedSub,
    selectedGender,
    selectedFit,
    selectedSize,
    sortBy,
    filterParam,
  ]);

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedSub ? 1 : 0) +
    (selectedGender !== "ALL" ? 1 : 0) +
    (selectedFit !== "ALL" ? 1 : 0) +
    (selectedSize !== "ALL" ? 1 : 0) +
    (filterParam ? 1 : 0);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Top Header Row (Title, Count, Sort, Mobile Filter Trigger) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1">
            Home / Catalog / {selectedCategory}
          </div>
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 dark:text-white">
              {selectedCategory === "All" ? "All Streetwear Silhouettes" : selectedCategory}
            </h1>
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              ({filteredProducts.length} items)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Button (visible only below lg) */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => updateQuery("sort", e.target.value)}
              className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-xs font-bold py-2 px-3.5 rounded-xl focus:outline-none focus:border-black dark:focus:border-white transition"
            >
              <option value="featured">Sort: Featured Drops</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips Strip */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-zinc-50 dark:bg-zinc-900/40 rounded-xl border border-zinc-200 dark:border-zinc-800/80">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            Active:
          </span>
          {selectedCategory !== "All" && (
            <span className="inline-flex items-center gap-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs px-2.5 py-1 rounded-full text-zinc-800 dark:text-zinc-200 shadow-2xs font-medium">
              Category: {selectedCategory}
              <button
                onClick={() => updateQuery("category", "All")}
                aria-label="Remove category filter"
              >
                <X className="w-3 h-3 text-zinc-400 hover:text-black dark:hover:text-white" />
              </button>
            </span>
          )}
          {selectedSub && (
            <span className="inline-flex items-center gap-1.5 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-xs px-2.5 py-1 rounded-full text-sky-700 dark:text-sky-300 font-medium shadow-2xs">
              Style: {selectedSub}
              <button onClick={() => updateQuery("sub", "")} aria-label="Remove style filter">
                <X className="w-3 h-3 text-sky-500 hover:text-black dark:hover:text-white" />
              </button>
            </span>
          )}
          {selectedGender !== "ALL" && (
            <span className="inline-flex items-center gap-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs px-2.5 py-1 rounded-full text-zinc-800 dark:text-zinc-200 shadow-2xs font-medium">
              Gender: {selectedGender}
              <button
                onClick={() => updateQuery("gender", "ALL")}
                aria-label="Remove gender filter"
              >
                <X className="w-3 h-3 text-zinc-400 hover:text-black dark:hover:text-white" />
              </button>
            </span>
          )}
          {selectedFit !== "ALL" && (
            <span className="inline-flex items-center gap-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs px-2.5 py-1 rounded-full text-zinc-800 dark:text-zinc-200 shadow-2xs font-medium">
              Fit: {selectedFit}
              <button onClick={() => updateQuery("fit", "ALL")} aria-label="Remove fit filter">
                <X className="w-3 h-3 text-zinc-400 hover:text-black dark:hover:text-white" />
              </button>
            </span>
          )}
          {selectedSize !== "ALL" && (
            <span className="inline-flex items-center gap-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs px-2.5 py-1 rounded-full text-zinc-800 dark:text-zinc-200 shadow-2xs font-medium">
              Size: {selectedSize}
              <button onClick={() => updateQuery("size", "ALL")} aria-label="Remove size filter">
                <X className="w-3 h-3 text-zinc-400 hover:text-black dark:hover:text-white" />
              </button>
            </span>
          )}
          {filterParam === "new" && (
            <span className="inline-flex items-center gap-1.5 bg-black text-white dark:bg-white dark:text-black text-xs px-2.5 py-1 rounded-full shadow-2xs font-bold">
              <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
              New Drops
              <button onClick={() => updateQuery("filter", "")} aria-label="Remove new filter">
                <X className="w-3 h-3 text-zinc-400 hover:text-white dark:hover:text-black" />
              </button>
            </span>
          )}
          {filterParam === "sale" && (
            <span className="inline-flex items-center gap-1.5 bg-rose-600 text-white text-xs px-2.5 py-1 rounded-full shadow-2xs font-bold">
              <Sparkles className="w-3 h-3 text-white" />
              Sale Items
              <button onClick={() => updateQuery("filter", "")} aria-label="Remove sale filter">
                <X className="w-3 h-3 text-white/80 hover:text-white" />
              </button>
            </span>
          )}

          <button
            onClick={clearAllFilters}
            className="text-xs text-red-600 dark:text-red-400 hover:underline font-bold ml-auto transition"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Content Area: Sidebar on Left, Products Grid on Right */}
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-10 items-start">
        {/* ======================================================== */}
        {/* DESKTOP SIDEBAR FILTER (Sticky Left Column)             */}
        {/* ======================================================== */}
        <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-24 self-start space-y-6 pb-12">
          {/* Sidebar Top Title */}
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-zinc-950 dark:text-white" />
              <span className="text-xs font-black uppercase tracking-wider text-zinc-950 dark:text-white">
                Filters
              </span>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-red-600 dark:text-red-400 hover:underline font-bold transition"
              >
                Reset All ({activeFiltersCount})
              </button>
            )}
          </div>

          {/* 1. Category Filter */}
          <div className="space-y-2.5 pb-5 border-b border-zinc-200 dark:border-zinc-800">
            <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
              Categories
            </span>
            <div className="space-y-1">
              {categoryNames.map((cat) => {
                const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
                const count = categoryCounts[cat] ?? 0;
                return (
                  <button
                    key={cat}
                    onClick={() => updateQuery("category", cat)}
                    className={`w-full flex items-center justify-between text-xs py-2 px-3 rounded-lg transition text-left ${
                      isSelected
                        ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-xs"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 font-medium"
                    }`}
                  >
                    <span>{cat === "All" ? "All Categories" : cat}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-950"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Gender Filter */}
          <div className="space-y-2.5 pb-5 border-b border-zinc-200 dark:border-zinc-800">
            <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
              Gender
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {GENDERS.map((g) => {
                const isSelected = selectedGender === g;
                return (
                  <button
                    key={g}
                    onClick={() => updateQuery("gender", g)}
                    className={`text-xs py-2 px-2.5 rounded-lg font-bold transition text-center border ${
                      isSelected
                        ? "bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-zinc-950 dark:border-white shadow-xs"
                        : "bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Fit Filter */}
          <div className="space-y-2.5 pb-5 border-b border-zinc-200 dark:border-zinc-800">
            <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
              Fit Profile
            </span>
            <div className="flex flex-wrap gap-1.5">
              {FITS.map((fit) => {
                const isSelected = selectedFit === fit;
                return (
                  <button
                    key={fit}
                    onClick={() => updateQuery("fit", fit)}
                    className={`text-xs py-1.5 px-3 rounded-lg font-bold transition border ${
                      isSelected
                        ? "bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-zinc-950 dark:border-white shadow-xs"
                        : "bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                    }`}
                  >
                    {fit}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Size Filter */}
          <div className="space-y-2.5 pb-5 border-b border-zinc-200 dark:border-zinc-800">
            <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
              Size
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {sizeOptions.map((sz) => {
                const isSelected = selectedSize === sz;
                return (
                  <button
                    key={sz}
                    onClick={() => updateQuery("size", sz)}
                    className={`text-xs py-1.5 rounded-lg font-mono font-bold transition text-center border ${
                      isSelected
                        ? "bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-zinc-950 dark:border-white shadow-xs"
                        : "bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Special Status / Quick Filters */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
              Special Filter
            </span>
            <div className="space-y-2">
              <button
                onClick={() => updateQuery("filter", filterParam === "new" ? "" : "new")}
                className={`w-full flex items-center justify-between text-xs py-2.5 px-3 rounded-lg border transition font-bold ${
                  filterParam === "new"
                    ? "bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-zinc-950 dark:border-white shadow-xs"
                    : "bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>New Drops Only</span>
                </span>
                {filterParam === "new" && <Check className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => updateQuery("filter", filterParam === "sale" ? "" : "sale")}
                className={`w-full flex items-center justify-between text-xs py-2.5 px-3 rounded-lg border transition font-bold ${
                  filterParam === "sale"
                    ? "bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-zinc-950 dark:border-white shadow-xs"
                    : "bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                  <span>Sale Items Only</span>
                </span>
                {filterParam === "sale" && <Check className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </aside>

        {/* ======================================================== */}
        {/* PRODUCT CATALOG GRID (Right Column)                      */}
        {/* ======================================================== */}
        <main className="flex-1 min-w-0 w-full">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-6">
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
                  className="bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase px-6 py-3 rounded-full shadow-lg transition"
                >
                  Reset All Filters
                </button>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ======================================================== */}
      {/* MOBILE FILTER DRAWER (Slide-over for screens < lg)      */}
      {/* ======================================================== */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-xs sm:max-w-sm bg-white dark:bg-zinc-950 h-full p-6 overflow-y-auto space-y-6 text-zinc-900 dark:text-white border-l border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-zinc-950 dark:text-white" />
                <h3 className="font-black uppercase tracking-wider text-sm">Filter Catalog</h3>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-md text-zinc-500 hover:text-black dark:hover:text-white"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                Category
              </div>
              <div className="flex flex-col space-y-1">
                {categoryNames.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      updateQuery("category", cat);
                    }}
                    className={`text-left text-xs py-2 px-3 rounded-lg font-semibold flex items-center justify-between ${
                      selectedCategory.toLowerCase() === cat.toLowerCase()
                        ? "bg-black text-white font-black dark:bg-white dark:text-black"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] opacity-70">({categoryCounts[cat] ?? 0})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                Gender
              </div>
              <div className="grid grid-cols-2 gap-2">
                {GENDERS.map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      updateQuery("gender", g);
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
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                Fit
              </div>
              <div className="grid grid-cols-2 gap-2">
                {FITS.map((fit) => (
                  <button
                    key={fit}
                    onClick={() => {
                      updateQuery("fit", fit);
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
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                Size
              </div>
              <div className="grid grid-cols-4 gap-2">
                {sizeOptions.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => {
                      updateQuery("size", sz);
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

            {/* Actions */}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
              <button
                onClick={() => {
                  clearAllFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-bold text-xs py-3 rounded-xl"
              >
                Clear All Filters
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase py-3.5 rounded-xl shadow-lg transition"
              >
                View ({filteredProducts.length}) Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
