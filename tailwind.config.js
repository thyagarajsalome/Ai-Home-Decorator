/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Outfit", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#1e1b4b",
        },
        obsidian: {
          50: "#f4f5f6",
          100: "#e9ebed",
          200: "#c9ced4",
          300: "#a9b1ba",
          400: "#697787",
          500: "#293d54",
          600: "#25374c",
          700: "#1f2e3f",
          750: "#17222f",
          800: "#192532",
          850: "#111b27",
          900: "#0b0f19",
          950: "#070a10",
        },
        gray: {
          650: "#4b5563",
          750: "#2d3748",
          850: "#1a202c",
        }
      },
      animation: {
        blob: "blob 7s infinite",
        fade: "fadeIn 0.5s ease-out",
        slideUp: "slideUpFadeIn 0.5s ease-out",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.95)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUpFadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        }
      },
    },
  },
  plugins: [],
};
