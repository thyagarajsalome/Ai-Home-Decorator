import React, { useState, useCallback } from "react";
import ImageUploader from "../components/ImageUploader";
import StyleSelector from "../components/StyleSelector";
import ResultDisplay from "../components/ResultDisplay";
import Loader from "../components/Loader";
import { generateDecoratedImage } from "../services/geminiService";
import type { DesignStyle } from "../types";
import { ensureAnonymousUserAndToken } from "../firebase";

// --- ADD THIS LINE ---
const MAX_GENERATIONS = 3; // Define the limit

const Home: React.FC = () => {
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<DesignStyle | null>(null);
  const [roomDescription, setRoomDescription] = useState<string>("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // --- ADD THIS STATE ---
  const [generationCount, setGenerationCount] = useState<number>(0);

  const handleImageUpload = useCallback((file: File) => {
    setUploadedImageFile(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setGeneratedImageUrl(null);
    setError(null);
    setRoomDescription("");
    // Reset generation count when a new image is uploaded (optional, depends on desired behavior)
    // setGenerationCount(0);
  }, []);

  const handleDecorateClick = async () => {
    // --- ADD LIMIT CHECK AT THE VERY BEGINNING ---
    if (generationCount >= MAX_GENERATIONS) {
      alert(
        "You've reached your free generation limit for this session. Please upgrade to Pro for unlimited decorations!"
      );
      // Here you might want to trigger showing an 'UpgradeAccount' component/modal
      // e.g., setShowUpgradeModal(true);
      return; // Stop the function here
    }
    // --- END LIMIT CHECK ---

    // 1. Ensure user is signed in (anonymously) and get token
    const idToken = await ensureAnonymousUserAndToken();

    if (!idToken) {
      setError(
        "Could not authenticate. Please refresh the page or check your connection."
      );
      setIsLoading(false); // Make sure loading stops if auth fails
      return;
    }

    // 2. Check other conditions (image, style, description)
    if (!uploadedImageFile || !selectedStyle || !roomDescription) {
      setError(
        "Please upload an image, describe the room, and select a style first."
      );
      return; // No need to set isLoading false here, it wasn't set yet
    }

    // 3. Set loading state and clear errors
    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    // --- INCREMENT COUNT BEFORE API CALL (counts attempts) ---
    // If you only want to count *successful* generations, move this inside the try block after the API call succeeds.
    setGenerationCount((prevCount) => prevCount + 1);
    // --------------------------------------------------------

    // 4. Call backend service with the token
    try {
      const base64Image = await generateDecoratedImage(
        uploadedImageFile,
        selectedStyle.name,
        roomDescription,
        idToken // Pass the token
      );
      setGeneratedImageUrl(`data:image/png;base64,${base64Image}`);
    } catch (err) {
      let message = "An unknown error occurred.";
      if (err instanceof Error) {
        message = err.message;
      }
      if (message.includes("limit exceeded")) {
        message =
          "You have reached your free generation limit for this session. Refresh to start a new session.";
      } else if (
        message.includes("Invalid token") ||
        message.includes("No token provided")
      ) {
        message = "Authentication failed. Please refresh the page.";
      }
      setError(message);
      // --- OPTIONAL: Decrement count if API call fails ---
      // If you only count successful generations, you'd remove the increment above
      // and only increment upon success. If counting attempts, you might want
      // to revert the count here on certain types of errors (e.g., non-quota errors).
      // For simplicity, we are currently counting clicks/attempts regardless of API success.
      // setGenerationCount(prevCount => prevCount - 1); // Example of reverting count
      // ----------------------------------------------------
    } finally {
      setIsLoading(false);
    }
  };

  // --- CALCULATE IF LIMIT REACHED FOR BUTTON STATE ---
  const isLimitReached = generationCount >= MAX_GENERATIONS;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto bg-gray-800/50 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-700/50 backdrop-blur-sm flex flex-col space-y-8">
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
          {/* --- MODIFY BUTTON --- */}
          <button
            onClick={handleDecorateClick}
            disabled={
              !uploadedImageFile ||
              !selectedStyle ||
              !roomDescription ||
              isLoading ||
              isLimitReached // <-- Add limit check to disabled state
            }
            className={`px-8 py-4 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-300 ${
              isLimitReached
                ? "bg-gray-600 cursor-not-allowed opacity-70" // Style for limit reached
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:scale-105"
            } disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100`}
          >
            {isLoading
              ? "Decorating..."
              : isLimitReached // <-- Change text/icon when limit is reached
              ? "🔒 Limit Reached"
              : "✨ Decorate My Room"}
          </button>
          {/* --- END BUTTON MODIFICATION --- */}
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
  );
};

export default Home;
