// src/pages/PricingPage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import { supabase } from "../supabaseClient"; // No longer needed here

// --- NEW: Define types for safety ---
declare global {
  interface Window {
    Razorpay: any; // Define Razorpay on the window object
  }
}

interface CreditPack {
  name: string;
  credits: number;
  price: number;
  priceId: string; // We'll use pack.name as the ID, but keep this structure
}

// Define the credit pack options
// Define the credit pack options
const creditPacks: CreditPack[] = [
  {
    name: "Starter Pack",
    credits: 15,
    price: 199, // Use Rupees
    priceId: "pack_starter",
  },
  {
    name: "Best Value",
    credits: 50,
    price: 499, // Use Rupees
    priceId: "pack_value",
  },
  {
    name: "Pro Pack",
    credits: 120,
    price: 999, // Use Rupees
    priceId: "pack_pro",
  },
];

// --- NEW: Get the backend URL (use the one from geminiService) ---
const BACKEND_URL = "http://localhost:8080";

const PricingPage: React.FC = () => {
  const { currentUser, getIdToken } = useAuth(); // <-- Get getIdToken
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- THIS IS THE MAIN LOGIC ---
  const handlePurchase = async (pack: CreditPack) => {
    setLoading(true);
    setError(null);

    if (!currentUser) {
      setError("You must be logged in to make a purchase.");
      setLoading(false);
      return;
    }

    try {
      const idToken = await getIdToken();
      if (!idToken) {
        setError("Could not authenticate. Please log in again.");
        setLoading(false);
        return;
      }

      // 1. Create Order: Call your backend to create a Razorpay order
      const orderResponse = await fetch(`${BACKEND_URL}/api/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ packName: pack.name }),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create order.");
      }

      const order = await orderResponse.json();

      // 2. Define Razorpay Options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount, // Amount is in cents/paise
        currency: order.currency,
        name: "AI Home Decorator",
        description: `Purchase ${pack.name}`,
        image: "/icons/icon-512x512.png", // Your app logo
        order_id: order.id,

        // 3. Define the payment handler
        handler: async (response: any) => {
          try {
            // 4. Verify Payment: Send payment details to your backend
            const verifyResponse = await fetch(
              `${BACKEND_URL}/api/payment-verification`,
              {
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
              }
            );

            if (!verifyResponse.ok) {
              throw new Error("Payment verification failed.");
            }

            await verifyResponse.json();

            // Success!
            alert(
              `Payment successful! ${pack.credits} credits have been added to your account.`
            );
            // You could also redirect to the homepage or update credits in AuthContext
          } catch (verifyError) {
            console.error("Verification Error:", verifyError);
            setError("Payment verification failed. Please contact support.");
          } finally {
            setLoading(false);
          }
        },

        // 5. Prefill user details
        prefill: {
          name: currentUser.email, // Or a name field if you collect it
          email: currentUser.email,
        },
        theme: {
          color: "#8b5cf6", // Purple
        },
        modal: {
          ondismiss: () => {
            setLoading(false); // Stop loading if user closes modal
            console.log("Payment dismissed");
          },
        },
      };

      // 6. Open the Razorpay Checkout Modal
      const rzp = new window.Razorpay(options);
      rzp.open();

      // Handle payment failure
      rzp.on("payment.failed", (response: any) => {
        console.error("Payment Failed:", response.error);
        setError(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });
    } catch (err: any) {
      console.error("Purchase Error:", err);
      setError(err.message || "An error occurred during purchase.");
      setLoading(false);
    }
  };

  // --- HERE IS THE FULL RETURN, with the onClick fix ---
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
        {creditPacks.map((pack) => (
          <div
            key={pack.name}
            className={`bg-gray-800 rounded-2xl shadow-xl p-8 border ${
              pack.name === "Best Value"
                ? "border-purple-500"
                : "border-gray-700"
            } flex flex-col`}
          >
            <h2 className="text-2xl font-bold text-white mb-2">{pack.name}</h2>
            <p
              className={`text-sm font-semibold mb-4 ${
                pack.name === "Best Value" ? "text-purple-400" : "text-gray-400"
              }`}
            >
              {pack.name === "Best Value"
                ? "Most Popular"
                : "One-time purchase"}
            </p>

            <div className="mb-6">
              <span className="text-5xl font-extrabold text-white">
                ₹{pack.price} {/* FIX: Change '$' to '₹' */}
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
              onClick={() => handlePurchase(pack)} // <-- FIX: Pass the 'pack' object
              disabled={loading || !currentUser}
              className={`w-full px-6 py-3 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-300 ${
                pack.name === "Best Value"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  : "bg-gray-700 hover:bg-gray-600"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? "Processing..." : "Buy Now"}
            </button>
          </div>
        ))}
      </div>
      {!currentUser && (
        <p className="text-center text-yellow-400 mt-8">
          Please{" "}
          <Link to="/login" className="underline hover:text-yellow-300">
            Login
          </Link>{" "}
          or{" "}
          <Link to="/signup" className="underline hover:text-yellow-300">
            Sign Up
          </Link>{" "}
          to purchase credits.
        </p>
      )}
    </div>
  );
};

export default PricingPage;
