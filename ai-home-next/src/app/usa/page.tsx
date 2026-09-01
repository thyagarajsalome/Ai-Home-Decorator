import Link from "next/link";
import { supabase } from "@/supabaseClient";

export const dynamic = 'force-dynamic';

export default async function USADashboard() {
  const { data: citiesData, error } = await supabase.from("seo_cities").select("city, state").order("state");

  return (
    <div className="min-h-screen bg-white dark:bg-black p-4">
      <h1 className="text-xl font-bold mb-2 text-black dark:text-white">USA SEO Pages Dashboard</h1>
      {error ? (
        <p className="text-red-500">Error loading cities: {error.message}</p>
      ) : (
        <>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Total Landing Pages: <strong>{citiesData?.length || 0}</strong></p>
          <ul className="text-sm">
            {citiesData?.map((city) => {
              const fullUrl = `https://aihomedecorator.com/usa/${city.state}/${city.city}`;
              return (
                <li key={city.city + city.state}>
                  <a href={fullUrl} className="text-blue-600 dark:text-blue-400 hover:underline">
                    {fullUrl}
                  </a>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
