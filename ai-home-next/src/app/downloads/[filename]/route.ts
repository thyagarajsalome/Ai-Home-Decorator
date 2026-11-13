import { NextRequest, NextResponse } from "next/server";
import { getSignedDownloadUrl } from "@/lib/r2Client";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    const cleanName = filename.toLowerCase();

    // Map requested lookbook filenames to the canonical Cloudflare R2 file key
    let fileKey = "free-guides/2026-USA-Home-Design-Remodel-Lookbook.pdf";

    if (cleanName.includes("lookbook")) {
      fileKey = "free-guides/2026-USA-Home-Design-Remodel-Lookbook.pdf";
    }

    // Generate fresh 24-hour expiring signed download URL from Cloudflare R2 ($0 egress)
    const downloadUrl = await getSignedDownloadUrl(fileKey, 86400);

    // Redirect user to the secure Cloudflare R2 signed URL
    return NextResponse.redirect(downloadUrl);
  } catch (error: any) {
    console.error("Lookbook Cloudflare R2 download error:", error);
    return NextResponse.json(
      { error: "Failed to generate lookbook download link" },
      { status: 500 }
    );
  }
}
