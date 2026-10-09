"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Trash2,
  FolderPlus,
  Palette,
  Ruler,
  Check,
  Upload,
  Link as LinkIcon,
  Image as ImageIcon,
  Loader2,
  Edit,
  Sparkles,
} from "lucide-react";
import { ProductItem } from "@/lib/mock-data";
import { CategoryItem } from "@/context/ProductContext";

// 1. Delete Product Modal
interface DeleteProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteProductModal({
  product,
  onClose,
  onConfirm,
}: DeleteProductModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-2xl text-zinc-900 dark:text-white space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/50 flex items-center justify-center text-red-600">
          <Trash2 className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <h3 className="font-black text-lg uppercase tracking-tight text-zinc-950 dark:text-white">
            Delete Product Silhouette?
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-bold text-zinc-900 dark:text-white">
              &quot;{product.title}&quot;
            </span>
            ? This action is permanent and will remove the item from your store catalog and database.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition flex items-center gap-1.5 shadow-lg shadow-red-600/20"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Permanently</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// 2. Add / Edit Category Modal with Image Upload, URL input, and Live Preview

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description: string, image?: string, id?: string) => void;
  categoryToEdit?: CategoryItem | null;
}

export function AddCategoryModal({
  isOpen,
  onClose,
  onSave,
  categoryToEdit,
}: AddCategoryModalProps) {
  const [catName, setCatName] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [catImage, setCatImage] = useState("");
  const [manualUrl, setManualUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (categoryToEdit) {
      setCatName(categoryToEdit.name || "");
      setCatDesc(categoryToEdit.description || "");
      setCatImage(categoryToEdit.image || "");
      setManualUrl("");
    } else {
      setCatName("");
      setCatDesc("");
      setCatImage("");
      setManualUrl("");
    }
  }, [categoryToEdit, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("files", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch {}

      if (res.ok && data?.urls && data.urls.length > 0) {
        setCatImage(data.urls[0]);
      } else {
        // Fallback: Read file locally as Data URL
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setCatImage(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch {
      // Local Data URL fallback if network error
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setCatImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleApplyUrl = () => {
    if (!manualUrl.trim()) return;
    setCatImage(manualUrl.trim());
    setManualUrl("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;
    onSave(catName.trim(), catDesc.trim(), catImage.trim() || undefined, categoryToEdit?.id);
    setCatName("");
    setCatDesc("");
    setCatImage("");
    setManualUrl("");
    onClose();
  };

  const computedSlug = catName.trim().toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="w-full max-w-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 sm:p-7 shadow-2xl text-zinc-900 dark:text-white space-y-5 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-900/50 flex items-center justify-center text-sky-500">
              {categoryToEdit ? <Edit className="w-5 h-5" /> : <FolderPlus className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg uppercase tracking-tight">
                {categoryToEdit ? `Edit Category: ${categoryToEdit.name}` : "Add New Category"}
              </h3>
              <p className="text-[11px] text-zinc-500">
                Organize silhouettes, lookbooks, and homepage collections.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-black dark:hover:text-white rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Name & Slug */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Category Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Parachute Trousers, Boxy Heavyweight Tees"
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-[#00a3ff] transition"
            />
            {catName && (
              <p className="text-[11px] font-mono text-zinc-500">
                Slug: <span className="text-sky-600 dark:text-sky-400 font-bold">/{computedSlug}</span>
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Silhouette Description / Tagline
            </label>
            <input
              type="text"
              placeholder="e.g. Tactical twill silhouettes & relaxed cargo fits"
              value={catDesc}
              onChange={(e) => setCatDesc(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-[#00a3ff] transition"
            />
          </div>

          {/* CATEGORY COVER IMAGE SECTION */}
          <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-900">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-emerald-500" />
                <span>Category Image</span>
              </label>
              {catImage && (
                <span className="text-[10px] font-mono uppercase bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md font-bold">
                  Image Attached
                </span>
              )}
            </div>

            {/* Live Image Preview (Large & Clear) */}
            {catImage ? (
              <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 group shadow-md">
                <img
                  src={catImage}
                  alt="Category Cover Preview"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
                  <div className="truncate pr-2">
                    <span className="text-xs font-bold uppercase tracking-wide block">
                      {catName || "Category Cover"}
                    </span>
                    <span className="text-[10px] font-mono opacity-80 truncate block">
                      {catImage}
                    </span>
                  </div>
                </div>

                {/* Remove / Change Image Button */}
                <button
                  type="button"
                  onClick={() => setCatImage("")}
                  className="absolute top-3 right-3 p-2 bg-red-600/90 hover:bg-red-600 text-white rounded-xl shadow-lg transition flex items-center gap-1.5 text-xs font-bold backdrop-blur-xs"
                  title="Remove Image"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remove</span>
                </button>
              </div>
            ) : (
              /* Drag & Drop Upload Zone */
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  handleFileUpload(e.dataTransfer.files);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer flex flex-col items-center justify-center gap-2.5 transition ${
                  dragOver
                    ? "border-[#00a3ff] bg-[#00a3ff]/10"
                    : "border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-[#00a3ff] bg-zinc-50/60 dark:bg-zinc-900/40 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/80"
                }`}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-8 h-8 text-[#00a3ff] animate-spin" />
                    <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">
                      Uploading image...
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-black dark:group-hover:text-[#00a3ff] transition">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                        Click to upload category image, or drag & drop
                      </div>
                      <div className="text-[11px] text-zinc-500 mt-0.5">
                        PNG, JPG, WEBP format supported (Recommended: 800x600 or larger)
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
            />

            {/* Secondary Option: Paste Direct URL */}
            <div className="flex gap-2 pt-1">
              <div className="relative flex-1">
                <LinkIcon className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  placeholder="Or paste direct image URL (https://...)"
                  value={manualUrl}
                  onChange={(e) => setManualUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleApplyUrl();
                    }
                  }}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-8 pr-3 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-black dark:focus:border-[#00a3ff] transition"
                />
              </div>
              <button
                type="button"
                onClick={handleApplyUrl}
                disabled={!manualUrl.trim()}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white disabled:opacity-40 transition"
              >
                Apply URL
              </button>
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-6 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-[#0066ff] to-[#00a3ff] hover:from-[#0052cc] hover:to-[#0088ff] text-white uppercase tracking-wider shadow-lg shadow-[#0088ff]/25 transition flex items-center gap-1.5 disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>{categoryToEdit ? "Update Category" : "Save Category"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 3. Add Color Swatch Modal with HEX Picker
interface AddColorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, hex: string) => void;
}

export function AddColorModal({
  isOpen,
  onClose,
  onSave,
}: AddColorModalProps) {
  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState("#00A3FF");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!colorName.trim() || !colorHex.trim()) return;
    onSave(colorName.trim(), colorHex.trim());
    setColorName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl text-zinc-900 dark:text-white space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#00a3ff]" />
            <h3 className="font-bold text-base uppercase">Add Color Swatch</h3>
          </div>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Color Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Cyber Cyan, Electric Blue, Shadow Black"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-[#00a3ff]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Pick Color & Enter HEX Code *
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={colorHex}
                onChange={(e) => setColorHex(e.target.value.toUpperCase())}
                className="w-12 h-12 rounded-xl cursor-pointer border border-zinc-300 dark:border-zinc-700 p-1 bg-transparent"
              />

              <div className="flex-1">
                <input
                  type="text"
                  required
                  placeholder="#00A3FF"
                  value={colorHex}
                  onChange={(e) => setColorHex(e.target.value.toUpperCase())}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 font-mono text-sm font-bold text-zinc-900 dark:text-white uppercase focus:outline-none focus:border-black dark:focus:border-[#00a3ff]"
                />
              </div>

              <div
                className="w-12 h-12 rounded-xl border border-black/30 shadow-md flex items-center justify-center shrink-0"
                style={{ backgroundColor: colorHex }}
              >
                <Check className="w-5 h-5 text-white drop-shadow-md" />
              </div>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
              Quick Streetwear Presets:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { name: "Cyber Cyan", hex: "#00A3FF" },
                { name: "Electric Blue", hex: "#0066FF" },
                { name: "Obsidian", hex: "#0B0C10" },
                { name: "Cement", hex: "#8D99AE" },
                { name: "Army Olive", hex: "#4A5320" },
                { name: "Deep Navy", hex: "#001F54" },
                { name: "Rust Orange", hex: "#D84A1B" },
                { name: "Chalk", hex: "#F8F9FA" },
              ].map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => {
                    setColorHex(p.hex);
                    if (!colorName) setColorName(p.name);
                  }}
                  className="flex items-center gap-1.5 px-2 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-[10px] font-mono text-zinc-700 dark:text-zinc-300 hover:border-black dark:hover:border-white transition"
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.hex }} />
                  <span>{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-[#0066ff] to-[#00a3ff] hover:from-[#0052cc] hover:to-[#0088ff] text-white uppercase tracking-wider shadow-md shadow-[#0088ff]/25 transition"
            >
              Save Color Swatch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 4. Add Size Modal
interface AddSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (size: string) => void;
}

export function AddSizeModal({
  isOpen,
  onClose,
  onSave,
}: AddSizeModalProps) {
  const [newSizeName, setNewSizeName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSizeName.trim()) return;
    onSave(newSizeName.trim().toUpperCase());
    setNewSizeName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl text-zinc-900 dark:text-white space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#0088ff] dark:text-[#00a3ff]" />
            <h3 className="font-bold text-base uppercase">Add Garment Size</h3>
          </div>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Size Metric *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. XXL, 38, 40, FREE SIZE, 26"
              value={newSizeName}
              onChange={(e) => setNewSizeName(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-zinc-900 dark:text-white uppercase focus:outline-none focus:border-black dark:focus:border-[#00a3ff]"
            />
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-[#0066ff] to-[#00a3ff] hover:from-[#0052cc] hover:to-[#0088ff] text-white uppercase tracking-wider shadow-md shadow-[#0088ff]/25 transition"
            >
              Save Size
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
