import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ROOMS, STYLES } from "@/lib/seoData";

export const metadata: Metadata = {
  title: "Interior Design Ideas & Inspiration by Room & Style | AI Home Decorator",
  description:
    "Explore hundreds of curated interior design ideas organized by room and design style. Discover color palettes, furniture layouts, and AI-powered makeover ideas.",
  alternates: {
    canonical: "https://aihomedecorator.com/ideas",
  },
};

export default function IdeasHubPage() {
  return (
    <main className="min-h-screen bg-[#FFFBF7]">
      {/* ── Breadcrumb ── */}
      <nav className="max-w-6xl mx-auto px-4 pt-6 pb-2 text-sm text-[#7A5C3A]">
        <Link href="/" className="hover:text-[#E87A1E]">
          Home
        </Link>
        <span className="mx-2">›</span>
        <span className="font-medium text-[#4A2508]">Design Ideas</span>
      </nav>

      {/* ── Hero ── */}
      <header className="max-w-6xl mx-auto px-4 py-10 md:py-14 text-center">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E87A1E]/10 text-[#E87A1E] mb-4 uppercase tracking-wider">
          Design Inspiration Hub
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#4A2508] mb-4 tracking-tight">
          Find Your Perfect Room Design
        </h1>
        <p className="max-w-2xl mx-auto text-[#7A5C3A] text-lg leading-relaxed mb-8">
          Browse by room or design aesthetic. Discover color swatches, expert styling tips, and visualize every combination instantly with AI.
        </p>
      </header>

      {/* ── Browse by Room ── */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#4A2508]">Explore by Room</h2>
            <p className="text-sm text-[#7A5C3A]">Select a room to view design styles tailored for it</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ROOMS.map((room) => (
            <div
              key={room.slug}
              className="bg-white rounded-2xl p-5 border border-[#F0E8D8] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">{room.icon}</div>
              <h3 className="font-bold text-[#4A2508] text-lg mb-1">{room.name}</h3>
              <p className="text-xs text-[#7A5C3A] mb-4 line-clamp-2">{room.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {STYLES.slice(0, 3).map((st) => (
                  <Link
                    key={st.slug}
                    href={`/ideas/${room.slug}/${st.slug}`}
                    className="text-[11px] font-medium bg-[#FFFBF7] border border-[#F0E8D8] text-[#4A2508] hover:text-[#E87A1E] px-2 py-0.5 rounded-md transition-colors"
                  >
                    {st.name}
                  </Link>
                ))}
                <Link
                  href={`/ideas/${room.slug}/${STYLES[0].slug}`}
                  className="text-[11px] font-semibold text-[#E87A1E] px-1 py-0.5"
                >
                  More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Browse by Style ── */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#4A2508]">Explore Popular Aesthetics</h2>
            <p className="text-sm text-[#7A5C3A]">15 signature interior styles with curated palettes and guides</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STYLES.map((style) => (
              <div
                key={style.slug}
                className="bg-[#FFFBF7] rounded-2xl overflow-hidden border border-[#F0E8D8] shadow-sm hover:shadow-md transition-all group flex flex-col"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src={style.thumbnail}
                    alt={style.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="font-bold text-lg drop-shadow">{style.name}</span>
                    <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      Guide Available
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-[#7A5C3A] mb-4 leading-relaxed line-clamp-2">
                    {style.tagline}
                  </p>

                  <div>
                    {/* Palette Dots */}
                    <div className="flex items-center gap-1.5 mb-4">
                      {style.palette.map((c) => (
                        <div
                          key={c.hex}
                          className="w-4 h-4 rounded-full border border-black/10"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#F0E8D8] text-xs font-semibold">
                      <Link
                        href={`/guide/${style.slug}`}
                        className="text-[#E87A1E] hover:underline"
                      >
                        Read Style Guide →
                      </Link>
                      <Link
                        href={`/ideas/living-room/${style.slug}`}
                        className="text-[#4A2508] hover:text-[#E87A1E]"
                      >
                        Living Room Ideas
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visual Matrix of All Combinations ── */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-[#4A2508] mb-2">Complete Design Directory</h2>
        <p className="text-sm text-[#7A5C3A] mb-8">
          Browse all room and aesthetic combinations
        </p>

        <div className="bg-white rounded-2xl p-6 border border-[#F0E8D8] shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROOMS.map((room) => (
              <div key={room.slug}>
                <h3 className="font-bold text-[#4A2508] text-sm mb-3 flex items-center gap-2 pb-2 border-b border-[#F0E8D8]">
                  <span>{room.icon}</span> {room.name}
                </h3>
                <ul className="space-y-1.5 text-xs">
                  {STYLES.map((style) => (
                    <li key={style.slug}>
                      <Link
                        href={`/ideas/${room.slug}/${style.slug}`}
                        className="text-[#7A5C3A] hover:text-[#E87A1E] transition-colors"
                      >
                        {style.name} {room.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
