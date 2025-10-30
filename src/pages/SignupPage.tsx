// src/pages/SignupPage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient"; // <-- Import Supabase

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setVerificationSent(false);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }

      // Check if user object exists and email confirmation is required
      if (data.user && !data.user.email_confirmed_at) {
        setVerificationSent(true);
      } else if (data.user) {
        // User is created and auto-confirmed (if enabled)
        setVerificationSent(true); // Still show a success message
      }
    } catch (err: any) {
      console.error("Signup failed:", err);
      setError(err.message || "Failed to create an account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <div className="bg-gray-800/80 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-700/50 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Sign Up
        </h1>

        {verificationSent && (
          <div className="mb-4 p-3 bg-green-900/50 border border-green-700 text-green-300 rounded-lg text-center">
            <p>
              Account created! Please check your email ({email}) to verify your
              address before logging in.
            </p>
          </div>
        )}

        {!verificationSent && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
                placeholder="********"
                disabled={loading}
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
                placeholder="********"
                disabled={loading}
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-6 py-3 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-300 ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:scale-105"
              } disabled:opacity-50 disabled:scale-100`}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
        )}

        <p className="text-center text-gray-400 mt-4">
          {verificationSent ? (
            <Link to="/login" className="text-purple-400 hover:underline">
              Proceed to Login
            </Link>
          ) : (
            <>
              Already have an account?{" "}
              <Link to="/login" className="text-purple-400 hover:underline">
                Log In
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
