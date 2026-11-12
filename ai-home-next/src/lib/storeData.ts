// ============================================================
// AI Home Decorator — Design Store Data Layer
// 9 US-Targeted Home Improvement & Design Digital PDF Books
// ============================================================

export interface StoreCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface BookPreviewPage {
  title: string;
  subtitle: string;
  pageNumber: number;
  highlightText: string;
  imageUrl: string;
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
  format: string; // e.g., "Printable PDF (8.5\" x 11\" US Letter) + Mobile ePub"
  publicationYear: number;
  coverImage: string;
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
    description: "Browse the complete collection of American home improvement and design playbooks.",
  },
  {
    id: "home-improvements",
    name: "Home Improvements",
    icon: "🔨",
    description: "General renovation playbooks, contractor hiring contracts, permits, and ROI breakdowns.",
  },
  {
    id: "kitchen-design",
    name: "Kitchen Design",
    icon: "🍳",
    description: "Work triangles, island clearances, cabinetry comparisons, and quartz/granite guides.",
  },
  {
    id: "bathroom-design",
    name: "Bathroom Design",
    icon: "🚿",
    description: "Walk-in curbless showers, double vanities, waterproofing specs, and tile patterns.",
  },
  {
    id: "flooring",
    name: "Flooring",
    icon: "🪵",
    description: "LVP vs. engineered hardwood, subfloor prep, wear layer thickness, and transition trims.",
  },
  {
    id: "painting",
    name: "Painting & Colors",
    icon: "🎨",
    description: "Sherwin-Williams & Benjamin Moore swatches, LRV formulas, and sheen selection rules.",
  },
  {
    id: "interior",
    name: "Interior Living",
    icon: "🛋️",
    description: "Living rooms, master suites, rug sizing formulas, and open-concept furniture flow.",
  },
  {
    id: "exterior",
    name: "Exterior & Facade",
    icon: "🏡",
    description: "Curb appeal transformations, board-and-batten siding, stucco, and garage doors.",
  },
  {
    id: "landscape",
    name: "Landscape & Garden",
    icon: "🌿",
    description: "USDA hardiness zones, drought-tolerant sod, hardscape pavers, and bed layering.",
  },
  {
    id: "patio",
    name: "Patio & Decking",
    icon: "☀️",
    description: "Trex composite vs. pressure-treated wood, pergolas, and outdoor kitchens.",
  },
];

