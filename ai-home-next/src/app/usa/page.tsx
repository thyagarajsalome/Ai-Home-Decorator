import Link from "next/link";
import { supabase } from "@/supabaseClient";

export const revalidate = 3600;

export default async function USADashboard() {
  const { data: citiesData, error } = await supabase.from("seo_cities").select("city, state, name, state_name").order("name");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-obsidian-900 p-12 pt-24">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Developer Dashboard: USA SEO Pages</h1>
      {error ? (
        <p className="text-red-500">Error loading cities: {error.message}</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {citiesData?.map((city) => (
            <li key={city.city + city.state}>
              <Link href={`/usa/${city.state}/${city.city}`} className="block p-4 bg-white dark:bg-obsidian-800 rounded-lg shadow hover:shadow-md transition border border-gray-200 dark:border-gray-800">
                <span className="text-purple-600 dark:text-purple-400 font-semibold">{city.name}, {city.state_name}</span>
                <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">/usa/{city.state}/{city.city}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
