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
    // --- FIX: CHUNK SPLITTING (Performance) ---
    build: {
      chunkSizeWarningLimit: 1000, // Increase limit to 1MB
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Split vendor modules into separate files
            if (id.includes("node_modules")) {
              if (id.includes("firebase")) {
                return "firebase";
              }
              if (id.includes("react")) {
                return "vendor-react";
              }
              if (id.includes("@google/genai")) {
                return "genai";
              }
              return "vendor";
            }
          },
        },
      },
    },
    // ------------------------------------------
  };
});
