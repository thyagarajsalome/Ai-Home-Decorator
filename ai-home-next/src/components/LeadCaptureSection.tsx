"use client";

import React, { useState } from "react";

interface Props {
  source?: string;
  defaultStyle?: string;
}

export default function LeadCaptureSection({
  source = "homepage_lookbook",
  defaultStyle = "Modern & Farmhouse",
}: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source,
          style: defaultStyle,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit.");
      }

      setSubmitted(true);
      setEmail("");
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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

              <p className="text-xs sm:text-sm text-[#6D5D53] leading-relaxed mb-6">
                Discover 40+ curated room makeovers, top American paint &amp; flooring palettes, and 30 copy-paste AI prompt recipes for your home.
              </p>

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
                  <div className="w-14 h-14 rounded-full bg-[#FEEDDF] text-[#E87A1E] flex items-center justify-center text-3xl mx-auto mb-3 shadow-inner">
                    🎉
                  </div>
                  <h3 className="text-lg font-bold text-[#4A2508] font-heading mb-1">
                    Lookbook Sent!
                  </h3>
                  <p className="text-xs text-[#6D5D53] leading-relaxed mb-4">
                    Please check your inbox. We&apos;ve sent your free 2026 Lookbook and direct link to claim your bonus starter credits.
                  </p>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.aihomedecorator.twa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brand-primary w-full py-2.5 text-xs font-extrabold inline-block"
                  >
                    Open in Android App &rarr;
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="lead-email"
                      className="block text-xs font-bold text-[#4A2508] uppercase tracking-wider mb-2"
                    >
                      Where should we send your Lookbook?
                    </label>
                    <input
                      type="email"
                      id="lead-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email address"
                      className="w-full p-3.5 rounded-xl bg-white border border-[#E2CEBD] text-xs sm:text-sm text-[#382A22] placeholder-[#A69588] focus:outline-none focus:ring-2 focus:ring-[#E87A1E] transition-all"
                      disabled={loading}
                    />
                  </div>

                  {errorMsg && (
                    <div className="text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-brand-primary py-3.5 text-xs sm:text-sm font-black shadow-md shadow-[#E87A1E]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Sending Lookbook...</span>
                    ) : (
                      <>
                        <span>Get Free Lookbook PDF</span>
                        <span>&rarr;</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-[#8D7D72] text-center pt-1">
                    <span>🔒 No spam, ever. Unsubscribe with 1-click.</span>
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
