const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

async function generateLookbook() {
  const pdfDoc = await PDFDocument.create();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Colors matching brand
  const orange = rgb(0.91, 0.48, 0.12); // #E87A1E
  const brown = rgb(0.29, 0.15, 0.03);  // #4A2508
  const darkGray = rgb(0.22, 0.16, 0.13);
  const cream = rgb(1.0, 0.98, 0.97);

  // -------------------------------------------------------------
  // PAGE 1: OFFICIAL VISUAL COVER
  // -------------------------------------------------------------
  const page1 = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page1.getSize();

  // Background cream
  page1.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: cream,
  });

  // Embed the high-res 2026 Lookbook visual cover image
  const coverPath = path.join(__dirname, "../public/brand/lookbook-2026-cover.jpg");
  if (fs.existsSync(coverPath)) {
    const coverBytes = fs.readFileSync(coverPath);
    const coverImage = await pdfDoc.embedJpg(coverBytes);
    const imgWidth = width - 60;
    const imgHeight = imgWidth * (1024 / 1536); // maintain 3:2 aspect ratio

    page1.drawImage(coverImage, {
      x: 30,
      y: height - imgHeight - 35,
      width: imgWidth,
      height: imgHeight,
    });
  }

  // Feature boxes below cover
  const boxY = 170;
  page1.drawRectangle({
    x: 30,
    y: boxY,
    width: width - 60,
    height: 250,
    color: rgb(1, 1, 1),
    borderColor: rgb(0.96, 0.85, 0.73),
    borderWidth: 1.5,
  });

  page1.drawText("EXECUTIVE OVERVIEW  •  2026 AMERICAN RESIDENTIAL TRENDS", {
    x: 50,
    y: boxY + 220,
    size: 11,
    font: fontBold,
    color: orange,
  });

  const bullets = [
    "• Top 5 Regional Styles: Modern Farmhouse, Mid-Century Modern, Coastal, Japandi, Craftsman",
    "• High-ROI Remodels: Kitchen cabinet refresh, spa bathroom conversions, outdoor patio living",
    "• Lighting Rules: Layering 2700K ambient, task, and architectural cove LED illumination",
    "• Instant Prompts: 30 calibrated AI prompt formulas ready to paste into AI Home Decorator",
    "• Android App Sync: Real-time photo transformation directly on your mobile device",
  ];

  bullets.forEach((b, i) => {
    page1.drawText(b, {
      x: 50,
      y: boxY + 185 - i * 28,
      size: 10,
      font: fontRegular,
      color: darkGray,
    });
  });

  // Call to action banner at bottom of page 1
  page1.drawRectangle({
    x: 30,
    y: 35,
    width: width - 60,
    height: 110,
    color: rgb(0.99, 0.93, 0.87), // #FEEDDF
    borderColor: rgb(0.97, 0.73, 0.54),
    borderWidth: 1,
  });

  page1.drawText("DOWNLOAD THE OFFICIAL ANDROID APP", {
    x: 50,
    y: 115,
    size: 13,
    font: fontBold,
    color: brown,
  });

  page1.drawText(
    "Snap any room in your house and preview complete architectural remodels in seconds.\nIncludes 15 free starter AI rendering credits for new installs.",
    {
      x: 50,
      y: 92,
      size: 9.5,
      font: fontRegular,
      color: darkGray,
      lineHeight: 14,
    }
  );

  page1.drawText("Google Play Store: com.aihomedecorator.twa  |  aihomedecorator.com", {
    x: 50,
    y: 52,
    size: 9,
    font: fontBold,
    color: orange,
  });

  // -------------------------------------------------------------
  // PAGE 2: 30 AI PROMPT RECIPES & FORMULAS
  // -------------------------------------------------------------
  const page2 = pdfDoc.addPage([595.28, 841.89]);

  page2.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: cream,
  });

  // Top header banner
  page2.drawRectangle({
    x: 30,
    y: height - 55,
    width: width - 60,
    height: 3,
    color: orange,
  });

  page2.drawText("COPY-PASTE AI PROMPTS  •  AI HOME DECORATOR", {
    x: 30,
    y: height - 45,
    size: 9,
    font: fontBold,
    color: orange,
  });

  page2.drawText("Top 6 Signature USA Room Prompt Formulas", {
    x: 30,
    y: height - 90,
    size: 20,
    font: fontBold,
    color: brown,
  });

  page2.drawText(
    "Copy and paste these exact room formulas into AI Home Decorator for photorealistic outputs:",
    {
      x: 30,
      y: height - 112,
      size: 9.5,
      font: fontRegular,
      color: darkGray,
    }
  );

  const prompts = [
    {
      title: "1. Modern Farmhouse Kitchen",
      prompt:
        "Bright white shaker cabinets, natural white oak center island with quartz waterfall countertop, matte black gooseneck faucet, warm 2700K pendant lights, vertical white subway tile backsplash, wide-plank European oak flooring.",
    },
    {
      title: "2. Contemporary Open Living Room",
      prompt:
        "Warm taupe textured linen sectional, natural oak fluted cylindrical coffee table, floor-to-ceiling black steel casement windows, floating limestone gas fireplace, ambient warm LED floor lamp, textured wool Berber rug.",
    },
    {
      title: "3. Scandinavian Minimalist Master Bedroom",
      prompt:
        "Light oak low platform bed, washed white linen duvet, muted warm oatmeal walls, minimal brushed brass wall sconces, floating oak nightstands, shearling accent armchair, abundant morning sunlight.",
    },
    {
      title: "4. Luxury Spa Master Bathroom",
      prompt:
        "Freestanding matte white oval soaking tub, frameless glass walk-in rainfall shower with fluted glass, floating white oak double vanity, honed Calacatta marble slab walls, dual backlit LED arch mirrors.",
    },
    {
      title: "5. Modern Organized Garage & Workshop",
      prompt:
        "Glossy light gray polyaspartic epoxy floor, modular matte black steel cabinetry system, integrated slatwall tool organizer with warm task lighting, ceiling mounted steel overhead racks, clean modern car workshop.",
    },
    {
      title: "6. Coastal California Outdoor Patio",
      prompt:
        "Teak timber decking, cedar architectural pergola with climbing flowering vines, modern rectangular gas fire table, cozy sunbrella cushioned sectional seating, bistro string lighting at dusk, ocean breeze ambiance.",
    },
  ];

  let currentY = height - 145;
  prompts.forEach((p) => {
    page2.drawRectangle({
      x: 30,
      y: currentY - 72,
      width: width - 60,
      height: 80,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.93, 0.88, 0.82),
      borderWidth: 1,
    });

    page2.drawText(p.title, {
      x: 45,
      y: currentY - 12,
      size: 11,
      font: fontBold,
      color: orange,
    });

    page2.drawText(p.prompt, {
      x: 45,
      y: currentY - 32,
      size: 8.5,
      font: fontRegular,
      color: darkGray,
      maxWidth: width - 90,
      lineHeight: 13,
    });

    currentY -= 92;
  });

  // Footer on Page 2
  page2.drawRectangle({
    x: 30,
    y: 35,
    width: width - 60,
    height: 40,
    color: rgb(0.99, 0.93, 0.87),
  });

  page2.drawText("Visit aihomedecorator.com  •  Install on Google Play: com.aihomedecorator.twa", {
    x: 50,
    y: 50,
    size: 9,
    font: fontBold,
    color: brown,
  });

  // -------------------------------------------------------------
  // SAVE PDF TO PUBLIC FOLDER
  // -------------------------------------------------------------
  const pdfBytes = await pdfDoc.save();
  const outputDir = path.resolve(__dirname, "../public/downloads");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, "2026-usa-home-design-lookbook.pdf");
  fs.writeFileSync(outputPath, pdfBytes);
  console.log("PDF created successfully at:", outputPath);
}

generateLookbook().catch(console.error);
