"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.aihomedecorator.twa";

const MapPinIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

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
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-[#FCD7BA] shadow-xs group-hover:scale-105 transition-transform duration-200 bg-white flex-shrink-0">
            <Image
              src="/brand/logo.jpg"
              alt="AI Home Decorator Logo"
              fill
              className="object-cover"
              priority
              sizes="40px"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1 font-heading font-black text-lg sm:text-xl tracking-tight leading-none">
              <span className="text-[#E87A1E]">AI</span>
              <span className="text-[#4A2508]">Home Decorator</span>
            </div>
            <span className="text-[9px] font-bold tracking-widest text-[#7A4B27] uppercase mt-0.5">
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
              className="hover:text-[#E87A1E] transition-colors duration-150 flex items-center gap-1.5"
            >
              <MapPinIcon className="w-3.5 h-3.5 text-[#E87A1E]" />
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

            {/* Direct Google Play Store App CTA */}
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand-primary px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#E87A1E]/20 hover:shadow-lg hover:shadow-[#E87A1E]/30"
            >
              <svg
                className="w-3.5 h-3.5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.61-1.63V3.444c0-.623.228-1.2.61-1.63zm11.237 11.24l2.42 2.42-12.02 6.94 9.6-9.36zm0-2.108L5.246 1.586l12.02 6.94-2.42 2.42zm1.472 1.054l3.523 2.033a1.59 1.59 0 0 1 0 2.766l-3.523 2.033-2.155-2.155 2.155-2.677z" />
              </svg>
              <span>Install App</span>
            </a>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-2">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand-primary px-3 py-1.5 text-xs font-bold flex items-center gap-1 shadow-xs"
          >
            <svg
              className="w-3 h-3 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.61-1.63V3.444c0-.623.228-1.2.61-1.63zm11.237 11.24l2.42 2.42-12.02 6.94 9.6-9.36zm0-2.108L5.246 1.586l12.02 6.94-2.42 2.42zm1.472 1.054l3.523 2.033a1.59 1.59 0 0 1 0 2.766l-3.523 2.033-2.155-2.155 2.155-2.677z" />
            </svg>
            <span>App</span>
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl text-[#4A2508] hover:bg-[#FEEDDF] focus:outline-hidden transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/98 border-b border-[#F1E4D5] px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
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
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-[#4A2508] hover:bg-[#FFF8F2]"
          >
            <MapPinIcon className="w-4 h-4 text-[#E87A1E]" />
            <span>US Cities Guide</span>
          </Link>
          <Link
            href="/about"
            onClick={closeMenu}
            className="block px-3 py-2 rounded-lg text-sm font-bold text-[#4A2508] hover:bg-[#FFF8F2]"
          >
            About AI Home Decorator
          </Link>

          <div className="pt-3 border-t border-[#F1E4D5] space-y-2">
            {currentUser ? (
              <div className="flex items-center justify-between px-3 py-2 bg-[#FEEDDF] rounded-xl border border-[#F8B98B]">
                <span className="text-xs font-bold text-[#4A2508] truncate">
                  {currentUser.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-[#8D3D10] hover:text-[#E87A1E]"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="text-center py-2 rounded-xl text-xs font-bold text-[#4A2508] border border-[#F1E4D5] hover:bg-[#FFF8F2]"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={closeMenu}
                  className="text-center py-2 rounded-xl text-xs font-bold btn-brand-secondary"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
