const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://fhplqcddcvwyqflgbfaj.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZocGxxY2RkY3Z3eXFmbGdiZmFqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTc5MzA3MywiZXhwIjoyMDc3MzY5MDczfQ.9IuaMuWCLvKDFK22C7fBNPcgh3_wtwsZBgi7gmF6XqU";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const images = {
  "New York": "https://images.unsplash.com/photo-1598928506311-c55dd1b31412?auto=format&fit=crop&w=1024&q=80",
  "Los Angeles": "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd28?auto=format&fit=crop&w=1024&q=80",
  "Chicago": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1024&q=80",
  "Houston": "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=1024&q=80",
  "Phoenix": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1024&q=80",
  "Miami": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1024&q=80",
  "Seattle": "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1024&q=80",
  "Austin": "https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&w=1024&q=80",
  "Denver": "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1024&q=80",
  "Boston": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1024&q=80"
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
      console.log(`Updated ${cityName} with image`);
    }
  }
}

addImages();
