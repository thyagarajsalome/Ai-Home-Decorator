// services/geminiService.ts

export const generateDecoratedImage = async (
  imageFile: File,
  styleName: string,
  roomDescription: string,
  idToken: string // <-- Pass in the user's auth token
): Promise<string> => {
  const BACKEND_URL = "http://localhost:8080/api/decorate";

  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("styleName", styleName);
  formData.append("roomDescription", roomDescription);

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      body: formData,
      headers: {
        // --- ADDED AUTHORIZATION HEADER ---
        Authorization: `Bearer ${idToken}`,
      },
      // Note: Don't set 'Content-Type' header manually for FormData.
    });

    if (!response.ok) {
      const errorData = await response.json();
      // Pass the specific error message from the backend (e.g., "Rate limit exceeded")
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
    // Re-throw the error so the component can catch it
    throw error;
  }
};
