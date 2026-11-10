// ============================================================
// SEO Programmatic Pages — Master Data Layer
// All room × style combinations, style guides, color pages
// ============================================================

export interface RoomData {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export interface StyleData {
  slug: string;
  name: string;
  tagline: string;
  origin: string;
  description: string;
  palette: { name: string; hex: string }[];
  characteristics: string[];
  bestRooms: string[];
  keyFurniture: string[];
  dos: string[];
  donts: string[];
  thumbnail: string;
  images: { src: string; alt: string }[];
}

export interface RoomStyleContent {
  h1: string;
  intro: string;
  tips: string[];
  palette: { name: string; hex: string }[];
  materials: string[];
  furniturePieces: string[];
  cta: string;
  faqs: { q: string; a: string }[];
}

// ============================================================
// ROOMS
// ============================================================
export const ROOMS: RoomData[] = [
  {
    slug: "living-room",
    name: "Living Room",
    description: "The heart of the home — where family gathers and guests are welcomed.",
    icon: "🛋️",
  },
  {
    slug: "bedroom",
    name: "Bedroom",
    description: "Your personal sanctuary for rest, relaxation and self-expression.",
    icon: "🛏️",
  },
  {
    slug: "kitchen",
    name: "Kitchen",
    description: "Where meals are made and memories are created — style meets function.",
    icon: "🍳",
  },
  {
    slug: "bathroom",
    name: "Bathroom",
    description: "A spa-like retreat or sleek functional space — design sets the mood.",
    icon: "🚿",
  },
  {
    slug: "home-office",
    name: "Home Office",
    description: "A focused, inspiring workspace that boosts creativity and productivity.",
    icon: "💼",
  },
  {
    slug: "dining-room",
    name: "Dining Room",
    description: "Where dinner conversations happen — ambiance is everything.",
    icon: "🍽️",
  },
  {
    slug: "outdoor-patio",
    name: "Outdoor Patio",
    description: "Extend your living space outdoors with style and comfort.",
    icon: "🌿",
  },
  {
    slug: "kids-room",
    name: "Kids Room",
    description: "Playful, safe, and imaginative spaces where little ones thrive.",
    icon: "🎨",
  },
];

// ============================================================
// STYLES
// ============================================================
export const STYLES: StyleData[] = [
  {
    slug: "japandi",
    name: "Japandi",
    tagline: "The calm harmony of Japanese minimalism meets Scandinavian coziness.",
    origin: "Japandi blends Japanese wabi-sabi philosophy with Scandinavian hygge principles.",
    description:
      "Japandi is a design fusion that merges the precision of Japanese minimalism with the warmth of Scandinavian design. The result is a serene, clutter-free space that feels both intentional and cozy.",
    palette: [
      { name: "Warm White", hex: "#F5F0E8" },
      { name: "Ash Wood", hex: "#C4A882" },
      { name: "Charcoal", hex: "#3D3D3D" },
      { name: "Sage", hex: "#8FA88A" },
      { name: "Warm Black", hex: "#1A1A1A" },
    ],
    characteristics: [
      "Neutral, earthy color palette",
      "Natural materials: wood, linen, bamboo",
      "Minimal clutter — every item has purpose",
      "Low-profile furniture with clean lines",
      "Handcrafted, imperfect textures (wabi-sabi)",
      "Soft, diffused natural lighting",
    ],
    bestRooms: ["Living Room", "Bedroom", "Home Office", "Bathroom"],
    keyFurniture: [
      "Low platform bed or sofa",
      "Solid wood coffee table",
      "Linen upholstered chairs",
      "Minimalist shelving",
      "Handmade ceramic vessels",
    ],
    dos: [
      "Use natural materials like solid wood, bamboo, and stone",
      "Keep surfaces clear and uncluttered",
      "Layer neutral textures for warmth",
      "Choose handmade or artisan decor over mass-produced",
    ],
    donts: [
      "Avoid bright, saturated colors",
      "Don't use ornate or decorative furniture legs",
      "Avoid plastic or synthetic materials",
      "Don't overcrowd shelves with accessories",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
        alt: "Japandi living room with low sofa and wooden accents",
      },
      {
        src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
        alt: "Japandi bedroom with neutral linen bedding",
      },
      {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        alt: "Japandi home office with minimal desk setup",
      },
    ],
  },
  {
    slug: "scandinavian",
    name: "Scandinavian",
    tagline: "Light, functional and hygge — the Nordic way of beautiful living.",
    origin: "Rooted in Nordic countries' design philosophy of simplicity and functionality.",
    description:
      "Scandinavian design champions simplicity, functionality, and connection to nature. Bright whites, pale woods, and cozy textiles define this timeless style that makes any space feel larger and airier.",
    palette: [
      { name: "Arctic White", hex: "#F8F8F8" },
      { name: "Birch Wood", hex: "#D4B896" },
      { name: "Slate Blue", hex: "#7B9BB5" },
      { name: "Soft Gray", hex: "#BEBEBE" },
      { name: "Forest Green", hex: "#4A6741" },
    ],
    characteristics: [
      "Bright, airy white walls and ceilings",
      "Pale birch or pine wood furniture",
      "Cozy textiles: wool throws, sheepskin rugs",
      "Functional furniture with clean silhouettes",
      "Abundant natural light",
      "Simple geometric shapes in decor",
    ],
    bestRooms: ["Living Room", "Bedroom", "Kitchen", "Dining Room"],
    keyFurniture: [
      "Light wood dining table",
      "Scandinavian accent chair (like Wegner Shell)",
      "Minimal media console",
      "Pendant woven rattan lighting",
      "Wool area rug in natural tones",
    ],
    dos: [
      "Maximize natural light with sheer curtains",
      "Mix white walls with warm wood tones",
      "Layer cozy textiles for hygge comfort",
      "Choose furniture with tapered wood legs",
    ],
    donts: [
      "Avoid dark, heavy drapes that block light",
      "Don't use ornate or baroque furniture",
      "Avoid overly bold or clashing colors",
      "Don't over-decorate — keep it curated",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        src: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
        alt: "Scandinavian living room with white walls and birch furniture",
      },
      {
        src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
        alt: "Scandinavian bedroom with layered linen and cozy textiles",
      },
      {
        src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
        alt: "Scandinavian kitchen with pale wood cabinets",
      },
    ],
  },
  {
    slug: "modern-farmhouse",
    name: "Modern Farmhouse",
    tagline: "Rustic warmth meets contemporary clean lines — American comfort at its best.",
    origin: "Born from American rural tradition reimagined for modern suburban living.",
    description:
      "Modern Farmhouse blends the warmth of classic American farmhouse aesthetics with the clean, uncluttered sensibility of modern design. Think shiplap walls, barn doors, and cozy neutrals.",
    palette: [
      { name: "Crisp White", hex: "#FFFFFF" },
      { name: "Warm Beige", hex: "#E8DCC8" },
      { name: "Barn Red", hex: "#8B2323" },
      { name: "Weathered Gray", hex: "#9B9B9B" },
      { name: "Black Matte", hex: "#2B2B2B" },
    ],
    characteristics: [
      "White shiplap or board-and-batten walls",
      "Sliding barn doors",
      "Exposed wood beams on ceilings",
      "Matte black fixtures and hardware",
      "Open shelving in kitchen",
      "Mix of old and new — antiques meet modern",
    ],
    bestRooms: ["Kitchen", "Living Room", "Dining Room", "Bathroom"],
    keyFurniture: [
      "Farmhouse dining table with bench",
      "Slipcovered sofa in white or cream",
      "Reclaimed wood coffee table",
      "Barn door pantry or wardrobe",
      "Windsor or ladder-back chairs",
    ],
    dos: [
      "Mix raw textures: linen, burlap, wood, metal",
      "Use matte black for fixtures and hardware",
      "Add vintage or antique accents",
      "Keep palette warm and neutral",
    ],
    donts: [
      "Avoid high-gloss or lacquered finishes",
      "Don't mix too many wood tones",
      "Avoid overly sleek, tech-forward furniture",
      "Don't skip the cozy textiles — it's essential",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        src: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
        alt: "Modern farmhouse living room with shiplap and barn door",
      },
      {
        src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
        alt: "Modern farmhouse kitchen with open shelving and matte black fixtures",
      },
      {
        src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
        alt: "Modern farmhouse bedroom with white shiplap walls",
      },
    ],
  },
  {
    slug: "bohemian",
    name: "Bohemian",
    tagline: "Free-spirited, colorful and layered — a world of collected treasures.",
    origin: "Inspired by the bohemian artistic lifestyle of the 19th century, global textiles and wanderlust.",
    description:
      "Bohemian style is an eclectic mix of colors, patterns, and textures from around the world. It celebrates individuality, creativity, and a love of travel — every item tells a story.",
    palette: [
      { name: "Terracotta", hex: "#C4622D" },
      { name: "Jewel Teal", hex: "#2D7D6E" },
      { name: "Warm Gold", hex: "#D4A843" },
      { name: "Deep Plum", hex: "#6B2D6B" },
      { name: "Cream", hex: "#F5ECD7" },
    ],
    characteristics: [
      "Layered rugs and colorful textiles",
      "Rattan, wicker, and natural fiber furniture",
      "Macrame wall hangings",
      "Gallery walls of eclectic art",
      "Abundant indoor plants",
      "Mix of vintage and global finds",
    ],
    bestRooms: ["Living Room", "Bedroom", "Outdoor Patio", "Kids Room"],
    keyFurniture: [
      "Rattan peacock or papasan chair",
      "Floor cushion seating",
      "Patterned ottoman",
      "Low Moroccan-style coffee table",
      "Woven hammock or hanging chair",
    ],
    dos: [
      "Layer multiple rugs and textiles",
      "Mix patterns boldly — stripes, florals, ikats",
      "Bring in lots of plants and greenery",
      "Display collected objects from travel",
    ],
    donts: [
      "Don't be afraid of color — commit to it",
      "Avoid sterile or overly matching sets",
      "Don't leave walls bare — gallery them",
      "Avoid synthetic or plastic materials",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        alt: "Bohemian living room with layered rugs and rattan furniture",
      },
      {
        src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
        alt: "Bohemian bedroom with colorful textiles and macrame",
      },
      {
        src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
        alt: "Boho patio with outdoor plants and woven decor",
      },
    ],
  },
  {
    slug: "minimalist",
    name: "Minimalist",
    tagline: "Less is more — intentional, calm and beautifully stripped back.",
    origin: "Rooted in Bauhaus and Japanese minimalism philosophies of the 20th century.",
    description:
      "Minimalist design is about intentionality — keeping only what is essential and beautiful. Every element earns its place. The result is a calm, focused space that feels expansive and serene.",
    palette: [
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Light Gray", hex: "#E0E0E0" },
      { name: "Warm Concrete", hex: "#C8C0B8" },
      { name: "Matte Black", hex: "#1C1C1C" },
      { name: "Natural Wood", hex: "#B8956A" },
    ],
    characteristics: [
      "Monochromatic or near-neutral palette",
      "No unnecessary decoration",
      "Concealed storage everywhere",
      "Clean horizontal and vertical lines",
      "One or two statement pieces",
      "Uncluttered surfaces",
    ],
    bestRooms: ["Bedroom", "Home Office", "Bathroom", "Living Room"],
    keyFurniture: [
      "Platform bed with hidden storage",
      "Floating wall shelves",
      "Built-in wardrobe or closet",
      "Single sculpted accent chair",
      "Glass or stone side table",
    ],
    dos: [
      "Invest in quality over quantity",
      "Use concealed storage to eliminate clutter",
      "Choose one bold architectural element",
      "Let negative space breathe",
    ],
    donts: [
      "Don't add decor just to fill space",
      "Avoid busy patterns or busy wallpaper",
      "Don't mix too many wood tones",
      "Avoid open shelving that attracts clutter",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
        alt: "Minimalist bedroom with white walls and clean lines",
      },
      {
        src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
        alt: "Minimalist living room with single accent chair",
      },
      {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        alt: "Minimalist home office with floating desk",
      },
    ],
  },
  {
    slug: "industrial",
    name: "Industrial",
    tagline: "Raw, edgy and unapologetically urban — where form follows factory.",
    origin: "Emerged from repurposed New York loft apartments and warehouses in the 1990s.",
    description:
      "Industrial design celebrates the raw, unfinished beauty of factories and warehouses. Exposed brick, steel beams, concrete floors and Edison bulbs give this style its unmistakable character.",
    palette: [
      { name: "Raw Concrete", hex: "#A0998A" },
      { name: "Rust Orange", hex: "#B5451B" },
      { name: "Steel Gray", hex: "#6B6B6B" },
      { name: "Aged Leather", hex: "#7B4F2E" },
      { name: "Matte Black", hex: "#1A1A1A" },
    ],
    characteristics: [
      "Exposed brick walls",
      "Visible metal pipes and ductwork",
      "Concrete floors or countertops",
      "Edison bulb or industrial pendant lighting",
      "Reclaimed wood accents",
      "Open loft-style floor plans",
    ],
    bestRooms: ["Living Room", "Home Office", "Kitchen", "Dining Room"],
    keyFurniture: [
      "Metal and wood dining table",
      "Leather Chesterfield sofa",
      "Factory-style bar stools",
      "Pipe shelving system",
      "Welded steel bookcase",
    ],
    dos: [
      "Let architectural raw elements shine",
      "Mix aged leather with reclaimed wood",
      "Use Edison bulbs and metal pendant lights",
      "Celebrate imperfection — weathered is beautiful",
    ],
    donts: [
      "Avoid soft pastels or floral patterns",
      "Don't hide structural elements",
      "Avoid too much color — keep it raw",
      "Don't use ornate or Victorian furniture",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        alt: "Industrial living room with exposed brick and Edison lights",
      },
      {
        src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        alt: "Industrial home office with pipe shelving and concrete desk",
      },
      {
        src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
        alt: "Industrial kitchen with metal bar stools and open shelving",
      },
    ],
  },
  {
    slug: "coastal",
    name: "Coastal",
    tagline: "Breezy, light and timeless — bring the beach home.",
    origin: "Inspired by beach cottages along the Atlantic and Pacific coasts of America.",
    description:
      "Coastal design captures the relaxed, airy spirit of beachside living. Blue-green hues, natural textures, and abundant light create a serene retreat that feels like a permanent vacation.",
    palette: [
      { name: "Ocean Blue", hex: "#4A90B8" },
      { name: "Sandy Beige", hex: "#E8D5A3" },
      { name: "Seafoam", hex: "#7EC8C8" },
      { name: "Driftwood", hex: "#A89070" },
      { name: "Crisp White", hex: "#F8F8F8" },
    ],
    characteristics: [
      "Blue, white, and sandy neutrals",
      "Natural textures: jute, sisal, rope",
      "Weathered or whitewashed wood furniture",
      "Sheer linen curtains for breezy light",
      "Nautical and sea-life accents",
      "Open, airy floor plan",
    ],
    bestRooms: ["Living Room", "Bedroom", "Bathroom", "Outdoor Patio"],
    keyFurniture: [
      "Whitewashed rattan armchair",
      "Driftwood-effect coffee table",
      "Linen-upholstered sofa in white or blue",
      "Jute or sisal area rug",
      "Wicker storage baskets",
    ],
    dos: [
      "Use white and blue as your base palette",
      "Incorporate natural rope, sisal and jute textures",
      "Hang sheer curtains to maximize breezy light",
      "Display sea glass, shells and driftwood",
    ],
    donts: [
      "Avoid dark, heavy drapes",
      "Don't go too literal with anchor/nautical clichés",
      "Avoid overly polished or lacquered furniture",
      "Don't use heavy, ornate furniture",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        alt: "Coastal living room with blue and white palette",
      },
      {
        src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
        alt: "Coastal bedroom with linen bedding and sea glass accents",
      },
      {
        src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
        alt: "Coastal bathroom with driftwood mirror and sea-toned tiles",
      },
    ],
  },
  {
    slug: "mid-century-modern",
    name: "Mid-Century Modern",
    tagline: "1950s optimism meets timeless design — elegant and eternally cool.",
    origin: "Defined by post-WWII American designers like Eames, Saarinen, and Wegner.",
    description:
      "Mid-Century Modern combines organic curves with functional minimalism. Walnut wood, tapered legs, bold accent colors and iconic furniture pieces define a style that has never gone out of fashion.",
    palette: [
      { name: "Warm Walnut", hex: "#7B5230" },
      { name: "Avocado Green", hex: "#7A8C4A" },
      { name: "Mustard Yellow", hex: "#D4A843" },
      { name: "Burnt Orange", hex: "#C4622D" },
      { name: "Cream White", hex: "#F5ECD7" },
    ],
    characteristics: [
      "Organic curves and geometric shapes",
      "Tapered wood legs on all furniture",
      "Walnut and teak wood finishes",
      "Bold accent colors on a neutral base",
      "Floor-to-ceiling windows when possible",
      "Abstract art and sculptural accents",
    ],
    bestRooms: ["Living Room", "Dining Room", "Home Office", "Bedroom"],
    keyFurniture: [
      "Eames-style lounge chair and ottoman",
      "Walnut credenza or sideboard",
      "Tulip or Saarinen-style dining table",
      "Platform sofa with low profile",
      "Arc floor lamp",
    ],
    dos: [
      "Let iconic furniture be the focal point",
      "Mix organic shapes with straight lines",
      "Use bold accent colors sparingly",
      "Keep the ceiling clear — no dropped ceilings",
    ],
    donts: [
      "Avoid ornate or baroque detailing",
      "Don't use heavy, overstuffed furniture",
      "Avoid matching furniture sets — mix pieces",
      "Don't cover windows — natural light is key",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        src: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        alt: "Mid-century modern living room with walnut credenza and Eames chair",
      },
      {
        src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
        alt: "Mid-century modern dining room with tulip table",
      },
      {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        alt: "Mid-century modern home office with walnut desk",
      },
    ],
  },
  {
    slug: "mediterranean",
    name: "Mediterranean",
    tagline: "Sun-soaked warmth of Italy, Greece and Spain brought indoors.",
    origin: "Inspired by the coastal homes of Southern Europe — terracotta, stucco and olive groves.",
    description:
      "Mediterranean design evokes the warm, relaxed luxury of Southern European villas. Terracotta tiles, whitewashed stucco, wrought iron, and rich earthy tones create a timeless, sun-drenched atmosphere.",
    palette: [
      { name: "Terracotta", hex: "#C4622D" },
      { name: "Azure Blue", hex: "#2D5FA6" },
      { name: "Olive Green", hex: "#5D6B2A" },
      { name: "Sandy Cream", hex: "#E8D5A3" },
      { name: "Warm White", hex: "#F5F0E8" },
    ],
    characteristics: [
      "Terracotta and hand-painted ceramic tiles",
      "Whitewashed or stucco walls",
      "Wrought iron fixtures and railings",
      "Exposed ceiling beams",
      "Arched doorways and windows",
      "Abundant plants: olive, bougainvillea, lavender",
    ],
    bestRooms: ["Kitchen", "Bathroom", "Living Room", "Outdoor Patio"],
    keyFurniture: [
      "Wrought iron dining set",
      "Hand-painted ceramic tile side table",
      "Rattan or cane-back chairs",
      "Stone or tile-topped coffee table",
      "Linen-draped daybed",
    ],
    dos: [
      "Use terracotta, blue, and white as a foundation",
      "Install arched details wherever possible",
      "Add abundant plants and herbs",
      "Use hand-painted or hand-crafted tiles",
    ],
    donts: [
      "Avoid cold, gray industrial materials",
      "Don't use sleek or modern chrome fixtures",
      "Avoid overly matchy matching",
      "Don't skip the plants — greenery is essential",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        src: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
        alt: "Mediterranean living room with arched doorway and terracotta tiles",
      },
      {
        src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
        alt: "Mediterranean kitchen with hand-painted tile backsplash",
      },
      {
        src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
        alt: "Mediterranean bathroom with terracotta floor and stucco walls",
      },
    ],
  },
  {
    slug: "rustic",
    name: "Rustic",
    tagline: "Raw nature brought indoors — timber, stone, and earthy warmth.",
    origin: "Rooted in American mountain cabin and European country cottage traditions.",
    description:
      "Rustic design celebrates the natural beauty of raw, imperfect materials. Rough-hewn wood, stone, and earthy tones create a grounded, cozy space that feels timeless and deeply connected to nature.",
    palette: [
      { name: "Bark Brown", hex: "#5C3D1E" },
      { name: "Stone Gray", hex: "#8C8070" },
      { name: "Moss Green", hex: "#4A6741" },
      { name: "Cream White", hex: "#F0E8D8" },
      { name: "Deep Red", hex: "#8B2323" },
    ],
    characteristics: [
      "Rough-hewn or reclaimed timber",
      "Natural stone fireplace or accent wall",
      "Hand-woven rugs and cozy throws",
      "Antler, leather, and iron accents",
      "Warm, amber lighting",
      "Organic asymmetry in shapes",
    ],
    bestRooms: ["Living Room", "Bedroom", "Kitchen", "Dining Room"],
    keyFurniture: [
      "Log or live-edge dining table",
      "Leather or plaid upholstered sofa",
      "Stone-topped coffee table",
      "Antique wood trunk as storage",
      "Cast iron or wrought iron accents",
    ],
    dos: [
      "Use reclaimed and salvaged materials",
      "Layer natural textures — wood, stone, leather",
      "Add a stone or brick fireplace as focal point",
      "Use warm amber and candle-like lighting",
    ],
    donts: [
      "Avoid shiny or polished surfaces",
      "Don't use sleek modern furniture",
      "Avoid cold blues or grays",
      "Don't over-decorate — keep it organic",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        src: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
        alt: "Rustic living room with stone fireplace and reclaimed wood beams",
      },
      {
        src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
        alt: "Rustic bedroom with log headboard and plaid textiles",
      },
      {
        src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
        alt: "Rustic kitchen with farmhouse sink and open wood shelving",
      },
    ],
  },
  {
    slug: "contemporary",
    name: "Contemporary",
    tagline: "Current, evolving and architecturally bold — design of the moment.",
    origin: "Contemporary design reflects current trends — it evolves continuously with the times.",
    description:
      "Contemporary design is fluid and ever-changing, incorporating the best of current design trends. It favors bold architectural lines, mixed materials, and curated art to create sophisticated, forward-thinking interiors.",
    palette: [
      { name: "Warm Gray", hex: "#8C8C8C" },
      { name: "Warm White", hex: "#F5F0E8" },
      { name: "Walnut", hex: "#7B5230" },
      { name: "Slate", hex: "#708090" },
      { name: "Accent Teal", hex: "#2D7D6E" },
    ],
    characteristics: [
      "Bold architectural forms",
      "Mixed materials: glass, steel, wood, stone",
      "Neutral base with curated bold accents",
      "Open concept floor plans",
      "Statement art pieces",
      "Innovative lighting fixtures",
    ],
    bestRooms: ["Living Room", "Kitchen", "Home Office", "Dining Room"],
    keyFurniture: [
      "Curved or sculptural sofa",
      "Statement dining chair",
      "Waterfall countertop kitchen island",
      "Floating media unit",
      "Oversized abstract art piece",
    ],
    dos: [
      "Mix materials deliberately — steel with wood, glass with stone",
      "Invest in one statement lighting fixture",
      "Choose bold, curated art over generic prints",
      "Keep the floor plan open and flowing",
    ],
    donts: [
      "Avoid matching furniture sets",
      "Don't ignore texture contrast",
      "Avoid overly trendy pieces that date quickly",
      "Don't block natural light",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        alt: "Contemporary living room with sculptural sofa and bold art",
      },
      {
        src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
        alt: "Contemporary kitchen with waterfall island and mixed materials",
      },
      {
        src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
        alt: "Contemporary dining room with statement chandelier",
      },
    ],
  },
  {
    slug: "art-deco",
    name: "Art Deco",
    tagline: "Glamorous geometry and golden luxury — the roaring twenties reimagined.",
    origin: "Originated in 1920s Paris and New York — the golden age of Hollywood glamour.",
    description:
      "Art Deco is synonymous with glamour, luxury, and geometric precision. Gold, marble, velvet, and bold symmetrical patterns define a style that feels both theatrical and sophisticated.",
    palette: [
      { name: "Deep Navy", hex: "#1A2744" },
      { name: "Gold", hex: "#D4AF37" },
      { name: "Emerald", hex: "#2D6B4A" },
      { name: "Cream Ivory", hex: "#F5ECD7" },
      { name: "Warm Black", hex: "#1A1A1A" },
    ],
    characteristics: [
      "Bold geometric patterns and symmetry",
      "Gold, brass, and chrome metallic accents",
      "Rich velvet, silk, and lacquered finishes",
      "Fan and sunburst motifs",
      "Mirrored furniture and surfaces",
      "Dramatic, statement lighting",
    ],
    bestRooms: ["Living Room", "Bedroom", "Dining Room", "Bathroom"],
    keyFurniture: [
      "Velvet chesterfield sofa",
      "Mirrored side tables",
      "Gold-framed bar cart",
      "Geometric patterned rug",
      "Lacquered console table",
    ],
    dos: [
      "Go bold with gold and jewel tones",
      "Use symmetry in furniture arrangement",
      "Layer velvet, silk, and lacquered surfaces",
      "Make lighting a dramatic statement",
    ],
    donts: [
      "Avoid casual or rustic materials",
      "Don't use matted or unfinished surfaces",
      "Avoid minimalism — Art Deco is maximalist",
      "Don't shy away from dramatic color",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
        alt: "Art Deco living room with velvet sofa and gold accents",
      },
      {
        src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
        alt: "Art Deco bedroom with geometric pattern and mirrored furniture",
      },
      {
        src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
        alt: "Art Deco dining room with gold chandelier and deep navy walls",
      },
    ],
  },
  {
    slug: "transitional",
    name: "Transitional",
    tagline: "The perfect balance between traditional comfort and modern sophistication.",
    origin: "Developed in the late 20th century as a bridge between traditional and contemporary styles.",
    description:
      "Transitional design strikes a perfect harmony between classic and contemporary. It's warm and comfortable like traditional style, but clean and uncluttered like modern design — the most universally appealing style.",
    palette: [
      { name: "Warm Taupe", hex: "#B8A898" },
      { name: "Creamy White", hex: "#F5F0E8" },
      { name: "Walnut Brown", hex: "#7B5230" },
      { name: "Warm Gray", hex: "#8C8C8C" },
      { name: "Charcoal", hex: "#3D3D3D" },
    ],
    characteristics: [
      "Balanced mix of traditional and modern pieces",
      "Neutral, warm color palette",
      "Comfortable upholstered furniture",
      "Clean lines without being stark",
      "Quality materials and craftsmanship",
      "Minimal but meaningful accessories",
    ],
    bestRooms: ["Living Room", "Bedroom", "Kitchen", "Dining Room"],
    keyFurniture: [
      "Upholstered neutral sofa with clean lines",
      "Wood and upholstered dining chairs",
      "Classic but unadorned console",
      "Comfortable armchair with simple profile",
      "Wood-frame bed with upholstered headboard",
    ],
    dos: [
      "Mix traditional silhouettes with modern fabrics",
      "Keep the palette neutral and warm",
      "Layer textures: linen, velvet, leather",
      "Choose quality over quantity",
    ],
    donts: [
      "Avoid extremes in either direction",
      "Don't use ornate carved furniture",
      "Avoid overly sleek, cold furniture",
      "Don't over-accessorize",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80",
        alt: "Transitional living room with neutral palette and mixed furniture",
      },
      {
        src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
        alt: "Transitional bedroom with upholstered headboard and warm tones",
      },
      {
        src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
        alt: "Transitional kitchen with classic cabinets and clean hardware",
      },
    ],
  },
  {
    slug: "eclectic",
    name: "Eclectic",
    tagline: "Curated chaos — where everything different somehow works together perfectly.",
    origin: "Born from the Victorian era's love of collecting, evolved through 20th century artistic movements.",
    description:
      "Eclectic design is the art of mixing styles, periods, textures and colors in a way that feels intentional rather than random. It reflects personality and tells a unique story — no two eclectic homes are alike.",
    palette: [
      { name: "Deep Plum", hex: "#6B2D6B" },
      { name: "Mustard", hex: "#D4A843" },
      { name: "Teal", hex: "#2D7D6E" },
      { name: "Warm Copper", hex: "#B87333" },
      { name: "Cream", hex: "#F5ECD7" },
    ],
    characteristics: [
      "Bold mixing of periods and styles",
      "One unifying element (color or texture) ties it together",
      "Gallery walls of mixed art",
      "Unexpected material combinations",
      "Collected objects with personal meaning",
      "Rich, layered visual depth",
    ],
    bestRooms: ["Living Room", "Dining Room", "Bedroom", "Home Office"],
    keyFurniture: [
      "Statement vintage sofa in bold color",
      "Antique dining chairs mixed with modern table",
      "Stacked vintage trunks as storage",
      "Collected art on gallery walls",
      "Global textile accents",
    ],
    dos: [
      "Choose one unifying element to tie it together",
      "Mix time periods deliberately",
      "Collect meaningful, personal objects",
      "Be bold with color in at least one spot",
    ],
    donts: [
      "Avoid random accumulation without intent",
      "Don't skip the unifying thread",
      "Avoid too many competing focal points",
      "Don't confuse eclectic with messy",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        alt: "Eclectic living room mixing vintage and modern furniture",
      },
      {
        src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
        alt: "Eclectic bedroom with gallery wall and layered textiles",
      },
      {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        alt: "Eclectic home office with mixed chairs and bold art",
      },
    ],
  },
  {
    slug: "traditional",
    name: "Traditional",
    tagline: "Timeless elegance, rich woodwork, and symmetrical harmony.",
    origin: "Rooted in 18th and 19th-century European and American heritage homes, prioritizing classical proportions and detailed craftsmanship.",
    description:
      "Traditional interior design embodies timeless comfort, orderly symmetry, and refined sophistication. Rich mahogany timbers, crown moldings, plush upholstery, and classic architectural details create an inviting, enduring sanctuary.",
    palette: [
      { name: "Deep Mahogany", hex: "#4A2508" },
      { name: "Warm Cream", hex: "#F5ECD7" },
      { name: "Sage Olive", hex: "#6E7D63" },
      { name: "Antique Gold", hex: "#C8A155" },
      { name: "Navy Heritage", hex: "#1B2D4F" },
    ],
    characteristics: [
      "Symmetrical furniture layouts and balanced architectural details",
      "Rich crown moldings, wainscoting, and coffered ceilings",
      "Classic dark wood furniture with carved accents and turned legs",
      "Sumptuous fabrics: damask, velvet, linen, and brocade",
      "Warm layered lighting with crystal chandeliers and wall sconces",
      "Curated heirloom artwork and portraits in gilded frames",
    ],
    bestRooms: ["Living Room", "Dining Room", "Bedroom", "Home Office"],
    keyFurniture: [
      "Upholstered roll-arm or Chesterfield sofa",
      "Solid mahogany dining table with carved chairs",
      "Classic wingback armchair with nailhead trim",
      "Formal bookcase with fluted wood trim",
      "Carved marble or wood fireplace mantel",
    ],
    dos: [
      "Maintain symmetry in furniture arrangements around focal points",
      "Incorporate rich architectural millwork like crown molding",
      "Use warm wood tones like mahogany, walnut, and cherry",
      "Layer luxurious textiles with subtle classic patterns",
    ],
    donts: [
      "Avoid stark, cold ultra-minimalist furniture",
      "Don't use raw industrial concrete or exposed metal pipes",
      "Avoid mismatched asymmetric furniture clusters",
      "Don't skimp on quality drapery and window treatments",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80",
        alt: "Traditional living room with classic moldings and warm wood",
      },
      {
        src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
        alt: "Traditional master bedroom with rich wood bed and warm textiles",
      },
      {
        src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
        alt: "Traditional dining room with mahogany table and chandelier",
      },
    ],
  },
];

