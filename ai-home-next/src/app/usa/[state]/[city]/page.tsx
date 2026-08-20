import { notFound } from "next/navigation";
import citiesData from "@/data/cities.json";
import DesignWorkspace from "@/components/DesignWorkspace";
import Link from "next/link";

export async function generateStaticParams() {
  return citiesData.map((city) => ({
    state: city.state,
    city: city.city,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string; city: string }> }) {
  const { state, city } = await params;
  const cityData = citiesData.find((c) => c.state === state && c.city === city);
  if (!cityData) return { title: "Not Found" };

  return {
    title: cityData.h1,
    description: cityData.intro,
    openGraph: {
      title: cityData.h1,
      description: cityData.intro,
    }
  };
}

export default async function CityDesignPage({ params }: { params: Promise<{ state: string; city: string }> }) {
  const { state, city } = await params;
  const cityData = citiesData.find((c) => c.state === state && c.city === city);
  if (!cityData) notFound();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-obsidian-900 pb-12">
      <header className="bg-white dark:bg-obsidian-800 border-b border-gray-200 dark:border-gray-800 pt-24 pb-12 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            {cityData.h1}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {cityData.intro}
          </p>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-obsidian-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Local Style: {cityData.popularStyle}</h3>
            <p className="text-gray-600 dark:text-gray-300">{cityData.styleDesc}</p>
          </div>
          <div className="bg-white dark:bg-obsidian-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Local Challenge</h3>
            <p className="text-gray-600 dark:text-gray-300">{cityData.challenge}</p>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Redesign Your {cityData.name} Home Instantly</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed text-lg">
            {cityData.solution || "Upload a photo below and let our AI instantly generate stunning new designs tailored to your local architecture."}
          </p>
        </div>
      </section>

      <DesignWorkspace />
    </div>
  );
}
