"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";

export interface ShowcaseRoom {
  id: string;
  category: "all" | "living" | "bedroom" | "kitchen" | "bath" | "outdoor" | "flooring" | "walls" | "lighting";
  roomBadge: string;
  location: string;
  styleName: string;
  styleCategory: string;
  transformationTag: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

export const USA_SHOWCASE_ROOMS: ShowcaseRoom[] = [
  {
    id: "living-room-modern",
    category: "living",
    roomBadge: "Living Hall",
    location: "Los Angeles, CA",
    styleName: "Modern",
    styleCategory: "full_redesign",
    transformationTag: "Empty Space → Luxury Modern Living",
    description: "Replaces empty unfinished room with sleek geometric sofas, modern floor lamp, statement art, and refined marble coffee tables.",
    beforeImage: "/images/showcase/living-room-before.jpg",
    afterImage: "/images/showcase/living-room-after.jpg",
  },
  {
    id: "bedroom-japandi",
    category: "bedroom",
    roomBadge: "Master Bedroom",
    location: "Seattle, WA",
    styleName: "Japandi",
    styleCategory: "full_redesign",
    transformationTag: "Bare Room → Organic Japandi Sanctuary",
    description: "Transforms plain drywall space into a tranquil retreat with low-profile oak platform bed, shoji screens, and soft linen layers.",
    beforeImage: "/images/showcase/bedroom-before.jpg",
    afterImage: "/images/showcase/bedroom-after.jpg",
  },
  {
    id: "kitchen-farmhouse",
    category: "kitchen",
    roomBadge: "Kitchen",
    location: "Austin, TX",
    styleName: "Farmhouse Kitchen",
    styleCategory: "kitchen",
    transformationTag: "Outdated Layout → Luxury White Quartz Island",
    description: "Complete architectural kitchen redesign with custom white shaker cabinets, solid waterfall quartz island, and brass fixtures.",
    beforeImage: "/images/showcase/kitchen-before.jpg",
    afterImage: "/images/showcase/kitchen-after.jpg",
  },
  {
    id: "bathroom-spa",
    category: "bath",
    roomBadge: "Bathroom",
    location: "Miami, FL",
    styleName: "Luxury Spa",
    styleCategory: "bathroom",
    transformationTag: "Standard Shower → Wellness Freestanding Tub",
    description: "Replaces basic tiled bathroom with a high-end wellness sanctuary featuring deep oval soaking tub and full-height stone wall slabs.",
    beforeImage: "/images/showcase/bathroom-before.jpg",
    afterImage: "/images/showcase/bathroom-after.jpg",
  },
  {
    id: "patio-mediterranean",
    category: "outdoor",
    roomBadge: "Outdoor Patio",
    location: "Phoenix, AZ",
    styleName: "Mediterranean Terrace",
    styleCategory: "outdoor_patio",
    transformationTag: "Bare Yard → Mediterranean Stone Terrace",
    description: "Transforms empty concrete outdoor zone into an upscale resort-style terrace with terracotta stone pavers, wrought iron seating, and lush olive trees.",
    beforeImage: "/images/showcase/patio-before.jpg",
    afterImage: "/images/showcase/patio-after.jpg",
  },
  {
    id: "flooring-marble",
    category: "flooring",
    roomBadge: "Flooring",
    location: "Chicago, IL",
    styleName: "Marble Flooring",
    styleCategory: "flooring",
    transformationTag: "Worn Wood Flooring → High-Gloss Calacatta Marble",
    description: "Retains all furniture and architecture while upgrading floor surface to high-gloss polished white Calacatta marble with gold veining.",
    beforeImage: "/images/showcase/flooring-before.jpg",
    afterImage: "/images/showcase/flooring-after.jpg",
  },
  {
    id: "walls-brick",
    category: "walls",
    roomBadge: "Wall Paint & Accent",
    location: "New York, NY",
    styleName: "Exposed Brick",
    styleCategory: "wall_paint",
    transformationTag: "Plain White Walls → NYC Reclaimed Exposed Brick",
    description: "Transforms flat bland drywalls into an authentic Brooklyn loft aesthetic with textured red masonry brick accents.",
    beforeImage: "/images/showcase/wall-paint-before.jpg",
    afterImage: "/images/showcase/wall-paint-after.jpg",
  },
  {
    id: "lighting-golden-hour",
    category: "lighting",
    roomBadge: "Lighting & Mood",
    location: "Denver, CO",
    styleName: "Golden Hour",
    styleCategory: "lighting_mood",
    transformationTag: "Dim Lighting → Cinematic Golden Hour Glow",
    description: "Changes harsh ambient lighting to warm directional sun rays with deep architectural shadows and cinematic warmth.",
    beforeImage: "/images/showcase/lighting-before.jpg",
    afterImage: "/images/showcase/lighting-after.jpg",
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
          alt={`Original ${room.roomBadge} before redesign`}
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
            alt={`Redesigned ${room.roomBadge} with ${room.styleName}`}
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
          aria-label={`Compare before and after for ${room.roomBadge} ${room.styleName}`}
        />

        {/* Badges */}
        <span className="absolute top-2.5 left-2.5 z-0 bg-black/70 backdrop-blur-sm text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-purple-500/30">
          AFTER (AI)
        </span>
        <span className="absolute top-2.5 right-2.5 z-0 bg-black/70 backdrop-blur-sm text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-gray-700/50">
          ORIGINAL
        </span>
      </div>

      {/* Info & Action */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/20">
              {room.roomBadge}
            </span>
            <span className="text-[10px] text-gray-400 font-medium">
              📍 {room.location}
            </span>
          </div>

          <h3 className="text-sm font-extrabold text-white mb-1 font-heading group-hover:text-purple-300 transition-colors">
            {room.transformationTag}
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
          <span>Apply {room.styleName} Style</span>
          <span className="group-hover/btn:translate-x-0.5 transition-transform">⚡</span>
        </button>
      </div>
    </div>
  );
};

interface USAHomeShowcaseProps {
  onSelectShowcaseStyle?: (styleName: string, categoryId: string) => void;
}

const CATEGORY_TABS = [
  { id: "all", label: "All Spaces" },
  { id: "living", label: "Living Hall" },
  { id: "bedroom", label: "Bedroom" },
  { id: "kitchen", label: "Kitchen" },
  { id: "bath", label: "Bathroom" },
  { id: "outdoor", label: "Patio" },
  { id: "flooring", label: "Flooring" },
  { id: "walls", label: "Wall Paint" },
  { id: "lighting", label: "Lighting" },
];

const USAHomeShowcase: React.FC<USAHomeShowcaseProps> = ({ onSelectShowcaseStyle }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredRooms = useMemo(() => {
    if (selectedFilter === "all") return USA_SHOWCASE_ROOMS;
    return USA_SHOWCASE_ROOMS.filter((r) => r.category === selectedFilter);
  }, [selectedFilter]);

  return (
    <section className="w-full max-w-7xl mx-auto mt-16 px-4">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-gray-800/80 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">🇺🇸</span>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
              Before & After Visual Transformations
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
            Complete Room & Element Transformations
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl leading-relaxed">
            Real architectural redesigns across living halls, bedrooms, kitchens, bathrooms, patios, flooring, wall paint and lighting. Drag the slider on any card to compare.
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

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {CATEGORY_TABS.map((tab) => {
          const isActive = selectedFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border whitespace-nowrap ${
                isActive
                  ? "bg-purple-600/40 border-purple-500 text-white shadow-sm ring-1 ring-purple-500/50"
                  : "bg-obsidian-850 hover:bg-obsidian-800 border-gray-750 text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Grid of interactive cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-fade">
        {filteredRooms.map((room) => (
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
