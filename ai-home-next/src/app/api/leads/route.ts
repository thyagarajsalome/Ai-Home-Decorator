import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import {
  validateEmailSyntax,
  validateEmailDomainMx,
} from "@/lib/emailValidation";
import { sendLookbookEmail } from "@/lib/sendLookbookEmail";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://fhplqcddcvwyqflgbfaj.supabase.co";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZocGxxY2RkY3Z3eXFmbGdiZmFqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTc5MzA3MywiZXhwIjoyMDc3MzY5MDczfQ.9IuaMuWCLvKDFK22C7fBNPcgh3_wtwsZBgi7gmF6XqU";

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, source = "website_lookbook", style = "" } = body;

    // 1. Strict syntax, bogus patterns, and disposable domain check
    const syntaxResult = validateEmailSyntax(email);
    if (!syntaxResult.isValid || !syntaxResult.cleanEmail) {
      return NextResponse.json(
        { error: syntaxResult.error || "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const cleanEmail = syntaxResult.cleanEmail;
    const domain = cleanEmail.split("@")[1];

    // 2. Real-time DNS MX record verification (verifies domain can receive emails)
    const mxResult = await validateEmailDomainMx(domain);
    if (!mxResult.isValid) {
      return NextResponse.json(
        { error: mxResult.error || "The email domain could not be verified." },
        { status: 400 }
      );
    }

    // 3. Dispatch Lookbook delivery email to their actual inbox
    try {
      await sendLookbookEmail({
        toEmail: cleanEmail,
        source,
        style,
      });
    } catch (mailErr) {
      console.error("Lookbook email dispatch error:", mailErr);
    }

    // 4. Store in Supabase Auth as a verified lead
    try {
      await supabaseAdmin.auth.admin.createUser({
        email: cleanEmail,
        email_confirm: true,
        user_metadata: {
          source,
          style_interest: style,
          captured_at: new Date().toISOString(),
          is_lead: true,
          verified_mx: true,
        },
      });
    } catch (sbErr) {
      // User might already exist in auth, continue gracefully
      console.log("Supabase lead create notice:", sbErr);
    }

    // 5. Append to local leads.csv for immediate export access
    try {
      const csvPath = path.resolve(process.cwd(), "leads.csv");
      const dateStr = new Date().toISOString().split("T")[0];
      const csvLine = `"${cleanEmail}","Lead (${source})","Verified Lead","${dateStr}","${dateStr}"\r\n`;

      fs.appendFileSync(csvPath, csvLine, "utf8");
    } catch (fsErr) {
      console.error("Error appending to leads.csv:", fsErr);
    }

    return NextResponse.json({
      success: true,
      message: `Your Lookbook PDF download link has been sent to ${cleanEmail}. Please check your inbox.`,
    });
  } catch (error: any) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { error: "Failed to process request. Please try again." },
      { status: 500 }
    );
  }
}
