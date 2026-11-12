import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://fhplqcddcvwyqflgbfaj.supabase.co";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZocGxxY2RkY3Z3eXFmbGdiZmFqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTc5MzA3MywiZXhwIjoyMDc3MzY5MDczfQ.9IuaMuWCLvKDFK22C7fBNPcgh3_wtwsZBgi7gmF6XqU";

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ── GET: Read all products (Published & Drafts) ──
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("store_products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ products: data || [] });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// ── POST: Create a new product ──
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const title = body.title?.trim();
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const slug = body.slug?.trim() ? slugify(body.slug) : slugify(title);
    const cover_image =
      body.cover_image?.trim() ||
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80";

    const payload = {
      slug,
      title,
      subtitle: body.subtitle?.trim() || "",
      category_id: body.category_id || "home-improvements",
      category_name: body.category_name || "Home Improvements",
      price: Number(body.price) || 19.99,
      original_price: Number(body.original_price) || 39.99,
      badge: body.badge?.trim() || null,
      rating: Number(body.rating) || 4.6,
      reviews_count: Number(body.reviews_count) || 0,
      pages_count: Number(body.pages_count) || 50,
      file_size: body.file_size?.trim() || "15 MB",
      format: body.format?.trim() || 'Printable PDF (8.5" x 11" US Letter)',
      publication_year: Number(body.publication_year) || 2026,
      cover_image,
      pdf_file_key: body.pdf_file_key?.trim() || null,
      description: body.description?.trim() || "",
      highlights: Array.isArray(body.highlights) ? body.highlights : [],
      table_of_contents: Array.isArray(body.table_of_contents)
        ? body.table_of_contents
        : [],
      preview_pages: Array.isArray(body.preview_pages) ? body.preview_pages : [],
      us_specifics: Array.isArray(body.us_specifics) ? body.us_specifics : [],
      target_audience:
        body.target_audience?.trim() ||
        "US Homeowners, real estate investors, and DIYers.",
      is_published: body.is_published ?? true,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from("store_products")
      .insert(payload)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, product: data });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to create product" },
      { status: 500 }
    );
  }
}

// ── PUT: Update an existing product ──
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const id = body.id;

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required for update" },
        { status: 400 }
      );
    }

    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (body.title !== undefined) updates.title = body.title.trim();
    if (body.slug !== undefined) updates.slug = slugify(body.slug);
    if (body.subtitle !== undefined) updates.subtitle = body.subtitle.trim();
    if (body.category_id !== undefined) updates.category_id = body.category_id;
    if (body.category_name !== undefined)
      updates.category_name = body.category_name;
    if (body.price !== undefined) updates.price = Number(body.price);
    if (body.original_price !== undefined)
      updates.original_price = Number(body.original_price);
    if (body.badge !== undefined) updates.badge = body.badge ? body.badge.trim() : null;
    if (body.rating !== undefined) updates.rating = Number(body.rating);
    if (body.reviews_count !== undefined)
      updates.reviews_count = Number(body.reviews_count);
    if (body.pages_count !== undefined)
      updates.pages_count = Number(body.pages_count);
    if (body.file_size !== undefined) updates.file_size = body.file_size.trim();
    if (body.format !== undefined) updates.format = body.format.trim();
    if (body.publication_year !== undefined)
      updates.publication_year = Number(body.publication_year);
    if (body.cover_image !== undefined)
      updates.cover_image = body.cover_image.trim();
    if (body.pdf_file_key !== undefined)
      updates.pdf_file_key = body.pdf_file_key ? body.pdf_file_key.trim() : null;
    if (body.description !== undefined)
      updates.description = body.description.trim();
    if (body.highlights !== undefined) updates.highlights = body.highlights;
    if (body.table_of_contents !== undefined)
      updates.table_of_contents = body.table_of_contents;
    if (body.preview_pages !== undefined)
      updates.preview_pages = body.preview_pages;
    if (body.us_specifics !== undefined)
      updates.us_specifics = body.us_specifics;
    if (body.target_audience !== undefined)
      updates.target_audience = body.target_audience.trim();
    if (body.is_published !== undefined)
      updates.is_published = Boolean(body.is_published);

    const { data, error } = await supabaseAdmin
      .from("store_products")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, product: data });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

// ── DELETE: Delete a product ──
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required for deletion" },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("store_products")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}
