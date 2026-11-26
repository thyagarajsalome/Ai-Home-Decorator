import { Metadata } from "next";
import Link from "next/link";
import USHomeCalculators from "@/components/USHomeCalculators";

export const metadata: Metadata = {
  title: "Free US Home Lighting & Paint Calculators | AI Home Decorator",
  description:
    "Calculate exact room lumens, recessed LED can spacing, and interior paint gallons & US project costs in seconds. Built for American homeowners with imperial measurements.",
  alternates: {
    canonical: "https://aihomedecorator.com/tools",
  },
  openGraph: {
    title: "Free US Home Lighting & Paint Calculators | AI Home Decorator",
    description:
      "Calculate exact room lumens, recessed LED can spacing, and interior paint gallons & project budgets for US homes.",
    url: "https://aihomedecorator.com/tools",
    siteName: "AI Home Decorator",
    images: [
      {
        url: "/images/showcase/lighting-after.jpg",
        width: 1200,
        height: 630,
        alt: "US Home Lighting and Paint Calculators",
      },
    ],
    type: "website",
  },
};

export default function ToolsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "US Home Lighting & Paint Calculators",
    url: "https://aihomedecorator.com/tools",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Interactive lighting lumen/recessed can spacing calculator and interior paint gallon & cost estimator for US homeowners.",
  };

  return (
    <main className="min-h-screen bg-[#FFFBF7] text-[#382A22] py-10 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-[#7A5C3A]">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[#E87A1E]">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="font-bold text-[#4A2508]">US Home Calculators</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEEDDF] border border-[#F8B98B] text-[#8D3D10] text-xs font-bold mb-3">
            <span>🛠️</span>
            <span>Free Homeowner Planning Tools</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4A2508] font-heading tracking-tight">
            US Home Lighting &amp; Paint Calculators
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#7A5C3A] leading-relaxed">
            Skip guesswork at Home Depot or Lowe&apos;s. Size your recessed LED grid, target foot-candles, paint gallons, and realistic US contractor budgets before starting your project.
          </p>
        </header>

        {/* Interactive Calculators */}
        <USHomeCalculators />

        {/* Cross-Links to Tips, Cities & Store Guides */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/store/home-lighting-design-guide-usa"
            className="rounded-2xl border border-[#F0E8D8] bg-white p-6 shadow-xs hover:border-[#E87A1E] transition-all group"
          >
            <div className="text-2xl mb-2">💡</div>
            <h2 className="text-lg font-bold text-[#4A2508] group-hover:text-[#E87A1E]">
              Home Lighting Design Guide (USA)
            </h2>
            <p className="mt-1.5 text-xs text-[#7A5C3A] leading-relaxed">
              Get our 9-page printable PDF with floor-plan wiring layers, Kelvin charts, and dimmer specs.
            </p>
            <span className="mt-3 inline-block text-xs font-bold text-[#E87A1E]">
              View PDF Guide →
            </span>
          </Link>

          <Link
            href="/store/home-painting-guide-usa"
            className="rounded-2xl border border-[#F0E8D8] bg-white p-6 shadow-xs hover:border-[#E87A1E] transition-all group"
          >
            <div className="text-2xl mb-2">🎨</div>
            <h2 className="text-lg font-bold text-[#4A2508] group-hover:text-[#E87A1E]">
              Home Painting Guide (USA)
            </h2>
            <p className="mt-1.5 text-xs text-[#7A5C3A] leading-relaxed">
              12 illustrated pages covering Sherwin-Williams &amp; Benjamin Moore palettes, undertones, and sheen selection.
            </p>
            <span className="mt-3 inline-block text-xs font-bold text-[#E87A1E]">
              View PDF Guide →
            </span>
          </Link>

          <Link
            href="/usa"
            className="rounded-2xl border border-[#F0E8D8] bg-white p-6 shadow-xs hover:border-[#E87A1E] transition-all group"
          >
            <div className="text-2xl mb-2">🇺🇸</div>
            <h2 className="text-lg font-bold text-[#4A2508] group-hover:text-[#E87A1E]">
              50 US City Cost &amp; Style Guides
            </h2>
            <p className="mt-1.5 text-xs text-[#7A5C3A] leading-relaxed">
              See localized labor rates, climate tips, and regional color palettes for your US metro area.
            </p>
            <span className="mt-3 inline-block text-xs font-bold text-[#E87A1E]">
              Browse US Cities →
            </span>
          </Link>
        </section>
      </div>
    </main>
  );
}
