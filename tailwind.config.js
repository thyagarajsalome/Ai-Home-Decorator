/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include your main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS/TS/JSX/TSX files in the src folder
    "./pages/**/*.{js,ts,jsx,tsx}", // Include files in pages folder
    "./components/**/*.{js,ts,jsx,tsx}", // Include files in components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
