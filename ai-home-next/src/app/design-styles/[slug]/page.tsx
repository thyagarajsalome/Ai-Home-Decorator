import Link from 'next/link';
import { notFound } from 'next/navigation';
import { designStyles } from '@/data/designStyles';
import SafeImage from '@/components/SafeImage';

export default async function StyleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const style = designStyles.find((s) => s.id === slug);

  if (!style) {
    notFound();
  }

  return (
    <div className="bg-obsidian-950 min-h-screen text-gray-100">
      {/* Hero Banner */}
      <div className="w-full h-80 md:h-96 relative overflow-hidden">
        <SafeImage
          src={style.image}
          fallbackSrc={style.fallbackImage}
          alt={style.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
          <div className="text-center px-4 max-w-3xl animate-fade">
            <span className="inline-block px-3 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
              {style.region}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-3 font-heading tracking-tight">
              {style.name}
            </h1>
            <p className="text-sm md:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
              {style.description}
            </p>
            <div className="mt-6">
              <Link
                href="/#workspace"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-purple-500/25 hover:scale-105 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Apply This Style to Your Room Free
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6 border-b border-gray-800 pb-3 font-heading">
            Curated Color Palette
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {style.palette.map((color, index) => (
              <div key={index} className="flex flex-col items-center bg-obsidian-900 border border-gray-800/80 p-4 rounded-2xl shadow-md">
                <div 
                  className="w-16 h-16 rounded-xl shadow-inner border border-white/10 mb-3"
                  style={{ backgroundColor: color }}
                ></div>
                <span className="text-xs font-mono text-gray-300 font-bold uppercase">{color}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Shop the Look */}
        <section>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6 border-b border-gray-800 pb-3 font-heading">
            Style Essentials & Furniture
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {style.items.map((item, index) => (
              <div key={index} className="bg-obsidian-900 rounded-2xl shadow-md border border-gray-800/80 p-6 flex flex-col justify-between hover:border-purple-500/30 transition-colors">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-purple-400 font-extrabold text-lg mb-4">${item.price}</p>
                </div>
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-center w-full bg-obsidian-800 hover:bg-obsidian-750 text-gray-200 hover:text-white border border-gray-750 font-bold py-2.5 rounded-xl transition-colors text-sm"
                >
                  View Product
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
