"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CreditPack {
  name: string;
  credits: number;
  price: number;
  priceId: string;
  description: string;
  popular?: boolean;
}

const creditPacks: CreditPack[] = [
  {
    name: "Starter Pack",
    credits: 5,
    price: 249,
    priceId: "pack_starter",
    description: "Ideal for testing new room styles quickly."
  },
  {
    name: "Pro Pack",
    credits: 15,
    price: 499,
    priceId: "pack_pro",
    description: "Best choice for complete home transformations.",
    popular: true
  },
  {
    name: "Elite Pack",
    credits: 50,
    price: 1249,
    priceId: "pack_elite",
    description: "For design professionals and heavy creators.",
  },
];

const loadScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const PricingPage: React.FC = () => {
  const { currentUser, getIdToken, isAppMode, refreshCredits } = useAuth();
  const router = useRouter();

  // Hide pricing in TWA/PWA app mode to comply with Play Store policies
  useEffect(() => {
    if (isAppMode) {
      router.push("/");
    }
  }, [isAppMode, router]);

  if (isAppMode) return null;

  const [loadingPackId, setLoadingPackId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js").then(
      (loaded) => {
        if (loaded) {
          setScriptLoaded(true);
        } else {
          setError("Could not load payment gateway. Please refresh the page.");
        }
      }
    );
  }, []);

  const handlePurchase = async (pack: CreditPack) => {
    setLoadingPackId(pack.priceId);
    setError(null);

    if (!currentUser) {
      setError("You must be logged in to make a purchase.");
      setLoadingPackId(null);
      return;
    }

    if (!scriptLoaded) {
      setError("Payment gateway is not ready. Please wait a moment or refresh.");
      setLoadingPackId(null);
      return;
    }

    try {
      const idToken = await getIdToken();
      if (!idToken) {
        setError("Could not authenticate. Please log in again.");
        setLoadingPackId(null);
        return;
      }

      // 1. Create Order
      const orderResponse = await fetch(`/api/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ packId: pack.priceId }),
      });

      if (!orderResponse.ok) {
        const errData = await orderResponse.json();
        throw new Error(errData.error || "Failed to create order.");
      }

      const order = await orderResponse.json();

      // 2. Define Razorpay Options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "AI Home Decorator",
        description: `Purchase ${pack.name}`,
        image: "/icons/icon-512x512.png",
        order_id: order.id,

        handler: async (response: any) => {
          try {
            const verifyResponse = await fetch(`/api/payment-verification`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`,
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (!verifyResponse.ok) {
              const errData = await verifyResponse.json();
              throw new Error(errData.error || "Payment verification failed.");
            }

            // Sync credits immediately on success
            await refreshCredits();

            setLoadingPackId(null);
            setPurchaseSuccess(
              `Payment successful! ${pack.credits} credits have been added to your account.`
            );
          } catch (verifyError: any) {
            console.error("Verification Error:", verifyError);
            setError(`Payment verification failed: ${verifyError.message}`);
            setLoadingPackId(null);
          }
        },

        prefill: {
          name: currentUser.email,
          email: currentUser.email,
        },
        theme: {
          color: "#8b5cf6",
        },
        modal: {
          ondismiss: () => {
            setLoadingPackId(null);
            console.log("Payment dismissed");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", (response: any) => {
        console.error("Payment Failed:", response.error);
        setError(
          `Payment failed: ${
            response.error.description || response.error.reason
          }`
        );
        setLoadingPackId(null);
      });
    } catch (err: any) {
      console.error("Purchase Error:", err);
      setError(err.message || "An error occurred during purchase.");
      setLoadingPackId(null);
    }
  };

  if (purchaseSuccess) {
    return (
      <div className="relative min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg glass-card rounded-2xl p-8 md:p-10 border border-green-500/20 text-center animate-fade">
          <div className="w-16 h-16 bg-green-950/30 border border-green-800/60 rounded-full flex items-center justify-center text-green-400 mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 font-heading">
            Payment Successful!
          </h2>
          <p className="text-sm text-green-700 dark:text-green-300 opacity-90 mb-8 max-w-sm mx-auto">
            {purchaseSuccess}
          </p>
          <button
            onClick={() => router.push("/")}
            className="w-full max-w-xs mx-auto py-3.5 text-sm font-bold text-white rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg"
          >
            Go to Studio
          </button>
        </div>
      </div>
    );
  }

  const isProcessing = loadingPackId !== null;

  return (
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center mb-16 animate-fade relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight font-heading mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 dark:from-purple-400 dark:to-pink-500 bg-clip-text text-transparent">
          Purchase Design Credits
        </h1>
        <p className="text-base text-gray-550 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-semibold">
          Your initial credits are just the beginning. Select a package below to keep redecorating and testing gorgeous new styles.
        </p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-red-650 dark:text-red-350 rounded-xl text-center text-sm animate-fade max-w-xl mx-auto">
          <p>{error}</p>
        </div>
      )}

      {/* Grid of packs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch relative z-10 animate-slideUp">
        {creditPacks.map((pack) => {
          const isThisPackLoading = loadingPackId === pack.priceId;
          return (
            <div
              key={pack.name}
              className={`relative bg-white dark:bg-obsidian-900/95 border rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 shadow-md ${
                pack.popular
                  ? "border-purple-500 shadow-xl shadow-purple-500/10 scale-105 md:-translate-y-2 z-10"
                  : "border-gray-200 dark:border-gray-800/80 hover:border-gray-300 dark:hover:border-gray-700 hover:scale-[1.02]"
              }`}
            >
              {/* Popular Badge */}
              {pack.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-[10px] font-extrabold text-white uppercase tracking-wider shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{pack.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal mb-6 font-semibold">
                  {pack.description}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
                    ₹{pack.price}
                  </span>
                  <span className="text-xs text-gray-550 font-semibold uppercase tracking-wider">
                    One-Time
                  </span>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800/60 my-6"></div>

                {/* Features List */}
                <ul className="space-y-3.5 text-sm text-gray-600 dark:text-gray-300 mb-8 font-semibold">
                  <li className="flex items-center gap-2.5">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-50 dark:bg-purple-950/40 border border-purple-150 dark:border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span><strong>{pack.credits}</strong> Generations</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-50 dark:bg-purple-950/40 border border-purple-150 dark:border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span>All Style Themes Included</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-50 dark:bg-purple-950/40 border border-purple-150 dark:border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span>No Expiration Date</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handlePurchase(pack)}
                disabled={isProcessing || !currentUser || !scriptLoaded}
                className={`w-full py-3 text-sm font-bold text-white rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${
                  pack.popular
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-purple-500/10 hover:shadow-purple-500/25"
                    : "bg-white dark:bg-obsidian-800 hover:bg-gray-50 dark:hover:bg-obsidian-750 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-transparent hover:border-gray-400"
                } disabled:opacity-50 disabled:scale-100 disabled:shadow-none disabled:cursor-not-allowed`}
              >
                {isThisPackLoading ? (
                  <span className="flex items-center justify-center gap-1.5">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Buy Now"
                )}
              </button>
            </div>
          );
        })}
      </div>

      {!currentUser && (
        <div className="mt-12 text-center bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-500/20 p-5 rounded-2xl shadow-lg max-w-lg mx-auto animate-fade relative z-10 text-purple-700 dark:text-purple-300">
          <p className="text-sm font-semibold">
            Please{" "}
            <Link
              href="/login"
              className="font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline transition-colors"
            >
              Login
            </Link>{" "}
            or{" "}
            <Link
              href="/signup"
              className="font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline transition-colors"
            >
              Sign Up
            </Link>{" "}
            to purchase credits.
          </p>
        </div>
      )}

      {/* Trust badges footer */}
      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-center text-xs text-gray-500 dark:text-gray-550 relative z-10 font-semibold">
        <span>Payment Gateway Secured by Razorpay</span>
        <div className="flex gap-4 opacity-70">
          <span>SSL 256-bit Encryption</span>
          <span>&bull;</span>
          <span>Instant Credit Top-up</span>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
