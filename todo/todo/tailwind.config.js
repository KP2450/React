/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // ✅ scan these files for Tailwind classes
  ],
  theme: {
    extend: {},  // ✅ customize colors, fonts, spacing etc.
  },
  plugins: [],
}
