import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa"; // <-- 1. IMPORT THE PLUGIN

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

    plugins: [
      react(),
      // --- 2. ADD THE PLUGIN CONFIGURATION ---
      VitePWA({
        registerType: "autoUpdate", // Automatically updates the app
        injectRegister: "auto", // Automatically registers the service worker

        // This tells the plugin to find your existing manifest.json
        // and automatically include all your icons.
        manifest: {
          name: "AI Home Decorator",
          short_name: "AI Decorator",
          description:
            "Upload a photo of your room, choose a style, and let AI redesign it in seconds. Visualize your dream space with trendy filters like Japandi, Cyberpunk, and more.",
          theme_color: "#8b5cf6",
          background_color: "#111827",
          display: "standalone",
          orientation: "portrait-primary",
          icons: [
            {
              src: "/icons/icon-192x192.png",
              type: "image/png",
              sizes: "192x192",
            },
            {
              src: "/icons/icon-512x512.png",
              type: "image/png",
              sizes: "512x512",
            },
            {
              src: "/icons/maskable-icon-512x512.png",
              type: "image/png",
              sizes: "512x512",
              purpose: "maskable",
            },
          ],
        },

        // This ensures ALL your app's files are cached
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg,json,webp}"],
        },
      }),
      // --- END OF PLUGIN CONFIG ---
    ],

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
