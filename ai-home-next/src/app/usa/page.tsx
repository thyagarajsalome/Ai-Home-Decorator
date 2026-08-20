import Link from "next/link";
import citiesData from "@/data/cities.json";

export default function USADashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-obsidian-900 p-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Developer Dashboard: USA SEO Pages</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {citiesData.map((city) => (
          <li key={city.city + city.state}>
            <Link href={`/usa/${city.state}/${city.city}`} className="block p-4 bg-white dark:bg-obsidian-800 rounded-lg shadow hover:shadow-md transition">
              <span className="text-purple-600 font-semibold">{city.name}, {city.stateName}</span>
              <span className="block text-sm text-gray-500">/usa/{city.state}/{city.city}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
