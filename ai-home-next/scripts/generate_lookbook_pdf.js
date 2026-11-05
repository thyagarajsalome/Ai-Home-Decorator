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
  // PAGE 1: COVER
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

  // Top header banner
  page1.drawRectangle({
    x: 40,
    y: height - 100,
    width: width - 80,
    height: 3,
    color: orange,
  });

  page1.drawText("AI HOME DECORATOR  •  OFFICIAL DESIGN GUIDE", {
    x: 40,
    y: height - 90,
    size: 10,
    font: fontBold,
    color: orange,
  });

  // Main Title
  page1.drawText("2026 USA Home Design", {
    x: 40,
    y: height - 180,
    size: 32,
    font: fontBold,
    color: brown,
  });
  page1.drawText("& Remodel Lookbook", {
    x: 40,
    y: height - 225,
    size: 32,
    font: fontBold,
    color: orange,
  });

  page1.drawText(
    "A Complete Visual Guide to 30+ Trending American Architectural Styles,\nColor Palettes, Room Makeover Tips, and AI Design Prompt Formulas.",
    {
      x: 40,
      y: height - 280,
      size: 13,
      font: fontRegular,
      color: darkGray,
      lineHeight: 20,
    }
  );

  // Feature boxes on cover
  const boxY = height - 440;
  page1.drawRectangle({
    x: 40,
    y: boxY,
    width: width - 80,
    height: 120,
    color: rgb(1, 1, 1),
    borderColor: rgb(0.96, 0.85, 0.73),
    borderWidth: 1.5,
  });

  page1.drawText("WHAT'S INSIDE THIS GUIDE:", {
    x: 60,
    y: boxY + 90,
    size: 11,
    font: fontBold,
    color: brown,
  });

  const bullets = [
    "• 30+ Copy-Paste AI Room Prompt Formulas (Living Room, Kitchen, Bath, Garage)",
    "• Top 5 Trending USA Architectural Styles & High-Impact Color Schemes",
    "• Before & After Room Transformation Framework for Real Homes",
    "• Bonus: Free Starter Credits on the AI Home Decorator Android App",
  ];

  bullets.forEach((b, i) => {
    page1.drawText(b, {
      x: 60,
      y: boxY + 65 - i * 20,
      size: 10,
      font: fontRegular,
      color: darkGray,
    });
  });

  // Call to action box
  page1.drawRectangle({
    x: 40,
    y: 80,
    width: width - 80,
    height: 90,
    color: rgb(0.99, 0.93, 0.87),
    borderColor: orange,
    borderWidth: 1,
  });

  page1.drawText("GET THE NATIVE ANDROID APP", {
    x: 60,
    y: 135,
    size: 12,
    font: fontBold,
    color: brown,
  });

  page1.drawText(
    "Snap a photo with your mobile camera and watch AI redesign your space in seconds.\nDownload free on Google Play: search 'AI Home Decorator'",
    {
      x: 60,
      y: 112,
      size: 9.5,
      font: fontRegular,
      color: darkGray,
      lineHeight: 14,
    }
  );

  // -------------------------------------------------------------
  // PAGE 2: 30 COPY-PASTE AI PROMPTS
  // -------------------------------------------------------------
  const page2 = pdfDoc.addPage([595.28, 841.89]);
  page2.drawRectangle({ x: 0, y: 0, width, height, color: cream });

  page2.drawText("AI ROOM PROMPT FORMULAS", {
    x: 40,
    y: height - 60,
    size: 10,
    font: fontBold,
    color: orange,
  });

  page2.drawText("30 Copy-Paste Styles for Your Home", {
    x: 40,
    y: height - 90,
    size: 20,
    font: fontBold,
    color: brown,
  });

  page2.drawText(
    "Use these curated prompt suffixes in the AI Home Decorator app for best results:",
    {
      x: 40,
      y: height - 115,
      size: 10,
      font: fontRegular,
      color: darkGray,
    }
  );

  const prompts = [
    { title: "Modern Farmhouse Kitchen", prompt: "Warm shaker cabinets, white quartz countertops, butcher block island, black matte hardware, subway tile backsplash, natural sunlight." },
    { title: "Contemporary Living Room", prompt: "Warm taupe linen sectional, natural oak fluted coffee table, ambient floor lamps, textured woven wool rug, large picture windows." },
    { title: "Scandinavian Master Bedroom", prompt: "Light oak platform bed, crisp white linen bedding, neutral muted beige walls, minimal brass sconces, abundant natural daylight." },
    { title: "Luxury Spa Bathroom", prompt: "Freestanding soaking tub, frameless glass walk-in rainfall shower, marble floating double vanity, warm LED backlit mirrors." },
    { title: "Modern Organized Garage", prompt: "Glossy light gray epoxy floor, modular matte black wall cabinets, overhead steel storage racks, LED strip lighting, workbench." },
    { title: "Coastal California Patio", prompt: "Teak timber decking, cedar pergola with climbing jasmine, gas fire table, cozy sunbrella cushioned seating, string lighting." },
    { title: "Mid-Century Modern Dining", prompt: "Walnut dining table with curved wishbone chairs, brass sputnik chandelier, geometric wool area rug, warm wood credenza." },
  ];

  let currentY = height - 150;
  prompts.forEach((p) => {
    page2.drawRectangle({
      x: 40,
      y: currentY - 60,
      width: width - 80,
      height: 70,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.93, 0.88, 0.82),
      borderWidth: 1,
    });

    page2.drawText(p.title, {
      x: 55,
      y: currentY - 12,
      size: 11,
      font: fontBold,
      color: orange,
    });

    page2.drawText(p.prompt, {
      x: 55,
      y: currentY - 32,
      size: 8.5,
      font: fontRegular,
      color: darkGray,
      maxWidth: width - 110,
      lineHeight: 12,
    });

    currentY -= 85;
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
