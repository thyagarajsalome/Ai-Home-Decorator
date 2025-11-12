import React, { useState, useRef } from "react";
import { useDrag } from "@use-gesture/react";

interface ResultDisplayProps {
  originalImage: string;
  generatedImage: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  originalImage,
  generatedImage,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  // This hook binds the drag gesture to the slider handle
  const bind = useDrag(
    ({ down, movement: [mx], memo, event }) => {
      event?.preventDefault(); // Prevent page scroll while dragging

      const containerWidth = containerRef.current?.offsetWidth;
      if (!containerWidth) return;

      // Use memo to store the initial slider position on drag start
      const startPos = memo || sliderPosition;

      // Calculate new position based on drag movement
      const newPos = startPos + (mx / containerWidth) * 100;

      // Clamp the position between 0 and 100
      const clampedPos = Math.max(0, Math.min(100, newPos));

      setSliderPosition(clampedPos);

      // If this is the first drag event (down is true), store the starting position
      return down ? startPos : clampedPos;
    },
    {
      axis: "x", // Only track horizontal movement
      from: () => [
        (sliderPosition / 100) * (containerRef.current?.offsetWidth || 0),
        0,
      ],
    }
  );

  const handleDownload = () => {
    // ... (download logic remains unchanged)
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "ai-decorated-room.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    // ... (share logic remains unchanged)
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const file = new File([blob], "ai-decorated-room.png", {
        type: blob.type,
      });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "My AI Decorated Room!",
          text: "Check out how I redesigned my room with the AI Home Decorator app!",
          files: [file],
        });
      } else {
        alert("Sharing is not supported on this browser.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      alert("An error occurred while trying to share the image.");
    }
  };

  const canShare = typeof navigator.share === "function";

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
        Your Redesigned Room!
      </h2>
      <div
        ref={containerRef}
        className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl select-none"
        // Stop touch actions to prevent page scroll on mobile
        style={{ touchAction: "none" }}
      >
        <img
          src={originalImage}
          alt="Original Room"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
          }}
        >
          <img
            src={generatedImage}
            alt="Decorated Room"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        </div>

        {/* Slider Handle - now draggable */}
        <div
          {...bind()} // Bind the drag gesture here
          className="absolute top-0 bottom-0 w-1 bg-white/80 cursor-ew-resize backdrop-blur-sm transform -translate-x-1/2"
          style={{ left: `${sliderPosition}%`, touchAction: "none" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full shadow-md grid place-items-center backdrop-blur-sm text-gray-800 pointer-events-none">
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </div>
        </div>

        {/* Hidden range input for accessibility */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 pointer-events-none" // Visually hidden but still usable
          aria-label="Before and after image slider"
        />

        {/* Labels */}
        <div className="absolute top-2 left-2 py-1 px-2 bg-black/50 rounded-md text-sm font-semibold pointer-events-none">
          Before
        </div>
        <div className="absolute top-2 right-2 py-1 px-2 bg-black/50 rounded-md text-sm font-semibold pointer-events-none">
          After
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        {/* ... (buttons remain unchanged) ... */}
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 font-semibold text-white rounded-lg transition-transform duration-200 transform-gpu hover:scale-105 bg-gray-700 hover:bg-gray-600"
          aria-label="Download generated image"
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Download
        </button>

        {canShare && (
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 font-semibold text-white rounded-lg transition-transform duration-200 transform-gpu hover:scale-105 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600"
            aria-label="Share generated image"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Share
          </button>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;
