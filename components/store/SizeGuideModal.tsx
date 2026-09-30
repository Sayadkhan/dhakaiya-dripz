"use client";

import React, { useEffect } from "react";
import { X, Ruler, CheckCircle2 } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export default function SizeGuideModal({ isOpen, onClose, category }: SizeGuideModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isPant = category.toLowerCase().includes("pant") || category.toLowerCase().includes("cargo") || category.toLowerCase().includes("trouser");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-zinc-900 dark:text-white shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-black dark:text-[#d4ff00]" />
            <h3 className="text-lg font-black uppercase tracking-wider text-zinc-950 dark:text-white">
              {isPant ? "Trousers & Cargos Size Chart" : "Tops & Oversized Silhouette Guide"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-black dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            All measurements are specified in inches (inches &quot;). Our cuts are designed with a relaxed, modern drape tailored specifically for Bangladesh urban streetwear aesthetics.
          </p>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            {isPant ? (
              <table className="w-full text-xs text-left">
                <thead className="bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Size (Tag)</th>
                    <th className="py-3 px-4">Waist (in)</th>
                    <th className="py-3 px-4">Length (in)</th>
                    <th className="py-3 px-4">Hip (in)</th>
                    <th className="py-3 px-4">Leg Opening</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-mono text-zinc-800 dark:text-zinc-300">
                  <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                    <td className="py-2.5 px-4 font-bold text-zinc-950 dark:text-white">28</td>
                    <td className="py-2.5 px-4">28 - 29</td>
                    <td className="py-2.5 px-4">39.5</td>
                    <td className="py-2.5 px-4">38</td>
                    <td className="py-2.5 px-4">16.5</td>
                  </tr>
                  <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                    <td className="py-2.5 px-4 font-bold text-zinc-950 dark:text-white">30</td>
                    <td className="py-2.5 px-4">30 - 31</td>
                    <td className="py-2.5 px-4">40.5</td>
                    <td className="py-2.5 px-4">40</td>
                    <td className="py-2.5 px-4">17.0</td>
                  </tr>
                  <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 bg-zinc-100/50 dark:bg-zinc-900/20">
                    <td className="py-2.5 px-4 font-bold text-black dark:text-[#d4ff00]">32 (Most Popular)</td>
                    <td className="py-2.5 px-4">32 - 33</td>
                    <td className="py-2.5 px-4">41.5</td>
                    <td className="py-2.5 px-4">42</td>
                    <td className="py-2.5 px-4">17.5</td>
                  </tr>
                  <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                    <td className="py-2.5 px-4 font-bold text-zinc-950 dark:text-white">34</td>
                    <td className="py-2.5 px-4">34 - 35</td>
                    <td className="py-2.5 px-4">42.5</td>
                    <td className="py-2.5 px-4">44</td>
                    <td className="py-2.5 px-4">18.0</td>
                  </tr>
                  <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                    <td className="py-2.5 px-4 font-bold text-zinc-950 dark:text-white">36</td>
                    <td className="py-2.5 px-4">36 - 37</td>
                    <td className="py-2.5 px-4">43.0</td>
                    <td className="py-2.5 px-4">46</td>
                    <td className="py-2.5 px-4">18.5</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table className="w-full text-xs text-left">
                <thead className="bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Chest (in)</th>
                    <th className="py-3 px-4">Length (in)</th>
                    <th className="py-3 px-4">Shoulder (in)</th>
                    <th className="py-3 px-4">Sleeve (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-mono text-zinc-800 dark:text-zinc-300">
                  <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                    <td className="py-2.5 px-4 font-bold text-zinc-950 dark:text-white">S</td>
                    <td className="py-2.5 px-4">42</td>
                    <td className="py-2.5 px-4">28</td>
                    <td className="py-2.5 px-4">21</td>
                    <td className="py-2.5 px-4">9.0</td>
                  </tr>
                  <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 bg-zinc-100/50 dark:bg-zinc-900/20">
                    <td className="py-2.5 px-4 font-bold text-black dark:text-[#d4ff00]">M (Regular Streetwear)</td>
                    <td className="py-2.5 px-4">44</td>
                    <td className="py-2.5 px-4">29</td>
                    <td className="py-2.5 px-4">22</td>
                    <td className="py-2.5 px-4">9.5</td>
                  </tr>
                  <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                    <td className="py-2.5 px-4 font-bold text-zinc-950 dark:text-white">L (Oversized Drape)</td>
                    <td className="py-2.5 px-4">46</td>
                    <td className="py-2.5 px-4">30</td>
                    <td className="py-2.5 px-4">23</td>
                    <td className="py-2.5 px-4">10.0</td>
                  </tr>
                  <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                    <td className="py-2.5 px-4 font-bold text-zinc-950 dark:text-white">XL (Ultra Baggy)</td>
                    <td className="py-2.5 px-4">48</td>
                    <td className="py-2.5 px-4">31</td>
                    <td className="py-2.5 px-4">24</td>
                    <td className="py-2.5 px-4">10.5</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          {/* Sizing Tips */}
          <div className="bg-zinc-50 dark:bg-zinc-900/70 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 space-y-1.5">
            <div className="font-bold text-zinc-950 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-black dark:text-[#d4ff00]" /> Dhakaiya Dripz Fit Philosophy
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">
              If you prefer an authentic boxy/drop-shoulder look, select your true standard size. For a more tailored/fitted appearance, we recommend ordering one size down.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-900 flex justify-end">
          <button
            onClick={onClose}
            className="bg-zinc-900 dark:bg-zinc-800 hover:bg-black dark:hover:bg-zinc-700 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-xl transition"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
