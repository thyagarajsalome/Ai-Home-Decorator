// src/components/Header.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
<<<<<<< HEAD
import ThemeToggle from "./ThemeToggle"; // <--- IMPORT

const Header: React.FC = () => {
  const { currentUser, signOut, isAppMode } = useAuth();
=======

const Header: React.FC = () => {
  const { currentUser, signOut, isAppMode } = useAuth(); // Get isAppMode
>>>>>>> d6b5b78483052f659fad9632ab550873cc70e6f9
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="py-6 px-4 border-b border-gray-200 dark:border-gray-700/50 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex-shrink-0 flex items-start gap-x-4">
          <Link to="/" onClick={closeMenu}>
            <img
              src="/icons/icon-512x512_bg.png"
              alt="AI Home Decorator Logo"
              className="h-12 w-12 md:h-16 md:w-16 rounded-lg"
            />
          </Link>
          <div>
<<<<<<< HEAD
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-600 bg-clip-text text-transparent">
=======
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
>>>>>>> d6b5b78483052f659fad9632ab550873cc70e6f9
              <Link to="/" onClick={closeMenu}>
                AI Home Decorator
              </Link>
            </h1>
<<<<<<< HEAD
            <p className="hidden md:block mt-2 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
=======
            <p className="hidden md:block mt-2 text-lg text-gray-400 max-w-2xl">
>>>>>>> d6b5b78483052f659fad9632ab550873cc70e6f9
              See your dream space come to life in seconds.
            </p>
          </div>
        </div>

<<<<<<< HEAD
        <div className="flex items-center gap-4">
          {/* THEME TOGGLE (Desktop & Mobile) */}
          <ThemeToggle />

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white p-2 rounded-md"
            >
              <svg
                className="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
=======
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-white p-2 rounded-md"
          >
            <svg
              className="h-7 w-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
>>>>>>> d6b5b78483052f659fad9632ab550873cc70e6f9
        </div>

        <nav className="hidden md:flex gap-4 md:gap-6 items-center">
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            About
          </Link>

<<<<<<< HEAD
          {!isAppMode && (
            <Link
              to="/pricing"
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
=======
          {/* --- ONLY SHOW PRICING FOR WEB USERS --- */}
          {!isAppMode && (
            <Link
              to="/pricing"
              className="text-gray-300 hover:text-purple-400 transition-colors"
>>>>>>> d6b5b78483052f659fad9632ab550873cc70e6f9
            >
              Pricing
            </Link>
          )}
<<<<<<< HEAD
=======
          {/* --------------------------------------- */}
>>>>>>> d6b5b78483052f659fad9632ab550873cc70e6f9

          <Link
            to="/terms"
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Terms
          </Link>
          <Link
            to="/policy"
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Privacy
          </Link>

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
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
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

<<<<<<< HEAD
      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700/50 z-20 shadow-lg`}
=======
      <div
        className={`md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } absolute top-full left-0 w-full bg-gray-900 border-b border-gray-700/50 z-20 shadow-lg`}
>>>>>>> d6b5b78483052f659fad9632ab550873cc70e6f9
      >
        <nav className="flex flex-col gap-4 px-4 pt-4 pb-6">
          <Link
            to="/"
            onClick={closeMenu}
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-lg p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={closeMenu}
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-lg p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            About
          </Link>

<<<<<<< HEAD
=======
          {/* --- ONLY SHOW PRICING FOR WEB USERS (MOBILE MENU) --- */}
>>>>>>> d6b5b78483052f659fad9632ab550873cc70e6f9
          {!isAppMode && (
            <Link
              to="/pricing"
              onClick={closeMenu}
<<<<<<< HEAD
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-lg p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
=======
              className="text-gray-300 hover:text-purple-400 transition-colors text-lg p-2 rounded-md hover:bg-gray-800"
>>>>>>> d6b5b78483052f659fad9632ab550873cc70e6f9
            >
              Pricing
            </Link>
          )}
<<<<<<< HEAD
=======
          {/* ----------------------------------------------------- */}
>>>>>>> d6b5b78483052f659fad9632ab550873cc70e6f9

          <Link
            to="/terms"
            onClick={closeMenu}
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-lg p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Terms
          </Link>
          <Link
            to="/policy"
            onClick={closeMenu}
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-lg p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Privacy
          </Link>
<<<<<<< HEAD
          <hr className="border-gray-200 dark:border-gray-700 my-2" />
=======
          <hr className="border-gray-700 my-2" />
>>>>>>> d6b5b78483052f659fad9632ab550873cc70e6f9
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
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-lg p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-center"
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
