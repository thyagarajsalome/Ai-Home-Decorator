"use client";
// src/components/Header.tsx
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const Header: React.FC = () => {
  const { currentUser, signOut, isAppMode, credits, currentUserRole } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAdmin = currentUserRole === "admin";

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
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-obsidian-950/70 border-b border-gray-200 dark:border-gray-800/40 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo and Brand Title */}
        <div className="flex-shrink-0 flex items-center gap-x-3 md:gap-x-4">
          <Link href="/" onClick={closeMenu} className="transition-transform duration-200 hover:scale-105">
            <img
              src="/icons/icon-512x512_bg.png"
              alt="AI Home Decorator Logo"
              className="h-10 w-10 md:h-12 md:w-12 rounded-xl border border-purple-500/20 shadow-md"
            />
          </Link>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 dark:from-purple-400 dark:to-pink-500 bg-clip-text text-transparent">
              <Link href="/" onClick={closeMenu}>
                AI Home Decorator
              </Link>
            </h1>
            <p className="hidden lg:block text-[10px] md:text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-semibold">
              Visualize your dream spaces in seconds with AI
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-5 text-sm font-bold text-gray-650 dark:text-gray-300">
            <Link
              href="/"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            >
              About
            </Link>

            {!isAppMode && (
              <Link
                href="/pricing"
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
              >
                Pricing
              </Link>
            )}

            <a
              href="https://play.google.com/store/apps/details?id=com.aihomedecorator.twa"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 hover:text-white text-xs font-bold transition-all shadow-sm hover:scale-105"
            >
              <svg className="w-3.5 h-3.5 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.412 13.8533 8.125 12 8.125c-1.8533 0-3.5902.287-5.1368.8247L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.343 14.6589 0 18.761h24c-.343-4.1021-2.6889-7.5743-6.1185-9.4396" />
              </svg>
              <span>Get App</span>
            </a>
          </nav>

          {/* Action buttons and components */}
          <div className="flex items-center gap-4 border-l border-gray-200 dark:border-gray-800/80 pl-6">
            {currentUser ? (
              <div className="flex items-center gap-4">
                {/* Credit balance display */}
                <Link 
                  href="/pricing"
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-500/30 text-purple-750 dark:text-purple-300 text-xs font-bold shadow-inner cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-purple-600 dark:text-purple-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2l4.456.967a1 1 0 01.534 1.735l-3.327 2.93 1.15 4.39a1 1 0 01-1.5 1.09l-3.959-2.52-3.959 2.52a1 1 0 01-1.5-1.09l1.15-4.39-3.327-2.93a1 1 0 01.534-1.735l4.456-.967 1.213-4.456A1 1 0 0112 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    {isAdmin ? "Admin (∞)" : `${credits} Credit${credits !== 1 ? "s" : ""}`}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="cursor-pointer bg-red-50 dark:bg-red-600/10 hover:bg-red-650 text-red-650 dark:text-red-500 hover:text-white border border-red-200 dark:border-red-500/20 text-xs font-bold py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm font-semibold transition-colors py-2"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md shadow-purple-500/10 hover:shadow-purple-500/20"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-1.5 rounded-lg border border-gray-200 dark:border-gray-800/40 hover:bg-gray-100 dark:hover:bg-obsidian-800/50"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="h-6 w-6"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-obsidian-900 border-b border-gray-200 dark:border-gray-800/60 shadow-xl z-20 animate-fade transition-colors duration-300">
          <nav className="flex flex-col gap-2.5 px-4 pt-3 pb-6 text-base font-semibold text-gray-600 dark:text-gray-300">
            {currentUser && (
              <Link
                href="/pricing"
                onClick={closeMenu} 
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-500/20 text-purple-700 dark:text-purple-300 text-sm font-semibold mb-2 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-purple-650 dark:text-purple-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2l4.456.967a1 1 0 01.534 1.735l-3.327 2.93 1.15 4.39a1 1 0 01-1.5 1.09l-3.959-2.52-3.959 2.52a1 1 0 01-1.5-1.09l1.15-4.39-3.327-2.93a1 1 0 01.534-1.735l4.456-.967 1.213-4.456A1 1 0 0112 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  {isAdmin ? "Admin Mode (∞)" : `Balance: ${credits} Credits`}
                </span>
              </Link>
            )}

            <Link
              href="/"
              onClick={closeMenu}
              className="hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-obsidian-850/50 p-2.5 rounded-lg transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-obsidian-850/50 p-2.5 rounded-lg transition-colors"
            >
              About
            </Link>

            {!isAppMode && (
              <Link
                href="/pricing"
                onClick={closeMenu}
                className="hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-obsidian-850/50 p-2.5 rounded-lg transition-colors"
              >
                Pricing
              </Link>
            )}

            <Link
              href="/terms"
              onClick={closeMenu}
              className="hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-obsidian-850/50 p-2.5 rounded-lg transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/policy"
              onClick={closeMenu}
              className="hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-obsidian-850/50 p-2.5 rounded-lg transition-colors"
            >
              Privacy
            </Link>

            <a
              href="https://play.google.com/store/apps/details?id=com.aihomedecorator.twa"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-purple-900/20 border border-purple-500/30 text-purple-300 text-xs font-bold hover:bg-purple-900/40 transition-colors mt-1"
            >
              <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.41 2.41 0 01-.61-.92L3 21.13V2.87l.001-.136a2.41 2.41 0 01.608-.92zM15.207 13.414l2.573 2.574-12.06 6.892 9.487-9.466zM15.207 10.586L5.72 1.12l12.06 6.892-2.573 2.574zm1.414 1.414l3.164-1.808a1.5 1.5 0 010 2.616l-3.164 1.808-1.414-1.414 1.414-1.202z"/>
              </svg>
              <span>Get Android App (Google Play)</span>
            </a>

            <hr className="border-gray-200 dark:border-gray-800 my-2" />

            {currentUser ? (
              <button
                onClick={handleLogout}
                className="cursor-pointer bg-red-50 dark:bg-red-600/10 hover:bg-red-600 text-red-650 dark:text-red-500 hover:text-white border border-red-200 dark:border-red-500/20 font-bold py-3 px-4 rounded-lg transition-all w-full text-center"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-semibold p-2.5 text-center hover:bg-gray-100 dark:hover:bg-obsidian-850/50 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={closeMenu}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-4 rounded-lg text-center transition-all shadow-md shadow-purple-500/10"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
