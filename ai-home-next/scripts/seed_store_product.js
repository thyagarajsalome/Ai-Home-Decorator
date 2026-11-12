const { createClient } = require("@supabase/supabase-js");

const url = "https://fhplqcddcvwyqflgbfaj.supabase.co";
const serviceRoleKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZocGxxY2RkY3Z3eXFmbGdiZmFqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTc5MzA3MywiZXhwIjoyMDc3MzY5MDczfQ.9IuaMuWCLvKDFK22C7fBNPcgh3_wtwsZBgi7gmF6XqU";

const supabase = createClient(url, serviceRoleKey);

async function seed() {
  const product = {
    slug: "american-home-remodeling-playbook",
    title: "The 2026 American Home Remodeling Playbook",
    subtitle:
      "The Complete Contractor, Permit, Budgeting & High-ROI Renovation Blueprint for US Homeowners",
    category_id: "home-improvements",
    category_name: "Home Improvements",
    price: 19.99,
    original_price: 39.99,
    badge: "Featured Test PDF",
    rating: 4.9,
    reviews_count: 148,
    pages_count: 84,
    file_size: "18.4 MB",
    format: "Printable PDF (8.5\" x 11\" US Letter) + Interactive Digital Checklist",
    publication_year: 2026,
    cover_image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    pdf_file_key: "ebooks/american-home-remodeling-playbook-2026.pdf",
    description:
      "Avoid costly remodel mistakes with the ultimate US homeowner's renovation blueprint. Written for American homeowners and investors, this playbook walks you through hiring licensed general contractors, decoding city permits, managing draw schedules, and prioritizing projects with the highest return on appraisal value.",
    highlights: [
      "City Building Permit Guide: When you legally need a permit and how to pull it without project delays.",
      "Contractor Hiring Cheat Sheet with 21 non-negotiable questions to ask before signing.",
      "Room-by-Room Cost Breakdown: National US averages per square foot across all 50 states.",
      "Escrow & Draw Payment Schedule template to protect your money against contractor default.",
      "2026 High-ROI Renovation Checklist: Which projects recoup 80%+ at appraisal.",
    ],
    table_of_contents: [
      {
        chapter: "Chapter 1: Pre-Remodel Assessment & Budget Sizing",
        pages: "pp. 4-16",
        summary: "Contingency reserves and structural vs cosmetic priority.",
      },
      {
        chapter: "Chapter 2: US Building Permits & Municipal Codes",
        pages: "pp. 17-28",
        summary: "Navigating IRC codes, historic districts, and HOA review boards.",
      },
      {
        chapter: "Chapter 3: Vetting & Hiring Licensed Contractors",
        pages: "pp. 29-45",
        summary: "Contract templates, lien waivers, and milestone billing.",
      },
      {
        chapter: "Chapter 4: Room-by-Room Cost & ROI Benchmarks",
        pages: "pp. 46-68",
        summary: "Detailed square-foot price models across US regions.",
      },
      {
        chapter: "Chapter 5: Final Punch List & Closing Protocols",
        pages: "pp. 69-84",
        summary: "50-point inspection before final payment release.",
      },
    ],
    preview_pages: [
      {
        title: "Permit vs. No-Permit Matrix",
        subtitle: "IRC municipal requirements",
        pageNumber: 18,
        highlightText:
          "Never let a contractor pull permits under your personal name as owner-builder without understanding the liability risks.",
        imageUrl:
          "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Contractor Bid Comparison Sheet",
        subtitle: "Line-item bid evaluation formula",
        pageNumber: 34,
        highlightText:
          "Line-item bids must separate labor hours, allowance allocations, and subcontractor margins.",
        imageUrl:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      },
    ],
    us_specifics: [
      "Compliant with International Residential Code (IRC) standards.",
      "US Dollar ($) pricing benchmarks based on nationwide contractor indices.",
      "Standard US building material specifications (2x4 / 2x6 framing, drywall gauges, Romex wire).",
    ],
    target_audience:
      "US Homeowners planning a major renovation, real estate investors, and DIYers managing subcontractors.",
    is_published: true,
  };

  const { data, error } = await supabase
    .from("store_products")
    .upsert(product, { onConflict: "slug" })
    .select();

  if (error) {
    console.error("Seed error:", error.message);
  } else {
    console.log("✅ Successfully seeded test product:", data[0].title);
  }
}

seed();
