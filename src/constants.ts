// src/constants.ts
import type { DesignStyle, RoomType, StyleRegion } from "./types"; // <-- Import StyleRegion

// --- NEW STRUCTURE ---

// First, define all the styles
const styles: { [key: string]: DesignStyle } = {
  japandi: { id: "japandi", name: "Japandi" },
  midCentury: { id: "mid-century-modern", name: "Mid-Century Modern" },
  cyberpunk: { id: "cyberpunk", name: "Cyberpunk" },
  barbiecore: { id: "barbiecore", name: "Barbiecore" },
  artDeco: { id: "art-deco", name: "Art Deco" },
  boho: { id: "boho", name: "Boho" },
  minimalist: { id: "minimalist", name: "Minimalist" },
  industrial: { id: "industrial", name: "Industrial" },
  scandinavian: { id: "scandinavian", name: "Scandinavian" },
  traditional: { id: "traditional", name: "Traditional" },
  coastal: { id: "coastal", name: "Coastal" },
  farmhouse: { id: "farmhouse", name: "Modern Farmhouse" },
};

// Next, group them into regions
export const STYLE_REGIONS: StyleRegion[] = [
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
    styles: [styles.japandi],
  },
  {
    regionId: "themed",
    regionName: "Themed & Eclectic",
    styles: [styles.cyberpunk, styles.barbiecore],
  },
];
// --- END NEW STRUCTURE ---

// The old DESIGN_STYLES array is no longer needed.

// Predefined room types for the dropdown
export const ROOM_TYPES: RoomType[] = [
  //
  "Living Room", //
  "Bedroom", //
  "Bathroom", //
  "Dining Room", //
  "Laundry Room", //
  "Kitchen", //
  "Other", //
];

// Maximum characters for the custom room description input
export const MAX_ROOM_DESCRIPTION_LENGTH = 15; //
