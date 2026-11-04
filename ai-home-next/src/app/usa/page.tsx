import { Metadata } from "next";
import Link from "next/link";
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
    <div className="min-h-screen bg-[#FFFBF7] text-[#382A22] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-[#7A4B27]">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-[#E87A1E]">Home</Link>
            </li>
            <li>/</li>
            <li className="text-[#4A2508] font-bold">USA Directory</li>
          </ol>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEEDDF] border border-[#F8B98B] text-[#8D3D10] text-xs font-bold mb-4 shadow-xs">
            <span>🇺🇸</span>
            <span>Covering 50 Major US Metros</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4A2508] tracking-tight font-heading mb-4">
            AI Interior Design Across America
          </h1>
          <p className="text-sm sm:text-base text-[#5C3314] leading-relaxed">
            Discover how homeowners across 50 top US metropolitan areas use AI Home Decorator to reimagine their living rooms, kitchens, bedrooms, and outdoor living areas in local architectural styles.
          </p>
        </div>

        {/* App Download Prompt */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#FCD7BA] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#FEEDDF] border border-[#F8B98B] flex items-center justify-center text-2xl flex-shrink-0">
              📱
            </div>
            <div>
              <h2 className="text-lg font-black text-[#4A2508] font-heading">
                Get the Native Android App for Instant Room Renders
              </h2>
              <p className="text-xs text-[#6D5D53] mt-0.5">
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
              className="h-12 w-auto"
            />
          </a>
        </div>

        {/* Directory Grouped by State */}
        <div className="space-y-10">
          {stateNames.map((state) => (
            <div key={state} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F1E4D5] shadow-xs">
              <h2 className="text-xl font-bold text-[#4A2508] mb-4 pb-3 border-b border-[#F1E4D5] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E87A1E]"></span>
                {state}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {citiesByState[state].map((c) => (
                  <Link
                    key={`${c.state}-${c.city}`}
                    href={`/usa/${c.state}/${c.city}`}
                    className="p-4 rounded-2xl bg-[#FFFBF7] hover:bg-[#FEEDDF]/40 border border-[#F1E4D5] hover:border-[#E87A1E] transition-all flex flex-col group shadow-xs"
                  >
                    <span className="text-sm font-bold text-[#4A2508] group-hover:text-[#E87A1E] transition-colors">
                      {c.name}
                    </span>
                    {c.popular_style && (
                      <span className="text-[11px] text-[#7A4B27] mt-1 font-medium">
                        Style: {c.popular_style}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
