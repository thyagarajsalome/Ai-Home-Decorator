"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabaseClient";
import { useAuth } from "@/context/AuthContext";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }

    // Check for error in hash or query parameters (from OAuth redirect callback)
    const hashParams = new URLSearchParams(window.location.hash.replace("#", "?"));
    const queryParams = new URLSearchParams(window.location.search);
    const errorDesc =
      hashParams.get("error_description") ||
      queryParams.get("error_description") ||
      hashParams.get("error") ||
      queryParams.get("error");

    if (errorDesc) {
      setError(decodeURIComponent(errorDesc.replace(/\+/g, " ")));
    }
  }, [currentUser, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }
      router.push("/");
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(
        err.message || "Failed to log in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/login`,
        queryParams: {
          prompt: "select_account",
        },
      },
    });

    if (error) {
      console.error("Error logging in with Google:", error.message);
      setError(error.message || "Failed to log in with Google.");
    }
  };

  if (currentUser) {
    return null;
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#FFFBF7]">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 sm:p-10 border border-[#FCD7BA] animate-fade relative z-10">
        
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-3 group">
            <div className="relative w-16 h-16 mx-auto rounded-2xl overflow-hidden shadow-md border-2 border-[#FCD7BA] group-hover:scale-105 transition-transform">
              <Image
                src="/brand/logo.jpg"
                alt="AI Home Decorator Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-[#4A2508] tracking-tight font-heading">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-[#7A4B27] mt-1 font-medium">
            Sign in to your AI Home Decorator account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-bold uppercase tracking-wider text-[#4A2508] mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#BFA08B]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 pl-11 rounded-xl bg-[#FFFBF7] border border-[#E2CEBD] text-[#382A22] placeholder-[#BFA08B] focus:outline-none focus:ring-2 focus:ring-[#E87A1E] focus:border-transparent transition-all text-sm"
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-bold uppercase tracking-wider text-[#4A2508] mb-2"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#BFA08B]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 pl-11 rounded-xl bg-[#FFFBF7] border border-[#E2CEBD] text-[#382A22] placeholder-[#BFA08B] focus:outline-none focus:ring-2 focus:ring-[#E87A1E] focus:border-transparent transition-all text-sm"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-700 text-xs bg-red-50 border border-red-200 p-3 rounded-xl font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 flex-shrink-0 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 text-sm font-extrabold text-white rounded-xl bg-gradient-to-r from-[#E87A1E] to-[#D46513] hover:from-[#F28C32] hover:to-[#E87A1E] transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-[#E87A1E]/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-[#F1E4D5]"></div>
          <span className="mx-4 text-xs font-bold uppercase tracking-wider text-[#A69588]">or</span>
          <div className="flex-grow border-t border-[#F1E4D5]"></div>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white text-[#4A2508] border border-[#E2CEBD] hover:border-[#E87A1E] hover:bg-[#FFFBF7] font-bold py-3 px-4 rounded-xl transition-all shadow-xs text-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        {/* Link to Sign up */}
        <div className="mt-8 pt-6 border-t border-[#F1E4D5] text-center">
          <p className="text-xs sm:text-sm font-semibold text-[#6D5D53]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#E87A1E] hover:underline font-bold transition-colors"
            >
              Create Account &rarr;
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
