import { notFound } from "next/navigation";
import { supabase } from "@/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import InteractiveBeforeAfter from "@/components/InteractiveBeforeAfter";

export const revalidate = 86400;

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.aihomedecorator.twa";

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
    <div className="min-h-screen bg-[#FFFBF7] text-[#382A22] pb-16">
      {/* Schema.org Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* Header & Breadcrumbs */}
      <header className="bg-white border-b border-[#F1E4D5] pt-12 pb-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-[#7A4B27]">
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

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEEDDF] border border-[#F8B98B] text-[#8D3D10] text-xs font-semibold mb-4">
            <span>🇺🇸</span>
            <span>{cityData.name}, {cityData.state_name} Home Makeover Guide</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4A2508] tracking-tight font-heading mb-4">
            {cityData.h1}
          </h1>
          <p className="text-sm sm:text-base text-[#5C3314] leading-relaxed">
            {cityData.intro}
          </p>
        </div>
      </header>

      {/* City Hero Image */}
      {cityData.image_url && (
        <div className="max-w-5xl mx-auto px-4 mt-8">
          <div className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] rounded-3xl overflow-hidden shadow-xl border-2 border-[#FCD7BA] bg-[#FEEDDF]">
            <Image 
              src={cityData.image_url} 
              alt={`${cityData.popular_style} interior design in ${cityData.name}, ${cityData.state_name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1024px"
              priority
            />
            <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-xs text-xs font-black text-[#4A2508] shadow-sm">
              🏙️ {cityData.name} Signature Aesthetic
            </div>
          </div>
        </div>
      )}

      {/* Local Architecture & Style Details */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#F1E4D5]">
            <div className="flex items-center gap-2 text-[#E87A1E] mb-2 font-bold text-xs uppercase tracking-wider">
              <span>🎨</span> Architectural Signature
            </div>
            <h2 className="text-lg font-bold text-[#4A2508] mb-2">Local Style: {cityData.popular_style}</h2>
            <p className="text-xs sm:text-sm text-[#6D5D53] leading-relaxed">{cityData.style_desc}</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#F1E4D5]">
            <div className="flex items-center gap-2 text-[#8D3D10] mb-2 font-bold text-xs uppercase tracking-wider">
              <span>⚡</span> Regional Climate &amp; Challenge
            </div>
            <h2 className="text-lg font-bold text-[#4A2508] mb-2">Design Considerations</h2>
            <p className="text-xs sm:text-sm text-[#6D5D53] leading-relaxed">{cityData.challenge}</p>
          </div>
        </div>

        {/* CTA: Redesign in App */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-[#4A2508] tracking-tight font-heading mb-2">
            Redesign Your {cityData.name} Space Instantly
          </h2>
          <p className="text-xs sm:text-sm text-[#6D5D53] max-w-xl mx-auto">
            Install the free AI Home Decorator Android app to snap your room and preview stunning local {cityData.popular_style} designs in seconds.
          </p>
        </div>
      </section>

      {/* Interactive Simulator */}
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <InteractiveBeforeAfter />
      </div>

      {/* Big Download Card for this City */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <div className="bg-white border-2 border-[#FCD7BA] rounded-3xl p-8 sm:p-10 shadow-lg text-center flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-[#FEEDDF] border border-[#F8B98B] flex items-center justify-center text-3xl mb-4">
            📱
          </div>
          <h3 className="text-2xl font-black text-[#4A2508] font-heading mb-2">
            Download the App to Redesign Your {cityData.name} Home
          </h3>
          <p className="text-xs sm:text-sm text-[#6D5D53] max-w-lg mb-6">
            Get instant AI makeover renders, 30+ architectural styles, and before/after sliders right on your Android device.
          </p>

          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-200 hover:scale-105 active:scale-95 inline-block shadow-lg shadow-[#E87A1E]/30"
          >
            <img
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              alt="Download on Google Play"
              className="h-16 w-auto"
            />
          </a>
        </div>
      </section>

      {/* Internal Linking: Explore Other US Cities */}
      {siblingCities && siblingCities.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pt-10 border-t border-[#F1E4D5]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base sm:text-lg font-black text-[#4A2508] font-heading">
              Explore AI Interior Design in Other US Cities
            </h2>
            <Link href="/usa" className="text-xs font-bold text-[#E87A1E] hover:underline">
              View All 50 Cities &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {siblingCities.map((sibling) => (
              <Link
                key={`${sibling.state}-${sibling.city}`}
                href={`/usa/${sibling.state}/${sibling.city}`}
                className="p-3.5 rounded-2xl bg-white hover:bg-[#FEEDDF]/50 border border-[#F1E4D5] hover:border-[#E87A1E] text-xs font-semibold text-[#4A2508] hover:text-[#E87A1E] transition-all shadow-xs flex items-center justify-between"
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
