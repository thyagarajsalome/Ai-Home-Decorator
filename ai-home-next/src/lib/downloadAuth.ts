import crypto from "crypto";
import { supabaseAdmin } from "./supabaseAdmin";
import { isAuthorizedAdminEmail } from "./adminAuth";

const DOWNLOAD_SECRET =
  process.env.RAZORPAY_KEY_SECRET || "Xxk4nHzQh9lsYop9FuC6yNrX";

/**
 * Generate a cryptographically signed download token (valid for 24 hours)
 */
export function generateDownloadToken(
  slug: string,
  paymentId: string,
  email: string,
  expiresInHours = 24
): { token: string; expires: number } {
  const expires = Date.now() + expiresInHours * 60 * 60 * 1000;
  const payload = `${slug.toLowerCase()}|${paymentId.trim()}|${email.toLowerCase().trim()}|${expires}`;

  const token = crypto
    .createHmac("sha256", DOWNLOAD_SECRET)
    .update(payload)
    .digest("hex");

  return { token, expires };
}

/**
 * Verify whether a download request is legitimately authorized:
 * 1. Via cryptographic HMAC-SHA256 signature
 * 2. OR verified purchase record in store_purchases database
 * 3. OR verified administrator session
 */
export async function verifyDownloadAuthorization(params: {
  slug: string;
  paymentId?: string | null;
  email?: string | null;
  expires?: string | null;
  token?: string | null;
  authToken?: string | null;
}): Promise<{ authorized: boolean; reason?: string }> {
  const { slug, paymentId, email, expires, token, authToken } = params;

  // Case 1: Check if caller is an authorized administrator
  if (authToken) {
    try {
      const cleanToken = authToken.replace("Bearer ", "").trim();
      const {
        data: { user },
      } = await supabaseAdmin.auth.getUser(cleanToken);
      if (user && isAuthorizedAdminEmail(user.email)) {
        return { authorized: true, reason: "admin" };
      }
    } catch {
      // Continue to purchase verification
    }
  }

  // Case 2: Cryptographic token validation
  if (paymentId && email && expires && token) {
    const expiresNum = parseInt(expires, 10);
    if (!isNaN(expiresNum) && Date.now() <= expiresNum) {
      const payload = `${slug.toLowerCase()}|${paymentId.trim()}|${email.toLowerCase().trim()}|${expiresNum}`;
      const expected = crypto
        .createHmac("sha256", DOWNLOAD_SECRET)
        .update(payload)
        .digest("hex");

      try {
        if (
          expected.length === token.length &&
          crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(token))
        ) {
          return { authorized: true, reason: "signed_token" };
        }
      } catch {
        // Fallback to database check
      }
    }
  }

  // Case 3: Verify payment ID directly in Supabase store_purchases
  if (paymentId) {
    const { data: purchase } = await supabaseAdmin
      .from("store_purchases")
      .select("id, razorpay_payment_id, metadata, user_email")
      .eq("razorpay_payment_id", paymentId)
      .maybeSingle();

    if (purchase) {
      // Check if product slug matches purchase metadata
      const purchaseSlug = purchase.metadata?.slug;
      if (!purchaseSlug || purchaseSlug === slug) {
        // Increment download counter
        await supabaseAdmin
          .from("store_purchases")
          .update({
            download_count: (purchase as any).download_count
              ? (purchase as any).download_count + 1
              : 1,
            last_downloaded_at: new Date().toISOString(),
          })
          .eq("id", purchase.id);

        return { authorized: true, reason: "verified_purchase" };
      }
    }
  }

  return {
    authorized: false,
    reason: "No valid purchase verification or authorized token provided",
  };
}
