import { notFound } from "next/navigation";
import { supabase } from "@/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import InteractiveBeforeAfter from "@/components/InteractiveBeforeAfter";
import CityRegionalShowcase from "@/components/CityRegionalShowcase";
import LeadCaptureSection from "@/components/LeadCaptureSection";
import USHomeCalculators from "@/components/USHomeCalculators";
import { getStateCostProfile } from "@/lib/cityMetrics";

export const revalidate = 86400;

const MapPinIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const SmartphoneIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);

export async function generateStaticParams() {
  const { data: citiesData } = await supabase.from("seo_cities").select("state, city");
  if (!citiesData) return [];
  return citiesData.map((city) => ({
    state: city.state.toLowerCase(),
    city: city.city.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state, city } = await params;
  const { data: cityData } = await supabase
    .from("seo_cities")
    .select("name, state_name, meta_title, meta_description, popular_style")
    .eq("state", state.toLowerCase())
    .eq("city", city.toLowerCase())
    .single();

  if (!cityData) {
    return {
      title: "City Not Found | AI Home Decorator",
    };
  }

  const pageUrl = `https://aihomedecorator.com/usa/${state.toLowerCase()}/${city.toLowerCase()}`;

  return {
    title: cityData.meta_title || `Interior Design & Remodel Guide in ${cityData.name}, ${cityData.state_name} | AI Home Decorator`,
    description: cityData.meta_description || `Explore ${cityData.popular_style || "modern"} home design ideas, localized paint & lighting cost estimates, and room calculators for ${cityData.name}, ${cityData.state_name}.`,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: cityData.meta_title,
      description: cityData.meta_description,
      url: pageUrl,
    },
  };
}

export default async function CityLandingPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state, city } = await params;

  // 1. Fetch current city data
  const { data: cityData } = await supabase
    .from("seo_cities")
    .select("*")
    .eq("state", state.toLowerCase())
    .eq("city", city.toLowerCase())
    .single();

  if (!cityData) {
    notFound();
  }

  // 2. Fetch sibling cities in same state for internal linking
  const { data: siblingCities } = await supabase
    .from("seo_cities")
    .select("city, state, name, image_url, popular_style")
    .eq("state", state.toLowerCase())
    .neq("city", city.toLowerCase())
    .limit(8);

  const pageUrl = `https://aihomedecorator.com/usa/${state.toLowerCase()}/${city.toLowerCase()}`;
  const costProfile = getStateCostProfile(cityData.state, cityData.name);
  const cityHeroImage = cityData.image_url
    ? cityData.image_url.replace(/\.jpg$/, ".webp")
    : `/images/seo/${city.toLowerCase()}.webp`;

  // Structured Data (BreadcrumbList)
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://aihomedecorator.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "USA Cities",
        "item": "https://aihomedecorator.com/usa",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${cityData.name}, ${cityData.state_name}`,
        "item": pageUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FFFBF7] text-[#382A22] pb-12">
      {/* Schema.org Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* Header & Breadcrumbs */}
      <header className="bg-white border-b border-[#F1E4D5] pt-8 pb-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-[#7A4B27]">
            <ol className="flex items-center space-x-2 flex-wrap">
              <li>
                <Link href="/" className="hover:text-[#E87A1E]">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/usa" className="hover:text-[#E87A1E]">USA Directory</Link>
              </li>
              <li>/</li>
              <li className="text-[#4A2508] font-bold">{cityData.name}, {cityData.state_name}</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEEDDF] border border-[#F8B98B] text-[#8D3D10] text-xs font-semibold mb-3">
            <MapPinIcon className="w-3.5 h-3.5 text-[#E87A1E]" />
            <span>{cityData.name}, {cityData.state_name} Home Makeover Guide</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#4A2508] tracking-tight font-heading mb-3">
            {cityData.h1}
          </h1>
          <p className="text-xs sm:text-sm text-[#5C3314] leading-relaxed">
            {cityData.intro}
          </p>
        </div>
      </header>

      {/* City Hero Image */}
      {cityHeroImage && (
        <div className="max-w-5xl mx-auto px-4 mt-6">
          <div className="relative w-full h-[280px] sm:h-[380px] md:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-[#FCD7BA] bg-[#FEEDDF]">
            <Image 
              src={cityHeroImage} 
              alt={`${cityData.popular_style} interior design in ${cityData.name}, ${cityData.state_name}`}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
              <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-[#4A2508] text-xs font-black tracking-wide uppercase shadow-md border border-[#FCD7BA]">
                Trending: {cityData.popular_style}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        {/* Architectural Context */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#F1E4D5] shadow-xs mb-8">
          <h2 className="text-lg sm:text-xl font-black text-[#4A2508] font-heading mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E87A1E]"></span>
            Why {cityData.popular_style} Thrives in {cityData.name}
          </h2>
          <div className="text-xs sm:text-sm text-[#5C3314] leading-relaxed space-y-3 font-normal">
            <p>
              In {cityData.name}, local home architecture blends regional heritage with contemporary living. 
              Homeowners and renters frequently look to incorporate {cityData.popular_style.toLowerCase()} elements to optimize natural light, enhance spatial comfort, and elevate property appeal.
            </p>
            <p>
              With our AI interior design platform, you can experiment with local color palettes, materials, and layout options customized for {cityData.name}&apos;s distinctive residential styles.
            </p>
          </div>
        </div>

        {/* Regional Visual Showcase & Local Color Swatches */}
        <CityRegionalShowcase
          city={cityData.city}
          cityName={cityData.name}
          state={cityData.state}
          stateName={cityData.state_name}
          popularStyle={cityData.popular_style}
          challenge={cityData.challenge}
        />

        {/* Localized Remodel Cost Benchmarks & Climate Guidance */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F1E4D5] shadow-xs mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEEDDF] border border-[#F8B98B] text-[#8D3D10] text-xs font-bold mb-2">
                <span>💵</span>
                <span>{costProfile.tierLabel}</span>
              </span>
              <h2 className="text-lg sm:text-xl font-black text-[#4A2508] font-heading">
                2026 {cityData.name} Paint &amp; Lighting Remodel Costs
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#5C3314] leading-relaxed mb-5 bg-[#FFFBF7] border border-[#F1E4D5] rounded-2xl p-4">
            <strong>Regional Spec Note:</strong> {costProfile.climateZoneNote}
          </p>

          <div className="overflow-x-auto rounded-2xl border border-[#F0E8D8]">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#FFFBF7] border-b border-[#F0E8D8]">
                  <th className="px-4 py-3 font-bold text-[#4A2508]">Project</th>
                  <th className="hidden sm:table-cell px-4 py-3 font-bold text-[#4A2508]">Typical US Scope</th>
                  <th className="px-4 py-3 font-bold text-[#4A2508]">{cityData.name} Est.</th>
                </tr>
              </thead>
              <tbody>
                {costProfile.remodelEstimates.map((item, idx) => (
                  <tr key={idx} className="border-b border-[#F0E8D8] last:border-b-0">
                    <td className="px-4 py-3 font-semibold text-[#4A2508]">{item.project}</td>
                    <td className="hidden sm:table-cell px-4 py-3 text-[#7A5C3A]">{item.scope}</td>
                    <td className="px-4 py-3 font-bold text-[#E87A1E]">
                      ${item.lowUsd.toLocaleString()} – ${item.highUsd.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Curated Regional Tips */}
          <div className="mt-6 pt-5 border-t border-[#F1E4D5]">
            <h3 className="text-sm font-black text-[#4A2508] mb-3">
              Recommended Guides for {cityData.name} Homeowners
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {costProfile.recommendedTips.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tips/${t.slug}`}
                  className="p-3.5 rounded-xl bg-[#FFFBF7] border border-[#F1E4D5] hover:border-[#E87A1E] transition-all group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E87A1E]">
                    {t.category === "lighting" ? "💡 Lighting" : "🎨 Painting"}
                  </span>
                  <div className="text-xs font-bold text-[#4A2508] group-hover:text-[#E87A1E] mt-1 line-clamp-2">
                    {t.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive City-Calibrated Calculators */}
        <div className="mb-10">
          <USHomeCalculators
            cityName={cityData.name}
            stateCode={cityData.state}
            costMultiplier={costProfile.multiplier}
          />
        </div>

        {/* Interactive Preview Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-[#4A2508] tracking-tight font-heading mb-1.5">
            Preview Before &amp; After {cityData.name} Room Transformations
          </h2>
          <p className="text-xs sm:text-sm text-[#6D5D53] max-w-xl mx-auto">
            Compare how updated lighting, wall colors, and {cityData.popular_style} finishes transform real spaces.
          </p>
        </div>
      </section>

      {/* Interactive Simulator */}
      <div className="max-w-5xl mx-auto px-4 mb-10">
        <InteractiveBeforeAfter />
      </div>

      {/* Free 2026 Lookbook Lead Capture tailored to this city */}
      <div className="mb-10">
        <LeadCaptureSection
          source={`city_page_${cityData.city}`}
          defaultStyle={`${cityData.name} ${cityData.popular_style}`}
        />
      </div>

      {/* Planning Resources Card for this City */}
      <section className="max-w-4xl mx-auto px-4 mb-8">
        <div className="bg-white border-2 border-[#FCD7BA] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-md text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-[#FEEDDF] border border-[#F8B98B] flex items-center justify-center text-[#E87A1E] mb-3 text-2xl">
            📚
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#4A2508] font-heading mb-1.5">
            Complete {cityData.name} Lighting &amp; Painting Playbooks
          </h3>
          <p className="text-xs sm:text-sm text-[#6D5D53] max-w-lg mb-5">
            Get printable US floor-plan wiring checklists, lumen sizing tables, and curated Sherwin-Williams &amp; Benjamin Moore color palettes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/store/home-lighting-design-guide-usa"
              className="btn-brand-primary px-6 py-2.5 text-xs sm:text-sm font-bold"
            >
              💡 Lighting Design Guide →
            </Link>
            <Link
              href="/store/home-painting-guide-usa"
              className="btn-brand-secondary px-6 py-2.5 text-xs sm:text-sm font-bold"
            >
              🎨 Home Painting Guide →
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Linking: Explore Other US Cities */}
      {siblingCities && siblingCities.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pt-8 border-t border-[#F1E4D5]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm sm:text-base font-black text-[#4A2508] font-heading">
              Explore AI Interior Design in Other US Cities
            </h2>
            <Link href="/usa" className="text-xs font-bold text-[#E87A1E] hover:underline">
              View All 50 Cities &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {siblingCities.map((sibling) => {
              const imgUrl = sibling.image_url
                ? sibling.image_url.replace(/\.jpg$/, ".webp")
                : "/images/seo/houston.webp";

              return (
                <Link
                  key={`${sibling.state}-${sibling.city}`}
                  href={`/usa/${sibling.state.toLowerCase()}/${sibling.city.toLowerCase()}`}
                  className="rounded-xl bg-white hover:bg-[#FEEDDF]/40 border border-[#F1E4D5] hover:border-[#E87A1E] overflow-hidden flex flex-col group shadow-xs hover:shadow-md transition-all"
                >
                  <div className="relative w-full aspect-[16/10] bg-[#FEEDDF] overflow-hidden">
                    <Image
                      src={imgUrl}
                      alt={`${sibling.name} Interior Design`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                  <div className="p-2.5 flex items-center justify-between text-xs font-bold text-[#4A2508] group-hover:text-[#E87A1E]">
                    <span className="truncate">{sibling.name}, {sibling.state.toUpperCase()}</span>
                    <span className="text-[#8D3D10] flex-shrink-0">&rarr;</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
