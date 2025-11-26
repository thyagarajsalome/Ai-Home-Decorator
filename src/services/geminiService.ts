// src/services/geminiService.ts

export const generateDecoratedImage = async (
  imageFile: File,
  designPrompt: string,
  roomDescription: string,
  idToken: string,
  designMode: "style" | "custom"
): Promise<string> => {
  // Use a relative URL to work with both Vite proxy and Firebase rewrites
  const BACKEND_URL = "/api/decorate";

  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("designPrompt", designPrompt);
  formData.append("roomDescription", roomDescription);
  formData.append("designMode", designMode);

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
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

    // --- FIX: Changed 'base64Image' to 'generatedImage' ---
    if (!result.generatedImage) {
      throw new Error("Invalid response from server: no image data found.");
    }

    return result.generatedImage;
  } catch (error) {
    console.error("Error communicating with backend:", error);
    throw error;
  }
};
