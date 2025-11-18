// Use require("dotenv").config() to load .env variables
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { createClient } = require("@supabase/supabase-js");

// --- 1. ADD RAZORPAY and CRYPTO ---
const Razorpay = require("razorpay");
const crypto = require("crypto");
// ---------------------------------

const verifySupabaseToken = require("./authMiddleware");

// --- VALIDATE ENVIRONMENT VARIABLES FIRST ---
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

// --- 2. VALIDATE RAZORPAY VARS ---
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    "FATAL: Missing Supabase URL or Service Key. Check your .env file."
  );
  process.exit(1);
}

if (!apiKey) {
  console.error("FATAL: GEMINI_API_KEY not found in environment variables.");
  process.exit(1);
}

// Create a server-side Supabase client instance
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

// --- 4. INSTANTIATE RAZORPAY ---
// Only instantiate if keys exist to prevent crash on dev without keys
const razorpay =
  razorpayKeyId && razorpayKeySecret
    ? new Razorpay({ key_id: razorpayKeyId, key_secret: razorpayKeySecret })
    : null;
// ------------------------------

// --- 6. DEFINE GENERATION COSTS ---
const STYLE_GENERATION_COST = 1;
const CUSTOM_GENERATION_COST = 3;
// ----------------------------------

// --- START SERVER IMMEDIATELY ---
const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

const allowedOrigins = [
  "http://localhost:3000",
  "https://aihomedecorator.web.app",
  "https://aihomedecorator.com",
  "https://www.aihomedecorator.com",
  // Add your Expo local URL if testing on device, e.g., "exp://..." or "*" for dev
];

app.use(cors({ origin: true })); // Allow all for now to prevent mobile issues, restrict later
app.use(express.json());

// --- HEALTH CHECK ENDPOINT ---
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", service: "ai-decorator-backend" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// --- INITIALIZE AI ---
let ai = null;
let GoogleGenAI = null;

async function initializeAI() {
  try {
    console.log("Initializing Google Gen AI...");
    const module = await import("@google/genai");
    GoogleGenAI = module.GoogleGenAI;
    if (!GoogleGenAI) throw new Error("Could not import GoogleGenAI");
    ai = new GoogleGenAI({ apiKey });
    console.log("Google Gen AI initialized successfully");
  } catch (err) {
    console.error("FATAL: Failed to initialize @google/genai:", err);
  }
}

initializeAI();

function bufferToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType,
    },
  };
}

// ---
// --- DECORATE ENDPOINT (UPDATED FOR MOBILE UNIFICATION) ---
// ---
app.post(
  "/api/decorate",
  verifySupabaseToken,
  upload.single("image"),
  async (req, res) => {
    if (!ai) {
      return res
        .status(503)
        .json({ error: "AI service is still initializing." });
    }

    let originalCredits = 0;
    let profile;

    try {
      // 1. INPUT & AUTH VALIDATION
      // Default to 'style' mode if not provided, and empty prompt if not provided
      const {
        designPrompt = "",
        roomDescription = "",
        designMode = "style",
        roomType,
      } = req.body;
      const file = req.file;
      const userId = req.user.id;

      if (!file) {
        return res.status(400).json({ error: "No image file provided." });
      }

      // --- 2. DETERMINE COST & CHECK CREDITS ---
      const costToDebit =
        designMode === "custom"
          ? CUSTOM_GENERATION_COST
          : STYLE_GENERATION_COST;

      // NOTE: We are now using the 'profiles' table and 'credits' column
      // to match the Mobile App SQL setup.
      const { data: fetchedProfile, error: fetchError } = await supabase
        .from("profiles") // <--- CHANGED from user_profiles
        .select("credits") // <--- CHANGED from generation_credits, role
        .eq("id", userId)
        .single();

      profile = fetchedProfile;

      if (fetchError || !profile) {
        console.error("Supabase fetch profile error:", fetchError);
        // Fallback: Try creating a profile if it doesn't exist (self-healing)
        await supabase
          .from("profiles")
          .insert([{ id: userId, credits: 119 }])
          .select();
        profile = { credits: 119 };
      }

      originalCredits = profile.credits;

      // Check if user has enough credits
      if (profile.credits < costToDebit) {
        return res.status(403).json({
          error: `You do not have enough credits. This requires ${costToDebit} credit(s), but you have ${profile.credits}.`,
        });
      }

      // Debit the credits
      const newCredits = profile.credits - costToDebit;
      const { error: debitError } = await supabase
        .from("profiles") // <--- CHANGED
        .update({ credits: newCredits }) // <--- CHANGED
        .eq("id", userId);

      if (debitError) {
        console.error("Supabase debit error:", debitError);
        return res.status(500).json({ error: "Failed to debit credit." });
      }
      // --- END CREDIT LOGIC ---

      // 3. AI GENERATION
      const userContext = roomDescription
        ? `This is a photo of a ${roomDescription}.`
        : `This is a photo of a ${roomType || "room"}.`;

      const fullPrompt = `${userContext} Redecorate this room in ${designPrompt}. Maintain the original room structure and layout but change the furniture, wall color, and decorations to match the new style. The result should be photorealistic.`;

      const imagePart = bufferToGenerativePart(file.buffer, file.mimetype);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: {
          parts: [imagePart, { text: fullPrompt }],
        },
        config: {},
      });

      // 4. CHECK AI RESPONSE
      if (response.candidates[0]?.finishReason === "SAFETY") {
        // Rollback
        await supabase
          .from("profiles")
          .update({ credits: originalCredits })
          .eq("id", userId);

        return res.status(400).json({
          error: `Request blocked for safety reasons. Credits have been refunded.`,
        });
      }

      let base64Image = null;
      const parts = response.candidates?.[0]?.content?.parts;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData) {
            base64Image = part.inlineData.data;
            break;
          }
        }
      }

      if (!base64Image) {
        // Rollback
        await supabase
          .from("profiles")
          .update({ credits: originalCredits })
          .eq("id", userId);
        throw new Error("AI did not return a valid image.");
      }

      // 5. SUCCESS: Return the image
      // Return in the format the mobile app expects
      res.status(200).json({
        generatedImage: `data:image/jpeg;base64,${base64Image}`,
        remainingCredits: newCredits,
      });
    } catch (error) {
      // 6. ERROR HANDLING & ROLLBACK
      // Only rollback if we actually debited
      if (profile && originalCredits > 0) {
        await supabase
          .from("profiles")
          .update({ credits: originalCredits })
          .eq("id", userId);
      }

      console.error("Error processing image:", error);
      res.status(500).json({
        error: "Failed to generate image. Credits have been refunded.",
      });
    }
  }
);

// --- GLOBAL ERROR HANDLER ---
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE")
      return res.status(400).json({ error: "Image too large." });
  }
  console.error("Global Error:", err);
  res.status(500).json({ error: "Internal server error." });
});

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running on http://${HOST}:${PORT}`);
});
