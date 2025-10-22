
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import StyleSelector from './components/StyleSelector';
import ResultDisplay from './components/ResultDisplay';
import Loader from './components/Loader';
import { generateDecoratedImage } from './services/geminiService';
import type { DesignStyle } from './types';

const App: React.FC = () => {
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<DesignStyle | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File) => {
    setUploadedImageFile(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    // Reset results when a new image is uploaded
    setGeneratedImageUrl(null);
    setError(null);
  }, []);

  const handleDecorateClick = async () => {
    if (!uploadedImageFile || !selectedStyle) {
      setError("Please upload an image and select a style first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const base64Image = await generateDecoratedImage(uploadedImageFile, selectedStyle.name);
      setGeneratedImageUrl(`data:image/png;base64,${base64Image}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto bg-gray-800/50 rounded-2xl shadow-xl p-6 md:p-8 space-y-8 backdrop-blur-sm border border-gray-700/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ImageUploader onImageUpload={handleImageUpload} imageUrl={originalImageUrl} />
            <StyleSelector
              onStyleSelect={setSelectedStyle}
              selectedStyle={selectedStyle}
              disabled={!uploadedImageFile}
            />
          </div>

          <div className="text-center">
            <button
              onClick={handleDecorateClick}
              disabled={!uploadedImageFile || !selectedStyle || isLoading}
              className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isLoading ? 'Decorating...' : '✨ Decorate My Room'}
            </button>
          </div>
        </div>

        {error && (
            <div className="max-w-5xl mx-auto mt-8 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">
                <p><strong>Oops!</strong> {error}</p>
            </div>
        )}

        {isLoading && (
            <div className="max-w-5xl mx-auto mt-8">
                <Loader message="Our AI is redecorating... this might take a moment!" />
            </div>
        )}

        {generatedImageUrl && originalImageUrl && (
          <ResultDisplay originalImage={originalImageUrl} generatedImage={generatedImageUrl} />
        )}

      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
