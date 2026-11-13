import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ROOMS, STYLES, getRoomStyleContent } from "@/lib/seoData";

interface PageProps {
  params: Promise<{ room: string; style: string }>;
}

// Generate all 120 static pages (8 rooms × 15 styles)
export async function generateStaticParams() {
  const params: { room: string; style: string }[] = [];
  for (const room of ROOMS) {
    for (const style of STYLES) {
      params.push({ room: room.slug, style: style.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { room: roomSlug, style: styleSlug } = await params;
  const room = ROOMS.find((r) => r.slug === roomSlug);
  const style = STYLES.find((s) => s.slug === styleSlug);

  if (!room || !style) return {};

  const title = `${style.name} ${room.name} Ideas & Design Inspiration 2026`;
  const description = `Discover the best ${style.name} ${room.name.toLowerCase()} design ideas. Expert tips on palette, furniture, materials, and decor to transform your ${room.name.toLowerCase()} with ${style.name} style.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [style.images[0].src],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [style.images[0].src],
    },
    alternates: {
      canonical: `https://aihomedecorator.com/ideas/${roomSlug}/${styleSlug}`,
    },
  };
}

export default async function IdeasPage({ params }: PageProps) {
  const { room: roomSlug, style: styleSlug } = await params;

  const room = ROOMS.find((r) => r.slug === roomSlug);
  const style = STYLES.find((s) => s.slug === styleSlug);

  if (!room || !style) notFound();

  const content = getRoomStyleContent(room, style);

  // Related styles (same room, different styles)
  const relatedStyles = STYLES.filter((s) => s.slug !== style.slug).slice(0, 4);
  // Related rooms (same style, different rooms)
  const relatedRooms = ROOMS.filter((r) => r.slug !== room.slug).slice(0, 4);

  // JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.h1,
    description: content.intro,
    image: style.images[0].src,
    author: {
      "@type": "Organization",
      name: "AI Home Decorator",
      url: "https://aihomedecorator.com",
    },
    publisher: {
      "@type": "Organization",
      name: "AI Home Decorator",
      logo: {
        "@type": "ImageObject",
        url: "https://aihomedecorator.com/brand/logo.webp",
      },
    },
    datePublished: "2026-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    mainEntityOfPage: `https://aihomedecorator.com/ideas/${roomSlug}/${styleSlug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="min-h-screen bg-[#FFFBF7]">
        {/* ── Breadcrumb ── */}
        <nav className="max-w-6xl mx-auto px-4 pt-6 pb-2 text-sm text-[#7A5C3A]">
          <Link href="/" className="hover:text-[#E87A1E]">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/ideas" className="hover:text-[#E87A1E]">Design Ideas</Link>
          <span className="mx-2">›</span>
          <span className="font-medium text-[#4A2508]">{style.name} {room.name}</span>
        </nav>

        {/* ── Hero Section ── */}
        <section className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              {/* Style badge */}
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E87A1E]/10 text-[#E87A1E] mb-4 uppercase tracking-wider">
                {style.name} Style
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-[#4A2508] leading-tight mb-4">
                {content.h1}
              </h1>
              <p className="text-[#7A5C3A] text-lg leading-relaxed mb-6">
                {content.intro}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://play.google.com/store/apps/details?id=com.aihomedecorator.twa"
                  className="bg-[#E87A1E] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#C86010] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try AI Decorator Free →
                </a>
                <Link
                  href={`/guide/${style.slug}`}
                  className="border-2 border-[#E87A1E] text-[#E87A1E] px-6 py-3 rounded-xl font-semibold hover:bg-[#E87A1E]/5 transition-colors"
                >
                  {style.name} Style Guide
                </Link>
              </div>
            </div>
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={style.images[0].src}
                alt={`${style.name} ${room.name} design inspiration`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </section>

        {/* ── Color Palette ── */}
        <section className="bg-white py-10">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-[#4A2508] mb-6">
              {style.name} Color Palette for Your {room.name}
            </h2>
            <div className="flex flex-wrap gap-4">
              {style.palette.map((color) => (
                <div key={color.hex} className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full shadow-md border border-gray-100"
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                  />
                  <div>
                    <p className="font-semibold text-[#4A2508] text-sm">{color.name}</p>
                    <p className="text-xs text-[#7A5C3A] font-mono">{color.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Design Tips ── */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-[#4A2508] mb-8">
            5 Expert Tips for Your {style.name} {room.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.tips.map((tip, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#F0E8D8] hover:shadow-md transition-shadow"
              >
                <div className="w-8 h-8 rounded-full bg-[#E87A1E] text-white flex items-center justify-center font-bold text-sm mb-4">
                  {i + 1}
                </div>
                <p className="text-[#4A2508] leading-relaxed text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Inspiration Gallery ── */}
        <section className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-[#4A2508] mb-8">
              {style.name} {room.name} Inspiration Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {style.images.map((img, i) => (
                <div key={i} className="relative h-64 rounded-xl overflow-hidden shadow-sm">
                  <Image
                    src={img.src}
                    alt={`${style.name} ${room.name} - ${img.alt}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Key Furniture Pieces ── */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-[#4A2508] mb-6">
            Must-Have Furniture for a {style.name} {room.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {style.keyFurniture.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-white p-4 rounded-xl border border-[#F0E8D8]"
              >
                <span className="text-[#E87A1E] text-xl mt-0.5">✦</span>
                <div>
                  <p className="font-semibold text-[#4A2508]">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Dos and Don'ts ── */}
        <section className="bg-[#F9F3EC] py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-[#4A2508] mb-8">
              {style.name} {room.name} — Dos &amp; Don&apos;ts
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-green-100">
                <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                  <span>✅</span> Do This
                </h3>
                <ul className="space-y-3">
                  {style.dos.map((d, i) => (
                    <li key={i} className="flex gap-3 text-[#4A2508] text-sm">
                      <span className="text-green-500 mt-0.5 flex-shrink-0">•</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-red-100">
                <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
                  <span>🚫</span> Avoid This
                </h3>
                <ul className="space-y-3">
                  {style.donts.map((d, i) => (
                    <li key={i} className="flex gap-3 text-[#4A2508] text-sm">
                      <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-[#4A2508] mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {content.faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-white rounded-xl border border-[#F0E8D8] group"
              >
                <summary className="p-5 cursor-pointer font-semibold text-[#4A2508] flex justify-between items-center list-none">
                  {faq.q}
                  <span className="text-[#E87A1E] text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="px-5 pb-5 text-[#7A5C3A] leading-relaxed text-sm">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="bg-[#4A2508] py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Visualize Your {style.name} {room.name} with AI
            </h2>
            <p className="text-[#E8C99A] mb-8 text-lg">
              Upload a photo of your {room.name.toLowerCase()} and see it transformed into {style.name} style in seconds — completely free.
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=com.aihomedecorator.twa"
              className="inline-block bg-[#E87A1E] text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-[#C86010] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Try AI Home Decorator Free →
            </a>
          </div>
        </section>

        {/* ── Related Pages ── */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-xl font-bold text-[#4A2508] mb-6">
            More {style.name} Room Ideas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {relatedRooms.map((r) => (
              <Link
                key={r.slug}
                href={`/ideas/${r.slug}/${style.slug}`}
                className="bg-white rounded-xl p-4 border border-[#F0E8D8] hover:border-[#E87A1E] hover:shadow-sm transition-all text-center group"
              >
                <span className="text-2xl block mb-2">{r.icon}</span>
                <span className="text-sm font-semibold text-[#4A2508] group-hover:text-[#E87A1E]">
                  {style.name} {r.name}
                </span>
              </Link>
            ))}
          </div>

          <h2 className="text-xl font-bold text-[#4A2508] mb-6">
            More {room.name} Style Ideas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedStyles.map((s) => (
              <Link
                key={s.slug}
                href={`/ideas/${room.slug}/${s.slug}`}
                className="bg-white rounded-xl overflow-hidden border border-[#F0E8D8] hover:border-[#E87A1E] hover:shadow-sm transition-all group"
              >
                <div className="relative h-24">
                  <Image
                    src={s.thumbnail}
                    alt={`${s.name} ${room.name}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <span className="text-sm font-semibold text-[#4A2508] group-hover:text-[#E87A1E]">
                    {s.name} {room.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
