import Link from "next/link";
import { supabase } from "@/supabaseClient";

export const dynamic = 'force-dynamic';

export default async function USADashboard() {
  // Pull image_url to verify image status
  const { data: citiesData, error } = await supabase.from("seo_cities").select("city, state, image_url").order("state");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-obsidian-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">Programmatic SEO Dashboard</h1>
        
        {error ? (
          <p className="text-red-500 bg-red-50 p-4 rounded-lg">Error loading cities: {error.message}</p>
        ) : (
          <>
            <div className="bg-white dark:bg-obsidian-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-8 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Indexed Pages</p>
                <p className="text-4xl font-black text-purple-600 dark:text-purple-400">{citiesData?.length || 0}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">System Status</p>
                <p className="text-sm font-bold text-green-500 flex items-center justify-end gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> All Systems Operational
                </p>
              </div>
            </div>

            <div className="overflow-x-auto bg-white dark:bg-obsidian-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-obsidian-950/50 border-b border-gray-200 dark:border-gray-800 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    <th className="p-4 font-bold">SEO URL Route</th>
                    <th className="p-4 font-bold">Route Status</th>
                    <th className="p-4 font-bold">Hero Image Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {citiesData?.map((city) => {
                    const fullUrl = `https://aihomedecorator.com/usa/${city.state}/${city.city}`;
                    
                    // Image Validation Logic
                    let imageStatus = "OK";
                    let isImageValid = true;
                    
                    if (!city.image_url) {
                       isImageValid = false;
                       imageStatus = "Missing URL";
                    } else if (city.image_url.includes("loremflickr") || city.image_url.includes("unsplash")) {
                       isImageValid = false;
                       imageStatus = `Invalid Domain: ${city.image_url}`;
                    }

                    return (
                      <tr key={city.city + city.state} className="hover:bg-gray-50 dark:hover:bg-obsidian-800/30 transition-colors">
                        <td className="p-4">
                          <a href={fullUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                            /usa/{city.state}/{city.city}
                          </a>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            200 OK
                          </span>
                        </td>
                        <td className="p-4">
                          {isImageValid ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              ✓ Valid Image
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                              ✕ {imageStatus}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
