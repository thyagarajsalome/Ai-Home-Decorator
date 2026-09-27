"use client";
import React, { useState, useEffect } from "react";

interface USCalculatorItem {
  id: string;
  name: string;
  icon: string;
  calcParam: string;
}

const US_CALCULATORS: USCalculatorItem[] = [
  { id: "kitchen", name: "Kitchen Remodel", icon: "🍳", calcParam: "usa-kitchen-remodel" },
  { id: "bath", name: "Bath Remodel", icon: "🛁", calcParam: "usa-bathroom-remodel" },
  { id: "interior", name: "Interior Design", icon: "🛋️", calcParam: "usa-interior-design" },
  { id: "addition", name: "Home Addition", icon: "🏡", calcParam: "usa-home-addition" },
  { id: "roofing", name: "Roofing & Shingles", icon: "🏠", calcParam: "usa-roofing" },
];

const HDEPromoBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if dismissed previously in session
    const isDismissed = sessionStorage.getItem("hde_promo_dismissed");
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("hde_promo_dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-slate-950 via-blue-950/90 to-indigo-950 text-white text-xs py-2.5 px-3 sm:px-6 border-b border-blue-500/25 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        {/* Left: US Branding & Core Features */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center md:justify-start text-center md:text-left">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-base sm:text-lg">🇺🇸</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/25 border border-blue-400/40 text-blue-300 text-[10px] font-black uppercase tracking-wider">
              USA Remodel Estimator
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-300">
            <span className="hidden xl:inline text-gray-400">by HDE:</span>
            <span className="font-semibold text-white">Instant $/sqft Takeoff</span>
            <span className="text-blue-400/60">•</span>
            <span className="text-gray-300">50 States Local Pricing</span>
            <span className="hidden sm:inline text-blue-400/60">•</span>
            <span className="hidden sm:inline text-gray-300">Contractor BOQ &amp; PDF</span>
          </div>
        </div>

        {/* Right: Quick Calculator Pills & CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center flex-shrink-0">
          {/* Quick-Access Calculator Pills */}
          <div className="hidden lg:flex items-center gap-1.5">
            {US_CALCULATORS.map((calc) => (
              <a
                key={calc.id}
                href={`https://www.homedesignenglish.com/?region=US&calc=${calc.calcParam}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 hover:bg-blue-600/30 border border-white/10 hover:border-blue-400/50 text-[11px] font-medium text-gray-200 hover:text-white transition-all shadow-sm"
                title={`Open USA ${calc.name} Cost Estimator`}
              >
                <span>{calc.icon}</span>
                <span>{calc.name}</span>
              </a>
            ))}
          </div>

          {/* Main Launch Button */}
          <a
            href="https://www.homedesignenglish.com/?region=US"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold transition-all shadow-md hover:scale-105"
          >
            <span>Open All US Calculators</span>
            <span className="text-xs">↗</span>
          </a>

          {/* Close Banner Button */}
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss banner"
            className="text-gray-400 hover:text-white p-1 rounded transition-colors text-base leading-none ml-1 cursor-pointer"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default HDEPromoBanner;
