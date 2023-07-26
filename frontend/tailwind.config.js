/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        85: "22rem",
        100: "28rem",
        104: "32rem",
      },
    },
  },
  plugins: [],
};