export const STORE_PRODUCTS: StoreProduct[] = [
  // 1. Home Improvements
  {
    slug: "american-home-remodeling-playbook",
    title: "The 2026 American Home Remodeling Playbook",
    subtitle: "The Complete Contractor, Permit, Budgeting & High-ROI Renovation Blueprint for US Homeowners",
    categoryId: "home-improvements",
    categoryName: "Home Improvements",
    price: 19.99,
    originalPrice: 39.99,
    badge: "Bestseller",
    rating: 4.9,
    reviewsCount: 148,
    pagesCount: 84,
    fileSize: "18.4 MB",
    format: "Printable PDF (8.5\" x 11\" US Letter) + Interactive Digital Checklist",
    publicationYear: 2026,
    coverImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    description:
      "Avoid costly remodel mistakes with the ultimate US homeowner's renovation blueprint. Written for American homeowners and investors, this playbook walks you through hiring licensed general contractors, decoding city permits, managing draw schedules, and prioritizing projects with the highest return on appraisal value.",
    highlights: [
      "City Building Permit Guide: When you legally need a permit and how to pull it without project delays.",
      "Contractor Hiring Cheat Sheet with 21 non-negotiable questions to ask before signing.",
      "Room-by-Room Cost Breakdown: National US averages per square foot across all 50 states.",
      "Escrow & Draw Payment Schedule template to protect your money against contractor default.",
      "2026 High-ROI Renovation Checklist: Which projects recoup 80%+ at appraisal.",
    ],
    tableOfContents: [
      { chapter: "Chapter 1: Pre-Remodel Assessment & Budget Sizing", pages: "pp. 4–16", summary: "Establishing your contingency reserve (15-20%) and prioritizing structural over cosmetic updates." },
      { chapter: "Chapter 2: US Building Permits & Municipal Codes", pages: "pp. 17–28", summary: "Navigating IRC codes, historic districts, HOA architectural review boards, and inspections." },
      { chapter: "Chapter 3: Vetting & Hiring Licensed Contractors", pages: "pp. 29–45", summary: "Contract templates, lien waivers, workers' comp verification, and milestone billing." },
      { chapter: "Chapter 4: Room-by-Room Cost & ROI Benchmarks", pages: "pp. 46–68", summary: "Detailed square-foot price models for kitchens, bathrooms, additions, and basements." },
      { chapter: "Chapter 5: Final Punch List & Closing Protocols", pages: "pp. 69–84", summary: "The 50-point inspection before final payment release." },
    ],
    previewPages: [
      { title: "Permit vs. No-Permit Matrix", subtitle: "Clear guidelines for IRC municipal requirements", pageNumber: 18, highlightText: "Never let a contractor pull permits under your personal name as owner-builder without understanding the liability risks.", imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80" },
      { title: "Contractor Bid Comparison Sheet", subtitle: "Apple-to-apples bid evaluation formula", pageNumber: 34, highlightText: "Line-item bids must separate labor hours, allowance allocations, and subcontractor margins.", imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" },
      { title: "National Renovation Cost Breakdown", subtitle: "Square foot price benchmarks across US regions", pageNumber: 52, highlightText: "Average mid-range kitchen remodel in 2026: $150 to $275 per sq. ft. depending on state labor rates.", imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80" },
    ],
    usSpecifics: [
      "Compliant with International Residential Code (IRC) standards.",
      "US Dollar ($) pricing benchmarks based on nationwide contractor indices.",
      "Standard US building material specifications (2x4 / 2x6 framing, drywall gauges, Romex wire).",
    ],
    targetAudience: "US Homeowners planning a major renovation, real estate investors, and DIYers managing subcontractors.",
  },

  // 2. Kitchen Design
  {
    slug: "modern-kitchen-remodel-blueprint",
    title: "The Modern Kitchen Remodel Blueprint",
    subtitle: "Cabinetry Specifications, Countertop Comparison, Island Clearances & Workflow Layouts",
    categoryId: "kitchen-design",
    categoryName: "Kitchen Design",
    price: 14.99,
    originalPrice: 29.99,
    badge: "Popular",
    rating: 4.9,
    reviewsCount: 112,
    pagesCount: 72,
    fileSize: "16.1 MB",
    format: "Printable PDF (8.5\" x 11\" US Letter) + Dimension Cheat Sheets",
    publicationYear: 2026,
    coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
    description:
      "Design an ergonomic, luxury kitchen that maximizes workflow and property value. This comprehensive blueprint details standard cabinet heights, island overhang dimensions, appliance clearances, quartz vs. granite comparisons, and under-cabinet electrical planning.",
    highlights: [
      "The Kitchen Work Triangle & Modern Work Zones (Prep, Cook, Clean, Pantry, Coffee Station).",
      "Exact Island Dimensions: Minimum walkway clearances (36\" vs. 42\" vs. 48\") and seating overhangs.",
      "Cabinetry Comparison: Custom vs. Semi-Custom vs. RTA Flat-pack (Shaker, Inset, Slab).",
      "Countertop Durability Index: Quartz, Quartzite, Granite, Marble, and Butcher Block ranked by maintenance.",
      "Electrical & Lighting Blueprint: Recessed can spacing, pendant drop heights, and under-cabinet LED temperatures.",
    ],
    tableOfContents: [
      { chapter: "Chapter 1: The Modern Kitchen Workflow Formula", pages: "pp. 4–15", summary: "Transitioning from triangle to modern work zones for multi-cook households." },
      { chapter: "Chapter 2: Cabinetry Construction & Sizing Standards", pages: "pp. 16–31", summary: "Standard base (36\" height, 24\" depth) and upper cabinet heights, full-extension soft-close hardware." },
      { chapter: "Chapter 3: Island Planning & Seating Clearances", pages: "pp. 32–44", summary: "Counter height (36\") vs. Bar height (42\"), cantilever support brackets, and seating overhang (12\"–15\")." },
      { chapter: "Chapter 4: Countertop & Backsplash Selection", pages: "pp. 45–58", summary: "Sealing requirements, heat resistance, vein matching, and full-height slab vs. tile backsplashes." },
      { chapter: "Chapter 5: Electrical, Lighting & Appliance Specs", pages: "pp. 59–72", summary: "30\" vs. 36\" range hood CFM ratings, GFCI outlet placement, and 3000K warm-dimming lighting." },
    ],
    previewPages: [
      { title: "Kitchen Clearance Standard Diagram", subtitle: "Exact walkway and appliance door swing dimensions", pageNumber: 12, highlightText: "Allow 42 inches of clearance between island counter edge and perimeter counters in single-cook kitchens, 48 inches for two cooks.", imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80" },
      { title: "Countertop Comparison Matrix", subtitle: "Stain, scratch, heat, and maintenance rankings", pageNumber: 48, highlightText: "Engineered quartz requires zero sealing, whereas natural quartzite requires penetrating sealer every 12 to 24 months.", imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" },
      { title: "Pendant Light Sizing Formula", subtitle: "Spacing formulas over 6', 8', and 10' islands", pageNumber: 64, highlightText: "Hang pendants 30 to 36 inches above the countertop surface, spacing them 24 to 30 inches apart.", imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80" },
    ],
    usSpecifics: [
      "Standard US appliance rough-in dimensions (30\" / 36\" ranges, 36\" French door refrigerators, 24\" dishwashers).",
      "National Kitchen & Bath Association (NKBA) design guidelines incorporated.",
      "NEC (National Electrical Code) kitchen countertop outlet spacing rules.",
    ],
    targetAudience: "Homeowners remodeling their primary kitchen, architects, kitchen cabinet installers, and house flippers.",
  },

  // 3. Bathroom Design
  {
    slug: "spa-grade-bathroom-walk-in-shower-guide",
    title: "Spa-Grade Master Bathroom & Walk-In Shower Guide",
    subtitle: "Curbless Showers, Waterproofing Systems, Double Vanities, Tile Layouts & Lighting Specs",
    categoryId: "bathroom-design",
    categoryName: "Bathroom Design",
    price: 12.99,
    originalPrice: 24.99,
    badge: "Trending",
    rating: 4.8,
    reviewsCount: 96,
    pagesCount: 64,
    fileSize: "14.8 MB",
    format: "Printable PDF (8.5\" x 11\" US Letter) + Waterproofing Detail Diagrams",
    publicationYear: 2026,
    coverImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    description:
      "Transform an outdated bathroom into a high-end spa sanctuary. Discover exact plumbing rough-in heights, curbless zero-threshold shower construction, Schluter/Wedi waterproofing systems, double vanity layout spacing, and exhaust CFM ventilation requirements.",
    highlights: [
      "Curbless Walk-In Shower Guide: Slope ratios (1/4\" per foot), linear drains, and structural recessing.",
      "Waterproofing Systems Explained: Liquid membrane vs. sheet membrane (Schluter-KERDI vs. RedGard).",
      "Double Vanity Spacing Blueprint: Minimum 60\" width, plumbing rough-in centers, and sconce heights.",
      "Tile Layout Formulas: Center-line balancing, herringbone alignment, and grout width standards.",
      "Exhaust Fan CFM Calculation: Sizing ventilation to eliminate mold and mirror fogging.",
    ],
    tableOfContents: [
      { chapter: "Chapter 1: Master Bathroom Spatial Layouts", pages: "pp. 4–14", summary: "Maximizing 5x8, 8x10, and luxury master bath floor plans with wet rooms and enclosed water closets." },
      { chapter: "Chapter 2: Shower Construction & Zero-Threshold Pan", pages: "pp. 15–28", summary: "Pre-sloped foam trays, mortar beds, linear drains, and frameless 3/8\" tempered glass specs." },
      { chapter: "Chapter 3: Waterproofing Membranes & Flood Testing", pages: "pp. 29–38", summary: "24-hour flood test requirements, niche flashing, and vapor barriers in steam showers." },
      { chapter: "Chapter 4: Double Vanity, Plumbing & Mirror Sizing", pages: "pp. 39–50", summary: "34\" vs. 36\" comfort height vanities, p-trap clearances, and eye-level sconce lighting." },
      { chapter: "Chapter 5: Tile Selection, Grout & Heated Floors", pages: "pp. 51–64", summary: "PEI wear ratings, epoxy vs. polymer grout, and electric radiant underfloor heating mat installation." },
    ],
    previewPages: [
      { title: "Curbless Shower Pan Detail", subtitle: "Subfloor recess and slope diagram", pageNumber: 20, highlightText: "A 1/4-inch per foot slope towards the drain is required by US plumbing code to guarantee puddling-free drainage.", imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80" },
      { title: "Vanity Lighting & Mirror Alignment", subtitle: "Eliminating harsh under-eye shadows", pageNumber: 44, highlightText: "Mount side sconces 60 to 65 inches from the finished floor, spaced 28 to 36 inches apart at eye level.", imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80" },
      { title: "Niche Sizing & Tile Alignment", subtitle: "Centering recessed shampoo niches into tile grout lines", pageNumber: 56, highlightText: "Align the top and bottom of the niche with full tile courses to eliminate unsightly sliver cuts.", imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80" },
    ],
    usSpecifics: [
      "Uniform Plumbing Code (UPC) and International Plumbing Code (IPC) standards.",
      "US electrical outlet requirements (GFCI-protected, 20-amp dedicated branch circuits).",
      "American standard fixture offsets: 15\" minimum clearance from center of toilet to wall.",
    ],
    targetAudience: "Homeowners remodeling bathrooms, tile setters, general contractors, and DIY bathroom renovators.",
  },

  // 4. Flooring
  {
    slug: "usa-homeowner-flooring-bible",
    title: "The USA Homeowner Flooring Bible: LVP, Hardwood & Tile",
    subtitle: "Wear Layer Thickness, Moisture Barriers, Subfloor Prep, Acclimation & Transition Trim Details",
    categoryId: "flooring",
    categoryName: "Flooring",
    price: 12.99,
    originalPrice: 24.99,
    badge: "Essential",
    rating: 4.8,
    reviewsCount: 88,
    pagesCount: 58,
    fileSize: "13.5 MB",
    format: "Printable PDF (8.5\" x 11\" US Letter) + Floor Transition Profiles",
    publicationYear: 2026,
    coverImage: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80",
    description:
      "Avoid buckling floors, loud creaks, and peeling wear layers. This guide compares Luxury Vinyl Plank (LVP), Engineered Hardwood, Solid White Oak, and Porcelain Tile. Learn subfloor flatness tolerances (3/16\" over 10 ft), moisture testing protocols, and seamless room-to-room transitions.",
    highlights: [
      "LVP vs. Engineered Hardwood vs. Solid Oak: Price, water resistance, pet durability, and resale value.",
      "Wear Layer Decoded: 6 mil, 12 mil, 20 mil, and 30 mil commercial wear layer comparisons.",
      "Subfloor Leveling Checklist: Plywood joist deflection, concrete self-leveler, and moisture barriers (6-mil poly).",
      "Acclimation Rules: Moisture meter readings and 48-72 hour temperature equilibration before install.",
      "Transition Profiles: T-molding, reducer, end cap, and flush stair nose installation formulas.",
    ],
    tableOfContents: [
      { chapter: "Chapter 1: The Modern Flooring Landscape", pages: "pp. 4–12", summary: "Evaluating SPC/WPC rigid core vinyl, engineered hardwood veneers, and porcelain tile." },
      { chapter: "Chapter 2: Subfloor Inspection & Moisture Mitigation", pages: "pp. 13–24", summary: "Calcium chloride moisture tests, concrete slab RH testing, and eliminating squeaks in OSB/plywood." },
      { chapter: "Chapter 3: Luxury Vinyl Plank (LVP) Mastery", pages: "pp. 25–36", summary: "Click-lock vs. glue-down, attached IXPE acoustic underlayment, and expansion gap allowances (1/4\")." },
      { chapter: "Chapter 4: Hardwood Species, Stains & Sheens", pages: "pp. 37–48", summary: "White oak vs. Red oak, UV-cured urethane finishes, wire-brushed textures, and water-based sealers (Bona)." },
      { chapter: "Chapter 5: Transitions, Baseboards & Shoe Molding", pages: "pp. 49–58", summary: "Undercutting door jambs, installing flush flush-mount vents, and caulking baseboard quarter-round." },
    ],
    previewPages: [
      { title: "Wear Layer & Core Density Comparison", subtitle: "SPC rigid core vs. WPC vs. standard laminate", pageNumber: 14, highlightText: "For active households with pets or children, never specify less than a 20 mil commercial wear layer on vinyl plank.", imageUrl: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80" },
      { title: "Subfloor Flatness Tolerance Protocol", subtitle: "Checking 3/16\" variation across a 10-foot straightedge", pageNumber: 22, highlightText: "Subfloor dips greater than 3/16 inch will cause click-lock locking mechanisms to snap over time.", imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80" },
      { title: "Transition Trim Profiles", subtitle: "T-molding, reducers, and flush stair nosing details", pageNumber: 52, highlightText: "Never pin nail an LVP transition strip through the plank into the subfloor—floating floors must expand freely.", imageUrl: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80" },
    ],
    usSpecifics: [
      "National Wood Flooring Association (NWFA) installation guidelines.",
      "Janka hardness scale ratings for popular North American woods (White Oak, Hickory, Maple).",
      "ASTM F1869 / ASTM F2170 moisture testing thresholds for concrete slabs.",
    ],
    targetAudience: "Homeowners replacing whole-home flooring, DIY installers, real estate renovators, and flooring contractors.",
  },

  // 5. Painting & Colors
  {
    slug: "designer-paint-swatch-formula",
    title: "Designer Paint Swatch Formula: Sherwin-Williams & Benjamin Moore",
    subtitle: "The 40 Most Reliable Whole-Home Neutral & Accent Palettes, LRV Formulas, Primer & Sheen Rules",
    categoryId: "painting",
    categoryName: "Painting & Colors",
    price: 9.99,
    originalPrice: 19.99,
    badge: "Must-Have",
    rating: 4.9,
    reviewsCount: 165,
    pagesCount: 52,
    fileSize: "12.2 MB",
    format: "Printable PDF (8.5\" x 11\" US Letter) + Paint Code Swatch Sheets",
    publicationYear: 2026,
    coverImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    description:
      "Never buy the wrong paint color again. Curated by interior designers, this playbook delivers 40 battle-tested paint formulas from America's top two manufacturers (Sherwin-Williams and Benjamin Moore). Includes exact Light Reflectance Values (LRV), undertone breakdowns, north vs. south-facing light advice, and trim/ceiling pairing rules.",
    highlights: [
      "40 Proven Paint Formulas: Designer-favorite whites, warm greiges, earthy sages, and dramatic dark accents.",
      "Exact Color Codes: Sherwin-Williams (SW) and Benjamin Moore (BM) numbers and official formulations.",
      "Light Reflectance Value (LRV) Decoded: How to choose colors that won't look dingy in low-light rooms.",
      "The Sheen Selection Rulebook: Flat/Matte vs. Eggshell vs. Satin vs. Semi-Gloss across rooms and surfaces.",
      "Ceiling & Trim Harmonization: Why you should never paint ceilings with stock untinted white paint.",
    ],
    tableOfContents: [
      { chapter: "Chapter 1: The Physics of Light & Undertones", pages: "pp. 4–11", summary: "Decoding warm vs. cool undertones under 2700K vs 4000K LED lighting and morning north-facing light." },
      { chapter: "Chapter 2: The Top 10 Designer Whites & Off-Whites", pages: "pp. 12–21", summary: "SW Alabaster, SW Pure White, BM White Dove, BM Chantilly Lace, and BM Simply White dissected." },
      { chapter: "Chapter 3: The 10 Best Greiges & Warm Neutrals", pages: "pp. 22–31", summary: "SW Agreeable Gray, SW Accessible Beige, BM Revere Pewter, BM Pale Oak, and Edgecomb Gray formulas." },
      { chapter: "Chapter 4: Moody Accents: Navies, Sages & Charcoals", pages: "pp. 32–42", summary: "SW Iron Ore, SW Evergreen Fog, SW Naval, BM Hale Navy, and BM Salamander accent pairings." },
      { chapter: "Chapter 5: Sheen Guide, Primers & Prep Execution", pages: "pp. 43–52", summary: "PVA primer on fresh drywall, blocking tannin stains, and micro-fiber roller nap thickness." },
    ],
    previewPages: [
      { title: "The 10 Ultimate Whites Matrix", subtitle: "LRV, undertone family, and best trim partner", pageNumber: 16, highlightText: "BM Chantilly Lace (OC-65) has an LRV of 90.04 and zero yellow undertones, making it the purest crisp white for modern trim.", imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80" },
      { title: "North vs. South Light Exposure Map", subtitle: "Compensating for cool blue natural light", pageNumber: 26, highlightText: "North-facing rooms receive cool, shadowed light. Choose colors with yellow or red undertones (LRV 65+) to avoid muddy gray walls.", imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80" },
      { title: "Room-by-Room Sheen Selection Chart", subtitle: "Balancing scrubbability with surface glare", pageNumber: 46, highlightText: "Use Eggshell for living rooms/bedrooms, Satin for high-humidity bathrooms, and Semi-Gloss exclusively for trim and doors.", imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80" },
    ],
    usSpecifics: [
      "100% focused on US paint lines: Sherwin-Williams Emerald/SuperPaint and Benjamin Moore Aura/Regal Select.",
      "Includes paint gallon estimation formulas based on US square footage (350–400 sq. ft. per gallon).",
      "VOC regulations compliance guide across California (SCAQMD) and nationwide standards.",
    ],
    targetAudience: "Homeowners painting interior/exterior, interior designers, painters, and real estate staging professionals.",
  },

  // 6. Interior Living
  {
    slug: "whole-home-interior-styling-dimensions",
    title: "Whole-Home Interior Styling & Furniture Dimension Guide",
    subtitle: "Living Rooms, Master Suites, Rug Sizing Formulas, Lighting Heights & Open-Concept Flow",
    categoryId: "interior",
    categoryName: "Interior Living",
    price: 14.99,
    originalPrice: 29.99,
    badge: "Popular",
    rating: 4.9,
    reviewsCount: 104,
    pagesCount: 76,
    fileSize: "17.2 MB",
    format: "Printable PDF (8.5\" x 11\" US Letter) + Furniture Clearance Schematics",
    publicationYear: 2026,
    coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    description:
      "Eliminate guesswork in furniture layout and proportion. This illustrated handbook details exact rules for rug dimensions (8x10 vs 9x12 vs 10x14), sofa-to-coffee table clearances (14\"–18\"), TV viewing distance formulas, curtain hanging heights, and seamless transitions in open-concept great rooms.",
    highlights: [
      "The Rug Sizing Formula: Why floating rugs ruin rooms and how to size rugs for 8', 10', and 12' ceilings.",
      "Coffee Table & Sofa Spacing: Proper distances for walking ease and beverage reaching.",
      "Curtain Hanging Blueprint: Hanging rods high and wide to visually double window size.",
      "TV Sizing & Mounting Height: Optimal eye-level viewing height (42\" center) based on diagonal screen size.",
      "Open-Concept Great Room Zoning: Creating natural circulation pathways with console tables and lighting.",
    ],
    tableOfContents: [
      { chapter: "Chapter 1: Spatial Scale, Sightlines & Focal Points", pages: "pp. 4–15", summary: "Balancing visual weight and establishing a single architectural anchor in open-concept layouts." },
      { chapter: "Chapter 2: The Living Room Master Dimension Sheet", pages: "pp. 16–32", summary: "Sectional vs. sofa configurations, end table heights relative to sofa arms, and lighting layer placement." },
      { chapter: "Chapter 3: The Dining Room Blueprint", pages: "pp. 33–46", summary: "36\" chair push-back clearances, chandelier drop heights (30\"–34\" above table), and table sizing per guest." },
      { chapter: "Chapter 4: The Master Bedroom Sanctuary", pages: "pp. 47–60", summary: "King vs. Queen bed clearances (30\" minimum on sides), nightstand heights, and bed-foot benches." },
      { chapter: "Chapter 5: Art Placement, Window Drapery & Lighting", pages: "pp. 61–76", summary: "57\" on-center gallery hanging rule, floor-to-ceiling drapery stacking, and three-tier lighting layers." },
    ],
    previewPages: [
      { title: "The 8x10 vs. 9x12 Rug Sizing Guide", subtitle: "Front legs on vs. all legs on furniture placement", pageNumber: 20, highlightText: "At minimum, the front legs of all seating pieces must rest on the rug by at least 6 to 8 inches to unify the conversation area.", imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80" },
      { title: "Curtain Rod High & Wide Blueprint", subtitle: "Mounting rods 4-6 inches above frame and extending 8-12 inches beyond", pageNumber: 66, highlightText: "Never hang drapery rods directly on the window trim—mount them just below the ceiling crown to add dramatic visual height.", imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80" },
      { title: "TV Mounting Height Calculation", subtitle: "Eye-level viewing based on seating distance and screen size", pageNumber: 28, highlightText: "For comfortable viewing, the center of a 65\" television screen should be positioned 42 inches from the floor when seated.", imageUrl: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80" },
    ],
    usSpecifics: [
      "Standard US furniture dimensions (King 76\"x80\", Queen 60\"x80\", Standard sofa 84\"–90\").",
      "Standard US ceiling height design adjustments (8-ft, 9-ft, 10-ft, and vaulted two-story spaces).",
      "American lighting standard foot-candle recommendations for living and dining spaces.",
    ],
    targetAudience: "Homeowners furnishing a new home, interior decorators, realtors staging homes, and design enthusiasts.",
  },

  // 7. Exterior & Facade
  {
    slug: "curb-appeal-modern-exterior-transformation",
    title: "Curb Appeal & Modern Exterior Transformation Guide",
    subtitle: "James Hardie Siding, Board & Batten, Modern Stucco, Garage Doors, Sconces & Front Porticos",
    categoryId: "exterior",
    categoryName: "Exterior & Facade",
    price: 14.99,
    originalPrice: 29.99,
    badge: "High ROI",
    rating: 4.8,
    reviewsCount: 79,
    pagesCount: 68,
    fileSize: "15.9 MB",
    format: "Printable PDF (8.5\" x 11\" US Letter) + Exterior Elevation Elevation Guides",
    publicationYear: 2026,
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    description:
      "Transform your home's exterior to elevate curb appeal and maximize resale appraisal value. Learn how to combine James Hardie fiber cement siding with board-and-batten accents, coordinate roof shingle tones with body colors, upgrade to carriage or modern glass garage doors, and select scale-appropriate outdoor lanterns.",
    highlights: [
      "Siding Material Comparison: Fiber cement (Hardie), engineered wood (LP SmartSide), and smooth modern stucco.",
      "Board-and-Batten Spacing Formulas: 12\" vs 16\" batten spacing based on house elevation height.",
      "Front Door & Portico Enhancements: Sizing overhangs, gable timber brackets, and statement hardware.",
      "Garage Door Upgrade Guide: The single highest-ROI exterior improvement (often recouping 100%+ cost).",
      "Outdoor Lighting & House Number Placement: Scale rules for exterior lanterns (1/4 to 1/3 the height of the door).",
    ],
    tableOfContents: [
      { chapter: "Chapter 1: Exterior Architectural Massing & Rhythm", pages: "pp. 4–14", summary: "Correcting awkward window alignments and balancing two-story facade proportions." },
      { chapter: "Chapter 2: Siding Materials, Water Management & Hardie Trim", pages: "pp. 15–28", summary: "Housewrap, rainscreen gaps, flashing details over windows, and color-matched corner trim." },
      { chapter: "Chapter 3: Roof, Gutter & Soffit Harmonization", pages: "pp. 29–42", summary: "Architectural asphalt shingles, standing seam metal accents, and black seamless aluminum gutters." },
      { chapter: "Chapter 4: Front Entryway, Doors & Porticos", pages: "pp. 43–54", summary: "Solid wood vs. fiberglass insulated doors, multi-point locking systems, and front porch portico extensions." },
      { chapter: "Chapter 5: Garage Doors, Lighting, Hardscaping & Numbers", pages: "pp. 55–68", summary: "Insulated R-18 carriage doors, modern backlit house numbers, and dusk-to-dawn exterior lantern circuits." },
    ],
    previewPages: [
      { title: "Exterior Lantern Sizing Formula", subtitle: "Sizing sconces to 1/4 or 1/3 door height", pageNumber: 58, highlightText: "Most homeowners choose fixtures that are far too small. A standard 8-foot front door requires lanterns between 18 and 24 inches in height.", imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" },
      { title: "Roof & Siding Color Coordination Matrix", subtitle: "Pairing charcoal and weathered wood shingles with body colors", pageNumber: 36, highlightText: "Charcoal gray shingles pair best with off-white, light gray, and deep navy body siding without clashing warm/cool undertones.", imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80" },
      { title: "Board & Batten Spacing Proportions", subtitle: "12-inch vs. 16-inch vertical grid layouts", pageNumber: 22, highlightText: "For one-story ranch facades, space battens 12 inches on center; for two-story colonials or farmhouses, space battens 16 inches on center.", imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80" },
    ],
    usSpecifics: [
      "Cost vs. Value national averages for exterior home improvements.",
      "Wind load and fire rating specs (Class A fire rating for fiber cement siding).",
      "Standard US garage door dimensions (Single 8'x7' or 9'x7', Double 16'x7').",
    ],
    targetAudience: "Homeowners updating home exterior, investors flipping homes, and builders looking for curb appeal inspiration.",
  },

  // 8. Landscape & Garden
  {
    slug: "low-maintenance-american-landscape-architecture",
    title: "Low-Maintenance American Landscape Architecture",
    subtitle: "USDA Climate Zones 4–10, Drought-Tolerant Lawns, Drip Irrigation, Pavers & Flower Bed Layering",
    categoryId: "landscape",
    categoryName: "Landscape & Garden",
    price: 12.99,
    originalPrice: 24.99,
    badge: "Eco-Friendly",
    rating: 4.8,
    reviewsCount: 71,
    pagesCount: 60,
    fileSize: "14.1 MB",
    format: "Printable PDF (8.5\" x 11\" US Letter) + Plant Zone Selection Tables",
    publicationYear: 2026,
    coverImage: "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=800&q=80",
    description:
      "Design a breathtaking, low-maintenance yard that survives summer heatwaves and winter freezes. Tailored by USDA Hardiness Zones (Zones 4 through 10), this guide covers perennial garden layering, drought-tolerant turf alternatives (Zoysia, Bermuda, Fine Fescue), paver walkway installation, and smart drip irrigation systems.",
    highlights: [
      "USDA Hardiness Zone Map Guide: Selecting drought-tolerant perennials suited for your exact climate zone.",
      "The 3-Tier Flower Bed Formula: Tall background anchor shrubs, medium flowering perennials, and ground cover.",
      "Grass Sod Comparison: Warm-season (Bermuda, Zoysia, St. Augustine) vs. Cool-season (Kentucky Bluegrass, Fescue).",
      "Hardscape Paver Base Construction: 4\" compacted gravel base, 1\" bedding sand, and polymeric joint sand.",
      "Smart Drip Irrigation & Mulching: Retaining 70% more soil moisture and cutting water bills.",
    ],
    tableOfContents: [
      { chapter: "Chapter 1: Assessing Soil, Sunlight & USDA Zones", pages: "pp. 4–13", summary: "Soil pH testing, amending heavy clay or sandy soil, and calculating 6+ hours of full sun exposure." },
      { chapter: "Chapter 2: Foundation Plantings & Flower Bed Design", pages: "pp. 14–26", summary: "Curved garden borders, evergreen structural anchors, boxwoods, hydrangeas, and ornamental grasses." },
      { chapter: "Chapter 3: Turfgrass Selection, Seeding & Sodding", pages: "pp. 27–38", summary: "Comparing water requirements, shade tolerance, overseeding schedules, and aeration timing." },
      { chapter: "Chapter 4: Hardscaping Walkways, Edging & Retaining Walls", pages: "pp. 39–49", summary: "Concrete pavers, flagstone paths, steel edging installation, and gravity retaining walls under 4 feet." },
      { chapter: "Chapter 5: Low-Voltage Landscape Lighting & Irrigation", pages: "pp. 50–60", summary: "12V LED pathway lights, uplighting specimen trees, and programmable WiFi drip irrigation controllers." },
    ],
    previewPages: [
      { title: "USDA Plant Zone Selection Cheat Sheet", subtitle: "Top 5 low-maintenance shrubs per climate region", pageNumber: 8, highlightText: "Zone 5–7 climates thrive with Hydrangea Paniculata and Boxwood; Zone 8–10 climates require drought-tolerant Agave and Olive trees.", imageUrl: "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=800&q=80" },
      { title: "Paver Walkway Cross-Section Blueprint", subtitle: "Compacted base layer specifications that prevent settling", pageNumber: 42, highlightText: "Always compact 4 to 6 inches of crushed #21A gravel base with a mechanical plate compactor before adding 1 inch of screeded sand.", imageUrl: "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=800&q=80" },
      { title: "Low-Voltage 12V Lighting Layout", subtitle: "Pathway, uplighting, and wash light placement formulas", pageNumber: 54, highlightText: "Space pathway lights 8 to 10 feet apart in alternating zig-zag fashion to create natural ambient pools of light.", imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80" },
    ],
    usSpecifics: [
      "Based on USDA Hardiness Zone standards (Zones 4 through 10 across the continental US).",
      "Native North American plant species that require minimal fertilizer and pesticide use.",
      "US water conservation rebates and smart irrigation controller standards (EPA WaterSense).",
    ],
    targetAudience: "Homeowners wishing to improve yard landscaping, DIY gardeners, landscapers, and new construction buyers.",
  },

  // 9. Patio & Decking
  {
    slug: "backyard-living-patios-decks-outdoor-kitchens",
    title: "Backyard Living: Patios, Trex Decks & Outdoor Kitchens",
    subtitle: "Composite vs. Pressure-Treated Wood, Covered Pergolas, Propane Clearance Specs & Fire Pits",
    categoryId: "patio",
    categoryName: "Patio & Decking",
    price: 14.99,
    originalPrice: 29.99,
    badge: "Trending",
    rating: 4.9,
    reviewsCount: 82,
    pagesCount: 70,
    fileSize: "16.8 MB",
    format: "Printable PDF (8.5\" x 11\" US Letter) + Structural Deck Framing Guides",
    publicationYear: 2026,
    coverImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    description:
      "Turn your backyard into an outdoor entertainment oasis. This detailed guide covers Trex composite vs. pressure-treated wood decking costs, IRC deck joist span tables, ledger board flashing to prevent house rot, covered pergola attachment, outdoor kitchen island clearances, and fire pit safety codes.",
    highlights: [
      "Trex Composite vs. Pressure-Treated Wood: 25-year cost analysis, heat retention, and scratch resistance.",
      "Deck Structural Safety: Ledger board bolt spacing, Simpson Strong-Tie brackets, and frost depth footing sizes.",
      "Covered Pergolas & Pavilions: Freestanding vs. house-attached roof load calculations and hurricane tie-downs.",
      "Outdoor Kitchen Blueprints: Stainless grill cutouts, non-combustible cement backerboard, and propane vents.",
      "Fire Pit Clearances: Minimum 10-foot distances from property lines, overhangs, and wooden structures.",
    ],
    tableOfContents: [
      { chapter: "Chapter 1: Backyard Zoning & Entertainment Layouts", pages: "pp. 4–14", summary: "Designing dedicated zones for outdoor dining, lounge seating, sunbathing, and cooking." },
      { chapter: "Chapter 2: Deck Framing, Footings & Ledger Safety", pages: "pp. 15–30", summary: "Digging below the frost line, helical piles vs concrete sonotubes, joist spans, and ledger flashing." },
      { chapter: "Chapter 3: Decking Boards, Fasteners & Railings", pages: "pp. 31–44", summary: "Hidden clip systems, picture-frame border boards, cable railings vs aluminum balusters, and stair rise/run." },
      { chapter: "Chapter 4: Outdoor Kitchens & Bar Counters", pages: "pp. 45–56", summary: "Marine-grade stainless appliances, gas line rough-in, outdoor refrigerator GFCI circuits, and granite tops." },
      { chapter: "Chapter 5: Fire Pits, Heaters & Shade Pergolas", pages: "pp. 57–70", summary: "Natural gas vs propane vs wood-burning fire pits, infrared patio heater spacing, and motorize louvered pergolas." },
    ],
    previewPages: [
      { title: "Deck Joist Span & Cantilever Table", subtitle: "2x8 vs 2x10 joist spacing at 12\" and 16\" on-center", pageNumber: 22, highlightText: "Composite decking requires maximum 16-inch joist spacing for straight runs, and 12-inch spacing for diagonal herringbone layouts.", imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80" },
      { title: "Ledger Board Flashing Detail", subtitle: "Preventing water rot behind house siding", pageNumber: 28, highlightText: "Always install Z-flashing tucked behind the weather-resistant barrier (WRB) and over the ledger board with galvanized lag screws.", imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80" },
      { title: "Outdoor Kitchen Cutout Specifications", subtitle: "Non-combustible framing and gas vent placement", pageNumber: 48, highlightText: "Outdoor grill islands require non-combustible steel stud framing and dual high/low vents to prevent propane gas pooling.", imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80" },
    ],
    usSpecifics: [
      "Conforms to IRC (International Residential Code) Section R507 Exterior Decks.",
      "Footing depth tables aligned with US state frost line depths (12\" to 48\" frost depth).",
      "NFPA 54 National Fuel Gas Code clearances for outdoor gas grills and fire pits.",
    ],
    targetAudience: "Homeowners adding an outdoor living area, deck builders, patio contractors, and DIY outdoor creators.",
  },
];
