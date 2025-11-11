// services/geminiService.ts

export const generateDecoratedImage = async (
  imageFile: File,
  designPrompt: string, // <-- This is already correct
  roomDescription: string,
  idToken: string,
  designMode: "style" | "custom" // <-- ADD THIS
): Promise<string> => {
  // FIX: Use a relative URL to work with both Vite proxy and Firebase rewrites
  const BACKEND_URL = "/api/decorate";

  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("designPrompt", designPrompt);
  formData.append("roomDescription", roomDescription);
  formData.append("designMode", designMode); // <-- ADD THIS

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      // ... (rest of the function is the same)
      body: formData,
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Request failed with status ${response.status}`
      );
    }

    const result = await response.json();

    if (!result.base64Image) {
      throw new Error("Invalid response from server: no image data found.");
    }

    return result.base64Image;
  } catch (error) {
    console.error("Error communicating with backend:", error);
    throw error;
  }
};
