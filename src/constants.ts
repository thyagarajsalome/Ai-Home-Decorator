// src/constants.ts
import type { DesignStyle, RoomType, StyleRegion } from "./types"; // <-- Import StyleRegion

// --- NEW STRUCTURE ---
// ... (keep all your existing style definitions)
const styles: { [key: string]: DesignStyle } = {
  japandi: { id: "japandi", name: "Japandi" },
  wabiSabi: { id: "wabi-sabi", name: "Wabi-Sabi" },
  zen: { id: "zen", name: "Zen" },
  chineseZen: { id: "chinese-zen", name: "Chinese Zen" },
  midCentury: { id: "mid-century-modern", name: "Mid-Century Modern" },
  barbiecore: { id: "barbiecore", name: "Barbiecore" },
  steampunk: { id: "steampunk", name: "Steampunk" },
  artNouveau: { id: "art-nouveau", name: "Art Nouveau" },
  gothicRevival: { id: "gothic-revival", name: "Gothic Revival" },
  artDeco: { id: "art-deco", name: "Art Deco" },
  boho: { id: "boho", name: "Boho" },
  minimalist: { id: "minimalist", name: "Minimalist" },
  industrial: { id: "industrial", name: "Industrial" },
  scandinavian: { id: "scandinavian", name: "Scandinavian" },
  traditional: { id: "traditional", name: "Traditional" },
  coastal: { id: "coastal", name: "Coastal" },
  farmhouse: { id: "farmhouse", name: "Modern Farmhouse" },
};

// ... (keep STYLE_REGIONS)
export const STYLE_REGIONS: StyleRegion[] = [
  // ... all regions
  {
    regionId: "european",
    regionName: "European Styles",
    styles: [
      styles.scandinavian,
      styles.minimalist,
      styles.industrial,
      styles.traditional,
      styles.artDeco,
    ],
  },
  {
    regionId: "american",
    regionName: "American Styles",
    styles: [styles.midCentury, styles.farmhouse, styles.coastal, styles.boho],
  },
  {
    regionId: "asian",
    regionName: "Asian Styles",
    styles: [styles.japandi, styles.wabiSabi, styles.zen, styles.chineseZen],
  },
  {
    regionId: "themed",
    regionName: "Themed & Eclectic",
    styles: [
      styles.barbiecore,
      styles.steampunk,
      styles.artNouveau,
      styles.gothicRevival,
    ],
  },
];

// ... (keep ROOM_TYPES)
export const ROOM_TYPES: RoomType[] = [
  "Living Room",
  "Bedroom",
  "Bathroom",
  "Dining Room",
  "Laundry Room",
  "Kitchen",
  "Other",
];

export const MAX_ROOM_DESCRIPTION_LENGTH = 20;
export const MAX_CUSTOM_PROMPT_LENGTH = 200;

// --- ADD THIS SECTION ---
export const STYLE_GENERATION_COST = 1;
export const CUSTOM_GENERATION_COST = 3; // Or whatever number you want
// --- END ADD ---
