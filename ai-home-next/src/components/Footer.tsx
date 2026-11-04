"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.aihomedecorator.twa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF4EC] border-t border-[#EEDBC9] py-14 mt-auto transition-colors duration-200 text-[#382A22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 items-start text-left">
          
          {/* Brand Column */}
          <div className="flex flex-col space-y-3 sm:col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-[#FCD7BA] bg-white flex-shrink-0">
                <Image
                  src="/brand/logo.jpg"
                  alt="AI Home Decorator Logo"
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 font-heading font-black text-lg leading-tight">
                  <span className="text-[#E87A1E]">AI</span>
                  <span className="text-[#4A2508]">Home Decorator</span>
                </div>
                <span className="text-[8px] font-bold tracking-widest text-[#7A4B27] uppercase">
                  DESIGN • DECORATE • VISUALIZE
                </span>
              </div>
            </Link>

            <p className="text-[#6D5D53] text-xs leading-relaxed max-w-sm pt-1">
              The premier AI room makeover and interior design app for USA homeowners and renters. Reimagine your space in 30+ styles with instant photorealistic renders.
            </p>

            <div className="pt-2">
              <a 
                href={PLAY_STORE_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block transition-transform duration-200 hover:scale-105"
              >
                <img 
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                  alt="Get it on Google Play" 
                  className="h-11 w-auto" 
                />
              </a>
            </div>
            
            <p className="text-[#8D7D72] text-[11px] pt-1">
              &copy; {new Date().getFullYear()} AI Home Decorator. All rights reserved.
            </p>
          </div>

          {/* Explore Styles Column (SEO) */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#4A2508]">
              Room &amp; Style Guides
            </h4>
            <div className="flex flex-col space-y-2 text-xs font-semibold text-[#6D5D53]">
              <Link href="/design/kitchen/farmhouse-kitchen" className="hover:text-[#E87A1E] transition-colors">
                Farmhouse Kitchens
              </Link>
              <Link href="/design/bathroom/luxury-spa" className="hover:text-[#E87A1E] transition-colors">
                Luxury Spa Bathrooms
              </Link>
              <Link href="/design/full_redesign/contemporary" className="hover:text-[#E87A1E] transition-colors">
                Contemporary Living Rooms
              </Link>
              <Link href="/design/full_redesign/scandinavian" className="hover:text-[#E87A1E] transition-colors">
                Scandinavian Interiors
              </Link>
              <Link href="/design/outdoor_patio/teak-timber-decking" className="hover:text-[#E87A1E] transition-colors">
                Outdoor Decks &amp; Patios
              </Link>
              <Link href="/#styles" className="text-[#E87A1E] font-bold hover:underline pt-1">
                Explore All 30+ Styles &rarr;
              </Link>
            </div>
          </div>

          {/* US Cities Directory (SEO) */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#4A2508]">
              US Cities Directory
            </h4>
            <div className="flex flex-col space-y-2 text-xs font-semibold text-[#6D5D53]">
              <Link href="/usa/ca/los-angeles" className="hover:text-[#E87A1E] transition-colors">
                Los Angeles, CA
              </Link>
              <Link href="/usa/tx/houston" className="hover:text-[#E87A1E] transition-colors">
                Houston, TX
              </Link>
              <Link href="/usa/fl/miami" className="hover:text-[#E87A1E] transition-colors">
                Miami, FL
              </Link>
              <Link href="/usa/ca/san-jose" className="hover:text-[#E87A1E] transition-colors">
                San Jose, CA
              </Link>
              <Link href="/usa/or/portland" className="hover:text-[#E87A1E] transition-colors">
                Portland, OR
              </Link>
              <Link href="/usa" className="text-[#E87A1E] font-bold hover:underline pt-1">
                All 50 US Cities &rarr;
              </Link>
            </div>
          </div>

          {/* Quick & Legal Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#4A2508]">
              Information
            </h4>
            <div className="flex flex-col space-y-2 text-xs font-semibold text-[#6D5D53]">
              <Link href="/about" className="hover:text-[#E87A1E] transition-colors">
                About Our App
              </Link>
              <Link href="/terms" className="hover:text-[#E87A1E] transition-colors">
                Terms of Service
              </Link>
              <Link href="/policy" className="hover:text-[#E87A1E] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/disclaimer" className="hover:text-[#E87A1E] transition-colors">
                Disclaimer
              </Link>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E87A1E] font-bold hover:underline"
              >
                Download on Google Play
              </a>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#4A2508]">
              Contact &amp; Support
            </h4>
            <p className="text-xs text-[#6D5D53] leading-relaxed">
              Have feedback, questions, or room styling suggestions?
            </p>
            <div className="pt-1 text-xs text-[#7A4B27]">
              <span>Email: </span>
              <a href="mailto:contactaihomedecorator@gmail.com" className="underline hover:text-[#E87A1E] font-medium">
                contactaihomedecorator@gmail.com
              </a>
            </div>
            <div className="pt-2">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand-primary px-4 py-2 text-xs font-black"
              >
                Get Android App &rarr;
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-[#EEDBC9] text-center text-[11px] text-[#8D7D72] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AI Home Decorator &bull; Native Android App Available on Google Play Store</span>
          <span>Crafted for American Homeowners &bull; DESIGN &bull; DECORATE &bull; VISUALIZE</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
