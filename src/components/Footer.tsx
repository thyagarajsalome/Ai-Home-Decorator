// src/components/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand & Copyright */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-1">
              AI Home Decorator
            </h3>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Powered by Google Gemini
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex gap-6 text-sm text-gray-400">
            <Link
              to="/terms"
              className="hover:text-purple-400 transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/policy"
              className="hover:text-purple-400 transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/disclaimer"
              className="hover:text-purple-400 transition-colors"
            >
              Disclaimer
            </Link>
          </div>

          {/* Actions: How to Use & Play Store */}
          <div className="flex flex-col items-center md:items-end gap-3">
            {/* How to use Button */}
            <a
              href="https://ai-homedecorator-landing-01.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm font-medium text-white transition-all group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-purple-400 group-hover:text-purple-300"
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
              How to use
            </a>

            {/* Google Play Badge */}
            <a
              href="https://play.google.com/store/apps/details?id=com.aihomedecorator.twa"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-36 hover:opacity-80 transition-opacity"
            >
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                className="w-full"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
