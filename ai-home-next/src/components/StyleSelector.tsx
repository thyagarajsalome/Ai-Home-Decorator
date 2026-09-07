"use client";
import React, { useState, useMemo } from "react";
import { ELEMENT_CATEGORIES } from "../constants";
import type { SelectionChoice } from "../types";

interface StyleSelectorProps {
  onStyleSelect: (style: SelectionChoice | null) => void;
  selectedStyle: SelectionChoice | null;
  disabled: boolean;
}

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
  const [searchQuery, setSearchQuery] = useState<string>("");

  const activeCategory = useMemo(() => {
    return (
      ELEMENT_CATEGORIES.find((c) => c.id === activeCategoryId) ||
      ELEMENT_CATEGORIES[0]
    );
  }, [activeCategoryId]);

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
          <span className="flex items-center justify-center w-6 h-6 rounded-md bg-purple-900/40 border border-purple-500/30 text-purple-400 text-xs font-bold">
            2
          </span>
          Choose Design Style
        </h2>
        {selectedStyle && (
          <span className="text-[11px] font-semibold text-purple-300 truncate max-w-[180px] bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/20">
            Selected: <strong className="text-white">{selectedStyle.name}</strong>
          </span>
        )}
      </div>

      {/* Category Pills / Horizontal Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2.5 no-scrollbar">
        {ELEMENT_CATEGORIES.map((category) => {
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
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border whitespace-nowrap ${
                isActive
                  ? "bg-purple-600/35 border-purple-500 text-white shadow-sm ring-1 ring-purple-500/40"
                  : "bg-obsidian-850 hover:bg-obsidian-800 border-gray-750 text-gray-400 hover:text-white"
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? "bg-purple-500/30 text-purple-200"
                    : "bg-obsidian-750 text-gray-400"
                }`}
              >
                {category.choices.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Style Search / Quick Filter Bar */}
      <div className="relative mb-2.5">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search in ${activeCategory.name}...`}
          disabled={disabled}
          className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-obsidian-850 border border-gray-800 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all"
        />
        <svg
          className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-2.5 pointer-events-none"
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
            className="absolute right-2.5 top-2 text-xs text-gray-500 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {/* Scrollable Compact Grid for Styles */}
      <div className="h-[280px] md:h-[310px] overflow-y-auto pr-1.5 custom-scrollbar grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-obsidian-900/60 p-2 rounded-xl border border-gray-800/80">
        {filteredChoices.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-8 text-center text-gray-400">
            <p className="text-xs font-semibold">No styles match "{searchQuery}"</p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-2 text-xs text-purple-400 hover:underline"
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
                      ? "border-purple-500 bg-gradient-to-br from-purple-950/50 to-obsidian-900 ring-1 ring-purple-500 shadow-sm shadow-purple-500/20"
                      : "border-gray-800 hover:border-gray-700 bg-obsidian-850/90 hover:bg-obsidian-800 hover:scale-[1.01]"
                  }
                  disabled:cursor-not-allowed
                `}
              >
                {/* Active Indicator Pin */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-3 h-3 bg-purple-500 rounded-bl-md flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                )}

                <div className="w-full pr-3">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span
                      className={`font-bold text-xs truncate ${
                        isSelected ? "text-purple-300" : "text-white group-hover:text-purple-300"
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
