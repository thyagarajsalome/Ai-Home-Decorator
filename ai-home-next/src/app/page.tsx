import React from "react";
import DesignWorkspace from "@/components/DesignWorkspace";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-obsidian-950">
      {/* Sleek, minimal studio intro above workspace */}
      <div className="text-center pt-8 pb-4 px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3 animate-fade">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
          Next-Gen AI Interior Transformation
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
          Redesign Your Room in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400">
            Seconds
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-2xl mx-auto">
          Upload any room photo, choose your favorite architectural style or custom prompt, and let AI visualize your dream space.
        </p>
      </div>

      <main id="workspace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-20 scroll-mt-24 w-full flex-grow">
        <DesignWorkspace />
      </main>
    </div>
  );
}
