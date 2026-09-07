"use client";
import React, { useState, useMemo } from "react";
import SafeImage from "@/components/SafeImage";

export interface ShowcaseRoom {
  id: string;
  category: "living" | "bedroom" | "kitchen" | "bath" | "outdoor" | "walls";
  roomBadge: string;
  styleName: string;
  styleCategory: string;
  title: string;
  image: string;
  fallbackImage: string;
}

export const USA_SHOWCASE_ROOMS: ShowcaseRoom[] = [
  {
    id: "living-room",
    category: "living",
    roomBadge: "Living Hall",
    styleName: "Modern",
    styleCategory: "full_redesign",
    title: "Modern Living Hall",
    image: "/images/showcase/living-room.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "bedroom",
    category: "bedroom",
    roomBadge: "Bedroom",
    styleName: "Bohemian",
    styleCategory: "full_redesign",
    title: "Bohemian Bedroom",
    image: "/images/showcase/bedroom.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "kitchen",
    category: "kitchen",
    roomBadge: "Kitchen",
    styleName: "Farmhouse Kitchen",
    styleCategory: "kitchen",
    title: "Modern Kitchen",
    image: "/images/showcase/kitchen.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "bathroom",
    category: "bath",
    roomBadge: "Bathroom",
    styleName: "Luxury Spa",
    styleCategory: "bathroom",
    title: "Luxury Spa Bathroom",
    image: "/images/showcase/bathroom.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "patio",
    category: "outdoor",
    roomBadge: "Patio",
    styleName: "Teak Timber Decking",
    styleCategory: "outdoor_patio",
    title: "Outdoor Patio & Deck",
    image: "/images/showcase/patio.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "wall-paints",
    category: "walls",
    roomBadge: "Wall Paints",
    styleName: "Navy Blue Accent",
    styleCategory: "wall_paint",
    title: "Navy Blue Accent Wall",
    image: "/images/showcase/wall-paint.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
  },
];

interface ShowcaseCardProps {
  room: ShowcaseRoom;
  onApplyStyle?: (styleName: string, categoryId: string) => void;
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ room, onApplyStyle }) => {
  return (
    <div className="bg-obsidian-900/90 border border-gray-800/80 rounded-2xl overflow-hidden shadow-xl hover:border-purple-500/40 transition-all duration-300 flex flex-col group">
      {/* Clean Image Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-obsidian-950">
        <SafeImage
          src={room.image}
          fallbackSrc={room.fallbackImage}
          alt={room.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Floating Category Badge */}
        <div className="absolute top-3 left-3 pointer-events-none z-10">
          <span className="bg-black/80 backdrop-blur-md text-purple-300 text-xs font-bold px-3 py-1 rounded-lg border border-purple-500/30 shadow-sm">
            {room.roomBadge}
          </span>
        </div>

        {/* Bottom Title Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none">
          <h3 className="text-base sm:text-lg font-bold text-white font-heading drop-shadow-sm">
            {room.title}
          </h3>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-3 bg-obsidian-900">
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
