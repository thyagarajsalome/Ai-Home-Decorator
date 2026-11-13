import { Metadata } from "next";
import Link from "next/link";
import StorefrontClient from "./StorefrontClient";
import { getPublishedStoreProducts } from "@/lib/storeService";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Design Store — American Home Improvement & Renovation PDF Playbooks (2026)",
  description:
    "Curated digital design guides, checklists, and blueprints for US homeowners. Kitchen layouts, spa bathrooms, Sherwin-Williams & Benjamin Moore paint formulas, flooring, and curb appeal.",
  alternates: {
    canonical: "https://aihomedecorator.com/store",
  },
  openGraph: {
    title: "AI Home Decorator Design Store — Renovation & Design PDF Playbooks",
    description:
      "Instant printable PDF books & renovation blueprints tailored for American homeowners. Kitchens, bathrooms, paint swatches, LVP flooring, and curb appeal.",
    url: "https://aihomedecorator.com/store",
    siteName: "AI Home Decorator",
    images: [
      {
        url: "https://aihomedecorator.com/brand/promo-empty-to-extraordinary.jpg",
        width: 1200,
        height: 630,
        alt: "AI Home Decorator Design Store",
      },
    ],
  },
};

export default async function StorePage() {
  const products = await getPublishedStoreProducts();

  // Structured Data: ItemList of Products
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Home Decorator Digital Design Store",
    description: "Curated digital home improvement and interior design PDF playbooks for US homeowners.",
    itemListElement: products.map((product, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": ["Product", "Book"],
        name: product.title,
        description: product.subtitle,
        image: product.coverImage,
        bookFormat: "https://schema.org/EBook",
        numberOfPages: product.pagesCount,
        inLanguage: "en-US",
        offers: {
          "@type": "Offer",
          price: product.price.toFixed(2),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `https://aihomedecorator.com/store/${product.slug}`,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <main className="min-h-screen bg-[#FFFBF7]">
        {/* ── Top Bar (Breadcrumbs) ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <nav className="text-sm text-[#7A5C3A]">
            <Link href="/" className="hover:text-[#E87A1E]">
              Home
            </Link>
            <span className="mx-2">›</span>
            <span className="font-medium text-[#4A2508]">Design Store</span>
          </nav>
        </div>

        {/* ── Hero Header ── */}
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-[#E87A1E]/10 text-[#E87A1E] mb-4 uppercase tracking-wider">
            <span>🇺🇸</span>
            <span>American Home Improvement &amp; Design Library</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#4A2508] mb-4 tracking-tight font-heading">
            Architectural Playbooks &amp; Renovation Blueprints
          </h1>
          <p className="max-w-3xl mx-auto text-[#6D5D53] text-base md:text-lg leading-relaxed mb-6">
            Everything you need to remodel, paint, decorate, and upgrade your home. Curated dimension cheat sheets, contractor bid templates, Sherwin-Williams swatches, and high-ROI renovation formulas.
          </p>

          {/* Trust Guarantees Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-bold text-[#5C3314]">
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 text-base">⚡</span>
              <span>Instant PDF Download</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#E87A1E] text-base">📐</span>
              <span>Standard US Dimensions &amp; Codes (IRC)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-600 text-base">🎨</span>
              <span>Official US Paint Swatches (SW &amp; BM)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-600 text-base">🛡️</span>
              <span>30-Day Money-Back Guarantee</span>
            </div>
          </div>
        </header>

        {/* ── Storefront Interactive Section ── */}
        <StorefrontClient initialProducts={products} />

        {/* ── Why Our Guides Section ── */}
        <section className="bg-white py-16 border-t border-[#F0E8D8] mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-black text-[#4A2508] font-heading mb-3">
                Built Specifically for American Homes
              </h2>
              <p className="text-sm text-[#7A5C3A]">
                Unlike generic online design blogs, our playbooks are engineered with real US contractor specifications and brand standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#FFFBF7] p-8 rounded-3xl border border-[#F0E8D8]">
                <div className="w-12 h-12 rounded-2xl bg-[#FEEDDF] text-[#E87A1E] text-2xl flex items-center justify-center font-bold mb-5">
                  📏
                </div>
                <h3 className="font-heading font-bold text-lg text-[#4A2508] mb-2">
                  True US Dimensions (Feet &amp; Inches)
                </h3>
                <p className="text-xs text-[#6D5D53] leading-relaxed">
                  Every cabinet clearance, rug proportion, island overhang, and shower slope is specified in standard US imperial dimensions (inches &amp; feet).
                </p>
              </div>

              <div className="bg-[#FFFBF7] p-8 rounded-3xl border border-[#F0E8D8]">
                <div className="w-12 h-12 rounded-2xl bg-[#FEEDDF] text-[#E87A1E] text-2xl flex items-center justify-center font-bold mb-5">
                  🏬
                </div>
                <h3 className="font-heading font-bold text-lg text-[#4A2508] mb-2">
                  Materials You Can Actually Buy
                </h3>
                <p className="text-xs text-[#6D5D53] leading-relaxed">
                  Referencing products stocked at Home Depot, Lowe&apos;s, Floor &amp; Decor, Sherwin-Williams, and Benjamin Moore. No untraceable overseas samples.
                </p>
              </div>

              <div className="bg-[#FFFBF7] p-8 rounded-3xl border border-[#F0E8D8]">
                <div className="w-12 h-12 rounded-2xl bg-[#FEEDDF] text-[#E87A1E] text-2xl flex items-center justify-center font-bold mb-5">
                  📋
                </div>
                <h3 className="font-heading font-bold text-lg text-[#4A2508] mb-2">
                  Printable &amp; Tablet-Friendly
                </h3>
                <p className="text-xs text-[#6D5D53] leading-relaxed">
                  Formatted in crisp high-resolution 8.5&quot; × 11&quot; US Letter. Take printouts directly to the job site or annotate on your iPad / tablet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-black text-[#4A2508] text-center mb-8 font-heading">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="bg-white rounded-2xl p-6 border border-[#F0E8D8] group">
              <summary className="font-bold text-sm sm:text-base text-[#4A2508] cursor-pointer list-none flex justify-between items-center">
                <span>How do I receive my PDF guide after purchase?</span>
                <span className="text-[#E87A1E] font-bold text-lg group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-[#6D5D53] leading-relaxed">
                Immediately after purchase, you will receive an instant download link on the confirmation page, plus a permanent secure copy sent directly to your email address. You have lifetime access and will receive all future 2026 edition updates free.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 border border-[#F0E8D8] group">
              <summary className="font-bold text-sm sm:text-base text-[#4A2508] cursor-pointer list-none flex justify-between items-center">
                <span>What devices can I read these guides on?</span>
                <span className="text-[#E87A1E] font-bold text-lg group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-[#6D5D53] leading-relaxed">
                All guides are provided in universal high-resolution PDF format. They open natively on iPhone, iPad, Android tablets, Mac, Windows, and Kindle readers. They are also 100% formatted for high-resolution color printing on standard US Letter paper.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 border border-[#F0E8D8] group">
              <summary className="font-bold text-sm sm:text-base text-[#4A2508] cursor-pointer list-none flex justify-between items-center">
                <span>Are the building codes and dimensions accurate for my state?</span>
                <span className="text-[#E87A1E] font-bold text-lg group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-[#6D5D53] leading-relaxed">
                Yes. All structural, electrical, and plumbing guidance adheres to the International Residential Code (IRC), National Electrical Code (NEC), and Uniform Plumbing Code (UPC), which form the legal baseline for residential construction across US states.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 border border-[#F0E8D8] group">
              <summary className="font-bold text-sm sm:text-base text-[#4A2508] cursor-pointer list-none flex justify-between items-center">
                <span>What is the 30-Day Money-Back Guarantee?</span>
                <span className="text-[#E87A1E] font-bold text-lg group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-[#6D5D53] leading-relaxed">
                If any guide does not save you money on your remodel, help you choose the right materials, or deliver clear actionable value, simply email contactaihomedecorator@gmail.com within 30 days of purchase for a 100% prompt refund. No questions asked.
              </p>
            </details>
          </div>
        </section>
      </main>
    </>
  );
}
