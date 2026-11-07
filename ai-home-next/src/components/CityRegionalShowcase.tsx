import React from "react";
import Image from "next/image";

interface CityRegionalShowcaseProps {
  city: string;
  cityName: string;
  state: string;
  stateName: string;
  popularStyle: string;
  challenge?: string;
}

interface RegionalProfile {
  regionName: string;
  tagline: string;
  cards: {
    title: string;
    spaceType: string;
    style: string;
    image: string;
    description: string;
  }[];
  palette: {
    name: string;
    hex: string;
    role: string;
  }[];
  climateTips: string[];
}

function getRegionalProfile(state: string, popularStyle: string, cityName: string): RegionalProfile {
  const st = state.toLowerCase();

  // 1. Coastal & Sunshine States
  if (["fl", "ca", "hi", "sc", "nc", "ga"].includes(st) || popularStyle.toLowerCase().includes("coastal")) {
    return {
      regionName: "Coastal & Sunbelt Architecture",
      tagline: `Sun-drenched spaces, breezy open plans, and seamless indoor-outdoor living suited for ${cityName}.`,
      cards: [
        {
          title: "Breezy Open-Concept Living",
          spaceType: "Living Room",
          style: "Coastal Modern & Bohemian",
          image: "/images/showcase/living-room.webp",
          description: "High ceilings, linen sofas, and light white oak floors that maximize coastal breezes and daylight.",
        },
        {
          title: "Resort-Style Poolside Oasis",
          spaceType: "Backyard & Pool",
          style: "Tropical Resort Landscape",
          image: "/images/showcase/backyard-pool.webp",
          description: "Travertine pool coping, low-maintenance palms, and sunken lounge seating built for year-round hosting.",
        },
        {
          title: "Sun-Bleached Stucco Villa",
          spaceType: "House Facade",
          style: "Mediterranean & Modern Stucco",
          image: "/images/showcase/architecture-villa.webp",
          description: "Smooth off-white stucco with terracotta tile highlights and drought-tolerant bougainvillea accents.",
        },
      ],
      palette: [
        { name: "Alabaster White", hex: "#F7F5EE", role: "Light-Reflecting Walls" },
        { name: "Ocean Breeze Blue", hex: "#4A6E82", role: "Accent Feature Wall" },
        { name: "Sun-Bleached Travertine", hex: "#D6C7B2", role: "Floors & Pool Deck" },
        { name: "Warm Terracotta", hex: "#C86A45", role: "Planters & Textiles" },
      ],
      climateTips: [
        "UV-resistant sheer linen drapery to preserve furniture while flooding rooms with natural light.",
        "Moisture-proof luxury porcelain or tumbled travertine floors to handle sand and humidity.",
        "Deep roof overhangs and automated louvered pergolas for cooler outdoor entertaining.",
      ],
    };
  }

  // 2. Southwest & Desert States
  if (["az", "nv", "nm", "ut"].includes(st) || popularStyle.toLowerCase().includes("southwest") || popularStyle.toLowerCase().includes("desert")) {
    return {
      regionName: "Desert Modern & Southwestern Architecture",
      tagline: `Cooling thermal mass, natural earthy stone, and heat-resistant desert aesthetics tailored for ${cityName}.`,
      cards: [
        {
          title: "Cooling Desert Living Room",
          spaceType: "Living Hall",
          style: "Southwestern Contemporary",
          image: "/images/showcase/living-room.webp",
          description: "Polished concrete and natural stone surfaces that stay cool during peak midday desert temperatures.",
        },
        {
          title: "Modern Stucco & Slat Facade",
          spaceType: "Exterior Architecture",
          style: "Modern Slats & Adobe",
          image: "/images/showcase/house-facade.webp",
          description: "Deep recessed window frames and insulated stucco mass to shield the interior from western sun exposure.",
        },
        {
          title: "Drought-Tolerant Firepit Deck",
          spaceType: "Patio & Yard",
          style: "Modern Desert Xeriscape",
          image: "/images/showcase/patio.webp",
          description: "Flagstone pavers, decomposed granite groundcover, and a natural gas stone firepit for crisp desert nights.",
        },
      ],
      palette: [
        { name: "Desert Sand", hex: "#E8D8C3", role: "Main Walls" },
        { name: "Sedona Adobe Clay", hex: "#B85C38", role: "Accent Siding" },
        { name: "Agave Succulent Green", hex: "#6E7F6B", role: "Cabinetry & Decor" },
        { name: "Charcoal Basalt", hex: "#2E3033", role: "Steel Framing" },
      ],
      climateTips: [
        "Polished concrete or matte tile floors that absorb cool night air and regulate daytime temperatures.",
        "High-performance low-E glass coatings to block desert heat gain without dark tinting.",
        "Xeriscape landscaping featuring corten steel planters and native agaves requiring zero lawn irrigation.",
      ],
    };
  }

  // 3. Pacific Northwest & Mountain (WA, OR, CO, ID, MT)
  if (["wa", "or", "co", "id", "mt"].includes(st) || popularStyle.toLowerCase().includes("scandinavian") || popularStyle.toLowerCase().includes("lodge")) {
    return {
      regionName: "Pacific Northwest & Modern Timber Architecture",
      tagline: `Warm timber accents, cozy multi-layered textures, and expansive daylight glazing designed for ${cityName}.`,
      cards: [
        {
          title: "Warm Nordic Bedroom Suite",
          spaceType: "Bedroom",
          style: "Scandinavian & Japandi",
          image: "/images/showcase/bedroom.webp",
          description: "Natural pale birch timber, warm indirect cove lighting, and cozy layered wool textiles for overcast mornings.",
        },
        {
          title: "Craftsman Chef Kitchen",
          spaceType: "Kitchen Remodel",
          style: "Modern Oak & Quartz",
          image: "/images/showcase/kitchen.webp",
          description: "Natural white oak shaker cabinetry with marble quartz waterfall slabs and brass ambient lighting.",
        },
        {
          title: "Covered Cedar Outdoor Pergola",
          spaceType: "Patio & Deck",
          style: "Covered Timber Living",
          image: "/images/showcase/landscape-oasis.webp",
          description: "Rain-sheltered Douglas fir pergola with integrated heaters and lush green mountain landscaping.",
        },
      ],
      palette: [
        { name: "Misty Fog Gray", hex: "#E3E6E4", role: "Reflective Walls" },
        { name: "Cascadia Deep Pine", hex: "#263B2B", role: "Accent Wall & Island" },
        { name: "Natural White Oak", hex: "#D2BEA3", role: "Hardwood & Millwork" },
        { name: "Matte Black Iron", hex: "#222222", role: "Lighting & Fixtures" },
      ],
      climateTips: [
        "Warm 2700K ambient LED lighting to combat overcast winter skies and create inviting warmth.",
        "Engineered hardwood planks with moisture barriers designed to handle wet footwear and humidity shifts.",
        "Large picture windows strategically placed to pull in filtered morning and afternoon forest light.",
      ],
    };
  }

  // 4. Texas & Southern Plains (TX, OK, TN, AL, AR, LA)
  if (["tx", "ok", "tn", "al", "ar", "la"].includes(st) || popularStyle.toLowerCase().includes("farmhouse")) {
    return {
      regionName: "Southern Farmhouse & Modern Ranch Architecture",
      tagline: `Generous entertaining spaces, classic white shiplap, and durable luxury materials tailored for ${cityName}.`,
      cards: [
        {
          title: "Grand Modern Farmhouse Living",
          spaceType: "Living Room",
          style: "Modern Farmhouse",
          image: "/images/showcase/living-room.webp",
          description: "Vaulted ceilings, exposed rustic wood beams, and a stone gas fireplace built for hospitality.",
        },
        {
          title: "Gourmet Southern Kitchen",
          spaceType: "Kitchen Remodel",
          style: "Farmhouse Shaker Kitchen",
          image: "/images/showcase/kitchen.webp",
          description: "Crisp white shaker cabinets, double-basin apron front sink, and a spacious central gathering island.",
        },
        {
          title: "Texas Ranch House Facade",
          spaceType: "Architecture",
          style: "Board & Batten Farmhouse",
          image: "/images/showcase/house-facade.webp",
          description: "White board-and-batten siding with a standing-seam black metal roof and a spacious covered porch.",
        },
      ],
      palette: [
        { name: "Pure Cotton White", hex: "#FAF8F5", role: "Main Shiplap Walls" },
        { name: "Texas Iron Ore", hex: "#323334", role: "Window Trim & Roof" },
        { name: "Antique Warm Oak", hex: "#C7A783", role: "Beams & Hardwood" },
        { name: "Warm Greige", hex: "#D1C7BA", role: "Cabinetry & Tiles" },
      ],
      climateTips: [
        "High-durability wood-look luxury vinyl planks or porcelain tiles resistant to summer humidity.",
        "Vaulted ceiling fan integration to keep open-concept living rooms breezy and energy-efficient.",
        "Deep covered front and rear verandas to provide shade and shelter during sudden southern storms.",
      ],
    };
  }

  // 5. Default / Northeast & Midwest Metro (NY, IL, PA, MA, OH, MI, etc.)
  return {
    regionName: "Metro Loft & Transitional Architecture",
    tagline: `Sophisticated space-efficient layouts, rich historic masonry, and timeless transitional finishes for ${cityName}.`,
    cards: [
      {
        title: "Cosmopolitan Urban Living",
        spaceType: "Living Room",
        style: "Industrial & Modern Loft",
        image: "/images/showcase/living-room.webp",
        description: "Open-concept layout with slimline black steel window frames, plush modern seating, and warm wood flooring.",
      },
      {
        title: "Chef's Kitchen & Dining",
        spaceType: "Kitchen & Dining",
        style: "Euro Minimalist Kitchen",
        image: "/images/showcase/kitchen.webp",
        description: "Seamless integrated flat-panel cabinetry, durable quartz countertops, and smart recessed lighting.",
      },
      {
        title: "Masonry & Modern Accent Walls",
        spaceType: "Wall Finishes",
        style: "Exposed Brick & Navy",
        image: "/images/showcase/wall-paint.webp",
        description: "Rich reclaimed red brick and deep matte navy feature walls that add warmth and architectural character.",
      },
    ],
    palette: [
      { name: "Historic Brick Red", hex: "#944438", role: "Accent Feature Wall" },
      { name: "Metropolitan Navy", hex: "#1F2D3D", role: "Cabinetry & Millwork" },
      { name: "Classic Alabaster", hex: "#F9F7F3", role: "Light-Boosting Walls" },
      { name: "Rich Dark Walnut", hex: "#5C4638", role: "Hardwood Floors" },
    ],
    climateTips: [
      "Thermal double-hung windows with insulated blackout drapes to block winter drafts and street noise.",
      "Dedicated tiled entryway / mudroom transition areas to safeguard hardwood floors from snow and salt.",
      "Multi-zone ambient lighting with dimmable 3000K LEDs to maintain an inviting atmosphere through gray winter days.",
    ],
  };
}

