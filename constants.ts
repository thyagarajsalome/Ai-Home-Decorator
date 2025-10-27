import type { DesignStyle, RoomType } from "./types"; //

export const DESIGN_STYLES: DesignStyle[] = [
  //
  {
    id: "japandi", //
    name: "Japandi", //
    iconName: "IoLeafOutline", //
    iconLibrary: "io5", //
    // Removed previewImage
  },
  {
    id: "mid-century-modern", //
    name: "Mid-Century Modern", //
    iconName: "MdOutlineChair", //
    iconLibrary: "md", //
    // Removed previewImage
  },
  {
    id: "cyberpunk", //
    name: "Cyberpunk", //
    iconName: "IoHardwareChipOutline", //
    iconLibrary: "io5", //
    // Removed previewImage
  },
  // ... continue removing the previewImage line for ALL other style objects ...
  {
    id: "maximalist", //
    name: "Maximalist", //
    // Removed previewImage
  },
];

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

export const MAX_ROOM_DESCRIPTION_LENGTH = 15; //
