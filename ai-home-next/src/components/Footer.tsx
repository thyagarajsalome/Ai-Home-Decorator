"use client";
// src/components/Footer.tsx
import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-obsidian-950 border-t border-gray-200/80 dark:border-gray-800/40 py-12 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center md:items-start text-center md:text-left">
          {/* Brand Column */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-500 bg-clip-text text-transparent">
              AI Home Decorator
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs max-w-sm mx-auto md:mx-0 font-medium">
              Redecorate and visualize any room layout in standard design styles instantly using Google Gemini AI models.
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-[10px] pt-1">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Explore Styles Column (SEO) */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-800 dark:text-gray-300">
              Explore Styles
            </h4>
            <div className="flex flex-col space-y-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
              <Link href="/design/kitchen/modern-farmhouse" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150">
                Farmhouse Kitchens
              </Link>
              <Link href="/design/bathroom/scandinavian" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150">
                Scandinavian Bathrooms
              </Link>
              <Link href="/design/full_redesign/contemporary" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150">
                Contemporary Rooms
              </Link>
              <Link href="/design/outdoor_patio/coastal" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150">
                Coastal Patios
              </Link>
              <Link href="/design/wall_paint/pastel-accents" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150">
                Pastel Wall Paints
              </Link>
            </div>
          </div>

          {/* Legal Links Column */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-800 dark:text-gray-300">
              Legal Info
            </h4>
            <div className="flex flex-col space-y-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
              <Link
                href="/terms"
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150"
              >
                Terms of Service
              </Link>
              <Link
                href="/policy"
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150"
              >
                Privacy Policy
              </Link>
              <Link
                href="/disclaimer"
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150"
              >
                Disclaimer
              </Link>
            </div>
          </div>

          {/* Action Column */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-800 dark:text-gray-300">
              Discover
            </h4>
            <div className="flex flex-col items-center md:items-end gap-3.5">
              {/* How to use Button */}
              <a
                href="https://ai-homedecorator-landing-01.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-obsidian-900 border border-gray-200 dark:border-gray-800/80 hover:bg-gray-50 dark:hover:bg-obsidian-850 hover:border-gray-300 dark:hover:border-gray-700 rounded-lg text-sm font-bold text-gray-700 dark:text-white transition-all duration-200 group shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-purple-600 dark:text-purple-450 group-hover:text-purple-500 dark:group-hover:text-purple-300 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Learn How to Use
              </a>

              {/* Google Play Store Badge */}
              <a
                href="https://play.google.com/store/apps/details?id=com.aihomedecorator.twa"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-36 hover:opacity-90 active:scale-98 transition-all"
              >
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  className="w-full h-auto"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800/40 text-center text-[10px] text-gray-500 dark:text-gray-600 font-medium">
          Powered by Gemini 2.5 Flash Image. Secure billing powered by Razorpay.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
