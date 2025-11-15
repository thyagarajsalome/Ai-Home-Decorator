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
    "FATAL: Missing Supabase URL (SUPABASE_URL or VITE_SUPABASE_URL) or Service Key (SUPABASE_SERVICE_KEY). Check your .env file in the backend-aihome directory."
  );
  process.exit(1);
}

if (!apiKey) {
  console.error("FATAL: GEMINI_API_KEY not found in environment variables.");
  process.exit(1);
}

// --- 3. VALIDATE RAZORPAY KEYS ---
if (!razorpayKeyId || !razorpayKeySecret) {
  console.error(
    "FATAL: Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET in .env file."
  );
  process.exit(1);
}
// --------------------------------

// Create a server-side Supabase client instance
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

// --- 4. INSTANTIATE RAZORPAY ---
const razorpay = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
});
// ------------------------------

// --- 5. CREATE A SECURE MAP FOR PRICES (in paise/cents) ---
const creditPacks = {
  pack_starter: { amount: 19900, credits: 15, name: "Starter Pack" }, // 199.00 INR
  pack_value: { amount: 49900, credits: 50, name: "Best Value" }, // 499.00 INR
  pack_pro: { amount: 99900, credits: 120, name: "Pro Pack" }, // 999.00 INR
};
// ----------------------------------------------------

// --- 6. DEFINE GENERATION COSTS ---
const STYLE_GENERATION_COST = 1;
const CUSTOM_GENERATION_COST = 3; // Must match src/constants.ts
// ----------------------------------

// --- START SERVER IMMEDIATELY ---
const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

// CORS configuration
// ... (keep CORS setup unchanged)
const allowedOrigins = [
  "http://localhost:3000",
  "https://aihomedecorator.web.app", // Your new domain
  "https://aihomedecorator.firebaseapp.com", // The default domain
  "https://aihomedecorator.com",
  "https://www.aihomedecorator.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || origin === "null") {
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

// --- HEALTH CHECK ENDPOINT (CRITICAL FOR CLOUD RUN) ---
// ... (keep / and /health unchanged)
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", service: "ai-decorator-backend" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// --- INITIALIZE AI ASYNCHRONOUSLY AFTER SERVER STARTS ---
// ... (keep initializeAI and bufferToGenerativePart unchanged)
let ai = null;
let GoogleGenAI = null;

async function initializeAI() {
  try {
    console.log("Initializing Google Gen AI...");
    const module = await import("@google/genai");
    GoogleGenAI = module.GoogleGenAI;

    if (!GoogleGenAI) {
      throw new Error("Could not import GoogleGenAI from @google/genai");
    }

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
// --- CREATE ORDER ENDPOINT ---
// ... (keep /api/create-order unchanged)
app.post("/api/create-order", verifySupabaseToken, async (req, res) => {
  try {
    const { packId } = req.body; // e.g., "pack_starter"
    const pack = creditPacks[packId];

    if (!pack) {
      return res.status(400).json({ error: "Invalid credit pack." });
    }

    const options = {
      amount: pack.amount, // amount in the smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_order_${new Date().getTime()}`,
      notes: {
        userId: req.user.id,
        userEmail: req.user.email,
        pack: packId, // Note: The key is 'pack'
      },
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ error: "Error creating Razorpay order." });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Could not create order." });
  }
});

// ---
// --- VERIFY PAYMENT ENDPOINT ---
// ... (keep /api/payment-verification unchanged)
app.post("/api/payment-verification", verifySupabaseToken, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const userId = req.user.id;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: "Missing payment details." });
  }

  try {
    // 1. Verify Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid payment signature." });
    }

    // 2. Fetch the order to get the packId from notes
    const order = await razorpay.orders.fetch(razorpay_order_id);
    if (!order) {
      return res.status(500).json({ error: "Could not fetch Razorpay order." });
    }

    const packId = order.notes.pack;
    const pack = creditPacks[packId];

    if (!pack) {
      return res.status(400).json({ error: "Invalid pack ID in order notes." });
    }

    // 3. Payment is VERIFIED. Grant credits to the user.
    const { data: profile, error: fetchError } = await supabase
      .from("user_profiles")
      .select("generation_credits")
      .eq("id", userId)
      .single();

    if (fetchError || !profile) {
      throw new Error("Could not find user profile to add credits.");
    }

    const newTotalCredits = (profile.generation_credits || 0) + pack.credits;

    const { error: updateError } = await supabase
      .from("user_profiles")
      .update({ generation_credits: newTotalCredits })
      .eq("id", userId);

    if (updateError) {
      throw new Error("Failed to update user credits in database.");
    }

    // 4. Success
    res.status(200).json({
      success: true,
      message: "Payment successful! Credits added.",
      newCredits: newTotalCredits,
    });
  } catch (error) {
    console.error("Payment verification failed:", error);
    res.status(500).json({ error: "Payment verification failed." });
  }
});

