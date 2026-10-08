"use client";

import React, { useState } from "react";
import {
  Palette,
  Ruler,
  Plus,
  Trash2,
  X,
  Check,
  Copy,
} from "lucide-react";
import { ColorItem } from "@/context/ProductContext";

interface AttributesManagerProps {
  colors: ColorItem[];
  sizes: string[];
  onOpenAddColor: () => void;
  onOpenAddSize: () => void;
  onDeleteColor: (name: string) => void;
  onDeleteSize: (size: string) => void;
  onTriggerToast: (msg: string) => void;
}

export default function AttributesManager({
  colors,
  sizes,
  onOpenAddColor,
  onOpenAddSize,
  onDeleteColor,
  onDeleteSize,
  onTriggerToast,
}: AttributesManagerProps) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    onTriggerToast(`Copied ${hex} to clipboard!`);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* 1. Color Swatches Section */}
      <div className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <Palette className="w-5 h-5 text-emerald-500" />
            <div>
              <h3 className="font-bold text-sm uppercase tracking-tight text-zinc-950 dark:text-white">
                Color Swatches & HEX ({colors.length})
              </h3>
              <p className="text-xs text-zinc-500">Available across product silhouettes</p>
            </div>
          </div>
          <button
            onClick={onOpenAddColor}
            className="bg-gradient-to-r from-[#0066ff] to-[#00a3ff] hover:from-[#0055dd] hover:to-[#0092ee] text-white font-black text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Color</span>
          </button>
        </div>

        {/* Color Items Table */}
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-zinc-100 dark:bg-zinc-900/90 font-mono text-xs text-zinc-600 dark:text-zinc-400 font-bold uppercase">
              <tr>
                <th className="py-2.5 px-3.5">Swatch</th>
                <th className="py-2.5 px-3.5">Color Name</th>
                <th className="py-2.5 px-3.5">HEX Code</th>
                <th className="py-2.5 px-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/80">
              {colors.map((color) => (
                <tr key={color.name} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition">
                  <td className="py-3 px-3.5">
                    <span
                      className="w-6 h-6 rounded-lg border border-black/20 shadow-xs inline-block shrink-0 align-middle"
                      style={{ backgroundColor: color.hex }}
                    />
                  </td>
                  <td className="py-3 px-3.5 font-bold text-zinc-950 dark:text-white text-xs sm:text-sm">
                    {color.name}
                  </td>
                  <td className="py-3 px-3.5 font-mono">
                    <button
                      type="button"
                      onClick={() => handleCopyHex(color.hex)}
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 transition font-bold"
                      style={{
                        backgroundColor: `${color.hex}18`,
                        color:
                          color.hex === "#FFFFFF" || color.hex === "#F4F3EF"
                            ? "#111"
                            : color.hex,
                      }}
                      title="Copy HEX"
                    >
                      <span>{color.hex}</span>
                      {copiedHex === color.hex ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3 opacity-60" />
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => onDeleteColor(color.name)}
                      className="p-1.5 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                      title={`Delete ${color.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Garment Sizes Section */}
      <div className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-5 h-5 text-[#0088ff] dark:text-[#00a3ff]" />
            <div>
              <h3 className="font-bold text-sm uppercase tracking-tight text-zinc-950 dark:text-white">
                Garment Sizes ({sizes.length})
              </h3>
              <p className="text-xs text-zinc-500">Alpha & waist measurement metrics</p>
            </div>
          </div>
          <button
            onClick={onOpenAddSize}
            className="bg-gradient-to-r from-[#0066ff] to-[#00a3ff] hover:from-[#0055dd] hover:to-[#0092ee] text-white font-black text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Size</span>
          </button>
        </div>

        {/* Sizes Pills Matrix */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 space-y-3">
          <div className="text-xs font-mono text-zinc-400">
            Active sizing metrics across apparel catalog:
          </div>

          <div className="flex flex-wrap gap-2">
            {sizes.map((sz) => (
              <div
                key={sz}
                className="flex items-center gap-2 pl-3 pr-1.5 py-1.5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono font-bold text-xs sm:text-sm text-zinc-900 dark:text-white shadow-2xs hover:border-black dark:hover:border-[#00a3ff] transition"
              >
                <span>{sz}</span>
                <button
                  type="button"
                  onClick={() => onDeleteSize(sz)}
                  className="p-1 rounded-md text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                  title={`Delete size ${sz}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
