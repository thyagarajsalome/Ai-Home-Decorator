import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const slug = (formData.get("slug") as string | null) || "guide";
    const type = (formData.get("type") as string | null) || "cover"; // 'cover' or 'sample'

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided" },
        { status: 400 }
      );
    }

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9_-]/g, "-");
    const timestamp = Date.now();
    const fileName = `${cleanSlug}-${type}-${timestamp}.webp`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase public storage bucket 'store_covers'
    const { data, error } = await supabaseAdmin.storage
      .from("store_covers")
      .upload(fileName, buffer, {
        contentType: "image/webp",
        upsert: true,
      });

    if (error) {
      console.error("Supabase storage upload error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from("store_covers")
      .getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
      fileName,
    });
  } catch (err: any) {
    console.error("Upload cover error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to upload cover image" },
      { status: 500 }
    );
  }
}
