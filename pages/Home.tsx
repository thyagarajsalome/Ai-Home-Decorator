// pages/Home.tsx
import React, { useState, useCallback } from "react";
// ... other imports
import { useAuth } from "../context/AuthContext"; // Import useAuth
import { useNavigate } from "react-router-dom"; // To redirect if not logged in

const MAX_GENERATIONS = 3;

const Home: React.FC = () => {
  const { currentUser, getIdToken } = useAuth(); // Use the Auth context
  const navigate = useNavigate(); // Hook for navigation
  // ... existing state variables ...
  const [generationCount, setGenerationCount] = useState<number>(0); // Keep track locally or fetch from backend if needed

  // ... handleImageChange (no changes needed) ...
  const handleImageChange = useCallback(
    (file: File | null) => {
      setUploadedImageFile(file);

      if (originalImageUrl) {
        URL.revokeObjectURL(originalImageUrl);
      }

      if (file) {
        setOriginalImageUrl(URL.createObjectURL(file));
      } else {
        setOriginalImageUrl(null);
      }

      setGeneratedImageUrl(null);
      setError(null);
      setRoomDescription("");
      setSelectedStyle(null);
    },
    [originalImageUrl]
  );

  const handleDecorateClick = async () => {
    // --- Check if user is logged in ---
    if (!currentUser) {
      setError("Please log in or sign up to decorate.");
      // Optionally redirect to login page: navigate('/login');
      return;
    }
    // ------------------------------------

    // Check generation limit (you might want to fetch this from Firestore based on currentUser.uid)
    // For simplicity, we'll keep the local count, but ideally, this check happens server-side
    // or you fetch the count from Firestore here based on currentUser.uid
    if (generationCount >= MAX_GENERATIONS) {
      alert("You've reached your free generation limit for this session.");
      return;
    }

    // --- Get ID token from context ---
    const idToken = await getIdToken();
    if (!idToken) {
      setError("Could not authenticate. Please try logging in again.");
      return;
    }
    // ---------------------------------

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
      const base64Image = await generateDecoratedImage(
        uploadedImageFile,
        selectedStyle.name,
        roomDescription,
        idToken // Pass the obtained token
      );
      setGeneratedImageUrl(`data:image/png;base64,${base64Image}`);
      // Increment local count AFTER successful generation
      setGenerationCount((prevCount) => prevCount + 1);
    } catch (err) {
      // Handle errors (same logic as before)
      let message = "An unknown error occurred.";
      if (err instanceof Error) {
        message = err.message;
      }
      // Specific error messages based on backend response
      if (message.includes("Rate limit exceeded")) {
        message =
          "You have reached your free generation limit. Consider upgrading for more.";
      } else if (
        message.includes("Invalid token") ||
        message.includes("No token provided")
      ) {
        message = "Authentication failed. Please log in again.";
        // Optionally force logout here if token is invalid
      } else if (message.includes("401") || message.includes("403")) {
        // Catch backend auth errors
        message = "Authentication failed. Please log in again.";
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Determine if the limit is reached (based on local count for this example)
  const isLimitReached = generationCount >= MAX_GENERATIONS;

  // Render the component
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ... rest of the JSX ... */}
      <div className="max-w-5xl mx-auto bg-gray-800/80 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-700/50 backdrop-blur-sm flex flex-col space-y-8">
        {/* ... ImageUploader and StyleSelector ... */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <ImageUploader
            onImageChange={handleImageChange}
            currentImage={uploadedImageFile}
            currentDescription={roomDescription}
            onDescriptionChange={setRoomDescription}
            disabled={isLoading || !currentUser} // Disable if loading OR not logged in
          />
          <StyleSelector
            onStyleSelect={setSelectedStyle}
            selectedStyle={selectedStyle}
            disabled={!uploadedImageFile || isLoading || !currentUser} // Disable if no image, loading, OR not logged in
          />
        </div>

        {/* Decorate Button */}
        <div className="text-center">
          {/* Show login prompt if not logged in */}
          {!currentUser && (
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
              !currentUser || // Disable button if not logged in
              isLimitReached
            }
            className={`px-8 py-4 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-300 ${
              isLimitReached
                ? "bg-gray-600 cursor-not-allowed opacity-70"
                : !currentUser
                ? "bg-gray-500 cursor-not-allowed" // Style for disabled when logged out
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:scale-105"
            } disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100`}
          >
            {isLoading
              ? "Decorating..."
              : isLimitReached
              ? "🔒 Limit Reached"
              : !currentUser
              ? "Login to Decorate" // Button text when logged out
              : "✨ Decorate My Room"}
          </button>
          {currentUser && (
            <p className="text-sm text-gray-400 mt-2">
              Generations used: {generationCount}/{MAX_GENERATIONS}
            </p>
          )}
        </div>
      </div>
      {/* ... Error Display, Loader, ResultDisplay ... */}
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
