const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fhplqcddcvwyqflgbfaj.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZocGxxY2RkY3Z3eXFmbGdiZmFqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTc5MzA3MywiZXhwIjoyMDc3MzY5MDczfQ.9IuaMuWCLvKDFK22C7fBNPcgh3_wtwsZBgi7gmF6XqU';

const client = createClient(supabaseUrl, supabaseKey);

async function run() {
  const productData = {
    slug: 'home-lighting-design-guide-usa',
    title: 'The Home Lighting Design Guide (USA Edition)',
    subtitle: 'Layer, balance and control light in every room with the same principles professionals use.',
    category_id: 'home-improvements',
    category_name: 'Home Improvements',
    price: 14.99,
    original_price: 29.99,
    badge: 'Official USA Guide',
    rating: 4.6,
    reviews_count: 0,
    pages_count: 9,
    file_size: '105 KB',
    format: 'Printable PDF (8.5" x 11" US Letter) — 9 Illustrated Masterclass Pages',
    publication_year: 2026,
    cover_image: '/store/covers/home-lighting-design-guide-usa-cover.webp',
    pdf_file_key: 'Home-Lighting-Design-Guide-USA.pdf',
    description:
      "Transform your home's atmosphere with professional lighting design principles. Written specifically for American homes, this practical guide walks you through the 3 layers of light (ambient, task, accent), color temperature (Kelvin sweet spot 2700-3000K), lumen sizing per square foot, recessed can spacing geometry, and room-by-room floor plans.",
    highlights: [
      'The Three Layers of Light: How to blend ambient, task, and accent lighting to eliminate dark corners.',
      'Kelvin & CRI Demystified: Exactly which 2700K-3000K warm white bulbs make interiors look high-end.',
      'Recessed Can Light Placement Geometry: Spacing formulas based on ceiling height and beam spread.',
      'Lumens Per Square Foot Calculator: Target lumen benchmarks for living rooms, kitchens, and baths.',
      'Room-by-Room Illustrated Plans: Practical layouts with pendant, sconce, and under-cabinet dimming control.',
    ],
    table_of_contents: [
      { chapter: 'Page 1: Design with Light, Not Just Fixtures', pages: 'p. 1', summary: 'Creating emotional warmth and functional zoning before fixture shopping.' },
      { chapter: 'Page 2: The Three Layers of Light', pages: 'p. 2', summary: 'Ambient ceiling wash, task reading lights, and architectural accent focus.' },
      { chapter: 'Page 3: Color, Quality and Brightness', pages: 'p. 3', summary: 'Kelvin color temperature (2700K-3000K) and CRI 90+ standards.' },
      { chapter: 'Page 4: Placement Geometry & Ceiling Spacing', pages: 'p. 4', summary: 'Recessed fixture spacing, beam overlap formulas, and hanging heights.' },
      { chapter: 'Page 5: How Bright? Sizing Your Lumens', pages: 'p. 5', summary: 'Target lumens per square foot benchmarks across all room types.' },
      { chapter: 'Pages 6-7: Room-by-Room Floor Plans', pages: 'pp. 6–7', summary: 'Detailed living room and kitchen layouts with dimming controls.' },
      { chapter: 'Page 8: Exterior, Landscape & Safety Lighting', pages: 'p. 8', summary: 'Tree uplighting, wall washes, path shielding, and motion security.' },
      { chapter: 'Page 9: Your Master Lighting Plan Checklist', pages: 'p. 9', summary: 'Final 7-point pre-wiring checklist before buying bulbs and fixtures.' },
    ],
    preview_pages: [
      {
        pageNumber: 1,
        title: 'Design with Light, Not Just Fixtures',
        subtitle: 'How each space should feel and functional zoning',
        highlightText:
          'Lighting designers do not start by shopping for fixtures. They decide how each space should feel and what people will do there, then build light in layers to match.',
        imageUrl: '/store/covers/home-lighting-sample-page-1.webp',
      },
      {
        pageNumber: 2,
        title: 'The Three Layers of Light',
        subtitle: 'Ambient, Task & Accent Lighting Rules',
        highlightText:
          'Every well-lit room blends three layers. Ambient light fills the room, task light helps you work, and accent light adds depth and focus. Skip a layer and the room feels flat or harsh.',
        imageUrl: '/store/covers/home-lighting-sample-page-2.webp',
      },
      {
        pageNumber: 3,
        title: 'Color, Quality and Brightness',
        subtitle: 'Kelvin Temperature, CRI 90+ & Lumens',
        highlightText:
          'Three numbers on every bulb box decide how a room feels: color temperature (Kelvin), color accuracy (CRI) and brightness (lumens). Choose them on purpose.',
        imageUrl: '/store/covers/home-lighting-sample-page-3.webp',
      },
    ],
    us_specifics: [
      'Standard US 120V electrical fixtures and recessed can dimensions.',
      'Compliant with US building codes and Title 24 energy standards.',
      'Bulb specifications tailored to US retail brands (GE, Philips, Lutron, Cree).',
    ],
    target_audience: 'US Homeowners, interior design enthusiasts, and renovators looking for warm, professional lighting.',
    is_published: true,
  };

  // Upsert by slug
  const { data, error } = await client
    .from('store_products')
    .upsert(productData, { onConflict: 'slug' })
    .select();

  if (error) {
    console.error('Supabase error:', error);
  } else {
    console.log('✅ Successfully synced product to Supabase:', data[0]?.title, 'slug:', data[0]?.slug, 'cover:', data[0]?.cover_image);
  }
}

run();
