import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ALL_TIPS } from "@/lib/tipsData";

export const metadata: Metadata = {
  title: "Home Improvement Tips & Guides | AI Home Decorator",
  description:
    "Expert home improvement tips and guides covering lighting design, painting techniques, color selection, and more. Transform your space with professional advice and AI-powered visualization.",
  alternates: {
    canonical: "https://aihomedecorator.com/tips",
  },
  openGraph: {
    title: "Home Improvement Tips & Guides | AI Home Decorator",
    description:
      "Expert home improvement tips and guides covering lighting design, painting techniques, color selection, and more.",
    url: "https://aihomedecorator.com/tips",
    siteName: "AI Home Decorator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Improvement Tips & Guides | AI Home Decorator",
    description:
      "Expert home improvement tips and guides covering lighting design, painting techniques, color selection, and more.",
  },
};

export default function TipsHubPage() {
  const lightingTips = ALL_TIPS.filter((t) => t.category === "lighting");
  const paintingTips = ALL_TIPS.filter((t) => t.category === "painting");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Home Improvement Tips & Guides",
    description:
      "Expert home improvement tips and guides covering lighting design, painting techniques, color selection, and more.",
    url: "https://aihomedecorator.com/tips",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: ALL_TIPS.map((tip, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tip.title,
        url: `https://aihomedecorator.com/tips/${tip.slug}`,
      })),
    },
  };

  return (
    <main className="min-h-screen bg-[#FFFBF7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8"
      >
        <ol className="flex items-center gap-2 text-sm text-[#7A5C3A]">
          <li>
            <Link href="/" className="hover:text-[#E87A1E] transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <span className="font-medium text-[#4A2508]">Tips</span>
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#4A2508] sm:text-4xl lg:text-5xl">
          Home Improvement Tips & Expert Guides
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#7A5C3A]">
          Professional advice on lighting, painting, and more — backed by
          AI-powered visualization to help you see results before you start.
        </p>
      </section>

      {/* Lighting Tips */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <span className="text-3xl" aria-hidden="true">
            💡
          </span>
          <h2 className="text-2xl font-bold text-[#4A2508] sm:text-3xl">
            Lighting Tips
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lightingTips.map((topic) => (
            <TipCard key={topic.slug} topic={topic} />
          ))}
        </div>
      </section>

      {/* Painting Tips */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <span className="text-3xl" aria-hidden="true">
            🎨
          </span>
          <h2 className="text-2xl font-bold text-[#4A2508] sm:text-3xl">
            Painting Tips
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paintingTips.map((topic) => (
            <TipCard key={topic.slug} topic={topic} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#4A2508] py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            See Your Ideas Come to Life with AI
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-amber-100/80">
            Upload a photo of any room and instantly visualize new lighting,
            paint colors, and design styles — powered by AI.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.aihomedecorator.twa"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#E87A1E] px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#d06a12] hover:shadow-xl"
          >
            Try AI Home Decorator Free →
          </a>
        </div>
      </section>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Tip Card Component                                                 */
/* ------------------------------------------------------------------ */

function TipCard({ topic }: { topic: (typeof ALL_TIPS)[number] }) {
  const categoryLabel =
    topic.category === "lighting" ? "💡 Lighting" : "🎨 Painting";
  const categoryColor =
    topic.category === "lighting"
      ? "bg-amber-100 text-amber-800"
      : "bg-violet-100 text-violet-800";

  return (
    <Link
      href={`/tips/${topic.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#F0E8D8] bg-white shadow-sm transition-all hover:shadow-md hover:border-[#E87A1E]/30"
    >
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#F0E8D8]">
        <Image
          src={topic.heroImage}
          alt={topic.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <span
          className={`mb-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${categoryColor}`}
        >
          {categoryLabel}
        </span>

        <h3 className="text-lg font-bold text-[#4A2508] group-hover:text-[#E87A1E] transition-colors">
          {topic.title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#7A5C3A]">
          {topic.introduction.slice(0, 120)}
          {topic.introduction.length > 120 ? "…" : ""}
        </p>

        <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#E87A1E]">
          Read Guide →
        </span>
      </div>
    </Link>
  );
}
