// src/components/StyleSelector.tsx
import React, { useState } from "react";
import { STYLE_REGIONS } from "../constants";
import type { DesignStyle } from "../types";

interface StyleSelectorProps {
  onStyleSelect: (style: DesignStyle | null) => void;
  selectedStyle: DesignStyle | null;
  disabled: boolean;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({
  onStyleSelect,
  selectedStyle,
  disabled,
}) => {
  const [openRegionId, setOpenRegionId] = useState<string | null>(null);

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
      className={`w-full transition-opacity duration-300 ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {/* UPDATED: Heading Color */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        2. Choose a Style
      </h2>

      <div className="space-y-2">
        {STYLE_REGIONS.map((region) => (
          <div
            key={region.regionId}
            // UPDATED: Accordion container background and border
            className="bg-white dark:bg-gray-700/80 border border-gray-200 dark:border-gray-600/50 rounded-lg overflow-hidden shadow-sm dark:shadow-none"
          >
            {/* Region Header Button */}
            <button
              onClick={() => toggleRegion(region.regionId)}
              disabled={disabled}
              // UPDATED: Text color
              className="w-full flex justify-between items-center p-4 text-left text-gray-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 disabled:opacity-70"
            >
              <span>{region.regionName}</span>
              <svg
                className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform ${
                  openRegionId === region.regionId ? "rotate-180" : "rotate-0"
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
            </button>

            {/* Styles List */}
            {openRegionId === region.regionId && (
              // UPDATED: List container background
              <div className="bg-gray-50 dark:bg-gray-800/70 p-4 grid grid-cols-2 gap-3">
                {region.styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => handleStyleClick(style)}
                    disabled={disabled}
                    // UPDATED: Button styles for active/inactive states in both themes
                    className={`
                      w-full p-3 rounded-md text-sm text-center transition-all shadow-sm dark:shadow-none
                      ${
                        selectedStyle?.id === style.id
                          ? "bg-purple-600 text-white font-bold ring-2 ring-purple-400"
                          : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-transparent"
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  >
                    {style.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedStyle && !disabled && (
        // UPDATED: Selected text color
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
          Selected:{" "}
          <span className="font-bold text-purple-600 dark:text-purple-400">
            {selectedStyle.name}
          </span>
        </p>
      )}
    </div>
  );
};

export default StyleSelector;
