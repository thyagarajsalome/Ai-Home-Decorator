import { NextRequest, NextResponse } from "next/server";
import { uploadToR2 } from "@/lib/r2Client";

export const runtime = "nodejs";
// Support larger PDF book files
export const dynamic = "force-dynamic";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export async function POST(req: NextRequest) {
  try {
    const accessKey = process.env.R2_ACCESS_KEY_ID;
    const secretKey = process.env.R2_SECRET_ACCESS_KEY;

    if (!accessKey || !secretKey) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Cloudflare R2 credentials are not configured yet. Please add R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY to your .env.local file.",
        },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const slug = (formData.get("slug") as string | null) || "guide";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Verify it is a PDF
    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      return NextResponse.json(
        { success: false, error: "Only PDF files are supported" },
        { status: 400 }
      );
    }

    // Read file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Clean filename
    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9_-]/g, "-");
    const timestamp = Date.now();
    const fileKey = `books/${cleanSlug}-${timestamp}.pdf`;

    // Upload to Cloudflare R2
    const result = await uploadToR2(fileKey, buffer, "application/pdf");

    const sizeFormatted = formatBytes(result.size);

    return NextResponse.json({
      success: true,
      fileKey: result.key,
      fileName: file.name,
      fileSize: sizeFormatted,
      bytes: result.size,
      message: `Successfully uploaded ${file.name} to Cloudflare R2!`,
    });
  } catch (error: any) {
    console.error("Cloudflare R2 Upload Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to upload PDF to Cloudflare R2",
      },
      { status: 500 }
    );
  }
}
