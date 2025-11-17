import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  return {
    base: "/",
    server: {
      port: 3000,
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    // --- FIX: CHUNK SPLITTING ---
    build: {
      chunkSizeWarningLimit: 1000, // Increase limit to 1MB to silence minor warnings
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Split vendor modules (node_modules) into separate chunks
            if (id.includes("node_modules")) {
              if (id.includes("firebase")) {
                return "firebase"; // Separate Firebase chunk
              }
              if (id.includes("react")) {
                return "vendor-react"; // Separate React chunk
              }
              if (id.includes("@google/genai")) {
                return "genai"; // Separate AI SDK chunk
              }
              return "vendor"; // All other dependencies
            }
          },
        },
      },
    },
    // ----------------------------
  };
});
