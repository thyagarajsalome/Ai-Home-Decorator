// No need for React import if only using 'string' for icon/image paths
// import React from 'react'; // Remove this line if it's there and not used elsewhere

export interface DesignStyle {
  id: string;
  name: string;
  // If you were using iconName/iconLibrary, you can keep them or remove if not needed for future features.
  // For this update, we'll *add* previewImage, not replace existing properties in types.ts.
  // If you previously replaced 'thumbnail' with 'iconName', you should now add 'previewImage'.
  // Example:
  iconName?: string; // Optional: if you still want to keep icon info
  iconLibrary?: "fa" | "md" | "io5" | "etc" | "gi" | "tb"; // Optional
  previewImage: string; // Add this line for the style preview image
}

// Add these for the room type dropdown
export type RoomType =
  | "Living Room"
  | "Bedroom"
  | "Bathroom"
  | "Dining Room"
  | "Laundry Room"
  | "Kitchen"
  | "Other";
