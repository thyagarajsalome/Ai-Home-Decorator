"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Props {
  source?: string;
  defaultStyle?: string;
}

export default function LeadCaptureSection({
  source = "homepage_lookbook",
  defaultStyle = "Modern & Farmhouse",
}: Props) {
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    // Client-side quick check
    if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      setErrorMsg("Please enter a valid email address (e.g. name@gmail.com).");
      return;
    }

    if (
      cleanEmail.startsWith("test@") ||
      cleanEmail.startsWith("fake@") ||
      cleanEmail.startsWith("asdf@") ||
      cleanEmail.startsWith("admin@")
    ) {
      setErrorMsg("Please enter a genuine personal or work email address.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          source,
          style: defaultStyle,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Please enter a valid, active email address.");
      }

      setSubmitted(true);
      setSubmittedEmail(cleanEmail);
      setEmail("");
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please check your email and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmittedEmail("");
    setEmail("");
    setErrorMsg("");
  };

  return (
    <section className="relative overflow-hidden py-16 bg-[#FFF8F2] border-y border-[#F1E4D5]">
      {/* Decorative Warm Shapes */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#FEEDDF]/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#FCD7BA]/40 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-white rounded-3xl border-2 border-[#FCD7BA] shadow-xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEEDDF] border border-[#F8B98B] text-[#8D3D10] text-xs font-bold mb-4">
                <span>📖</span>
                <span>Free 2026 Home Design Guide</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#4A2508] font-heading tracking-tight mb-3">
                Get the 2026 USA Interior Design &amp; Remodel Lookbook
              </h2>

              <p className="text-xs sm:text-sm text-[#6D5D53] leading-relaxed mb-4">
                Discover 40+ curated room makeovers, top American paint &amp; flooring palettes, and 30 copy-paste AI prompt recipes for your home.
              </p>

              {/* Official Lookbook Cover Visual Preview */}
              <div className="relative mb-5 rounded-2xl overflow-hidden border-2 border-[#FCD7BA] shadow-md group bg-[#FEEDDF]">
                <Image
                  src="/brand/lookbook-2026-cover.webp"
                  alt="2026 USA Home Design & Remodel Lookbook Cover Preview"
                  width={1536}
                  height={1024}
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  priority
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
                <div className="absolute top-2.5 right-2.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold border border-white/20">
                  Delivered to Your Email
                </div>
              </div>

              {/* Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-bold text-[#4A2508] mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#FEEDDF] text-[#E87A1E] flex items-center justify-center text-[10px]">✓</span>
                  <span>40+ Room Before/After Guides</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#FEEDDF] text-[#E87A1E] flex items-center justify-center text-[10px]">✓</span>
                  <span>30 Instant AI Prompt Formulas</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#FEEDDF] text-[#E87A1E] flex items-center justify-center text-[10px]">✓</span>
                  <span>Kitchen &amp; Bath Remodel Budget Tips</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#FEEDDF] text-[#E87A1E] flex items-center justify-center text-[10px]">✓</span>
                  <span>Free Bonus Starter Credits</span>
                </div>
              </div>
            </div>

            {/* Right Column: Lead Capture Box */}
            <div className="lg:col-span-5 bg-[#FFFBF7] rounded-2xl p-6 sm:p-8 border border-[#F1E4D5]">
              {submitted ? (
                <div className="text-center py-4 animate-fade">
                  <div className="w-16 h-16 rounded-full bg-[#FEEDDF] text-[#E87A1E] flex items-center justify-center text-3xl mx-auto mb-3 shadow-inner">
                    📬
                  </div>
                  <h3 className="text-xl font-black text-[#4A2508] font-heading mb-1.5">
                    Check Your Inbox!
                  </h3>
                  <p className="text-xs text-[#6D5D53] leading-relaxed mb-3">
                    We sent the <strong>2026 USA Lookbook PDF</strong> download link to:
                  </p>
                  <div className="bg-white border border-[#E2CEBD] rounded-xl py-2 px-3 text-xs font-mono font-bold text-[#8D3D10] break-all mb-4">
                    {submittedEmail}
                  </div>
                  <p className="text-[11px] text-[#8D7D72] leading-relaxed mb-5">
                    Please open your email inbox to download the guide. If you don&apos;t see it within 1–2 minutes, be sure to check your spam or promotions tab.
                  </p>
                  
                  <div className="space-y-2.5">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.aihomedecorator.twa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-brand-primary w-full py-2.5 text-xs font-black inline-flex items-center justify-center gap-1.5"
                    >
                      <span>📱 Get Android App &amp; Bonus Credits &rarr;</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-[11px] text-[#8D7D72] hover:text-[#4A2508] underline block mx-auto pt-1 font-medium"
                    >
                      Entered the wrong email? Click to send to another address
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="lead-email"
                      className="block text-xs font-bold text-[#4A2508] uppercase tracking-wider mb-2"
                    >
                      Where should we email your Lookbook?
                    </label>
                    <input
                      type="email"
                      id="lead-email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMsg) setErrorMsg("");
                      }}
                      required
                      placeholder="Enter your personal or work email"
                      className="w-full p-3.5 rounded-xl bg-white border border-[#E2CEBD] text-xs sm:text-sm text-[#382A22] placeholder-[#A69588] focus:outline-none focus:ring-2 focus:ring-[#E87A1E] transition-all"
                      disabled={loading}
                    />
                  </div>

                  {errorMsg && (
                    <div className="text-xs font-semibold text-red-700 bg-red-50 p-3 rounded-xl border border-red-200 flex items-start gap-2 animate-fade">
                      <span className="text-sm leading-none mt-0.5">⚠️</span>
                      <span className="flex-1">{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-brand-primary py-3.5 text-xs sm:text-sm font-black shadow-md shadow-[#E87A1E]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        <span>Verifying &amp; Sending...</span>
                      </span>
                    ) : (
                      <>
                        <span>Send Free Lookbook to My Email</span>
                        <span>&rarr;</span>
                      </>
                    )}
                  </button>

                  <div className="space-y-1 pt-1 text-center">
                    <p className="text-[11px] text-[#5C3314] font-medium">
                      📩 Download link is sent directly to your inbox.
                    </p>
                    <p className="text-[10px] text-[#8D7D72]">
                      🔒 100% privacy. No spam. Unsubscribe anytime.
                    </p>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
