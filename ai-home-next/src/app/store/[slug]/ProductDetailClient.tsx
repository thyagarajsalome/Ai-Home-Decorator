"use client";

import React, { useState } from "react";
import Image from "next/image";
import { StoreProduct } from "@/lib/storeData";

export function ProductPurchaseCard({ product }: { product: StoreProduct }) {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);

  const handleInstantBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setPurchaseSuccess(true);
    }, 1200);
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E8D8] shadow-lg sticky top-24">
        {/* Price Tag */}
        <div className="flex items-baseline justify-between mb-4 pb-4 border-b border-[#F0E8D8]">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-[#4A2508]">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-[#9B8272] line-through font-semibold">
                ${product.originalPrice.toFixed(2)}
              </span>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">
              50% Launch Discount • US Edition
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-[#E87A1E] block">
              {product.pagesCount} Pages
            </span>
            <span className="text-[10px] text-[#9B8272]">Printable PDF</span>
          </div>
        </div>

        {/* Primary CTA */}
        <button
          onClick={() => setIsCheckoutModalOpen(true)}
          className="w-full py-4 px-6 rounded-2xl bg-[#E87A1E] hover:bg-[#D66A12] text-white font-black text-sm sm:text-base tracking-wide shadow-lg shadow-[#E87A1E]/30 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 mb-3"
        >
          <span>⚡</span>
          <span>Instant Download Now</span>
        </button>

        <p className="text-[11px] text-center text-[#7A5C3A] mb-5">
          🔒 Secure 256-Bit SSL Checkout • Apple Pay, Google Pay &amp; Cards
        </p>

        {/* Quick Specs List */}
        <div className="space-y-2.5 text-xs text-[#5C3314] pt-2 border-t border-[#F0E8D8]">
          <div className="flex items-center justify-between">
            <span className="text-[#9B8272]">Format:</span>
            <span className="font-semibold">{product.format}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#9B8272]">File Size:</span>
            <span className="font-semibold">{product.fileSize}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#9B8272]">Delivery:</span>
            <span className="font-semibold text-emerald-700">Instant PDF Access + Email</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#9B8272]">Guarantee:</span>
            <span className="font-semibold">30-Day 100% Refund</span>
          </div>
        </div>

        {/* 30-Day Guarantee Callout */}
        <div className="mt-6 p-4 rounded-2xl bg-[#FFFBF7] border border-[#FEEDDF] flex items-start gap-3">
          <span className="text-xl">🛡️</span>
          <div>
            <h4 className="text-xs font-bold text-[#4A2508] mb-0.5">
              Risk-Free Renovation Guarantee
            </h4>
            <p className="text-[11px] text-[#7A5C3A] leading-relaxed">
              If this guide doesn&apos;t save you time and money on your remodel, get a full refund within 30 days.
            </p>
          </div>
        </div>
      </div>

      {/* ── Instant Buy / Checkout Modal ── */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#F0E8D8]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#E87A1E]">
                Instant Digital Checkout
              </span>
              <button
                onClick={() => {
                  setIsCheckoutModalOpen(false);
                  setPurchaseSuccess(false);
                }}
                className="w-7 h-7 rounded-full bg-[#FEEDDF] text-[#4A2508] font-bold text-xs flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {purchaseSuccess ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 text-3xl flex items-center justify-center mx-auto mb-4 font-bold">
                  ✓
                </div>
                <h3 className="font-heading font-bold text-xl text-[#4A2508] mb-2">
                  Order Complete!
                </h3>
                <p className="text-xs text-[#6D5D53] leading-relaxed mb-6">
                  Your PDF guide has been dispatched to <strong>{email}</strong>. You can also start reading right away.
                </p>
                <div className="space-y-3">
                  <a
                    href="/downloads/2026-USA-Home-Design-Remodel-Lookbook.pdf"
                    download
                    className="block w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold text-center transition-colors"
                  >
                    Download PDF eBook Now ({product.fileSize})
                  </a>
                  <button
                    onClick={() => {
                      setIsCheckoutModalOpen(false);
                      setPurchaseSuccess(false);
                    }}
                    className="block w-full py-2.5 text-xs text-[#7A5C3A] hover:underline text-center"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-heading font-bold text-xl text-[#4A2508] mb-1">
                  {product.title}
                </h3>
                <p className="text-xs text-[#7A5C3A] mb-4">
                  {product.format} • Lifetime Updates Included
                </p>

                <div className="bg-[#FFFBF7] p-4 rounded-2xl border border-[#FEEDDF] mb-5 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#4A2508]">Total Due Today:</span>
                  <div className="text-right">
                    <span className="text-xl font-black text-[#E87A1E]">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-[#9B8272] block">USD</span>
                  </div>
                </div>

                <form onSubmit={handleInstantBuy} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4A2508] mb-1.5">
                      Your Email (for instant PDF delivery)
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john@homedecor.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#F0E8D8] text-xs sm:text-sm focus:border-[#E87A1E] focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#E87A1E] hover:bg-[#D66A12] text-white text-sm font-bold shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? "Processing..." : `Complete Order & Download ($${product.price.toFixed(2)})`}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-[#9B8272] pt-2">
                    <span>💳 Visa</span>
                    <span>• Mastercard</span>
                    <span>• Apple Pay</span>
                    <span>• Google Pay</span>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export function ProductPreviewViewer({ product }: { product: StoreProduct }) {
  const [activePreviewIndex, setActivePreviewIndex] = useState<number>(0);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#F0E8D8] shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#F0E8D8]">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#E87A1E]">
            Interactive Sample Viewer
          </span>
          <h3 className="font-heading font-bold text-xl text-[#4A2508]">
            Look Inside The Blueprint
          </h3>
        </div>
        <span className="text-xs font-bold text-[#7A5C3A]">
          Page {product.previewPages[activePreviewIndex]?.pageNumber} of {product.pagesCount}
        </span>
      </div>

      {/* Main Preview Display */}
      <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden mb-4 bg-gray-100 shadow-inner">
        <Image
          src={product.previewPages[activePreviewIndex]?.imageUrl}
          alt={product.previewPages[activePreviewIndex]?.title}
          fill
          sizes="(max-width: 1024px) 100vw, 800px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 text-white">
          <div>
            <span className="text-xs font-bold text-[#FCD7BA] block uppercase tracking-wider mb-1">
              Sample Schematic • Page {product.previewPages[activePreviewIndex]?.pageNumber}
            </span>
            <h4 className="font-bold text-lg sm:text-xl">
              {product.previewPages[activePreviewIndex]?.title}
            </h4>
            <p className="text-xs sm:text-sm text-gray-200">
              {product.previewPages[activePreviewIndex]?.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Excerpt Box */}
      <div className="p-4 rounded-xl bg-[#FFFBF7] border border-[#FEEDDF] mb-5">
        <span className="text-[11px] font-bold uppercase text-[#E87A1E] block mb-1">
          Blueprint Specification Highlight:
        </span>
        <p className="text-xs sm:text-sm text-[#4A2508] italic leading-relaxed">
          &ldquo;{product.previewPages[activePreviewIndex]?.highlightText}&rdquo;
        </p>
      </div>

      {/* Thumbnails to Switch Pages */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {product.previewPages.map((page, idx) => (
          <button
            key={idx}
            onClick={() => setActivePreviewIndex(idx)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
              activePreviewIndex === idx
                ? "bg-[#E87A1E] text-white shadow-md scale-102"
                : "bg-[#FFFBF7] text-[#4A2508] border border-[#F0E8D8] hover:border-[#E87A1E]"
            }`}
          >
            <span>📄</span>
            <span>Sample {idx + 1}: {page.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
