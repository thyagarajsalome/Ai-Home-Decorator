// components/Header.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook

const Header: React.FC = () => {
  const { currentUser, signOut } = useAuth(); // Get auth state and sign out function
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Add state for mobile menu

  const handleLogout = async () => {
    try {
      await signOut();
      setIsMobileMenuOpen(false); // Close menu on logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Helper to close the menu when a link is clicked
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="py-6 px-4 border-b border-gray-700/50 relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* --- MODIFIED BLOCK --- */}
        <div className="flex-shrink-0 flex items-center gap-x-4">
          {/* 1. LOGO SIZE INCREASED */}
          <Link to="/" onClick={closeMenu}>
            <img
              src="/icons/icon-512x512_bg.png" // Path from public folder
              alt="AI Home Decorator Logo"
              className="h-18 w-18 md:h-20 md:w-20 rounded-lg" // Responsive size increased
            />
          </Link>

          {/* 2. TEXT CONTENT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              <Link to="/" onClick={closeMenu}>
                AI Home Decorator
              </Link>
            </h1>
            <p className="mt-2 text-lg text-gray-400 max-w-2xl">
              See your dream space come to life in seconds.
            </p>
          </div>
        </div>
        {/* --- END MODIFIED BLOCK --- */}

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-white p-2 rounded-md"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              // Close Icon (X)
              <svg
                className="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger Icon
              <svg
                className="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Navigation (hidden on mobile) */}
        <nav className="hidden md:flex gap-4 md:gap-6 items-center">
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
        </nav>
      </div>

      {/* --- Mobile Menu (Dropdown) --- */}
      <div
        className={`
          md:hidden 
          ${isMobileMenuOpen ? "block" : "hidden"} 
          absolute top-full left-0 w-full bg-gray-900 border-b border-gray-700/50 z-20 shadow-lg
        `}
      >
        <nav className="flex flex-col gap-4 px-4 pt-4 pb-6">
          <Link
            to="/"
            onClick={closeMenu}
            className="text-gray-300 hover:text-purple-400 transition-colors text-lg p-2 rounded-md hover:bg-gray-800"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={closeMenu}
            className="text-gray-300 hover:text-purple-400 transition-colors text-lg p-2 rounded-md hover:bg-gray-800"
          >
            About
          </Link>
          <Link
            to="/legal"
            onClick={closeMenu}
            className="text-gray-300 hover:text-purple-400 transition-colors text-lg p-2 rounded-md hover:bg-gray-800"
          >
            Terms & Policy
          </Link>

          <hr className="border-gray-700 my-2" />

          {currentUser ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors w-full text-lg"
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col gap-4">
              <Link
                to="/login"
                onClick={closeMenu}
                className="text-gray-300 hover:text-purple-400 transition-colors text-lg p-2 rounded-md hover:bg-gray-800 text-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={closeMenu}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors w-full text-lg text-center"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
