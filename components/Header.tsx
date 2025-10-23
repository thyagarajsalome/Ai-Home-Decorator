import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-8 px-4 border-b border-gray-700/50">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
        AI Home Decorator
      </h1>
      <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
        Upload a photo of your room, choose a style, and let AI work its magic. See your dream space come to life in seconds!
      </p>
    </header>
  );
};

export default Header;