import { NextRequest, NextResponse } from "next/server";
import { getSignedDownloadUrl } from "@/lib/r2Client";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyDownloadAuthorization } from "@/lib/downloadAuth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const key = searchParams.get("key");
    const paymentId =
      searchParams.get("payment_id") || searchParams.get("paymentId");
    const email = searchParams.get("email");
    const expires = searchParams.get("expires");
    const token = searchParams.get("token");
    const authToken = req.headers.get("authorization");

    let fileKey = key;
    let targetSlug = slug;

    // If slug is provided instead of key, find the product in Supabase
    if (!fileKey && targetSlug) {
      const { data: product } = await supabaseAdmin
        .from("store_products")
        .select("pdf_file_key, title, slug")
        .eq("slug", targetSlug)
        .maybeSingle();

      if (product && product.pdf_file_key) {
        fileKey = product.pdf_file_key;
      } else {
        // Fallback to local default product configuration
        fileKey = "Home-Lighting-Design-Guide-USA.pdf";
      }
    }

    if (!targetSlug && fileKey) {
      targetSlug = fileKey.replace(/\.pdf$/i, "");
    }

    // Verify Authorization: MUST have valid HMAC token, verified store purchase, or admin session
    const authCheck = await verifyDownloadAuthorization({
      slug: targetSlug || "",
      paymentId,
      email,
      expires,
      token,
      authToken,
    });

    if (!authCheck.authorized) {
      return NextResponse.json(
        {
          error:
            "Access Denied: A verified purchase or administrator session is required to download this guide.",
          details: authCheck.reason,
        },
        { status: 403 }
      );
    }

    if (!fileKey) {
      return NextResponse.json(
        { error: "No PDF file associated with this product yet" },
        { status: 404 }
      );
    }

    // Generate secure 15-minute expiring signed URL from Cloudflare R2
    const downloadUrl = await getSignedDownloadUrl(fileKey, 900);

    // Redirect user to the secure expiring R2 signed URL
    return NextResponse.redirect(downloadUrl);
  } catch (error: any) {
    console.error("Download URL generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate download URL" },
      { status: 500 }
    );
  }
}
