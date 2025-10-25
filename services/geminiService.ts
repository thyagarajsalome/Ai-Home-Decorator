// services/geminiService.ts

export const generateDecoratedImage = async (
  imageFile: File,
  styleName: string,
  roomDescription: string
): Promise<string> => {
  // The backend URL. For development, this points to your local server.
  // For production, this would be your deployed backend's URL.
  const BACKEND_URL =
    "https://ai-decorator-backend-177572689403.asia-south1.run.app/api/decorate";

  // Use FormData to send the file and text fields together
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("styleName", styleName);
  formData.append("roomDescription", roomDescription);

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      body: formData,
      // Note: Don't set 'Content-Type' header manually for FormData.
      // The browser will do it automatically with the correct boundary.
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

    // The backend returns a JSON object with the base64 string
    return result.base64Image;
  } catch (error) {
    console.error("Error communicating with backend:", error);
    throw new Error(
      "Failed to generate the decorated image. Please ensure the backend server is running and try again."
    );
  }
};
