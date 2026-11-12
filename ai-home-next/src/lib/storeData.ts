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
    description: "Browse available American home improvement and design playbooks.",
  },
  {
    id: "home-improvements",
    name: "Home Improvements",
    icon: "🔨",
    description: "General renovation playbooks, contractor hiring contracts, permits, and ROI breakdowns.",
  },
];

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    slug: "american-home-remodeling-playbook",
    title: "The 2026 American Home Remodeling Playbook",
    subtitle: "The Complete Contractor, Permit, Budgeting & High-ROI Renovation Blueprint for US Homeowners",
    categoryId: "home-improvements",
    categoryName: "Home Improvements",
    price: 19.99,
    originalPrice: 39.99,
    badge: "Featured Test PDF",
    rating: 4.6,
    reviewsCount: 0,
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
];
