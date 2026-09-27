"use client";
import React, { useState, useEffect } from "react";

const PinterestWelcomeBadge: React.FC = () => {
  const [isFromPinterest, setIsFromPinterest] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);

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

  if (!isFromPinterest || isDismissed) return null;

  return (
    <aside
      aria-label="Pinterest visitor welcome"
      className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-sm w-full bg-slate-900/95 border border-red-500/30 backdrop-blur-md p-4 rounded-2xl shadow-2xl text-white animate-slideUp text-left"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Pinterest Pin Icon */}
          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0 shadow-md">
            P
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Visiting from Pinterest?</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-950/80 text-red-300 border border-red-500/30 font-semibold">
                USA Special
              </span>
            </h4>
            <p className="text-[10px] text-gray-400">Welcome to AI Home Decorator</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close Pinterest banner"
          className="text-gray-400 hover:text-white p-1 rounded transition-colors text-sm"
        >
          &times;
        </button>
      </div>

      <p className="text-xs text-gray-300 mt-2.5 leading-relaxed">
        Love the visual design ideas on Pinterest? Turn them into reality with instant <strong>US contractor &amp; material cost estimates</strong> on our partner calculator, <strong>HDE</strong>.
      </p>

      <div className="mt-3.5 flex items-center gap-2">
        <a
          href="https://www.homedesignenglish.com/?region=US"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-3 text-center rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
        >
          <span>Calculate Remodel Costs</span>
          <span className="text-xs">↗</span>
        </a>
        <button
          type="button"
          onClick={handleDismiss}
          className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs font-semibold transition-colors"
        >
          Got it
        </button>
      </div>
    </aside>
  );
};

export default PinterestWelcomeBadge;
