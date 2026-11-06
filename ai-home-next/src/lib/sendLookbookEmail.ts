import nodemailer from "nodemailer";

interface SendEmailParams {
  toEmail: string;
  source?: string;
  style?: string;
}

export async function sendLookbookEmail({
  toEmail,
}: SendEmailParams): Promise<{ success: boolean; error?: string }> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = port === 465;

  // Use the exact authenticated user as the sender address to prevent DMARC spoofing flags
  const from =
    process.env.SMTP_FROM ||
    `"AI Home Decorator" <${user || "contactaihomedecorator@gmail.com"}>`;

  if (!host || !user || !pass) {
    console.warn(
      `[Email Service] SMTP credentials not fully set. Lead captured for ${toEmail}.`
    );
    return { success: true };
  }

  const pdfUrl =
    "https://aihomedecorator.com/downloads/2026-USA-Home-Design-Remodel-Lookbook.pdf";
  const appUrl =
    "https://play.google.com/store/apps/details?id=com.aihomedecorator.twa";

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from,
    to: toEmail,
    replyTo: user,
    // Clean, direct subject without spam-trigger symbols or excessive punctuation
    subject: "Your 2026 USA Home Design & Remodel Lookbook Download",
    headers: {
      "X-Entity-Ref-ID": `lookbook-${Date.now()}`,
      "List-Unsubscribe": `<mailto:${user}?subject=Unsubscribe>`,
    },
    text: `Hi there,

Thank you for requesting the official 2026 USA Home Design & Remodel Lookbook from AI Home Decorator.

You can download your PDF copy directly at the link below:
${pdfUrl}

What is inside your guide:
- 40+ curated room transformations (kitchens, living rooms, patios, bathrooms)
- 30 AI prompt formulas you can copy-paste for room makeovers
- Remodel budget planning tips for American homes

To generate these room redesigns on your own photos, download our Android App:
${appUrl}

Best regards,
The AI Home Decorator Team
https://aihomedecorator.com
Unsubscribe: reply with 'Unsubscribe'`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>2026 USA Home Design Lookbook</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FFFBF7; margin: 0; padding: 20px; color: #382A22; }
            .wrapper { max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #FCD7BA; overflow: hidden; }
            .header { background-color: #FEEDDF; padding: 28px 24px; text-align: center; border-bottom: 2px solid #FCD7BA; }
            .tag { display: inline-block; background-color: #E87A1E; color: #ffffff; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
            .title { color: #4A2508; font-size: 22px; font-weight: 800; margin: 0; line-height: 1.3; }
            .body-content { padding: 28px 24px; font-size: 14px; line-height: 1.6; color: #5C3314; }
            .button-container { text-align: center; margin: 24px 0; }
            .download-btn { display: inline-block; background-color: #E87A1E; color: #ffffff !important; text-decoration: none; font-size: 14px; font-weight: 700; padding: 14px 26px; border-radius: 10px; }
            .highlight-box { background-color: #FFFBF7; border: 1px solid #F8B98B; border-radius: 10px; padding: 16px; margin: 20px 0; }
            .footer { background-color: #FFF8F2; padding: 18px 24px; text-align: center; font-size: 11px; color: #8D7D72; border-top: 1px solid #F1E4D5; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <span class="tag">Official Guide</span>
              <h1 class="title">2026 USA Home Design &amp; Remodel Lookbook</h1>
            </div>
            <div class="body-content">
              <p>Hi there,</p>
              <p>Thank you for requesting your copy of the <strong>2026 USA Home Design &amp; Remodel Lookbook</strong>. Your guide is ready to view and download.</p>
              
              <div class="button-container">
                <a href="${pdfUrl}" class="download-btn" target="_blank" rel="noopener noreferrer">
                  Download Lookbook PDF
                </a>
              </div>

              <div class="highlight-box">
                <strong style="color: #4A2508;">Inside your 2026 Lookbook:</strong>
                <ul style="margin: 8px 0 0 0; padding-left: 20px;">
                  <li>40+ High-definition room before/after transformations</li>
                  <li>30 copy-paste AI prompt formulas for real-room redesigns</li>
                  <li>Kitchen, bathroom, and outdoor remodel budget frameworks</li>
                  <li>Top trending American design aesthetics for 2026</li>
                </ul>
              </div>

              <p style="margin-top: 20px;">
                <strong>Want to redesign your rooms instantly?</strong><br>
                Try the official <a href="${appUrl}" style="color: #E87A1E; font-weight: bold;" target="_blank" rel="noopener noreferrer">AI Home Decorator Android App</a> on Google Play to test these prompt formulas on your home photos.
              </p>
            </div>
            <div class="footer">
              <p style="margin: 0 0 4px 0;">AI Home Decorator &bull; Official USA Interior Design Guide</p>
              <p style="margin: 0;">You received this email because you requested the guide at <a href="https://aihomedecorator.com" style="color: #8D7D72;">aihomedecorator.com</a>. Reply &quot;Unsubscribe&quot; to opt out.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err: any) {
    console.error("[Email Service] Failed to send email via SMTP:", err);
    return { success: false, error: err.message };
  }
}
