/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "head-color": "#3a3a3a",
        "heading-color": "#333",
        "main-color": "rgb(2 132 199)",
        "second-color": "#555",
        "red-color": "#f37e7e",
      },
    },
  },
  plugins: [],
};
