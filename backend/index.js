// backend/index.js
const express = require("express");
const cors = require("cors"); // <-- 1. Import cors
const verifySupabaseToken = require("./authMiddleware"); // Import your new middleware

// ... other imports like multer, Gemini, etc.

const app = express();

// --- 2. ADD MIDDLEWARES ---

// Enable CORS for your frontend.
// For development, you can be open, but for production, you should
// restrict it to your deployed frontend's URL.
app.use(
  cors({
    // Example for production:
    // origin: 'https://aihomedecorator.web.app'
    // For now, this is open:
    origin: "*",
  })
);

// Parse incoming JSON bodies (if you send any)
app.use(express.json());

// -----------------------------

// This is your protected route
app.post(
  "/api/decorate",
  verifySupabaseToken, // <-- This is correct
  (req, res) => {
    // If the code reaches this point, the token was valid.
    // The user's ID is now available in req.user.id
    console.log(`Processing request for user: ${req.user.id}`);

    // --- Your existing image processing logic here ---
    // (using multer to get the file, calling Gemini, etc.)
    //
    // const imageFile = req.file;
    // const { styleName, roomDescription } = req.body;
    // const base64Image = await callGemini(imageFile, ...);

    // --- 3. MUST SEND A RESPONSE ---
    // Your frontend expects a JSON object with a `base64Image` property.

    // Example success response (replace with your real data):
    res.status(200).json({
      message: "Processing complete",
      base64Image: "your_actual_base64_image_from_gemini_here",
    });

    // Example error response:
    // res.status(500).json({ error: "Image processing failed." });
  }
);

// ... other routes ...

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
