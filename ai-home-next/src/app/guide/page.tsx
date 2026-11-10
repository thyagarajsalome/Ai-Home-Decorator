import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { STYLES } from "@/lib/seoData";

export const metadata: Metadata = {
  title: "Interior Design Style Guides (2026): 15 Aesthetics Explained | AI Home Decorator",
  description:
    "Complete guides to every major interior design style: Japandi, Scandinavian, Modern Farmhouse, Mid-Century, Coastal, and more. Find color palettes, furniture guides, and decorating rules.",
  alternates: {
    canonical: "https://aihomedecorator.com/guide",
  },
};

export default function GuideIndexPage() {
  return (
    <main className="min-h-screen bg-[#FFFBF7]">
      {/* ── Breadcrumbs ── */}
      <nav className="max-w-6xl mx-auto px-4 pt-6 pb-2 text-sm text-[#7A5C3A]">
        <Link href="/" className="hover:text-[#E87A1E]">
          Home
        </Link>
        <span className="mx-2">›</span>
        <span className="font-medium text-[#4A2508]">Style Guides</span>
      </nav>

      {/* ── Header ── */}
      <header className="max-w-6xl mx-auto px-4 py-10 md:py-14 text-center">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E87A1E]/10 text-[#E87A1E] mb-4 uppercase tracking-wider">
          Aesthetic Encyclopedias
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#4A2508] mb-4 tracking-tight">
          Interior Design Style Guides
        </h1>
        <p className="max-w-2xl mx-auto text-[#7A5C3A] text-lg leading-relaxed">
          Master the fundamentals of each interior design aesthetic. Explore signature color palettes, material palettes, essential furniture, and decorating rules.
        </p>
      </header>

      {/* ── 15 Style Guides Grid ── */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STYLES.map((style) => (
            <article
              key={style.slug}
              className="bg-white rounded-2xl overflow-hidden border border-[#F0E8D8] shadow-sm hover:shadow-md transition-all group flex flex-col"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={style.thumbnail}
                  alt={`${style.name} interior style`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <h2 className="absolute bottom-3 left-4 text-white text-xl font-bold drop-shadow">
                  {style.name}
                </h2>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-[#7A5C3A] leading-relaxed mb-4">
                    {style.tagline}
                  </p>

                  <div className="mb-4">
                    <span className="text-[11px] font-semibold text-[#4A2508] uppercase tracking-wider block mb-1.5">
                      Signature Palette
                    </span>
                    <div className="flex items-center gap-1.5">
                      {style.palette.map((c) => (
                        <div
                          key={c.hex}
                          className="w-5 h-5 rounded-full border border-black/10 shadow-sm"
                          style={{ backgroundColor: c.hex }}
                          title={`${c.name} (${c.hex})`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F0E8D8] flex items-center justify-between text-xs font-semibold">
                  <Link
                    href={`/guide/${style.slug}`}
                    className="text-[#E87A1E] hover:underline"
                  >
                    Read Complete Guide →
                  </Link>
                  <Link
                    href={`/ideas/living-room/${style.slug}`}
                    className="text-[#7A5C3A] hover:text-[#4A2508]"
                  >
                    Room Ideas
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
