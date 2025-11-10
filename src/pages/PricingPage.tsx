// src/pages/PricingPage.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Define Razorpay on the window object
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CreditPack {
  name: string;
  credits: number;
  price: number;
  priceId: string; // This is our internal ID, e.g., "pack_starter"
}

// Credit packs (matches the map in your server.js)
const creditPacks: CreditPack[] = [
  {
    name: "Starter Pack",
    credits: 15,
    price: 199, // Price in INR
    priceId: "pack_starter",
  },
  {
    name: "Best Value",
    credits: 50,
    price: 499, // Price in INR
    priceId: "pack_value",
  },
  {
    name: "Pro Pack",
    credits: 120,
    price: 999, // Price in INR
    priceId: "pack_pro",
  },
];

// Helper function to load the Razorpay script
const loadScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const PricingPage: React.FC = () => {
  const { currentUser, getIdToken } = useAuth();

  // --- 1. CHANGED: Make loading state specific to the pack ID ---
  const [loadingPackId, setLoadingPackId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // State to track if script is loaded
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // --- 2. CHANGED: Add state for styled success message ---
  const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null);

  // Load the Razorpay script when the component mounts
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
    // --- 3. CHANGED: Use setLoadingPackId ---
    setLoadingPackId(pack.priceId);
    setError(null);

    if (!currentUser) {
      setError("You must be logged in to make a purchase.");
      setLoadingPackId(null); // Reset loading
      return;
    }

    if (!scriptLoaded) {
      setError(
        "Payment gateway is not ready. Please wait a moment or refresh."
      );
      setLoadingPackId(null); // Reset loading
      return;
    }

    try {
      const idToken = await getIdToken();
      if (!idToken) {
        setError("Could not authenticate. Please log in again.");
        setLoadingPackId(null); // Reset loading
        return;
      }

      // 1. Create Order: Call your backend
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
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "AI Home Decorator",
        description: `Purchase ${pack.name}`,
        image: "/icons/icon-512x512.png",
        order_id: order.id,

        // 3. Define the payment handler
        handler: async (response: any) => {
          try {
            // 4. Verify Payment
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

            // --- 4. CHANGED: Set success message instead of alert/navigate ---
            setLoadingPackId(null); // Stop loading
            setPurchaseSuccess(
              `Payment successful! ${pack.credits} credits have been added to your account.`
            );
          } catch (verifyError: any) {
            console.error("Verification Error:", verifyError);
            setError(
              `Payment verification failed. Please contact support. ${verifyError.message}`
            );
            setLoadingPackId(null); // Stop loading
          }
        },

        prefill: {
          name: currentUser.email,
          email: currentUser.email,
        },
        theme: {
          color: "#8b5cf6", // Purple
        },
        modal: {
          ondismiss: () => {
            setLoadingPackId(null); // Stop loading if user closes modal
            console.log("Payment dismissed");
          },
        },
      };

      // 6. Open the Razorpay Checkout Modal
      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", (response: any) => {
        console.error("Payment Failed:", response.error);
        setError(
          `Payment failed: ${
            response.error.description || response.error.reason
          }`
        );
        setLoadingPackId(null); // Stop loading
      });
    } catch (err: any) {
      console.error("Purchase Error:", err);
      setError(err.message || "An error occurred during purchase.");
      setLoadingPackId(null); // Stop loading
    }
  };

  // --- 2. (CONTINUED) RENDER STYLED SUCCESS MESSAGE ---
  if (purchaseSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-green-700">
          <h2 className="text-3xl font-bold text-white mb-4">
            Payment Successful!
          </h2>
          <p className="text-lg text-green-300 mb-8">{purchaseSuccess}</p>
          <button
            onClick={() => navigate("/")}
            className="w-full max-w-xs mx-auto px-6 py-3 text-lg font-bold text-white rounded-lg shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // --- 1. (CONTINUED) Check if *any* pack is processing ---
  const isProcessing = loadingPackId !== null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center text-white mb-4">
        Get More Credits
      </h1>
      <p className="text-lg text-gray-300 text-center mb-10">
        Your free trial credits are just the beginning. Purchase a credit pack
        to continue creating.
      </p>

      {error && (
        <div className="mb-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {creditPacks.map((pack) => {
          // --- 1. (CONTINUED) Check if *this* pack is the one processing ---
          const isThisPackLoading = loadingPackId === pack.priceId;

          return (
            <div
              key={pack.name}
              className={`bg-gray-800 rounded-2xl shadow-xl p-8 border ${
                pack.name === "Best Value"
                  ? "border-purple-500"
                  : "border-gray-700"
              } flex flex-col`}
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                {pack.name}
              </h2>
              <p
                className={`text-sm font-semibold mb-4 ${
                  pack.name === "Best Value"
                    ? "text-purple-400"
                    : "text-gray-400"
                }`}
              >
                {pack.name === "Best Value"
                  ? "Most Popular"
                  : "One-time purchase"}
              </p>

              <div className="mb-6">
                <span className="text-5xl font-extrabold text-white">
                  ₹{pack.price}
                </span>
                <span className="text-gray-400">/one-time</span>
              </div>

              <ul className="space-y-2 text-gray-300 mb-8 flex-grow">
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-green-400 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <strong>{pack.credits}</strong>&nbsp;Generations
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-green-400 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  All Styles Included
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-green-400 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  No Expiry
                </li>
              </ul>

              <button
                onClick={() => handlePurchase(pack)}
                // Disable all buttons if any purchase is processing
                disabled={isProcessing || !currentUser || !scriptLoaded}
                className={`w-full px-6 py-3 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-300 ${
                  pack.name === "Best Value"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    : "bg-gray-700 hover:bg-gray-600"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {/* Only show "Processing..." on the clicked button */}
                {isThisPackLoading ? "Processing..." : "Buy Now"}
              </button>
            </div>
          );
        })}
      </div>

      {!currentUser && (
        <div className="mt-8 text-center bg-gray-700/50 border border-purple-800/60 p-4 rounded-lg shadow-lg max-w-lg mx-auto">
          <p className="text-lg text-gray-200">
            Please{" "}
            <Link
              to="/login"
              className="font-bold text-purple-400 hover:text-purple-300 transition-colors duration-200"
            >
              Login
            </Link>{" "}
            or{" "}
            <Link
              to="/signup"
              className="font-bold text-purple-400 hover:text-purple-300 transition-colors duration-200"
            >
              Sign Up
            </Link>{" "}
            to purchase credits.
          </p>
        </div>
      )}
    </div>
  );
};

export default PricingPage;
