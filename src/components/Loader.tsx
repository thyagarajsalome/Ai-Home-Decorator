import React from "react";

// --- UPDATE PROPS ---
interface LoaderProps {
  message: string;
  tip?: string; // Make the tip optional
}

const Loader: React.FC<LoaderProps> = ({ message, tip }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8 text-center bg-gray-800/50 rounded-lg shadow-xl border border-gray-700/50">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-purple-500 rounded-full animate-ping opacity-75"></div>
        <div className="relative w-full h-full border-4 border-purple-400 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-purple-400 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
      <p className="text-lg font-medium text-gray-300">{message}</p>

      {/* --- ADD THIS BLOCK --- */}
      {tip && (
        <div className="w-full max-w-md px-4">
          <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-3">
            <p className="text-sm font-semibold text-purple-300 mb-1">
              Design Tip:
            </p>
            <p className="text-sm text-gray-300 italic">{tip}</p>
          </div>
        </div>
      )}
      {/* --- END BLOCK --- */}
    </div>
  );
};

export default Loader;
