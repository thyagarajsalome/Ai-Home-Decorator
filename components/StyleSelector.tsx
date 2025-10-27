import React from "react";
import { DESIGN_STYLES } from "../constants"; //
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
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //
    const selectedId = event.target.value; //
    if (!selectedId) {
      //
      onStyleSelect(null); //
      return; //
    }
    const style = DESIGN_STYLES.find((s) => s.id === selectedId); //
    onStyleSelect(style || null); //
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
      {/* Dropdown for style selection */}
      <div className="relative">
        {" "}
        {/* */}
        <select
          id="style-select"
          value={selectedStyle?.id || ""} //
          onChange={handleChange}
          disabled={disabled} //
          className="block w-full appearance-none bg-gray-700 border border-gray-600 text-white py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70" //
        >
          <option value="" disabled={!selectedStyle}>
            {" "}
            {/* */}
            -- Select a Style --
          </option>
          {DESIGN_STYLES.map(
            //
            (style) => (
              <option key={style.id} value={style.id}>
                {" "}
                {/* */}
                {style.name}
              </option>
            )
          )}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          {" "}
          {/* */}
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {/* REMOVED Preview Image Section */}
    </div>
  );
};

export default StyleSelector; //
