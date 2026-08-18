"use client";
// src/components/Hero.tsx
import React from "react";

interface HeroProps {
  onStartClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartClick }) => {
  return (
    <div className="relative bg-slate-50 dark:bg-obsidian-950 pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden transition-colors duration-300">
      {/* Background Gradient & Animated Blobs */}
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none opacity-20 dark:opacity-40">
        <div className="absolute top-10 left-1/4 w-[350px] h-[350px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
        <div className="absolute top-10 right-1/4 w-[350px] h-[350px] bg-pink-500/20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-1/3 w-[350px] h-[350px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Text Content - Centered Top */}
        <div className="max-w-3xl mx-auto mb-16 animate-fade">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight font-heading">
            Redesign Your Space <br className="hidden sm:block" />
            in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 dark:from-purple-400 dark:via-pink-500 dark:to-purple-600">
              Seconds with AI
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-650 dark:text-gray-400 mb-10 max-w-2xl mx-auto font-sans leading-relaxed">
            Stop imagining and start seeing. Upload a photo of your room, choose from 15+ stunning design styles like Japandi or Cyberpunk, and watch your dream home come to life instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onStartClick}
              className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transform hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
            >
              Start Decorating Free
            </button>
            <a
              href="https://ai-homedecorator-landing-01.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 text-base font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-obsidian-800/60 hover:bg-gray-50 dark:hover:bg-obsidian-800 border border-gray-250 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Explore Examples
            </a>
          </div>
        </div>

        {/* Visual Content - Full Width Image Below */}
        <div className="w-full max-w-5xl relative group rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-900/60 backdrop-blur-sm animate-slideUp">
          {/* Ambient Glow behind image container */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl blur-lg opacity-15 dark:opacity-25 group-hover:opacity-35 transition duration-1000"></div>

          <div className="relative bg-white dark:bg-obsidian-900 rounded-2xl overflow-hidden">
            <img
              src="/hero.png"
              alt="AI Home Decorator Showcase"
              className="w-full h-auto object-cover max-h-[500px]"
            />

            {/* AI badge Overlay */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
              <span className="bg-white/90 dark:bg-obsidian-950/80 backdrop-blur-md text-gray-800 dark:text-white text-xs font-semibold px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800/50 shadow-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                Powered by Gemini AI
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
