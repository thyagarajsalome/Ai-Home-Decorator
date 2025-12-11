// src/pages/Home.tsx
import React, { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import ImageUploader from "../components/ImageUploader";
import StyleSelector from "../components/StyleSelector";
import CustomDesignInput from "../components/CustomDesignInput";
import ResultDisplay from "../components/ResultDisplay";
import Loader from "../components/Loader";
import Hero from "../components/Hero";
import { generateDecoratedImage } from "../services/geminiService";
import type { DesignStyle } from "../types";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";
import { STYLE_GENERATION_COST, CUSTOM_GENERATION_COST } from "../constants";
import { designTips } from "../designTips";

const Home: React.FC = () => {
  const { currentUser, getIdToken, currentUserRole, isAppMode } = useAuth();
  const isAdmin = currentUserRole === "admin";

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
  const [loadingTip, setLoadingTip] = useState<string>("");

  const appSectionRef = useRef<HTMLDivElement>(null);

  const scrollToApp = () => {
    appSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
      if (error) throw error;
      if (data) setGenerationCredits(data.generation_credits);
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

  const getLoadingTip = (prompt: string, room: string): string => {
    const p = prompt.toLowerCase();
    const r = room.toLowerCase();
    let tipKey = "default";
    if (p.includes("japandi")) tipKey = "japandi";
    else if (p.includes("minimalist")) tipKey = "minimalist";
    else if (p.includes("industrial")) tipKey = "industrial";
    else if (p.includes("boho")) tipKey = "boho";
    else if (r.includes("living room")) tipKey = "living room";
    else if (r.includes("bedroom")) tipKey = "bedroom";
    else if (r.includes("kitchen")) tipKey = "kitchen";
    const tipsArray = designTips[tipKey] || designTips["default"];
    return tipsArray[Math.floor(Math.random() * tipsArray.length)];
  };

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

    setLoadingTip(getLoadingTip(designInput, roomDescription));
    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      if (!uploadedImageFile) throw new Error("Missing image.");

      const fullImageUrl = await generateDecoratedImage(
        uploadedImageFile,
        designInput,
        roomDescription,
        idToken,
        designMode
      );
      setGeneratedImageUrl(fullImageUrl);

      await fetchGenerationCredits();
    } catch (err) {
      let message = "An unknown error occurred.";
      if (err instanceof Error) message = err.message;
      if (message.includes("Rate limit exceeded")) {
        message = "The AI is busy, please try again in a moment.";
      } else if (
        message.includes("Invalid token") ||
        message.includes("401") ||
        message.includes("403")
      ) {
        if (message.includes("You do not have enough credits")) {
          message = message;
        } else {
          message = "Authentication failed. Please log in again.";
        }
      }
      setError(message);
      fetchGenerationCredits();
    } finally {
      setIsLoading(false);
    }
  };

  const costForCurrentMode =
    designMode === "style" ? STYLE_GENERATION_COST : CUSTOM_GENERATION_COST;
  const isLimitReached = generationCredits < costForCurrentMode && !isAdmin;
  const isStep1Complete = !!uploadedImageFile;
  const isDisabled = isLoading || !currentUser || !isVerified;
  const isDesignMissing =
    designMode === "style" ? !selectedStyle : !customPrompt;

  const getButtonActiveStyle = (isActive: boolean) =>
    isActive
      ? "bg-purple-600 text-white font-bold ring-2 ring-purple-400"
      : "bg-gray-700 text-gray-300 hover:bg-gray-600";

  const handleExternalPurchase = () => {
    window.open("https://aihomedecorator.com/pricing", "_blank");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* 1. Hero Section */}
      <Hero onStartClick={scrollToApp} />

      {/* 2. Main App Content */}
      <main
        ref={appSectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24 w-full"
      >
        {currentUser && !isVerified && !isLoading && (
          <div className="max-w-7xl mx-auto mb-8 p-4 bg-yellow-900/50 border border-yellow-700 text-yellow-300 rounded-xl text-center shadow-lg">
            <p>
              Please check your email ({currentUser.email}) to verify your
              account before you can decorate.
            </p>
          </div>
        )}

        {/* --- MAIN WORKSPACE CONTAINER --- */}
        {/* max-w-7xl matches the Hero width */}
        <div className="w-full max-w-7xl mx-auto bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-10 border-2 border-purple-500/30 flex flex-col space-y-10 relative overflow-hidden">
          {/* Highlight Glow Effect */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-70"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Left Column: Image Upload */}
            <div className="flex flex-col space-y-4">
              <ImageUploader
                onImageChange={handleImageChange}
                currentImage={uploadedImageFile}
                currentDescription={roomDescription}
                onDescriptionChange={setRoomDescription}
                disabled={isDisabled}
              />
            </div>

            {/* Right Column: Style Selection */}
            <div
              className={`transition-opacity duration-300 flex flex-col space-y-4 ${
                !isStep1Complete
                  ? "opacity-50 pointer-events-none grayscale"
                  : ""
              }`}
            >
              <div className="flex w-full rounded-xl bg-gray-900/60 p-1.5 gap-2 border border-gray-700">
                <button
                  onClick={() => setDesignMode("style")}
                  disabled={!isStep1Complete || isDisabled}
                  className={`w-1/2 p-3 rounded-lg text-sm font-bold transition-all transform ${getButtonActiveStyle(
                    designMode === "style"
                  )} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Choose a Style
                </button>
                <button
                  onClick={() => setDesignMode("custom")}
                  disabled={!isStep1Complete || isDisabled}
                  className={`w-1/2 p-3 rounded-lg text-sm font-bold transition-all transform ${getButtonActiveStyle(
                    designMode === "custom"
                  )} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Custom Design
                </button>
              </div>

              {designMode === "custom" && !isDisabled && (
                <div className="flex items-center justify-center gap-2 text-sm text-purple-300 bg-purple-900/30 border border-purple-500/30 p-3 rounded-lg">
                  <span className="font-medium">
                    ✨ Custom designs cost{" "}
                    <strong>{CUSTOM_GENERATION_COST} credits</strong>
                  </span>
                </div>
              )}

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

          <div className="text-center pt-4 border-t border-gray-700/50">
            {!currentUser && !isLoading && (
              <div className="max-w-lg mx-auto mb-8 p-6 bg-gray-900/80 border border-gray-700 rounded-xl text-center shadow-lg">
                <p className="text-xl text-white font-semibold mb-2">
                  Ready to redesign?
                </p>
                <p className="text-gray-400 mb-4">
                  Create an account to save your designs and get free credits.
                </p>
                <div className="flex justify-center gap-4">
                  <Link
                    to="/login"
                    className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
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
              className={`w-full md:w-auto px-10 py-5 text-xl font-bold text-white rounded-xl shadow-xl transition-all duration-300 transform ${
                !currentUser
                  ? "bg-gray-600 cursor-not-allowed opacity-50"
                  : !isVerified
                  ? "bg-yellow-700 cursor-not-allowed"
                  : isLimitReached
                  ? "bg-red-700 cursor-not-allowed"
                  : isLoading
                  ? "bg-gray-700 cursor-wait scale-95"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:scale-105 hover:shadow-purple-500/25 ring-4 ring-transparent hover:ring-purple-500/30"
              } disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100`}
            >
              {isLoading
                ? " ✨ Designing Your Room..."
                : !currentUser
                ? "Login to Start Designing"
                : !isVerified
                ? "Verify Email to Continue"
                : isLimitReached
                ? "Not Enough Credits"
                : `🚀 Generate Redesign (${costForCurrentMode} Credit${
                    costForCurrentMode > 1 ? "s" : ""
                  })`}
            </button>

            {currentUser && isVerified && (
              <div className="mt-4 flex flex-col items-center">
                <p className="text-sm font-medium text-gray-400">
                  Credits remaining:{" "}
                  <span className="text-white">
                    {isAdmin ? "∞ (Admin)" : generationCredits}
                  </span>
                </p>

                {isLimitReached && (
                  <div className="mt-4 p-4 bg-blue-900/30 border border-blue-500/50 text-blue-200 rounded-xl text-center max-w-md animate-pulse">
                    <p className="font-semibold mb-2">Run out of credits?</p>
                    {isAppMode ? (
                      <button
                        onClick={handleExternalPurchase}
                        className="text-white underline hover:text-blue-100 font-bold"
                      >
                        Tap here to top up
                      </button>
                    ) : (
                      <Link
                        to="/pricing"
                        className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium"
                      >
                        Get More Credits
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="max-w-4xl mx-auto mt-10 p-6 bg-red-900/80 border-2 border-red-500/50 text-white rounded-2xl text-center shadow-lg backdrop-blur-sm">
            <h3 className="text-lg font-bold mb-2">Something went wrong</h3>
            <p>{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="max-w-4xl mx-auto mt-10">
            <Loader
              message="Our AI is redecorating your room... this might take a moment!"
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
    </div>
  );
};

export default Home;
