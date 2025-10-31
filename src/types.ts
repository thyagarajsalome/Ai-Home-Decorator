// src/types.ts
export interface DesignStyle {
  id: string; //
  name: string; //
  // Optional: Keep icon properties if needed elsewhere, otherwise remove them
  iconName?: string;
  iconLibrary?: "fa" | "md" | "io5" | "etc" | "gi" | "tb";
  // REMOVED previewImage property
}

// --- ADDED ---
/** Represents a category of design styles */
export interface StyleRegion {
  regionId: string;
  regionName: string;
  styles: DesignStyle[];
}
// --- END ADDED ---

export type RoomType = //

    | "Living Room" //
    | "Bedroom" //
    | "Bathroom" //
    | "Dining Room" //
    | "Laundry Room" //
    | "Kitchen" //
    | "Other"; //
