/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define your global colors here
        primary: {
          DEFAULT: '#3B82F6', // blue-500
          light: '#93C5FD',   // blue-300
          dark: '#1D4ED8',    // blue-700
        },
        secondary: {
          DEFAULT: '#10B981', // emerald-500
          light: '#6EE7B7',   // emerald-300
          dark: '#047857',    // emerald-700
        },
        accent: '#8B5CF6',    // violet-500
        background: '#F9FAFB', // gray-50
        text: {
          DEFAULT: '#1F2937', // gray-800
          light: '#6B7280',   // gray-500
        },
        // Add more colors as needed
      },
    },
  },
  plugins: [],
}
