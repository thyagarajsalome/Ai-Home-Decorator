"use client";
import React, { useState } from 'react';

interface ResultDisplayProps {
  originalImage: string;
  generatedImage: string;
  onTryAnotherStyle?: () => void;
  onNewPhoto?: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  originalImage,
  generatedImage,
  onTryAnotherStyle,
  onNewPhoto,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'ai-decorated-room.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const file = new File([blob], 'ai-decorated-room.png', { type: blob.type });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'My AI Decorated Room!',
          text: 'Check out how I redesigned my room with the AI Home Decorator app!',
          files: [file],
        });
      } else {
        alert('Sharing is not supported on this browser.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      alert('An error occurred while trying to share the image.');
    }
  };

  const canShare = typeof navigator.share === 'function';

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 animate-slideUp">
      <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 dark:from-purple-400 dark:via-pink-500 dark:to-purple-600 bg-clip-text text-transparent font-heading">
        Your Redesigned Room!
      </h2>

      {/* Comparison Slider Frame */}
      <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-900/60 select-none cursor-ew-resize group transition-colors duration-300">
        
        {/* Before Image (Background) */}
        <img 
          src={originalImage} 
          alt="Original Room" 
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* After Image (Foreground Clipped) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img 
            src={generatedImage} 
            alt="Decorated Room" 
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Vertical Split Line Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize transform -translate-x-1/2"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Pulsing center icon handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-obsidian-900 rounded-full shadow-lg border-2 border-purple-500/80 grid place-items-center backdrop-blur-sm text-purple-600 group-hover:scale-105 active:scale-95 transition-all duration-200">
            <svg className="h-5 w-5 animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>

        {/* Input Overlay range slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
          aria-label="Before and after image slider"
        />
        
        {/* Fullscreen button overlay */}
        <button
          type="button"
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 z-20 py-1.5 px-3 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/15 transition-all hover:scale-105 flex items-center gap-1.5 shadow-md"
          title="View Fullscreen"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          <span>Fullscreen</span>
        </button>

        {/* Labels Overlay */}
        <div className="absolute bottom-4 left-4 py-1.5 px-3 bg-black/60 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/10 pointer-events-none uppercase tracking-wider">
          Before
        </div>
        <div className="absolute bottom-4 right-4 py-1.5 px-3 bg-purple-950/70 backdrop-blur-md rounded-lg text-xs font-bold text-purple-200 border border-purple-500/20 pointer-events-none uppercase tracking-wider">
          Redesign
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3.5 mt-8">
        {onTryAnotherStyle && (
          <button
            type="button"
            onClick={onTryAnotherStyle}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-bold text-white rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-purple-500/20 text-sm"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Another Style On This Room
          </button>
        )}

        <button
          onClick={handleDownload}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-bold text-gray-200 hover:text-white rounded-xl border border-gray-750 hover:border-gray-600 bg-obsidian-850 hover:bg-obsidian-800 transition-all duration-200 transform hover:scale-[1.02] shadow-sm text-sm"
          aria-label="Download generated image"
        >
          <svg className="h-4 w-4 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download Redesign
        </button>
        
        {canShare && (
          <button
            onClick={handleShare}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-bold text-gray-200 hover:text-white rounded-xl border border-gray-750 hover:border-gray-600 bg-obsidian-850 hover:bg-obsidian-800 transition-all duration-200 transform hover:scale-[1.02] shadow-sm text-sm"
            aria-label="Share generated image"
          >
            <svg className="h-4 w-4 text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Share
          </button>
        )}

        {onNewPhoto && (
          <button
            type="button"
            onClick={onNewPhoto}
            className="w-full sm:w-auto px-4 py-3 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
          >
            Upload Different Room
          </button>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md animate-fade"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 text-white bg-obsidian-900 border border-gray-700 p-2.5 rounded-xl hover:bg-obsidian-800 transition-colors"
            aria-label="Close fullscreen"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={generatedImage}
            alt="Fullscreen Redesign"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="text-xs text-gray-400 mt-4">Click anywhere or Esc to close</p>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
