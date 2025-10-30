// pages/Home.tsx
import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom"; // <-- Make sure Link is imported

import ImageUploader from "../components/ImageUploader";
import StyleSelector from "../components/StyleSelector";
import ResultDisplay from "../components/ResultDisplay";
import Loader from "../components/Loader";
import { generateDecoratedImage } from "../services/geminiService";
import type { DesignStyle } from "../types";

import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

// --- NO LONGER NEEDED ---
// const MAX_GENERATIONS = 2;

const Home: React.FC = () => {
  const { currentUser, getIdToken } = useAuth();

  // State declarations
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<DesignStyle | null>(null);
  const [roomDescription, setRoomDescription] = useState<string>("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // --- 1. RENAME STATE ---
  const [generationCredits, setGenerationCredits] = useState<number>(0);
  const [isVerified, setIsVerified] = useState(false);

  // Effect to check verification status and load generation count
  useEffect(() => {
    setIsVerified(!!currentUser?.email_confirmed_at);

    if (currentUser && !currentUser.email_confirmed_at) {
      setError(null);
    }

    // --- 2. FETCH NEW COLUMN ---
    const fetchGenerationCredits = async () => {
      if (!currentUser) return;

      try {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("generation_credits") // <-- Fetch 'generation_credits'
          .eq("id", currentUser.id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setGenerationCredits(data.generation_credits); // <-- Set new state
        }
      } catch (dbError: any) {
        console.error("Error fetching generation credits:", dbError);
        setError("Could not load your user profile.");
      }
    };

    fetchGenerationCredits();
    // ---------------------------------------------
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
    // --- 3. UPDATE LOGIC CHECK ---
    if (generationCredits <= 0) {
      setError("You are out of credits. Please purchase a pack to continue.");
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

      // --- 4. UPDATE DECREMENT LOGIC ---
      const newCredits = generationCredits - 1;
      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({ generation_credits: newCredits }) // <-- Subtract 1 credit
        .eq("id", currentUser.id);

      if (updateError) {
        throw updateError;
      }
      setGenerationCredits(newCredits); // <-- Update local state
      // ------------------------------------------------
    } catch (err) {
      let message = "An unknown error occurred.";
      if (err instanceof Error) message = err.message;
      if (message.includes("Rate limit exceeded")) {
        message = "The AI is busy, please try again in a moment.";
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

  // --- 5. UPDATE LIMIT CHECK ---
  const isLimitReached = generationCredits <= 0;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {currentUser && !isVerified && !isLoading && (
        <div className="max-w-5xl mx-auto mb-6 p-4 bg-yellow-900/50 border border-yellow-700 text-yellow-300 rounded-lg text-center">
          <p>
            Please check your email ({currentUser.email}) to verify your account
            before you can decorate.
          </p>
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
            <div className="max-w-lg mx-auto mb-6 p-4 bg-gray-700/50 border border-purple-800/60 rounded-lg text-center shadow-lg">
              <p className="text-lg text-gray-200">
                Please{" "}
                <Link
                  to="/login"
                  className="font-bold text-purple-400 hover:text-purple-300 transition-colors duration-200"
                >
                  Login
                </Link>{" "}
                or{" "}
                <Link
                  to="/signup"
                  className="font-bold text-purple-400 hover:text-purple-300 transition-colors duration-200"
                >
                  Sign Up
                </Link>{" "}
                to start decorating.
              </p>
            </div>
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
              ? "🔒 Out of Credits" // <-- 6. UPDATE BUTTON TEXT
              : !currentUser
              ? "Login to Decorate"
              : !isVerified
              ? "Verify Email to Decorate"
              : "✨ Decorate My Room"}
          </button>
          {currentUser && isVerified && (
            // --- 7. UPDATE UI TEXT ---
            <p className="text-sm text-gray-400 mt-2">
              Credits remaining: {generationCredits}
            </p>
          )}
        </div>
      </div>

      {/* This is the new "Pro" upsell message */}
      {/* --- 8. UPDATE LINK --- */}
      {isLimitReached && !isLoading && (
        <div className="max-w-5xl mx-auto mt-8 p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Your Free Generations Have Ended
          </h2>
          <p className="text-purple-100 text-lg mb-4">
            To continue decorating, please purchase a credit pack.
          </p>
          <Link
            to="/pricing" // <-- This now links to your new page
            className="inline-block px-6 py-3 font-bold text-purple-600 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200"
          >
            Buy Credits
          </Link>
        </div>
      )}

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
