export interface DesignStyle {
  id: string; //
  name: string; //
  // Optional: Keep icon properties if needed elsewhere, otherwise remove them
  iconName?: string;
  iconLibrary?: "fa" | "md" | "io5" | "etc" | "gi" | "tb";
  // REMOVED previewImage property
}

export type RoomType = //

    | "Living Room" //
    | "Bedroom" //
    | "Bathroom" //
    | "Dining Room" //
    | "Laundry Room" //
    | "Kitchen" //
    | "Other"; //
