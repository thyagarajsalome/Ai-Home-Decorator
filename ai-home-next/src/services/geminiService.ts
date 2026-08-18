// src/services/geminiService.ts

/**
 * Resizes and compresses an image on the client side before uploading.
 * Keeps aspect ratio with max dimension of 1536px and JPEG quality 0.85.
 */
const compressImage = async (
  file: File,
  maxDimension: number = 1536,
  quality: number = 0.85
): Promise<File> => {
  if (!file.type.startsWith("image/")) return file;

  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;

      if (width <= maxDimension && height <= maxDimension && file.size < 1024 * 1024) {
        return resolve(file);
      }

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) return resolve(file);

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return resolve(file);
          const compressedFile = new File([blob], file.name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          resolve(compressedFile);
        },
        "image/jpeg",
        quality
      );
    };

    img.onerror = () => resolve(file);
    img.src = url;
  });
};

export const generateDecoratedImage = async (
  imageFile: File,
  designPrompt: string,
  roomDescription: string,
  idToken: string,
  designMode: "style" | "custom"
): Promise<string> => {
  // Compress image on client side to speed up upload and reduce Cloud Run memory load
  const processedFile = await compressImage(imageFile);

  // Use a relative URL to work with both Vite proxy and Firebase rewrites
  const BACKEND_URL = "/api/decorate";

  const formData = new FormData();
  formData.append("image", processedFile);
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
      let errorMsg = `Request failed with status ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData?.error) {
          errorMsg = errorData.error;
        }
      } catch (_) {
        // Non-JSON error payload fallback
      }
      throw new Error(errorMsg);
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

