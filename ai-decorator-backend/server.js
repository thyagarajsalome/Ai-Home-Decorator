import express from "express";
import multer from "multer";
import { GoogleGenAI, Modality } from "@google/genai";
import cors from "cors";
import "dotenv/config";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

// --- Firebase Admin SDK Setup ---
// Make sure you have serviceAccountKey.json in this folder
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

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
        usageCount = userDoc.data().count || 0;
      }

      if (usageCount >= USER_GENERATION_LIMIT) {
        return res
          .status(429)
          .json({
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

      // 6. Process and send the response
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          // 7. Update user's quota AFTER successful generation
          await userUsageRef.set({ count: usageCount + 1 }, { merge: true });

          return res.json({ base64Image: part.inlineData.data });
        }
      }

      throw new Error("No image data found in the Gemini response.");
    } catch (error) {
      console.error("Error in /api/decorate:", error);
      // Handle potential Gemini API errors (like rate limits)
      if (error.message && error.message.includes("429")) {
        return res
          .status(429)
          .json({
            error:
              "The AI service is currently busy. Please try again in a minute.",
          });
      }
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
