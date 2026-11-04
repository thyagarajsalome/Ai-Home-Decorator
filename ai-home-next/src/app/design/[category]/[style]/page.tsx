import React from "react";
import { Metadata } from "next";
import { ELEMENT_CATEGORIES } from "@/constants";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.aihomedecorator.twa";

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

  const title = `${styleObj.name} ${catObj.name} - AI Interior Design & Ideas | AI Home Decorator`;
  const description = `Reimagine your space with a stunning ${styleObj.name} ${catObj.name.toLowerCase()}. Download the AI Home Decorator Android app to visualize ${styleObj.name} layouts, furniture, and colors instantly.`;

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
            Transform any room into a breathtaking <strong>{styleObj.name}</strong> space. Our native mobile app preserves the exact layout and dimensions of your room while applying realistic {styleObj.name.toLowerCase()} furniture, finishes, and lighting.
          </p>
        </div>

        {/* Main Feature Showcase & App Download CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 bg-white border border-[#F1E4D5] rounded-3xl p-6 sm:p-10 shadow-sm">
          
          {/* Left Column: Image Preview */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg border-2 border-[#FCD7BA] bg-[#FEEDDF]">
              <Image
                src={styleObj.thumbnail || "/brand/promo-empty-to-extraordinary.jpg"}
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

          {/* Right Column: Style Guide & Direct App Download */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-black text-[#E87A1E] uppercase tracking-wider">
              Native Android App Feature
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#4A2508] mt-1 mb-3 font-heading">
              Redesign Your Room in {styleObj.name} Style
            </h2>
            <p className="text-xs sm:text-sm text-[#6D5D53] leading-relaxed mb-6">
              Skip $3,000+ interior design agency consultations. With AI Home Decorator, you snap a photo with your phone camera, tap &ldquo;{styleObj.name}&rdquo;, and receive instant photorealistic design variations.
            </p>

            {/* Feature Bullets */}
            <div className="space-y-2.5 mb-8 text-xs font-semibold text-[#5C3314]">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#FEEDDF] text-[#E87A1E] flex items-center justify-center font-bold">✓</span>
                <span>Structural layout and room depth preserved</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#FEEDDF] text-[#E87A1E] flex items-center justify-center font-bold">✓</span>
                <span>Realistic {styleObj.name.toLowerCase()} furniture, lighting &amp; textiles</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#FEEDDF] text-[#E87A1E] flex items-center justify-center font-bold">✓</span>
                <span>Interactive Before/After slider on Android</span>
              </div>
            </div>

            {/* Google Play Download Button */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-200 hover:scale-105 inline-block shadow-md"
              >
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Download on Google Play"
                  className="h-14 w-auto"
                />
              </a>
              <div className="text-left text-xs text-[#7A4B27]">
                <div className="font-bold text-[#4A2508]">4.9 ★★★★★ Rating</div>
                <div>Free to download on Google Play</div>
              </div>
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
                Can I customize the {styleObj.name} look in the mobile app?
              </h3>
              <p className="text-xs sm:text-sm text-[#6D5D53] leading-relaxed">
                Yes! When using the AI Home Decorator Android app, you can select {styleObj.name} or add your own custom prompts (e.g. &ldquo;add warm oak floating shelves&rdquo; or &ldquo;brass hardware with emerald tiles&rdquo;) to fine-tune your visualization.
              </p>
            </div>
            
            <div>
              <h3 className="text-base font-bold text-[#4A2508] mb-2">
                How does the AI Home Decorator mobile app work?
              </h3>
              <p className="text-xs sm:text-sm text-[#6D5D53] leading-relaxed">
                Simply install the app from Google Play, snap a photo of your empty or furnished room, pick {styleObj.name}, and receive instant photorealistic redesigns within seconds with an interactive before/after slider.
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
