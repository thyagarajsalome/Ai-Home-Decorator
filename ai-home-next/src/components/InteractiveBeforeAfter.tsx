"use client";

import React, { useState } from "react";

interface Props {
  beforeImg?: string;
  afterImg?: string;
}

export default function InteractiveBeforeAfter({
  beforeImg = "/images/slider/before.png",
  afterImg = "/images/slider/after.png",
}: Props) {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="w-full max-w-[880px] mx-auto select-none">
      <div className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-stone-900 group">
        
        {/* BEFORE Image (Base / Background) */}
        <img
          src={beforeImg}
          alt="Original Room Before"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* AFTER Image (Clipped overlay) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
          style={{
            clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)`,
          }}
        >
          <img
            src={afterImg}
            alt="Redesigned Room After"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        </div>

        {/* Minimal Corner Badges */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-bold tracking-wider uppercase pointer-events-none border border-white/10">
          Before
        </div>
        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-[#E87A1E]/85 backdrop-blur-md text-white text-[11px] font-bold tracking-wider uppercase pointer-events-none border border-white/20">
          After
        </div>

        {/* Slider Handle (Line & Circle) */}
        <div
          className="absolute top-0 bottom-0 z-20 pointer-events-none -translate-x-1/2"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-[2px] h-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-[#4A2508] shadow-[0_4px_16px_rgba(0,0,0,0.35)] flex items-center justify-center transition-transform group-hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-[#4A2508]"
            >
              <path
                fillRule="evenodd"
                d="M15.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H7.5a.75.75 0 010-1.5h11.69l-3.22-3.22a.75.75 0 010-1.06zm-7.94 9a.75.75 0 010 1.06l-3.22 3.22H16.5a.75.75 0 010 1.5H4.81l3.22 3.22a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Range Input for Dragging */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize z-30 m-0"
          aria-label="Image comparison slider"
        />
      </div>
    </div>
  );
}
