import React, { useState } from 'react';

interface ResultDisplayProps {
  originalImage: string;
  generatedImage: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);

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
        
        {/* Labels Overlay */}
        <div className="absolute bottom-4 left-4 py-1.5 px-3 bg-black/60 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/10 pointer-events-none uppercase tracking-wider">
          Before
        </div>
        <div className="absolute bottom-4 right-4 py-1.5 px-3 bg-purple-950/70 backdrop-blur-md rounded-lg text-xs font-bold text-purple-200 border border-purple-500/20 pointer-events-none uppercase tracking-wider">
          Redesign
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
        <button
          onClick={handleDownload}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-xl border border-gray-300 dark:border-gray-750/60 hover:border-gray-400 dark:hover:border-gray-600 bg-white dark:bg-obsidian-850 hover:bg-gray-50 dark:hover:bg-obsidian-800 transition-all duration-200 transform hover:scale-[1.02] shadow-sm"
          aria-label="Download generated image"
        >
          <svg className="h-5 w-5 text-purple-600 dark:text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download Redesign
        </button>
        
        {canShare && (
          <button
            onClick={handleShare}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 font-bold text-white rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-purple-500/15"
            aria-label="Share generated image"
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Share Design
          </button>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;