// ---
// --- DECORATE ENDPOINT (UPDATED) ---
// ---
app.post(
  "/api/decorate",
  verifySupabaseToken,
  upload.single("image"),
  async (req, res) => {
    if (!ai) {
      return res.status(503).json({
        error:
          "AI service is still initializing. Please try again in a moment.",
      });
    }

    let originalCredits = 0;
    let profile;

    try {
      // 1. INPUT & AUTH VALIDATION
      const { designPrompt, roomDescription, designMode } = req.body; // <-- ADD designMode
      const file = req.file;

      if (!req.user || !req.user.id) {
        return res
          .status(401)
          .json({ error: "Authentication required to decorate." });
      }
      const userId = req.user.id;

      if (!file) {
        return res.status(400).json({ error: "No image file provided." });
      }
      if (!designPrompt || !roomDescription || !designMode) {
        return res.status(400).json({
          error: "Missing design prompt, description, or design mode.",
        });
      }

      // --- 2. DETERMINE COST & CHECK CREDITS ---
      const costToDebit =
        designMode === "custom"
          ? CUSTOM_GENERATION_COST
          : STYLE_GENERATION_COST;

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

      // Check if user has enough credits
      if (!isAdmin && profile.generation_credits < costToDebit) {
        return res.status(403).json({
          error: `You do not have enough credits. This action requires ${costToDebit} credit(s), but you only have ${profile.generation_credits}.`,
        });
      }

      // Debit the credits
      if (!isAdmin) {
        const newCredits = profile.generation_credits - costToDebit;
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
      // --- END CREDIT LOGIC ---

      // 3. AI GENERATION
      const userContext = roomDescription
        ? `This is a photo of a ${roomDescription}.`
        : "This is a photo of a room.";

      const prompt = `${userContext} Redecorate this room using the following instructions: ${designPrompt}. The new design should be photorealistic, maintaining the original room's layout, windows, and doors, but changing the furniture, wall color, flooring, and decor.`;

      const imagePart = bufferToGenerativePart(file.buffer, file.mimetype);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: {
          parts: [imagePart, { text: prompt }],
        },
        config: {},
      });

      // 4. CHECK AI RESPONSE AND EXTRACT IMAGE
      // ... (Rest of the function is unchanged, rollback logic is correct)
      if (response.candidates[0]?.finishReason === "SAFETY") {
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
          // Use the specific error message from the credit check if available
          errorMessage = error.message.includes(
            "You do not have enough credits"
          )
            ? error.message
            : "Authentication failed. Please log in again.";
        } else if (error.message.includes("out of credits")) {
          // This is a fallback
          errorMessage =
            "You are out of credits. Please purchase a pack to continue.";
        }
      }

      res.status(500).json({ error: errorMessage });
    }
  }
);

// --- GLOBAL ERROR HANDLER ---
// ... (keep unchanged)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "Image file size is too large (max 10MB)." });
    }
  }

  console.error("Global unhandled Express error:", err);
  res.status(500).json({
    error:
      err.message || "An unexpected server error occurred. Please try again.",
  });
});

// --- START SERVER ---
// ... (keep unchanged)
app.listen(PORT, HOST, () => {
  console.log(`✅ Server running on http://${HOST}:${PORT}`);
  console.log(`✅ Health check available at http://${HOST}:${PORT}/health`);
});
