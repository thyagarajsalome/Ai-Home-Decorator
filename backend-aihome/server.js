// backend-aihome/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { createClient } = require("@supabase/supabase-js");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const verifySupabaseToken = require("./authMiddleware");

// --- VALIDATE ENVIRONMENT VARIABLES ---
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("FATAL: Missing Supabase URL or Service Key.");
  process.exit(1);
}

if (!apiKey) {
  console.error("FATAL: GEMINI_API_KEY not found.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// --- RAZORPAY SETUP ---
const razorpay =
  razorpayKeyId && razorpayKeySecret
    ? new Razorpay({ key_id: razorpayKeyId, key_secret: razorpayKeySecret })
    : null;

<<<<<<< HEAD
// --- 5. CREATE A SECURE MAP FOR PRICES (in paise/cents) ---
const CREDIT_PACKS = {
  pack_starter: { credits: 15, amount: 398 }, // CHANGED FROM 199
  pack_value: { credits: 50, amount: 998 }, // CHANGED FROM 499
  pack_pro: { credits: 120, amount: 1998 }, // CHANGED FROM 999
};
// ----------------------------------------------------

// --- 6. DEFINE GENERATION COSTS ---
=======
>>>>>>> f577b7bc57339a920fcc566f30d88edf1ca75ea1
const STYLE_GENERATION_COST = 1;
const CUSTOM_GENERATION_COST = 3;

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => res.status(200).json({ status: "ok" }));
app.get("/health", (req, res) => res.status(200).json({ status: "healthy" }));

// --- INITIALIZE AI ---
let ai = null;
async function initializeAI() {
  try {
    const module = await import("@google/genai");
    if (!module.GoogleGenAI) throw new Error("Could not import GoogleGenAI");
    ai = new module.GoogleGenAI({ apiKey });
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

// ==================================================
//  PAYMENT ENDPOINTS (Restored)
// ==================================================

// Pack Definitions (Must match frontend)
const CREDIT_PACKS = {
  pack_starter: { credits: 15, amount: 199 },
  pack_value: { credits: 50, amount: 499 },
  pack_pro: { credits: 120, amount: 999 },
};

// 1. Create Order
app.post("/api/create-order", verifySupabaseToken, async (req, res) => {
  if (!razorpay) {
    return res.status(503).json({ error: "Payment gateway not configured." });
  }

  try {
    const { packId } = req.body;
    const pack = CREDIT_PACKS[packId];

    if (!pack) {
      return res.status(400).json({ error: "Invalid pack ID." });
    }

    const options = {
      amount: pack.amount * 100, // amount in the smallest currency unit (paisa)
      currency: "INR",
      receipt: `rcpt_${Date.now()}_${req.user.id.substring(0, 5)}`,
      notes: {
        userId: req.user.id,
        packId: packId,
        credits: pack.credits,
      },
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ error: "Failed to create payment order." });
  }
});

// 2. Verify Payment & Add Credits
app.post("/api/payment-verification", verifySupabaseToken, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const userId = req.user.id;

  try {
    // Verify Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({ error: "Invalid payment signature." });
    }

    // Fetch order details to know how many credits to add
    // (Fetching from Razorpay ensures we trust the source, not the client)
    const order = await razorpay.orders.fetch(razorpay_order_id);

    if (!order || !order.notes || !order.notes.credits) {
      return res.status(400).json({ error: "Could not verify order details." });
    }

    const creditsToAdd = parseInt(order.notes.credits);

    // Add credits to user profile
    // First get current credits
    const { data: profile, error: fetchError } = await supabase
      .from("user_profiles")
      .select("generation_credits")
      .eq("id", userId)
      .single();

    if (fetchError) throw fetchError;

    const newCreditTotal = (profile.generation_credits || 0) + creditsToAdd;

    const { error: updateError } = await supabase
      .from("user_profiles")
      .update({ generation_credits: newCreditTotal })
      .eq("id", userId);

    if (updateError) throw updateError;

    res.json({ success: true, newCredits: newCreditTotal });
  } catch (error) {
    console.error("Payment Verification Error:", error);
    res.status(500).json({ error: "Payment verification failed." });
  }
});

// ==================================================
//  IMAGE GENERATION ENDPOINT (Fixed)
// ==================================================
app.post(
  "/api/decorate",
  verifySupabaseToken,
  upload.single("image"),
  async (req, res) => {
    if (!ai)
      return res.status(503).json({ error: "AI service is initializing." });

    let originalCredits = 0;
    let profile;
    const userId = req.user.id;

    try {
      const {
        designPrompt = "",
        roomDescription = "",
        designMode = "style",
        roomType,
      } = req.body;
      const file = req.file;

      if (!file)
        return res.status(400).json({ error: "No image file provided." });

      const costToDebit =
        designMode === "custom"
          ? CUSTOM_GENERATION_COST
          : STYLE_GENERATION_COST;

      // Check Credits
      const { data: fetchedProfile, error: fetchError } = await supabase
        .from("user_profiles")
        .select("generation_credits")
        .eq("id", userId)
        .single();

      profile = fetchedProfile;

      if (fetchError || !profile) {
        // Create profile if missing
        await supabase
          .from("user_profiles")
          .insert([{ id: userId, generation_credits: 119 }]);
        profile = { generation_credits: 119 };
      }

      originalCredits = profile.generation_credits;

      if (originalCredits < costToDebit) {
        return res.status(403).json({ error: "Not enough credits." });
      }

      // Deduct Credits
      const { error: debitError } = await supabase.rpc("decrement_credits", {
        user_id: userId,
        amount: costToDebit,
      });

      if (debitError)
        return res.status(500).json({ error: "Failed to debit credit." });

      const newCredits = originalCredits - costToDebit;

      // Generate Image
      const userContext = roomDescription
        ? `This is a photo of a ${roomDescription}.`
        : `This is a photo of a ${roomType || "room"}.`;

      const fullPrompt = `${userContext} Redecorate this room in ${designPrompt}. Maintain the original room structure and layout but change the furniture, wall color, and decorations to match the new style. The result should be photorealistic.`;
      const imagePart = bufferToGenerativePart(file.buffer, file.mimetype);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: { parts: [imagePart, { text: fullPrompt }] },
      });

      // Check Safety Block
      if (response.candidates[0]?.finishReason === "SAFETY") {
        await supabase
          .from("user_profiles")
          .update({ generation_credits: originalCredits })
          .eq("id", userId);
        return res
          .status(400)
          .json({ error: "Request blocked for safety. Credits refunded." });
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

      if (!base64Image) throw new Error("AI did not return a valid image.");

      // SUCCESS
      res.status(200).json({
        generatedImage: `data:image/jpeg;base64,${base64Image}`,
        remainingCredits: newCredits,
      });
    } catch (error) {
      // Rollback credits on error
      if (profile && originalCredits > 0) {
        await supabase
          .from("user_profiles")
          .update({ generation_credits: originalCredits })
          .eq("id", userId);
      }
      console.error("Error processing image:", error);
      res
        .status(500)
        .json({ error: "Failed to generate image. Credits refunded." });
    }
  }
);

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running on http://${HOST}:${PORT}`);
});
