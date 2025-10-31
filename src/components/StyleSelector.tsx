// src/components/StyleSelector.tsx
import React, { useState } from "react";
import { STYLE_REGIONS } from "../constants"; // <-- Import new constant
import type { DesignStyle } from "../types"; //

interface StyleSelectorProps {
  onStyleSelect: (style: DesignStyle | null) => void; //
  selectedStyle: DesignStyle | null; //
  disabled: boolean; //
}

const StyleSelector: React.FC<StyleSelectorProps> = ({
  //
  onStyleSelect,
  selectedStyle,
  disabled,
}) => {
  // State to track which region is open
  const [openRegionId, setOpenRegionId] = useState<string | null>(null);

  // Toggle region accordion
  const toggleRegion = (regionId: string) => {
    if (openRegionId === regionId) {
      setOpenRegionId(null); // Close if already open
    } else {
      setOpenRegionId(regionId); // Open new one
    }
  };

  // Handle style selection
  const handleStyleClick = (style: DesignStyle) => {
    onStyleSelect(style);
  };

  return (
    //
    <div
      className={`w-full transition-opacity duration-300 ${
        //
        disabled ? "opacity-50 pointer-events-none" : "" //
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-200 mb-4">
        2. Choose a Style
      </h2>

      {/* New Accordion Style Selector */}
      <div className="space-y-2">
        {STYLE_REGIONS.map((region) => (
          <div
            key={region.regionId}
            className="bg-gray-700/80 border border-gray-600/50 rounded-lg overflow-hidden"
          >
            {/* Region Header Button */}
            <button
              onClick={() => toggleRegion(region.regionId)}
              disabled={disabled}
              className="w-full flex justify-between items-center p-4 text-left text-white font-semibold focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 disabled:opacity-70"
            >
              <span>{region.regionName}</span>
              {/* Arrow Icon */}
              <svg
                className={`h-5 w-5 transition-transform ${
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

            {/* Styles List (conditionally rendered) */}
            {openRegionId === region.regionId && (
              <div className="bg-gray-800/70 p-4 grid grid-cols-2 gap-3">
                {region.styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => handleStyleClick(style)}
                    disabled={disabled}
                    className={`
                      w-full p-3 rounded-md text-sm text-center transition-all
                      ${
                        selectedStyle?.id === style.id
                          ? "bg-purple-600 text-white font-bold ring-2 ring-purple-400"
                          : "bg-gray-700 text-gray-200 hover:bg-gray-600"
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

      {/* Show the selected style for clarity */}
      {selectedStyle && !disabled && (
        <p className="text-gray-400 text-sm mt-3">
          Selected:{" "}
          <span className="font-bold text-purple-400">
            {selectedStyle.name}
          </span>
        </p>
      )}
    </div>
  );
};

export default StyleSelector; //
