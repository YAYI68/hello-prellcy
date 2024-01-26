/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          "dark-gray": "#667085",
          purple: "#7F56D9",
        },
      },
    },
  },
  plugins: [],
};
