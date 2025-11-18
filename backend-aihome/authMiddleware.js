const { createClient } = require("@supabase/supabase-js");

// Load environment variables
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env");
}

// Create a Supabase client specifically for Auth verification
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const verifySupabaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No authorization header provided." });
  }

  // The token looks like "Bearer <token>"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Malformed authorization header." });
  }

  try {
    // Ask Supabase to verify the token
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      console.error("Auth Error:", error?.mjessage);
      return res.status(401).json({ error: "Invalid or expired token." });
    }

    // Attach the valid user to the request
    req.user = user;

    next();
  } catch (err) {
    console.error("Unexpected Auth Error:", err);
    return res.status(500).json({ error: "Authentication failed." });
  }
};

module.exports = verifySupabaseToken;
