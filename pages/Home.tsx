import React, { useState, useCallback } from "react";
import ImageUploader from "../components/ImageUploader"; //
import StyleSelector from "../components/StyleSelector"; //
import ResultDisplay from "../components/ResultDisplay"; //
import Loader from "../components/Loader"; //
import { generateDecoratedImage } from "../services/geminiService"; //
import type { DesignStyle } from "../types"; //
import { ensureAnonymousUserAndToken } from "../firebase"; //

const MAX_GENERATIONS = 3; //

const Home: React.FC = () => {
  //
  // State for the uploaded file object
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null); //
  // State for the preview URL of the original image
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  // State for the selected style object
  const [selectedStyle, setSelectedStyle] = useState<DesignStyle | null>(null); //
  // State for the room description (either from dropdown or custom input)
  const [roomDescription, setRoomDescription] = useState<string>(""); //
  // State for the generated image URL (base64)
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  ); //
  // Loading and error states
  const [isLoading, setIsLoading] = useState<boolean>(false); //
  const [error, setError] = useState<string | null>(null); //
  // Generation count state
  const [generationCount, setGenerationCount] = useState<number>(0); //

  // Handler for when the image changes in ImageUploader
  const handleImageChange = useCallback(
    (file: File | null) => {
      setUploadedImageFile(file); // Update the file state

      // Clean up previous object URL to prevent memory leaks
      if (originalImageUrl) {
        URL.revokeObjectURL(originalImageUrl);
      }

      // Create a new object URL for the preview, or set to null if no file
      if (file) {
        setOriginalImageUrl(URL.createObjectURL(file));
      } else {
        setOriginalImageUrl(null);
      }

      // Reset states that depend on the image
      setGeneratedImageUrl(null);
      setError(null);
      setRoomDescription(""); // Also clear description when image changes
      setSelectedStyle(null); // Clear selected style too
      // setGenerationCount(0); // Optionally reset generation count
    },
    [originalImageUrl] // Depend on originalImageUrl for cleanup
  );

  // Handler for the "Decorate" button click
  const handleDecorateClick = async () => {
    //
    // Check generation limit first
    if (generationCount >= MAX_GENERATIONS) {
      //
      alert("You've reached your free generation limit..."); //
      return; //
    }

    // Ensure authentication and get token
    const idToken = await ensureAnonymousUserAndToken(); //
    if (!idToken) {
      //
      setError("Could not authenticate..."); //
      return; //
    }

    // Validate inputs
    if (!uploadedImageFile || !selectedStyle || !roomDescription) {
      //
      setError(
        "Please upload an image, describe the room, and select a style."
      ); //
      return; //
    }

    // Set loading state and clear previous results/errors
    setIsLoading(true); //
    setError(null); //
    setGeneratedImageUrl(null); //
    setGenerationCount((prevCount) => prevCount + 1); //

    // Call the backend API
    try {
      //
      const base64Image = await generateDecoratedImage(
        //
        uploadedImageFile, //
        selectedStyle.name, //
        roomDescription, //
        idToken //
      );
      setGeneratedImageUrl(`data:image/png;base64,${base64Image}`); //
    } catch (err) {
      //
      // Handle errors (same logic as before)
      let message = "An unknown error occurred."; //
      if (err instanceof Error) {
        //
        message = err.message; //
      }
      if (message.includes("limit exceeded")) {
        //
        message = "You have reached your free generation limit..."; //
      } else if (
        message.includes("Invalid token") ||
        message.includes("No token provided")
      ) {
        //
        message = "Authentication failed. Please refresh the page."; //
      }
      setError(message); //
    } finally {
      //
      setIsLoading(false); //
    }
  };

  const isLimitReached = generationCount >= MAX_GENERATIONS; //

  return (
    //
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto bg-gray-800/50 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-700/50 backdrop-blur-sm flex flex-col space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* --- CORRECTED ImageUploader props --- */}
          <ImageUploader
            onImageChange={handleImageChange} // Correct prop name
            currentImage={uploadedImageFile} // Pass the File object
            currentDescription={roomDescription} // Pass the description string
            onDescriptionChange={setRoomDescription} // Pass the setter function
            disabled={isLoading} // Pass the loading state
          />
          <StyleSelector //
            onStyleSelect={setSelectedStyle} //
            selectedStyle={selectedStyle} //
            // Disable style selector if no image is uploaded OR if loading
            disabled={!uploadedImageFile || isLoading}
          />
        </div>

        {/* Decorate Button */}
        <div className="text-center">
          {" "}
          {/* */}
          <button
            onClick={handleDecorateClick}
            disabled={
              !uploadedImageFile ||
              !selectedStyle ||
              !roomDescription || // Check description state directly
              isLoading ||
              isLimitReached //
            }
            className={`px-8 py-4 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-300 ${
              //
              isLimitReached
                ? "bg-gray-600 cursor-not-allowed opacity-70" //
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:scale-105" //
            } disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100`} //
          >
            {isLoading //
              ? "Decorating..." //
              : isLimitReached //
              ? "🔒 Limit Reached" //
              : "✨ Decorate My Room"}{" "}
            {/* */}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && ( //
        <div className="max-w-5xl mx-auto mt-8 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">
          <p>
            <strong>Oops!</strong> {error}
          </p>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && ( //
        <div className="max-w-5xl mx-auto mt-8">
          <Loader message="Our AI is redecorating... this might take a moment!" />{" "}
          {/* */}
        </div>
      )}

      {/* Result Display */}
      {generatedImageUrl &&
        originalImageUrl && ( //
          <ResultDisplay //
            originalImage={originalImageUrl} //
            generatedImage={generatedImageUrl} //
          />
        )}
    </main>
  );
};

export default Home; //
