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
              <Link href="/design/kitchen/farmhouse-kitchen" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150">
                Farmhouse Kitchens
              </Link>
              <Link href="/design/bathroom/luxury-spa" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150">
                Luxury Spa Bathrooms
              </Link>
              <Link href="/design/full_redesign/contemporary" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150">
                Contemporary Rooms
              </Link>
              <Link href="/design/outdoor_patio/teak-timber-decking" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150">
                Teak Outdoor Decks
              </Link>
              <Link href="/design/full_redesign/scandinavian" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150">
                Scandinavian Rooms
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
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:contactaihomedecorator@gmail.com" className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-2 text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  contactaihomedecorator@gmail.com
                </a>
              </li>
            </ul>
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
