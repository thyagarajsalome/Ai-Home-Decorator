import { MetadataRoute } from "next";
import { ELEMENT_CATEGORIES } from "@/constants";
import { supabase } from "@/supabaseClient";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://aihomedecorator.com";

  const staticRoutes = ["", "/about", "/pricing", "/terms", "/policy", "/disclaimer", "/usa"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  const designRoutes = ELEMENT_CATEGORIES.flatMap((category) =>
    category.choices.map((choice) => {
      const styleSlug = choice.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return {
        url: `${baseUrl}/design/${category.id}/${styleSlug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      };
    })
  );

  // Fetch all Programmatic SEO cities from Supabase
  const { data: citiesData } = await supabase.from("seo_cities").select("state, city");
  
  const cityRoutes = (citiesData || []).map((city) => ({
    url: `${baseUrl}/usa/${city.state}/${city.city}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...designRoutes, ...cityRoutes];
}
