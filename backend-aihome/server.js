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
    // Ensure you grab the class from the module import
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

        // CRITICAL FIX: Use the model explicitly designed for image-to-image editing.
        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash-image",
        });

        // Use the strong prompt for clear instructions.
        const prompt = `You are an expert interior designer. Redesign the input image, which is a "${roomDescription}", in a photorealistic "${styleName}" style. Generate and return a new, high-quality, photorealistic image of the redesigned room only. Do not include any text, markdown, or commentary.`;

        const imagePart = bufferToGenerativePart(file.buffer, file.mimetype);

        // CRITICAL FIX: Switched to object-based generateContent call with config
        const result = await model.generateContent({
          contents: [prompt, imagePart],
          config: {
            // CRITICAL FIX: Explicitly set the output mime type to enforce image generation.
            responseMimeType: "image/png",
          },
        });

        const response = await result.response;
        // The previous file had a duplicate 'const response = await result.response;' here. It must be removed.

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
          throw new Error(
            "AI did not return a valid image. Check model and configuration."
          );
        }

        res.status(200).json({
          base64Image: base64Image,
        });
      } catch (error) {
        console.error("Error processing image:", error);
        let errorMessage = "Failed to generate image from AI.";
        if (error instanceof Error && error.message.includes("400")) {
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
