import React from "react";
import Image from "next/image";
import Link from "next/link";
import InteractiveBeforeAfter from "@/components/InteractiveBeforeAfter";
import LeadCaptureSection from "@/components/LeadCaptureSection";
import { ELEMENT_CATEGORIES } from "@/constants";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.aihomedecorator.twa";

export default function Home() {
  // Extract popular styles for the SEO discovery grid
  const featuredStyles = [
    {
      category: "kitchen",
      categoryName: "Kitchen",
      style: "farmhouse-kitchen",
      styleName: "Farmhouse Kitchen",
      desc: "Warm shaker cabinets, butcher block islands, subway tiles, and apron sinks.",
      img: "/images/showcase/kitchen.jpg",
    },
    {
      category: "full_redesign",
      categoryName: "Living Room",
      style: "contemporary",
      styleName: "Contemporary Living",
      desc: "Warm earth tones, modern sectional sofas, statement lighting, and organic woods.",
      img: "/images/showcase/living-room.jpg",
    },
    {
      category: "bathroom",
      categoryName: "Bathroom",
      style: "luxury-spa",
      styleName: "Luxury Spa Bath",
      desc: "Freestanding soaking tubs, rainfall showers, floating vanities, and natural stone.",
      img: "/images/showcase/bathroom.jpg",
    },
    {
      category: "bedroom_styles",
      categoryName: "Bedroom",
      style: "scandinavian-minimal",
      styleName: "Scandinavian Master",
      desc: "Clean minimal lines, natural light, cozy textured linens, and warm oak accents.",
      img: "/images/showcase/bedroom.jpg",
    },
    {
      category: "outdoor_patio",
      categoryName: "Outdoor",
      style: "teak-timber-decking",
      styleName: "Teak Timber Patio",
      desc: "All-weather timber decking, pergola shade, ambient fire pit, and comfortable lounges.",
      img: "/images/showcase/patio.jpg",
    },
    {
      category: "wall_paint",
      categoryName: "Wall Styling",
      style: "accent-wall-styling",
      styleName: "Modern Accent Walls",
      desc: "Textured slat walls, moody tones, architectural molding, and gallery features.",
      img: "/images/showcase/wall-paint.jpg",
    },
  ];

  // Top USA cities for SEO links
  const topCities = [
    { name: "Los Angeles", state: "CA", slug: "ca/los-angeles", style: "California Modern" },
    { name: "Houston", state: "TX", slug: "tx/houston", style: "Modern Farmhouse" },
    { name: "Miami", state: "FL", slug: "fl/miami", style: "Coastal Contemporary" },
    { name: "San Jose", state: "CA", slug: "ca/san-jose", style: "Silicon Valley Tech Minimal" },
    { name: "Portland", state: "OR", slug: "or/portland", style: "Pacific Northwest Craftsman" },
    { name: "Chicago", state: "IL", slug: "il/chicago", style: "Urban Loft & Brick" },
    { name: "Austin", state: "TX", slug: "tx/austin", style: "Rustic Industrial Chic" },
    { name: "Seattle", state: "WA", slug: "wa/seattle", style: "Modern Scandinavian" },
    { name: "Denver", state: "CO", slug: "co/denver", style: "Mountain Modern" },
    { name: "Phoenix", state: "AZ", slug: "az/phoenix", style: "Southwestern Desert" },
  ];

  // Schema.org Structured Data for Google Rich Snippets & Pinterest
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://aihomedecorator.com/#app",
        "name": "AI Home Decorator",
        "operatingSystem": "Android",
        "applicationCategory": "DesignApplication",
        "url": PLAY_STORE_URL,
        "image": "https://aihomedecorator.com/brand/logo.jpg",
        "description": "Transform any room in seconds with AI Home Decorator. Upload room photos, choose from 30+ architectural styles, and visualize your dream interior.",
        "brand": {
          "@type": "Brand",
          "name": "AI Home Decorator",
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "1250",
          "bestRating": "5",
          "worstRating": "1",
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "shippingDetails": {
            "@type": "OfferShippingDetails",
            "shippingRate": {
              "@type": "MonetaryAmount",
              "value": "0.00",
              "currency": "USD",
            },
            "shippingDestination": {
              "@type": "DefinedRegion",
              "addressCountry": "US",
            },
            "deliveryTime": {
              "@type": "ShippingDeliveryTime",
              "handlingTime": {
                "@type": "QuantitativeValue",
                "minValue": 0,
                "maxValue": 0,
                "unitCode": "DAY",
              },
              "transitTime": {
                "@type": "QuantitativeValue",
                "minValue": 0,
                "maxValue": 0,
                "unitCode": "DAY",
              },
            },
          },
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "US",
            "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted",
          },
        },
      },
      {
        "@type": "Organization",
        "@id": "https://aihomedecorator.com/#organization",
        "name": "AI Home Decorator",
        "url": "https://aihomedecorator.com",
        "logo": "https://aihomedecorator.com/brand/logo.jpg",
        "sameAs": [
          "https://www.pinterest.com/aihomedecorator/",
          PLAY_STORE_URL,
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://aihomedecorator.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does AI Home Decorator redesign rooms?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simply take a photo of any living room, kitchen, bedroom, bathroom, or garage. Our AI detects room boundaries, windows, and architecture, applying photorealistic textures, furniture, and lighting in your selected style.",
            },
          },
          {
            "@type": "Question",
            "name": "Is AI Home Decorator free to download?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, AI Home Decorator is free to download on the Google Play Store and includes complimentary starter credits to test multiple room transformations.",
            },
          },
          {
            "@type": "Question",
            "name": "Can I redesign American architectural styles like Modern Farmhouse or Coastal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! AI Home Decorator offers 30+ popular American home styles including Modern Farmhouse, Coastal Contemporary, Mid-Century Modern, Mountain Rustic, and Luxury Spa.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-[#FFFBF7]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Subtle Whole-Page Architectural Blueprint Texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.06] mix-blend-multiply bg-center bg-repeat"
        style={{
          backgroundImage: "url('/brand/floor-plan.jpg')",
          backgroundSize: "1000px auto",
        }}
        aria-hidden="true"
      />

      {/* ============================================================ */}
      {/* 1. HERO SECTION: Brand Colors, Logo, Promo Mockups & Download */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 glow-warm">
        {/* Architectural Floor Plan Background Highlight */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/brand/floor-plan.jpg')",
            maskImage: "radial-gradient(ellipse at 50% 40%, black 25%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, black 25%, transparent 80%)",
          }}
          aria-hidden="true"
        />

        {/* Soft decorative background circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#FEEDDF]/60 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#FCD7BA]/40 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & Call to Action */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* USA Flag Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEEDDF] border border-[#F8B98B] text-[#8D3D10] text-xs font-bold mb-6 shadow-xs animate-fade">
                <span className="text-sm">🇺🇸</span>
                <span>The #1 AI Interior Design &amp; Room Makeover App for USA Homes</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#4A2508] tracking-tight font-heading leading-[1.1] mb-6">
                From Empty to{" "}
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#E87A1E] via-[#F29455] to-[#D46513]">
                  Extraordinary.
                </span>
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A2508]">
                  Reimagine Your Space.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-[#5C3314] mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Turn any room photo into a stunning, photorealistic interior design in seconds right on your Android phone. Experience 30+ architectural styles, instant camera snap, and interactive before/after sliders.
              </p>

              {/* Download CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform duration-200 hover:scale-105 active:scale-95 inline-block shadow-lg shadow-[#E87A1E]/30"
                >
                  <img
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                    alt="Download AI Home Decorator on Google Play"
                    className="h-16 w-auto"
                  />
                </a>

                <a
                  href="#simulator"
                  className="btn-brand-secondary px-6 py-3.5 text-xs sm:text-sm font-bold shadow-xs flex items-center gap-2"
                >
                  <span>Try Interactive Demo</span>
                  <span>↓</span>
                </a>
              </div>

              {/* Trust Metrics */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 border-t border-[#F1E4D5] text-xs font-semibold text-[#6D5D53]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#E87A1E] text-base">★★★★★</span>
                  <span className="font-bold text-[#4A2508]">4.9 / 5.0 Rating</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base">⚡</span>
                  <span>Instant AI Renderings</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base">🆓</span>
                  <span>Free Starter Credits</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md select-none group">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <Image
                    src="/brand/promo-empty-to-extraordinary.jpg"
                    alt="AI Home Decorator - From Empty to Extraordinary App Preview"
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-300"
                    priority
                  />
                </div>
                {/* Floating pill badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-xl border border-[#FCD7BA] flex items-center gap-2 whitespace-nowrap">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E87A1E] animate-ping" />
                  <span className="text-xs font-black text-[#4A2508]">
                    Official Native Android App
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. HOW IT WORKS: 3 SIMPLE STEPS (Matching App Screenshots) */}
      {/* ============================================================ */}
      <section className="py-16 bg-white border-y border-[#F1E4D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black text-[#E87A1E] uppercase tracking-widest">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#4A2508] mt-2 font-heading">
              How AI Home Decorator Works
            </h2>
            <p className="text-sm text-[#6D5D53] mt-2">
              Transform any space in less than 30 seconds straight from your smartphone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-[#FFFBF7] border border-[#F1E4D5] shadow-xs text-center flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-2xl bg-[#FEEDDF] border border-[#F8B98B] flex items-center justify-center text-3xl mb-5 shadow-inner">
                📷
              </div>
              <span className="text-xs font-bold text-[#E87A1E] uppercase tracking-wider">Step 01</span>
              <h3 className="text-xl font-bold text-[#4A2508] mt-1 mb-2 font-heading">
                Upload Your Room
              </h3>
              <p className="text-xs sm:text-sm text-[#6D5D53] leading-relaxed">
                Take a quick photo of your empty, unfurnished, or outdated room with your camera, or choose one from your photo gallery.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-[#FFFBF7] border border-[#F1E4D5] shadow-xs text-center flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-2xl bg-[#FEEDDF] border border-[#F8B98B] flex items-center justify-center text-3xl mb-5 shadow-inner">
                ⊞⊞
              </div>
              <span className="text-xs font-bold text-[#E87A1E] uppercase tracking-wider">Step 02</span>
              <h3 className="text-xl font-bold text-[#4A2508] mt-1 mb-2 font-heading">
                Choose a Style
              </h3>
              <p className="text-xs sm:text-sm text-[#6D5D53] leading-relaxed">
                Select from 30+ curated styles including Modern Farmhouse, Contemporary, Scandinavian, Coastal, Rustic, or enter your own custom ideas.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-[#FFFBF7] border border-[#F1E4D5] shadow-xs text-center flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-2xl bg-[#FEEDDF] border border-[#F8B98B] flex items-center justify-center text-3xl mb-5 shadow-inner">
                🪄
              </div>
              <span className="text-xs font-bold text-[#E87A1E] uppercase tracking-wider">Step 03</span>
              <h3 className="text-xl font-bold text-[#4A2508] mt-1 mb-2 font-heading">
                Get a New Look
              </h3>
              <p className="text-xs sm:text-sm text-[#6D5D53] leading-relaxed">
                Watch AI generate photorealistic furniture, lighting, and textures while keeping your room&apos;s exact layout and dimensions intact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. INTERACTIVE SIMULATOR: Before/After Slider */}
      {/* ============================================================ */}
      <section id="simulator" className="py-16 lg:py-20 bg-[#FAF4EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-black text-[#E87A1E] uppercase tracking-widest">
              Interactive Preview
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#4A2508] mt-2 font-heading">
              See the Transformation in Real-Time
            </h2>
            <p className="text-sm text-[#6D5D53] mt-2">
              Slide back and forth to inspect how AI furnishes bare walls, styles flooring, and optimizes lighting.
            </p>
          </div>

          {/* Interactive Component */}
          <InteractiveBeforeAfter />

          {/* App download button below slider */}
          <div className="mt-8 text-center">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand-primary px-8 py-3.5 text-sm font-black shadow-lg shadow-[#E87A1E]/30 inline-flex items-center gap-2"
            >
              <span>Download Android App to Redesign Your Room</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. DESIGN EVERY ROOM: Kitchen, Bathroom, Garage, Bedrooms */}
      {/* ============================================================ */}
      <section id="rooms" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black text-[#E87A1E] uppercase tracking-widest">
              Room Inspirations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4A2508] mt-2 font-heading">
              Design Every Room in Your Home
            </h2>
            <p className="text-sm sm:text-base text-[#6D5D53] mt-2">
              From compact urban bathrooms to spacious suburban living halls and functional garages, AI Home Decorator handles every space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Promo Card 1: All Rooms */}
            <div className="rounded-3xl overflow-hidden border border-[#F1E4D5] bg-[#FFFBF7] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FAF4EC]">
                <Image
                  src="/brand/promo-rooms.jpg"
                  alt="Design Every Room - Kitchen, Bedroom, Living Room"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs font-bold text-[#E87A1E] uppercase tracking-wider">
                  Complete Living Spaces
                </span>
                <h3 className="text-xl font-bold text-[#4A2508] mt-1 mb-2 font-heading">
                  Living Rooms &amp; Master Bedrooms
                </h3>
                <p className="text-xs text-[#6D5D53] leading-relaxed mb-4 flex-grow">
                  Test custom sofa configurations, modern rugs, warm color palettes, and ambient light fixtures tailored for cozy family spaces.
                </p>
                <Link
                  href="/design/full_redesign/contemporary"
                  className="text-xs font-bold text-[#E87A1E] hover:underline flex items-center gap-1"
                >
                  <span>Explore Living Room Styles</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Promo Card 2: Bathroom Design */}
            <div className="rounded-3xl overflow-hidden border border-[#F1E4D5] bg-[#FFFBF7] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FAF4EC]">
                <Image
                  src="/brand/promo-bathroom.jpg"
                  alt="Design Your Dream Bathroom"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs font-bold text-[#E87A1E] uppercase tracking-wider">
                  Luxury Bathrooms
                </span>
                <h3 className="text-xl font-bold text-[#4A2508] mt-1 mb-2 font-heading">
                  Spa-Grade Bathrooms &amp; Vanities
                </h3>
                <p className="text-xs text-[#6D5D53] leading-relaxed mb-4 flex-grow">
                  Visualize walk-in glass showers, freestanding soaking bathtubs, double vanities, and clean stone tiling without costly contractor mockups.
                </p>
                <Link
                  href="/design/bathroom/luxury-spa"
                  className="text-xs font-bold text-[#E87A1E] hover:underline flex items-center gap-1"
                >
                  <span>Explore Bathroom Styles</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Promo Card 3: Garage & Storage */}
            <div className="rounded-3xl overflow-hidden border border-[#F1E4D5] bg-[#FFFBF7] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FAF4EC]">
                <Image
                  src="/brand/promo-garage.jpg"
                  alt="Design Your Ideal Garage"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs font-bold text-[#E87A1E] uppercase tracking-wider">
                  Garage &amp; Workshop
                </span>
                <h3 className="text-xl font-bold text-[#4A2508] mt-1 mb-2 font-heading">
                  Ideal Garage &amp; Storage Layouts
                </h3>
                <p className="text-xs text-[#6D5D53] leading-relaxed mb-4 flex-grow">
                  Turn cluttered car garages into sleek organized workshops with epoxy flooring, modular cabinets, and dedicated tool storage.
                </p>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#E87A1E] hover:underline flex items-center gap-1"
                >
                  <span>Redesign in Android App</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. POPULAR ARCHITECTURAL STYLES (SEO Hub) */}
      {/* ============================================================ */}
      <section id="styles" className="py-20 bg-[#FAF4EC] border-t border-[#EEDBC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-black text-[#E87A1E] uppercase tracking-widest">
                Design Catalog
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#4A2508] mt-2 font-heading">
                Popular Design Styles in American Homes
              </h2>
              <p className="text-sm text-[#6D5D53] mt-2 max-w-xl">
                Browse curated architectural themes designed to match popular USA home building trends.
              </p>
            </div>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 md:mt-0 text-xs font-black text-[#E87A1E] hover:underline inline-flex items-center gap-1"
            >
              <span>Explore all styles in the app</span>
              <span>&rarr;</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStyles.map((item) => (
              <Link
                key={item.style}
                href={`/design/${item.category}/${item.style}`}
                className="group rounded-2xl overflow-hidden bg-white border border-[#EEDBC9] shadow-xs hover:shadow-lg hover:border-[#E87A1E] transition-all flex flex-col"
              >
                <div className="relative h-48 w-full overflow-hidden bg-[#FEEDDF]">
                  <Image
                    src={item.img}
                    alt={`${item.styleName} - AI Home Decorator`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-black text-[#4A2508] uppercase">
                    {item.categoryName}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-[#4A2508] group-hover:text-[#E87A1E] transition-colors font-heading">
                    {item.styleName}
                  </h3>
                  <p className="text-xs text-[#6D5D53] mt-1.5 leading-relaxed flex-grow">
                    {item.desc}
                  </p>
                  <div className="mt-4 pt-3 border-t border-[#F1E4D5] flex items-center justify-between text-xs font-bold text-[#E87A1E]">
                    <span>View Style Guide</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. USA CITIES DIRECTORY (High-Impact Local SEO) */}
      {/* ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEEDDF] border border-[#F8B98B] text-[#8D3D10] text-xs font-bold mb-3">
                <span>🇺🇸</span>
                <span>Localized USA Architecture Guides</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#4A2508] font-heading">
                AI Interior Design Across America
              </h2>
              <p className="text-sm text-[#6D5D53] mt-2 max-w-xl">
                Explore tailored design guides and architectural trends across top US real estate markets.
              </p>
            </div>
            <Link
              href="/usa"
              className="mt-4 md:mt-0 btn-brand-secondary px-5 py-2.5 text-xs font-extrabold"
            >
              <span>View All 50 US Cities</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {topCities.map((c) => (
              <Link
                key={c.slug}
                href={`/usa/${c.slug}`}
                className="p-4 rounded-2xl bg-[#FFFBF7] border border-[#F1E4D5] hover:border-[#E87A1E] hover:bg-[#FEEDDF]/40 transition-all shadow-xs group"
              >
                <div className="text-xs font-bold text-[#4A2508] group-hover:text-[#E87A1E]">
                  {c.name}, {c.state}
                </div>
                <div className="text-[10px] text-[#7A4B27] mt-1 font-medium">
                  {c.style}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. EMAIL LEAD CAPTURE: 2026 Home Lookbook & Prompts */}
      {/* ============================================================ */}
      <LeadCaptureSection source="homepage_main" />

      {/* ============================================================ */}
      {/* 8. BIG BOTTOM CONVERSION BANNER */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden py-20 bg-white border-t border-[#F1E4D5]">
        {/* Floor Plan Background in Bottom Banner */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply bg-center bg-cover"
          style={{
            backgroundImage: "url('/brand/floor-plan.jpg')",
            maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-6 shadow-md border border-[#FCD7BA]">
            <Image
              src="/brand/logo.jpg"
              alt="AI Home Decorator"
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>

          <span className="text-xs font-black text-[#E87A1E] uppercase tracking-widest">
            Available on Google Play
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#4A2508] mt-2 mb-4 font-heading">
            Transform Your Space Today
          </h2>
          <p className="text-base text-[#5C3314] max-w-xl mx-auto mb-8 leading-relaxed">
            Download AI Home Decorator now and start redesigning any room in your home with instant AI inspiration.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-200 hover:scale-105 active:scale-95 inline-block shadow-xl shadow-[#E87A1E]/30"
            >
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                className="h-16 w-auto"
              />
            </a>
          </div>

          <p className="text-xs text-[#8D7D72] mt-4">
            Free download &bull; Android 8.0+ &bull; 4.9 ★★★★★ on Google Play Store
          </p>
        </div>
      </section>

    </div>
  );
}
