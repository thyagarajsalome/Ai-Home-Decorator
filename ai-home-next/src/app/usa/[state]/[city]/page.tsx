import { notFound } from "next/navigation";
import { supabase } from "@/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import InteractiveBeforeAfter from "@/components/InteractiveBeforeAfter";

export const revalidate = 86400;

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.aihomedecorator.twa";

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
    title: cityData.meta_title || `AI Interior Design in ${cityData.name}, ${cityData.state_name} | AI Home Decorator`,
    description: cityData.meta_description || `Reimagine your home in ${cityData.name}, ${cityData.state_name} with AI. Preview ${cityData.popular_style || "modern"} decor ideas instantly with the AI Home Decorator app.`,
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
    .select("city, state, name")
    .eq("state", state.toLowerCase())
    .neq("city", city.toLowerCase())
    .limit(8);

  const pageUrl = `https://aihomedecorator.com/usa/${state.toLowerCase()}/${city.toLowerCase()}`;

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
      {cityData.image_url && (
        <div className="max-w-5xl mx-auto px-4 mt-6">
          <div className="relative w-full h-[280px] sm:h-[380px] md:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-[#FCD7BA] bg-[#FEEDDF]">
            <Image 
              src={cityData.image_url} 
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

        {/* CTA: Redesign in App */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-[#4A2508] tracking-tight font-heading mb-1.5">
            Redesign Your {cityData.name} Space Instantly
          </h2>
          <p className="text-xs sm:text-sm text-[#6D5D53] max-w-xl mx-auto">
            Install the free AI Home Decorator Android app to snap your room and preview stunning local {cityData.popular_style} designs in seconds.
          </p>
        </div>
      </section>

      {/* Interactive Simulator */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <InteractiveBeforeAfter />
      </div>

      {/* Big Download Card for this City */}
      <section className="max-w-4xl mx-auto px-4 mb-8">
        <div className="bg-white border-2 border-[#FCD7BA] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-md text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-[#FEEDDF] border border-[#F8B98B] flex items-center justify-center text-[#E87A1E] mb-3">
            <SmartphoneIcon className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#4A2508] font-heading mb-1.5">
            Download the App to Redesign Your {cityData.name} Home
          </h3>
          <p className="text-xs sm:text-sm text-[#6D5D53] max-w-lg mb-4">
            Get instant AI makeover renders, 30+ architectural styles, and before/after sliders right on your Android device.
          </p>

          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-200 hover:scale-105 active:scale-95 inline-block"
          >
            <img
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              alt="Download on Google Play"
              className="h-11 w-auto"
            />
          </a>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {siblingCities.map((sibling) => (
              <Link
                key={`${sibling.state}-${sibling.city}`}
                href={`/usa/${sibling.state}/${sibling.city}`}
                className="p-3 rounded-xl bg-white hover:bg-[#FEEDDF]/50 border border-[#F1E4D5] hover:border-[#E87A1E] text-xs font-semibold text-[#4A2508] hover:text-[#E87A1E] transition-all shadow-xs flex items-center justify-between"
              >
                <span>{sibling.name}, {sibling.state.toUpperCase()}</span>
                <span className="text-[#8D3D10]">&rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
