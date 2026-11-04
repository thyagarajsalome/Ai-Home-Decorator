"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.aihomedecorator.twa";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, signOut } = useAuth();

  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = async () => {
    try {
      await signOut();
      closeMenu();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#F1E4D5] shadow-[0_2px_15px_-3px_rgba(74,37,8,0.06)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Brand Logo & Title */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-3 group transition-transform duration-200 hover:scale-[1.02]"
        >
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-sm border border-[#FCD7BA] bg-white flex-shrink-0">
            <Image
              src="/brand/logo.jpg"
              alt="AI Home Decorator Logo"
              fill
              className="object-cover"
              sizes="48px"
              priority
            />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-xl sm:text-2xl font-black font-heading bg-gradient-to-r from-[#E87A1E] to-[#D46513] bg-clip-text text-transparent">
                AI
              </span>
              <span className="text-xl sm:text-2xl font-extrabold font-heading text-[#4A2508]">
                Home Decorator
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-[#7A4B27] uppercase mt-0.5">
              DESIGN • DECORATE • VISUALIZE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex items-center gap-5 text-sm font-bold text-[#5C3314]">
            <Link
              href="/"
              className="hover:text-[#E87A1E] transition-colors duration-150"
            >
              Home
            </Link>
            <Link
              href="/#rooms"
              className="hover:text-[#E87A1E] transition-colors duration-150"
            >
              Room Ideas
            </Link>
            <Link
              href="/#styles"
              className="hover:text-[#E87A1E] transition-colors duration-150"
            >
              Design Styles
            </Link>
            <Link
              href="/usa"
              className="hover:text-[#E87A1E] transition-colors duration-150 flex items-center gap-1"
            >
              <span>🇺🇸</span>
              <span>US Cities</span>
            </Link>
            <Link
              href="/about"
              className="hover:text-[#E87A1E] transition-colors duration-150"
            >
              About
            </Link>
          </nav>

          {/* Auth State & Primary Actions */}
          <div className="flex items-center gap-3 border-l border-[#F1E4D5] pl-5">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEEDDF] border border-[#F8B98B] text-xs font-bold text-[#4A2508]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="max-w-[130px] truncate">{currentUser.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-[#8D3D10] hover:text-[#E87A1E] transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/login"
                  className="text-xs sm:text-sm font-bold text-[#4A2508] hover:text-[#E87A1E] transition-colors px-2 py-1"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="btn-brand-secondary px-3.5 py-1.5 text-xs font-bold"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand-primary px-4 py-2 text-xs sm:text-sm font-extrabold flex items-center gap-1.5 group shadow-md"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.412 13.8533 8.125 12 8.125c-1.8533 0-3.5902.287-5.1368.8247L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.343 14.6589 0 18.761h24c-.343-4.1021-2.6889-7.5743-6.1185-9.4396" />
              </svg>
              <span>Get App</span>
            </a>
          </div>
        </div>

        {/* Mobile Action & Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          {currentUser ? (
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-[#8D3D10] px-2 py-1"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/login"
              className="text-xs font-bold text-[#4A2508] px-2 py-1 hover:text-[#E87A1E]"
            >
              Sign In
            </Link>
          )}

          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand-primary px-3 py-1.5 text-xs font-bold"
          >
            Get App
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-[#4A2508] hover:bg-[#FEEDDF] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#F1E4D5] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-fade">
          {currentUser ? (
            <div className="p-3 rounded-xl bg-[#FFFBF7] border border-[#F1E4D5] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-[#4A2508] truncate max-w-[200px]">
                  {currentUser.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs font-bold text-[#8D3D10] hover:underline"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#F1E4D5]">
              <Link
                href="/login"
                onClick={closeMenu}
                className="text-center py-2 rounded-xl border border-[#F1E4D5] bg-[#FFFBF7] text-xs font-bold text-[#4A2508]"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={closeMenu}
                className="btn-brand-secondary text-center py-2 text-xs font-bold"
              >
                Sign Up
              </Link>
            </div>
          )}

          <Link
            href="/"
            onClick={closeMenu}
            className="block px-3 py-2 rounded-lg text-sm font-bold text-[#4A2508] hover:bg-[#FFF8F2]"
          >
            Home
          </Link>
          <Link
            href="/#rooms"
            onClick={closeMenu}
            className="block px-3 py-2 rounded-lg text-sm font-bold text-[#4A2508] hover:bg-[#FFF8F2]"
          >
            Room Ideas
          </Link>
          <Link
            href="/#styles"
            onClick={closeMenu}
            className="block px-3 py-2 rounded-lg text-sm font-bold text-[#4A2508] hover:bg-[#FFF8F2]"
          >
            Design Styles
          </Link>
          <Link
            href="/usa"
            onClick={closeMenu}
            className="block px-3 py-2 rounded-lg text-sm font-bold text-[#4A2508] hover:bg-[#FFF8F2]"
          >
            🇺🇸 USA Cities Directory
          </Link>
          <Link
            href="/about"
            onClick={closeMenu}
            className="block px-3 py-2 rounded-lg text-sm font-bold text-[#4A2508] hover:bg-[#FFF8F2]"
          >
            About AI Home Decorator
          </Link>

          <div className="pt-2">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="btn-brand-primary w-full py-3 text-sm font-extrabold flex items-center justify-center gap-2"
            >
              <span>Download Free Android App</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
