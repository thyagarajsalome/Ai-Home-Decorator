"use client";
import React, { useState, useMemo } from "react";
import SafeImage from "@/components/SafeImage";

export interface ShowcaseRoom {
  id: string;
  category: "living" | "bedroom" | "kitchen" | "bath" | "outdoor" | "walls" | "flooring" | "lighting";
  roomBadge: string;
  location: string;
  styleName: string;
  styleCategory: string;
  title: string;
  description: string;
  image: string;
  fallbackImage: string;
}

export const USA_SHOWCASE_ROOMS: ShowcaseRoom[] = [
  {
    id: "living-room-modern",
    category: "living",
    roomBadge: "Living Hall",
    location: "Los Angeles, CA",
    styleName: "Modern",
    styleCategory: "full_redesign",
    title: "Modern Luxury Living",
    description: "Sleek geometric sectional, modern architectural floor lighting, statement art, and refined marble coffee tables.",
    image: "/images/showcase/living-room-after.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "bedroom-japandi",
    category: "bedroom",
    roomBadge: "Bedroom",
    location: "Seattle, WA",
    styleName: "Japandi",
    styleCategory: "full_redesign",
    title: "Organic Japandi Sanctuary",
    description: "Tranquil retreat with low-profile oak platform bed, shoji screens, warm wood paneling, and soft linen layers.",
    image: "/images/showcase/bedroom-after.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "kitchen-farmhouse",
    category: "kitchen",
    roomBadge: "Kitchen",
    location: "Austin, TX",
    styleName: "Farmhouse Kitchen",
    styleCategory: "kitchen",
    title: "Luxury Quartz Farmhouse Kitchen",
    description: "Architectural kitchen redesign with custom white shaker cabinets, solid waterfall quartz island, and warm brass fixtures.",
    image: "/images/showcase/kitchen-after.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "bathroom-spa",
    category: "bath",
    roomBadge: "Bathroom",
    location: "Miami, FL",
    styleName: "Luxury Spa",
    styleCategory: "bathroom",
    title: "Luxury Spa Sanctuary",
    description: "High-end wellness bathroom sanctuary featuring a deep oval soaking tub, black fixtures, and stone wall slabs.",
    image: "/images/showcase/bathroom-after.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "patio-mediterranean",
    category: "outdoor",
    roomBadge: "Patio",
    location: "Phoenix, AZ",
    styleName: "Mediterranean Terrace",
    styleCategory: "outdoor_patio",
    title: "Mediterranean Resort Terrace",
    description: "Terracotta stone pavers, wrought iron lounge seating, ambient string lighting, and lush potted olive trees.",
    image: "/images/showcase/patio-after.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "walls-brick",
    category: "walls",
    roomBadge: "Wall Paints",
    location: "New York, NY",
    styleName: "Exposed Brick",
    styleCategory: "wall_paint",
    title: "Brooklyn Exposed Brick & Paint",
    description: "Authentic loft aesthetic with rich red masonry brick textures, warm directional lighting, and designer matte paint.",
    image: "/images/showcase/wall-paint-after.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "flooring-marble",
    category: "flooring",
    roomBadge: "Flooring",
    location: "Chicago, IL",
    styleName: "Marble Flooring",
    styleCategory: "flooring",
    title: "Calacatta Gold Marble Flooring",
    description: "High-gloss polished white Calacatta marble flooring with subtle golden veining that brightens the entire space.",
    image: "/images/showcase/flooring-after.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "lighting-golden-hour",
    category: "lighting",
    roomBadge: "Lighting",
    location: "Denver, CO",
    styleName: "Golden Hour",
    styleCategory: "lighting_mood",
    title: "Cinematic Golden Hour Mood",
    description: "Warm directional lighting with golden sun rays, deep architectural shadows, and cozy evening warmth.",
    image: "/images/showcase/lighting-after.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
  },
];

interface ShowcaseCardProps {
  room: ShowcaseRoom;
  onApplyStyle?: (styleName: string, categoryId: string) => void;
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ room, onApplyStyle }) => {
  return (
    <div className="bg-obsidian-900/90 border border-gray-800/80 rounded-2xl overflow-hidden shadow-xl hover:border-purple-500/40 transition-all duration-300 flex flex-col group">
      {/* Single Clean Image Frame */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-obsidian-950">
        <SafeImage
          src={room.image}
          fallbackSrc={room.fallbackImage}
          alt={room.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <span className="bg-black/75 backdrop-blur-md text-purple-300 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-purple-500/30">
            {room.roomBadge}
          </span>
          <span className="bg-black/75 backdrop-blur-md text-gray-300 text-[11px] font-medium px-2.5 py-1 rounded-lg border border-gray-700/50">
            📍 {room.location}
          </span>
        </div>

        {/* Soft bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-obsidian-900 via-obsidian-900/40 to-transparent pointer-events-none"></div>
      </div>

      {/* Info & Action */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-base font-extrabold text-white mb-1.5 font-heading group-hover:text-purple-300 transition-colors">
            {room.title}
          </h3>
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-5">
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
          className="w-full py-2.5 px-3 rounded-xl bg-obsidian-850 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 border border-gray-750 hover:border-transparent text-xs font-bold text-gray-200 hover:text-white transition-all shadow-sm flex items-center justify-center gap-1.5 group/btn"
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
  { id: "walls", label: "Wall Paints" },
];

const USAHomeShowcase: React.FC<USAHomeShowcaseProps> = ({ onSelectShowcaseStyle }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredRooms = useMemo(() => {
    if (selectedFilter === "all") return USA_SHOWCASE_ROOMS;
    return USA_SHOWCASE_ROOMS.filter((r) => r.category === selectedFilter);
  }, [selectedFilter]);

  return (
    <section id="showcase" className="w-full max-w-7xl mx-auto mt-16 px-4">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-gray-800/80 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">🇺🇸</span>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
              AI Room Transformations
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
            Complete Room & Element Transformations
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl leading-relaxed">
            Explore curated room designs across Living Hall, Bedroom, Kitchen, Bathroom, Patio, and Wall Paints. Tap any design to style your room instantly.
          </p>
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

      {/* Grid of clean single-image cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 animate-fade">
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
