const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://fhplqcddcvwyqflgbfaj.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZocGxxY2RkY3Z3eXFmbGdiZmFqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTc5MzA3MywiZXhwIjoyMDc3MzY5MDczfQ.9IuaMuWCLvKDFK22C7fBNPcgh3_wtwsZBgi7gmF6XqU";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const images = {
  "New York": "https://loremflickr.com/1024/500/interior,design?lock=101",
  "Los Angeles": "https://loremflickr.com/1024/500/interior,design?lock=102",
  "Chicago": "https://loremflickr.com/1024/500/interior,design?lock=103",
  "Houston": "https://loremflickr.com/1024/500/interior,design?lock=104",
  "Phoenix": "https://loremflickr.com/1024/500/interior,design?lock=105",
  "Miami": "https://loremflickr.com/1024/500/interior,design?lock=106",
  "Seattle": "https://loremflickr.com/1024/500/interior,design?lock=107",
  "Austin": "https://loremflickr.com/1024/500/interior,design?lock=108",
  "Denver": "https://loremflickr.com/1024/500/interior,design?lock=109",
  "Boston": "https://loremflickr.com/1024/500/interior,design?lock=110"
};

async function addImages() {
  for (const [cityName, url] of Object.entries(images)) {
    const { error } = await supabase
      .from("seo_cities")
      .update({ image_url: url })
      .eq("name", cityName);
    
    if (error) {
      console.error(`Error updating ${cityName}:`, error.message);
    } else {
      console.log(`Updated ${cityName} with valid image`);
    }
  }
}

addImages();
