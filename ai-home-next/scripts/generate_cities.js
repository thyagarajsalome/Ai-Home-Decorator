const fs = require("fs");
const path = require("path");

const API_KEY = "AIzaSyDb337-rxGa6bZgZQhsQoR9DUuEHr8HNnY";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${API_KEY}`;

const cities = [
  { city: "new-york", state: "ny", name: "New York", stateName: "New York" },
  { city: "los-angeles", state: "ca", name: "Los Angeles", stateName: "California" },
  { city: "chicago", state: "il", name: "Chicago", stateName: "Illinois" },
  { city: "houston", state: "tx", name: "Houston", stateName: "Texas" },
  { city: "phoenix", state: "az", name: "Phoenix", stateName: "Arizona" },
  { city: "philadelphia", state: "pa", name: "Philadelphia", stateName: "Pennsylvania" },
  { city: "san-antonio", state: "tx", name: "San Antonio", stateName: "Texas" },
  { city: "san-diego", state: "ca", name: "San Diego", stateName: "California" },
  { city: "dallas", state: "tx", name: "Dallas", stateName: "Texas" },
  { city: "austin", state: "tx", name: "Austin", stateName: "Texas" }
];

async function generateCityData(cityObj) {
  const prompt = `You are an expert interior designer and real estate expert in ${cityObj.name}, ${cityObj.stateName}.
  Generate a JSON object containing unique, tailored interior design SEO content for this city.
  Use the exact keys: 
  - "h1" (e.g. "AI Interior Design for New York City Apartments")
  - "intro" (A 2-sentence paragraph about designing homes in this specific city, mentioning local architecture or weather).
  - "popularStyle" (Name of a popular design style in this city).
  - "styleDesc" (Why that style works for this city).
  - "challenge" (A common home layout or design challenge in this city, like small spaces or humidity).
  
  Return ONLY valid JSON.`;

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
    if (!data.candidates) { console.error("API Error:", JSON.stringify(data)); return null; } const text = data.candidates[0].content.parts[0].text;
    return JSON.parse(text);
  } catch (error) {
    console.error(`Failed for ${cityObj.name}:`, error);
    return null;
  }
}

async function run() {
  const output = [];
  for (const city of cities) {
    console.log(`Generating data for ${city.name}...`);
    const aiData = await generateCityData(city);
    if (aiData) {
      output.push({ ...city, ...aiData });
    }
    // wait 1.5s to avoid rate limits
    await new Promise(r => setTimeout(r, 1500));
  }
  
  fs.writeFileSync(path.join(__dirname, "../src/data/cities.json"), JSON.stringify(output, null, 2));
  console.log("Successfully generated cities.json!");
}

run();



