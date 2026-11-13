const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fhplqcddcvwyqflgbfaj.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZocGxxY2RkY3Z3eXFmbGdiZmFqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTc5MzA3MywiZXhwIjoyMDc3MzY5MDczfQ.9IuaMuWCLvKDFK22C7fBNPcgh3_wtwsZBgi7gmF6XqU';

const sbAdmin = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await sbAdmin
    .from('store_products')
    .update({
      title: 'The Home Lighting Design Guide (USA Edition)',
      subtitle:
        'Layer, balance and control light in every room with the same principles professionals use.',
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
      cover_image:
        'https://fhplqcddcvwyqflgbfaj.supabase.co/storage/v1/object/public/store_covers/home-lighting-design-guide-usa-cover.webp',
      pdf_file_key: 'Home-Lighting-Design-Guide-USA.pdf',
      description:
        "Transform your home's atmosphere with professional lighting design principles. Written specifically for American homes, this practical guide walks you through the 3 layers of light (ambient, task, accent), color temperature (Kelvin sweet spot 2700-3000K), lumen sizing per square foot, recessed can spacing geometry, and room-by-room floor plans.",
      preview_pages: [
        {
          pageNumber: 1,
          title: 'Design with Light, Not Just Fixtures',
          subtitle: 'How each space should feel and functional zoning',
          highlightText:
            'Lighting designers do not start by shopping for fixtures. They decide how each space should feel and what people will do there, then build light in layers to match.',
          imageUrl:
            'https://fhplqcddcvwyqflgbfaj.supabase.co/storage/v1/object/public/store_covers/home-lighting-sample-page-1.webp',
        },
        {
          pageNumber: 2,
          title: 'The Three Layers of Light',
          subtitle: 'Ambient, Task and Accent Lighting Rules',
          highlightText:
            'Every well-lit room blends three layers. Ambient light fills the room, task light helps you work, and accent light adds depth and focus. Skip a layer and the room feels flat or harsh.',
          imageUrl:
            'https://fhplqcddcvwyqflgbfaj.supabase.co/storage/v1/object/public/store_covers/home-lighting-sample-page-2.webp',
        },
        {
          pageNumber: 3,
          title: 'Color, Quality and Brightness',
          subtitle: 'Kelvin Temperature, CRI 90+ and Lumens',
          highlightText:
            'Three numbers on every bulb box decide how a room feels: color temperature (Kelvin), color accuracy (CRI) and brightness (lumens). Choose them on purpose.',
          imageUrl:
            'https://fhplqcddcvwyqflgbfaj.supabase.co/storage/v1/object/public/store_covers/home-lighting-sample-page-3.webp',
        },
      ],
    })
    .eq('slug', 'home-lighting-design-guide-usa')
    .select();

  if (error) {
    console.error('Update error:', error);
  } else {
    console.log('Successfully updated Supabase:', data[0]?.title, 'Cover:', data[0]?.cover_image, 'Pages:', data[0]?.pages_count);
  }
}

run();
