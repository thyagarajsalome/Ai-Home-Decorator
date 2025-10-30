// src/pages/PricingPage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

// Define the credit pack options
const creditPacks = [
  {
    name: "Starter Pack",
    credits: 15,
    price: 1.99,
    priceId: "YOUR_STRIPE_PRICE_ID_1", // Replace with your payment provider's ID
  },
  {
    name: "Best Value",
    credits: 50,
    price: 4.99,
    priceId: "YOUR_STRIPE_PRICE_ID_2", // Replace with your payment provider's ID
  },
  {
    name: "Pro Pack",
    credits: 120,
    price: 9.99,
    priceId: "YOUR_STRIPE_PRICE_ID_3", // Replace with your payment provider's ID
  },
];

const PricingPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async (priceId: string) => {
    setLoading(true);
    setError(null);

    if (!currentUser) {
      setError("You must be logged in to make a purchase.");
      setLoading(false);
      return;
    }

    // --- IMPORTANT ---
    // This is where you would integrate your payment provider (e.g., Stripe).
    // You would redirect to a checkout page.
    // The payment provider would then call a Supabase Edge Function (webhook)
    // to securely update the user's credits upon successful payment.
    //
    // DO NOT add credits from the frontend, it is not secure.
    // The code below is a placeholder to explain the concept.
    //
    console.log("Redirecting to checkout for price ID:", priceId);
    setError(
      "Payment processing is not yet implemented. This is a developer placeholder."
    );
    //
    // Example:
    // const stripe = await getStripe();
    // await stripe.redirectToCheckout({ lineItems: [{ price: priceId, quantity: 1 }] });
    //
    setLoading(false);
  };

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
                ${pack.price}
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
              onClick={() => handlePurchase(pack.priceId)}
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
