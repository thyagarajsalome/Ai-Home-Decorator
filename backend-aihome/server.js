// Use require("dotenv").config() to load .env variables
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const crypto = require("crypto");

// --- Import Supabase Admin Client ---
const { createClient } = require("@supabase/supabase-js");
const verifySupabaseToken = require("./authMiddleware");

// --- [FIX 1] Use require() for GoogleGenerativeAI and Razorpay ---
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Razorpay = require("razorpay");

// --- Define credit packs with prices in INR (paise) ---
const creditPacks = {
  "Starter Pack": { amountInPaise: 19900, credits: 15, displayAmount: "₹199" }, // ₹199
  "Best Value": { amountInPaise: 49900, credits: 50, displayAmount: "₹499" }, // ₹499
  "Pro Pack": { amountInPaise: 99900, credits: 120, displayAmount: "₹999" }, // ₹999
};

// --- [FIX 2] Removed the async startServer() wrapper. We can run directly. ---

// --- Validate Environment Variables ---
const requiredEnvVars = [
  "RAZORPAY_KEY_ID",
  "RAZORPAY_KEY_SECRET",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_JWT_SECRET",
  "GEMINI_API_KEY",
];

const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);
if (missingVars.length > 0) {
  console.error("❌ Missing required environment variables:");
  missingVars.forEach((varName) => console.error(`   - ${varName}`));
  process.exit(1);
}

console.log("✅ All required environment variables are set");
console.log(
  "📌 Razorpay Key ID:",
  process.env.RAZORPAY_KEY_ID?.substring(0, 10) + "..."
);

// --- Initialize ---
const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- Initialize Razorpay ---
let razorpay;
try {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  console.log("✅ Razorpay initialized successfully");
} catch (err) {
  console.error("❌ Failed to initialize Razorpay:", err.message);
  process.exit(1);
}

// --- Initialize Supabase Admin Client ---
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// --- Middlewares ---
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// --- Helper Function to convert buffer to base64 ---
function bufferToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType,
    },
  };
}

// --- Health Check Route ---
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    razorpayConfigured: !!process.env.RAZORPAY_KEY_ID,
  });
});

// --- Main API Route (/api/decorate) ---
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
        return res.status(400).json({ error: "Missing style or description." });
      }

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are an expert interior designer. Redesign this room, which is a "${roomDescription}", in a "${styleName}" style. Return *only* the new image. Do not return markdown, do not return text, only return the resulting image.`;

      const imagePart = bufferToGenerativePart(file.buffer, file.mimetype);

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;

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

// --- CREATE ORDER ROUTE ---
app.post("/api/create-order", verifySupabaseToken, async (req, res) => {
  try {
    console.log("\n🔷 CREATE ORDER REQUEST");
    console.log("User ID:", req.user.id);
    console.log("User Email:", req.user.email);
    console.log("Request Body:", req.body);

    const { packName } = req.body;

    if (!packName) {
      console.error("❌ No pack name provided");
      return res.status(400).json({ error: "Pack name is required." });
    }

    const pack = creditPacks[packName];

    if (!pack) {
      console.error("❌ Invalid pack name:", packName);
      console.log("Available packs:", Object.keys(creditPacks));
      return res.status(400).json({
        error: "Invalid credit pack.",
        availablePacks: Object.keys(creditPacks),
      });
    }

    console.log(`✅ Pack found: ${packName}`);
    console.log(
      `   Amount: ${pack.amountInPaise} paise (${pack.displayAmount})`
    );
    console.log(`   Credits: ${pack.credits}`);

    const options = {
      amount: pack.amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}_${req.user.id.substring(0, 8)}`,
      notes: {
        userId: req.user.id,
        userEmail: req.user.email,
        packName: packName,
        creditsToadd: pack.credits.toString(),
      },
    };

    console.log("📤 Creating Razorpay order with options:");
    console.log(JSON.stringify(options, null, 2));

    const order = await razorpay.orders.create(options);

    console.log("✅ Order created successfully!");
    console.log("   Order ID:", order.id);
    console.log("   Amount:", order.amount);
    console.log("   Currency:", order.currency);

    res.status(200).json(order);
  } catch (error) {
    console.error("\n❌ ERROR CREATING ORDER:");
    console.error("Error Message:", error.message);
    console.error("Error Stack:", error.stack);

    if (error.error) {
      console.error(
        "Razorpay Error Details:",
        JSON.stringify(error.error, null, 2)
      );
    }

    // Send detailed error to client
    res.status(500).json({
      error: "Failed to create order.",
      message: error.message,
      details: error.error?.description || "Unknown Razorpay error",
      code: error.error?.code || "UNKNOWN",
    });
  }
});

// --- VERIFY PAYMENT ROUTE ---
app.post("/api/payment-verification", verifySupabaseToken, async (req, res) => {
  try {
    console.log("\n🔷 PAYMENT VERIFICATION REQUEST");
    console.log("User ID:", req.user.id);
    console.log("Request Body:", req.body);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const userId = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.error("❌ Missing payment details");
      return res.status(400).json({ error: "Missing payment details." });
    }

    // 1. Verify Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    console.log("🔐 Verifying signature...");
    console.log("   Expected:", expectedSignature.substring(0, 20) + "...");
    console.log("   Received:", razorpay_signature.substring(0, 20) + "...");

    if (expectedSignature !== razorpay_signature) {
      console.error("❌ Signature mismatch!");
      return res.status(400).json({ error: "Invalid payment signature." });
    }

    console.log("✅ Signature verified successfully");

    // 2. Fetch order details
    console.log("📥 Fetching order details from Razorpay...");
    const order = await razorpay.orders.fetch(razorpay_order_id);
    const creditsToAdd = parseInt(order.notes.creditsToadd);

    console.log("✅ Order fetched:", order.id);
    console.log("   Credits to add:", creditsToAdd);
    console.log("   Order user ID:", order.notes.userId);

    if (!creditsToAdd || order.notes.userId !== userId) {
      console.error("❌ Order validation failed");
      return res.status(400).json({ error: "Invalid order details." });
    }

    // 3. Fetch user's current credits
    console.log("📥 Fetching current credits from Supabase...");
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("user_profiles")
      .select("generation_credits")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("❌ Error fetching profile:", profileError);
      throw profileError;
    }

    const currentCredits = profile.generation_credits || 0;
    const newCredits = currentCredits + creditsToAdd;

    console.log("💰 Credit Update:");
    console.log(`   Current: ${currentCredits}`);
    console.log(`   Adding: ${creditsToAdd}`);
    console.log(`   New Total: ${newCredits}`);

    // 4. Update credits
    const { error: updateError } = await supabaseAdmin
      .from("user_profiles")
      .update({ generation_credits: newCredits })
      .eq("id", userId);

    if (updateError) {
      console.error("❌ Error updating credits:", updateError);
      throw updateError;
    }

    console.log("✅ Credits updated successfully!");

    // 5. Success
    res.status(200).json({
      success: true,
      newCredits: newCredits,
      addedCredits: creditsToAdd,
    });
  } catch (error) {
    console.error("\n❌ ERROR VERIFYING PAYMENT:");
    console.error("Error Message:", error.message);
    console.error("Error Stack:", error.stack);

    res.status(500).json({
      error: "Payment verification failed.",
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("\n🚀 Server started successfully!");
  console.log(`📡 Listening on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log("\n");
});
