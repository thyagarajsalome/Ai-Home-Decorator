// pages/Home.tsx
import React, { useState, useCallback, useEffect } from "react"; // Added useEffect
import { Link, useNavigate } from "react-router-dom";
// ... other imports
import { useAuth } from "../context/AuthContext";
// --- ADD ActionCodeSettings if needed for resend ---
// import { sendEmailVerification, ActionCodeSettings } from "firebase/auth";
// import { auth } from "../firebase"; // Import auth if sending verification here
// ----------------------------------------------------

const MAX_GENERATIONS = 3;

const Home: React.FC = () => {
  const { currentUser, getIdToken } = useAuth();
  const navigate = useNavigate();

  // ... existing state variables ...
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
  // --- ADD state for verification status ---
  const [isVerified, setIsVerified] = useState(false);
  // ---------------------------------------

  // --- Check verification status when currentUser changes ---
  useEffect(() => {
    // Check if the user exists and if their emailVerified status is true
    setIsVerified(currentUser?.emailVerified ?? false);

    // If user exists but is not verified, clear any non-auth related errors
    if (currentUser && !currentUser.emailVerified) {
      setError(null); // Clear API errors if showing verify prompt
    }
  }, [currentUser]);
  // --------------------------------------------------------

  // --- (Optional) Function to resend verification email ---
  /*
  const handleResendVerification = async () => {
    if (currentUser && auth) { // Ensure auth is imported if using this
      try {
        await sendEmailVerification(currentUser);
        alert('Verification email resent! Please check your inbox.');
      } catch (error) {
        console.error("Error resending verification email:", error);
        alert('Failed to resend verification email.');
      }
    }
  };
  */
  // -------------------------------------------------------

  const handleImageChange = useCallback(
    /* ...no changes needed here... */
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

    // --- ADD Verification Check ---
    if (!isVerified) {
      setError(
        "Please verify your email address to start decorating. Check your inbox!"
      );
      // Optionally add a button here to trigger handleResendVerification
      return;
    }
    // ----------------------------

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
      // Ensure uploadedImageFile and selectedStyle are not null before accessing properties
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
      if (err instanceof Error) {
        message = err.message;
      }
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
      {/* --- ADD Verification Prompt --- */}
      {currentUser && !isVerified && !isLoading && (
        <div className="max-w-5xl mx-auto mb-6 p-4 bg-yellow-900/50 border border-yellow-700 text-yellow-300 rounded-lg text-center">
          <p>
            Please check your email ({currentUser.email}) to verify your account
            before you can decorate.
          </p>
          {/* Optional Resend Button: <button onClick={handleResendVerification} className="mt-2 underline hover:text-yellow-200">Resend Verification Email</button> */}
        </div>
      )}
      {/* ----------------------------- */}

      <div className="max-w-5xl mx-auto bg-gray-800/80 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-700/50 backdrop-blur-sm flex flex-col space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <ImageUploader
            onImageChange={handleImageChange}
            currentImage={uploadedImageFile}
            currentDescription={roomDescription}
            onDescriptionChange={setRoomDescription}
            // Disable if loading OR not logged in OR not verified
            disabled={isLoading || !currentUser || !isVerified}
          />
          <StyleSelector
            onStyleSelect={setSelectedStyle}
            selectedStyle={selectedStyle}
            // Disable if no image, loading, OR not logged in OR not verified
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
              !isVerified || // Disable if not verified
              isLimitReached
            }
            className={`px-8 py-4 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-300 ${
              isLimitReached
                ? "bg-gray-600 cursor-not-allowed opacity-70"
                : !currentUser
                ? "bg-gray-500 cursor-not-allowed" // Logged out
                : !isVerified
                ? "bg-yellow-700 cursor-not-allowed" // Not verified
                : isLoading
                ? "bg-gray-600 cursor-wait" // Loading
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:scale-105" // Active
            } disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100`}
          >
            {isLoading
              ? "Decorating..."
              : isLimitReached
              ? "🔒 Limit Reached"
              : !currentUser
              ? "Login to Decorate"
              : !isVerified
              ? "Verify Email to Decorate" // Button text when not verified
              : "✨ Decorate My Room"}
          </button>
          {currentUser &&
            isVerified && ( // Only show count if logged in AND verified
              <p className="text-sm text-gray-400 mt-2">
                Generations used this session: {generationCount}/
                {MAX_GENERATIONS}
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
