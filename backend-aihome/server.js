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
    // ... (your existing GoogleGenerativeAI import)
    const module = await import("@google/generative-ai");
    // ...

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
  app.use(cors({ origin: "https://your-app-name.web.app" }));
  app.use(express.json()); // For parsing JSON bodies

  // ... (your existing bufferToGenerativePart function)

  // --- Main API Route (/api/decorate) ---
  app.post(
    "/api/decorate",
    verifySupabaseToken
    // ... (rest of your /api/decorate route)
  );

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
        // (In a real-world app, you'd fetch the payment/order from Razorpay
        // to double-check the amount, but for this demo, we trust the order notes)
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
