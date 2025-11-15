import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  return {
    // CRITICAL: Set base path for proper asset loading in TWA
    base: "/",

    server: {
      port: 3000,
      host: "0.0.0.0",
      // Proxy configuration for local development
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

    build: {
      // Output directory
      outDir: "dist",

      // Generate sourcemaps for debugging TWA issues
      sourcemap: mode === "development",

      // Ensure assets are properly named for caching
      assetsDir: "assets",

      // Optimize chunk size for mobile
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate vendor chunks for better caching
            vendor: ["react", "react-dom", "react-router-dom"],
            ui: ["framer-motion", "@use-gesture/react"],
          },
        },
      },

      // Increase chunk size warning limit (mobile apps can be larger)
      chunkSizeWarningLimit: 1000,

      // Minify for production
      minify: mode === "production" ? "terser" : false,

      // Target modern browsers (most Android devices support ES2015+)
      target: "es2015",
    },

    // Preview server configuration (for testing production build locally)
    preview: {
      port: 3000,
      host: "0.0.0.0",
    },

    // Optimize dependencies
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "framer-motion",
        "@use-gesture/react",
      ],
    },
  };
});
