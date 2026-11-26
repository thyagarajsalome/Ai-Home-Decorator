import React from "react";
import { Metadata } from "next";
import { ELEMENT_CATEGORIES } from "@/constants";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Generate paths for all category and style combinations
export function generateStaticParams() {
  const params: { category: string; style: string }[] = [];

  ELEMENT_CATEGORIES.forEach((category) => {
    category.choices.forEach((choice) => {
      const styleSlug = choice.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      params.push({
        category: category.id,
        style: styleSlug,
      });
    });
  });

  return params;
}

// Generate SEO metadata dynamically based on the current slug
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; style: string }>;
}): Promise<Metadata> {
  const { category, style } = await params;

  const catObj = ELEMENT_CATEGORIES.find((c) => c.id === category);
  if (!catObj) return {};

  const styleObj = catObj.choices.find(
    (c) =>
      c.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") === style
  );

  if (!styleObj) return {};

  const title = `${styleObj.name} ${catObj.name} - Interior Design Guide & Ideas | AI Home Decorator`;
  const description = `Explore ${styleObj.name} ${catObj.name.toLowerCase()} design ideas, color palettes, material pairings, and expert remodeling tips tailored for American homes.`;

  const pageUrl = `https://aihomedecorator.com/design/${category}/${style}`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      images: styleObj.thumbnail
        ? [
            {
              url: styleObj.thumbnail,
              width: 800,
              height: 600,
              alt: `${styleObj.name} ${catObj.name} Example`,
            },
          ]
        : [
            {
              url: "/brand/promo-empty-to-extraordinary.jpg",
              width: 800,
              height: 600,
              alt: "AI Home Decorator",
            },
          ],
    },
  };
}

