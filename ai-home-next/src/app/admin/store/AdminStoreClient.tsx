"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { STORE_CATEGORIES } from "@/lib/storeData";
import { useAuth } from "@/context/AuthContext";
import { extractPdfPagesToWebp } from "@/lib/pdfCoverExtractor";
import { ADMIN_EMAILS } from "@/lib/adminAuth";
import { supabase } from "@/supabaseClient";

interface DbProduct {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category_id: string;
  category_name: string;
  price: number;
  original_price: number;
  badge?: string;
  rating: number;
  reviews_count: number;
  pages_count: number;
  file_size: string;
  format: string;
  publication_year: number;
  cover_image: string;
  pdf_file_key?: string;
  description: string;
  highlights: string[];
  table_of_contents: { chapter: string; pages: string; summary: string }[];
  preview_pages: { title: string; subtitle: string; pageNumber: number; highlightText: string; imageUrl: string }[];
  us_specifics: string[];
  target_audience: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

const CATEGORY_CHOICES = [
  { id: "home-improvements", name: "Home Improvements" },
  { id: "kitchen-design", name: "Kitchen Design" },
  { id: "bathroom-design", name: "Bathroom Design" },
  { id: "flooring", name: "Flooring" },
  { id: "painting", name: "Painting & Colors" },
  { id: "interior", name: "Interior Living" },
  { id: "exterior", name: "Exterior & Facade" },
  { id: "landscape", name: "Landscape & Garden" },
  { id: "patio", name: "Patio & Decking" },
];

export default function AdminStoreClient() {
  const { currentUser, currentUserRole, loading: authLoading } = useAuth();

  const isAdmin = Boolean(
    currentUser &&
      (currentUserRole === "admin" ||
        (currentUser.email &&
          ADMIN_EMAILS.includes(currentUser.email.toLowerCase())))
  );

  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // PDF Upload State
  const [uploadingPdf, setUploadingPdf] = useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    id?: string;
    title: string;
    slug: string;
    subtitle: string;
    category_id: string;
    category_name: string;
    price: string;
    original_price: string;
    badge: string;
    pages_count: string;
    file_size: string;
    format: string;
    publication_year: string;
    cover_image: string;
    pdf_file_key: string;
    description: string;
    highlightsText: string;
    target_audience: string;
    is_published: boolean;
    preview_pages?: {
      title: string;
      subtitle: string;
      pageNumber: number;
      highlightText: string;
      imageUrl: string;
    }[];
  }>({
    title: "",
    slug: "",
    subtitle: "",
    category_id: "home-improvements",
    category_name: "Home Improvements",
    price: "14.99",
    original_price: "29.99",
    badge: "Official USA Guide",
    pages_count: "9",
    file_size: "105 KB",
    format: 'Printable PDF (8.5" x 11" US Letter)',
    publication_year: "2026",
    cover_image: "",
    pdf_file_key: "",
    description: "",
    highlightsText: "",
    target_audience: "US Homeowners planning a home renovation.",
    is_published: true,
    preview_pages: [],
  });

