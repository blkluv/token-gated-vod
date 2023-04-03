/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F3BA2F",
      },
      fontFamily: {
        MontHeavy: ["MontHeavy", "sans-serif"],
      },
    },
  },
  plugins: [],
};