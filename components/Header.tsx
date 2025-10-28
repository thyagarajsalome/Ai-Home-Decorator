// components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook

const Header: React.FC = () => {
  const { currentUser, signOut } = useAuth(); // Get auth state and sign out function

  const handleLogout = async () => {
    try {
      await signOut();
      // Optional: Redirect or show a message after logout
    } catch (error) {
      console.error("Logout failed:", error);
      // Optional: Show error message to user
    }
  };

  return (
    <header className="py-6 px-4 border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* ... Title and Description ... */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            <Link to="/">AI Home Decorator</Link>
          </h1>
          <p className="mt-2 text-lg text-gray-400 max-w-2xl mx-auto md:mx-0">
            {" "}
            {/* Adjusted margin for alignment */}
            See your dream space come to life in seconds.
          </p>
        </div>

        <nav className="flex gap-4 md:gap-6 items-center">
          {" "}
          {/* Added items-center */}
          <Link
            to="/"
            className="text-gray-300 hover:text-purple-400 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-300 hover:text-purple-400 transition-colors"
          >
            About
          </Link>
          <Link
            to="/legal"
            className="text-gray-300 hover:text-purple-400 transition-colors"
          >
            Terms & Policy
          </Link>
          {/* --- Conditional Auth Buttons --- */}
          {currentUser ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
          {/* ----------------------------- */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
