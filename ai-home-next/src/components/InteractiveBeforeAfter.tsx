"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Props {
  beforeImg?: string;
  afterImg?: string;
  roomName?: string;
  styleName?: string;
}

export default function InteractiveBeforeAfter({
  beforeImg = "/images/showcase/living-room-before.jpg",
  afterImg = "/images/showcase/living-room-after.jpg",
  roomName = "Living Room",
  styleName = "Warm Contemporary",
}: Props) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-[#FCD7BA] bg-white">
      {/* Visual Top Bar */}
      <div className="bg-[#FAF4EC] px-6 py-3.5 border-b border-[#EEDBC9] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#E87A1E]"></span>
          <span className="text-xs font-bold text-[#4A2508] uppercase tracking-wider">
            Live Before / After Simulator: {roomName} ({styleName})
          </span>
        </div>
        <div className="text-[11px] font-bold text-[#8D3D10] bg-[#FEEDDF] px-2.5 py-0.5 rounded-full border border-[#F8B98B]">
          Drag Slider ↔
        </div>
      </div>

      {/* Before / After Container */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden select-none">
        {/* AFTER Image (Full background) */}
        <div className="absolute inset-0">
          <Image
            src={afterImg}
            alt={`${roomName} After AI Redesign`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-[#E87A1E] text-white text-xs font-black shadow-lg uppercase tracking-wider">
            ✨ After: {styleName}
          </div>
        </div>

        {/* BEFORE Image (Clipped by slider percentage) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-full h-full min-w-full">
            <Image
              src={beforeImg}
              alt={`${roomName} Original Before`}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-[#4A2508]/90 text-white text-xs font-black shadow-lg uppercase tracking-wider backdrop-blur-xs">
            📷 Before: Original
          </div>
        </div>

        {/* Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#E87A1E] border-2 border-white shadow-xl flex items-center justify-center text-white text-xs font-black">
            ↔
          </div>
        </div>

        {/* Range Input Overlay */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          aria-label="Slide to compare before and after room transformation"
        />
      </div>

      {/* Bottom helper prompt */}
      <div className="p-4 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5C3314]">
        <div className="flex items-center gap-2">
          <span>💡</span>
          <span className="font-medium">
            Slide left &amp; right to inspect structural preservation, realistic textures, and lighting.
          </span>
        </div>
        <a
          href="https://play.google.com/store/apps/details?id=com.aihomedecorator.twa"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E87A1E] font-bold hover:underline flex-shrink-0"
        >
          Try this in the Android App &rarr;
        </a>
      </div>
    </div>
  );
}
