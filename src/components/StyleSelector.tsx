// src/components/StyleSelector.tsx
import React, { useState } from "react";
import { STYLE_REGIONS } from "../constants";
import type { DesignStyle } from "../types";

interface StyleSelectorProps {
  onStyleSelect: (style: DesignStyle | null) => void;
  selectedStyle: DesignStyle | null;
  disabled: boolean;
}

// Visual metadata with correct dark: prefix on all gradient tokens
const STYLE_CARD_META: Record<string, { desc: string; gradient: string; badge?: string }> = {
  "japandi": {
    desc: "Minimalist blend of Japanese peace and Scandinavian hygge.",
    gradient: "from-[#2e2b24] via-[#1a1816] to-[#0f0e0c]",
    badge: "Trending"
  },
  "wabi-sabi": {
    desc: "Rustic textures honoring natural asymmetry and imperfection.",
    gradient: "from-[#2f271f] via-[#1b1511] to-[#0d0a08]"
  },
  "zen": {
    desc: "Pure tranquility with natural bamboo, screens and earth elements.",
    gradient: "from-[#232924] via-[#121612] to-[#0a0c0a]"
  },
  "chinese-zen": {
    desc: "Calm layout styled with dark rosewood furniture and jade accents.",
    gradient: "from-[#331c1a] via-[#1a0f0e] to-[#0c0707]"
  },
  "mid-century-modern": {
    desc: "1950s atomic age clean walnut timbers and organic curves.",
    gradient: "from-[#332515] via-[#1c130a] to-[#0d0905]"
  },
  "barbiecore": {
    desc: "Playful high-gloss pink surfaces, neon lights and chic decors.",
    gradient: "from-[#441a31] via-[#220c18] to-[#12050c]",
    badge: "Retro Bold"
  },
  "steampunk": {
    desc: "Vintage copper pipes, exposed rivets, gears, and leather details.",
    gradient: "from-[#3b2216] via-[#1e1009] to-[#0f0704]"
  },
  "art-nouveau": {
    desc: "Intricate whip-lash curves, elegant vines and stained glass tones.",
    gradient: "from-[#1c2e27] via-[#0f1a16] to-[#070c0a]"
  },
  "gothic-revival": {
    desc: "Dramatic ribbed vaults, deep velvets and lancet window shapes.",
    gradient: "from-[#261f2e] via-[#130f18] to-[#0b080f]"
  },
  "art-deco": {
    desc: "Gilded age geometric shapes, mirrors and brass luxury details.",
    gradient: "from-[#38301b] via-[#1e190e] to-[#0f0c07]"
  },
  "boho": {
    desc: "Eclectic macramé fabrics, green indoor foliage and rattan accents.",
    gradient: "from-[#33241c] via-[#1d140f] to-[#0e0a07]"
  },
  "minimalist": {
    desc: "Sleek monochrome palette, hidden storage and raw open volume.",
    gradient: "from-[#22252a] via-[#121417] to-[#0a0b0d]",
    badge: "Classic"
  },
  "industrial": {
    desc: "Exposed brick patterns, structural metal pipes and concrete wash.",
    gradient: "from-[#25282d] via-[#131518] to-[#0b0c0e]"
  },
  "scandinavian": {
    desc: "Light ash timbers, pastel fabrics and warm ambient candlelight.",
    gradient: "from-[#1d2731] via-[#0e141a] to-[#080b0e]"
  },
  "traditional": {
    desc: "Rich mahogany moldings, matching pairs and ornate fabrics.",
    gradient: "from-[#2b2b28] via-[#161614] to-[#0c0c0b]"
  },
  "coastal": {
    desc: "Sun-bleached driftwood furniture, linen curtains and ocean blue tones.",
    gradient: "from-[#1b2a33] via-[#0e161c] to-[#070b0e]"
  },
  "farmhouse": {
    desc: "Rustic white shiplap walls, reclaimed barn wood and cast iron.",
    gradient: "from-[#2b2b28] via-[#161614] to-[#0c0c0b]"
  }
};

