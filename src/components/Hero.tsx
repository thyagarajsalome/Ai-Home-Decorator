// src/components/Hero.tsx
import React from "react";

interface HeroProps {
  onStartClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartClick }) => {
  return (
    <div className="relative bg-gray-900 pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
      {/* Background Gradient Effect */}
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Text Content - Centered Top */}
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Redesign Your Room <br className="hidden md:block" />
            in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Seconds with AI
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Stop imagining and start seeing. Upload a photo of your space,
            choose from over 15+ styles like Japandi or Cyberpunk, and watch
            your dream home come to life instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onStartClick}
              className="px-8 py-4 text-lg font-bold text-white rounded-xl shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200"
            >
              Start Decorating Free
            </button>
            <a
              href="https://ai-homedecorator-landing-01.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 text-lg font-medium text-gray-300 bg-gray-800/50 border border-gray-700 hover:bg-gray-700 rounded-xl transition-all"
            >
              See Examples
            </a>
          </div>
        </div>

        {/* Visual Content - Full Width Image Below */}
        <div className="w-full relative group rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
          {/* Glow Effect behind image */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

          <div className="relative bg-gray-800 rounded-2xl overflow-hidden">
            <img
              src="/hero.png"
              alt="AI Home Decorator Preview"
              className="w-full h-auto object-cover"
            />

            {/* Optional Badge Overlay */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
              <span className="bg-black/60 backdrop-blur-md text-white text-xs md:text-sm px-4 py-1.5 rounded-full border border-white/10 shadow-sm">
                Powered by Gemini
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
