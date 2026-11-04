"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.aihomedecorator.twa";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

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
        <div className="hidden lg:flex items-center gap-7">
          <nav className="flex items-center gap-6 text-sm font-bold text-[#5C3314]">
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

            {/* HDE Cost Calculator Cross-Promotion */}
            <a
              href="https://www.homedesignenglish.com?region=US"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEEDDF] hover:bg-[#FCD7BA] border border-[#F8B98B] text-[#8D3D10] text-xs font-bold transition-all shadow-xs hover:scale-105"
              title="US Construction & Interior Remodel Cost Calculator by HDE"
            >
              <span>🔨</span>
              <span>US Remodel Calculator</span>
              <svg className="w-3 h-3 text-[#D46513]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </nav>

          {/* Primary App Download CTA */}
          <div className="flex items-center gap-3 pl-2">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand-primary px-5 py-2.5 text-xs sm:text-sm font-extrabold flex items-center gap-2 group shadow-md"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.412 13.8533 8.125 12 8.125c-1.8533 0-3.5902.287-5.1368.8247L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.343 14.6589 0 18.761h24c-.343-4.1021-2.6889-7.5743-6.1185-9.4396" />
              </svg>
              <span>Get Android App</span>
              <span className="text-white/80 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Mobile Action & Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand-primary px-3.5 py-1.5 text-xs font-bold"
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
          <a
            href="https://www.homedesignenglish.com?region=US"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="block px-3 py-2 rounded-lg text-sm font-bold text-[#8D3D10] bg-[#FEEDDF] hover:bg-[#FCD7BA]"
          >
            🔨 US Remodel Cost Calculator (HDE) ↗
          </a>

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
