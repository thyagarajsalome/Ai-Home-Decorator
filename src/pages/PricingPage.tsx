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
  priceId: string;
}

const creditPacks: CreditPack[] = [
  {
    name: "Starter Pack",
    credits: 15,
    price: 398, // CHANGED FROM 199
    priceId: "pack_starter",
  },
  {
    name: "Best Value",
    credits: 50,
    price: 998, // CHANGED FROM 499
    priceId: "pack_value",
  },
  {
    name: "Pro Pack",
    credits: 120,
    price: 1998, // CHANGED FROM 999
    priceId: "pack_pro",
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
  // @ts-ignore - Ignore TS error if AuthContext isn't fully updated yet
  const { currentUser, getIdToken, isAppMode } = useAuth();
  const navigate = useNavigate();

  // --- SECURITY: HIDE PAGE IN APP ---
  // If user is in the Android App, kick them to Home immediately
  useEffect(() => {
    if (isAppMode) {
      navigate("/");
    }
  }, [isAppMode, navigate]);

  // Stop rendering if we are in the app (prevents flash of content)
  if (isAppMode) return null;
  // ----------------------------------

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
      setError(
        "Payment gateway is not ready. Please wait a moment or refresh."
      );
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
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
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
                disabled={isProcessing || !currentUser || !scriptLoaded}
                className={`w-full px-6 py-3 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-300 ${
                  pack.name === "Best Value"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    : "bg-gray-700 hover:bg-gray-600"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
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
