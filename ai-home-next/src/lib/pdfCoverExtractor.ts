/**
 * Client-Side PDF Cover & Sample Page Extractor
 * Renders the actual PDF front cover and sample pages directly to high-quality .webp images.
 */

export interface ExtractedPdfData {
  numPages: number;
  coverBlob: Blob;
  sampleBlobs: { pageNumber: number; blob: Blob }[];
}

function loadPdfJs(): Promise<any> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("PDF.js can only run in the browser"));
  }

  if ((window as any).pdfjsLib) {
    return Promise.resolve((window as any).pdfjsLib);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.async = true;
    script.onload = () => {
      const lib = (window as any).pdfjsLib;
      if (lib) {
        lib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        resolve(lib);
      } else {
        reject(new Error("pdfjsLib not defined after script load"));
      }
    };
    script.onerror = () => reject(new Error("Failed to load PDF.js from CDN"));
    document.head.appendChild(script);
  });
}

async function renderPageToWebpBlob(pdfDoc: any, pageNumber: number, scale = 2.0): Promise<Blob> {
  const page = await pdfDoc.getPage(pageNumber);
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not create 2D canvas context");

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  const renderContext = {
    canvasContext: context,
    viewport: viewport,
  };

  await page.render(renderContext).promise;

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error(`Failed to convert page ${pageNumber} to WebP blob`));
        }
      },
      "image/webp",
      0.9
    );
  });
}

export async function extractPdfPagesToWebp(file: File): Promise<ExtractedPdfData> {
  const pdfjsLib = await loadPdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdfDoc = await loadingTask.promise;
  const numPages = pdfDoc.numPages;

  // Render Page 1 (Front Cover)
  const coverBlob = await renderPageToWebpBlob(pdfDoc, 1, 2.0);

  // Render up to 3 sample preview pages (pages 2, 3, 4)
  const sampleBlobs: { pageNumber: number; blob: Blob }[] = [];
  const maxSamples = Math.min(numPages, 4);
  for (let pageNum = 2; pageNum <= maxSamples; pageNum++) {
    try {
      const sampleBlob = await renderPageToWebpBlob(pdfDoc, pageNum, 1.8);
      sampleBlobs.push({ pageNumber: pageNum, blob: sampleBlob });
    } catch (err) {
      console.warn(`Could not render sample page ${pageNum}:`, err);
    }
  }

  return {
    numPages,
    coverBlob,
    sampleBlobs,
  };
}
