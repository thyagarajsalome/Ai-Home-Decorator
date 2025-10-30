// This is a Node.js / Express example
// (You'll need to install jsonwebtoken: npm install jsonwebtoken)

const jwt = require("jsonwebtoken");

// Get the secret from your environment variables
const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

if (!SUPABASE_JWT_SECRET) {
  throw new Error(
    "SUPABASE_JWT_SECRET is not set in your backend environment variables."
  );
}

// This is your new middleware function
const verifySupabaseToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided." });
  }

  // The token looks like "Bearer YOUR_TOKEN_HERE"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Malformed authorization header." });
  }

  try {
    // Verify the token using your Supabase secret
    const decodedToken = jwt.verify(token, SUPABASE_JWT_SECRET);

    // The 'decodedToken' contains user info like { sub: 'user-uuid', ... }
    // Attach the user's ID (the 'sub' property) to the request object
    // so your routes can access it.
    req.user = { id: decodedToken.sub, email: decodedToken.email };

    // Token is valid! Proceed to the next function (your API logic)
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = verifySupabaseToken;
