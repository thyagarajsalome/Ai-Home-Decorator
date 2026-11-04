import { Metadata } from "next";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.aihomedecorator.twa";

export const metadata: Metadata = {
  title: "About Us | AI Home Decorator",
  description:
    "Learn about AI Home Decorator. The premier AI-powered home decorating and room makeover app for USA homeowners.",
  alternates: {
    canonical: "https://aihomedecorator.com/about",
  },
};

const About: React.FC = () => {
  return (
    <div className="min-h-[75vh] max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-[#382A22]">
      <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12 border border-[#F1E4D5]">
        
        {/* Brand header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#FCD7BA]">
            <Image
              src="/brand/logo.jpg"
              alt="AI Home Decorator"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#4A2508] font-heading">
              About AI Home Decorator
            </h1>
            <p className="text-xs font-bold text-[#E87A1E] uppercase tracking-wider">
              DESIGN &bull; DECORATE &bull; VISUALIZE
            </p>
          </div>
        </div>

        <div className="space-y-6 text-[#5C3314] leading-relaxed text-sm md:text-base">
          <p>
            Welcome to <strong>AI Home Decorator</strong>! Our mission is to empower homeowners, renters, and design enthusiasts across the United States to visualize their dream spaces without the high cost and weeks of waiting associated with traditional interior design agencies.
          </p>
          <p>
            With our official Android mobile application, you can snap a photo of any living room, kitchen, bedroom, bathroom, or garage, choose from over 30 architectural styles (such as Modern Farmhouse, Coastal Contemporary, Scandinavian, and Luxury Spa), and receive photorealistic redesign ideas in seconds.
          </p>

          <div className="border-t border-[#F1E4D5] my-8"></div>

          <h2 className="text-2xl font-black text-[#4A2508] mb-4 font-heading">
            How The App Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#FFFBF7] border border-[#F1E4D5]">
              <span className="inline-block w-8 h-8 rounded-lg bg-[#FEEDDF] border border-[#F8B98B] text-[#8D3D10] font-black text-center leading-8 mb-3">1</span>
              <h3 className="text-base font-bold text-[#4A2508] mb-1.5 font-heading">Snap Room Photo</h3>
              <p className="text-xs text-[#6D5D53]">
                Capture any room directly with your phone camera or select from your gallery.
              </p>
            </div>
            
            <div className="p-5 rounded-2xl bg-[#FFFBF7] border border-[#F1E4D5]">
              <span className="inline-block w-8 h-8 rounded-lg bg-[#FEEDDF] border border-[#F8B98B] text-[#8D3D10] font-black text-center leading-8 mb-3">2</span>
              <h3 className="text-base font-bold text-[#4A2508] mb-1.5 font-heading">Select Style</h3>
              <p className="text-xs text-[#6D5D53]">
                Choose from 30+ architectural presets or specify your custom preferences.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFFBF7] border border-[#F1E4D5]">
              <span className="inline-block w-8 h-8 rounded-lg bg-[#FEEDDF] border border-[#F8B98B] text-[#8D3D10] font-black text-center leading-8 mb-3">3</span>
              <h3 className="text-base font-bold text-[#4A2508] mb-1.5 font-heading">Instant Makeover</h3>
              <p className="text-xs text-[#6D5D53]">
                Inspect your new room with interactive before/after comparison sliders and save in HD.
              </p>
            </div>
          </div>

          <div className="border-t border-[#F1E4D5] my-8"></div>

          {/* App download CTA card */}
          <div className="p-6 rounded-2xl bg-[#FEEDDF]/60 border border-[#F8B98B] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-[#4A2508]">
                Ready to redecorate your home?
              </h3>
              <p className="text-xs text-[#6D5D53] mt-1">
                Install our official Android app today and get free starter redesign credits.
              </p>
            </div>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand-primary px-5 py-2.5 text-xs font-black shadow-md flex-shrink-0"
            >
              Get Android App ↗
            </a>
          </div>

          <div className="pt-4 flex items-center justify-between text-xs text-[#7A4B27]">
            <Link href="/" className="hover:text-[#E87A1E] font-bold">&larr; Back to Home</Link>
            <Link href="/usa" className="hover:text-[#E87A1E] font-bold">Explore USA Cities &rarr;</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
