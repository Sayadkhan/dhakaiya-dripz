"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Star,
  Eye,
  Trash2,
  Edit,
  RotateCcw,
  ArrowUpDown,
  AlertCircle,
  SlidersHorizontal,
  Package,
} from "lucide-react";
import { ProductItem } from "@/lib/mock-data";
import { CategoryItem } from "@/context/ProductContext";
import { formatPrice } from "@/lib/utils";
import Pagination from "./Pagination";

interface ProductsTableProps {
  products: ProductItem[];
  categories: CategoryItem[];
  onOpenAddProduct: () => void;
  onEditProduct: (product: ProductItem) => void;
  onDeleteProduct: (product: ProductItem) => void;
  onToggleFeatured: (productId: string) => void;
  onUpdateStock: (productId: string, size: string, delta: number) => void;
  initialSearchQuery?: string;
}

export default function ProductsTable({
  products,
  categories,
  onOpenAddProduct,
  onEditProduct,
  onDeleteProduct,
  onToggleFeatured,
  onUpdateStock,
  initialSearchQuery = "",
}: ProductsTableProps) {
  // Filtering states
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [stockFilter, setStockFilter] = useState<"ALL" | "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK">("ALL");
  const [featuredFilter, setFeaturedFilter] = useState<"ALL" | "FEATURED" | "STANDARD">("ALL");
  const [genderFilter, setGenderFilter] = useState<string>("ALL");

  // Sorting state
  const [sortBy, setSortBy] = useState<"title" | "price" | "stock" | "newest">("newest");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Sync external search query
  React.useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== "ALL") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Stock filter
    if (stockFilter === "IN_STOCK") {
      result = result.filter((p) => p.stockCount > 5);
    } else if (stockFilter === "LOW_STOCK") {
      result = result.filter((p) => p.stockCount > 0 && p.stockCount <= 5);
    } else if (stockFilter === "OUT_OF_STOCK") {
      result = result.filter((p) => p.stockCount === 0);
    }

    // Featured in Hero filter
    if (featuredFilter === "FEATURED") {
      result = result.filter((p) => p.isFeatured);
    } else if (featuredFilter === "STANDARD") {
      result = result.filter((p) => !p.isFeatured);
    }

    // Gender filter
    if (genderFilter !== "ALL") {
      result = result.filter((p) => p.gender === genderFilter);
    }

    // Sorting
    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === "price") {
        const priceA = a.salePrice ?? a.basePrice;
        const priceB = b.salePrice ?? b.basePrice;
        comparison = priceA - priceB;
      } else if (sortBy === "stock") {
        comparison = a.stockCount - b.stockCount;
      } else {
        comparison = b.id.localeCompare(a.id);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [
    products,
    searchQuery,
    selectedCategory,
    stockFilter,
    featuredFilter,
    genderFilter,
    sortBy,
    sortOrder,
  ]);

  // Pagination calculation
  const totalItems = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentSafePage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentSafePage - 1) * pageSize;
    return filteredProducts.slice(startIndex, startIndex + pageSize);
  }, [filteredProducts, currentSafePage, pageSize]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("ALL");
    setStockFilter("ALL");
    setFeaturedFilter("ALL");
    setGenderFilter("ALL");
    setCurrentPage(1);
  };

  const handleSortToggle = (col: "title" | "price" | "stock" | "newest") => {
    if (sortBy === col) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(col);
      setSortOrder(col === "title" ? "asc" : "desc");
    }
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== "ALL" ||
    stockFilter !== "ALL" ||
    featuredFilter !== "ALL" ||
    genderFilter !== "ALL";

  return (
    <div className="space-y-3.5">
      {/* Filter & Action Toolbar */}
      <div className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3.5 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[300px]">
          {/* Search Input */}
          <div className="relative min-w-[220px] max-w-sm flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search product silhouette, slug..."
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-black dark:focus:border-[#0088ff] transition"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-900 dark:text-white font-medium focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Stock Filter */}
          <select
            value={stockFilter}
            onChange={(e) => {
              setStockFilter(e.target.value as any);
              setCurrentPage(1);
            }}
            className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-900 dark:text-white font-medium focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Stock Levels</option>
            <option value="IN_STOCK">In Stock (&gt; 5)</option>
            <option value="LOW_STOCK">Low Stock (1–5)</option>
            <option value="OUT_OF_STOCK">Out of Stock (0)</option>
          </select>

          {/* Gender Filter */}
          <select
            value={genderFilter}
            onChange={(e) => {
              setGenderFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-900 dark:text-white font-medium focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Genders</option>
            <option value="UNISEX">UNISEX</option>
            <option value="MEN">MEN</option>
            <option value="WOMEN">WOMEN</option>
          </select>

          {/* Hero Slider Filter */}
          <select
            value={featuredFilter}
            onChange={(e) => {
              setFeaturedFilter(e.target.value as any);
              setCurrentPage(1);
            }}
            className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-900 dark:text-white font-medium focus:outline-none cursor-pointer"
          >
            <option value="ALL">Hero Status</option>
            <option value="FEATURED">⭐ Hero Slider Active</option>
            <option value="STANDARD">Regular</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold transition"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-mono font-bold text-zinc-500 hidden sm:inline">
            {totalItems} Silhouettes
          </span>
          <button
            onClick={onOpenAddProduct}
            className="bg-gradient-to-r from-[#0066ff] to-[#00a3ff] hover:from-[#0055dd] hover:to-[#0092ee] text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md shadow-[#0088ff]/25 transition"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Prominent, Large & Readable Data Table */}
      <div className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-100 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 font-mono text-xs uppercase font-bold tracking-wider select-none border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th
                  onClick={() => handleSortToggle("title")}
                  className="py-3.5 px-4 cursor-pointer hover:text-black dark:hover:text-white"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Product Silhouette</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4">Category & Fit</th>
                <th
                  onClick={() => handleSortToggle("price")}
                  className="py-3.5 px-4 cursor-pointer hover:text-black dark:hover:text-white"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Price (৳)</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSortToggle("stock")}
                  className="py-3.5 px-4 cursor-pointer hover:text-black dark:hover:text-white"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Inventory & Sizes</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-center">Colors</th>
                <th className="py-3.5 px-4 text-center">Hero Slider</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/80">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => {
                  const isOutOfStock = product.stockCount === 0;
                  const isLowStock = product.stockCount > 0 && product.stockCount <= 5;

                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition group"
                    >
                      {/* Column 1: Image & Title - LARGE & CLEAR */}
                      <td className="py-4 px-4 min-w-[280px]">
                        <div className="flex items-center gap-3.5">
                          {/* Large Image Thumbnail */}
                          <div className="w-14 h-18 sm:w-16 sm:h-20 rounded-xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative shrink-0 border border-zinc-200 dark:border-zinc-800 shadow-xs group-hover:scale-105 transition-transform duration-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                            {product.images.length > 1 && (
                              <span className="absolute bottom-1 right-1 bg-black/85 text-white text-[9px] font-mono font-bold px-1.5 py-0.2 rounded">
                                +{product.images.length - 1}
                              </span>
                            )}
                          </div>

                          {/* Full Readable Title without Cutoff */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-bold text-zinc-950 dark:text-white text-sm sm:text-base leading-snug hover:underline">
                                <Link href={`/product/${product.slug}`} target="_blank">
                                  {product.title}
                                </Link>
                              </h4>
                              {product.isNewDrop && (
                                <span className="bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md">
                                  NEW DROP
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-mono text-zinc-400">
                              /{product.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Category & Fit */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <span className="inline-block px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200 font-bold text-xs font-mono uppercase tracking-wide">
                            {product.category}
                          </span>
                          <div className="text-xs text-zinc-500 font-mono">
                            {product.fit} • {product.gender}
                          </div>
                        </div>
                      </td>

                      {/* Column 3: Price */}
                      <td className="py-4 px-4 font-mono whitespace-nowrap">
                        {product.salePrice ? (
                          <div>
                            <div className="font-black text-sm sm:text-base text-zinc-950 dark:text-[#00a3ff]">
                              {formatPrice(product.salePrice)}
                            </div>
                            <div className="text-xs text-zinc-400 line-through">
                              {formatPrice(product.basePrice)}
                            </div>
                          </div>
                        ) : (
                          <div className="font-black text-sm sm:text-base text-zinc-950 dark:text-white">
                            {formatPrice(product.basePrice)}
                          </div>
                        )}
                      </td>

                      {/* Column 4: Inventory & Sizes */}
                      <td className="py-4 px-4">
                        <div className="space-y-2">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-xs font-extrabold uppercase font-mono ${
                              isOutOfStock
                                ? "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400 border border-red-300 dark:border-red-500/30"
                                : isLowStock
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30"
                                : "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30"
                            }`}
                          >
                            {isOutOfStock
                              ? "Out of Stock"
                              : isLowStock
                              ? `Low Stock (${product.stockCount})`
                              : `${product.stockCount} in stock`}
                          </span>

                          {/* Readable Size Chips with Click Targets */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            {product.sizes.map((s) => (
                              <div
                                key={s.size}
                                className="inline-flex items-center gap-1.5 px-2 py-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-mono shadow-2xs"
                              >
                                <span className="font-bold text-zinc-500">{s.size}:</span>
                                <span
                                  className={`font-black ${
                                    s.stock === 0
                                      ? "text-red-500 line-through"
                                      : s.stock <= 2
                                      ? "text-amber-600 dark:text-amber-400"
                                      : "text-zinc-950 dark:text-white"
                                  }`}
                                >
                                  {s.stock}
                                </span>
                                <div className="flex items-center ml-0.5">
                                  <button
                                    onClick={() => onUpdateStock(product.id, s.size, -1)}
                                    className="w-4 h-4 rounded bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 flex items-center justify-center font-bold text-xs leading-none"
                                    title="Decrease stock by 1"
                                  >
                                    -
                                  </button>
                                  <button
                                    onClick={() => onUpdateStock(product.id, s.size, 1)}
                                    className="w-4 h-4 ml-1 rounded bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 flex items-center justify-center font-bold text-xs leading-none"
                                    title="Increase stock by 1"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>

                      {/* Column 5: Colors */}
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 flex-wrap">
                          {product.colors.map((c) => (
                            <span
                              key={c.name}
                              title={`${c.name} (${c.hex})`}
                              className="w-5 h-5 rounded-full border border-black/30 shadow-xs inline-block"
                              style={{ backgroundColor: c.hex }}
                            />
                          ))}
                        </div>
                      </td>

                      {/* Column 6: Hero Toggle */}
                      <td className="py-4 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => onToggleFeatured(product.id)}
                          className={`w-9 h-9 rounded-xl border inline-flex items-center justify-center transition shadow-xs ${
                            product.isFeatured
                              ? "bg-gradient-to-tr from-[#0066ff] to-[#00d2ff] text-white border-transparent shadow-md shadow-[#0088ff]/30"
                              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-black dark:hover:text-white border-zinc-200 dark:border-zinc-700"
                          }`}
                          title={
                            product.isFeatured
                              ? "Hero Active (Click to remove)"
                              : "Click to add to Homepage Hero Slider"
                          }
                        >
                          <Star
                            className={`w-4 h-4 ${
                              product.isFeatured ? "fill-white text-white" : "text-zinc-400"
                            }`}
                          />
                        </button>
                      </td>

                      {/* Column 7: Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onEditProduct(product)}
                            className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition shadow-2xs"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <Link
                            href={`/product/${product.slug}`}
                            target="_blank"
                            className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition shadow-2xs"
                            title="View PDP Storefront"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => onDeleteProduct(product)}
                            className="p-2 text-zinc-400 hover:text-red-600 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 transition shadow-2xs"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-500">
                    {products.length === 0 ? (
                      <div className="flex flex-col items-center justify-center space-y-3 py-6">
                        <div className="w-12 h-12 rounded-2xl bg-[#0088ff]/10 flex items-center justify-center text-[#0088ff] dark:text-[#00a3ff]">
                          <Package className="w-6 h-6" />
                        </div>
                        <div className="font-bold text-sm text-zinc-900 dark:text-white">
                          No products published yet
                        </div>
                        <p className="text-xs text-zinc-500 max-w-sm">
                          Your streetwear catalog is completely clean. Click below to add your first silhouette.
                        </p>
                        <button
                          onClick={onOpenAddProduct}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#0066ff] to-[#00a3ff] text-white rounded-xl text-xs font-bold shadow-md shadow-[#0088ff]/20 hover:opacity-95 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>+ Add First Product</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <AlertCircle className="w-8 h-8 text-zinc-400" />
                        <div className="font-bold text-sm text-zinc-800 dark:text-zinc-200">
                          No products match your filters
                        </div>
                        <button
                          onClick={handleResetFilters}
                          className="text-xs font-bold text-[#0088ff] dark:text-[#00a3ff] underline cursor-pointer"
                        >
                          Reset all filters
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Clear, Readable Pagination */}
        <Pagination
          currentPage={currentSafePage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          itemName="products"
        />
      </div>
    </div>
  );
}