const StyleSelector: React.FC<StyleSelectorProps> = ({
  onStyleSelect,
  selectedStyle,
  disabled,
}) => {
  const [openRegionId, setOpenRegionId] = useState<string | null>("european");

  const toggleRegion = (regionId: string) => {
    if (openRegionId === regionId) {
      setOpenRegionId(null);
    } else {
      setOpenRegionId(regionId);
    }
  };

  const handleStyleClick = (style: DesignStyle) => {
    onStyleSelect(style);
  };

  return (
    <div
      className={`w-full transition-all duration-300 ${
        disabled ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      <h2 className="text-xl md:text-2xl font-extrabold text-white mb-4 flex items-center gap-2">
        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-900/30 border border-purple-500/20 text-purple-400 text-sm font-bold">2</span>
        Choose Design Style
      </h2>

      <div className="space-y-3">
        {STYLE_REGIONS.map((region) => {
          const isRegionOpen = openRegionId === region.regionId;
          return (
            <div
              key={region.regionId}
              className="bg-obsidian-850 border border-gray-800/60 rounded-xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleRegion(region.regionId)}
                disabled={disabled}
                className="w-full flex justify-between items-center p-4 text-left text-white font-bold hover:bg-obsidian-800/50 transition-colors focus:outline-none disabled:cursor-not-allowed text-sm md:text-base"
              >
                <span className="tracking-wide">{region.regionName}</span>
                <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-obsidian-800 border border-gray-750 text-gray-400">
                  <svg
                    className={`h-4 w-4 transition-transform duration-250 ${
                      isRegionOpen ? "rotate-180" : "rotate-0"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>

              {/* Styles Grid inside Accordion */}
              {isRegionOpen && (
                <div className="bg-obsidian-900/80 p-4 border-t border-gray-800/40 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade">
                  {region.styles.map((style) => {
                    const isSelected = selectedStyle?.id === style.id;
                    const meta = STYLE_CARD_META[style.id] || {
                      desc: "Apply this custom theme style to your uploaded scene layout.",
                      gradient: "from-obsidian-800 via-obsidian-850 to-obsidian-900"
                    };

                    return (
                      <button
                        key={style.id}
                        onClick={() => handleStyleClick(style)}
                        disabled={disabled}
                        className={`
                          relative text-left p-4 rounded-xl transition-all duration-300 flex flex-col justify-between h-[115px] overflow-hidden group border
                          ${
                            isSelected
                              ? "border-purple-500 bg-gradient-to-br from-purple-950/40 to-obsidian-900 shadow-md shadow-purple-500/5 ring-1 ring-purple-500"
                              : "border-gray-750 hover:border-purple-400 bg-gradient-to-br " + meta.gradient + " hover:scale-[1.02] shadow-sm hover:shadow-md"
                          }
                          disabled:cursor-not-allowed disabled:hover:scale-100
                        `}
                      >
                        {/* Selector Indicator */}
                        {isSelected && (
                          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-purple-500 rounded-bl-lg"></div>
                        )}

                        {/* Card Content */}
                        <div className="relative z-10 w-full pr-6">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-sm text-white group-hover:text-purple-400 transition-colors">
                              {style.name}
                            </span>
                            {meta.badge && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/20">
                                {meta.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-gray-300 line-clamp-2 leading-relaxed">
                            {meta.desc}
                          </p>
                        </div>

                        {/* Subtle interactive hover light */}
                        <div className="absolute inset-0 bg-purple-500/[0.02] dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedStyle && !disabled && (
        <div className="mt-4 p-3 rounded-xl bg-purple-900/15 border border-purple-500/20 text-xs text-purple-300 flex items-center gap-2 animate-fade">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-purple-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Selected Style: <strong className="text-white">{selectedStyle.name}</strong>. Ready to design!
          </span>
        </div>
      )}
    </div>
  );
};

export default StyleSelector;
