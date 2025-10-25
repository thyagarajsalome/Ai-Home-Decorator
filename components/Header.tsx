import React from "react";
import { Link } from "react-router-dom"; // <-- IMPORT

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-4 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            <Link to="/">AI Home Decorator</Link>
          </h1>
          <p className="mt-2 text-lg text-gray-400 max-w-2xl mx-auto">
            See your dream space come to life in seconds.
          </p>
        </div>

        {/* --- NAVIGATION LINKS --- */}
        <nav className="flex gap-4 md:gap-6">
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
          {/* You will add your Login/Logout button here */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
