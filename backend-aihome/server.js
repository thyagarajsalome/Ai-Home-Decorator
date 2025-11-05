// Use require("dotenv").config() to load .env variables
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer"); // For handling file uploads
const crypto = require("crypto"); // Import crypto for signature verification

// --- NEW: Import Supabase Admin Client ---
const { createClient } = require("@supabase/supabase-js");

// We will import GoogleGenerativeAI inside our async start function
const verifySupabaseToken = require("./authMiddleware");

// --- NEW: Define a map for your products (server-side) ---
const creditPacks = {
  "Starter Pack": { amount: 1.99, credits: 15 },
  "Best Value": { amount: 4.99, credits: 50 },
  "Pro Pack": { amount: 9.99, credits: 120 },
};

// --- Create an async function to load modules and start the server ---
async function startServer() {
  let GoogleGenerativeAI;
  let Razorpay; // --- NEW ---

  try {
    // --- FIX: Correctly import GoogleGenerativeAI ---
    const { GoogleGenerativeAI: GAI_Class } = await import(
      "@google/generative-ai"
    );
    GoogleGenerativeAI = GAI_Class;

    if (!GoogleGenerativeAI) {
      throw new Error(
        "Failed to import GoogleGenerativeAI. Class is undefined."
      );
    }
    // --- END FIX ---

    // --- NEW: Import Razorpay ---
    const razorpayModule = await import("razorpay");
    Razorpay = razorpayModule.default;
  } catch (err) {
    console.error("Failed to import modules:", err);
    process.exit(1);
  }

  // --- Initialize ---
  const app = express();
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  });
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  // --- NEW: Initialize Razorpay ---
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  // --- NEW: Initialize Supabase Admin Client ---
  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // --- Middlewares ---
  // FIXME: Update this with your real Firebase hosting URL
  app.use(cors({ origin: "https://your-app-name.web.app" }));
  app.use(express.json()); // For parsing JSON bodies

  // --- ADDED BACK: Helper Function to convert buffer to base64 ---
  function bufferToGenerativePart(buffer, mimeType) {
    return {
      inlineData: {
        data: buffer.toString("base64"),
        mimeType,
      },
    };
  }

  // --- Main API Route (/api/decorate) ---
  // --- ADDED BACK: Full route logic was missing ---
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
  // --- END OF /api/decorate ---

  // --- NEW: ROUTE 1 - CREATE ORDER ---
  app.post("/api/create-order", verifySupabaseToken, async (req, res) => {
    try {
      const { packName } = req.body;
      const pack = creditPacks[packName];

      if (!pack) {
        return res.status(400).json({ error: "Invalid credit pack." });
      }

      // Amount must be in the smallest currency unit (e.g., paise for INR)
      // Let's assume your prices are in USD, so cents.
      const amountInCents = Math.round(pack.amount * 100);
      const currency = "USD"; // Or "INR" if your prices are in Rupees

      const options = {
        amount: amountInCents,
        currency: currency,
        receipt: `receipt_user_${req.user.id}_${new Date().getTime()}`,
        notes: {
          userId: req.user.id,
          userEmail: req.user.email,
          packName: packName,
          creditsToadd: pack.credits,
        },
      };

      const order = await razorpay.orders.create(options);
      res.status(200).json(order);
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      res.status(500).json({ error: "Failed to create order." });
    }
  });

  // --- NEW: ROUTE 2 - VERIFY PAYMENT ---
  app.post(
    "/api/payment-verification",
    verifySupabaseToken,
    async (req, res) => {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
      const userId = req.user.id; // Get user ID from our auth middleware

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ error: "Missing payment details." });
      }

      try {
        // 1. Verify Signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
          .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
          .update(body.toString())
          .digest("hex");

        if (expectedSignature !== razorpay_signature) {
          return res.status(400).json({ error: "Invalid payment signature." });
        }

        // 2. Signature is valid. Fetch order notes to get credits.
        const order = await razorpay.orders.fetch(razorpay_order_id);
        const creditsToAdd = order.notes.creditsToadd;

        if (!creditsToAdd || order.notes.userId !== userId) {
          return res.status(400).json({ error: "Invalid order details." });
        }

        // 3. Fetch user's current credits from Supabase
        const { data: profile, error: profileError } = await supabaseAdmin
          .from("user_profiles")
          .select("generation_credits")
          .eq("id", userId)
          .single();

        if (profileError) throw profileError;

        // 4. Update credits securely
        const newCredits =
          (profile.generation_credits || 0) + Number(creditsToAdd);

        const { error: updateError } = await supabaseAdmin
          .from("user_profiles")
          .update({ generation_credits: newCredits })
          .eq("id", userId);

        if (updateError) throw updateError;

        // 5. Success
        res.status(200).json({ success: true, newCredits: newCredits });
      } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ error: "Payment verification failed." });
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
