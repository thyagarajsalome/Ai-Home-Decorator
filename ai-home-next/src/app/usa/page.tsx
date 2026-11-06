import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/supabaseClient";

export const revalidate = 86400;

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.aihomedecorator.twa";

export const metadata: Metadata = {
  title: "AI Interior Design & Room Makeover in US Cities | AI Home Decorator",
  description:
    "Explore AI-powered home decorating and room transformations across 50 major US cities. Find local architectural styles and redesign your space instantly with the AI Home Decorator Android app.",
  alternates: {
    canonical: "https://aihomedecorator.com/usa",
  },
  openGraph: {
    title: "AI Interior Design Across US Cities | AI Home Decorator",
    description:
      "Explore AI-powered home decorating and room transformations across 50 major US cities.",
    url: "https://aihomedecorator.com/usa",
  },
};

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

const SmartphoneIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
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

interface CityRecord {
  city: string;
  state: string;
  name: string;
  state_name: string;
  popular_style?: string;
  image_url?: string;
}

export default async function USADirectoryPage() {
  const { data: rawCities } = await supabase
    .from("seo_cities")
    .select("city, state, name, state_name, popular_style, image_url")
    .order("state_name", { ascending: true })
    .order("name", { ascending: true });

  const cities: CityRecord[] = rawCities || [];

  // Group cities by State
  const citiesByState: Record<string, CityRecord[]> = {};
  cities.forEach((c) => {
    const stateLabel = c.state_name || c.state.toUpperCase();
    if (!citiesByState[stateLabel]) {
      citiesByState[stateLabel] = [];
    }
    citiesByState[stateLabel].push(c);
  });

  const stateNames = Object.keys(citiesByState).sort();

  return (
    <div className="min-h-screen bg-[#FFFBF7] text-[#382A22] py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-[#7A4B27]">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-[#E87A1E]">Home</Link>
            </li>
            <li>/</li>
            <li className="text-[#4A2508] font-bold">USA Directory</li>
          </ol>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEEDDF] border border-[#F8B98B] text-[#8D3D10] text-xs font-bold mb-3 shadow-xs">
            <MapPinIcon className="w-3.5 h-3.5 text-[#E87A1E]" />
            <span>Covering 50 Major US Metros</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#4A2508] tracking-tight font-heading mb-2.5">
            AI Interior Design Across America
          </h1>
          <p className="text-xs sm:text-sm text-[#5C3314] leading-relaxed max-w-2xl mx-auto">
            Discover how homeowners across 50 top US metropolitan areas use AI Home Decorator to reimagine their living rooms, kitchens, bedrooms, and outdoor living areas in local architectural styles.
          </p>
        </div>

        {/* App Download Prompt (Streamlined & Compact) */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-white border border-[#FCD7BA] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#FEEDDF] border border-[#F8B98B] flex items-center justify-center text-[#E87A1E] flex-shrink-0">
              <SmartphoneIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-[#4A2508] font-heading">
                Get the Native Android App for Instant Room Renders
              </h2>
              <p className="text-[11px] sm:text-xs text-[#6D5D53] mt-0.5">
                Snap photos on your phone, test 30+ architectural styles, and save high-resolution redesigns.
              </p>
            </div>
          </div>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-200 hover:scale-105 inline-block flex-shrink-0"
          >
            <img
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              alt="Download on Google Play"
              className="h-10 w-auto"
            />
          </a>
        </div>

        {/* Directory Grouped by State */}
        <div className="space-y-8">
          {stateNames.map((state) => (
            <div key={state} className="bg-white rounded-3xl p-5 sm:p-7 border border-[#F1E4D5] shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F1E4D5]">
                <h2 className="text-base sm:text-lg font-bold text-[#4A2508] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E87A1E]"></span>
                  <span>{state}</span>
                </h2>
                <span className="text-xs font-semibold text-[#8D3D10] bg-[#FEEDDF] px-2.5 py-0.5 rounded-full border border-[#F8B98B]">
                  {citiesByState[state].length} {citiesByState[state].length === 1 ? "City" : "Cities"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {citiesByState[state].map((c) => {
                  const imgUrl = c.image_url
                    ? c.image_url.replace(/\.jpg$/, ".webp")
                    : "/images/seo/houston.webp";

                  return (
                    <Link
                      key={`${c.state}-${c.city}`}
                      href={`/usa/${c.state.toLowerCase()}/${c.city.toLowerCase()}`}
                      className="rounded-2xl bg-[#FFFBF7] hover:bg-white border border-[#F1E4D5] hover:border-[#E87A1E] transition-all overflow-hidden flex flex-col group shadow-xs hover:shadow-md"
                    >
                      {/* Small Image Preview */}
                      <div className="relative w-full aspect-[16/10] bg-[#FEEDDF] overflow-hidden">
                        <Image
                          src={imgUrl}
                          alt={`${c.name}, ${c.state.toUpperCase()} Interior Design`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold border border-white/20">
                          {c.state.toUpperCase()}
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-grow">
                        <div>
                          <span className="text-sm font-bold text-[#4A2508] group-hover:text-[#E87A1E] transition-colors block">
                            {c.name}
                          </span>
                          {c.popular_style && (
                            <span className="text-[11px] text-[#7A4B27] mt-0.5 font-medium block truncate">
                              Style: <strong className="text-[#5C3314] font-semibold">{c.popular_style}</strong>
                            </span>
                          )}
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-[#F1E4D5]/60 flex items-center justify-between text-[11px] font-bold text-[#E87A1E]">
                          <span>Explore Styles</span>
                          <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
