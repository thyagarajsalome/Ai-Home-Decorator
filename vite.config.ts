import path from "path";
import { defineConfig } from "vite"; // No need for loadEnv if not using define
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // const env = loadEnv(mode, '.', ''); // No longer needed here
  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    plugins: [react()],
    // define: { // --- REMOVE THIS BLOCK ---
    //   'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    //   'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    // },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});
