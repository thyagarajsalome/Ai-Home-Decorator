import { MetadataRoute } from "next";
import { ELEMENT_CATEGORIES } from "@/constants";
import { supabase } from "@/supabaseClient";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://aihomedecorator.com";
  const now = new Date();

  // 1. High-Priority Primary Hubs
  const primaryRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/usa`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  // 2. Legal / Policy Pages
  const legalRoutes: MetadataRoute.Sitemap = ["/terms", "/policy", "/disclaimer"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.3,
  }));

  // 3. Design Styles & Rooms
  const designRoutes: MetadataRoute.Sitemap = ELEMENT_CATEGORIES.flatMap((category) =>
    category.choices.map((choice) => {
      const styleSlug = choice.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return {
        url: `${baseUrl}/design/${category.id}/${styleSlug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.75,
      };
    })
  );

  // 4. Programmatic Local SEO: 50 US Metropolitan Cities
  const { data: citiesData } = await supabase.from("seo_cities").select("state, city");
  const cityRoutes: MetadataRoute.Sitemap = (citiesData || []).map((city) => ({
    url: `${baseUrl}/usa/${city.state.toLowerCase()}/${city.city.toLowerCase()}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...primaryRoutes, ...cityRoutes, ...designRoutes, ...legalRoutes];
}
