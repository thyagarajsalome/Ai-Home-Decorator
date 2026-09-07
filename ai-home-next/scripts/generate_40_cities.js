const { createClient } = require("@supabase/supabase-js");

const API_KEY = "AIzaSyDb337-rxGa6bZgZQhsQoR9DUuEHr8HNnY";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${API_KEY}`;

const supabaseUrl = "https://fhplqcddcvwyqflgbfaj.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZocGxxY2RkY3Z3eXFmbGdiZmFqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTc5MzA3MywiZXhwIjoyMDc3MzY5MDczfQ.9IuaMuWCLvKDFK22C7fBNPcgh3_wtwsZBgi7gmF6XqU";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const cities = [
  { city: "san-jose", state: "ca", name: "San Jose", stateName: "California" },
  { city: "jacksonville", state: "fl", name: "Jacksonville", stateName: "Florida" },
  { city: "fort-worth", state: "tx", name: "Fort Worth", stateName: "Texas" },
  { city: "columbus", state: "oh", name: "Columbus", stateName: "Ohio" },
  { city: "charlotte", state: "nc", name: "Charlotte", stateName: "North Carolina" },
  { city: "indianapolis", state: "in", name: "Indianapolis", stateName: "Indiana" },
  { city: "san-francisco", state: "ca", name: "San Francisco", stateName: "California" },
  { city: "seattle", state: "wa", name: "Seattle", stateName: "Washington" },
  { city: "denver", state: "co", name: "Denver", stateName: "Colorado" },
  { city: "washington", state: "dc", name: "Washington", stateName: "D.C." },
  { city: "boston", state: "ma", name: "Boston", stateName: "Massachusetts" },
  { city: "el-paso", state: "tx", name: "El Paso", stateName: "Texas" },
  { city: "nashville", state: "tn", name: "Nashville", stateName: "Tennessee" },
  { city: "oklahoma-city", state: "ok", name: "Oklahoma City", stateName: "Oklahoma" },
  { city: "las-vegas", state: "nv", name: "Las Vegas", stateName: "Nevada" },
  { city: "detroit", state: "mi", name: "Detroit", stateName: "Michigan" },
  { city: "memphis", state: "tn", name: "Memphis", stateName: "Tennessee" },
  { city: "portland", state: "or", name: "Portland", stateName: "Oregon" },
  { city: "louisville", state: "ky", name: "Louisville", stateName: "Kentucky" },
  { city: "milwaukee", state: "wi", name: "Milwaukee", stateName: "Wisconsin" },
  { city: "baltimore", state: "md", name: "Baltimore", stateName: "Maryland" },
  { city: "albuquerque", state: "nm", name: "Albuquerque", stateName: "New Mexico" },
  { city: "tucson", state: "az", name: "Tucson", stateName: "Arizona" },
  { city: "fresno", state: "ca", name: "Fresno", stateName: "California" },
  { city: "sacramento", state: "ca", name: "Sacramento", stateName: "California" },
  { city: "kansas-city", state: "mo", name: "Kansas City", stateName: "Missouri" },
  { city: "mesa", state: "az", name: "Mesa", stateName: "Arizona" },
  { city: "atlanta", state: "ga", name: "Atlanta", stateName: "Georgia" },
  { city: "omaha", state: "ne", name: "Omaha", stateName: "Nebraska" },
  { city: "colorado-springs", state: "co", name: "Colorado Springs", stateName: "Colorado" },
  { city: "raleigh", state: "nc", name: "Raleigh", stateName: "North Carolina" },
  { city: "miami", state: "fl", name: "Miami", stateName: "Florida" },
  { city: "virginia-beach", state: "va", name: "Virginia Beach", stateName: "Virginia" },
  { city: "oakland", state: "ca", name: "Oakland", stateName: "California" },
  { city: "minneapolis", state: "mn", name: "Minneapolis", stateName: "Minnesota" },
  { city: "tulsa", state: "ok", name: "Tulsa", stateName: "Oklahoma" },
  { city: "arlington", state: "tx", name: "Arlington", stateName: "Texas" },
  { city: "new-orleans", state: "la", name: "New Orleans", stateName: "Louisiana" },
  { city: "wichita", state: "ks", name: "Wichita", stateName: "Kansas" },
  { city: "cleveland", state: "oh", name: "Cleveland", stateName: "Ohio" }
];

async function generateCityData(cityObj) {
  const prompt = `You are an expert interior designer and real estate expert in ${cityObj.name}, ${cityObj.stateName}.
  Generate a JSON object containing highly unique, tailored interior design SEO content for this exact city. Include details about the local climate, housing architecture (e.g. Victorians, condos, ranchers), and local design preferences.
  Use the exact keys: 
  - "h1" (e.g. "AI Interior Design for [City] Homes")
  - "intro" (A 3-sentence paragraph highly specific to designing homes in this city).
  - "popular_style" (Name of a popular design style in this city).
  - "style_desc" (Why that style works for this city).
  - "challenge" (A common home layout or design challenge in this city).
  
  Return ONLY valid JSON without markdown blocks.`;

  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { response_mime_type: "application/json" }
      })
    });

    const data = await response.json();
    if (!data.candidates) { console.error("API Error:", JSON.stringify(data)); return null; } 
    const text = data.candidates[0].content.parts[0].text;
    return JSON.parse(text);
  } catch (error) {
    console.error(`Failed for ${cityObj.name}:`, error.message);
    return null;
  }
}

async function run() {
  let count = 1;
  for (const city of cities) {
    console.log(`[${count}/40] Generating unique AI SEO data for ${city.name}...`);
    const aiData = await generateCityData(city);
    if (aiData) {
      // Insert directly to Supabase
      const { error } = await supabase.from("seo_cities").upsert({
        state: city.state,
        city: city.city,
        name: city.name,
        state_name: city.stateName,
        h1: aiData.h1,
        intro: aiData.intro,
        popular_style: aiData.popular_style,
        style_desc: aiData.style_desc,
        challenge: aiData.challenge,
        image_url: "https://loremflickr.com/1024/500/interior,design?lock=" + (120 + count)
      }, { onConflict: "city" });
      
      if (error) {
        console.error("Supabase Error:", error.message);
      } else {
        console.log(`Successfully added ${city.name} to database!`);
      }
    }
    count++;
    // WAIT 5 SECONDS to bypass Gemini Free Tier 15 RPM limit!
    await new Promise(r => setTimeout(r, 5000));
  }
  console.log("Finished generating 40 cities!");
}

run();
