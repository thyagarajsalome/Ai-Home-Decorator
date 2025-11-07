import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
      // --- FIX: ADD PROXY CONFIGURATION ---
      proxy: {
        // Redirects requests from http://localhost:3000/api/decorate to http://localhost:8080/api/decorate
        "/api": {
          target: "http://localhost:8080",
          changeOrigin: true, // Needed for virtual hosting sites
          secure: false, // Don't verify SSL for local development
        },
      },
      // --- END PROXY CONFIGURATION ---
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});
