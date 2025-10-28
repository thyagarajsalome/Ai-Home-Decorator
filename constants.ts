import type { DesignStyle, RoomType } from "./types"; //

// You should replace these placeholder previewImage URLs with your own.
export const DESIGN_STYLES: DesignStyle[] = [
  //
  {
    id: "japandi", //
    name: "Japandi", //
    iconName: "IoLeafOutline", //
    iconLibrary: "io5", //
  },
  {
    id: "mid-century-modern", //
    name: "Mid-Century Modern", //
    iconName: "MdOutlineChair", //
    iconLibrary: "md", //
  },
  {
    id: "cyberpunk", //
    name: "Cyberpunk", //
    iconName: "IoHardwareChipOutline", //
    iconLibrary: "io5", //
  },
  {
    id: "barbiecore", //
    name: "Barbiecore", //
    iconName: "FaHeart", //
    iconLibrary: "fa", //
  },
  {
    // --- REPLACED GOTHIC WITH ART DECO ---
    id: "art-deco",
    name: "Art Deco",
  },
  {
    id: "boho", //
    name: "Boho", //
    iconName: "FaFeatherAlt", //
    iconLibrary: "fa", //
  },
  {
    id: "minimalist", //
    name: "Minimalist", //
    iconName: "TbRectangleMinimal", //
    iconLibrary: "tb", //
  },
  {
    id: "industrial", //
    name: "Industrial", //
    iconName: "FaCog", //
    iconLibrary: "fa", //
  },
  {
    id: "scandinavian",
    name: "Scandinavian",
  },
  {
    id: "traditional",
    name: "Traditional",
  },
  {
    id: "coastal",
    name: "Coastal",
  },
  {
    id: "farmhouse",
    name: "Modern Farmhouse",
  },
];

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
