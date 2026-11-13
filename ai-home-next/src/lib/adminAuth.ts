import { NextRequest } from "next/server";
import { supabaseAdmin } from "./supabaseAdmin";

export const ADMIN_EMAILS = [
  "thyagaraja1983@gmail.com",
  "thyagarajsalome@gmail.com",
];

export function isAuthorizedAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(email.toLowerCase());
}

/**
 * Server-Side Admin Authorization Guard
 * Validates Supabase Bearer token and verifies user has administrative rights.
 */
export async function verifyAdminAuth(
  req: Request | NextRequest
): Promise<{ authorized: boolean; email?: string; error?: string }> {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        authorized: false,
        error: "Unauthorized: Missing or malformed Bearer authorization token",
      };
    }

    const token = authHeader.replace("Bearer ", "").trim();
    if (!token) {
      return { authorized: false, error: "Unauthorized: Empty token" };
    }

    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user || !user.email) {
      return {
        authorized: false,
        error: "Unauthorized: Invalid or expired session token",
      };
    }

    const userEmail = user.email.toLowerCase();

    // 1. Check against master admin email list
    if (isAuthorizedAdminEmail(userEmail)) {
      return { authorized: true, email: userEmail };
    }

    // 2. Check database role in user_profiles
    const { data: profile } = await supabaseAdmin
      .from("user_profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profile?.role === "admin") {
      return { authorized: true, email: userEmail };
    }

    return {
      authorized: false,
      error: "Forbidden: Account does not have administrative permissions",
    };
  } catch (err: any) {
    console.error("Admin verification error:", err);
    return {
      authorized: false,
      error: err.message || "Internal authorization error",
    };
  }
}
