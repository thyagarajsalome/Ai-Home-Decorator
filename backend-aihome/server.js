// Use require("dotenv").config() to load .env variables
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const verifySupabaseToken = require("./authMiddleware");

async function startServer() {
  let GoogleGenerativeAI;

  try {
    const module = await import("@google/generative-ai");
    const GAI_Class = module.GoogleGenerativeAI;
    GoogleGenerativeAI = GAI_Class;

    if (!GoogleGenerativeAI) {
      throw new Error(
        "Failed to destructure GoogleGenerativeAI. Class is undefined."
      );
    }
  } catch (err) {
    console.error("Failed to import @google/generative-ai:", err);
    process.exit(1);
  }

  const app = express();
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
  });
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const allowedOrigins = [
    "http://localhost:3000",
    "https://aihomedecorator.web.app",
  ];

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg =
            "The CORS policy for this site does not allow access from the specified Origin.";
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
    })
  );

  app.use(express.json());

  function bufferToGenerativePart(buffer, mimeType) {
    return {
      inlineData: {
        data: buffer.toString("base64"),
        mimeType,
      },
    };
  }

  app.post(
    "/api/decorate",
    verifySupabaseToken,
    upload.single("image"),
    async (req, res) => {
      try {
        console.log(`Processing request for user: ${req.user.id}`);

        const { styleName, roomDescription } = req.body;
        const file = req.file;

        if (!file) {
          return res.status(400).json({ error: "No image file provided." });
        }
        if (!styleName || !roomDescription) {
          return res
            .status(400)
            .json({ error: "Missing style or description." });
        }

        // FIX: Use gemini-2.5-flash-image for image generation/editing
        // AND add responseModalities configuration
        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash-image",
          generationConfig: {
            responseModalities: ["TEXT", "IMAGE"], // CRITICAL: Required for image output
          },
        });

        const prompt = `You are an expert interior designer. Redesign this room, which is a "${roomDescription}", in a "${styleName}" style. Return *only* the new image. Do not return markdown, do not return text, only return the resulting image.`;

        const imagePart = bufferToGenerativePart(file.buffer, file.mimetype);

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;

        if (response.promptFeedback?.blockReason) {
          return res.status(400).json({
            error: `Image blocked for safety reasons: ${response.promptFeedback.blockReason}`,
          });
        }

        // Loop through parts to find the image
        let base64Image = null;
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            base64Image = part.inlineData.data;
            break;
          }
        }

        if (!base64Image) {
          throw new Error("AI did not return a valid image.");
        }

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

startServer();
