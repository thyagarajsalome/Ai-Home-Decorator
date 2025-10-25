import express from "express";
import multer from "multer";
import { GoogleGenAI, Modality } from "@google/genai";
import cors from "cors";
import "dotenv/config";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

// --- Manually read and parse serviceAccountKey.json ---
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Helper to get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read and parse the JSON file
// Make sure you have serviceAccountKey.json in this folder
const serviceAccountPath = join(__dirname, "serviceAccountKey.json");
let serviceAccount;
try {
  const fileContent = fs.readFileSync(serviceAccountPath, "utf8");
  serviceAccount = JSON.parse(fileContent);
} catch (error) {
  console.error("Error reading or parsing serviceAccountKey.json:", error);
  // Depending on your setup, you might want to exit the process
  // or handle this error in a way that prevents the app from starting incorrectly.
  throw new Error("Could not load Firebase service account key.");
}

// --- Firebase Admin SDK Setup ---
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = getFirestore();
const USER_GENERATION_LIMIT = 5; // Set the free limit per user

// --- App Setup ---
const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- Gemini API Initialization ---
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- Authentication Middleware ---
// This middleware will verify the Firebase token on protected routes
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided." });
  }
  const idToken = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Add user info (like uid) to the request object
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({ error: "Unauthorized: Invalid token." });
  }
};

// --- API Endpoint ---
app.post(
  "/api/decorate",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      // 1. Get User ID from our middleware
      const userId = req.user.uid;

      // 2. Validate the request
      if (!req.file) {
        return res.status(400).json({ error: "No image file uploaded." });
      }
      const { styleName, roomDescription } = req.body;
      if (!styleName || !roomDescription) {
        return res
          .status(400)
          .json({ error: "Style name and room description are required." });
      }

      // 3. Check User's Quota in Firestore
      const userUsageRef = db.collection("userUsage").doc(userId);
      const userDoc = await userUsageRef.get();

      let usageCount = 0;
      if (userDoc.exists) {
        // Ensure data() exists before accessing count
        const data = userDoc.data();
        if (data && typeof data.count === "number") {
          usageCount = data.count;
        }
      }

      if (usageCount >= USER_GENERATION_LIMIT) {
        return res.status(429).json({
          error: "Rate limit exceeded. You have used your free generations.",
        });
      }

      // 4. Prepare data for Gemini API (if quota is available)
      const imageBuffer = req.file.buffer;
      const base64Image = imageBuffer.toString("base64");
      const mimeType = req.file.mimetype;

      const userContext = roomDescription
        ? `This is a photo of a ${roomDescription}.`
        : "This is a photo of a room.";

      const prompt = `${userContext} Redecorate this room in the style of ${styleName}. The new design should be photorealistic, maintaining the original room's layout, windows, and doors, but changing the furniture, wall color, flooring, and decor.`;

      // 5. Call the Gemini API
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

      // Basic check for response structure before accessing candidates
      if (
        !response ||
        !response.candidates ||
        response.candidates.length === 0 ||
        !response.candidates[0].content ||
        !response.candidates[0].content.parts
      ) {
        console.error("Unexpected Gemini API response structure:", response);
        throw new Error("Unexpected response structure from the AI service.");
      }

      // 6. Process and send the response
      let imageFound = false; // Flag to check if an image part was found
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          // Ensure inlineData and data exist
          // 7. Update user's quota AFTER successful generation
          await userUsageRef.set({ count: usageCount + 1 }, { merge: true });

          imageFound = true;
          return res.json({ base64Image: part.inlineData.data });
        }
      }

      // If loop completes without finding an image part
      if (!imageFound) {
        console.error(
          "No image data found in Gemini response parts:",
          response.candidates[0].content.parts
        );
        throw new Error("No image data found in the Gemini response.");
      }
    } catch (error) {
      console.error("Error in /api/decorate:", error);
      // Handle potential Gemini API errors (like rate limits or content safety)
      // Check for specific error types or messages if the API provides them
      if (error instanceof Error) {
        if (error.message && error.message.includes("429")) {
          // Improved check
          return res.status(429).json({
            error:
              "The AI service is currently busy or rate limited. Please try again in a minute.",
          });
        }
        // Add checks for other potential errors like content filtering if applicable
        // if (error.message.includes("SAFETY")) {
        //   return res.status(400).json({ error: "Image generation blocked due to safety policies." });
        // }
      }

      // Generic fallback error
      res
        .status(500)
        .json({ error: "Failed to generate the decorated image." });
    }
  }
);

// --- Start the server ---
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
