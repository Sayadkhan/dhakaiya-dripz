"use client";

import React, { useState, useMemo } from "react";
import {
  FolderPlus,
  Plus,
  Search,
  Trash2,
  Package,
  AlertCircle,
  Edit,
  Image as ImageIcon,
} from "lucide-react";
import { CategoryItem } from "@/context/ProductContext";
import { ProductItem } from "@/lib/mock-data";
import Pagination from "./Pagination";

interface CategoriesTableProps {
  categories: CategoryItem[];
  products: ProductItem[];
  onOpenAddCategory: () => void;
  onEditCategory: (category: CategoryItem) => void;
  onDeleteCategory: (category: CategoryItem, linkedProductCount: number) => void;
}

export default function CategoriesTable({
  categories,
  products,
  onOpenAddCategory,
  onEditCategory,
  onDeleteCategory,
}: CategoriesTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const categoryCounts = useMemo(() => {
    const map = new Map<string, number>();
    products.forEach((p) => {
      const key = p.category.toLowerCase();
      map.set(key, (map.get(key) || 0) + 1);
    });
    return map;
  }, [products]);

  const filteredCategories = useMemo(() => {
    let result = [...categories];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.slug.toLowerCase().includes(q) ||
          (c.description && c.description.toLowerCase().includes(q))
      );
    }
    return result;
  }, [categories, searchQuery]);

  const totalItems = filteredCategories.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentSafePage = Math.min(currentPage, totalPages);

  const paginatedCategories = useMemo(() => {
    const start = (currentSafePage - 1) * pageSize;
    return filteredCategories.slice(start, start + pageSize);
  }, [filteredCategories, currentSafePage, pageSize]);

  return (
    <div className="space-y-3.5">
      {/* Top Bar */}
      <div className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3.5 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative min-w-[240px] max-w-md flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search categories..."
            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-black dark:focus:border-[#0088ff] transition"
          />
        </div>

        <button
          onClick={onOpenAddCategory}
          className="bg-gradient-to-r from-[#0066ff] to-[#00a3ff] hover:from-[#0055dd] hover:to-[#0092ee] text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-[#0088ff]/25 transition"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-100 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 font-mono text-xs uppercase font-bold tracking-wider select-none border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-3.5 px-4 w-24">Image</th>
                <th className="py-3.5 px-4">Category Name</th>
                <th className="py-3.5 px-4">Slug</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4 text-center">Items Linked</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/80">
              {paginatedCategories.length > 0 ? (
                paginatedCategories.map((cat) => {
                  const assignedCount = categoryCounts.get(cat.name.toLowerCase()) || 0;

                  return (
                    <tr
                      key={cat.id}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition group"
                    >
                      {/* Category Image Thumbnail */}
                      <td className="py-3 px-4">
                        {cat.image ? (
                          <div className="w-14 h-16 sm:w-16 sm:h-20 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 relative group/thumb shadow-xs">
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="w-full h-full object-cover transition-transform group-hover/thumb:scale-105"
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-16 sm:w-16 sm:h-20 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-800 flex flex-col items-center justify-center text-zinc-400 gap-1">
                            <ImageIcon className="w-5 h-5 text-zinc-400" />
                            <span className="text-[10px] font-mono text-zinc-400">No Img</span>
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-4 font-bold text-zinc-950 dark:text-white text-sm">
                        <div className="flex items-center gap-2">
                          <FolderPlus className="w-4 h-4 text-sky-500 shrink-0" />
                          <span>{cat.name}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4 font-mono text-xs text-zinc-500">
                        /{cat.slug}
                      </td>

                      <td className="py-4 px-4 text-zinc-600 dark:text-zinc-400 text-xs max-w-xs truncate">
                        {cat.description || "—"}
                      </td>

                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-full font-bold ${
                            assignedCount > 0
                              ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                              : "bg-zinc-100/60 dark:bg-zinc-900 text-zinc-400"
                          }`}
                        >
                          <Package className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{assignedCount} items</span>
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => onEditCategory(cat)}
                            className="p-2 text-zinc-400 hover:text-black dark:hover:text-[#00a3ff] rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                            title={`Edit Category "${cat.name}"`}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteCategory(cat, assignedCount)}
                            className="p-2 text-zinc-400 hover:text-red-600 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                            title={`Delete Category "${cat.name}"`}
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
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <AlertCircle className="w-8 h-8 text-zinc-400" />
                      <div className="font-bold text-sm text-zinc-800 dark:text-zinc-200">
                        No categories found
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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
          pageSizeOptions={[5, 10, 20]}
          itemName="categories"
        />
      </div>
    </div>
  );
}
