const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://fhplqcddcvwyqflgbfaj.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZocGxxY2RkY3Z3eXFmbGdiZmFqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTc5MzA3MywiZXhwIjoyMDc3MzY5MDczfQ.9IuaMuWCLvKDFK22C7fBNPcgh3_wtwsZBgi7gmF6XqU";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const images = {
  "New York": "/images/seo/new-york.jpg",
  "Los Angeles": "/images/seo/los-angeles.jpg",
  "Chicago": "/images/seo/chicago.jpg",
  "Houston": "/images/seo/houston.jpg",
  "Phoenix": "/images/seo/phoenix.jpg",
  "Miami": "/images/seo/miami.jpg",
  "Seattle": "/images/seo/seattle.jpg",
  "Austin": "/images/seo/austin.jpg",
  "Denver": "/images/seo/denver.jpg",
  "Boston": "/images/seo/boston.jpg"
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
      console.log(`Updated ${cityName} with local image`);
    }
  }
}

addImages();
