// server.js
import express from "express";
import multer from "multer";
import { GoogleGenAI, Modality } from "@google/genai";
import cors from "cors";
import "dotenv/config"; // Loads .env file contents into process.env

const app = express();
const port = process.env.PORT || 3001;

// --- Middleware Setup ---

// Enable CORS for your frontend application
// For production, you should restrict this to your actual frontend domain
app.use(cors());

// Multer setup for handling file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- Gemini API Initialization ---
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- API Endpoint ---

// This endpoint accepts a POST request with multipart/form-data
// 'image' is the field name for the uploaded file
app.post("/api/decorate", upload.single("image"), async (req, res) => {
  try {
    // 1. Validate the request
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded." });
    }
    const { styleName, roomDescription } = req.body;
    if (!styleName || !roomDescription) {
      return res
        .status(400)
        .json({ error: "Style name and room description are required." });
    }

    // 2. Prepare data for Gemini API
    const imageBuffer = req.file.buffer;
    const base64Image = imageBuffer.toString("base64");
    const mimeType = req.file.mimetype;

    const userContext = roomDescription
      ? `This is a photo of a ${roomDescription}.`
      : "This is a photo of a room.";

    const prompt = `${userContext} Redecorate this room in the style of ${styleName}. The new design should be photorealistic, maintaining the original room's layout, windows, and doors, but changing the furniture, wall color, flooring, and decor.`;

    // 3. Call the Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: mimeType } },
          { text: prompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    // 4. Process and send the response
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        // Send the base64 image data back to the frontend
        return res.json({ base64Image: part.inlineData.data });
      }
    }

    throw new Error("No image data found in the Gemini response.");
  } catch (error) {
    console.error("Error in /api/decorate:", error);
    res.status(500).json({ error: "Failed to generate the decorated image." });
  }
});

// --- Start the server ---

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
