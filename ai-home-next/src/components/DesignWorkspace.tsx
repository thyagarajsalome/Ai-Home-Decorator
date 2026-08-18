"use client";
import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";

import ImageUploader from "@/components/ImageUploader";
import StyleSelector from "@/components/StyleSelector";
import CustomDesignInput from "@/components/CustomDesignInput";
import ResultDisplay from "@/components/ResultDisplay";
import Loader from "@/components/Loader";
import { generateDecoratedImage } from "@/services/geminiService";
import type { SelectionChoice } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { STYLE_GENERATION_COST, CUSTOM_GENERATION_COST, ELEMENT_CATEGORIES } from "@/constants";
import { designTips } from "@/designTips";

interface DesignWorkspaceProps {
  initialCategory?: string;
  initialStyle?: string;
}

const DesignWorkspace: React.FC<DesignWorkspaceProps> = ({ initialCategory, initialStyle }) => {
  const { currentUser, getIdToken, currentUserRole, isAppMode, credits, refreshCredits } = useAuth();
  const isAdmin = currentUserRole === "admin";

  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [roomDescription, setRoomDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [designMode, setDesignMode] = useState<"style" | "custom">("style");
  
  // Find initial style object if provided
  const getInitialStyle = (): SelectionChoice | null => {
    if (!initialCategory || !initialStyle) return null;
    const cat = ELEMENT_CATEGORIES.find(c => c.id === initialCategory);
    if (!cat) return null;
    // URL friendly slug match (e.g. "Modern Farmhouse" -> "modern-farmhouse")
    const styleObj = cat.choices.find(s => 
      s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, '') === initialStyle
    );
    return styleObj || null;
  };

  const [selectedStyle, setSelectedStyle] = useState<SelectionChoice | null>(getInitialStyle());
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [loadingTip, setLoadingTip] = useState<string>("");

  useEffect(() => {
    setIsVerified(!!currentUser?.email_confirmed_at);
    if (currentUser && !currentUser.email_confirmed_at) {
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
      setSelectedStyle(getInitialStyle());
      setCustomPrompt("");
      setDesignMode("style");
    },
    [originalImageUrl, initialCategory, initialStyle]
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
      designMode === "style" ? (selectedStyle ? `${selectedStyle.name}: ${selectedStyle.promptSuffix}` : undefined) : customPrompt;
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

      // Sync credits globally inside AuthContext
      await refreshCredits();
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
      await refreshCredits();
    } finally {
      setIsLoading(false);
    }
  };

  const costForCurrentMode =
    designMode === "style" ? STYLE_GENERATION_COST : CUSTOM_GENERATION_COST;
  const isLimitReached = credits < costForCurrentMode && !isAdmin;
  const isStep1Complete = !!uploadedImageFile;
  const isDisabled = isLoading || !currentUser || !isVerified;
  const isDesignMissing =
    designMode === "style" ? !selectedStyle : !customPrompt;

  const getButtonActiveStyle = (isActive: boolean) =>
    isActive
      ? "bg-purple-600/90 text-white font-bold ring-1 ring-purple-400/50 shadow-md shadow-purple-500/10"
      : "bg-obsidian-800 text-gray-400 hover:text-white hover:bg-obsidian-750 border border-gray-750";

  const handleExternalPurchase = () => {
    window.open("https://aihomedecorator.com/pricing", "_blank");
  };

  return (
    <div className="flex flex-col w-full">
      {currentUser && !isVerified && !isLoading && (
        <div className="max-w-4xl mx-auto mb-10 p-5 w-full bg-yellow-950/20 border border-yellow-800/40 text-yellow-300 rounded-2xl text-center shadow-lg text-sm md:text-base animate-fade">
          <p className="font-semibold">
            Please check your email (<strong className="text-white">{currentUser.email}</strong>) to verify your
            account before you can decorate.
          </p>
        </div>
      )}

      {/* --- MAIN WORKSPACE CONTAINER --- */}
      <div className="w-full max-w-6xl mx-auto glass-card rounded-3xl p-6 md:p-10 border border-gray-800 flex flex-col space-y-10 relative overflow-hidden animate-slideUp">
        
        {/* Highlight Glow Effect Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-60"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
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
            className={`transition-all duration-300 flex flex-col space-y-6 ${
              !isStep1Complete
                ? "opacity-45 pointer-events-none grayscale"
                : ""
            }`}
          >
            <div className="flex flex-col space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Select Redesign Mode
              </span>
              <div className="flex w-full rounded-xl bg-obsidian-850 p-1.5 gap-2 border border-gray-800/60 shadow-inner">
                <button
                  onClick={() => setDesignMode("style")}
                  disabled={!isStep1Complete || isDisabled}
                  className={`w-1/2 p-3 rounded-lg text-xs md:text-sm font-bold transition-all ${getButtonActiveStyle(
                    designMode === "style"
                  )} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Preset Design Styles
                </button>
                <button
                  onClick={() => setDesignMode("custom")}
                  disabled={!isStep1Complete || isDisabled}
                  className={`w-1/2 p-3 rounded-lg text-xs md:text-sm font-bold transition-all ${getButtonActiveStyle(
                    designMode === "custom"
                  )} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Custom Prompt Mode
                </button>
              </div>
            </div>

            {designMode === "custom" && !isDisabled && (
              <div className="flex items-center gap-2 text-xs text-purple-300 bg-purple-900/10 border border-purple-500/20 p-3.5 rounded-xl animate-fade">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-purple-400 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span className="font-semibold">
                  Custom designs require <strong>{CUSTOM_GENERATION_COST} credits</strong> per generation.
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

        <div className="text-center pt-8 border-t border-gray-800/60">
          {!currentUser && !isLoading && (
            <div className="max-w-md mx-auto mb-8 p-6 bg-obsidian-850/50 border border-gray-800/60 rounded-2xl text-center shadow-lg animate-fade">
              <p className="text-lg font-bold text-white mb-1">
                Ready to redesign?
              </p>
              <p className="text-xs text-gray-400 mb-5">
                Create a secure account to save your generated designs and get 119 free credits.
              </p>
              <div className="flex justify-center gap-4 text-xs font-bold">
                <Link
                  href="/login"
                  className="px-6 py-2.5 rounded-lg border border-gray-750 bg-obsidian-800 text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white transition-colors shadow-md shadow-purple-500/10"
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
            className={`w-full md:w-auto px-12 py-4.5 text-base md:text-lg font-extrabold text-white rounded-xl shadow-xl transition-all duration-300 transform ${
              !currentUser
                ? "bg-gray-750 cursor-not-allowed opacity-50 text-gray-450"
                : !isVerified
                ? "bg-yellow-750 text-yellow-100 cursor-not-allowed border border-yellow-700/30"
                : isLimitReached
                ? "bg-red-900/40 text-red-400 cursor-not-allowed border border-red-900/30"
                : isLoading
                ? "bg-gray-850 cursor-wait scale-[0.98] opacity-90 border border-gray-800"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:scale-[1.03] hover:shadow-purple-500/20 active:scale-[0.97]"
            } disabled:opacity-50 disabled:scale-100 disabled:shadow-none`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Redecorating Space...
              </span>
            ) : !currentUser ? (
              "Login to Start Redesigning"
            ) : !isVerified ? (
              "Verify Email to Continue"
            ) : isLimitReached ? (
              "Not Enough Credits"
            ) : (
              `Generate Redesign (${costForCurrentMode} Credit${costForCurrentMode > 1 ? "s" : ""})`
            )}
          </button>

          {currentUser && isVerified && (
            <div className="mt-5 flex flex-col items-center animate-fade">
              <p className="text-xs font-semibold text-gray-400">
                Credits Remaining:{" "}
                <span className="text-white font-bold bg-obsidian-850 border border-gray-800/60 px-2.5 py-1 rounded-md ml-1 shadow-sm">
                  {isAdmin ? "Admin (∞)" : credits}
                </span>
              </p>

              {isLimitReached && (
                <div className="mt-5 p-5 bg-purple-900/10 border border-purple-500/20 text-purple-300 rounded-2xl text-center max-w-md shadow-md animate-pulse">
                  <p className="font-bold text-sm mb-1 text-white">Out of Credits?</p>
                  <p className="text-xs text-gray-450 mb-4">You need more credits to process this design.</p>
                  {isAppMode ? (
                    <button
                      onClick={handleExternalPurchase}
                      className="text-white underline hover:text-purple-300 font-bold text-xs"
                    >
                      Tap here to buy more credits
                    </button>
                  ) : (
                    <Link
                      href="/pricing"
                      className="inline-block px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg transition-colors font-bold text-xs shadow-md shadow-purple-500/15"
                    >
                      Buy Credit Packs
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="max-w-4xl mx-auto mt-10 p-5 w-full bg-red-950/20 border border-red-900/40 text-red-400 rounded-2xl text-center shadow-lg text-sm animate-fade flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {isLoading && (
        <div className="max-w-4xl mx-auto mt-10 w-full animate-fade">
          <Loader
            message="Our AI vision model is redecorating your space... this might take a moment!"
            tip={loadingTip}
          />
        </div>
      )}

      {generatedImageUrl && originalImageUrl && (
        <div className="mt-10">
          <ResultDisplay
            originalImage={originalImageUrl}
            generatedImage={generatedImageUrl}
          />
        </div>
      )}
    </div>
  );
};

export default DesignWorkspace;
