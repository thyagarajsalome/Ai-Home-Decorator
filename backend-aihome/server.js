// Use require("dotenv").config() to load .env variables
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer"); // For handling file uploads

// We will import GoogleGenerativeAI inside our async start function
const verifySupabaseToken = require("./authMiddleware");

// --- Create an async function to load modules and start the server ---
async function startServer() {
  let GoogleGenerativeAI;

  try {
    // --- FIXED: Use correct package name @google/generative-ai ---
    const module = await import("@google/generative-ai");
    const GAI_Class = module.GoogleGenerativeAI;
    GoogleGenerativeAI = GAI_Class;
    GoogleGenerativeAI = GAI_Class;

    if (!GoogleGenerativeAI) {
      throw new Error(
        "Failed to destructure GoogleGenerativeAI. Class is undefined."
      );
    }
    // --- END FIX ---
  } catch (err) {
    console.error("Failed to import @google/generative-ai:", err);
    process.exit(1);
  }

  // --- Initialize ---
  const app = express();
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  });
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  // --- Middlewares ---
  app.use(
    cors({
      // IMPORTANT: For production, change "*" to your frontend's URL
      // origin: "https://your-app-name.web.app"
      origin: "*", // For local testing only
    })
  );
  app.use(express.json()); // For parsing JSON bodies

  // --- Helper Function to convert buffer to base64 ---
  function bufferToGenerativePart(buffer, mimeType) {
    return {
      inlineData: {
        data: buffer.toString("base64"),
        mimeType,
      },
    };
  }

  // --- Main API Route ---
  app.post(
    "/api/decorate",
    verifySupabaseToken, // 1. Check if user is logged in
    upload.single("image"), // 2. Handle the single file upload named "image"
    async (req, res) => {
      // 3. Run the API logic
      try {
        console.log(`Processing request for user: ${req.user.id}`);

        // Get data from the form
        const { styleName, roomDescription } = req.body;
        const file = req.file;

        // --- Validation ---
        if (!file) {
          return res.status(400).json({ error: "No image file provided." });
        }
        if (!styleName || !roomDescription) {
          return res
            .status(400)
            .json({ error: "Missing style or description." });
        }

        // --- Call Gemini API ---
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are an expert interior designer. Redesign this room, which is a "${roomDescription}", in a "${styleName}" style. Return *only* the new image. Do not return markdown, do not return text, only return the resulting image.`;

        const imagePart = bufferToGenerativePart(file.buffer, file.mimetype);

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;

        // Check for safety ratings
        if (response.promptFeedback?.blockReason) {
          return res.status(400).json({
            error: `Image blocked for safety reasons: ${response.promptFeedback.blockReason}`,
          });
        }

        const base64Image =
          response.candidates[0].content.parts[0].inlineData.data;

        if (!base64Image) {
          throw new Error("AI did not return a valid image.");
        }

        // --- Send Success Response ---
        res.status(200).json({
          base64Image: base64Image,
        });
      } catch (error) {
        console.error("Error processing image:", error);
        let errorMessage = "Failed to generate image from AI.";
        if (error.message.includes("400")) {
          errorMessage =
            "Image file may be invalid or too large. Please try another image.";
        }
        res.status(500).json({ error: errorMessage });
      }
    }
  );

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// --- Call the async function to start the application ---
startServer();
