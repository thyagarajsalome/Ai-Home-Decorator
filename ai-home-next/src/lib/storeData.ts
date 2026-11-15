export interface BookPreviewPage {
  title: string;
  subtitle: string;
  pageNumber: number;
  highlightText: string;
  imageUrl: string;
}

export interface StoreCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface StoreProduct {
  slug: string;
  title: string;
  subtitle: string;
  categoryId: string;
  categoryName: string;
  price: number;
  originalPrice: number;
  badge?: string;
  rating: number;
  reviewsCount: number;
  pagesCount: number;
  fileSize: string;
  format: string;
  publicationYear: number;
  coverImage: string;
  pdf_file_key?: string;
  description: string;
  highlights: string[];
  tableOfContents: { chapter: string; pages: string; summary: string }[];
  previewPages: BookPreviewPage[];
  usSpecifics: string[];
  targetAudience: string;
}

export const STORE_CATEGORIES: StoreCategory[] = [
  {
    id: "all",
    name: "All Guides",
    icon: "📚",
    description: "Browse available American home improvement and design playbooks.",
  },
  {
    id: "home-improvements",
    name: "Home Improvements",
    icon: "🔨",
    description: "General renovation playbooks, lighting guides, contractor hiring contracts, and blueprints.",
  },
];

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    slug: "home-lighting-design-guide-usa",
    title: "The Home Lighting Design Guide (USA Edition)",
    subtitle: "Layer, balance and control light in every room with the same principles professionals use.",
    categoryId: "home-improvements",
    categoryName: "Home Improvements",
    price: 14.99,
    originalPrice: 29.99,
    badge: "Official USA Guide",
    rating: 4.6,
    reviewsCount: 0,
    pagesCount: 9,
    fileSize: "105 KB",
    format: 'Printable PDF (8.5" x 11" US Letter) — 9 Illustrated Masterclass Pages',
    publicationYear: 2026,
    coverImage: "/store/covers/home-lighting-design-guide-usa-cover.webp",
    pdf_file_key: "Home-Lighting-Design-Guide-USA.pdf",
    description:
      "Transform your home's atmosphere with professional lighting design principles. Written specifically for American homes, this practical guide walks you through the 3 layers of light (ambient, task, accent), color temperature (Kelvin sweet spot 2700-3000K), lumen sizing per square foot, recessed can spacing geometry, and room-by-room floor plans.",
    highlights: [
      "The Three Layers of Light: How to blend ambient, task, and accent lighting to eliminate dark corners.",
      "Kelvin & CRI Demystified: Exactly which 2700K-3000K warm white bulbs make interiors look high-end.",
      "Recessed Can Light Placement Geometry: Spacing formulas based on ceiling height and beam spread.",
      "Lumens Per Square Foot Calculator: Target lumen benchmarks for living rooms, kitchens, and baths.",
      "Room-by-Room Illustrated Plans: Practical layouts with pendant, sconce, and under-cabinet dimming control.",
    ],
    tableOfContents: [
      { chapter: "Page 1: Design with Light, Not Just Fixtures", pages: "p. 1", summary: "Creating emotional warmth and functional zoning before fixture shopping." },
      { chapter: "Page 2: The Three Layers of Light", pages: "p. 2", summary: "Ambient ceiling wash, task reading lights, and architectural accent focus." },
      { chapter: "Page 3: Color, Quality and Brightness", pages: "p. 3", summary: "Kelvin color temperature (2700K-3000K) and CRI 90+ standards." },
      { chapter: "Page 4: Placement Geometry & Ceiling Spacing", pages: "p. 4", summary: "Recessed fixture spacing, beam overlap formulas, and hanging heights." },
      { chapter: "Page 5: How Bright? Sizing Your Lumens", pages: "p. 5", summary: "Target lumens per square foot benchmarks across all room types." },
      { chapter: "Pages 6-7: Room-by-Room Floor Plans", pages: "pp. 6–7", summary: "Detailed living room and kitchen layouts with dimming controls." },
      { chapter: "Page 8: Exterior, Landscape & Safety Lighting", pages: "p. 8", summary: "Tree uplighting, wall washes, path shielding, and motion security." },
      { chapter: "Page 9: Your Master Lighting Plan Checklist", pages: "p. 9", summary: "Final 7-point pre-wiring checklist before buying bulbs and fixtures." },
    ],
    previewPages: [
      {
        pageNumber: 1,
        title: "Design with Light, Not Just Fixtures",
        subtitle: "How each space should feel and functional zoning",
        highlightText: "Lighting designers do not start by shopping for fixtures. They decide how each space should feel and what people will do there, then build light in layers to match.",
        imageUrl: "/store/covers/home-lighting-sample-page-1.webp",
      },
      {
        pageNumber: 2,
        title: "The Three Layers of Light",
        subtitle: "Ambient, Task & Accent Lighting Rules",
        highlightText: "Every well-lit room blends three layers. Ambient light fills the room, task light helps you work, and accent light adds depth and focus. Skip a layer and the room feels flat or harsh.",
        imageUrl: "/store/covers/home-lighting-sample-page-2.webp",
      },
      {
        pageNumber: 3,
        title: "Color, Quality and Brightness",
        subtitle: "Kelvin Temperature, CRI 90+ & Lumens",
        highlightText: "Three numbers on every bulb box decide how a room feels: color temperature (Kelvin), color accuracy (CRI) and brightness (lumens). Choose them on purpose.",
        imageUrl: "/store/covers/home-lighting-sample-page-3.webp",
      },
    ],
    usSpecifics: [
      "Standard US 120V electrical fixtures and recessed can dimensions.",
      "Compliant with US building codes and Title 24 energy standards.",
      "Bulb specifications tailored to US retail brands (GE, Philips, Lutron, Cree).",
    ],
    targetAudience: "US Homeowners, interior design enthusiasts, and renovators looking for warm, professional lighting.",
  },
  {
  "slug": "home-painting-guide-usa",
  "title": "The Home Painting Guide (USA Edition)",
  "subtitle": "Master interior & exterior paint colors, sheens, and application techniques with professional painter secrets.",
  "categoryId": "home-improvements",
  "categoryName": "Home Improvements",
  "price": 14.99,
  "originalPrice": 29.99,
  "badge": "Official USA Guide",
  "rating": 4.8,
  "reviewsCount": 0,
  "pagesCount": 12,
  "fileSize": "120 KB",
  "format": "Printable PDF (8.5\" x 11\" US Letter) — 12 Illustrated Masterclass Pages",
  "publicationYear": 2026,
  "coverImage": "/store/covers/home-painting-guide-usa-cover.webp",
  "pdf_file_key": "Home-Painting-Guide-USA.pdf",
  "description": "Transform your home with foolproof paint color selection and professional finishing techniques. Written specifically for American homes, this practical guide details interior paint sheens (flat, eggshell, satin, semi-gloss), color temperature and undertone rules, room-by-room palettes, ceiling and trim best practices, moisture-resistant bathroom formulas, and full project cost calculators.",
  "highlights": [
    "Paint Sheens Decoded: When to use flat, eggshell, satin, semi-gloss, and high-gloss for every room.",
    "Undertones Demystified: How to identify pink, yellow, and green undertones before buying paint.",
    "Room-by-Room Palettes: 24 proven Sherwin-Williams and Benjamin Moore colors tested under 2700K-3000K lighting.",
    "Moisture & Mildew Protection: Paint formulations that withstand high-humidity American bathrooms.",
    "Trim, Ceiling & Cabinet Techniques: Professional cut-in methods, primer selection, and roller nap guides."
  ],
  "tableOfContents": [
    {
      "chapter": "Page 1: Choosing The Right Sheen",
      "pages": "p. 1",
      "summary": "Durability, light reflectivity, and cleaning comparisons across all sheens."
    },
    {
      "chapter": "Page 2: Undertones & Lighting Science",
      "pages": "p. 2",
      "summary": "How North, South, East, and West exposures alter wall colors."
    },
    {
      "chapter": "Page 3: Room-by-Room Color Palettes",
      "pages": "p. 3",
      "summary": "Curated whole-house paint palettes that flow seamlessly from room to room."
    },
    {
      "chapter": "Pages 4-5: Surface Preparation & Priming",
      "pages": "pp. 4-5",
      "summary": "Drywall repairs, TSP washing, stain-blocking primers, and tape rules."
    },
    {
      "chapter": "Page 6: Cutting-In & Rolling Mechanics",
      "pages": "p. 6",
      "summary": "Maintaining a wet edge, choosing roller nap (3/8\" vs 1/2\"), and avoiding lap marks."
    },
    {
      "chapter": "Pages 7-8: Trim, Doors & Cabinet Painting",
      "pages": "pp. 7-8",
      "summary": "Enamel paints, self-leveling formulas, and degreasing existing cabinetry."
    },
    {
      "chapter": "Pages 9-10: Bathroom & Kitchen Specialty Coatings",
      "pages": "pp. 9-10",
      "summary": "Mildewcide additives, scrubbable mats, and splash zone protection."
    },
    {
      "chapter": "Page 11: Exterior Paint Selection & Weather Windows",
      "pages": "p. 11",
      "summary": "100% acrylic latex, temperature thresholds, and siding moisture checks."
    },
    {
      "chapter": "Page 12: Project Estimator & Shopping Checklist",
      "pages": "p. 12",
      "summary": "Square footage formulas, gallon calculators, and essential tools checklist."
    }
  ],
  "previewPages": [
    {
      "pageNumber": 1,
      "title": "Choosing The Right Sheen",
      "subtitle": "Flat, Eggshell, Satin, Semi-Gloss & Gloss",
      "highlightText": "The single most common painting regret is choosing the wrong sheen. High traffic needs wipeability without unwanted glare.",
      "imageUrl": "/store/covers/home-painting-sample-page-1.webp"
    },
    {
      "pageNumber": 2,
      "title": "Undertones & Lighting Science",
      "subtitle": "Natural Light Direction & Kelvin Match",
      "highlightText": "A greige that looks warm and inviting in a South-facing living room can look cold and sterile under North-facing daylight.",
      "imageUrl": "/store/covers/home-painting-sample-page-2.webp"
    },
    {
      "pageNumber": 3,
      "title": "Room-by-Room Color Palettes",
      "subtitle": "Tested American Home Color Harmonies",
      "highlightText": "Cohesive home design does not mean every room is the same color. It means colors share complementary undertones and LRV values.",
      "imageUrl": "/store/covers/home-painting-sample-page-3.webp"
    }
  ],
  "usSpecifics": [
    "Standard US paint can volumes (quarts, gallons, 5-gallon buckets).",
    "VOC compliance with EPA and California SCAQMD Rule 1113.",
    "Color codes calibrated to Sherwin-Williams, Benjamin Moore, and Behr collections."
  ],
  "targetAudience": "US Homeowners, DIY painters, and remodelers seeking professional, lasting paint finishes."
}
];
