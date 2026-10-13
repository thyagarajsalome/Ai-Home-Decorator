import { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/supabaseClient";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "AI Interior Design & Room Makeover in US Cities | AI Home Decorator",
  description:
    "Explore AI-powered home decorating and room transformations across 50 major US cities. Find local architectural styles and redesign your space instantly.",
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
  const { data: rawCities, error } = await supabase
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
    <div className="min-h-screen bg-gray-50 dark:bg-obsidian-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-gray-500 dark:text-gray-400">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-purple-600 dark:hover:text-purple-400">Home</Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-gray-200 font-bold">United States Directory</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/50 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-4">
            <span>🇺🇸</span>
            <span>Local Architecture &amp; Room Styling</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight font-heading">
            AI Interior Design Across the United States
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            Every American city has its own architectural heritage—from Southern Farmhouses to Pacific Northwest Modern and Florida Coastal Retreats. Select your city to see tailored room styles and redesign your home with AI.
          </p>
        </div>

        {/* HDE US Cost Calculator Cross-Promotion Banner */}
        <div className="mb-14 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-950/70 via-obsidian-900 to-indigo-950/70 border border-blue-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-2xl flex-shrink-0 shadow-inner">
              🏗️
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-wider">
                Planning a Real Renovation?
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                Calculate Remodel &amp; Construction Costs by US State
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Get accurate line-item contractor estimates, $/sqft budgets, and material BOQ on our partner tool, Home Design English.
              </p>
            </div>
          </div>
          <a
            href="https://www.homedesignenglish.com/?region=US"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 hover:scale-105 flex-shrink-0"
          >
            <span>Open US Cost Calculator</span>
            <span>↗</span>
          </a>
        </div>

        {/* State Groups & City Directory */}
        {error ? (
          <p className="text-center text-red-500">Error loading cities: {error.message}</p>
        ) : (
          <div className="space-y-12">
            {stateNames.map((stateName) => (
              <section key={stateName} className="bg-white dark:bg-obsidian-900 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                  <span>{stateName}</span>
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-2">
                    ({citiesByState[stateName].length} {citiesByState[stateName].length === 1 ? "City" : "Cities"})
                  </span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {citiesByState[stateName].map((city) => (
                    <Link
                      key={`${city.state}-${city.city}`}
                      href={`/usa/${city.state}/${city.city}`}
                      className="group p-4 rounded-xl bg-gray-50 dark:bg-obsidian-850/60 hover:bg-purple-50 dark:hover:bg-purple-950/30 border border-gray-200 dark:border-gray-800 hover:border-purple-400/50 transition-all duration-200 shadow-sm hover:shadow"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 text-sm transition-colors">
                          {city.name}
                        </h3>
                        <span className="text-gray-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all text-xs">
                          &rarr;
                        </span>
                      </div>
                      {city.popular_style && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Style: <span className="text-purple-500 dark:text-purple-300 font-semibold">{city.popular_style}</span>
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
