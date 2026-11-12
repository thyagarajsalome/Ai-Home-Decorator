import { supabase } from "@/supabaseClient";
import { StoreProduct, STORE_PRODUCTS } from "./storeData";

export function mapDbToStoreProduct(row: any): StoreProduct {
  return {
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle || "",
    categoryId: row.category_id || "home-improvements",
    categoryName: row.category_name || "Home Improvements",
    price: Number(row.price),
    originalPrice: Number(row.original_price || row.price * 2),
    badge: row.badge || undefined,
    rating: Number(row.rating || 4.6),
    reviewsCount: Number(row.reviews_count || 0),
    pagesCount: Number(row.pages_count || 9),
    fileSize: row.file_size || "105 KB",
    format: row.format || "Printable PDF (8.5\" x 11\" US Letter)",
    publicationYear: Number(row.publication_year || 2026),
    coverImage: row.cover_image,
    pdf_file_key: row.pdf_file_key,
    description: row.description,
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    tableOfContents: Array.isArray(row.table_of_contents) ? row.table_of_contents : [],
    previewPages: Array.isArray(row.preview_pages) ? row.preview_pages : [],
    usSpecifics: Array.isArray(row.us_specifics) ? row.us_specifics : [],
    targetAudience: row.target_audience || "US Homeowners planning a home renovation.",
  };
}

export async function getPublishedStoreProducts(): Promise<StoreProduct[]> {
  try {
    const { data, error } = await supabase
      .from("store_products")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return STORE_PRODUCTS;
    }

    return data.map(mapDbToStoreProduct);
  } catch (err) {
    console.error("Error fetching store_products from Supabase:", err);
    return STORE_PRODUCTS;
  }
}

export async function getStoreProductBySlug(slug: string): Promise<StoreProduct | null> {
  try {
    const { data, error } = await supabase
      .from("store_products")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (error || !data) {
      const fallback =
        STORE_PRODUCTS.find((p) => p.slug === slug) ||
        (slug === "american-home-remodeling-playbook" ? STORE_PRODUCTS[0] : null);
      return fallback || null;
    }

    return mapDbToStoreProduct(data);
  } catch (err) {
    console.error("Error fetching store_product by slug from Supabase:", err);
    const fallback =
      STORE_PRODUCTS.find((p) => p.slug === slug) ||
      (slug === "american-home-remodeling-playbook" ? STORE_PRODUCTS[0] : null);
    return fallback || null;
  }
}
