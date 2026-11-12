import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getStoreProductBySlug } from "@/lib/storeService";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      slug,
      email,
    } = await req.json();

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required payment verification details" },
        { status: 400 }
      );
    }

    const secret =
      process.env.RAZORPAY_KEY_SECRET || "Xxk4nHzQh9lsYop9FuC6yNrX";
    if (!secret) {
      return NextResponse.json(
        { error: "Payment secret not configured on server" },
        { status: 500 }
      );
    }

    // Verify HMAC-SHA256 signature
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    const product = await getStoreProductBySlug(slug);

    // Record purchase in Supabase store_purchases
    try {
      await supabaseAdmin.from("store_purchases").insert({
        user_email: email,
        amount: product ? product.price : 14.99,
        currency: "USD",
        razorpay_payment_id,
        razorpay_order_id,
        download_count: 0,
        metadata: {
          slug,
          productTitle: product?.title,
          verifiedAt: new Date().toISOString(),
        },
      });
    } catch (dbErr) {
      console.warn("Could not insert purchase row into Supabase:", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully!",
      downloadUrl: `/api/store/download?slug=${slug}`,
    });
  } catch (error: any) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: error.message || "Payment verification failed" },
      { status: 500 }
    );
  }
}
