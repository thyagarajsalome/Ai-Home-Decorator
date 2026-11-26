// Regional US homeowner cost multipliers, climate notes, and curated tip links

export interface StateCostProfile {
  multiplier: number;
  tierLabel: string;
  climateZoneNote: string;
  remodelEstimates: {
    project: string;
    scope: string;
    lowUsd: number;
    highUsd: number;
  }[];
  recommendedTips: {
    slug: string;
    title: string;
    category: "lighting" | "painting";
  }[];
}

const HIGH_COST_STATES = new Set(["ca", "ny", "ma", "wa", "dc", "hi"]);
const ABOVE_AVG_STATES = new Set(["nj", "ct", "co", "or", "ak", "md", "va", "nh"]);
const BALANCED_STATES = new Set(["il", "fl", "tx", "az", "nv", "nc", "ga", "mn", "ut", "pa"]);

const COASTAL_HUMID_STATES = new Set(["fl", "hi", "la", "sc", "nc", "ga", "al", "ms"]);
const DESERT_SUN_STATES = new Set(["az", "nv", "nm", "ut"]);
const COLD_NORTH_STATES = new Set(["ny", "il", "ma", "wa", "or", "co", "mn", "mi", "wi", "oh", "pa", "nj", "ct", "me", "vt", "nh", "id", "mt"]);

function roundTo25(val: number): number {
  return Math.round(val / 25) * 25;
}

export function getStateCostProfile(stateCode: string, cityName?: string): StateCostProfile {
  const st = (stateCode || "").toLowerCase();
  const label = cityName || stateCode.toUpperCase();

  let multiplier = 0.92;
  let tierLabel = "Value-Friendly Market (~8% below US avg)";

  if (HIGH_COST_STATES.has(st)) {
    multiplier = 1.28;
    tierLabel = "High-Cost Metro Market (+28% vs. US avg)";
  } else if (ABOVE_AVG_STATES.has(st)) {
    multiplier = 1.15;
    tierLabel = "Above-Average Market (+15% vs. US avg)";
  } else if (BALANCED_STATES.has(st)) {
    multiplier = 1.02;
    tierLabel = "Balanced Metro Market (Near US avg)";
  }

  let climateZoneNote =
    `Use 2700K-3000K high-CRI (90+) dimmable LEDs and washable eggshell or satin interior paints suited for ${label}'s year-round indoor comfort.`;
  let recommendedTips: StateCostProfile["recommendedTips"] = [
    { slug: "layered-lighting-design", title: "Layered Lighting Design: Ambient, Task & Accent", category: "lighting" },
    { slug: "paint-sheen-finish-guide", title: "Interior Paint Sheen Guide: Matte vs. Eggshell vs. Satin", category: "painting" },
    { slug: "neutral-paint-whole-house", title: "Whole-House Neutral Paint Palette Flow", category: "painting" },
  ];

  if (COASTAL_HUMID_STATES.has(st)) {
    climateZoneNote =
      `High coastal humidity and strong UV exposure in ${label} make mildewcide-enhanced satin/semi-gloss bath paints, 100% acrylic UV-stable exterior coatings, and wet-rated outdoor LED fixtures essential.`;
    recommendedTips = [
      { slug: "bathroom-paint-moisture-resistant", title: "Best Moisture-Resistant Paints for Humid Bathrooms", category: "painting" },
      { slug: "exterior-house-paint-colors", title: "UV-Resistant Exterior Paint Colors & Prep", category: "painting" },
      { slug: "outdoor-patio-lighting", title: "Coastal & Patio Outdoor Lighting Design", category: "lighting" },
    ];
  } else if (DESERT_SUN_STATES.has(st)) {
    climateZoneNote =
      `Intense high-altitude UV rays in ${label} wash out cool grays and chalk inferior exterior paint; choose warm LRV 55-70 desert neutrals, low-glare 3000K recessed trims, and shielded landscape uplighting.`;
    recommendedTips = [
      { slug: "exterior-house-paint-colors", title: "Heat & Sun-Resistant Exterior House Paint", category: "painting" },
      { slug: "landscape-lighting-design", title: "Desert Yard & Architectural Landscape Lighting", category: "lighting" },
      { slug: "smart-home-lighting-automation", title: "Smart Lighting Schedules & Automated Dimmers", category: "lighting" },
    ];
  } else if (COLD_NORTH_STATES.has(st)) {
    climateZoneNote =
      `Shorter winter daylight hours in ${label} reward warm 2700K-3000K layered lighting with high-LRV warm white walls, plus planning exterior paint projects strictly within 50°F+ dry weather windows.`;
    recommendedTips = [
      { slug: "led-color-temperature-guide", title: "2700K vs 3000K LED Color Temperature Guide", category: "lighting" },
      { slug: "dark-paint-small-rooms", title: "Using Rich or Cozy Paint Tones in Low-Light Rooms", category: "painting" },
      { slug: "recessed-lighting-spacing", title: "Recessed Lighting Spacing & Ceiling Grid Formula", category: "lighting" },
    ];
  } else if (st === "ca") {
    climateZoneNote =
      `California Title 24 energy rules require high-efficacy 90+ CRI LED lighting with dimming/occupancy controls, alongside ultra-low-VOC (<50 g/L) interior paints in ${label}.`;
    recommendedTips = [
      { slug: "recessed-lighting-spacing", title: "Title 24 Compliant Recessed LED Spacing Guide", category: "lighting" },
      { slug: "nursery-safe-paint-guide", title: "Zero-VOC & Low-VOC Interior Paint Safety Guide", category: "painting" },
      { slug: "kitchen-lighting-layout", title: "Open-Concept Kitchen Lighting & Pendant Heights", category: "lighting" },
    ];
  }

  const remodelEstimates = [
    {
      project: "Pro Interior Room Paint",
      scope: "12×14 ft room, walls + trim (2 coats, pro labor)",
      lowUsd: roundTo25(550 * multiplier),
      highUsd: roundTo25(1050 * multiplier),
    },
    {
      project: "Recessed LED Can Retrofit",
      scope: "6 wafer/gimbal 90+ CRI cans + smart dimmer switch",
      lowUsd: roundTo25(900 * multiplier),
      highUsd: roundTo25(1750 * multiplier),
    },
    {
      project: "Kitchen Lighting & Under-Cabinet",
      scope: "Island pendants + continuous LED tape channels",
      lowUsd: roundTo25(1100 * multiplier),
      highUsd: roundTo25(2400 * multiplier),
    },
    {
      project: "Cabinet Painting & Hardware Refresh",
      scope: "Avg. US kitchen cabinets, degreaser + urethane enamel",
      lowUsd: roundTo25(2200 * multiplier),
      highUsd: roundTo25(4800 * multiplier),
    },
  ];

  return {
    multiplier,
    tierLabel,
    climateZoneNote,
    remodelEstimates,
    recommendedTips,
  };
}
