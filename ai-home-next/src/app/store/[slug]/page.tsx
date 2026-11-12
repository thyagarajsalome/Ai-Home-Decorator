import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedStoreProducts, getStoreProductBySlug } from "@/lib/storeService";
import { ProductPurchaseCard, ProductPreviewViewer } from "./ProductDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getPublishedStoreProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getStoreProductBySlug(slug);

  if (!product) return {};

  const title = `${product.title} (PDF eBook) — AI Home Decorator Store`;
  const description = `${product.subtitle}. Download the instant 2026 printable PDF guide with standard US dimensions, checklists, and specifications.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [product.coverImage],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.coverImage],
    },
    alternates: {
      canonical: `https://aihomedecorator.com/store/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getStoreProductBySlug(slug);

  if (!product) notFound();

  // Related products from other categories
  const allProducts = await getPublishedStoreProducts();
  const relatedProducts = allProducts.filter((p) => p.slug !== product.slug).slice(0, 3);

  // Combined Product + Book JSON-LD schema for Google Rich Results
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Product", "Book"],
    name: product.title,
    bookFormat: "https://schema.org/EBook",
    numberOfPages: product.pagesCount,
    inLanguage: "en-US",
    description: product.description,
    image: product.coverImage,
    brand: {
      "@type": "Brand",
      name: "AI Home Decorator",
    },
    publisher: {
      "@type": "Organization",
      name: "AI Home Decorator",
      url: "https://aihomedecorator.com",
    },
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://aihomedecorator.com/store/${product.slug}`,
      priceValidUntil: "2027-12-31",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0.00",
          currency: "USD",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 0,
            unitCode: "DAY",
          },
        },
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <main className="min-h-screen bg-[#FFFBF7] pb-20">
        {/* ── Top Navigation & Admin Link ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex items-center justify-between text-xs sm:text-sm">
          <nav className="text-[#7A5C3A] flex items-center flex-wrap gap-1">
            <Link href="/" className="hover:text-[#E87A1E]">
              Home
            </Link>
            <span>›</span>
            <Link href="/store" className="hover:text-[#E87A1E]">
              Design Store
            </Link>
            <span>›</span>
            <span className="font-semibold text-[#4A2508] truncate max-w-[200px] sm:max-w-xs inline-block">
              {product.title}
            </span>
          </nav>
          <Link
            href="/admin/store"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E0D0C0] hover:border-[#E87A1E] text-xs font-bold text-[#5C3314] hover:text-[#E87A1E] shadow-2xs hover:shadow-xs transition-all flex-shrink-0"
          >
            <span>⚙️</span>
            <span>Admin Panel</span>
          </Link>
        </div>

        {/* ── Main Two-Column Layout ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Product Information & Previews (7-8 cols) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-10">
              
              {/* Product Header Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#F0E8D8] shadow-sm">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#E87A1E]/10 text-[#E87A1E]">
                    {product.categoryName}
                  </span>
                  {product.badge && (
                    <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
                      {product.badge}
                    </span>
                  )}
                  <span className="text-xs text-[#7A5C3A] font-semibold">
                    {product.publicationYear} US Edition
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-[#4A2508] font-heading leading-tight mb-3">
                  {product.title}
                </h1>
                <p className="text-sm sm:text-base text-[#6D5D53] leading-relaxed mb-6 font-medium">
                  {product.subtitle}
                </p>

                {/* Official Mobile App Rating & Trust Bar */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-[#4A2508] pb-6 border-b border-[#F0E8D8]">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.aihomedecorator.twa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold transition-colors cursor-pointer"
                    title="View AI Home Decorator on Google Play Store"
                  >
                    <span className="text-amber-500 text-sm leading-none">★★★★★</span>
                    <span>4.6 / 5.0 Rating</span>
                    <span className="text-[#8D5D30] font-normal text-[11px]">• Google Play Verified App</span>
                  </a>
                  <span className="text-[11px] text-[#7A5C3A]">
                    Official Homeowner Companion Playbook
                  </span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md text-[11px] border border-emerald-200">
                    Verified Digital Download
                  </span>
                </div>

                {/* 3D Cover Mockup & Description */}
                <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-5 flex justify-center">
                    <div className="relative w-48 h-64 rounded-r-2xl overflow-hidden shadow-2xl border-r-2 border-b-2 border-black/20 bg-[#2B1504]">
                      <Image
                        src={product.coverImage}
                        alt={product.title}
                        fill
                        sizes="192px"
                        className="object-cover opacity-90"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4 flex flex-col justify-between text-white">
                        <span className="text-[9px] font-black tracking-widest text-[#FCD7BA] uppercase">
                          AI HOME DECORATOR
                        </span>
                        <div>
                          <span className="text-[10px] text-[#E87A1E] font-bold uppercase block">
                            {product.categoryName}
                          </span>
                          <h2 className="text-xs font-black leading-tight">
                            {product.title}
                          </h2>
                          <span className="text-[9px] text-gray-300 block mt-1">
                            {product.pagesCount} Pages • Printable PDF
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-7">
                    <h3 className="font-heading font-bold text-base text-[#4A2508] mb-2">
                      About This Architectural Playbook
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C3314] leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <div className="p-3.5 rounded-xl bg-[#FFFBF7] border border-[#FEEDDF] text-xs text-[#7A5C3A]">
                      <strong>Target Audience:</strong> {product.targetAudience}
                    </div>
                  </div>
                </div>
              </div>

              {/* What's Inside & Key Highlights */}
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#F0E8D8] shadow-sm">
                <h3 className="text-xl font-black text-[#4A2508] font-heading mb-6 flex items-center gap-2">
                  <span className="text-[#E87A1E]">✦</span>
                  <span>What You Get Inside This Guide</span>
                </h3>

                <div className="grid grid-cols-1 gap-3.5 mb-8">
                  {product.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#FFFBF7] border border-[#F0E8D8] flex items-start gap-3.5"
                    >
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        ✓
                      </span>
                      <p className="text-xs sm:text-sm text-[#4A2508] font-medium leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                {/* US Specifics Callout Box */}
                <div className="p-5 rounded-2xl bg-[#FEEDDF]/40 border border-[#F8B98B] mb-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#8D3D10] mb-2 flex items-center gap-1.5">
                    <span>🇺🇸</span>
                    <span>100% Tailored for American Homes</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#5C3314]">
                    {product.usSpecifics.map((spec, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-[#E87A1E] font-bold">•</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Complete Table of Contents */}
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#F0E8D8] shadow-sm">
                <h3 className="text-xl font-black text-[#4A2508] font-heading mb-6 flex items-center justify-between">
                  <span>Complete Table of Contents</span>
                  <span className="text-xs font-bold text-[#E87A1E] bg-[#E87A1E]/10 px-2.5 py-1 rounded-lg">
                    {product.pagesCount} Total Pages
                  </span>
                </h3>

                <div className="space-y-4">
                  {product.tableOfContents.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl border border-[#F0E8D8] bg-[#FFFBF7] hover:border-[#E87A1E] transition-colors"
                    >
                      <div className="flex items-baseline justify-between mb-1">
                        <h4 className="font-bold text-sm text-[#4A2508]">
                          {item.chapter}
                        </h4>
                        <span className="text-xs font-mono font-bold text-[#E87A1E]">
                          {item.pages}
                        </span>
                      </div>
                      <p className="text-xs text-[#7A5C3A] leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Sample Preview Gallery */}
              <ProductPreviewViewer product={product} />

            </div>

            {/* Right Column: Sticky Purchase Box (4 cols) */}
            <div className="lg:col-span-5 xl:col-span-4">
              <ProductPurchaseCard product={product} />
            </div>

          </div>
        </div>

        {/* ── Related Guides (Shown when more products are added) ── */}
        {relatedProducts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-black text-[#4A2508] font-heading">
                  Explore More Renovation Playbooks
                </h3>
                <p className="text-xs text-[#7A5C3A]">
                  Check out other specialized guides in our digital library
                </p>
              </div>
              <Link
                href="/store"
                className="text-xs font-bold text-[#E87A1E] hover:underline"
              >
                View All Guides →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/store/${rel.slug}`}
                  className="bg-white rounded-2xl p-5 border border-[#F0E8D8] hover:border-[#E87A1E] hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-40 w-full rounded-xl overflow-hidden mb-3 bg-[#2B1504]">
                      <Image
                        src={rel.coverImage}
                        alt={rel.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#E87A1E] text-white text-[10px] font-black uppercase">
                        {rel.categoryName}
                      </div>
                    </div>
                    <h4 className="font-heading font-bold text-sm text-[#4A2508] group-hover:text-[#E87A1E] transition-colors line-clamp-2 mb-1">
                      {rel.title}
                    </h4>
                    <p className="text-[11px] text-[#7A5C3A] line-clamp-2 mb-3">
                      {rel.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F0E8D8] flex items-center justify-between">
                    <span className="text-base font-black text-[#4A2508]">
                      ${rel.price.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-[#E87A1E]">
                      View Guide →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
