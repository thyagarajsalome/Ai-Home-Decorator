import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

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
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(
        err.message || "Failed to log in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  if (currentUser) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <div className="bg-white dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm transition-colors duration-300">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
              placeholder="********"
            />
          </div>
          {error && (
            <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-6 py-3 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-300 ${
              loading
                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:scale-105"
            } disabled:opacity-50 disabled:scale-100`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
