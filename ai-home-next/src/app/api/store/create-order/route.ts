import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getStoreProductBySlug } from "@/lib/storeService";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { slug, email } = await req.json();

    if (!slug) {
      return NextResponse.json(
        { error: "Product slug is required" },
        { status: 400 }
      );
    }

    const product = await getStoreProductBySlug(slug);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpayKeyId || !razorpaySecret) {
      return NextResponse.json(
        { error: "Razorpay payment gateway credentials are not configured" },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpaySecret,
    });

    // In subunits: $14.99 = 1499 cents
    const amountInCents = Math.round(product.price * 100);

    const options = {
      amount: amountInCents,
      currency: "USD",
      receipt: `book_${Date.now()}_${slug.substring(0, 10)}`,
      notes: {
        productSlug: product.slug,
        productTitle: product.title,
        customerEmail: email || "anonymous",
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: razorpayKeyId,
      productTitle: product.title,
    });
  } catch (error: any) {
    console.error("Store create-order error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create payment order" },
      { status: 500 }
    );
  }
}
