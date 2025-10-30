// In your main backend server file (e.g., index.js)

const express = require("express");
const verifySupabaseToken = require("./authMiddleware"); // Import your new middleware
// ... other imports like multer, cors, etc.

const app = express();

// ... your other app.use() settings like cors, express.json() ...

// This is your protected route
app.post(
  "/api/decorate",
  verifySupabaseToken, // <-- ADD THE MIDDLEWARE HERE
  (req, res) => {
    // If the code reaches this point, the token was valid.
    // The user's ID is now available in req.user.id
    console.log(`Processing request for user: ${req.user.id}`);

    // --- Your existing image processing logic here ---
    // (using multer to get the file, calling Gemini, etc.)
  }
);

// ... other routes ...

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
