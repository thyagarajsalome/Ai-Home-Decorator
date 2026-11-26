"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

interface USHomeCalculatorsProps {
  cityName?: string;
  stateCode?: string;
  costMultiplier?: number;
  defaultTab?: "lighting" | "painting";
}

type RoomLightingPreset = {
  id: string;
  label: string;
  footCandles: number;
  kelvin: string;
  dimmerTip: string;
  tipSlug: string;
};

const LIGHTING_PRESETS: RoomLightingPreset[] = [
  {
    id: "living",
    label: "Living Room / Family Hall",
    footCandles: 20,
    kelvin: "2700K (Warm Ambient)",
    dimmerTip: "Put recessed cans & sconces on separate ELV dimmers for movie vs. hosting scenes.",
    tipSlug: "living-room-lighting-ideas",
  },
  {
    id: "kitchen",
    label: "Kitchen (Prep & Island)",
    footCandles: 50,
    kelvin: "3000K (Crisp Warm White)",
    dimmerTip: "Align perimeter cans 24–26 in. from walls (over counter edge) to avoid body shadows.",
    tipSlug: "kitchen-lighting-layout",
  },
  {
    id: "bedroom",
    label: "Primary / Guest Bedroom",
    footCandles: 15,
    kelvin: "2700K (Relaxing Warm)",
    dimmerTip: "Keep cans out of direct sightline above pillows; supplement with bedside task sconces.",
    tipSlug: "bedroom-lighting-design",
  },
  {
    id: "bathroom",
    label: "Bathroom & Vanity",
    footCandles: 60,
    kelvin: "3000K (90+ CRI Required)",
    dimmerTip: "Use wet-rated shower trims plus eye-level vertical vanity sconces (65–70 in. high).",
    tipSlug: "bathroom-vanity-lighting",
  },
  {
    id: "office",
    label: "Home Office / Study",
    footCandles: 45,
    kelvin: "3000K–3500K (Focused Neutral)",
    dimmerTip: "Avoid placing recessed cans directly behind your webcam/monitor to eliminate glare.",
    tipSlug: "home-office-lighting-setup",
  },
  {
    id: "dining",
    label: "Dining Room",
    footCandles: 30,
    kelvin: "2700K (Warm Dining)",
    dimmerTip: "Hang center chandelier 30–36 in. above table; aim perimeter cans toward wall art.",
    tipSlug: "dining-room-chandelier-guide",
  },
];

const PAINT_TIERS = [
  { id: "mid", label: "Mid-Grade ($45/gal — e.g. SW SuperPaint / Behr Marquee)", pricePerGal: 45 },
  { id: "pro", label: "Pro-Grade ($75/gal — e.g. SW Emerald / BM Aura)", pricePerGal: 75 },
];

