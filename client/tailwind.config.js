/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        gray:{
         100:"#f5f5f5",
          200:"#e0e0e0",
          600:"#7d7d7d",
        },
        purple:{
          200:"#d9ddee",
          500:"#9492db",
          600:"#7164c0",
        }
      }
    },
  },
  plugins: [],
}