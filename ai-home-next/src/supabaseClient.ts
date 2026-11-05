import { createClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://fhplqcddcvwyqflgbfaj.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZocGxxY2RkY3Z3eXFmbGdiZmFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3OTMwNzMsImV4cCI6MjA3NzM2OTA3M30.WvGguc8Klt4cebrcUQHeSKcRn2rkMOgD94qVUvvyPpE";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.replace(/\s+/g, "");

const supabaseUrl = rawUrl && !rawUrl.includes("placeholder") ? rawUrl : DEFAULT_SUPABASE_URL;
const supabaseAnonKey = rawKey && !rawKey.includes("placeholder") ? rawKey : DEFAULT_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: "pkce",
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
