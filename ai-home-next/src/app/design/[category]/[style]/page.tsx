import React from "react";
import { Metadata } from "next";
import { ELEMENT_CATEGORIES } from "@/constants";
import DesignWorkspace from "@/components/DesignWorkspace";
import { notFound } from "next/navigation";

// Generate paths for all category and style combinations
export function generateStaticParams() {
  const params: { category: string; style: string }[] = [];

  ELEMENT_CATEGORIES.forEach((category) => {
    category.choices.forEach((choice) => {
      const styleSlug = choice.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      params.push({
        category: category.id,
        style: styleSlug,
      });
    });
  });

  return params;
}

// Generate SEO metadata dynamically based on the current slug
export function generateMetadata({
  params,
}: {
  params: { category: string; style: string };
}): Metadata {
  const { category, style } = params;

  const catObj = ELEMENT_CATEGORIES.find((c) => c.id === category);
  if (!catObj) return {};

  const styleObj = catObj.choices.find(
    (c) =>
      c.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") === style
  );

  if (!styleObj) return {};

  const title = `${styleObj.name} ${catObj.name} AI Design Generator`;
  const description = `Use our free AI tool to redesign your space with a stunning ${styleObj.name} ${catObj.name.toLowerCase()}. Upload a photo and let our AI generate the perfect interior design.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: styleObj.thumbnail ? [
        {
          url: styleObj.thumbnail,
          width: 800,
          height: 600,
          alt: `${styleObj.name} ${catObj.name} Example`,
        },
      ] : [],
    },
  };
}

export default function ProgrammaticSEODesignPage({
  params,
}: {
  params: { category: string; style: string };
}) {
  const { category, style } = params;

  const catObj = ELEMENT_CATEGORIES.find((c) => c.id === category);
  if (!catObj) return notFound();

  const styleObj = catObj.choices.find(
    (c) =>
      c.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") === style
  );

  if (!styleObj) return notFound();

  return (
    <div className="flex flex-col min-h-screen bg-obsidian-950">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-grow">
        
        {/* SEO Header Section */}
        <div className="mb-12 text-center max-w-4xl mx-auto animate-fade">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              {styleObj.name}
            </span>{" "}
            {catObj.name} AI Generator
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Instantly transform any room into a beautiful <strong>{styleObj.name}</strong> space.
            Our AI analyzes your room&apos;s structure and realistically applies the 
            {styleObj.promptSuffix.toLowerCase().includes(styleObj.name.toLowerCase()) 
              ? styleObj.promptSuffix 
              : ` ${styleObj.promptSuffix} aesthetic`}.
            Simply upload a photo, describe your room, and let the AI decorator do the rest!
          </p>
        </div>

        {/* The Workspace initialized with SEO props */}
        <DesignWorkspace initialCategory={category} initialStyle={style} />

        {/* SEO FAQ / Content Section */}
        <div className="mt-20 max-w-4xl mx-auto bg-obsidian-900 border border-gray-800 rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-800 pb-4">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">
                How does the {styleObj.name} {catObj.name} generator work?
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Our advanced AI uses a sophisticated ControlNet architecture to understand the depth and structural layout of your uploaded image. It preserves the structural integrity of your room while completely restyling the textures, furniture, lighting, and decor to match the <strong>{styleObj.name}</strong> aesthetic.
              </p>
            </div>
            
            <div className="border-b border-gray-800 pb-4">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">
                Can I customize the {styleObj.name} design further?
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Yes! While this page pre-selects the <strong>{styleObj.name}</strong> style for your convenience, you can easily switch to &quot;Custom Prompt Mode&quot; inside the workspace to add specific details, colors, or unique furniture pieces you want the AI to include in your newly designed space.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-2">
                Is it free to generate {styleObj.name} designs?
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                When you create a free account, you receive complimentary credits to try out the AI home decorator. Generating a style redesign costs just {catObj.id ? 1 : 1} credit. You can purchase more credits at any time to continue designing.
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
