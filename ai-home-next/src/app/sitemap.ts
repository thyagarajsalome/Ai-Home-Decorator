import { MetadataRoute } from "next";
import { ELEMENT_CATEGORIES } from "@/constants";
import { supabase } from "@/supabaseClient";
import { ROOMS, STYLES } from "@/lib/seoData";

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
      url: `${baseUrl}/ideas`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/guide`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
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

  // 3. Design Category & Style Pages (Existing 98 Studio Routes)
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

  // 5. Programmatic SEO: 15 Definitive Style Guides
  const styleGuideRoutes: MetadataRoute.Sitemap = STYLES.map((style) => ({
    url: `${baseUrl}/guide/${style.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
    images: [style.thumbnail],
  }));

  // 6. Programmatic SEO: 120 Room × Style Idea Pages (8 rooms × 15 styles)
  const roomIdeaRoutes: MetadataRoute.Sitemap = ROOMS.flatMap((room) =>
    STYLES.map((style) => ({
      url: `${baseUrl}/ideas/${room.slug}/${style.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: [style.thumbnail, ...style.images.map((img) => img.src)],
    }))
  );

  return [
    ...primaryRoutes,
    ...cityRoutes,
    ...styleGuideRoutes,
    ...roomIdeaRoutes,
    ...designRoutes,
    ...legalRoutes,
  ];
}
