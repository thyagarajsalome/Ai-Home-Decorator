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
  const { currentUser, currentUserRole, signOut } = useAuth();

  const ADMIN_EMAILS = [
    "thyagaraja1983@gmail.com",
    "thyagarajsalome@gmail.com",
  ];

  const isAdminUser = Boolean(
    currentUser &&
      (currentUserRole === "admin" ||
        (currentUser.email &&
          ADMIN_EMAILS.includes(currentUser.email.toLowerCase())))
  );

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
          className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer flex-shrink-0"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border-2 border-[#FCD7BA] shadow-xs group-hover:scale-105 transition-transform duration-200 bg-white flex-shrink-0">
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
            <div className="flex items-center gap-1 font-heading font-black text-base sm:text-lg xl:text-xl tracking-tight leading-none">
              <span className="text-[#E87A1E]">AI</span>
              <span className="text-[#4A2508]">Home Decorator</span>
            </div>
            <span className="hidden xl:block text-[9px] font-bold tracking-widest text-[#7A4B27] uppercase mt-0.5">
              DESIGN • DECORATE • VISUALIZE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-5">
          <nav className="flex items-center gap-3 xl:gap-5 text-xs xl:text-sm font-bold text-[#5C3314]">
            <Link
              href="/"
              className="hover:text-[#E87A1E] transition-colors duration-150 py-1"
            >
              Home
            </Link>
            <Link
              href="/ideas"
              className="hover:text-[#E87A1E] transition-colors duration-150 py-1"
            >
              Room Ideas
            </Link>
            <Link
              href="/guide"
              className="hover:text-[#E87A1E] transition-colors duration-150 py-1"
            >
              Style Guides
            </Link>
            <Link
              href="/usa"
              className="hover:text-[#E87A1E] transition-colors duration-150 flex items-center gap-1 py-1"
            >
              <MapPinIcon className="w-3.5 h-3.5 text-[#E87A1E]" />
              <span>US Cities</span>
            </Link>
            <Link
              href="/store"
              className="hover:text-[#E87A1E] transition-colors duration-150 flex items-center gap-1.5 text-[#E87A1E] py-1"
            >
              <span>Design Store</span>
              <span className="text-[9px] bg-[#FEEDDF] border border-[#F8B98B] text-[#8D3D10] px-1.5 py-0.5 rounded-md font-black uppercase tracking-wider">
                PDF
              </span>
            </Link>
            <Link
              href="/about"
              className="hover:text-[#E87A1E] transition-colors duration-150 py-1"
            >
              About
            </Link>
          </nav>

          {/* Auth State & Primary Actions */}
          <div className="flex items-center gap-2 xl:gap-3 border-l border-[#F1E4D5] pl-3 xl:pl-4">
            {currentUser ? (
              <div className="flex items-center gap-2">
                {/* Admin Quick-Access Button (Exclusive to Admin Users) */}
                {isAdminUser && (
                  <Link
                    href="/admin/store"
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-[#8D3D10] bg-[#FEEDDF] hover:bg-[#FCD7BA] border border-[#F8B98B] transition-colors shadow-2xs"
                    title="Store Admin Dashboard"
                  >
                    <span>⚙️</span>
                    <span>Admin</span>
                  </Link>
                )}

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FEEDDF]/60 border border-[#F8B98B]/60 text-xs font-medium text-[#4A2508]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span className="max-w-[95px] xl:max-w-[130px] truncate">{currentUser.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-[#8D3D10] hover:text-[#E87A1E] transition-colors cursor-pointer px-1 py-1"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-xs font-bold text-[#4A2508] hover:text-[#E87A1E] transition-colors px-2 py-1"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="btn-brand-secondary px-3 py-1.5 text-xs font-bold"
                >
                  Sign Up
                </Link>
                {/* Discrete Admin Link for logged-out view */}
                <Link
                  href="/admin/store"
                  className="p-1.5 rounded-lg text-[#8D3D10] hover:bg-[#FEEDDF] transition-colors"
                  title="Admin Store Panel"
                  aria-label="Admin Store Panel"
                >
                  <span className="text-sm">⚙️</span>
                </Link>
              </div>
            )}

            {/* Direct Google Play Store App CTA */}
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand-primary px-3 xl:px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#E87A1E]/20 hover:shadow-lg hover:shadow-[#E87A1E]/30 flex-shrink-0"
            >
              <svg
                className="w-3.5 h-3.5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.61-1.63V3.444c0-.623.228-1.2.61-1.63zm11.237 11.24l2.42 2.42-12.02 6.94 9.6-9.36zm0-2.108L5.246 1.586l12.02 6.94-2.42 2.42zm1.472 1.054l3.523 2.033a1.59 1.59 0 0 1 0 2.766l-3.523 2.033-2.155-2.155 2.155-2.677z" />
              </svg>
              <span className="hidden xl:inline">Install App</span>
              <span className="xl:hidden">App</span>
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
            href="/ideas"
            onClick={closeMenu}
            className="block px-3 py-2 rounded-lg text-sm font-bold text-[#4A2508] hover:bg-[#FFF8F2]"
          >
            Room Ideas
          </Link>
          <Link
            href="/guide"
            onClick={closeMenu}
            className="block px-3 py-2 rounded-lg text-sm font-bold text-[#4A2508] hover:bg-[#FFF8F2]"
          >
            Style Guides
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
            href="/store"
            onClick={closeMenu}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-bold text-[#E87A1E] hover:bg-[#FFF8F2]"
          >
            <span>Design Store (PDF Books)</span>
            <span className="text-[10px] bg-[#FEEDDF] border border-[#F8B98B] text-[#8D3D10] px-2 py-0.5 rounded-full font-black">
              PDF
            </span>
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
              <div className="space-y-2">
                <div className="flex items-center justify-between px-3 py-2 bg-[#FEEDDF]/60 rounded-xl border border-[#F8B98B]/60">
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
                {/* Admin Quick Link (Exclusive to Admin Users) */}
                {isAdminUser && (
                  <Link
                    href="/admin/store"
                    onClick={closeMenu}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#8D3D10] bg-[#FEEDDF] hover:bg-[#FCD7BA] border border-[#F8B98B] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span>⚙️</span>
                      <span>Store Admin Dashboard</span>
                    </span>
                    <span className="text-[10px] bg-[#E87A1E] text-white px-2 py-0.5 rounded-md font-black">
                      ADMIN
                    </span>
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-2">
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
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
