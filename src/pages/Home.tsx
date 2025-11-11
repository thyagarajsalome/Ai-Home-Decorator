// pages/Home.tsx
import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

import ImageUploader from "../components/ImageUploader";
import StyleSelector from "../components/StyleSelector";
import CustomDesignInput from "../components/CustomDesignInput";
import ResultDisplay from "../components/ResultDisplay";
import Loader from "../components/Loader";
import { generateDecoratedImage } from "../services/geminiService";
import type { DesignStyle } from "../types";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";
import { STYLE_GENERATION_COST, CUSTOM_GENERATION_COST } from "../constants";
import { designTips } from "../designTips"; // <-- 1. IMPORT TIPS

const Home: React.FC = () => {
  const { currentUser, getIdToken, currentUserRole } = useAuth();
  const isAdmin = currentUserRole === "admin";

  // State declarations
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [roomDescription, setRoomDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generationCredits, setGenerationCredits] = useState<number>(0);
  const [isVerified, setIsVerified] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const [designMode, setDesignMode] = useState<"style" | "custom">("style");
  const [selectedStyle, setSelectedStyle] = useState<DesignStyle | null>(null);
  const [customPrompt, setCustomPrompt] = useState<string>("");

  const [loadingTip, setLoadingTip] = useState<string>(""); // <-- 2. ADD TIP STATE

  // ... (keep fetchGenerationCredits and useEffect hooks unchanged)
  const fetchGenerationCredits = useCallback(async () => {
    if (!currentUser) {
      setGenerationCredits(0);
      return;
    }
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
    }
  }, [currentUser, isAdmin]);

  useEffect(() => {
    setIsVerified(!!currentUser?.email_confirmed_at);
    if (currentUser && !currentUser.email_confirmed_at) {
      setError(null);
    }
    fetchGenerationCredits();
  }, [currentUser, fetchGenerationCredits]);

  // ... (keep handleImageChange unchanged)
  const handleImageChange = useCallback(
    (file: File | null) => {
      setUploadedImageFile(file);
      if (originalImageUrl) URL.revokeObjectURL(originalImageUrl);
      setOriginalImageUrl(file ? URL.createObjectURL(file) : null);
      setGeneratedImageUrl(null);
      setError(null);
      setRoomDescription("");
      setSelectedStyle(null);
      setCustomPrompt("");
      setDesignMode("style");
    },
    [originalImageUrl]
  );

  // --- 3. HELPER FUNCTION TO GET A TIP ---
  const getLoadingTip = (prompt: string, room: string): string => {
    const p = prompt.toLowerCase();
    const r = room.toLowerCase();

    let tipKey = "default"; // Start with default

    // Check for style keywords first
    if (p.includes("japandi")) tipKey = "japandi";
    else if (p.includes("minimalist")) tipKey = "minimalist";
    else if (p.includes("industrial")) tipKey = "industrial";
    else if (p.includes("boho")) tipKey = "boho";
    // Check for room type if no style matched
    else if (r.includes("living room")) tipKey = "living room";
    else if (r.includes("bedroom")) tipKey = "bedroom";
    else if (r.includes("kitchen")) tipKey = "kitchen";

    // Get the array of tips for the found key
    const tipsArray = designTips[tipKey] || designTips["default"];
    // Return a random tip from that array
    return tipsArray[Math.floor(Math.random() * tipsArray.length)];
  };

  const handleDecorateClick = async () => {
    // ... (keep validation checks)
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
    const idToken = await getIdToken();
    if (!idToken) {
      setError("Could not authenticate. Please try logging in again.");
      return;
    }
    const designInput =
      designMode === "style" ? selectedStyle?.name : customPrompt;
    if (!uploadedImageFile || !designInput || !roomDescription) {
      setError(
        "Please upload an image, describe the room, and select a style or provide a custom prompt."
      );
      return;
    }

    // --- 4. SET THE TIP BEFORE LOADING ---
    setLoadingTip(getLoadingTip(designInput, roomDescription));
    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      // ... (rest of the try block is unchanged)
      if (!uploadedImageFile) {
        throw new Error("Missing image.");
      }
      const base64Image = await generateDecoratedImage(
        uploadedImageFile,
        designInput,
        roomDescription,
        idToken,
        designMode
      );
      setGeneratedImageUrl(`data:image/png;base64,${base64Image}`);
      await fetchGenerationCredits();
    } catch (err) {
      // ... (error handling is unchanged)
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
        if (message.includes("You do not have enough credits")) {
          message = message;
        } else if (message.includes("out of credits")) {
          message =
            "You are out of credits. Please purchase a pack to continue.";
        } else {
          message = "Authentication failed. Please log in again.";
        }
      } else if (message.includes("Failed to generate the decorated image")) {
        message =
          "The decoration service failed to process your request. This may be a temporary server issue or an incompatible input image. Please try again.";
      }
      setError(message);
      fetchGenerationCredits();
    } finally {
      setIsLoading(false);
    }
  };

  // ... (keep variable checks: costForCurrentMode, isLimitReached, etc.)
  const costForCurrentMode =
    designMode === "style" ? STYLE_GENERATION_COST : CUSTOM_GENERATION_COST;
  const isLimitReached = generationCredits < costForCurrentMode && !isAdmin;
  const isStep1Complete = !!uploadedImageFile;
  const isDisabled = isLoading || !currentUser || !isVerified;
  const isDesignMissing =
    designMode === "style" ? !selectedStyle : !customPrompt;

  const getButtonActiveStyle = (isActive: boolean) =>
    isActive
      ? "bg-purple-600 text-white font-bold"
      : "bg-gray-700 text-gray-300 hover:bg-gray-600";

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ... (keep verification warning) */}
      {currentUser && !isVerified && !isLoading && (
        <div className="max-w-5xl mx-auto mb-6 p-4 bg-yellow-900/50 border border-yellow-700 text-yellow-300 rounded-lg text-center">
          <p>
            Please check your email ({currentUser.email}) to verify your account
            before you can decorate.
          </p>
        </div>
      )}

      {/* ... (keep main layout) */}
      <div className="max-w-5xl mx-auto bg-gray-800/80 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-700/50 backdrop-blur-sm flex flex-col space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* ... (keep ImageUploader) */}
          <ImageUploader
            onImageChange={handleImageChange}
            currentImage={uploadedImageFile}
            currentDescription={roomDescription}
            onDescriptionChange={setRoomDescription}
            disabled={isDisabled}
          />

          {/* ... (keep conditional rendering for step 2) */}
          <div
            className={`transition-opacity duration-300 ${
              !isStep1Complete ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {/* ... (keep toggle buttons) */}
            <div className="flex w-full rounded-lg bg-gray-900/50 p-1 mb-4 gap-1">
              <button
                onClick={() => setDesignMode("style")}
                disabled={!isStep1Complete || isDisabled}
                className={`w-1/2 p-2 rounded-md text-sm font-semibold transition-all ${getButtonActiveStyle(
                  designMode === "style"
                )} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Choose a Style
              </button>
              <button
                onClick={() => setDesignMode("custom")}
                disabled={!isStep1Complete || isDisabled}
                className={`w-1/2 p-2 rounded-md text-sm font-semibold transition-all ${getButtonActiveStyle(
                  designMode === "custom"
                )} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Custom Design
              </button>
            </div>

            {/* ... (keep styled notification) */}
            {designMode === "custom" && !isDisabled && (
              <div className="flex items-center justify-center gap-2 text-sm text-purple-300 bg-purple-900/40 border border-purple-700/60 p-2.5 rounded-lg -mt-2 mb-4">
                <svg
                  className="h-5 w-5 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs">
                  <strong>Note:</strong> Custom designs require{" "}
                  <strong>{CUSTOM_GENERATION_COST} credits</strong> per
                  generation.
                </span>
              </div>
            )}

            {/* ... (keep conditional components) */}
            {designMode === "style" ? (
              <StyleSelector
                onStyleSelect={setSelectedStyle}
                selectedStyle={selectedStyle}
                disabled={!isStep1Complete || isDisabled}
              />
            ) : (
              <CustomDesignInput
                onPromptChange={setCustomPrompt}
                currentPrompt={customPrompt}
                disabled={!isStep1Complete || isDisabled}
              />
            )}
          </div>
        </div>

        {/* ... (keep decorate button and credit display) */}
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
              !isStep1Complete ||
              !roomDescription ||
              isDesignMissing ||
              isLoading ||
              !currentUser ||
              !isVerified ||
              isLimitReached
            }
            className={`px-8 py-4 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-300 ${
              !currentUser
                ? "bg-gray-500 cursor-not-allowed"
                : !isVerified
                ? "bg-yellow-700 cursor-not-allowed"
                : isLimitReached
                ? "bg-red-700 cursor-not-allowed"
                : isLoading
                ? "bg-gray-600 cursor-wait"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:scale-105"
            } disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100`}
          >
            {isLoading
              ? "Decorating..."
              : !currentUser
              ? "Login to Decorate"
              : !isVerified
              ? "Verify Email to Decorate"
              : isLimitReached
              ? "Not Enough Credits"
              : `✨ Decorate (${costForCurrentMode} Credit${
                  costForCurrentMode > 1 ? "s" : ""
                })`}
          </button>
          {currentUser && isVerified && (
            <p className="text-sm text-gray-400 mt-2">
              Credits remaining: {isAdmin ? "∞ (Admin)" : generationCredits}
            </p>
          )}

          {currentUser && isVerified && isLimitReached && (
            <div className="mt-4 p-3 bg-blue-900/50 border border-blue-700 text-blue-300 rounded-lg text-center max-w-md mx-auto">
              <p>
                You're out of credits!{" "}
                <Link
                  to="/pricing"
                  className="font-bold text-purple-400 hover:underline"
                >
                  Buy more credits
                </Link>{" "}
                to continue decorating.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* --- 8. UPDATE LOADER COMPONENT CALL --- */}
      {error && (
        <div className="max-w-5xl mx-auto mt-8 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">
          <p>
            <strong>Oops!</strong> {error}
          </p>
        </div>
      )}
      {isLoading && (
        <div className="max-w-5xl mx-auto mt-8">
          <Loader
            message="Our AI is redecorating... this might take a moment!"
            tip={loadingTip}
          />
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
