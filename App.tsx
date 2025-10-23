import React, { useState, useCallback } from "react";
import Header from "./components/Header";
import ImageUploader from "./components/ImageUploader";
import StyleSelector from "./components/StyleSelector";
import ResultDisplay from "./components/ResultDisplay";
import Loader from "./components/Loader";
import { httpsCallable } from "firebase/functions"; // Import the callable function
import { functions } from "./firebaseConfig"; // Import your initialized functions
import type { DesignStyle } from "./types";

// Helper function to convert a File to a Base64 string
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // remove the "data:image/jpeg;base64," part
      resolve(result.split(",")[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

const App: React.FC = () => {
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<DesignStyle | null>(null);
  const [roomDescription, setRoomDescription] = useState<string>("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File) => {
    setUploadedImageFile(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    // Reset results when a new image is uploaded
    setGeneratedImageUrl(null);
    setError(null);
    setRoomDescription(""); // Also reset description
  }, []);

  const handleDecorateClick = async () => {
    if (!uploadedImageFile || !selectedStyle || !roomDescription) {
      setError(
        "Please upload an image, describe the room, and select a style first."
      );
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      // 1. Convert the file to Base64
      const base64Image = await fileToBase64(uploadedImageFile);

      // 2. Prepare the data payload for the cloud function
      const data = {
        base64Image: base64Image,
        mimeType: uploadedImageFile.type,
        styleName: selectedStyle.name,
        roomDescription: roomDescription,
      };

      // 3. Get a reference to the cloud function
      const generateImage = httpsCallable(functions, "generateImage");

      // 4. Call the function and await the result
      const result: any = await generateImage(data);

      // 5. Get the new base64 image from the function's response
      const newBase64 = result.data.generatedBase64;
      if (!newBase64) {
        throw new Error("Function returned no image data.");
      }

      setGeneratedImageUrl(`data:image/png;base64,${newBase64}`);
    } catch (err) {
      console.error("Error calling cloud function:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto bg-gray-800/50 rounded-2xl shadow-xl p-6 md:p-8 space-y-8 backdrop-blur-sm border border-gray-700/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <ImageUploader
              onImageUpload={handleImageUpload}
              imageUrl={originalImageUrl}
              description={roomDescription}
              onDescriptionChange={setRoomDescription}
            />
            <StyleSelector
              onStyleSelect={setSelectedStyle}
              selectedStyle={selectedStyle}
              disabled={!uploadedImageFile}
            />
          </div>

          <div className="text-center">
            <button
              onClick={handleDecorateClick}
              disabled={
                !uploadedImageFile ||
                !selectedStyle ||
                !roomDescription ||
                isLoading
              }
              className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isLoading ? "Decorating..." : "✨ Decorate My Room"}
            </button>
          </div>
        </div>

        {error && (
          <div className="max-w-5xl mx-auto mt-8 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">
            <p>
              <strong>Oops!</strong> {error}
            </p>
          </div>
        )}

        {isLoading && (
          <div className="max-w-5xl mx-auto mt-8">
            <Loader message="Our AI is redecorating... this might take a moment!" />
          </div>
        )}

        {generatedImageUrl && originalImageUrl && (
          <ResultDisplay
            originalImage={originalImageUrl}
            generatedImage={generatedImageUrl}
          />
        )}
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
