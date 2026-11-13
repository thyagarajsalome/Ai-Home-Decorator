"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { STORE_CATEGORIES, STORE_PRODUCTS, StoreProduct } from "@/lib/storeData";

export default function StorefrontClient({
  initialProducts = STORE_PRODUCTS,
}: {
  initialProducts?: StoreProduct[];
}) {
  const [products] = useState<StoreProduct[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [previewProduct, setPreviewProduct] = useState<StoreProduct | null>(null);
  const [activePreviewIndex, setActivePreviewIndex] = useState<number>(0);

  // Only show category pills that actually have published products
  const activeCategoryIds = new Set(products.map((p) => p.categoryId));
  const availableCategories = STORE_CATEGORIES.filter(
    (c) => c.id === "all" || activeCategoryIds.has(c.id)
  );

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.categoryId === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openPreview = (product: StoreProduct) => {
    setPreviewProduct(product);
    setActivePreviewIndex(0);
  };

  const closePreview = () => {
    setPreviewProduct(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* ── Search & Filter Controls ── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Category Pill Scroll */}
        <div className="w-full md:w-auto flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {availableCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#E87A1E] text-white shadow-md shadow-[#E87A1E]/20 scale-105"
                    : "bg-white text-[#4A2508] border border-[#F0E8D8] hover:border-[#E87A1E] hover:bg-[#FFFBF7]"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Search Input */}
        <div className="w-full md:w-72 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, paint, rooms..."
            className="w-full px-4 py-2.5 pl-10 text-xs sm:text-sm bg-white rounded-xl border border-[#F0E8D8] focus:outline-hidden focus:border-[#E87A1E] text-[#4A2508] placeholder:text-[#9B8272]"
          />
          <svg
            className="w-4 h-4 text-[#9B8272] absolute left-3.5 top-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* ── Products Grid ── */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#F0E8D8]">
          <p className="text-4xl mb-3">🔍</p>
          <h3 className="text-xl font-bold text-[#4A2508] mb-1">No Guides Found</h3>
          <p className="text-sm text-[#7A5C3A] mb-4">
            Try adjusting your search query or selecting a different category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="btn-brand-primary px-5 py-2 text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <article
              key={product.slug}
              className="bg-white rounded-2xl overflow-hidden border border-[#F0E8D8] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group max-w-sm mx-auto w-full"
            >
              {/* Top Banner & 3D Cover Mockup (Compact & 0 Gap) */}
              <div className="relative bg-gradient-to-b from-[#FEEDDF]/50 to-[#FAF4EC] px-4 pt-4 pb-3 flex items-center justify-center">
                <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-xs text-[10px] font-bold text-[#4A2508] border border-[#F0E8D8] shadow-2xs">
                  {product.pagesCount} Pages • PDF
                </div>

                {/* 3D Book Cover Visual Container (US Letter 8.5:11 aspect ratio) */}
                <div className="relative w-36 h-[184px] aspect-[17/22] my-1 transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:rotate-1">
                  {/* Book Spine Shadow */}
                  <div className="absolute inset-0 bg-black/25 rounded-r-lg blur-md translate-y-2 translate-x-2" />

                  {/* Real PDF Book Cover (Edge-to-Edge with Spine Fold) */}
                  <div className="relative w-full h-full rounded-r-lg rounded-l-xs overflow-hidden border-r-2 border-b-2 border-black/20 shadow-xl bg-[#2D1B0D]">
                    {/* Spine gradient shadow for 3D realism */}
                    <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/35 via-white/10 to-transparent pointer-events-none z-10" />

                    <Image
                      src={product.coverImage}
                      alt={product.title}
                      fill
                      sizes="144px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Card Body (Streamlined & Proportional) */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category & Rating */}
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-[#E87A1E] uppercase tracking-wider text-[10px]">
                      {product.categoryName}
                    </span>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.aihomedecorator.twa"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-[11px] bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 px-2 py-0.5 rounded-full font-bold transition-colors cursor-pointer"
                      title="4.6★ Rated on Google Play Store"
                    >
                      <span className="text-amber-500 text-xs leading-none">★</span>
                      <span>4.6</span>
                      <span className="text-[9px] text-amber-800/70 font-semibold">• Play Store</span>
                    </a>
                  </div>

                  <h3 className="font-heading font-bold text-base text-[#4A2508] mb-1 group-hover:text-[#E87A1E] transition-colors leading-snug line-clamp-2">
                    <Link href={`/store/${product.slug}`}>{product.title}</Link>
                  </h3>
                  <p className="text-xs text-[#7A5C3A] leading-relaxed line-clamp-2 mb-3">
                    {product.subtitle}
                  </p>
                </div>

                {/* Pricing & Actions */}
                <div className="pt-3 border-t border-[#F0E8D8]">
                  <div className="flex items-baseline justify-between mb-3">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black text-[#4A2508]">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-[10px] font-bold text-[#8D5D30] uppercase">
                        USD
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-[#9B8272] line-through font-semibold ml-1">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                      {product.originalPrice > product.price && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm ml-1">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#7A5C3A] font-semibold">
                      Instant PDF
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openPreview(product)}
                      className="w-full py-2 px-2.5 rounded-xl border border-[#F0E8D8] text-xs font-bold text-[#4A2508] hover:bg-[#FFFBF7] hover:border-[#E87A1E] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>👁️</span>
                      <span>Look Inside</span>
                    </button>
                    <Link
                      href={`/store/${product.slug}`}
                      className="w-full py-2 px-2.5 rounded-xl bg-[#E87A1E] hover:bg-[#D66A12] text-white text-xs font-bold text-center transition-colors shadow-2xs flex items-center justify-center gap-1"
                    >
                      <span>Get Guide</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ── Interactive "Look Inside" Preview Modal ── */}
      {previewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-[#F0E8D8]">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#F0E8D8] flex items-center justify-between bg-[#FFFBF7]">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#E87A1E]">
                  Sample Preview: {previewProduct.categoryName}
                </span>
                <h3 className="font-heading font-bold text-lg text-[#4A2508]">
                  {previewProduct.title}
                </h3>
              </div>
              <button
                onClick={closePreview}
                className="w-8 h-8 rounded-full bg-[#FEEDDF] text-[#4A2508] font-bold text-sm flex items-center justify-center hover:bg-[#E87A1E] hover:text-white transition-colors cursor-pointer"
                aria-label="Close Preview"
              >
                ✕
              </button>
            </div>

            {/* Modal Body / Sample Viewer */}
            <div className="p-6 overflow-y-auto flex-1 bg-[#FAF4EC]">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-[#F0E8D8] mb-6">
                <div className="flex items-center justify-between text-xs font-bold text-[#7A5C3A] mb-3 pb-2 border-b border-[#F0E8D8]">
                  <span>SAMPLE PAGE #{previewProduct.previewPages[activePreviewIndex]?.pageNumber}</span>
                  <span>{previewProduct.format}</span>
                </div>

                <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden mb-4 bg-gray-100">
                  <Image
                    src={previewProduct.previewPages[activePreviewIndex]?.imageUrl}
                    alt={previewProduct.previewPages[activePreviewIndex]?.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 text-white">
                    <div>
                      <h4 className="font-bold text-base">
                        {previewProduct.previewPages[activePreviewIndex]?.title}
                      </h4>
                      <p className="text-xs text-gray-200">
                        {previewProduct.previewPages[activePreviewIndex]?.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FFFBF7] p-4 rounded-xl border border-[#FEEDDF]">
                  <span className="text-[11px] font-bold uppercase text-[#E87A1E] block mb-1">
                    Key Blueprint Highlight:
                  </span>
                  <p className="text-xs sm:text-sm text-[#4A2508] italic leading-relaxed">
                    &ldquo;{previewProduct.previewPages[activePreviewIndex]?.highlightText}&rdquo;
                  </p>
                </div>
              </div>

              {/* Sample Page Selector Tabs */}
              <div className="flex items-center justify-center gap-2">
                {previewProduct.previewPages.map((page, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePreviewIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activePreviewIndex === idx
                        ? "bg-[#E87A1E] text-white shadow-xs"
                        : "bg-white text-[#4A2508] border border-[#F0E8D8] hover:bg-[#FEEDDF]"
                    }`}
                  >
                    Page {page.pageNumber}: {page.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Footer / Purchase Action */}
            <div className="p-4 sm:p-5 border-t border-[#F0E8D8] bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-[#4A2508]">
                  ${previewProduct.price.toFixed(2)}
                </span>
                <span className="text-xs font-bold text-[#8D5D30] uppercase">
                  USD
                </span>
                {previewProduct.originalPrice > previewProduct.price && (
                  <span className="text-xs text-[#9B8272] line-through ml-1">
                    ${previewProduct.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-sm ml-1">
                  Instant PDF Access
                </span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={closePreview}
                  className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-[#F0E8D8] text-xs font-bold text-[#4A2508] hover:bg-[#FFFBF7]"
                >
                  Close
                </button>
                <Link
                  href={`/store/${previewProduct.slug}`}
                  className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-[#E87A1E] hover:bg-[#D66A12] text-white text-xs font-bold text-center shadow-xs"
                >
                  Get Complete Guide →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
