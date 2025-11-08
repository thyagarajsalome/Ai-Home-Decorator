// thyagarajsalome/ai-home-decorator/Ai-Home-Decorator-f4f24c284cde6f7abaf4466ea8b69ba22ce33b43/backend-aihome/server.js
// Use require("dotenv").config() to load .env variables
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { createClient } = require("@supabase/supabase-js");

const verifySupabaseToken = require("./authMiddleware");

// --- NEW SERVER-SIDE SUPABASE CLIENT INITIALIZATION ---
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // Requires service role key

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    "FATAL: Missing Supabase URL (SUPABASE_URL or VITE_SUPABASE_URL) or Service Key (SUPABASE_SERVICE_KEY). Check your .env file in the backend-aihome directory."
  );
  throw new Error(
    "Missing Supabase URL or Service Key in environment variables."
  );
}

// Create a server-side Supabase client instance
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
// ----------------------------------------------------

async function startServer() {
  let GoogleGenAI;

  try {
    const module = await import("@google/genai");
    GoogleGenAI = module.GoogleGenAI;

    if (!GoogleGenAI) {
      throw new Error("Could not import GoogleGenAI from @google/genai");
    }
  } catch (err) {
    console.error("Failed to import @google/genai:", err);
    process.exit(1);
  }

  const app = express();
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
  });

  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY not found in environment variables.");
    process.exit(1);
  }
  const ai = new GoogleGenAI({ apiKey });

  // --- CORS FIX: Explicitly include the live domain ---
  // thyagarajsalome/ai-home-decorator/Ai-Home-Decorator-ad9c1e97ac8b6f5c4b41d11df00696b8a5053a37/backend-aihome/server.js
  const allowedOrigins = [
    "http://localhost:3000",
    "https://aihomedecorator.web.app",
    "https://aihomedecorator.com",
    "https://www.aihomedecorator.com", // <-- ADD THIS LINE
  ];

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || origin === "null") {
          // Allow requests with no origin (like mobile apps, postman, or same-origin deployment if header is stripped)
          return callback(null, true);
        }
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
      let originalCredits = 0;
      let profile;

      try {
        // 1. INPUT & AUTH VALIDATION
        const { styleName, roomDescription } = req.body;
        const file = req.file;

        // NOTE: Multer errors (like file size limit) often occur BEFORE this point,
        // which is why the global error handler below is critical.

        if (!req.user || !req.user.id) {
          return res
            .status(401)
            .json({ error: "Authentication required to decorate." });
        }
        const userId = req.user.id;

        if (!file) {
          return res.status(400).json({ error: "No image file provided." });
        }
        if (!styleName || !roomDescription) {
          return res
            .status(400)
            .json({ error: "Missing style or description." });
        }

        // 2. CREDIT CHECK AND DEBIT (Secure, server-side)
        const { data: fetchedProfile, error: fetchError } = await supabase
          .from("user_profiles")
          .select("generation_credits, role")
          .eq("id", userId)
          .single();

        profile = fetchedProfile;

        if (fetchError || !profile) {
          console.error("Supabase fetch profile error:", fetchError);
          return res
            .status(500)
            .json({ error: "Failed to retrieve user credits." });
        }

        const isAdmin = profile.role === "admin";
        originalCredits = profile.generation_credits;

        if (!isAdmin && profile.generation_credits <= 0) {
          return res.status(403).json({
            error:
              "You are out of credits. Please purchase a pack to continue.",
          });
        }

        if (!isAdmin) {
          const newCredits = profile.generation_credits - 1;
          const { error: debitError } = await supabase
            .from("user_profiles")
            .update({ generation_credits: newCredits })
            .eq("id", userId);

          if (debitError) {
            console.error("Supabase debit error:", debitError);
            return res
              .status(500)
              .json({ error: "Failed to debit credit for generation." });
          }
        }

        // 3. AI GENERATION (Fixed API Call)
        const userContext = roomDescription
          ? `This is a photo of a ${roomDescription}.`
          : "This is a photo of a room.";

        const prompt = `${userContext} Redecorate this room in the style of ${styleName}. The new design should be photorealistic, maintaining the original room's layout, windows, and doors, but changing the furniture, wall color, flooring, and decor.`;

        const imagePart = bufferToGenerativePart(file.buffer, file.mimetype);

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-preview-image",
          contents: {
            parts: [imagePart, { text: prompt }],
          },
          config: {
            // CRITICAL FIX: Removed conflicting responseMimeType setting
          },
        });

        // 4. CHECK AI RESPONSE AND EXTRACT IMAGE

        if (response.candidates[0]?.finishReason === "SAFETY") {
          // AI Blocked the request: Rollback credit.
          if (!isAdmin) {
            await supabase
              .from("user_profiles")
              .update({ generation_credits: originalCredits })
              .eq("id", userId);
            console.log(
              `Credit rolled back for user ${userId} after safety block.`
            );
          }
          return res.status(400).json({
            error: `Request blocked for safety reasons. Please try a different image or description.`,
          });
        }

        let base64Image = null;
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            base64Image = part.inlineData.data;
            break;
          }
        }

        if (!base64Image) {
          const debited = originalCredits > (profile?.generation_credits || 0);

          if (debited && profile?.role !== "admin") {
            await supabase
              .from("user_profiles")
              .update({ generation_credits: originalCredits })
              .eq("id", userId);
            console.log(
              `Credit rolled back for user ${userId} after no image was returned.`
            );
          }
          throw new Error("AI did not return a valid image.");
        }

        // 5. SUCCESS: Return the image
        res.status(200).json({ base64Image });
      } catch (error) {
        // 6. ERROR HANDLING & ROLLBACK
        const debited = originalCredits > (profile?.generation_credits || 0);

        if (debited && profile?.role !== "admin") {
          const { error: rollbackError } = await supabase
            .from("user_profiles")
            .update({ generation_credits: originalCredits })
            .eq("id", req.user.id);

          if (rollbackError) {
            console.error("FATAL: Failed to roll back credit!", rollbackError);
          } else {
            console.log(
              `Credit rolled back for user ${req.user.id} after general error.`
            );
          }
        }

        console.error("Error processing image:", error);
        let errorMessage =
          "Failed to generate the decorated image. This is a temporary server issue or an incompatible input image. Please try again.";

        if (error instanceof Error) {
          if (error.message.includes("400")) {
            errorMessage =
              "Image file may be invalid or too large. Please try another image.";
          } else if (
            error.message.includes("401") ||
            error.message.includes("403")
          ) {
            errorMessage = "Authentication failed. Please log in again.";
          } else if (error.message.includes("out of credits")) {
            errorMessage =
              "You are out of credits. Please purchase a pack to continue.";
          }
        }

        res.status(500).json({ error: errorMessage });
      }
    }
  );

  // --- NEW: GLOBAL ERROR HANDLER (Resolves unexpected HTML responses) ---
  // Must be placed *after* all routes and *before* app.listen
  app.use((err, req, res, next) => {
    // Check for Multer-specific errors (e.g., file size limit)
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ error: "Image file size is too large (max 10MB)." });
      }
    }

    console.error("Global unhandled Express error:", err);
    // Send a consistent 500 JSON response for any other unhandled server error
    res.status(500).json({
      error:
        err.message ||
        "An unexpected server error occurred and the connection was interrupted. Please try again.",
    });
  });
  // --- END NEW ERROR HANDLER ---

  const PORT = process.env.PORT || 8080;
  const HOST = "0.0.0.0";

  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
}

startServer();
