// src/components/CustomDesignInput.tsx
import React from "react";
import { MAX_CUSTOM_PROMPT_LENGTH } from "../constants"; // We will add this constant

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
      className={`w-full transition-opacity duration-300 ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-200 mb-4">
        2. Describe Your Custom Design
      </h2>
      <p className="text-sm text-gray-400 mb-3">
        Be descriptive! Try things like "A modern, white kitchen with marble
        countertops and gold fixtures" or "A cozy bedroom with dark blue walls
        and a large bookshelf."
      </p>
      <textarea
        value={currentPrompt}
        onChange={(e) => onPromptChange(e.target.value)}
        disabled={disabled}
        maxLength={MAX_CUSTOM_PROMPT_LENGTH}
        placeholder="e.g., Add a red velvet sofa, hardwood floors, and a large leafy plant in the corner..."
        rows={4}
        className={`w-full p-3 rounded-lg bg-gray-700 text-white border ${
          isTooLong ? "border-red-500" : "border-gray-600"
        } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 disabled:opacity-70 disabled:cursor-not-allowed`}
      />
      <p
        className={`text-right text-xs mt-1 ${
          isTooLong ? "text-red-500" : "text-gray-400"
        }`}
      >
        {currentPrompt.length}/{MAX_CUSTOM_PROMPT_LENGTH}
      </p>
    </div>
  );
};

export default CustomDesignInput;
