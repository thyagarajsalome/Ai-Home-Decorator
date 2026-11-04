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
        sans: ["var(--font-roboto)", "Roboto", "sans-serif"],
        heading: ["var(--font-roboto)", "Roboto", "sans-serif"],
      },
      colors: {
        // Official Brand Orange Palette (from Logo & Promo graphics)
        brand: {
          50: "#FFF8F2",
          100: "#FEEDDF",
          200: "#FCD7BA",
          300: "#F8B98B",
          400: "#F29455",
          500: "#E87A1E", // Core Brand Orange
          600: "#D46513",
          700: "#B04D0D",
          800: "#8D3D10",
          900: "#733310",
          950: "#3E1805",
        },
        // Rich Chocolate & Coffee Browns (from Logo text "Home Decorator")
        brandBrown: {
          50: "#F7F2EE",
          100: "#EDE2DA",
          200: "#D8C3B3",
          300: "#BFA08B",
          400: "#8B6244",
          500: "#5C3314",
          600: "#4A2508", // Core Brand Brown
          700: "#3D1D06",
          800: "#2F1504",
          900: "#220E02",
          950: "#140701",
        },
        // Warm Cream & Sand Backdrops
        brandCream: {
          DEFAULT: "#FFFBF7",
          50: "#FFFFFF",
          100: "#FFFBF7",
          200: "#FAF4EC",
          300: "#F3E9DD",
          400: "#E9DAC8",
          border: "#F1E4D5",
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
