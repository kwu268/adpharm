/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'mobileSm': '320px',

      'mobileMd': '474px',

      'sm': '640px',

      'lg': '1024px',

      'desktop': '1280px',
      
      'laptop': '1061px'
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
