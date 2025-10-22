import { onCall, HttpsError } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { GoogleGenerativeAI, Modality } from "@google/genai";
import { defineSecret } from "firebase-functions/params";

// Initialize Firebase Admin
initializeApp();

// Define the secret key
const geminiApiKey = defineSecret("GEMINI_API_KEY");

// Create the callable function
export const generateImage = onCall(
  {
    secrets: [geminiApiKey], // Make the secret available to this function
    timeoutSeconds: 120, // Allow 2 minutes for image generation
    memory: "1GiB", // Allocate 1GB of memory
  },
  async (request) => {
    // 1. Get data from the frontend
    const { base64Image, mimeType, styleName, roomDescription } = request.data;

    // 2. Validate the data
    if (!base64Image || !mimeType || !styleName || !roomDescription) {
      throw new HttpsError(
        "invalid-argument",
        "Missing required fields (image, mimeType, style, or description)."
      );
    }

    try {
      // 3. Initialize Gemini with the secure API key
      const ai = new GoogleGenerativeAI(geminiApiKey.value());

      // 4. Prepare the prompt (same logic as your geminiService.ts)
      const userContext = roomDescription
        ? `This is a photo of a ${roomDescription}.`
        : "This is a photo of a room.";

      const prompt = `${userContext} Redecorate this room in the style of ${styleName}. The new design should be photorealistic, maintaining the original room's layout, windows, and doors, but changing the furniture, wall color, flooring, and decor.`;

      // 5. Call the Gemini API
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Image,
                mimeType: mimeType,
              },
            },
            { text: prompt },
          ],
        },
        config: {
          responseModalities: [Modality.IMAGE],
        },
      });

      // 6. Process and return the result
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          // Send the new base64 image data back to the frontend
          return { generatedBase64: part.inlineData.data };
        }
      }

      // If no image is found
      throw new HttpsError("not-found", "No image data found in the response.");
    } catch (error) {
      console.error("Error generating image with Gemini:", error);
      if (error instanceof HttpsError) {
        throw error;
      }
      throw new HttpsError(
        "internal",
        "Failed to generate the decorated image."
      );
    }
  }
);
