"use client";

import React, { useState } from "react";
import Image from "next/image";
import { StoreProduct } from "@/lib/storeData";

const loadRazorpayScript = () => {
  return new Promise<boolean>((resolve) => {
    if (typeof window !== "undefined" && (window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export function ProductPurchaseCard({ product }: { product: StoreProduct }) {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);

  const handleInstantBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setPaymentError(null);

    try {
      // 1. Load Razorpay Checkout SDK
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        throw new Error("Unable to load Razorpay checkout. Please check your internet connection.");
      }

      // 2. Create Order in USD ($)
      const res = await fetch("/api/store/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: product.slug, email }),
      });
      const orderData = await res.json();
      if (!res.ok || orderData.error) {
        throw new Error(orderData.error || "Failed to create payment order");
      }

      // 3. Launch Razorpay Secure Checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || "USD",
        name: "AI Home Decorator Store",
        description: product.title,
        image: "/brand/logo.jpg",
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            setIsSubmitting(true);
            const verifyRes = await fetch("/api/store/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                slug: product.slug,
                email,
              }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || verifyData.error) {
              throw new Error(verifyData.error || "Payment verification failed");
            }
            setPurchaseSuccess(true);
          } catch (vErr: any) {
            setPaymentError(vErr.message || "Payment verification failed");
          } finally {
            setIsSubmitting(false);
          }
        },
        prefill: {
          email,
        },
        theme: {
          color: "#E87A1E",
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (resp: any) {
        setIsSubmitting(false);
        setPaymentError(resp.error?.description || "Payment was not completed.");
      });
      rzp.open();
    } catch (err: any) {
      console.error(err);
      setPaymentError(err.message || "Payment initialization failed");
      setIsSubmitting(false);
    }
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
          onClick={() => {
            setIsCheckoutModalOpen(true);
            setPaymentError(null);
          }}
          className="w-full py-4 px-6 rounded-2xl bg-[#E87A1E] hover:bg-[#D66A12] text-white font-black text-sm sm:text-base tracking-wide shadow-lg shadow-[#E87A1E]/30 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 mb-3"
        >
          <span>⚡</span>
          <span>Instant Download Now</span>
        </button>

        <p className="text-[11px] text-center text-[#7A5C3A] mb-5">
          🔒 Secure 256-bit encrypted checkout with Razorpay • Instant PDF delivery
        </p>

        {/* Key Features Bullet Points */}
        <div className="space-y-3 pt-4 border-t border-[#F0E8D8] text-xs text-[#5C3314]">
          <div className="flex items-start gap-2.5">
            <span className="text-emerald-600 font-bold text-sm">✓</span>
            <span>
              <strong>Lifetime Access</strong> with free updates to all 2026 revisions.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="text-emerald-600 font-bold text-sm">✓</span>
            <span>
              <strong>Universal Format:</strong> Formatted for standard US Letter printing &amp; iPad / tablet reading.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="text-emerald-600 font-bold text-sm">✓</span>
            <span>
              <strong>Money-Back Guarantee:</strong> 30 days, no questions asked.
            </span>
          </div>
        </div>

        {/* Target Audience Box */}
        <div className="mt-6 p-4 rounded-2xl bg-[#FFFBF7] border border-[#FEEDDF]">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#E87A1E] block mb-1">
            Who This Is For:
          </span>
          <p className="text-xs text-[#6D5D53] leading-relaxed">
            {product.targetAudience}
          </p>
        </div>
      </div>

      {/* ── Instant Checkout Modal ── */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#F0E8D8] shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F0E8D8]">
              <div className="flex items-center gap-2">
                <span className="text-lg">🛒</span>
                <span className="font-heading font-black text-sm uppercase tracking-wider text-[#E87A1E]">
                  Secure Checkout
                </span>
              </div>
              <button
                onClick={() => {
                  setIsCheckoutModalOpen(false);
                  setPaymentError(null);
                }}
                className="w-7 h-7 rounded-full bg-[#FEEDDF] text-[#4A2508] font-bold text-xs flex items-center justify-center cursor-pointer hover:bg-[#E87A1E] hover:text-white transition-colors"
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
                  Payment Successful!
                </h3>
                <p className="text-xs text-[#6D5D53] leading-relaxed mb-6">
                  Thank you! Your receipt and lifetime access link have been confirmed for <strong>{email}</strong>.
                </p>
                <div className="space-y-3">
                  <a
                    href={`/api/store/download?slug=${product.slug}`}
                    download
                    className="block w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold text-center transition-colors shadow-md"
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

                {paymentError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                    ⚠️ {paymentError}
                  </div>
                )}

                <form onSubmit={handleInstantBuy} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4A2508] mb-1.5">
                      Your Email (for PDF delivery &amp; receipt)
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
                    className="w-full py-3.5 px-4 rounded-xl bg-[#E87A1E] hover:bg-[#D66A12] text-white text-sm font-bold shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        <span>Opening Razorpay Secure Checkout...</span>
                      </>
                    ) : (
                      <span>Pay with Razorpay (${product.price.toFixed(2)} USD) →</span>
                    )}
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] text-[#9B8272] pt-2">
                    <span>💳 US &amp; International Cards</span>
                    <span>• Visa</span>
                    <span>• Mastercard</span>
                    <span>• Apple Pay / GPay</span>
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
          Sample Page {activePreviewIndex + 1} of {product.previewPages.length}
        </span>
      </div>

      {product.previewPages.length > 0 ? (
        <div>
          {/* Active Sample Page Display */}
          <div className="bg-[#FAF4EC] rounded-2xl p-4 sm:p-6 mb-6">
            <div className="relative aspect-[3/4] max-h-[550px] w-full rounded-xl overflow-hidden bg-white shadow-md mx-auto">
              <Image
                src={product.previewPages[activePreviewIndex]?.imageUrl}
                alt={product.previewPages[activePreviewIndex]?.title}
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-4 p-4 rounded-xl bg-white border border-[#F0E8D8]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E87A1E] block mb-1">
                Excerpt from Page #{product.previewPages[activePreviewIndex]?.pageNumber}:
              </span>
              <h4 className="font-bold text-sm text-[#4A2508] mb-1">
                {product.previewPages[activePreviewIndex]?.title}
              </h4>
              <p className="text-xs text-[#6D5D53] italic leading-relaxed">
                &ldquo;{product.previewPages[activePreviewIndex]?.highlightText}&rdquo;
              </p>
            </div>
          </div>

          {/* Sample Page Selector Thumbnails */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {product.previewPages.map((page, idx) => (
              <button
                key={idx}
                onClick={() => setActivePreviewIndex(idx)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePreviewIndex === idx
                    ? "bg-[#E87A1E] text-white shadow-md shadow-[#E87A1E]/20 scale-105"
                    : "bg-[#FFFBF7] text-[#4A2508] border border-[#F0E8D8] hover:border-[#E87A1E]"
                }`}
              >
                Page {page.pageNumber}: {page.title}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-xs text-[#9B8272]">No preview pages available.</p>
      )}
    </div>
  );
}
