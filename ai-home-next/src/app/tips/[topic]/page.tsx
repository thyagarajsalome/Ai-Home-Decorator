import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_TIPS } from "@/lib/tipsData";
import { ROOMS, STYLES } from "@/lib/seoData";

/* ------------------------------------------------------------------ */
/*  Static Params                                                      */
/* ------------------------------------------------------------------ */

export async function generateStaticParams() {
  return ALL_TIPS.map((tip) => ({ topic: tip.slug }));
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic: topicSlug } = await params;
  const tip = ALL_TIPS.find((t) => t.slug === topicSlug);
  if (!tip) return {};

  return {
    title: tip.metaTitle,
    description: tip.metaDescription,
    alternates: {
      canonical: `https://aihomedecorator.com/tips/${topicSlug}`,
    },
    openGraph: {
      title: tip.metaTitle,
      description: tip.metaDescription,
      url: `https://aihomedecorator.com/tips/${topicSlug}`,
      siteName: "AI Home Decorator",
      images: [{ url: tip.heroImage, width: 1200, height: 630, alt: tip.title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: tip.metaTitle,
      description: tip.metaDescription,
      images: [tip.heroImage],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default async function TipArticlePage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: topicSlug } = await params;
  const tip = ALL_TIPS.find((t) => t.slug === topicSlug);
  if (!tip) notFound();

  const todayISO = new Date().toISOString().split("T")[0];

  /* ---- Related tips (same category, exclude current, max 3) ---- */
  const relatedTips = ALL_TIPS.filter(
    (t) => t.category === tip.category && t.slug !== tip.slug
  ).slice(0, 3);

  /* ---- Related rooms & styles ---- */
  const relatedRooms = (tip.relatedRoomSlugs ?? [])
    .map((slug) => ROOMS.find((r) => r.slug === slug))
    .filter(Boolean);

  const relatedStyles = (tip.relatedStyleSlugs ?? [])
    .map((slug) => STYLES.find((s) => s.slug === slug))
    .filter(Boolean);

  const firstRelatedStyle =
    relatedStyles.length > 0 ? relatedStyles[0]!.slug : "modern";

  /* ---- JSON-LD Schemas ---- */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: tip.title,
    description: tip.metaDescription,
    image: tip.heroImage,
    author: {
      "@type": "Organization",
      name: "AI Home Decorator",
      url: "https://aihomedecorator.com",
    },
    publisher: {
      "@type": "Organization",
      name: "AI Home Decorator",
      url: "https://aihomedecorator.com",
    },
    datePublished: "2026-01-01",
    dateModified: todayISO,
    mainEntityOfPage: `https://aihomedecorator.com/tips/${topicSlug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tip.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://aihomedecorator.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tips",
        item: "https://aihomedecorator.com/tips",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tip.title,
        item: `https://aihomedecorator.com/tips/${topicSlug}`,
      },
    ],
  };

  const categoryEmoji = tip.category === "lighting" ? "💡" : "🎨";
  const categoryLabel =
    tip.category === "lighting" ? "Lighting" : "Painting";
  const categoryColor =
    tip.category === "lighting"
      ? "bg-amber-100 text-amber-800"
      : "bg-violet-100 text-violet-800";

  return (
    <main className="min-h-screen bg-[#FFFBF7]">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ============================================================ */}
      {/* 1. Breadcrumbs                                                */}
      {/* ============================================================ */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-4xl px-4 pt-6 sm:px-6 lg:px-8"
      >
        <ol className="flex flex-wrap items-center gap-2 text-sm text-[#7A5C3A]">
          <li>
            <Link href="/" className="hover:text-[#E87A1E] transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/tips"
              className="hover:text-[#E87A1E] transition-colors"
            >
              Tips
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <span className="font-medium text-[#4A2508]">{tip.title}</span>
          </li>
        </ol>
      </nav>

      {/* ============================================================ */}
      {/* 2. Hero Section                                               */}
      {/* ============================================================ */}
      <header className="mx-auto max-w-4xl px-4 pt-8 pb-6 sm:px-6 lg:px-8">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${categoryColor}`}
        >
          {categoryEmoji} {categoryLabel}
        </span>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#4A2508] sm:text-4xl lg:text-5xl">
          {tip.title}
        </h1>

        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl bg-[#F0E8D8]">
          <Image
            src={tip.heroImage}
            alt={tip.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
          />
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* ============================================================ */}
        {/* 3. Introduction                                              */}
        {/* ============================================================ */}
        <section className="pb-12">
          <p className="text-lg leading-relaxed text-[#7A5C3A] sm:text-xl sm:leading-relaxed">
            {tip.introduction}
          </p>
        </section>

        {/* ============================================================ */}
        {/* 4. Tips Section                                              */}
        {/* ============================================================ */}
        <section className="pb-16">
          <h2 className="mb-8 text-2xl font-bold text-[#4A2508] sm:text-3xl">
            Expert Tips &amp; Best Practices
          </h2>

          <div className="space-y-6">
            {tip.tips.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#F0E8D8] bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="flex items-start gap-4">
                  {/* Number badge */}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E87A1E] text-sm font-bold text-white">
                    {idx + 1}
                  </span>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#4A2508]">
                      {item.heading}
                    </h3>
                    <p className="mt-2 leading-relaxed text-[#7A5C3A]">
                      {item.body}
                    </p>

                    {item.proTip && (
                      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                        <p className="text-sm leading-relaxed text-amber-900">
                          <span className="font-semibold">💡 Pro Tip:</span>{" "}
                          {item.proTip}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. Specifications Table                                      */}
        {/* ============================================================ */}
        {tip.specifications && tip.specifications.length > 0 && (
          <section className="pb-16">
            <h2 className="mb-6 text-2xl font-bold text-[#4A2508] sm:text-3xl">
              Technical Specifications
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-[#F0E8D8] bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#F0E8D8] bg-[#FFFBF7]">
                    <th className="px-5 py-3.5 font-semibold text-[#4A2508]">
                      Specification
                    </th>
                    <th className="px-5 py-3.5 font-semibold text-[#4A2508]">
                      Value
                    </th>
                    <th className="hidden px-5 py-3.5 font-semibold text-[#4A2508] sm:table-cell">
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tip.specifications.map((spec, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-[#F0E8D8] last:border-b-0 ${
                        idx % 2 === 1 ? "bg-[#FFFBF7]/60" : "bg-white"
                      }`}
                    >
                      <td className="px-5 py-3 font-medium text-[#4A2508]">
                        {spec.label}
                      </td>
                      <td className="px-5 py-3 text-[#7A5C3A]">
                        {spec.value}
                      </td>
                      <td className="hidden px-5 py-3 text-[#7A5C3A] sm:table-cell">
                        {spec.note ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* 6. Cost Estimate Section                                     */}
        {/* ============================================================ */}
        {tip.costEstimates && tip.costEstimates.length > 0 && (
          <section className="pb-16">
            <h2 className="mb-6 text-2xl font-bold text-[#4A2508] sm:text-3xl">
              Estimated Costs (US Market)
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-[#F0E8D8] bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#F0E8D8] bg-[#FFFBF7]">
                    <th className="px-5 py-3.5 font-semibold text-[#4A2508]">
                      Item
                    </th>
                    <th className="px-5 py-3.5 font-semibold text-[#4A2508]">
                      Low Estimate
                    </th>
                    <th className="px-5 py-3.5 font-semibold text-[#4A2508]">
                      High Estimate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tip.costEstimates.map((cost, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-[#F0E8D8] last:border-b-0 ${
                        idx % 2 === 1 ? "bg-[#FFFBF7]/60" : "bg-white"
                      }`}
                    >
                      <td className="px-5 py-3 font-medium text-[#4A2508]">
                        {cost.item}
                      </td>
                      <td className="px-5 py-3 text-[#7A5C3A]">{cost.low}</td>
                      <td className="px-5 py-3 text-[#7A5C3A]">{cost.high}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-xs text-[#7A5C3A]/70">
              Prices are estimates based on 2026 US market averages. Actual
              costs may vary by region, supplier, and project scope.
            </p>
          </section>
        )}

        {/* ============================================================ */}
        {/* 7. Recommended Resource Card                                 */}
        {/* ============================================================ */}
        {tip.relatedProductSlug && (
          <section className="pb-16">
            <div className="rounded-2xl border border-[#E87A1E]/20 bg-gradient-to-r from-amber-50 to-orange-50 p-6 sm:p-8">
              <p className="text-sm font-semibold text-[#E87A1E]">
                📖 Recommended Resource
              </p>
              <h3 className="mt-2 text-xl font-bold text-[#4A2508]">
                {tip.relatedProductTitle}
              </h3>
              <p className="mt-2 leading-relaxed text-[#7A5C3A]">
                Get the complete guide with detailed diagrams, checklists, and
                professional specifications.
              </p>
              <Link
                href={`/store/${tip.relatedProductSlug}`}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#E87A1E] px-6 py-3 text-sm font-semibold text-white shadow transition-all hover:bg-[#d06a12] hover:shadow-md"
              >
                Get the Complete Guide →
              </Link>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* 8. FAQ Section                                               */}
        {/* ============================================================ */}
        <section className="pb-16">
          <h2 className="mb-6 text-2xl font-bold text-[#4A2508] sm:text-3xl">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {tip.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-2xl border border-[#F0E8D8] bg-white shadow-sm"
              >
                <summary className="cursor-pointer select-none px-6 py-4 text-base font-semibold text-[#4A2508] transition-colors hover:text-[#E87A1E] [&::-webkit-details-marker]:hidden list-none">
                  <span className="flex items-center justify-between gap-4">
                    <span>{faq.question}</span>
                    <span className="shrink-0 text-[#E87A1E] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <div className="px-6 pb-5 leading-relaxed text-[#7A5C3A]">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 9. Related Room Ideas                                        */}
        {/* ============================================================ */}
        {relatedRooms.length > 0 && (
          <section className="pb-16">
            <h2 className="mb-6 text-2xl font-bold text-[#4A2508] sm:text-3xl">
              Related Room Ideas
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {relatedRooms.map((room) => (
                <Link
                  key={room!.slug}
                  href={`/ideas/${room!.slug}/${firstRelatedStyle}`}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-[#F0E8D8] bg-white p-5 text-center shadow-sm transition-all hover:shadow-md hover:border-[#E87A1E]/30"
                >
                  <span className="text-3xl" aria-hidden="true">
                    {room!.icon ?? "🏠"}
                  </span>
                  <span className="text-sm font-semibold text-[#4A2508] group-hover:text-[#E87A1E] transition-colors">
                    {room!.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* 10. Related Style Guides                                     */}
        {/* ============================================================ */}
        {relatedStyles.length > 0 && (
          <section className="pb-16">
            <h2 className="mb-6 text-2xl font-bold text-[#4A2508] sm:text-3xl">
              Related Style Guides
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {relatedStyles.map((style) => (
                <Link
                  key={style!.slug}
                  href={`/guide/${style!.slug}`}
                  className="group overflow-hidden rounded-2xl border border-[#F0E8D8] bg-white shadow-sm transition-all hover:shadow-md hover:border-[#E87A1E]/30"
                >
                  {style!.thumbnail && (
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F0E8D8]">
                      <Image
                        src={style!.thumbnail}
                        alt={style!.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4 text-center">
                    <span className="text-sm font-semibold text-[#4A2508] group-hover:text-[#E87A1E] transition-colors">
                      {style!.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ============================================================ */}
      {/* 11. AI CTA Banner                                             */}
      {/* ============================================================ */}
      <section className="bg-[#4A2508] py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Visualize These Changes with AI
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-amber-100/80">
            Upload a photo of your room and see professional{" "}
            {tip.category === "lighting" ? "lighting" : "painting"} applied
            instantly.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.aihomedecorator.twa"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#E87A1E] px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#d06a12] hover:shadow-xl"
          >
            Transform My Room with AI Free →
          </a>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 12. More Tips                                                 */}
      {/* ============================================================ */}
      {relatedTips.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-[#4A2508] sm:text-3xl">
            More {categoryLabel} Tips
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTips.map((related) => {
              const relCatColor =
                related.category === "lighting"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-violet-100 text-violet-800";
              const relCatLabel =
                related.category === "lighting"
                  ? "💡 Lighting"
                  : "🎨 Painting";

              return (
                <Link
                  key={related.slug}
                  href={`/tips/${related.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#F0E8D8] bg-white shadow-sm transition-all hover:shadow-md hover:border-[#E87A1E]/30"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-[#F0E8D8]">
                    <Image
                      src={related.heroImage}
                      alt={related.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <span
                      className={`mb-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${relCatColor}`}
                    >
                      {relCatLabel}
                    </span>

                    <h3 className="text-lg font-bold text-[#4A2508] group-hover:text-[#E87A1E] transition-colors">
                      {related.title}
                    </h3>

                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#7A5C3A]">
                      {related.introduction.slice(0, 120)}
                      {related.introduction.length > 120 ? "…" : ""}
                    </p>

                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#E87A1E]">
                      Read Guide →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
