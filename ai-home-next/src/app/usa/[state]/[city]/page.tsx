import { notFound } from "next/navigation";
import { supabase } from "@/supabaseClient";
import DesignWorkspace from "@/components/DesignWorkspace";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

export const revalidate = 86400;

export async function generateStaticParams() {
  const { data: citiesData } = await supabase.from("seo_cities").select("state, city");
  if (!citiesData) return [];
  return citiesData.map((city) => ({
    state: city.state,
    city: city.city,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string; city: string }> }) {
  const { state, city } = await params;
  const { data: cityData } = await supabase
    .from("seo_cities")
    .select("*, image_url, id")
    .eq("state", state)
    .eq("city", city)
    .single();

  if (!cityData) return { title: "City Not Found | AI Home Decorator" };

  const pageUrl = `https://aihomedecorator.com/usa/${state}/${city}`;

  return {
    title: `${cityData.name}, ${cityData.state_name} AI Interior Design & Room Makeover | AI Home Decorator`,
    description: cityData.intro,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${cityData.name}, ${cityData.state_name} AI Interior Design | AI Home Decorator`,
      description: cityData.intro,
      url: pageUrl,
      images: cityData.image_url ? [{ url: cityData.image_url }] : [],
    },
  };
}

export default async function CityDesignPage({ params }: { params: Promise<{ state: string; city: string }> }) {
  const { state, city } = await params;
  const { data: cityData } = await supabase
    .from("seo_cities")
    .select("*, image_url, id")
    .eq("state", state)
    .eq("city", city)
    .single();

  if (!cityData) notFound();

  // Fetch sibling cities for interlinking and crawling
  const { data: siblingCities } = await supabase
    .from("seo_cities")
    .select("city, state, name, state_name, popular_style")
    .neq("id", cityData.id)
    .limit(8);

  const pageUrl = `https://aihomedecorator.com/usa/${state}/${city}`;

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
    <div className="min-h-screen bg-gray-50 dark:bg-obsidian-900 pb-16">
      {/* Schema.org Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* Header & Breadcrumbs */}
      <header className="bg-white dark:bg-obsidian-800 border-b border-gray-200 dark:border-gray-800 pt-16 pb-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-500 dark:text-gray-400">
            <ol className="flex items-center space-x-2 flex-wrap">
              <li>
                <Link href="/" className="hover:text-purple-600 dark:hover:text-purple-400">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/usa" className="hover:text-purple-600 dark:hover:text-purple-400">USA Directory</Link>
              </li>
              <li>/</li>
              <li className="text-gray-900 dark:text-gray-200 font-bold">{cityData.name}, {cityData.state_name}</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-4">
            <span>🇺🇸</span>
            <span>{cityData.name}, {cityData.state_name} AI Interior Makeover</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight font-heading mb-4">
            {cityData.h1}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {cityData.intro}
          </p>
        </div>
      </header>

      {/* City Hero Image */}
      {cityData.image_url && (
        <div className="max-w-5xl mx-auto px-4 mt-8">
          <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800">
            <Image 
              src={cityData.image_url} 
              alt={`${cityData.popular_style} interior design in ${cityData.name}, ${cityData.state_name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1024px"
              priority
            />
          </div>
        </div>
      )}

      {/* Local Architecture & Style Details */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white dark:bg-obsidian-800 p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-purple-500 mb-2 font-bold text-xs uppercase tracking-wider">
              <span>🎨</span> Architectural Signature
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Local Style: {cityData.popular_style}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{cityData.style_desc}</p>
          </div>
          <div className="bg-white dark:bg-obsidian-800 p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-indigo-500 mb-2 font-bold text-xs uppercase tracking-wider">
              <span>⚡</span> Regional Climate &amp; Challenge
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Design Considerations</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{cityData.challenge}</p>
          </div>
        </div>

        {/* HDE US Cost Calculator Cross-Promotion Banner */}
        <div className="mb-12 p-5 rounded-2xl bg-gradient-to-r from-blue-950/70 via-obsidian-900 to-indigo-950/70 border border-blue-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-2xl flex-shrink-0 shadow-inner">
              🔨
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-wider">
                Planning Real Work in {cityData.name}?
              </span>
              <h3 className="text-base font-bold text-white font-heading">
                Calculate Remodel Costs in {cityData.state_name}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Instant $/sqft materials and contractor takeoff with Home Design English.
              </p>
            </div>
          </div>
          <a
            href="https://www.homedesignenglish.com/?region=US"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 hover:scale-105 flex-shrink-0"
          >
            <span>Estimate Costs in {cityData.name}</span>
            <span>↗</span>
          </a>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight font-heading mb-2">
            Redesign Your {cityData.name} Space Instantly
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Upload a photo of your living room, kitchen, bedroom, or patio below. AI will render modern photorealistic options in seconds.
          </p>
        </div>
      </section>

      {/* Main AI Workspace */}
      <div className="max-w-7xl mx-auto px-4">
        <DesignWorkspace />
      </div>

      {/* Internal Linking: Explore Other US Cities */}
      {siblingCities && siblingCities.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 mt-20 pt-12 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Explore AI Interior Design in Other US Cities
            </h2>
            <Link href="/usa" className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline">
              View All 50 Cities &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {siblingCities.map((sibling) => (
              <Link
                key={`${sibling.state}-${sibling.city}`}
                href={`/usa/${sibling.state}/${sibling.city}`}
                className="p-3 rounded-xl bg-white dark:bg-obsidian-850 hover:bg-purple-50 dark:hover:bg-purple-950/30 border border-gray-200 dark:border-gray-800 hover:border-purple-400/50 text-xs font-semibold text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-all shadow-sm flex items-center justify-between"
              >
                <span>{sibling.name}, {sibling.state.toUpperCase()}</span>
                <span className="text-gray-400">&rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
