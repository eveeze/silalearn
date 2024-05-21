/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        spartan: ["var(--font-spartan)"],
        righteous: ["var(--font-righteous)"],
        josefin: ["var(--font-josefin)"],
      },
      colors: {
        merah: {
          50: "#fbe9e9",
          100: "#f9dedd",
          200: "#f3bab9",
          300: "#d8221e",
          400: "#c21f1b",
          500: "#ad1b18",
          600: "#a21a17",
          700: "#821412",
          800: "#610f0d",
          900: "#4c0c0b",
        },
      },
    },
  },
  plugins: [],
};
