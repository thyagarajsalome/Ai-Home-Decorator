// src/components/CustomDesignInput.tsx
import React from "react";
import { MAX_CUSTOM_PROMPT_LENGTH } from "../constants";

interface CustomDesignInputProps {
  onPromptChange: (prompt: string) => void;
  currentPrompt: string;
  disabled: boolean;
}

const CustomDesignInput: React.FC<CustomDesignInputProps> = ({
  onPromptChange,
  currentPrompt,
  disabled,
}) => {
  const isTooLong = currentPrompt.length > MAX_CUSTOM_PROMPT_LENGTH;

  return (
    <div
      className={`w-full transition-all duration-300 ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <h2 className="text-xl md:text-2xl font-extrabold text-white mb-4 flex items-center gap-2">
        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-900/30 border border-purple-500/20 text-purple-400 text-sm font-bold">2</span>
        Describe Your Custom Design
      </h2>
      <p className="text-xs text-gray-400 mb-4 leading-normal font-medium">
        Be descriptive! Try suggestions like: <em className="text-gray-300 font-semibold">"A modern, white kitchen with white oak cabinets and gold fixtures"</em> or <em className="text-gray-300 font-semibold">"A warm mid-century office with a teak desk and high-quality leather chairs."</em>
      </p>
      
      <div className="relative">
        <textarea
          value={currentPrompt}
          onChange={(e) => onPromptChange(e.target.value)}
          disabled={disabled}
          maxLength={MAX_CUSTOM_PROMPT_LENGTH}
          placeholder="Describe your design vision in detail here..."
          rows={4}
          className={`w-full p-4 rounded-xl bg-obsidian-850 border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-all leading-relaxed shadow-sm ${
            isTooLong ? "border-red-500 focus:ring-red-500" : "border-gray-750"
          }`}
        />
      </div>

      <p
        className={`text-right text-[10px] mt-1.5 font-semibold ${
          isTooLong ? "text-red-500 dark:text-red-400" : "text-gray-500"
        }`}
      >
        {currentPrompt.length} / {MAX_CUSTOM_PROMPT_LENGTH} characters
      </p>
    </div>
  );
};

export default CustomDesignInput;
