import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
    if (authError || !user) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature." }, { status: 400 });
    }

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const order = await razorpay.orders.fetch(razorpay_order_id);
    if (!order || !order.notes || !order.notes.credits) {
      return NextResponse.json({ error: "Could not verify order details." }, { status: 400 });
    }

    const creditsToAdd = parseInt(order.notes.credits as string);

    const { data: profile, error: fetchError } = await supabase
      .from("user_profiles")
      .select("generation_credits")
      .eq("id", user.id)
      .single();

    if (fetchError) throw fetchError;

    const newCreditTotal = (profile?.generation_credits || 0) + creditsToAdd;

    const { error: updateError } = await supabase
      .from("user_profiles")
      .update({ generation_credits: newCreditTotal })
      .eq("id", user.id);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true, newCredits: newCreditTotal });
  } catch (error: any) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Payment verification failed." }, { status: 500 });
  }
}
