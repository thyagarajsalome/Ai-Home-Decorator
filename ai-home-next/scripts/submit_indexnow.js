const https = require("https");

const host = "aihomedecorator.com";
const key = "a8f7c6e5d4b3a2109876543210abcdef";
const keyLocation = `https://${host}/${key}.txt`;

async function main() {
  console.log("Fetching latest live sitemap from https://aihomedecorator.com/sitemap.xml...");

  try {
    const sitemapRes = await fetch(`https://${host}/sitemap.xml`);
    if (!sitemapRes.ok) {
      throw new Error(`Failed to fetch sitemap: ${sitemapRes.status}`);
    }

    const xml = await sitemapRes.text();
    const urlMatches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

    // Ensure core pages and download links are in the list
    const coreUrls = [
      `https://${host}`,
      `https://${host}/usa`,
      `https://${host}/about`,
      `https://${host}/pricing`,
      `https://${host}/downloads/2026-USA-Home-Design-Remodel-Lookbook.pdf`,
    ];

    const uniqueUrls = Array.from(new Set([...coreUrls, ...urlMatches]));

    console.log(`Submitting all ${uniqueUrls.length} live URLs to IndexNow (Bing, Yandex, Seznam, etc.)...`);

    const payload = JSON.stringify({
      host,
      key,
      keyLocation,
      urlList: uniqueUrls,
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
          console.log(`✅ Success! All ${uniqueUrls.length} pages were accepted by IndexNow for immediate search engine indexing.`);
        }
      }
    );

    req.on("error", (e) => {
      console.error("IndexNow submission error:", e);
    });

    req.write(payload);
    req.end();
  } catch (err) {
    console.error("Error executing IndexNow submission:", err);
  }
}

main();