export default async function ProgrammaticSEODesignPage({
  params,
}: {
  params: Promise<{ category: string; style: string }>;
}) {
  const { category, style } = await params;

  const catObj = ELEMENT_CATEGORIES.find((c) => c.id === category);
  if (!catObj) return notFound();

  const styleObj = catObj.choices.find(
    (c) =>
      c.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") === style
  );

  if (!styleObj) return notFound();

  // Related styles in same category
  const siblingStyles = catObj.choices
    .filter((c) => c.name !== styleObj.name)
    .slice(0, 6)
    .map((c) => ({
      name: c.name,
      slug: c.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      thumbnail: c.thumbnail,
    }));

  const highResImage = styleObj.thumbnail
    ? styleObj.thumbnail.replace(/w=\d+/, "w=1200")
    : "/brand/promo-empty-to-extraordinary.jpg";

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFBF7] text-[#382A22]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex-grow">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-[#7A4B27]">
          <ol className="flex items-center space-x-2 flex-wrap">
            <li>
              <Link href="/" className="hover:text-[#E87A1E]">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/#styles" className="hover:text-[#E87A1E]">Styles</Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-[#4A2508]">{catObj.name}</li>
            <li>/</li>
            <li className="font-bold text-[#E87A1E]">{styleObj.name}</li>
          </ol>
        </nav>

        {/* Hero Headline */}
        <div className="mb-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEEDDF] border border-[#F8B98B] text-[#8D3D10] text-xs font-bold mb-4 shadow-xs">
            <span>✨</span>
            <span>{catObj.name} Inspiration</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4A2508] mb-4 font-heading">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E87A1E] to-[#D46513]">
              {styleObj.name}
            </span>{" "}
            {catObj.name} Design
          </h1>
          <p className="text-sm sm:text-base text-[#5C3314] leading-relaxed max-w-2xl mx-auto">
            Transform any room into a breathtaking <strong>{styleObj.name}</strong> space. Explore signature {styleObj.name.toLowerCase()} furniture silhouettes, finishes, and lighting ratios to plan your remodel with confidence.
          </p>
        </div>

        {/* Main Feature Showcase & Resource Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 bg-white border border-[#F1E4D5] rounded-3xl p-6 sm:p-10 shadow-sm">
          
          {/* Left Column: Image Preview */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg border-2 border-[#FCD7BA] bg-[#FEEDDF]">
              <Image
                src={highResImage}
                alt={`${styleObj.name} ${catObj.name} Render Example`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
                priority
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-xs font-black text-[#4A2508] shadow-sm">
                ⭐ {styleObj.name} Aesthetic
              </div>
            </div>
          </div>

          {/* Right Column: Style Guide & Planning Tools */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-black text-[#E87A1E] uppercase tracking-wider">
              {catObj.name} Design Blueprint
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#4A2508] mt-1 mb-3 font-heading">
              Plan Your {styleObj.name} {catObj.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#6D5D53] leading-relaxed mb-6">
              Bring the {styleObj.name} look into your home without costly guesswork. Combine balanced room lighting, cohesive wall undertones, and signature material textures suited to your floor plan.
            </p>

            {/* Feature Bullets */}
            <div className="space-y-2.5 mb-8 text-xs font-semibold text-[#5C3314]">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#FEEDDF] text-[#E87A1E] flex items-center justify-center font-bold">✓</span>
                <span>Layered ambient, task &amp; accent lighting specifications</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#FEEDDF] text-[#E87A1E] flex items-center justify-center font-bold">✓</span>
                <span>Authentic {styleObj.name.toLowerCase()} furniture, lighting &amp; textiles</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#FEEDDF] text-[#E87A1E] flex items-center justify-center font-bold">✓</span>
                <span>Free US lumen &amp; paint gallon estimators for exact budgeting</span>
              </div>
            </div>

            {/* Internal Action Links */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/tools"
                className="btn-brand-primary px-6 py-3 text-xs sm:text-sm font-black text-center shadow-md"
              >
                Open Lighting &amp; Paint Calculators →
              </Link>
              <Link
                href="/tips"
                className="btn-brand-secondary px-5 py-3 text-xs sm:text-sm font-bold text-center"
              >
                Browse Expert Tips →
              </Link>
            </div>
          </div>

        </div>

        {/* SEO FAQ Section */}
        <div className="mb-16 bg-white border border-[#F1E4D5] rounded-3xl p-8 sm:p-10 shadow-xs">
          <h2 className="text-2xl font-black text-[#4A2508] mb-6 font-heading">
            Frequently Asked Questions about {styleObj.name} {catObj.name}
          </h2>
          
          <div className="space-y-6 text-sm">
            <div className="border-b border-[#F1E4D5] pb-5">
              <h3 className="text-base font-bold text-[#4A2508] mb-2">
                What defines the {styleObj.name} design aesthetic?
              </h3>
              <p className="text-xs sm:text-sm text-[#6D5D53] leading-relaxed">
                The {styleObj.name} aesthetic focuses on {styleObj.promptSuffix || "harmonious textures, balanced lighting, and purposeful layout"}. Our AI model has been trained on thousands of architectural photographs to realistically reproduce the proportions, materials, and accents that make this style distinct.
              </p>
            </div>
            
            <div className="border-b border-[#F1E4D5] pb-5">
              <h3 className="text-base font-bold text-[#4A2508] mb-2">
                What lighting temperature works best for {styleObj.name} {catObj.name.toLowerCase()}?
              </h3>
              <p className="text-xs sm:text-sm text-[#6D5D53] leading-relaxed">
                Most residential {styleObj.name.toLowerCase()} spaces perform best with 2700K to 3000K high-CRI (90+) dimmable LEDs. Warm white tones highlight natural wood and textile finishes without washing out wall colors. Use our{" "}
                <Link href="/tools" className="text-[#E87A1E] font-semibold hover:underline">
                  free room lighting calculator
                </Link>{" "}
                to size your lumens and recessed can spacing.
              </p>
            </div>
            
            <div>
              <h3 className="text-base font-bold text-[#4A2508] mb-2">
                How can I budget paint and lighting for a {styleObj.name} remodel?
              </h3>
              <p className="text-xs sm:text-sm text-[#6D5D53] leading-relaxed">
                Start by measuring your room&apos;s square footage and ceiling height to estimate paint gallons and recessed fixture spacing, then review our{" "}
                <Link href="/store" className="text-[#E87A1E] font-semibold hover:underline">
                  US Home Lighting &amp; Painting Design Guides
                </Link>{" "}
                for room-by-room checklists and material specs.
              </p>
            </div>
          </div>
        </div>

        {/* Related Styles Internal Linking */}
        {siblingStyles.length > 0 && (
          <div className="pt-8 border-t border-[#F1E4D5]">
            <h2 className="text-xl font-black text-[#4A2508] mb-6 font-heading">
              More {catObj.name} Styles to Explore
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {siblingStyles.map((sibling) => (
                <Link
                  key={sibling.slug}
                  href={`/design/${category}/${sibling.slug}`}
                  className="p-3 rounded-xl bg-white border border-[#F1E4D5] hover:border-[#E87A1E] hover:bg-[#FEEDDF]/40 transition-all text-center flex flex-col items-center group shadow-xs"
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#FEEDDF] mb-2">
                    <Image
                      src={sibling.thumbnail || "/brand/logo.jpg"}
                      alt={sibling.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-[#4A2508] group-hover:text-[#E87A1E] line-clamp-2">
                    {sibling.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
