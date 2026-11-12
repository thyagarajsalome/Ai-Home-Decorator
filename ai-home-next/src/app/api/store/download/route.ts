import { NextRequest, NextResponse } from "next/server";
import { getSignedDownloadUrl } from "@/lib/r2Client";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const key = searchParams.get("key");

    let fileKey = key;

    // If slug is provided instead of key, find the product in Supabase
    if (!fileKey && slug) {
      const { data: product } = await supabaseAdmin
        .from("store_products")
        .select("pdf_file_key, title")
        .eq("slug", slug)
        .maybeSingle();

      if (product && product.pdf_file_key) {
        fileKey = product.pdf_file_key;
      } else {
        // Fallback to local default product configuration
        fileKey = "Home-Lighting-Design-Guide-USA.pdf";
      }
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
