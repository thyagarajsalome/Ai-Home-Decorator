"use client";
import React, { useState } from "react";
import Link from "next/link";

export interface ShowcaseRoom {
  id: string;
  city: string;
  state: string;
  styleName: string;
  styleCategory: string;
  roomType: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

export const USA_SHOWCASE_ROOMS: ShowcaseRoom[] = [
  {
    id: "austin-boho",
    city: "Austin",
    state: "Texas",
    styleName: "Bohemian",
    styleCategory: "full_redesign",
    roomType: "Living Room",
    description: "Layered organic textures, vibrant earth tones, warm ambient lighting and rattan furniture.",
    beforeImage: "/images/showcase/austin-before.jpg",
    afterImage: "/images/showcase/austin-after.jpg",
  },
  {
    id: "la-midcentury",
    city: "Los Angeles",
    state: "California",
    styleName: "Modern",
    styleCategory: "full_redesign",
    roomType: "Living Room",
    description: "Iconic California open-layout with warm walnut accents, crisp architectural lines and organic daylight.",
    beforeImage: "/images/showcase/los-angeles-before.jpg",
    afterImage: "/images/showcase/los-angeles-after.jpg",
  },
  {
    id: "miami-coastal",
    city: "Miami",
    state: "Florida",
    styleName: "Mediterranean",
    styleCategory: "full_redesign",
    roomType: "Master Bedroom",
    description: "Breezy coastal palette, soft white linen drapery, bright airy lighting and minimalist marble surfaces.",
    beforeImage: "/images/showcase/miami-before.jpg",
    afterImage: "/images/showcase/miami-after.jpg",
  },
  {
    id: "nyc-industrial",
    city: "New York",
    state: "New York",
    styleName: "Industrial",
    styleCategory: "full_redesign",
    roomType: "Open Loft",
    description: "Raw exposed brickwork, matte black metal framing, warm Edison lighting and weathered leather seating.",
    beforeImage: "/images/showcase/new-york-before.jpg",
    afterImage: "/images/showcase/new-york-after.jpg",
  },
  {
    id: "chicago-minimalist",
    city: "Chicago",
    state: "Illinois",
    styleName: "Minimalist",
    styleCategory: "full_redesign",
    roomType: "Penthouse Lounge",
    description: "Ultra-clean geometric aesthetics, functional sleek surfaces, neutral palette and panoramic city balance.",
    beforeImage: "/images/showcase/chicago-before.jpg",
    afterImage: "/images/showcase/chicago-after.jpg",
  },
  {
    id: "seattle-scandinavian",
    city: "Seattle",
    state: "Washington",
    styleName: "Scandinavian",
    styleCategory: "full_redesign",
    roomType: "Living Room",
    description: "Pale birch timbers, soft hygge textiles, subtle warm accents and clutter-free peaceful sanctuary styling.",
    beforeImage: "/images/showcase/seattle-before.jpg",
    afterImage: "/images/showcase/seattle-after.jpg",
  },
];

interface ShowcaseCardProps {
  room: ShowcaseRoom;
  onApplyStyle?: (styleName: string, categoryId: string) => void;
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ room, onApplyStyle }) => {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="bg-obsidian-900/90 border border-gray-800/80 rounded-2xl overflow-hidden shadow-xl hover:border-purple-500/40 transition-all duration-300 flex flex-col group">
      {/* Before / After Slider Frame */}
      <div className="relative aspect-[3/2] w-full select-none overflow-hidden bg-obsidian-950">
        {/* Before Image */}
        <img
          src={room.beforeImage}
          alt={`Original ${room.city} room before redesign`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* After Image Clipped */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
        >
          <img
            src={room.afterImage}
            alt={`Redesigned ${room.city} ${room.styleName} room`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Comparison Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none shadow-md"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-white dark:bg-obsidian-900 rounded-full shadow-md border border-purple-500 flex items-center justify-center text-[10px] text-purple-400">
            ↔
          </div>
        </div>

        {/* Slider Native Range Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
          aria-label={`Compare before and after for ${room.city} ${room.styleName}`}
        />

        {/* Badges */}
        <span className="absolute top-2.5 left-2.5 z-0 bg-black/65 backdrop-blur-sm text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-purple-500/30">
          AFTER (AI)
        </span>
        <span className="absolute top-2.5 right-2.5 z-0 bg-black/65 backdrop-blur-sm text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-md border border-gray-700/40">
          BEFORE
        </span>
      </div>

      {/* Info & Action */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-purple-400 font-bold uppercase tracking-wider">
              {room.city}, {room.state}
            </span>
            <span className="text-[10px] text-gray-400 font-medium bg-obsidian-800 px-2 py-0.5 rounded-md border border-gray-750">
              {room.roomType}
            </span>
          </div>

          <h3 className="text-base font-extrabold text-white mb-1.5 font-heading group-hover:text-purple-300 transition-colors">
            {room.styleName} Interior
          </h3>
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
            {room.description}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (onApplyStyle) {
              onApplyStyle(room.styleName, room.styleCategory);
            }
            const el = document.getElementById("workspace");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className="w-full py-2 px-3 rounded-xl bg-obsidian-850 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 border border-gray-750 hover:border-transparent text-xs font-bold text-gray-200 hover:text-white transition-all shadow-sm flex items-center justify-center gap-1.5 group/btn"
        >
          <span>Use {room.styleName} Style</span>
          <span className="group-hover/btn:translate-x-0.5 transition-transform">⚡</span>
        </button>
      </div>
    </div>
  );
};

interface USAHomeShowcaseProps {
  onSelectShowcaseStyle?: (styleName: string, categoryId: string) => void;
}

const USAHomeShowcase: React.FC<USAHomeShowcaseProps> = ({ onSelectShowcaseStyle }) => {
  return (
    <section className="w-full max-w-7xl mx-auto mt-16 px-4">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-800/80 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">🇺🇸</span>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
              Real USA Interior Transformations
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
            Before & After Gallery
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
            Drag the comparison slider on any room to see how our AI reimagines ordinary American living rooms, lofts, and bedrooms in seconds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/design-styles"
            className="text-xs font-bold text-purple-400 hover:text-purple-300 hover:underline flex items-center gap-1"
          >
            Browse all 70+ styles →
          </Link>
        </div>
      </div>

      {/* Grid of 6 interactive cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {USA_SHOWCASE_ROOMS.map((room) => (
          <ShowcaseCard
            key={room.id}
            room={room}
            onApplyStyle={onSelectShowcaseStyle}
          />
        ))}
      </div>
    </section>
  );
};

export default USAHomeShowcase;
