// pages/Home.tsx
import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// --- *** ADDED IMPORTS FOR COMPONENTS AND TYPES *** ---
import ImageUploader from "../components/ImageUploader";
import StyleSelector from "../components/StyleSelector";
import ResultDisplay from "../components/ResultDisplay";
import Loader from "../components/Loader";
import { generateDecoratedImage } from "../services/geminiService";
import type { DesignStyle } from "../types";
// --- ****************************************** ---

import { useAuth } from "../context/AuthContext";
// import { sendEmailVerification } from "firebase/auth"; // Keep commented unless using resend
// import { auth } from "../firebase"; // Keep commented unless using resend

const MAX_GENERATIONS = 3;

const Home: React.FC = () => {
  const { currentUser, getIdToken } = useAuth();
  const navigate = useNavigate();

  // State declarations (already correct)
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<DesignStyle | null>(null);
  const [roomDescription, setRoomDescription] = useState<string>("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generationCount, setGenerationCount] = useState<number>(0);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    setIsVerified(currentUser?.emailVerified ?? false);
    if (currentUser && !currentUser.emailVerified) {
      setError(null);
    }
  }, [currentUser]);

  const handleImageChange = useCallback(
    (file: File | null) => {
      setUploadedImageFile(file);
      if (originalImageUrl) URL.revokeObjectURL(originalImageUrl);
      setOriginalImageUrl(file ? URL.createObjectURL(file) : null);
      setGeneratedImageUrl(null);
      setError(null);
      setRoomDescription("");
      setSelectedStyle(null);
    },
    [originalImageUrl]
  );

  const handleDecorateClick = async () => {
    if (!currentUser) {
      setError("Please log in or sign up to decorate.");
      return;
    }
    if (!isVerified) {
      setError(
        "Please verify your email address to start decorating. Check your inbox!"
      );
      return;
    }
    if (generationCount >= MAX_GENERATIONS) {
      alert("You've reached your free generation limit for this session.");
      return;
    }
    const idToken = await getIdToken();
    if (!idToken) {
      setError("Could not authenticate. Please try logging in again.");
      return;
    }
    if (!uploadedImageFile || !selectedStyle || !roomDescription) {
      setError(
        "Please upload an image, describe the room, and select a style."
      );
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      // Added null check for safety, though button state should prevent this
      if (!uploadedImageFile || !selectedStyle) {
        throw new Error("Missing image or style selection.");
      }
      const base64Image = await generateDecoratedImage(
        uploadedImageFile,
        selectedStyle.name,
        roomDescription,
        idToken
      );
      setGeneratedImageUrl(`data:image/png;base64,${base64Image}`);
      setGenerationCount((prevCount) => prevCount + 1);
    } catch (err) {
      let message = "An unknown error occurred.";
      if (err instanceof Error) message = err.message;
      if (message.includes("Rate limit exceeded")) {
        message =
          "You have reached your free generation limit. Consider upgrading for more.";
      } else if (
        message.includes("Invalid token") ||
        message.includes("No token provided") ||
        message.includes("401") ||
        message.includes("403")
      ) {
        message = "Authentication failed. Please log in again.";
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const isLimitReached = generationCount >= MAX_GENERATIONS;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {currentUser && !isVerified && !isLoading && (
        <div className="max-w-5xl mx-auto mb-6 p-4 bg-yellow-900/50 border border-yellow-700 text-yellow-300 rounded-lg text-center">
          <p>
            Please check your email ({currentUser.email}) to verify your account
            before you can decorate.
          </p>
          {/* Optional Resend Button */}
        </div>
      )}
      <div className="max-w-5xl mx-auto bg-gray-800/80 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-700/50 backdrop-blur-sm flex flex-col space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <ImageUploader
            onImageChange={handleImageChange}
            currentImage={uploadedImageFile}
            currentDescription={roomDescription}
            onDescriptionChange={setRoomDescription}
            disabled={isLoading || !currentUser || !isVerified}
          />
          <StyleSelector
            onStyleSelect={setSelectedStyle}
            selectedStyle={selectedStyle}
            disabled={
              !uploadedImageFile || isLoading || !currentUser || !isVerified
            }
          />
        </div>
        <div className="text-center">
          {!currentUser && !isLoading && (
            <p className="text-yellow-400 mb-4">
              Please{" "}
              <Link to="/login" className="underline hover:text-yellow-300">
                Login
              </Link>{" "}
              or{" "}
              <Link to="/signup" className="underline hover:text-yellow-300">
                Sign Up
              </Link>{" "}
              to start decorating.
            </p>
          )}
          <button
            onClick={handleDecorateClick}
            disabled={
              !uploadedImageFile ||
              !selectedStyle ||
              !roomDescription ||
              isLoading ||
              !currentUser ||
              !isVerified ||
              isLimitReached
            }
            className={`px-8 py-4 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-300 ${
              isLimitReached
                ? "bg-gray-600 cursor-not-allowed opacity-70"
                : !currentUser
                ? "bg-gray-500 cursor-not-allowed"
                : !isVerified
                ? "bg-yellow-700 cursor-not-allowed"
                : isLoading
                ? "bg-gray-600 cursor-wait"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:scale-105"
            } disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100`}
          >
            {isLoading
              ? "Decorating..."
              : isLimitReached
              ? "🔒 Limit Reached"
              : !currentUser
              ? "Login to Decorate"
              : !isVerified
              ? "Verify Email to Decorate"
              : "✨ Decorate My Room"}
          </button>
          {currentUser && isVerified && (
            <p className="text-sm text-gray-400 mt-2">
              Generations used this session: {generationCount}/{MAX_GENERATIONS}
            </p>
          )}
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
