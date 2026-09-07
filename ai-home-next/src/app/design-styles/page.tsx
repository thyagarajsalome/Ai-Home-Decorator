import Link from 'next/link';
import { designStyles } from '@/data/designStyles';

export default function DesignStylesPage() {
  return (
    <div className="min-h-screen bg-obsidian-950 py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 font-heading">
            Interactive Regional{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400">
              Style Guides
            </span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg">
            Explore popular architectural and interior decor movements across the United States. Tap any style to view curated color palettes and furniture pairings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designStyles.map((style) => (
            <div 
              key={style.id} 
              className="bg-obsidian-900 border border-gray-800/80 rounded-2xl shadow-xl overflow-hidden flex flex-col group hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="h-52 bg-obsidian-850 relative overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${style.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent"></div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="text-xs text-purple-400 font-bold uppercase tracking-wider mb-2">{style.region}</div>
                  <h2 className="text-2xl font-bold text-white mb-2 font-heading">{style.name}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{style.description}</p>
                </div>
                <Link
                  href={`/design-styles/${style.id}`}
                  className="inline-block text-center w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold px-5 py-3 rounded-xl transition-all shadow-md shadow-purple-500/15"
                >
                  Explore Style Guide & Palette
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
