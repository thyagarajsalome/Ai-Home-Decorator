import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STYLES, ROOMS } from "@/lib/seoData";

interface PageProps {
  params: Promise<{ style: string }>;
}

export async function generateStaticParams() {
  return STYLES.map((style) => ({
    style: style.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { style: styleSlug } = await params;
  const style = STYLES.find((s) => s.slug === styleSlug);

  if (!style) return {};

  const title = `${style.name} Interior Design Style Guide: Palettes, Furniture & Rules (2026)`;
  const description = `The ultimate guide to ${style.name} interior design. Explore signature colors, core characteristics, furniture essentials, and room-by-room decorating ideas.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [style.thumbnail],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [style.thumbnail],
    },
    alternates: {
      canonical: `https://aihomedecorator.com/guide/${styleSlug}`,
    },
  };
}

export default async function StyleGuidePage({ params }: PageProps) {
  const { style: styleSlug } = await params;
  const style = STYLES.find((s) => s.slug === styleSlug);

  if (!style) notFound();

  // Related styles
  const otherStyles = STYLES.filter((s) => s.slug !== style.slug).slice(0, 3);

  // Article JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${style.name} Interior Design Style Guide`,
    description: style.description,
    image: style.thumbnail,
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
    mainEntityOfPage: `https://aihomedecorator.com/guide/${styleSlug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What defines ${style.name} interior design?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${style.description} Key characteristics include: ${style.characteristics.join(", ")}.`,
        },
      },
      {
        "@type": "Question",
        name: `What colors define the ${style.name} palette?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The ${style.name} color palette centers on ${style.palette.map((p) => `${p.name} (${p.hex})`).join(", ")}.`,
        },
      },
      {
        "@type": "Question",
        name: `Which rooms look best in ${style.name} style?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${style.name} style is especially popular in ${style.bestRooms.join(", ")}.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="min-h-screen bg-[#FFFBF7]">
        {/* ── Breadcrumbs ── */}
        <nav className="max-w-5xl mx-auto px-4 pt-6 pb-2 text-sm text-[#7A5C3A]">
          <Link href="/" className="hover:text-[#E87A1E]">
            Home
          </Link>
          <span className="mx-2">›</span>
          <Link href="/ideas" className="hover:text-[#E87A1E]">
            Ideas
          </Link>
          <span className="mx-2">›</span>
          <span className="font-medium text-[#4A2508]">{style.name} Guide</span>
        </nav>

        {/* ── Hero Header ── */}
        <article className="max-w-5xl mx-auto px-4 py-8 md:py-12">
          <header className="mb-10 text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E87A1E]/10 text-[#E87A1E] mb-3 uppercase tracking-wider">
              Complete Design Aesthetic Guide
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-[#4A2508] mb-4 tracking-tight">
              What is {style.name} Style? The Definitive Guide
            </h1>
            <p className="text-lg md:text-xl text-[#7A5C3A] leading-relaxed max-w-3xl">
              {style.tagline}
            </p>
          </header>

          {/* Hero Image */}
          <div className="relative h-80 md:h-[460px] w-full rounded-2xl overflow-hidden shadow-lg mb-12">
            <Image
              src={style.thumbnail}
              alt={`${style.name} design interior example`}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white text-sm backdrop-blur-md bg-black/30 px-4 py-2 rounded-xl">
              Origin: {style.origin}
            </div>
          </div>

          {/* ── Overview & Philosophy ── */}
          <section className="bg-white rounded-2xl p-6 md:p-10 border border-[#F0E8D8] shadow-sm mb-12">
            <h2 className="text-2xl font-bold text-[#4A2508] mb-4">The Philosophy Behind {style.name}</h2>
            <p className="text-[#4A2508] text-base md:text-lg leading-relaxed mb-6">
              {style.description}
            </p>
            <p className="text-[#7A5C3A] text-sm leading-relaxed">
              {style.origin} Whether you are decorating an open-plan modern home or renovating a historic space, {style.name} balances beauty with daily practical living.
            </p>
          </section>

          {/* ── 6 Core Characteristics ── */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#4A2508] mb-6">6 Defining Characteristics</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {style.characteristics.map((trait, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl border border-[#F0E8D8] flex items-start gap-4"
                >
                  <span className="w-8 h-8 rounded-full bg-[#E87A1E]/15 text-[#E87A1E] font-bold text-sm flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-[#4A2508] mb-1">{trait}</h3>
                    <p className="text-xs text-[#7A5C3A]">
                      Essential design principle of the authentic {style.name} aesthetic.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Signature Color Palette ── */}
          <section className="bg-white rounded-2xl p-6 md:p-10 border border-[#F0E8D8] shadow-sm mb-12">
            <h2 className="text-2xl font-bold text-[#4A2508] mb-3">Signature Color Palette</h2>
            <p className="text-[#7A5C3A] text-sm mb-6">
              Use these 5 curated swatches for your wall paints, main upholstery, and accents:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {style.palette.map((color) => (
                <div key={color.hex} className="text-center group">
                  <div
                    className="h-24 w-full rounded-xl shadow-inner mb-2 border border-black/10 group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: color.hex }}
                  />
                  <p className="font-semibold text-xs text-[#4A2508]">{color.name}</p>
                  <p className="text-[11px] font-mono text-[#7A5C3A]">{color.hex}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Key Furniture Essentials ── */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#4A2508] mb-6">Key Furniture Essentials</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {style.keyFurniture.map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl border border-[#F0E8D8] shadow-sm"
                >
                  <span className="text-[#E87A1E] text-base font-bold mb-1 block">0{i + 1}</span>
                  <h3 className="font-semibold text-sm text-[#4A2508]">{item}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* ── Visual Inspiration Gallery ── */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#4A2508] mb-6">{style.name} in Real Spaces</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {style.images.map((img, i) => (
                <div key={i} className="relative h-60 rounded-xl overflow-hidden shadow-sm">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium drop-shadow">
                    {img.alt}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Dos and Don'ts ── */}
          <section className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 border border-green-200">
              <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                <span>✅</span> The Golden Rules (Do)
              </h3>
              <ul className="space-y-3 text-sm text-[#4A2508]">
                {style.dos.map((d, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="text-green-600 font-bold">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-red-200">
              <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                <span>❌</span> Common Mistakes (Don&apos;t)
              </h3>
              <ul className="space-y-3 text-sm text-[#4A2508]">
                {style.donts.map((d, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── Room-by-Room Ideas Navigation ── */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-[#F0E8D8] mb-12">
            <h2 className="text-xl font-bold text-[#4A2508] mb-2">
              Apply {style.name} to Any Room in Your Home
            </h2>
            <p className="text-sm text-[#7A5C3A] mb-6">
              Explore step-by-step room styling and AI transformation ideas:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ROOMS.map((room) => (
                <Link
                  key={room.slug}
                  href={`/ideas/${room.slug}/${style.slug}`}
                  className="p-3 rounded-xl border border-[#F0E8D8] hover:border-[#E87A1E] hover:bg-[#FFFBF7] transition-all flex items-center gap-2 text-xs font-semibold text-[#4A2508]"
                >
                  <span className="text-base">{room.icon}</span>
                  <span>{room.name}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* ── AI CTA ── */}
          <section className="bg-gradient-to-br from-[#4A2508] to-[#2B1504] text-white rounded-3xl p-8 md:p-12 text-center mb-12 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              See Your Home in {style.name} Style in 30 Seconds
            </h2>
            <p className="text-[#E8C99A] max-w-xl mx-auto mb-6 text-sm md:text-base">
              Snap or upload any photo of your room. Our AI decorator redesigns it with authentic {style.name} furniture, textures, and lighting automatically.
            </p>
            <a
              href="https://apps.apple.com/app/ai-home-decorator/id6743444857"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#E87A1E] hover:bg-[#D66A12] text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-colors text-sm"
            >
              Transform My Room with AI Free →
            </a>
          </section>

          {/* ── Related Guides ── */}
          <section>
            <h2 className="text-xl font-bold text-[#4A2508] mb-4">Explore More Design Guides</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {otherStyles.map((s) => (
                <Link
                  key={s.slug}
                  href={`/guide/${s.slug}`}
                  className="bg-white rounded-xl p-4 border border-[#F0E8D8] hover:border-[#E87A1E] transition-all flex items-center gap-3 group"
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={s.thumbnail}
                      alt={s.name}
                      fill
                      sizes="56px"
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs text-[#4A2508] group-hover:text-[#E87A1E]">
                      {s.name} Guide
                    </h3>
                    <p className="text-[11px] text-[#7A5C3A] line-clamp-1">{s.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
