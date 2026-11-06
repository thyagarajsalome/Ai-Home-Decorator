import nodemailer from "nodemailer";

interface SendEmailParams {
  toEmail: string;
  source?: string;
  style?: string;
}

export async function sendLookbookEmail({
  toEmail,
  source = "website_lookbook",
}: SendEmailParams): Promise<{ success: boolean; error?: string }> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = port === 465;
  const from = process.env.SMTP_FROM || `"AI Home Decorator" <${user || "hello@aihomedecorator.com"}>`;

  // Check if SMTP is configured
  if (!host || !user || !pass) {
    console.warn(
      `[Email Service] SMTP credentials not fully set (SMTP_HOST: ${!!host}, SMTP_USER: ${!!user}). Lead captured for ${toEmail}.`
    );
    // Return success so form doesn't block user if SMTP isn't wired up yet
    return { success: true };
  }

  const pdfUrl = "https://aihomedecorator.com/downloads/2026-USA-Home-Design-Remodel-Lookbook.pdf";
  const appUrl = "https://play.google.com/store/apps/details?id=com.aihomedecorator.twa";

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
    subject: "Your 2026 USA Home Design & Remodel Lookbook is here! 📖",
    text: `Hello,\n\nThank you for requesting the official 2026 USA Home Design & Remodel Lookbook!\n\nYou can download your free PDF lookbook here:\n${pdfUrl}\n\nWant to generate these rooms instantly on your own photos? Download our Android App with free starter credits:\n${appUrl}\n\nHappy decorating,\nThe AI Home Decorator Team\nhttps://aihomedecorator.com`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FFFBF7; margin: 0; padding: 24px; color: #382A22; }
            .container { max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #FCD7BA; overflow: hidden; box-shadow: 0 4px 12px rgba(232, 122, 30, 0.08); }
            .header { background: linear-gradient(135deg, #FEEDDF 0%, #FFF8F2 100%); padding: 32px 24px; text-align: center; border-bottom: 2px solid #FCD7BA; }
            .badge { display: inline-block; background-color: #E87A1E; color: #ffffff; font-size: 11px; font-weight: bold; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
            .title { color: #4A2508; font-size: 24px; font-weight: 800; margin: 0 0 8px 0; line-height: 1.25; }
            .subtitle { color: #8D3D10; font-size: 14px; margin: 0; }
            .content { padding: 32px 24px; font-size: 14px; line-height: 1.6; color: #5C3314; }
            .cta-box { text-align: center; margin: 28px 0; }
            .cta-btn { display: inline-block; background-color: #E87A1E; color: #ffffff !important; text-decoration: none; font-size: 15px; font-weight: bold; padding: 14px 28px; border-radius: 12px; box-shadow: 0 4px 10px rgba(232, 122, 30, 0.3); }
            .card { background-color: #FFFBF7; border: 1px dashed #F8B98B; border-radius: 12px; padding: 16px; margin: 20px 0; }
            .footer { background-color: #FFF8F2; padding: 20px 24px; text-align: center; font-size: 12px; color: #8D7D72; border-top: 1px solid #F1E4D5; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <span class="badge">Official Design Guide</span>
              <h1 class="title">2026 USA Home Design &amp; Remodel Lookbook</h1>
              <p class="subtitle">Curated styles, color palettes, and AI prompt recipes</p>
            </div>
            <div class="content">
              <p>Hi there,</p>
              <p>Thank you for requesting your copy of our <strong>2026 USA Home Design &amp; Remodel Lookbook</strong>! We are excited to help you transform your home.</p>
              
              <div class="cta-box">
                <a href="${pdfUrl}" class="cta-btn" target="_blank">
                  📥 Download Your 2026 Lookbook (PDF)
                </a>
              </div>

              <div class="card">
                <strong style="color: #4A2508;">What's inside your guide:</strong>
                <ul style="margin: 8px 0 0 0; padding-left: 20px;">
                  <li>40+ High-definition room before/after transformations</li>
                  <li>30 copy-paste AI prompt formulas for real-room redesigns</li>
                  <li>Kitchen, bathroom, and outdoor remodel budget frameworks</li>
                  <li>Top trending American design aesthetics for 2026</li>
                </ul>
              </div>

              <p style="margin-top: 24px;">
                <strong>Want to redesign your own rooms right now?</strong><br>
                Install the official <a href="${appUrl}" style="color: #E87A1E; font-weight: bold;">AI Home Decorator Android App</a> on Google Play to test these prompt recipes on your own photos with free bonus credits.
              </p>
            </div>
            <div class="footer">
              <p style="margin: 0 0 6px 0;">AI Home Decorator &bull; Official USA Interior Design Guide</p>
              <p style="margin: 0;">You received this email because you requested the 2026 Lookbook at aihomedecorator.com.</p>
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
