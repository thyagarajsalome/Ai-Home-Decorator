import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "@supabase/supabase-js";

const CREDIT_PACKS: Record<string, { credits: number; amount: number }> = {
  pack_starter: { credits: 5, amount: 249 },
  pack_value: { credits: 15, amount: 499 },
  pack_pro: { credits: 50, amount: 1249 },
};

export async function POST(req: Request) {
  try {
    const { packId } = await req.json();
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
    if (authError || !user) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const pack = CREDIT_PACKS[packId];
    if (!pack) return NextResponse.json({ error: "Invalid pack ID." }, { status: 400 });

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: pack.amount * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}_${user.id.substring(0, 5)}`,
      notes: {
        userId: user.id,
        packId: packId,
        credits: pack.credits,
      },
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
