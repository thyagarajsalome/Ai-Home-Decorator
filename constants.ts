import type { DesignStyle, RoomType } from "./types"; // Make sure to import RoomType

export const DESIGN_STYLES: DesignStyle[] = [
  {
    id: "japandi",
    name: "Japandi",
    iconName: "IoLeafOutline", // Keep iconName/iconLibrary if you might use icons elsewhere
    iconLibrary: "io5",
    previewImage:
      "https://images.unsplash.com/photo-1617103995383-9bfa000b5a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzZjQwNzVlYzJjZDkxY2E2NzA3ZTg4ODhhYzk3ZGU4N2Q3YjU5M2UyM2YwOTk3NTkyOTMwMGJhODRiYzA0ZmU4&ixlib=rb-4.0.3&q=80&w=600",
  },
  {
    id: "mid-century-modern",
    name: "Mid-Century Modern",
    iconName: "MdOutlineChair",
    iconLibrary: "md",
    previewImage:
      "https://images.unsplash.com/photo-1593817454217-0f89fae1d5ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzZjQwNzVlYzJjZDkxY2E2NzA3ZTg4ODhhYzk3ZGU4N2Q3YjU5M2UyM2YwOTk3NTkyOTMwMGJhODRiYzA0ZmU4&ixlib=rb-4.0.3&q=80&w=600",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    iconName: "IoHardwareChipOutline",
    iconLibrary: "io5",
    previewImage:
      "https://images.unsplash.com/photo-1581898975010-14469559548a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzZjQwNzVlYzJjZDkxY2E2NzA3ZTg4ODhhYzk3ZGU4N2Q3YjU5M2UyM2YwOTk3NTkyOTMwMGJhODRiYzA0ZmU4&ixlib=rb-4.0.3&q=80&w=600",
  },
  {
    id: "barbiecore",
    name: "Barbiecore",
    iconName: "FaHeart",
    iconLibrary: "fa",
    previewImage:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzZjQwNzVlYzJjZDkxY2E2NzA3ZTg4ODhhYzk3ZGU4N2Q3YjU5M2UyM2YwOTk3NTkyOTMwMGJhODRiYzA0ZmU4&ixlib=rb-4.0.3&q=80&w=600",
  },
  {
    id: "gothic",
    name: "Gothic Sanctuary",
    iconName: "GiBatwingEmblem",
    iconLibrary: "gi",
    previewImage:
      "https://images.unsplash.com/photo-1604578762241-c1fc0aa1c67d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzZjQwNzVlYzJjZDkxY2E2NzA3ZTg4ODhhYzk3ZGU4N2Q3YjU5M2UyM2YwOTk3NTkyOTMwMGJhODRiYzA0ZmU4&ixlib=rb-4.0.3&q=80&w=600",
  },
  {
    id: "boho",
    name: "Boho",
    iconName: "FaFeatherAlt",
    iconLibrary: "fa",
    previewImage:
      "https://images.unsplash.com/photo-1598928640031-30043513ddc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzZjQwNzVlYzJjZDkxY2E2NzA3ZTg4ODhhYzk3ZGU4N2Q3YjU9M2UyM2YwOTk3NTkyOTMwMGJhODRiYzA0ZmU4&ixlib=rb-4.0.3&q=80&w=600",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    iconName: "TbRectangleMinimal",
    iconLibrary: "tb",
    previewImage:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzZjQwNzVlYzJjZDkxY2E2NzA3ZTg4ODhhYzk3ZGU4N2Q3YjU5M2UyM2YwOTk3NTkyOTMwMGJhODRiYzA0ZmU4&ixlib=rb-4.0.3&q=80&w=600",
  },
  {
    id: "industrial",
    name: "Industrial",
    iconName: "FaCog",
    iconLibrary: "fa",
    previewImage:
      "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzZjQwNzVlYzJjZDkxY2E2NzA3ZTg4ODhhYzk3ZGU4N2Q3YjU5M2UyM2YwOTk3NTkyOTMwMGJhODRiYzA0ZmU4&ixlib=rb-4.0.3&q=80&w=600",
  },
  // Add more styles here, ensuring each has a unique id, name, and a previewImage URL
];

// Predefined room types for the dropdown
export const ROOM_TYPES: RoomType[] = [
  //
  "Living Room",
  "Bedroom",
  "Bathroom",
  "Dining Room",
  "Laundry Room",
  "Kitchen",
  "Other", // Keep 'Other' at the end
];

// Maximum characters for the custom room description input
export const MAX_ROOM_DESCRIPTION_LENGTH = 15;
