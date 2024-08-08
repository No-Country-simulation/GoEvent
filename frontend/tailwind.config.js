/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        vietnam: ["Be Vietnam Pro"], //vistas post-login
        gotic: ["Zen Maru Gothic"] //landingPage
      }
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
