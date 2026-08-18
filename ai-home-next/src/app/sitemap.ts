import { MetadataRoute } from "next";
import { ELEMENT_CATEGORIES } from "@/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aihomedecorator.com";

  const staticRoutes = ["", "/about", "/pricing", "/terms", "/policy", "/disclaimer"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  const dynamicRoutes = ELEMENT_CATEGORIES.flatMap((category) =>
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

  return [...staticRoutes, ...dynamicRoutes];
}
