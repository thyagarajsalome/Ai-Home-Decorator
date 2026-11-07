"use client";
import React, { useState, useMemo } from "react";
import { ELEMENT_CATEGORIES } from "../constants";
import type { SelectionChoice, StudioGroup } from "../types";

interface StyleSelectorProps {
  onStyleSelect: (style: SelectionChoice | null) => void;
  selectedStyle: SelectionChoice | null;
  disabled: boolean;
}

const STUDIO_TABS: { id: "all" | StudioGroup; label: string; icon: string }[] = [
  { id: "all", label: "All Studios", icon: "✨" },
  { id: "interior", label: "Interiors", icon: "🛋️" },
  { id: "exterior", label: "Architecture", icon: "🏡" },
  { id: "landscape", label: "Landscapes", icon: "🌿" },
  { id: "commercial", label: "Commercial", icon: "🏢" },
];

const StyleSelector: React.FC<StyleSelectorProps> = ({
  onStyleSelect,
  selectedStyle,
  disabled,
}) => {
  // Find which category the currently selected style belongs to, default to 'full_redesign'
  const initialCategory = useMemo(() => {
    if (!selectedStyle) return "full_redesign";
    const found = ELEMENT_CATEGORIES.find((cat) =>
      cat.choices.some((c) => c.name === selectedStyle.name)
    );
    return found ? found.id : "full_redesign";
  }, [selectedStyle]);

  const [activeCategoryId, setActiveCategoryId] = useState<string>(initialCategory);
  const [selectedStudio, setSelectedStudio] = useState<"all" | StudioGroup>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const activeCategory = useMemo(() => {
    return (
      ELEMENT_CATEGORIES.find((c) => c.id === activeCategoryId) ||
      ELEMENT_CATEGORIES[0]
    );
  }, [activeCategoryId]);

  // Categories filtered by the active studio tab
  const visibleCategories = useMemo(() => {
    if (selectedStudio === "all") return ELEMENT_CATEGORIES;
    return ELEMENT_CATEGORIES.filter((c) => c.studioGroup === selectedStudio);
  }, [selectedStudio]);

  // Filter styles if user searches
  const filteredChoices = useMemo(() => {
    if (!searchQuery.trim()) {
      return activeCategory.choices;
    }
    const q = searchQuery.toLowerCase();
    return activeCategory.choices.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.promptSuffix.toLowerCase().includes(q)
    );
  }, [activeCategory, searchQuery]);

  return (
    <div
      className={`w-full transition-all duration-300 flex flex-col ${
        disabled ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base md:text-lg font-extrabold text-white flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-md bg-amber-950/40 border border-amber-500/30 text-amber-400 text-xs">
            🎨
          </span>
          Choose Design Style
        </h2>
        {selectedStyle && (
          <span className="text-[11px] font-semibold text-amber-300 truncate max-w-[180px] bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">
            Selected: <strong className="text-white">{selectedStyle.name}</strong>
          </span>
        )}
      </div>

      {/* Studio Category Group Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-2.5 no-scrollbar">
        {STUDIO_TABS.map((tab) => {
          const isActive = selectedStudio === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setSelectedStudio(tab.id);
                setSearchQuery("");
                if (tab.id !== "all") {
                  const firstInGroup = ELEMENT_CATEGORIES.find((c) => c.studioGroup === tab.id);
                  if (firstInGroup && activeCategory.studioGroup !== tab.id) {
                    setActiveCategoryId(firstInGroup.id);
                  }
                }
              }}
              disabled={disabled}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? "bg-amber-600 border-amber-500 text-white shadow-sm"
                  : "bg-obsidian-850 hover:bg-obsidian-800 border-gray-750 text-gray-300 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Category Dropdown & Quick Selector Bar */}
      <div className="flex flex-col gap-2 mb-3">
        <div className="flex items-center justify-between gap-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
            Sub-Category
          </label>
          <span className="text-[10px] text-amber-400 font-semibold">
            {activeCategory.choices.length} Styles Available
          </span>
        </div>

        {/* Custom Expandable Dropdown */}
        <div className="relative">
          <select
            value={activeCategoryId}
            onChange={(e) => {
              setActiveCategoryId(e.target.value);
              setSearchQuery("");
            }}
            disabled={disabled}
            className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-amber-500/30 text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer shadow-md transition-all pr-10"
          >
            {visibleCategories.map((cat) => (
              <option key={cat.id} value={cat.id} className="bg-obsidian-900 text-white font-semibold py-1">
                {cat.icon} {cat.name} ({cat.choices.length} styles)
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-amber-400 flex items-center gap-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 hidden sm:inline">Change</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Quick Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {visibleCategories.map((category) => {
            const isActive = activeCategoryId === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  setActiveCategoryId(category.id);
                  setSearchQuery("");
                }}
                disabled={disabled}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 border ${
                  isActive
                    ? "bg-amber-600/40 border-amber-500 text-white shadow-sm ring-1 ring-amber-500/50"
                    : "bg-obsidian-850/80 hover:bg-obsidian-800 border-gray-750/70 text-gray-400 hover:text-white"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Style Search / Quick Filter Bar */}
      <div className="relative mb-2.5">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${activeCategory.name} styles...`}
          disabled={disabled}
          className="w-full pl-8 pr-3 py-2 rounded-xl bg-obsidian-850 border border-gray-800 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent transition-all"
        />
        <svg
          className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-3 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-2.5 top-2.5 text-xs text-gray-500 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {/* Scrollable Compact Grid for Styles */}
      <div className="max-h-[340px] overflow-y-auto pr-1.5 custom-scrollbar grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-obsidian-900/60 p-2.5 rounded-xl border border-gray-800/80">
        {filteredChoices.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-8 text-center text-gray-400">
            <p className="text-xs font-semibold">No styles match "{searchQuery}"</p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-2 text-xs text-amber-400 hover:underline"
            >
              Clear search filter
            </button>
          </div>
        ) : (
          filteredChoices.map((choice) => {
            const isSelected = selectedStyle?.name === choice.name;

            return (
              <button
                key={choice.name}
                type="button"
                onClick={() => onStyleSelect(choice)}
                disabled={disabled}
                className={`
                  relative text-left p-3 rounded-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group border h-[72px]
                  ${
                    isSelected
                      ? "border-amber-500 bg-gradient-to-br from-amber-950/50 to-obsidian-900 ring-1 ring-amber-500 shadow-sm shadow-orange-500/20"
                      : "border-gray-800 hover:border-gray-700 bg-obsidian-850/90 hover:bg-obsidian-800 hover:scale-[1.01]"
                  }
                  disabled:cursor-not-allowed
                `}
              >
                {/* Active Indicator Pin */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-3 h-3 bg-amber-500 rounded-bl-md flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                )}

                <div className="w-full pr-3">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span
                      className={`font-bold text-xs truncate ${
                        isSelected ? "text-amber-300" : "text-white group-hover:text-amber-300"
                      } transition-colors`}
                    >
                      {choice.name}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 line-clamp-2 leading-tight">
                    {choice.promptSuffix}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default StyleSelector;
