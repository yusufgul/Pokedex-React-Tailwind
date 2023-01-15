/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontVariant: {
      smallCaps: "small-caps",
    },
  },
  variants: {
    fontVariant: [
      "responsive",
      "hover",
      "focus",
      "active",
      "group-hover",
      "font-variant-smallcaps",
    ],
  },
  plugins: [],
};
