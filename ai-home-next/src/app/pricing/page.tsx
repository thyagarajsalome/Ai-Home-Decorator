import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Get App & Credits | AI Home Decorator",
  description:
    "Download the AI Home Decorator Android app. Enjoy free starter credits to transform your living room, kitchen, bedroom, or bathroom with instant AI styles.",
  alternates: {
    canonical: "https://aihomedecorator.com/pricing",
  },
  openGraph: {
    title: "Get App & Credits | AI Home Decorator",
    description: "Download the native app with free starter credits for AI interior redesigns.",
    url: "https://aihomedecorator.com/pricing",
  },
};

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.aihomedecorator.twa";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF7] text-[#382A22] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEEDDF] border border-[#F8B98B] text-[#8D3D10] text-xs font-bold mb-4 shadow-xs">
            <span>🎉</span>
            <span>Free To Download on Android</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4A2508] font-heading mb-4">
            Start Redesigning with Free Credits
          </h1>
          <p className="text-sm sm:text-base text-[#5C3314] max-w-xl mx-auto leading-relaxed">
            Download the official AI Home Decorator mobile app from Google Play to claim free design credits and begin transforming your rooms today.
          </p>
        </div>

        {/* Feature Comparison Box */}
        <div className="bg-white rounded-3xl border-2 border-[#FCD7BA] p-8 sm:p-12 shadow-lg mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-black text-[#E87A1E] uppercase tracking-wider">
                Mobile App Experience
              </span>
              <h2 className="text-2xl font-black text-[#4A2508] mt-1 mb-4 font-heading">
                All Features Included in the Native App
              </h2>
              <div className="space-y-3 text-xs sm:text-sm font-semibold text-[#5C3314]">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#FEEDDF] text-[#E87A1E] flex items-center justify-center font-bold">✓</span>
                  <span>Instant Camera Photo Upload</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#FEEDDF] text-[#E87A1E] flex items-center justify-center font-bold">✓</span>
                  <span>30+ Curated Architectural Styles</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#FEEDDF] text-[#E87A1E] flex items-center justify-center font-bold">✓</span>
                  <span>Interactive Before / After Comparison Slider</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#FEEDDF] text-[#E87A1E] flex items-center justify-center font-bold">✓</span>
                  <span>Ultra-HD Image Exports</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#FEEDDF] text-[#E87A1E] flex items-center justify-center font-bold">✓</span>
                  <span>Save Favorites to Your Device</span>
                </div>
              </div>
            </div>

            <div className="bg-[#FFFBF7] rounded-2xl p-6 border border-[#F1E4D5] text-center flex flex-col items-center">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden mb-4 border border-[#FCD7BA] shadow-sm">
                <Image
                  src="/brand/logo.jpg"
                  alt="AI Home Decorator"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-black text-[#4A2508] font-heading mb-1">
                AI Home Decorator
              </h3>
              <p className="text-xs text-[#6D5D53] mb-6">
                Official Google Play Android Application
              </p>

              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-200 hover:scale-105 active:scale-95 inline-block shadow-md mb-3"
              >
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  className="h-14 w-auto"
                />
              </a>

              <span className="text-[11px] font-bold text-[#8D3D10]">
                ★★★★★ 4.9 Rating &bull; Free to Try
              </span>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center text-xs text-[#7A4B27]">
          <Link href="/" className="hover:text-[#E87A1E] font-bold">&larr; Return to Home</Link>
        </div>

      </div>
    </div>
  );
}
