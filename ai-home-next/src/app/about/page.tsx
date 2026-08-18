"use client";
// src/pages/About.tsx
import React from "react";
import Link from "next/link";

const About: React.FC = () => {
  return (
    <div className="relative min-h-[75vh] max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="glass-card rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-800/80 dark:border-gray-800/50 backdrop-blur-md relative z-10 animate-fade">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          About AI Home Decorator
        </h1>

        <div className="space-y-6 text-gray-300 leading-relaxed text-sm md:text-base">
          <p>
            Welcome to <strong>AI Home Decorator</strong>! Our mission is to help you visualize your dream space without the guesswork or expensive design fees. Powered by Google's Gemini AI vision models, this application allows you to snap a photo of any room and instantly witness a photorealistic reimagining in seconds.
          </p>

          <div className="border-t border-gray-800/60 my-8"></div>

          <h2 className="text-2xl font-bold text-white mb-4">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-obsidian-850/40 border border-gray-850/50">
              <span className="inline-block w-8 h-8 rounded-lg bg-purple-900/30 border border-purple-500/30 text-purple-300 font-bold text-center leading-8 mb-3">1</span>
              <h3 className="text-base font-bold text-white mb-1.5">Upload a Photo</h3>
              <p className="text-xs text-gray-400">
                Snap or upload an image of your bedroom, living room, kitchen, or office directly from your phone or desktop.
              </p>
            </div>
            
            <div className="p-5 rounded-xl bg-obsidian-850/40 border border-gray-850/50">
              <span className="inline-block w-8 h-8 rounded-lg bg-purple-900/30 border border-purple-500/30 text-purple-300 font-bold text-center leading-8 mb-3">2</span>
              <h3 className="text-base font-bold text-white mb-1.5">Describe Context</h3>
              <p className="text-xs text-gray-400">
                Give the AI model descriptive hints such as "messy kid's room" or "unfurnished master bedroom" for accurate scene parsing.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-obsidian-850/40 border border-gray-850/50">
              <span className="inline-block w-8 h-8 rounded-lg bg-purple-900/30 border border-purple-500/30 text-purple-300 font-bold text-center leading-8 mb-3">3</span>
              <h3 className="text-base font-bold text-white mb-1.5">Select a Style</h3>
              <p className="text-xs text-gray-400">
                Choose from over 15+ curated themes, including Scandinavian, Japandi, cyberpunk, steampunk, farmhouse, or provide your own prompt.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-obsidian-850/40 border border-gray-850/50">
              <span className="inline-block w-8 h-8 rounded-lg bg-purple-900/30 border border-purple-500/30 text-purple-300 font-bold text-center leading-8 mb-3">4</span>
              <h3 className="text-base font-bold text-white mb-1.5">Generate Redesign</h3>
              <p className="text-xs text-gray-400">
                Watch our AI parse the structural constraints of the room and place photorealistic furniture and decors.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800/60 my-8"></div>

          <h2 className="text-2xl font-bold text-white mb-4">
            Contact Support
          </h2>
          <p className="text-sm">
            Have questions, feedback, or custom requests? We would love to hear from you.
          </p>
          <div className="p-5 rounded-xl bg-purple-900/10 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
            <span className="text-sm font-semibold text-purple-300">Email our support desk:</span>
            <a
              href="mailto:contact@aihomedecorator.com"
              className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold shadow-md transition-colors"
            >
              contact@toolwebsite.in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