export default function CityRegionalShowcase({
  city,
  cityName,
  state,
  stateName,
  popularStyle,
  challenge,
}: CityRegionalShowcaseProps) {
  const profile = getRegionalProfile(state, popularStyle, cityName);

  return (
    <section className="my-10 space-y-8">
      {/* Regional Showcase Title */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F1E4D5] shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEEDDF] border border-[#F8B98B] text-[#8D3D10] text-xs font-bold mb-3">
          <span>🏛️</span>
          <span>{profile.regionName}</span>
        </div>
        
        <h2 className="text-xl sm:text-2xl font-black text-[#4A2508] font-heading tracking-tight mb-2">
          Trending {cityName} Design Transformations
        </h2>
        
        <p className="text-xs sm:text-sm text-[#6D5D53] leading-relaxed max-w-2xl">
          {profile.tagline}
        </p>

        {/* 3 Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {profile.cards.map((card, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden border border-[#F1E4D5] bg-[#FFFBF7] flex flex-col group hover:border-[#E87A1E] transition-all duration-300 shadow-xs hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FEEDDF]">
                <Image
                  src={card.image}
                  alt={`${card.style} in ${cityName}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-amber-300 text-[10px] font-bold border border-amber-500/30">
                  {card.spaceType}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#4A2508] font-heading mb-1">
                    {card.title}
                  </h3>
                  <p className="text-[11px] text-[#6D5D53] leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-[#F1E4D5] flex items-center justify-between text-[11px] font-semibold text-[#8D3D10]">
                  <span>Style: {card.style}</span>
                  <span className="text-[#E87A1E] font-bold group-hover:translate-x-0.5 transition-transform">Preview &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Local Color Palette & Climate Architecture Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Curated Color Swatches */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#F1E4D5] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">🎨</span>
              <h3 className="text-base font-black text-[#4A2508] font-heading">
                {cityName} Color &amp; Material Palette
              </h3>
            </div>
            <p className="text-xs text-[#6D5D53] mb-4 leading-relaxed">
              Top curated paint &amp; material tones recommended for residential remodels in {stateName}.
            </p>

            <div className="space-y-2.5">
              {profile.palette.map((color, cIdx) => (
                <div
                  key={cIdx}
                  className="flex items-center gap-3 p-2 rounded-xl bg-[#FFFBF7] border border-[#F1E4D5]"
                >
                  <div
                    className="w-9 h-9 rounded-lg border border-black/10 flex-shrink-0 shadow-xs"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#4A2508] truncate">
                        {color.name}
                      </h4>
                      <span className="text-[10px] font-mono text-[#8D7D72] uppercase font-bold">
                        {color.hex}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#8D7D72] truncate">
                      {color.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F1E4D5] text-[11px] text-[#8D7D72]">
            💡 Tap any style in our Android app to apply these exact palettes automatically.
          </div>
        </div>

        {/* Climate & Architecture Tips */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-[#F1E4D5] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">🏡</span>
              <h3 className="text-base font-black text-[#4A2508] font-heading">
                Climate &amp; Remodel Tips for {cityName}
              </h3>
            </div>
            {challenge && (
              <div className="mb-4 p-3 rounded-xl bg-[#FEEDDF]/60 border border-[#F8B98B] text-xs text-[#5C3314]">
                <strong>Common Local Challenge:</strong> {challenge}
              </div>
            )}
            <p className="text-xs text-[#6D5D53] mb-3 leading-relaxed">
              Design choices verified for {cityName}&apos;s local weather patterns and building requirements:
            </p>

            <ul className="space-y-2.5">
              {profile.climateTips.map((tip, tIdx) => (
                <li key={tIdx} className="flex items-start gap-2.5 text-xs text-[#5C3314] leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-[#FEEDDF] text-[#E87A1E] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 pt-3 border-t border-[#F1E4D5] flex items-center justify-between text-xs text-[#8D3D10] font-bold">
            <span>Ready to visualize your own rooms?</span>
            <a
              href="https://play.google.com/store/apps/details?id=com.aihomedecorator.twa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E87A1E] hover:underline"
            >
              Open Android Studio &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