export default function USHomeCalculators({
  cityName,
  stateCode,
  costMultiplier = 1.0,
  defaultTab = "lighting",
}: USHomeCalculatorsProps) {
  const [activeTab, setActiveTab] = useState<"lighting" | "painting">(defaultTab);

  // Lighting Calculator State
  const [roomType, setRoomType] = useState<string>("kitchen");
  const [lightLength, setLightLength] = useState<number>(14);
  const [lightWidth, setLightWidth] = useState<number>(12);
  const [ceilingHeight, setCeilingHeight] = useState<number>(9);

  // Painting Calculator State
  const [paintLength, setPaintLength] = useState<number>(14);
  const [paintWidth, setPaintWidth] = useState<number>(12);
  const [paintHeight, setPaintHeight] = useState<number>(9);
  const [doors, setDoors] = useState<number>(2);
  const [windows, setWindows] = useState<number>(2);
  const [coats, setCoats] = useState<number>(2);
  const [includeCeiling, setIncludeCeiling] = useState<boolean>(false);
  const [paintTierId, setPaintTierId] = useState<string>("mid");

  const lightingResult = useMemo(() => {
    const L = Math.max(4, Math.min(60, Number(lightLength) || 12));
    const W = Math.max(4, Math.min(60, Number(lightWidth) || 10));
    const H = Math.max(7, Math.min(20, Number(ceilingHeight) || 8));
    const preset = LIGHTING_PRESETS.find((p) => p.id === roomType) || LIGHTING_PRESETS[0];

    const area = L * W;
    // Higher ceilings lose ~15% illumination at 10ft and ~30% at 12ft+
    const heightFactor = H >= 12 ? 1.3 : H >= 10 ? 1.15 : 1.0;
    const totalLumens = Math.round((area * preset.footCandles * heightFactor) / 50) * 50;

    // Classic US recessed spacing formula: spacing = ceilingHeight / 2
    const idealSpacingFt = Number((H / 2).toFixed(1));
    const wallOffsetFt = Number((idealSpacingFt / 2).toFixed(1));

    const cols = Math.max(1, Math.round(L / idealSpacingFt));
    const rows = Math.max(1, Math.round(W / idealSpacingFt));
    const totalCans = cols * rows;
    const lumensPerCan = Math.round(totalLumens / totalCans);

    const estLow = Math.round((totalCans * 145 * costMultiplier) / 25) * 25;
    const estHigh = Math.round((totalCans * 265 * costMultiplier) / 25) * 25;

    return {
      area,
      preset,
      totalLumens,
      idealSpacingFt,
      wallOffsetFt,
      cols,
      rows,
      totalCans,
      lumensPerCan,
      estLow,
      estHigh,
    };
  }, [roomType, lightLength, lightWidth, ceilingHeight, costMultiplier]);

  const paintingResult = useMemo(() => {
    const L = Math.max(4, Math.min(60, Number(paintLength) || 12));
    const W = Math.max(4, Math.min(60, Number(paintWidth) || 10));
    const H = Math.max(7, Math.min(20, Number(paintHeight) || 8));
    const d = Math.max(0, Math.min(10, Number(doors) || 0));
    const win = Math.max(0, Math.min(16, Number(windows) || 0));
    const c = coats === 1 ? 1 : 2;

    const grossWallSqFt = 2 * (L + W) * H;
    const deductions = d * 21 + win * 15;
    const netWallSqFt = Math.max(40, grossWallSqFt - deductions);
    const ceilingSqFt = includeCeiling ? L * W : 0;

    // US average coverage: 350 sq ft per gallon per coat
    const exactWallGallons = (netWallSqFt * c) / 350;
    const wallGallonsToBuy = Math.max(1, Math.ceil(exactWallGallons));
    const ceilingGallonsToBuy = includeCeiling ? Math.max(1, Math.ceil(ceilingSqFt / 350)) : 0;
    const primerGallons = Math.max(1, Math.ceil(netWallSqFt / 350));

    const tier = PAINT_TIERS.find((t) => t.id === paintTierId) || PAINT_TIERS[0];
    const totalPaintGallons = wallGallonsToBuy + ceilingGallonsToBuy;
    const diyPaintCost = totalPaintGallons * tier.pricePerGal + 55; // + rollers, tape, tray

    // US Pro interior labor + paint: ~$2.25 - $3.85 per paintable sq ft (2 coats)
    const proBase = netWallSqFt + ceilingSqFt;
    const proLow = Math.round((proBase * 2.1 * costMultiplier) / 25) * 25;
    const proHigh = Math.round((proBase * 3.6 * costMultiplier) / 25) * 25;

    return {
      netWallSqFt,
      ceilingSqFt,
      exactWallGallons: exactWallGallons.toFixed(1),
      wallGallonsToBuy,
      ceilingGallonsToBuy,
      primerGallons,
      diyPaintCost,
      proLow,
      proHigh,
      tier,
    };
  }, [paintLength, paintWidth, paintHeight, doors, windows, coats, includeCeiling, paintTierId, costMultiplier]);

  const locationSuffix = cityName && stateCode ? `${cityName}, ${stateCode.toUpperCase()}` : "US National Average";

  return (
    <section className="rounded-3xl border border-[#F1E4D5] bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#F1E4D5]">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEEDDF] border border-[#F8B98B] text-[#8D3D10] text-xs font-bold mb-2">
            <span>🇺🇸</span>
            <span>Interactive USA Remodel Calculators</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#4A2508] font-heading">
            Plan Your Room Lumens, Recessed Cans &amp; Paint Budget
          </h2>
          <p className="text-xs sm:text-sm text-[#7A5C3A] mt-1">
            Imperial measurements (ft / sq ft / gal) calibrated to{" "}
            <strong className="text-[#4A2508]">{locationSuffix}</strong> labor &amp; material rates.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex rounded-2xl bg-[#FFFBF7] p-1.5 border border-[#F1E4D5] self-start">
          <button
            type="button"
            onClick={() => setActiveTab("lighting")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "lighting"
                ? "bg-[#E87A1E] text-white shadow-sm"
                : "text-[#5C3314] hover:text-[#E87A1E]"
            }`}
          >
            💡 Lighting &amp; Can Spacing
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("painting")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "painting"
                ? "bg-[#E87A1E] text-white shadow-sm"
                : "text-[#5C3314] hover:text-[#E87A1E]"
            }`}
          >
            🎨 Paint Gallons &amp; Cost
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: LIGHTING & RECESSED CAN CALCULATOR                     */}
      {/* ============================================================ */}
      {activeTab === "lighting" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start">
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#4A2508] mb-1.5">
                Room Type (Sets Target Foot-Candles &amp; Kelvin)
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full rounded-xl border border-[#E5D5C3] bg-[#FFFBF7] px-3.5 py-2.5 text-sm font-medium text-[#4A2508] focus:border-[#E87A1E] focus:outline-none"
              >
                {LIGHTING_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label} ({p.footCandles} fc)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#4A2508] mb-1">
                  Length (ft)
                </label>
                <input
                  type="number"
                  min={4}
                  max={60}
                  value={lightLength}
                  onChange={(e) => setLightLength(Number(e.target.value))}
                  className="w-full rounded-xl border border-[#E5D5C3] bg-[#FFFBF7] px-3 py-2 text-sm font-semibold text-[#4A2508] focus:border-[#E87A1E] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#4A2508] mb-1">
                  Width (ft)
                </label>
                <input
                  type="number"
                  min={4}
                  max={60}
                  value={lightWidth}
                  onChange={(e) => setLightWidth(Number(e.target.value))}
                  className="w-full rounded-xl border border-[#E5D5C3] bg-[#FFFBF7] px-3 py-2 text-sm font-semibold text-[#4A2508] focus:border-[#E87A1E] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#4A2508] mb-1">
                  Ceiling (ft)
                </label>
                <select
                  value={ceilingHeight}
                  onChange={(e) => setCeilingHeight(Number(e.target.value))}
                  className="w-full rounded-xl border border-[#E5D5C3] bg-[#FFFBF7] px-3 py-2 text-sm font-semibold text-[#4A2508] focus:border-[#E87A1E] focus:outline-none"
                >
                  <option value={8}>8 ft</option>
                  <option value={9}>9 ft</option>
                  <option value={10}>10 ft</option>
                  <option value={12}>12 ft</option>
                </select>
              </div>
            </div>

            <div className="rounded-xl bg-amber-50/80 border border-amber-200 p-4 text-xs text-amber-950 leading-relaxed">
              <strong>Pro Placement Rule:</strong> {lightingResult.preset.dimmerTip}
            </div>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-7 rounded-2xl bg-[#FFFBF7] border border-[#F0E8D8] p-5 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              <div className="rounded-xl bg-white p-3.5 border border-[#F0E8D8]">
                <div className="text-[11px] font-semibold text-[#7A5C3A]">Total Lumens</div>
                <div className="text-lg sm:text-xl font-black text-[#E87A1E] mt-0.5">
                  {lightingResult.totalLumens.toLocaleString()} lm
                </div>
                <div className="text-[10px] text-[#7A5C3A]">{lightingResult.area} sq ft</div>
              </div>

              <div className="rounded-xl bg-white p-3.5 border border-[#F0E8D8]">
                <div className="text-[11px] font-semibold text-[#7A5C3A]">LED Can Grid</div>
                <div className="text-lg sm:text-xl font-black text-[#4A2508] mt-0.5">
                  {lightingResult.totalCans} Cans
                </div>
                <div className="text-[10px] text-[#7A5C3A]">
                  {lightingResult.rows} × {lightingResult.cols} layout (~{lightingResult.lumensPerCan} lm ea)
                </div>
              </div>

              <div className="rounded-xl bg-white p-3.5 border border-[#F0E8D8]">
                <div className="text-[11px] font-semibold text-[#7A5C3A]">Grid Spacing</div>
                <div className="text-lg sm:text-xl font-black text-[#4A2508] mt-0.5">
                  {lightingResult.idealSpacingFt} ft
                </div>
                <div className="text-[10px] text-[#7A5C3A]">
                  {lightingResult.wallOffsetFt} ft off walls
                </div>
              </div>

              <div className="rounded-xl bg-white p-3.5 border border-[#F0E8D8]">
                <div className="text-[11px] font-semibold text-[#7A5C3A]">Pro Retrofit Est.</div>
                <div className="text-base sm:text-lg font-black text-[#4A2508] mt-0.5">
                  ${lightingResult.estLow.toLocaleString()}–${lightingResult.estHigh.toLocaleString()}
                </div>
                <div className="text-[10px] text-[#7A5C3A]">{locationSuffix}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#F0E8D8] text-xs">
              <div className="text-[#5C3314]">
                <strong>Recommended Bulb Spec:</strong> {lightingResult.preset.kelvin} · 90+ CRI · ELV Smart Dimmer
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/tips/${lightingResult.preset.tipSlug}`}
                  className="font-bold text-[#E87A1E] hover:underline"
                >
                  Read Room Guide →
                </Link>
                <Link
                  href="/store/home-lighting-design-guide-usa"
                  className="font-bold text-[#4A2508] hover:text-[#E87A1E] hover:underline"
                >
                  Full Lighting PDF Guide →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: PAINT GALLON & COST CALCULATOR                        */}
      {/* ============================================================ */}
      {activeTab === "painting" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start">
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#4A2508] mb-1">Length (ft)</label>
                <input
                  type="number"
                  min={4}
                  max={60}
                  value={paintLength}
                  onChange={(e) => setPaintLength(Number(e.target.value))}
                  className="w-full rounded-xl border border-[#E5D5C3] bg-[#FFFBF7] px-3 py-2 text-sm font-semibold text-[#4A2508] focus:border-[#E87A1E] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#4A2508] mb-1">Width (ft)</label>
                <input
                  type="number"
                  min={4}
                  max={60}
                  value={paintWidth}
                  onChange={(e) => setPaintWidth(Number(e.target.value))}
                  className="w-full rounded-xl border border-[#E5D5C3] bg-[#FFFBF7] px-3 py-2 text-sm font-semibold text-[#4A2508] focus:border-[#E87A1E] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#4A2508] mb-1">Ceiling (ft)</label>
                <select
                  value={paintHeight}
                  onChange={(e) => setPaintHeight(Number(e.target.value))}
                  className="w-full rounded-xl border border-[#E5D5C3] bg-[#FFFBF7] px-3 py-2 text-sm font-semibold text-[#4A2508] focus:border-[#E87A1E] focus:outline-none"
                >
                  <option value={8}>8 ft</option>
                  <option value={9}>9 ft</option>
                  <option value={10}>10 ft</option>
                  <option value={12}>12 ft</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#4A2508] mb-1">Doors</label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={doors}
                  onChange={(e) => setDoors(Number(e.target.value))}
                  className="w-full rounded-xl border border-[#E5D5C3] bg-[#FFFBF7] px-3 py-2 text-sm font-semibold text-[#4A2508] focus:border-[#E87A1E] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#4A2508] mb-1">Windows</label>
                <input
                  type="number"
                  min={0}
                  max={16}
                  value={windows}
                  onChange={(e) => setWindows(Number(e.target.value))}
                  className="w-full rounded-xl border border-[#E5D5C3] bg-[#FFFBF7] px-3 py-2 text-sm font-semibold text-[#4A2508] focus:border-[#E87A1E] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#4A2508] mb-1">Coats</label>
                <select
                  value={coats}
                  onChange={(e) => setCoats(Number(e.target.value))}
                  className="w-full rounded-xl border border-[#E5D5C3] bg-[#FFFBF7] px-3 py-2 text-sm font-semibold text-[#4A2508] focus:border-[#E87A1E] focus:outline-none"
                >
                  <option value={2}>2 Coats (Recommended)</option>
                  <option value={1}>1 Coat (Refresh)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A2508] mb-1.5">
                US Paint Quality Tier
              </label>
              <select
                value={paintTierId}
                onChange={(e) => setPaintTierId(e.target.value)}
                className="w-full rounded-xl border border-[#E5D5C3] bg-[#FFFBF7] px-3.5 py-2.5 text-xs sm:text-sm font-medium text-[#4A2508] focus:border-[#E87A1E] focus:outline-none"
              >
                {PAINT_TIERS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-2.5 text-xs font-bold text-[#4A2508] cursor-pointer">
              <input
                type="checkbox"
                checked={includeCeiling}
                onChange={(e) => setIncludeCeiling(e.target.checked)}
                className="h-4 w-4 accent-[#E87A1E]"
              />
              <span>Include flat white ceiling paint ({paintLength * paintWidth} sq ft)</span>
            </label>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-7 rounded-2xl bg-[#FFFBF7] border border-[#F0E8D8] p-5 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              <div className="rounded-xl bg-white p-3.5 border border-[#F0E8D8]">
                <div className="text-[11px] font-semibold text-[#7A5C3A]">Wall Paint Needed</div>
                <div className="text-lg sm:text-xl font-black text-[#E87A1E] mt-0.5">
                  {paintingResult.wallGallonsToBuy} Gal
                </div>
                <div className="text-[10px] text-[#7A5C3A]">
                  ({paintingResult.exactWallGallons} gal exact · {paintingResult.netWallSqFt} sq ft)
                </div>
              </div>

              <div className="rounded-xl bg-white p-3.5 border border-[#F0E8D8]">
                <div className="text-[11px] font-semibold text-[#7A5C3A]">Primer / Ceiling</div>
                <div className="text-lg sm:text-xl font-black text-[#4A2508] mt-0.5">
                  {paintingResult.primerGallons} Gal
                </div>
                <div className="text-[10px] text-[#7A5C3A]">
                  {includeCeiling
                    ? `+ ${paintingResult.ceilingGallonsToBuy} gal ceiling`
                    : "If color shifting"}
                </div>
              </div>

              <div className="rounded-xl bg-white p-3.5 border border-[#F0E8D8]">
                <div className="text-[11px] font-semibold text-[#7A5C3A]">DIY Materials Est.</div>
                <div className="text-lg sm:text-xl font-black text-[#4A2508] mt-0.5">
                  ${paintingResult.diyPaintCost}
                </div>
                <div className="text-[10px] text-[#7A5C3A]">Paint + tape/rollers</div>
              </div>

              <div className="rounded-xl bg-white p-3.5 border border-[#F0E8D8]">
                <div className="text-[11px] font-semibold text-[#7A5C3A]">Pro Painter Est.</div>
                <div className="text-base sm:text-lg font-black text-[#4A2508] mt-0.5">
                  ${paintingResult.proLow.toLocaleString()}–${paintingResult.proHigh.toLocaleString()}
                </div>
                <div className="text-[10px] text-[#7A5C3A]">{locationSuffix}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#F0E8D8] text-xs">
              <div className="text-[#5C3314]">
                <strong>Coverage Formula:</strong> 350 sq ft/gal minus 21 sq ft per door &amp; 15 sq ft per window.
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/tips/paint-sheen-finish-guide"
                  className="font-bold text-[#E87A1E] hover:underline"
                >
                  Choose Paint Sheen →
                </Link>
                <Link
                  href="/store/home-painting-guide-usa"
                  className="font-bold text-[#4A2508] hover:text-[#E87A1E] hover:underline"
                >
                  Full Painting PDF Guide →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
