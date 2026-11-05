const https = require("https");
const { createClient } = require("@supabase/supabase-js");

const host = "aihomedecorator.com";
const key = "a8f7c6e5d4b3a2109876543210abcdef";
const keyLocation = `https://${host}/${key}.txt`;

const supabaseUrl = "https://fhplqcddcvwyqflgbfaj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZocGxxY2RkY3Z3eXFmbGdiZmFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3OTMwNzMsImV4cCI6MjA3NzM2OTA3M30.WvGguc8Klt4cebrcUQHeSKcRn2rkMOgD94qVUvvyPpE";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  const urlList = [
    `https://${host}`,
    `https://${host}/usa`,
    `https://${host}/about`,
    `https://${host}/pricing`,
    `https://${host}/downloads/2026-USA-Home-Design-Remodel-Lookbook.pdf`,
  ];

  // Add 50 USA cities
  const { data: cities } = await supabase.from("seo_cities").select("state, city");
  if (cities) {
    cities.forEach((c) => {
      urlList.push(`https://${host}/usa/${c.state.toLowerCase()}/${c.city.toLowerCase()}`);
    });
  }

  console.log(`Submitting ${urlList.length} URLs to IndexNow (Bing, Yandex, etc.)...`);

  const payload = JSON.stringify({
    host,
    key,
    keyLocation,
    urlList,
  });

  const req = https.request(
    "https://api.indexnow.org/indexnow",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": Buffer.byteLength(payload),
      },
    },
    (res) => {
      console.log(`IndexNow Response Status: ${res.statusCode} ${res.statusMessage}`);
      res.on("data", (chunk) => {
        console.log("Response body:", chunk.toString());
      });
      if (res.statusCode === 200 || res.statusCode === 202) {
        console.log("Successfully submitted URLs to IndexNow for immediate crawl!");
      }
    }
  );

  req.on("error", (e) => {
    console.error("IndexNow submission error:", e);
  });

  req.write(payload);
  req.end();
}

main();
