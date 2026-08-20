import React from "react";
import DesignWorkspace from "@/components/DesignWorkspace";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-obsidian-950">
      <Hero />
      <main id="workspace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 w-full flex-grow">
        <DesignWorkspace />
      </main>
    </div>
  );
}
