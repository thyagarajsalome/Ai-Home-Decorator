// src/pages/LoginPage.tsx
import React, { useState, useEffect } from "react"; // <-- 1. Import useEffect
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

  // --- 2. CREATE A useEffect TO HANDLE THE REDIRECT ---
  useEffect(() => {
    // If user is already logged in, redirect to home
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]); // <-- Run this effect when currentUser changes
  // --------------------------------------------------

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

      // The useEffect above will handle the redirect,
      // because on successful login, the 'currentUser' will update.
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(
        err.message || "Failed to log in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  // --- 3. REMOVE THE OLD REDIRECT LOGIC ---
  // if (currentUser) {
  //   navigate("/");  <-- THIS IS THE LINE CAUSING THE ERROR
  //   return null;
  // }

  // Only render the login form if there is no user
  if (currentUser) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      {/* ... (rest of the file is the same) ... */}
      // ... (rest of your component)
    </div>
  );
};

export default LoginPage;
