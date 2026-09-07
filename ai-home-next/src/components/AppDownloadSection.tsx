"use client";

import React from "react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.aihomedecorator.twa";

export default function AppDownloadSection() {
  return (
    <section className="w-full max-w-7xl mx-auto my-16 px-4">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-obsidian-900 via-obsidian-850 to-purple-950/40 border border-purple-500/25 p-8 sm:p-12 shadow-2xl">
        {/* Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Left Column: App Copy & Download Link */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.412 13.8533 8.125 12 8.125c-1.8533 0-3.5902.287-5.1368.8247L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.343 14.6589 0 18.761h24c-.343-4.1021-2.6889-7.5743-6.1185-9.4396" />
              </svg>
              <span>Official Android App</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight mb-4">
              Redesign Your Space{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300">
                On The Go
              </span>
            </h2>

            <p className="text-sm sm:text-base text-gray-300 mb-6 leading-relaxed max-w-xl">
              Snap a photo of your living room, kitchen, bedroom, or patio directly with your mobile camera. Experience instant AI redecoration with 30+ styles and interactive before/after sliders.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full max-w-lg text-left">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-obsidian-800/70 border border-gray-800/80 shadow-sm">
                <span className="text-lg">📸</span>
                <span className="text-xs font-semibold text-gray-200">Instant Camera Capture</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-obsidian-800/70 border border-gray-800/80 shadow-sm">
                <span className="text-lg">✨</span>
                <span className="text-xs font-semibold text-gray-200">30+ Design Presets</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-obsidian-800/70 border border-gray-800/80 shadow-sm">
                <span className="text-lg">↔️</span>
                <span className="text-xs font-semibold text-gray-200">Interactive Before/After</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-obsidian-800/70 border border-gray-800/80 shadow-sm">
                <span className="text-lg">💾</span>
                <span className="text-xs font-semibold text-gray-200">HD Save & One-Tap Share</span>
              </div>
            </div>

            {/* Google Play Button */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-200 hover:scale-[1.04] active:scale-[0.98] inline-block shadow-lg shadow-purple-500/25"
              >
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  className="h-14 sm:h-16 w-auto"
                />
              </a>
              <div className="flex flex-col items-center sm:items-start text-xs text-gray-400">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <span>★★★★★</span>
                  <span className="text-gray-200 ml-1">4.9 / 5.0</span>
                </div>
                <span>Free to download on Google Play Store</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Real Phone Mockups */}
          <div className="lg:col-span-6 flex items-center justify-center pt-6 lg:pt-0">
            <div className="relative flex items-center justify-center w-full max-w-sm sm:max-w-md lg:max-w-lg select-none">
              {/* Left Screen (Tilted / Behind) */}
              <div className="w-1/3 sm:w-2/5 -mr-8 sm:-mr-12 transform -rotate-6 translate-y-6 hover:translate-y-2 hover:-rotate-3 transition-all duration-300 opacity-80 hover:opacity-100 z-0">
                <div className="rounded-2xl sm:rounded-3xl p-1 bg-gray-800 shadow-2xl border border-gray-700/60 overflow-hidden">
                  <img
                    src="/images/app/screen-1.webp"
                    alt="Living Hall transformation screen"
                    className="w-full h-auto rounded-xl sm:rounded-2xl object-cover shadow-inner"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Center Screen (Raised / Hero) */}
              <div className="w-2/5 sm:w-1/2 transform -translate-y-2 hover:-translate-y-5 transition-transform duration-300 z-10">
                <div className="rounded-2xl sm:rounded-3xl p-1 sm:p-1.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-600 shadow-2xl shadow-purple-500/40 overflow-hidden">
                  <div className="bg-obsidian-950 rounded-xl sm:rounded-2xl overflow-hidden">
                    <img
                      src="/images/app/screen-3.webp"
                      alt="Your New Space result screen"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Right Screen (Tilted / Behind) */}
              <div className="w-1/3 sm:w-2/5 -ml-8 sm:-ml-12 transform rotate-6 translate-y-6 hover:translate-y-2 hover:rotate-3 transition-all duration-300 opacity-80 hover:opacity-100 z-0">
                <div className="rounded-2xl sm:rounded-3xl p-1 bg-gray-800 shadow-2xl border border-gray-700/60 overflow-hidden">
                  <img
                    src="/images/app/screen-2.webp"
                    alt="Gourmet Kitchen transformation screen"
                    className="w-full h-auto rounded-xl sm:rounded-2xl object-cover shadow-inner"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
