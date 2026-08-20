const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

const supabaseUrl = "https://fhplqcddcvwyqflgbfaj.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZocGxxY2RkY3Z3eXFmbGdiZmFqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTc5MzA3MywiZXhwIjoyMDc3MzY5MDczfQ.9IuaMuWCLvKDFK22C7fBNPcgh3_wtwsZBgi7gmF6XqU";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const citiesData = JSON.parse(fs.readFileSync("src/data/cities.json", "utf8"));

async function migrate() {
  for (const city of citiesData) {
    const { data, error } = await supabase.from("seo_cities").upsert({
      city: city.city,
      state: city.state,
      name: city.name,
      state_name: city.stateName,
      h1: city.h1,
      intro: city.intro,
      popular_style: city.popularStyle,
      style_desc: city.styleDesc,
      challenge: city.challenge
    }, { onConflict: "city,state" });

    if (error) {
      console.error(`Error inserting ${city.name}:`, error);
    } else {
      console.log(`Successfully migrated ${city.name}`);
    }
  }
}

migrate();