  const getAuthHeaders = async (): Promise<Record<string, string>> => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.access_token) {
        return { Authorization: `Bearer ${session.access_token}` };
      }
    } catch (e) {
      console.warn("Could not retrieve auth session token:", e);
    }
    return {};
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const authHeaders = await getAuthHeaders();
      const res = await fetch("/api/admin/products", {
        headers: authHeaders,
      });
      const json = await res.json();
      if (json.products) {
        setProducts(json.products);
      }
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setUploadMessage(null);
    setUploadError(null);
    setFormData({
      title: "",
      slug: "",
      subtitle: "",
      category_id: "home-improvements",
      category_name: "Home Improvements",
      price: "14.99",
      original_price: "29.99",
      badge: "Official USA Guide",
      pages_count: "",
      file_size: "",
      format: 'Printable PDF (8.5" x 11" US Letter)',
      publication_year: "2026",
      cover_image: "",
      pdf_file_key: "",
      description: "",
      highlightsText: "The Three Layers of Light: Ambient, Task & Accent\nKelvin Temperature & CRI 90+ Standards\nRecessed Can Placement & Spacing Geometry",
      target_audience: "US Homeowners, real estate investors, and DIYers.",
      is_published: true,
      preview_pages: [],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: DbProduct) => {
    setIsEditing(true);
    setUploadMessage(null);
    setUploadError(null);
    setFormData({
      id: p.id,
      title: p.title,
      slug: p.slug,
      subtitle: p.subtitle || "",
      category_id: p.category_id || "home-improvements",
      category_name: p.category_name || "Home Improvements",
      price: p.price.toString(),
      original_price: p.original_price?.toString() || (p.price * 2).toString(),
      badge: p.badge || "",
      pages_count: p.pages_count?.toString() || "60",
      file_size: p.file_size || "15.0 MB",
      format: p.format || 'Printable PDF (8.5" x 11" US Letter)',
      publication_year: p.publication_year?.toString() || "2026",
      cover_image: p.cover_image,
      pdf_file_key: p.pdf_file_key || "",
      description: p.description || "",
      highlightsText: Array.isArray(p.highlights) ? p.highlights.join("\n") : "",
      target_audience: p.target_audience || "",
      is_published: p.is_published,
      preview_pages: p.preview_pages || [],
    });
    setIsModalOpen(true);
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setUploadError("Please select a valid .pdf file");
      return;
    }

    setUploadingPdf(true);
    setUploadError(null);
    setUploadMessage("Step 1/3: Reading PDF and extracting front cover page as WebP...");

    try {
      const cleanSlug = (formData.slug || file.name.replace(/\.pdf$/i, ""))
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, "-");

      // 1. Client-Side: Extract Front Cover & Sample Pages to WebP
      const { numPages, coverBlob, sampleBlobs } = await extractPdfPagesToWebp(file);

      setUploadMessage(`Step 2/3: Uploading front cover WebP image (${numPages} pages detected)...`);

      const authHeaders = await getAuthHeaders();

      // 2. Upload WebP Cover to Supabase Storage CDN
      const coverFormData = new FormData();
      coverFormData.append("file", coverBlob, `${cleanSlug}-cover.webp`);
      coverFormData.append("slug", cleanSlug);
      coverFormData.append("type", "cover");

      const coverRes = await fetch("/api/admin/upload-cover", {
        method: "POST",
        headers: authHeaders,
        body: coverFormData,
      });
      const coverJson = await coverRes.json();
      if (!coverRes.ok || !coverJson.success) {
        throw new Error(coverJson.error || "Failed to upload WebP cover image");
      }

      // 3. Upload Sample Pages if any
      const uploadedSamples: { title: string; subtitle: string; pageNumber: number; highlightText: string; imageUrl: string }[] = [];
      for (let i = 0; i < sampleBlobs.length; i++) {
        const s = sampleBlobs[i];
        const sFormData = new FormData();
        sFormData.append("file", s.blob, `${cleanSlug}-sample-page-${s.pageNumber}.webp`);
        sFormData.append("slug", cleanSlug);
        sFormData.append("type", `sample-${s.pageNumber}`);

        const sRes = await fetch("/api/admin/upload-cover", {
          method: "POST",
          headers: authHeaders,
          body: sFormData,
        });
        const sJson = await sRes.json();
        if (sRes.ok && sJson.success) {
          uploadedSamples.push({
            pageNumber: s.pageNumber,
            title: `Sample Page #${s.pageNumber}`,
            subtitle: "Architectural blueprint layout",
            highlightText: "Masterclass specification and practical reference.",
            imageUrl: sJson.url,
          });
        }
      }

      setUploadMessage("Step 3/3: Uploading PDF playbook to Cloudflare R2...");

      // 4. Upload original PDF to Cloudflare R2
      const data = new FormData();
      data.append("file", file);
      data.append("slug", cleanSlug);

      const res = await fetch("/api/admin/upload-pdf", {
        method: "POST",
        headers: authHeaders,
        body: data,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to upload file to Cloudflare R2");
      }

      // 5. Automatically populate form fields with extracted data!
      setFormData((prev) => ({
        ...prev,
        pdf_file_key: json.fileKey,
        file_size: json.fileSize || prev.file_size,
        pages_count: numPages.toString(),
        cover_image: coverJson.url,
        preview_pages: uploadedSamples.length > 0 ? uploadedSamples : prev.preview_pages,
      }));

      setUploadMessage(
        `✅ Success! Front cover page extracted as WebP (${numPages} total pages) and PDF saved to Cloudflare R2!`
      );
    } catch (err: any) {
      console.error("PDF upload error:", err);
      setUploadError(err.message || "Failed to extract and upload PDF");
      setUploadMessage(null);
    } finally {
      setUploadingPdf(false);
      e.target.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const selectedCategoryObj = CATEGORY_CHOICES.find(
        (c) => c.id === formData.category_id
      );

      const highlights = formData.highlightsText
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const payload = {
        ...formData,
        category_name: selectedCategoryObj?.name || formData.category_name,
        price: parseFloat(formData.price) || 19.99,
        original_price: parseFloat(formData.original_price) || 39.99,
        pages_count: parseInt(formData.pages_count) || 50,
        publication_year: parseInt(formData.publication_year) || 2026,
        highlights,
      };

      const authHeaders = await getAuthHeaders();
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch("/api/admin/products", {
        method,
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        alert(json.error || "Failed to save product");
      } else {
        setIsModalOpen(false);
        fetchProducts();
      }
    } catch (err: any) {
      alert("Error saving product: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (p: DbProduct) => {
    try {
      const authHeaders = await getAuthHeaders();
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({
          id: p.id,
          is_published: !p.is_published,
        }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((item) =>
            item.id === p.id ? { ...item, is_published: !item.is_published } : item
          )
        );
      }
    } catch (err) {
      console.error("Toggle publish failed:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const authHeaders = await getAuthHeaders();
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setDeleteConfirmId(null);
      } else {
        const json = await res.json();
        alert(json.error || "Failed to delete product");
      }
    } catch (err: any) {
      alert("Error deleting: " + err.message);
    }
  };

  // Filtered Products
  const filtered = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && p.is_published) ||
      (statusFilter === "draft" && !p.is_published);
    const matchesCategory =
      categoryFilter === "all" || p.category_id === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const publishedCount = products.filter((p) => p.is_published).length;
  const draftCount = products.filter((p) => !p.is_published).length;

  if (authLoading) {
    return (
      <div className="max-w-md mx-auto px-4 py-28 text-center">
        <div className="inline-block animate-spin w-8 h-8 border-3 border-[#E87A1E] border-t-transparent rounded-full mb-3" />
        <p className="text-xs font-bold text-[#7A5C3A]">
          Verifying Admin Credentials...
        </p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-28 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 text-3xl flex items-center justify-center mx-auto mb-4 border border-amber-200">
          🔒
        </div>
        <h2 className="text-2xl font-black text-[#4A2508] mb-2 font-heading">
          Developer &amp; Admin Access Required
        </h2>
        <p className="text-xs sm:text-sm text-[#7A5C3A] leading-relaxed mb-6">
          This portal is restricted to authorized developer accounts (<strong className="text-[#4A2508]">thyagaraja1983@gmail.com</strong>).
          {currentUser ? (
            <span className="block mt-2 text-red-600 font-semibold">
              Currently signed in as: {currentUser.email} (Non-admin account)
            </span>
          ) : (
            <span className="block mt-2">
              Please sign in with your developer administrator email to upload PDF playbooks and manage books.
            </span>
          )}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/login"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#E87A1E] text-white text-xs font-bold hover:bg-[#D66A12] transition-colors shadow-sm"
          >
            {currentUser ? "Switch to Admin Account" : "Sign In to Admin"}
          </Link>
          <Link
            href="/store"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#F0E8D8] text-xs font-bold text-[#4A2508] hover:bg-white transition-colors"
          >
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ── Top Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#F0E8D8]">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xl">🛠️</span>
            <span className="text-xs font-black uppercase tracking-wider text-[#E87A1E]">
              Admin Control Center
            </span>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-2 py-0.5 rounded-full">
              Logged in: {currentUser?.email}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading text-[#4A2508]">
            Design Store Product Manager
          </h1>
          <p className="text-xs sm:text-sm text-[#7A5C3A]">
            Create, edit, toggle visibility, and assign Cloudflare PDF storage keys for your digital books.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/store"
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-[#F0E8D8] text-xs font-bold text-[#4A2508] hover:bg-white hover:border-[#E87A1E] transition-colors flex items-center gap-1.5"
          >
            <span>View Public Store</span>
            <span>↗</span>
          </Link>
          <button
            onClick={openAddModal}
            className="px-5 py-2.5 rounded-xl bg-[#E87A1E] hover:bg-[#D66A12] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>＋</span>
            <span>Add New PDF Book</span>
          </button>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-[#F0E8D8] shadow-xs">
          <span className="text-[11px] font-bold text-[#9B8272] uppercase tracking-wider block mb-1">
            Total Books in Database
          </span>
          <span className="text-2xl sm:text-3xl font-black text-[#4A2508]">
            {products.length}
          </span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#F0E8D8] shadow-xs">
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            Live on Store
          </span>
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-700">
              {publishedCount}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#F0E8D8] shadow-xs">
          <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block mb-1">
            Drafts / Hidden
          </span>
          <span className="text-2xl sm:text-3xl font-black text-amber-700">
            {draftCount}
          </span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#F0E8D8] shadow-xs">
          <span className="text-[11px] font-bold text-[#9B8272] uppercase tracking-wider block mb-1">
            Database Status
          </span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md inline-block">
            Connected: Supabase
          </span>
        </div>
      </div>

      {/* ── Filter Controls ── */}
      <div className="bg-white p-4 rounded-2xl border border-[#F0E8D8] mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, slug, or category..."
            className="w-full px-4 py-2 pl-9 rounded-xl border border-[#F0E8D8] text-xs sm:text-sm focus:border-[#E87A1E] focus:outline-hidden"
          />
          <span className="absolute left-3 top-2.5 text-xs text-[#9B8272]">🔍</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#F0E8D8] text-xs font-bold bg-[#FFFBF7] text-[#4A2508] focus:border-[#E87A1E] focus:outline-hidden"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts Only</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#F0E8D8] text-xs font-bold bg-[#FFFBF7] text-[#4A2508] focus:border-[#E87A1E] focus:outline-hidden"
          >
            <option value="all">All Categories</option>
            {CATEGORY_CHOICES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Products Table ── */}
      <div className="bg-white rounded-3xl border border-[#F0E8D8] shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-3 border-[#E87A1E] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs font-bold text-[#7A5C3A]">Loading products from Supabase...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 p-6">
            <p className="text-4xl mb-3">📦</p>
            <h3 className="font-heading font-bold text-lg text-[#4A2508] mb-1">
              No Products Found
            </h3>
            <p className="text-xs text-[#7A5C3A] mb-4">
              Get started by adding your first PDF book into the store database.
            </p>
            <button
              onClick={openAddModal}
              className="px-5 py-2.5 rounded-xl bg-[#E87A1E] text-white text-xs font-bold"
            >
              ＋ Add First PDF Book
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#4A2508]">
              <thead className="bg-[#FFFBF7] border-b border-[#F0E8D8] text-[11px] font-black uppercase tracking-wider text-[#7A5C3A]">
                <tr>
                  <th className="py-4 px-6">Book</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Specs</th>
                  <th className="py-4 px-4">Cloudflare Key</th>
                  <th className="py-4 px-4 text-center">Visibility</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E8D8]">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FFFBF7]/60 transition-colors">
                    {/* Cover & Title */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0 shadow-sm border border-black/10">
                          <Image
                            src={item.cover_image}
                            alt={item.title}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#4A2508] line-clamp-1">
                            {item.title}
                          </h4>
                          <span className="text-[11px] text-[#9B8272] font-mono block">
                            /{item.slug}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] font-black uppercase text-[#E87A1E] bg-[#FEEDDF] px-1.5 py-0.2 rounded-sm inline-block mt-0.5">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 font-semibold text-[#5C3314]">
                      {item.category_name}
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4">
                      <div className="flex items-baseline gap-1">
                        <span className="font-black text-sm text-[#4A2508]">
                          ${item.price.toFixed(2)}
                        </span>
                        <span className="text-[10px] font-bold text-[#8D5D30] uppercase">
                          USD
                        </span>
                      </div>
                      {item.original_price && item.original_price > item.price && (
                        <span className="text-[11px] text-[#9B8272] line-through block">
                          ${item.original_price?.toFixed(2)}
                        </span>
                      )}
                    </td>

                    {/* Specs */}
                    <td className="py-4 px-4 text-[11px] text-[#5C3314]">
                      <div>{item.pages_count} Pages</div>
                      <div className="text-[#9B8272]">{item.file_size}</div>
                    </td>

                    {/* Cloudflare PDF Key */}
                    <td className="py-4 px-4 font-mono text-[10px] text-[#7A5C3A] max-w-[140px] truncate">
                      {item.pdf_file_key ? (
                        <span className="bg-gray-100 px-2 py-0.5 rounded-md border border-gray-200">
                          {item.pdf_file_key}
                        </span>
                      ) : (
                        <span className="text-amber-600 italic">Not set</span>
                      )}
                    </td>

                    {/* One-click Visibility Toggle */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleTogglePublish(item)}
                        title="Click to toggle published / draft"
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                          item.is_published
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        }`}
                      >
                        {item.is_published ? "● Live" : "○ Draft"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/store/${item.slug}`}
                          target="_blank"
                          title="View live page"
                          className="p-1.5 rounded-lg border border-[#F0E8D8] hover:bg-[#FFFBF7] text-xs"
                        >
                          👁️
                        </Link>
                        <button
                          onClick={() => openEditModal(item)}
                          className="px-3 py-1.5 rounded-lg bg-[#FEEDDF] hover:bg-[#FCD7BA] text-[#4A2508] font-bold text-xs transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 text-xs transition-colors cursor-pointer"
                          title="Delete book"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Add / Edit Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-[#F0E8D8]">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#F0E8D8] flex items-center justify-between bg-[#FFFBF7]">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#E87A1E]">
                  {isEditing ? "Update Product" : "New Product Creation"}
                </span>
                <h3 className="font-heading font-bold text-xl text-[#4A2508]">
                  {isEditing ? `Edit "${formData.title}"` : "Add New PDF Book"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FEEDDF] text-[#4A2508] font-bold flex items-center justify-center hover:bg-[#E87A1E] hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="overflow-y-auto p-6 space-y-6 flex-1 bg-white">
              {/* Section 1: Basic Information */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#7A5C3A] mb-3 pb-1 border-b border-[#F0E8D8]">
                  1. Title &amp; Category
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#4A2508] mb-1">
                      Book Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. The Modern Kitchen Remodel Blueprint"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#F0E8D8] text-xs sm:text-sm focus:border-[#E87A1E] focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#4A2508] mb-1">
                        Category *
                      </label>
                      <select
                        value={formData.category_id}
                        onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#F0E8D8] text-xs font-bold bg-[#FFFBF7] focus:border-[#E87A1E] focus:outline-hidden"
                      >
                        {CATEGORY_CHOICES.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4A2508] mb-1">
                        Badge (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.badge}
                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                        placeholder="e.g. Bestseller, Trending, High ROI"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#F0E8D8] text-xs focus:border-[#E87A1E] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A2508] mb-1">
                      Subtitle / Tagline
                    </label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="e.g. Cabinetry, Countertops, Clearances & Workflow Layouts"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#F0E8D8] text-xs focus:border-[#E87A1E] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Pricing & Specs */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#7A5C3A] mb-3 pb-1 border-b border-[#F0E8D8]">
                  2. Pricing &amp; Specifications
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#4A2508] mb-1">
                      Sale Price ($ USD) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#F0E8D8] text-xs font-bold focus:border-[#E87A1E] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#4A2508] mb-1">
                      Original / List Price ($ USD)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.original_price}
                      onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#F0E8D8] text-xs focus:border-[#E87A1E] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#4A2508] mb-1">
                      Page Count
                    </label>
                    <input
                      type="number"
                      value={formData.pages_count}
                      onChange={(e) => setFormData({ ...formData, pages_count: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#F0E8D8] text-xs focus:border-[#E87A1E] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#4A2508] mb-1">
                      File Size
                    </label>
                    <input
                      type="text"
                      value={formData.file_size}
                      onChange={(e) => setFormData({ ...formData, file_size: e.target.value })}
                      placeholder="18.4 MB"
                      className="w-full px-3 py-2 rounded-xl border border-[#F0E8D8] text-xs focus:border-[#E87A1E] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Media & Storage Keys */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#7A5C3A] mb-3 pb-1 border-b border-[#F0E8D8]">
                  3. Media &amp; Cloudflare Storage Key
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-[#4A2508]">
                        Cover Image URL (WebP) *
                      </label>
                      <span className="text-[10px] text-[#7A5C3A]">
                        Auto-extracted from PDF Page 1
                      </span>
                    </div>
                    <input
                      type="url"
                      required
                      value={formData.cover_image}
                      onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                      placeholder="Upload a PDF below to auto-extract the front cover page as WebP"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#F0E8D8] text-xs focus:border-[#E87A1E] focus:outline-hidden"
                    />

                    {formData.cover_image && (
                      <div className="mt-3 flex items-center gap-3 p-3 bg-[#FFFBF7] rounded-xl border border-[#FEEDDF]">
                        <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-white shadow-xs border border-[#F0E8D8] shrink-0">
                          <Image
                            src={formData.cover_image}
                            alt="PDF Front Cover Preview"
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="overflow-hidden">
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase inline-block mb-1">
                            ✓ PDF Page 1 WebP Cover
                          </span>
                          <p className="text-xs text-[#5C3314] font-medium truncate max-w-sm">
                            {formData.cover_image}
                          </p>
                          <span className="text-[10px] text-[#9B8272] block mt-0.5">
                            Optimized for ultra-fast loading across all devices
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Direct Cloudflare R2 PDF File Uploader */}
                  <div className="bg-[#FFFBF7] p-4 rounded-2xl border-2 border-dashed border-[#F8B98B] space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label className="text-xs font-bold text-[#4A2508] flex items-center gap-1.5">
                        <span className="text-base">📄</span>
                        <span>Upload PDF Playbook (Direct to Cloudflare R2)</span>
                      </label>
                      <span className="text-[10px] bg-[#FEEDDF] text-[#8D3D10] font-black px-2.5 py-0.5 rounded-full border border-[#F8B98B]">
                        Bucket: ai-homedecorator-store
                      </span>
                    </div>

                    <p className="text-[11px] text-[#7A5C3A] leading-relaxed">
                      Choose any PDF from your computer. It uploads directly into your private Cloudflare R2 bucket with <strong>zero egress bandwidth fees</strong>. You do NOT need to visit Cloudflare!
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <label
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs cursor-pointer transition-all ${
                          uploadingPdf
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-[#E87A1E] hover:bg-[#D66A12] text-white shadow-md shadow-[#E87A1E]/20"
                        }`}
                      >
                        <input
                          type="file"
                          accept=".pdf,application/pdf"
                          onChange={handlePdfUpload}
                          disabled={uploadingPdf}
                          className="hidden"
                        />
                        {uploadingPdf ? (
                          <>
                            <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
                            <span>Uploading to Cloudflare R2...</span>
                          </>
                        ) : (
                          <>
                            <span>☁️ Choose PDF File to Upload</span>
                          </>
                        )}
                      </label>

                      {formData.pdf_file_key && (
                        <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl truncate max-w-xs">
                          ✓ Key: {formData.pdf_file_key}
                        </span>
                      )}
                    </div>

                    {uploadMessage && (
                      <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl font-medium animate-fadeIn">
                        {uploadMessage}
                      </div>
                    )}

                    {uploadError && (
                      <div className="text-xs text-red-800 bg-red-50 border border-red-200 p-2.5 rounded-xl font-medium">
                        ❌ {uploadError}
                      </div>
                    )}

                    <div className="pt-2">
                      <label className="block text-[11px] font-bold text-[#7A5C3A] mb-1">
                        Cloudflare R2 PDF File Key (Auto-filled on upload or edit manually)
                      </label>
                      <input
                        type="text"
                        value={formData.pdf_file_key}
                        onChange={(e) => setFormData({ ...formData, pdf_file_key: e.target.value })}
                        placeholder="e.g. books/american-home-remodeling-playbook-1731429990.pdf"
                        className="w-full px-3 py-2 rounded-xl border border-[#F0E8D8] text-xs font-mono focus:border-[#E87A1E] focus:outline-hidden bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Content & Publishing */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#7A5C3A] mb-3 pb-1 border-b border-[#F0E8D8]">
                  4. Description &amp; Highlights
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#4A2508] mb-1">
                      Overview Description *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-3 rounded-xl border border-[#F0E8D8] text-xs focus:border-[#E87A1E] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A2508] mb-1">
                      Highlights (One per line)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.highlightsText}
                      onChange={(e) => setFormData({ ...formData, highlightsText: e.target.value })}
                      placeholder="Line 1: Permit rules&#10;Line 2: Contractor checklist&#10;Line 3: High-ROI tips"
                      className="w-full p-3 rounded-xl border border-[#F0E8D8] text-xs focus:border-[#E87A1E] focus:outline-hidden"
                    />
                  </div>

                  {/* Publish Checkbox */}
                  <div className="p-4 rounded-xl bg-[#FFFBF7] border border-[#FEEDDF] flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-[#4A2508] block">
                        Publish to Public Store
                      </span>
                      <span className="text-[11px] text-[#7A5C3A]">
                        If checked, this book is immediately visible to visitors on the store.
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_published}
                        onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#F0E8D8] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#F0E8D8] text-xs font-bold text-[#4A2508] hover:bg-[#FFFBF7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#E87A1E] hover:bg-[#D66A12] text-white text-xs font-bold shadow-md transition-all disabled:opacity-50"
                >
                  {saving ? "Saving..." : isEditing ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Dialog ── */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-red-200 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 text-2xl flex items-center justify-center mx-auto mb-3">
              ⚠️
            </div>
            <h3 className="font-heading font-bold text-lg text-[#4A2508] mb-1">
              Delete This Product?
            </h3>
            <p className="text-xs text-[#7A5C3A] mb-5">
              This action cannot be undone. It will remove the book and its details from the store database permanently.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="py-2.5 px-4 rounded-xl border border-[#F0E8D8] text-xs font-bold text-[#4A2508]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
