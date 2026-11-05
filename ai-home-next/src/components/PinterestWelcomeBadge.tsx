"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.aihomedecorator.twa";
const PINTEREST_PROFILE = "https://www.pinterest.com/aihomedecorator/";

const PinterestWelcomeBadge: React.FC = () => {
  const [isFromPinterest, setIsFromPinterest] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const dismissed = sessionStorage.getItem("pinterest_badge_dismissed");
    if (dismissed) return;

    const referrer = document.referrer?.toLowerCase() || "";
    const search = window.location.search?.toLowerCase() || "";

    const hasPinterestIntent =
      referrer.includes("pinterest") ||
      search.includes("pinterest") ||
      search.includes("pin_id") ||
      search.includes("utm_source=pinterest");

    if (hasPinterestIntent) {
      setIsFromPinterest(true);
      setIsDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem("pinterest_badge_dismissed", "true");
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "pinterest_welcome_badge" }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isFromPinterest || isDismissed) return null;

  return (
    <aside
      aria-label="Pinterest visitor welcome"
      className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-sm w-full bg-white border-2 border-[#FCD7BA] p-4 sm:p-5 rounded-3xl shadow-2xl text-[#382A22] animate-slideUp text-left"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          {/* Pinterest Pin Icon */}
          <div className="w-8 h-8 rounded-full bg-[#E60023] flex items-center justify-center text-white font-black text-sm flex-shrink-0 shadow-md">
            P
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#4A2508] flex items-center gap-1.5">
              <span>Visiting from Pinterest?</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#FEEDDF] text-[#8D3D10] border border-[#F8B98B] font-bold">
                Special
              </span>
            </h4>
            <a
              href={PINTEREST_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-[#E60023] hover:underline font-semibold"
            >
              Follow @aihomedecorator ↗
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close Pinterest banner"
          className="text-[#8D7D72] hover:text-[#4A2508] p-1 rounded transition-colors text-base leading-none"
        >
          &times;
        </button>
      </div>

      <p className="text-xs text-[#5C3314] mt-2.5 leading-relaxed">
        Love our Pinterest designs? Get our <strong>2026 Home Lookbook PDF</strong> + bonus starter credits sent to your inbox:
      </p>

      {/* Lookbook Thumbnail Preview */}
      <div className="mt-2 mb-1 relative rounded-xl overflow-hidden border border-[#FCD7BA] shadow-xs">
        <Image
          src="/brand/lookbook-2026-cover.webp"
          alt="2026 USA Lookbook"
          width={600}
          height={400}
          className="w-full h-auto object-cover"
        />
      </div>

      {submitted ? (
        <div className="mt-3 p-3 rounded-xl bg-[#FEEDDF] text-center text-xs font-bold text-[#4A2508] animate-fade space-y-1.5">
          <div>🎉 Your 2026 Lookbook is ready!</div>
          <a
            href="/downloads/2026-USA-Home-Design-Remodel-Lookbook.pdf"
            download="2026-USA-Home-Design-Remodel-Lookbook.pdf"
            className="block text-[#E87A1E] underline font-black"
          >
            📥 Download Lookbook PDF
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[11px] text-[#4A2508] hover:underline"
          >
            Or Open Android App &rarr;
          </a>
        </div>
      ) : (
        <form onSubmit={handleLeadSubmit} className="mt-3 space-y-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="w-full p-2.5 rounded-xl bg-[#FFFBF7] border border-[#E2CEBD] text-xs text-[#382A22] placeholder-[#A69588] focus:outline-none focus:ring-1 focus:ring-[#E87A1E]"
            disabled={loading}
          />
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-brand-primary py-2 px-3 text-xs font-bold"
            >
              {loading ? "Sending..." : "Send Free Lookbook"}
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#6D5D53] text-xs font-semibold transition-colors"
            >
              Later
            </button>
          </div>
        </form>
      )}
    </aside>
  );
};

export default PinterestWelcomeBadge;
