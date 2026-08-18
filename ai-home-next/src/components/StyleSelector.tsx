"use client";
import React, { useState } from "react";
import { ELEMENT_CATEGORIES } from "../constants";
import type { SelectionChoice, SelectionCategory } from "../types";

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
  const [openCategoryId, setOpenCategoryId] = useState<string | null>("full_redesign");

  const toggleCategory = (categoryId: string) => {
    if (openCategoryId === categoryId) {
      setOpenCategoryId(null);
    } else {
      setOpenCategoryId(categoryId);
    }
  };

  const handleStyleClick = (style: SelectionChoice) => {
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
        Choose Element Category
      </h2>

      <div className="space-y-3">
        {ELEMENT_CATEGORIES.map((category) => {
          const isCategoryOpen = openCategoryId === category.id;
          return (
            <div
              key={category.id}
              className="bg-obsidian-850 border border-gray-800/60 rounded-xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleCategory(category.id)}
                disabled={disabled}
                className="w-full flex justify-between items-center p-4 text-left text-white font-bold hover:bg-obsidian-800/50 transition-colors focus:outline-none disabled:cursor-not-allowed text-sm md:text-base"
              >
                <span className="tracking-wide flex items-center gap-2">
                  <span>{category.icon}</span> {category.name}
                </span>
                <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-obsidian-800 border border-gray-750 text-gray-400">
                  <svg
                    className={`h-4 w-4 transition-transform duration-250 ${
                      isCategoryOpen ? "rotate-180" : "rotate-0"
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
              {isCategoryOpen && (
                <div className="bg-obsidian-900/80 p-4 border-t border-gray-800/40 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade">
                  {category.choices.map((choice) => {
                    const isSelected = selectedStyle?.name === choice.name;

                    return (
                      <button
                        key={choice.name}
                        onClick={() => handleStyleClick(choice)}
                        disabled={disabled}
                        className={`
                          relative text-left p-4 rounded-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group border min-h-[90px]
                          ${
                            isSelected
                              ? "border-purple-500 bg-gradient-to-br from-purple-950/40 to-obsidian-900 shadow-md shadow-purple-500/5 ring-1 ring-purple-500"
                              : "border-gray-750 hover:border-purple-400 bg-gradient-to-br from-obsidian-800 via-obsidian-850 to-obsidian-900 hover:scale-[1.02] shadow-sm hover:shadow-md"
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
                              {choice.name}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-300 line-clamp-2 leading-relaxed">
                            {choice.promptSuffix}
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
              d="M13 16h-1v-4h-1m1-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
