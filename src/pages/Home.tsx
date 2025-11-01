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
  // --- 1. GET THE ROLE FROM CONTEXT ---
  const { currentUser, getIdToken, currentUserRole } = useAuth();
  const isAdmin = currentUserRole === "admin";

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
  const [generationCredits, setGenerationCredits] = useState<number>(0);
  const [isVerified, setIsVerified] = useState(false);

  // Effect to check verification status and load generation count
  useEffect(() => {
    setIsVerified(!!currentUser?.email_confirmed_at);

    if (currentUser && !currentUser.email_confirmed_at) {
      setError(null);
    }

    const fetchGenerationCredits = async () => {
      if (!currentUser) return;

      // --- 2. FOR ADMINS, JUST SET A HIGH NUMBER AND SKIP DB FETCH ---
      if (isAdmin) {
        setGenerationCredits(9999);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("generation_credits")
          .eq("id", currentUser.id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setGenerationCredits(data.generation_credits);
        }
      } catch (dbError: any) {
        console.error("Error fetching generation credits:", dbError);
        setError("Could not load your user profile.");
      }
    };

    fetchGenerationCredits();
  }, [currentUser, isAdmin]); // <-- Add isAdmin as dependency

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

    // --- 3. UPDATE CREDIT CHECK ---
    // also Admin- testing- Bypass- credits
    if (generationCredits <= 0 && !isAdmin) {
      // <-- Check if NOT admin
      setError("You are out of credits. Please purchase a pack to continue.");
      return;
    }

    // Admin Testing Bypass Credits
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
      // Only decrement if the user is NOT an admin
      if (!isAdmin) {
        const newCredits = generationCredits - 1;
        const { error: updateError } = await supabase
          .from("user_profiles")
          .update({ generation_credits: newCredits }) // <-- Subtract 1 credit
          .eq("id", currentUser.id);

        if (updateError) {
          throw updateError;
        }
        setGenerationCredits(newCredits); // <-- Update local state
      }
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
  const isLimitReached = generationCredits <= 0 && !isAdmin; // <-- Check if NOT admin

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ... (rest of the component is mostly the same) ... */}

      {/* --- 6. UPDATE CREDITS DISPLAY --- */}
      {currentUser && isVerified && (
        <p className="text-sm text-gray-400 mt-2">
          Credits remaining: {isAdmin ? "∞ (Admin)" : generationCredits}
        </p>
      )}

      {/* ... (rest of the component) ... */}
    </main>
  );
};

export default Home;
