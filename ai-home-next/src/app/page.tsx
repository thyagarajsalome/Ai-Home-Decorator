import React from "react";
import DesignWorkspace from "@/components/DesignWorkspace";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-obsidian-950">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 w-full flex-grow">
        <DesignWorkspace />
      </main>
    </div>
  );
}