// ============================================================
// ROOM × STYLE CONTENT GENERATOR
// Returns unique tips, palette, and FAQ per combination
// ============================================================
export function getRoomStyleContent(
  room: RoomData,
  style: StyleData
): RoomStyleContent {
  const roomName = room.name;
  const styleName = style.name;

  const tipsMap: Record<string, Record<string, string[]>> = {
    "living-room": {
      japandi: [
        `Choose a low-profile linen sofa in warm white or oatmeal as your ${roomName} anchor piece.`,
        "Add a solid oak or walnut coffee table with no visible hardware for a clean Japandi look.",
        "Layer a chunky wool throw and two handmade ceramic decorative pieces — no more.",
        "Use warm LED panel or paper lantern lighting at 2700K for that soft wabi-sabi glow.",
        "Introduce a single sculptural dried branch or bonsai plant as the natural accent.",
      ],
      scandinavian: [
        "Paint walls Arctic White to maximize light reflection in your living room.",
        "Choose a pale birch shelving unit and style it with 70% books, 30% objects.",
        "Layer a sheepskin rug over a sisal base rug for Scandinavian hygge texture.",
        "Install a simple pendant woven-rattan light over your seating area.",
        "Add a knitted wool throw in gray or dusty blue on the sofa arm.",
      ],
      "modern-farmhouse": [
        "Install shiplap on one accent wall behind the sofa in classic white.",
        "Choose a slipcovered sofa — cotton or linen in white or warm cream.",
        "Add a reclaimed wood coffee table with visible grain and imperfections.",
        "Use matte black for all metal accents: lamp base, curtain rod, and frames.",
        "Hang a large vintage-style clock or framed farmhouse art above the fireplace.",
      ],
      bohemian: [
        "Layer two or three rugs — a larger jute base topped with a smaller Moroccan wool rug.",
        "Hang a macrame wall piece or woven tapestry as the room's focal point.",
        "Create a floor seating corner with large velvet floor cushions and low poufs.",
        "Fill three or more planters with trailing plants: pothos, string of pearls, monstera.",
        "String fairy lights or Moroccan lanterns for warm ambient evening lighting.",
      ],
      minimalist: [
        "Choose one statement sofa — a sculptural curved piece in a neutral tone.",
        "Keep the coffee table clear — one tray and one candle maximum.",
        "Use built-in floating shelves to eliminate floor-standing storage clutter.",
        "Select a single oversized abstract art piece rather than a gallery wall.",
        "Install recessed lighting on dimmers to control mood without visible fixtures.",
      ],
      industrial: [
        "Leave brick or concrete walls exposed as the room's primary texture.",
        "Choose a Chesterfield-style leather sofa in cognac or aged brown.",
        "Install Edison bulb pendant lights in raw metal or black pipe fittings.",
        "Use a reclaimed scaffold-board coffee table as the room's industrial anchor.",
        "Add a metal pipe shelving system along one wall for open storage.",
      ],
      coastal: [
        "Choose a linen sofa in white, natural, or dusty blue for your coastal living room.",
        "Layer a jute or sisal rug to bring in natural coastal texture.",
        "Display sea glass, shells, and driftwood in simple glass vessels.",
        "Install whitewashed wood or beadboard on one wall for a beachy cottage feel.",
        "Use navy and white stripe cushion covers as an easy coastal accent.",
      ],
      "mid-century-modern": [
        "Anchor the room with an Eames-style lounge chair in black leather and walnut.",
        "Choose a low-slung sofa with tapered wood legs in walnut or teak.",
        "Add a walnut credenza along one wall for mid-century storage.",
        "Use a sunburst or Sputnik-style ceiling light as the room's focal point.",
        "Hang abstract geometric or Scandinavian mid-century art prints in thin frames.",
      ],
      mediterranean: [
        "Install terracotta floor tiles or a terracotta-colored area rug as the foundation.",
        "Use arched furniture pieces or add an arched mirror as a wall focal point.",
        "Choose wrought iron floor or table lamps for authentic Mediterranean character.",
        "Add a cluster of potted olive trees, lavender, or citrus plants.",
        "Use hand-painted or patterned cushion covers in blue, terracotta, and gold.",
      ],
      rustic: [
        "Make a stone or brick fireplace the absolute focal point of the living room.",
        "Choose a leather sofa in cognac or saddle brown that will improve with age.",
        "Add a live-edge wood coffee table as the room's raw natural centerpiece.",
        "Layer wool and plaid throw blankets in warm earth tones over seating.",
        "Use ambient antler, wrought iron, or Edison bulb fixtures for warm light.",
      ],
      contemporary: [
        "Choose a sculptural, curved sofa in bouclé or textured fabric as the focal piece.",
        "Add one oversized statement abstract art piece — go large and bold.",
        "Use mixed materials: glass side table next to a wood sofa, steel lamp next to fabric.",
        "Install a waterfall-style media console in walnut or lacquered finish.",
        "Use a dramatic pendant chandelier — geometric or sculptural style works best.",
      ],
      "art-deco": [
        "Choose a deep jewel-toned velvet sofa — emerald, navy, or plum.",
        "Add mirrored side tables or a mirrored console for reflective glamour.",
        "Install a dramatic geometric or chandelier pendant light as the room's crown.",
        "Use gold or brass in every metal accent: lamp base, frames, and tray.",
        "Lay a geometric-patterned rug in black, gold, and cream as the room's foundation.",
      ],
      transitional: [
        "Choose a neutral, comfortable sofa with clean upholstered arms — no skirt.",
        "Mix one traditional armchair with modern clean-lined occasional tables.",
        "Use warm greige or taupe for walls — not pure white, not warm beige.",
        "Layer textures: linen pillows, velvet throw, wool rug all in the same neutral family.",
        "Choose a simple but quality table lamp — not ornate, not ultra-modern.",
      ],
      eclectic: [
        "Start with one bold vintage or statement sofa as the room's anchor and hero piece.",
        "Create a gallery wall that mixes oil paintings, photography, and prints.",
        "Mix a modern glass coffee table with antique side tables from different eras.",
        "Choose one unifying color thread — repeat it in 3–5 spots across the room.",
        "Display collected objects: travel finds, vintage books, and artisan ceramics together.",
      ],
      traditional: [
        "Anchor the room with a tailored roll-arm sofa flanked by a pair of matching wingback chairs.",
        "Install formal crown molding and wainscoting painted in warm antique white.",
        "Arrange furniture symmetrically around the fireplace mantel as the central focal axis.",
        "Layer an authentic Persian or oriental wool area rug over rich dark hardwood flooring.",
        "Hang an antique gold-framed oil painting above the mantel for refined heritage character.",
      ],
    },
    bedroom: {
      japandi: [
        "Choose a low platform bed in solid oak or walnut with minimal headboard detail.",
        "Use a neutral linen duvet in oatmeal or warm white — layer one textured throw.",
        "Keep nightstands minimal: one small book, one ceramic lamp, nothing else.",
        "Install blackout linen curtains floor to ceiling for a calm, restful atmosphere.",
        "Add one live plant — a fiddle leaf or snake plant — for natural life energy.",
      ],
      scandinavian: [
        "Choose a pale birch or pine bed frame with clean, simple lines.",
        "Layer white linen bedding with a gray or blue knitted blanket at the foot.",
        "Add a small sheepskin rug beside the bed for a cozy morning landing.",
        "Use a simple wall-mounted reading light rather than table lamps to save space.",
        "Keep the color palette to white, gray, and one soft accent: dusty pink or blue.",
      ],
      "modern-farmhouse": [
        "Choose a shiplap accent wall behind the bed headboard in classic white.",
        "Select a linen upholstered headboard or a wooden barn-style bed frame.",
        "Layer bedding with white quilts, plaid throws, and cotton euro shams.",
        "Use matte black or oil-rubbed bronze for all hardware and light fixtures.",
        "Add a vintage weathered wood sign or framed farmhouse quote above the bed.",
      ],
      bohemian: [
        "Choose a rattan or macrame-detailed headboard for an earthy bohemian touch.",
        "Layer bedding with colorful quilts, embroidered pillow covers, and woven throws.",
        "Create a canopy effect with sheer curtains or macrame hung from the ceiling.",
        "Add plants everywhere: hanging pothos, bedside succulents, floor monstera.",
        "Hang a tapestry or large printed fabric as a dramatic wall focal point.",
      ],
      minimalist: [
        "Choose a platform bed with built-in under-bed storage to eliminate clutter.",
        "Use only white or light gray bedding — one duvet, two pillows, nothing more.",
        "Mount a single slim shelf above the bed rather than nightstands.",
        "Install hidden wardrobe doors that blend seamlessly into the wall.",
        "Use one bedside lamp with a simple ceramic base and linen shade.",
      ],
      industrial: [
        "Choose a metal pipe or blackened steel bed frame for industrial character.",
        "Use aged leather or charcoal gray linen bedding for an urban masculine feel.",
        "Add Edison bulb wall sconces on each side of the bed instead of table lamps.",
        "Leave one exposed brick wall or use a brick-effect wallpaper as the headboard wall.",
        "Use a reclaimed timber nightstand with pipe legs as a rugged industrial accent.",
      ],
      coastal: [
        "Choose a whitewashed wood or driftwood-toned bed frame for a beachy feel.",
        "Use white and blue striped or washed-linen bedding for a coastal atmosphere.",
        "Add a jute or sisal rug beside the bed for natural coastal texture.",
        "Hang a large coastal art piece — a watercolor seascape or abstract ocean print.",
        "Use a natural rope mirror or bleached starfish arrangement on the bedside table.",
      ],
      "mid-century-modern": [
        "Choose a platform bed in walnut with upholstered linen headboard and tapered legs.",
        "Add matching walnut nightstands with clean lines and simple pulls.",
        "Use an abstract or geometric art print in an era-appropriate thin metal frame.",
        "Install a Sputnik or starburst wall sconce beside the bed for MCM authenticity.",
        "Layer bedding in mustard, olive, or burnt orange for bold mid-century color.",
      ],
      mediterranean: [
        "Use terracotta or warm white stucco texture paint on the bedroom accent wall.",
        "Choose wrought iron or forged metal bed frame for a Mediterranean villa feel.",
        "Layer colorful embroidered or tile-print cushion covers on white bedding.",
        "Add a terracotta or hand-painted ceramic bedside lamp for artisan character.",
        "Bring in potted lavender on the windowsill for scent and Mediterranean authenticity.",
      ],
      rustic: [
        "Choose a log-style or reclaimed barn wood bed frame as the room's statement piece.",
        "Layer plaid flannel throws, faux fur, and quilted blankets for rustic warmth.",
        "Use antler or wrought iron wall sconces for warm, hunting-lodge lighting.",
        "Add a large vintage botanical print or wildlife painting above the headboard.",
        "Use a repurposed crate or vintage trunk as a bedside table with character.",
      ],
      contemporary: [
        "Choose a bold upholstered bed with a statement oversized headboard.",
        "Use a monochromatic bedding scheme — all gray, all white, or all deep navy.",
        "Add a sculptural pendant light hung low on each side of the bed.",
        "Install floor-to-ceiling built-in wardrobe in a matte lacquered finish.",
        "Place one large abstract art piece on the wall behind the bed — go bold.",
      ],
      "art-deco": [
        "Choose a velvet upholstered bed in deep navy, emerald, or plum.",
        "Add mirrored side tables and a mirrored dresser for Art Deco reflection.",
        "Use geometric patterned wallpaper on the headboard wall for drama.",
        "Install a fan-shaped or sunburst gold ceiling fixture above the bed.",
        "Layer silk or satin bedding with geometric-print cushion covers.",
      ],
      transitional: [
        "Choose an upholstered linen headboard in warm taupe or ivory.",
        "Layer crisp white bedding with a warm-toned knitted throw at the foot.",
        "Use matching but not identical nightstands — same style, slightly different finish.",
        "Add a simple upholstered bench at the foot of the bed for classic comfort.",
        "Use a table lamp with a linen shade and wooden or ceramic base on each side.",
      ],
      eclectic: [
        "Start with an unexpected bed frame — antique brass, painted rattan, or bold color.",
        "Mix vintage and modern nightstands on each side — intentionally asymmetrical.",
        "Create an eclectic gallery wall of mixed frames above the headboard.",
        "Layer bedding from different textile traditions: Indian kantha, Turkish kilim, French linen.",
        "Add one dramatic, oversized ceiling light that doesn't match anything — perfectly.",
      ],
      traditional: [
        "Choose a carved four-poster or upholstered camelback bed in mahogany or dark walnut.",
        "Layer crisp 600-thread-count Egyptian cotton bedding with a tailored damask coverlet.",
        "Flank the bed with matching dark wood nightstands topped with fluted brass lamps for perfect symmetry.",
        "Install floor-to-ceiling pinch-pleat silk or velvet draperies with tailored rope tiebacks.",
        "Place an upholstered tufted storage bench at the foot of the bed for classic comfort.",
      ],
    },
  };

  // Generic tips fallback for other rooms
  const genericTips = [
    `Choose ${styleName} design elements that reflect the ${roomName}'s primary function.`,
    `Use the ${styleName} color palette — ${style.palette.map((p) => p.name).join(", ")} — in your ${roomName}.`,
    `Focus on ${style.characteristics[0].toLowerCase()} as the defining element of your ${roomName}.`,
    `Incorporate ${style.keyFurniture[0].toLowerCase()} as the anchor piece of your ${styleName} ${roomName}.`,
    `Follow the golden rule of ${styleName}: ${style.dos[0].toLowerCase()}.`,
  ];

  const tips =
    tipsMap[room.slug]?.[style.slug] ||
    genericTips;

  const faqs: { q: string; a: string }[] = [
    {
      q: `What is ${styleName} style in a ${roomName}?`,
      a: `A ${styleName} ${roomName} is defined by ${style.characteristics.slice(0, 2).join(" and ").toLowerCase()}. ${style.description}`,
    },
    {
      q: `What colors should I use for a ${styleName} ${roomName}?`,
      a: `The ideal palette for a ${styleName} ${roomName} includes ${style.palette.map((p) => p.name).join(", ")}. These tones create the characteristic atmosphere of ${styleName} design.`,
    },
    {
      q: `What furniture works best in a ${styleName} ${roomName}?`,
      a: `The best furniture pieces for a ${styleName} ${roomName} include ${style.keyFurniture.slice(0, 3).join(", ")}. These pieces embody the ${styleName} aesthetic while keeping the space functional.`,
    },
    {
      q: `How do I start decorating a ${styleName} ${roomName}?`,
      a: `Start your ${styleName} ${roomName} by choosing your anchor piece: ${style.keyFurniture[0].toLowerCase()}. Then build around it with the characteristic palette of ${style.palette[0].name} and ${style.palette[1].name}. Remember to follow the core rule: ${style.dos[0].toLowerCase()}.`,
    },
  ];

  return {
    h1: `${styleName} ${roomName} Ideas & Design Inspiration`,
    intro: `Transform your ${roomName.toLowerCase()} with the timeless appeal of ${styleName} design. ${style.description} In a ${roomName.toLowerCase()}, this translates to a space that is ${style.characteristics[0].toLowerCase()}, ${style.characteristics[1]?.toLowerCase() ?? "beautifully curated"}, and ${style.characteristics[2]?.toLowerCase() ?? "thoughtfully styled"}.`,
    tips,
    palette: style.palette,
    materials: style.keyFurniture,
    furniturePieces: style.keyFurniture,
    cta: `Ready to visualize your ${styleName} ${roomName}? Use our free AI tool to see it instantly.`,
    faqs,
  };
}
