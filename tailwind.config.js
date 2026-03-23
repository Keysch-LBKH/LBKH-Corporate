/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: '#121212',
        smokyTeal: '#008080',
        cyanGlow: '#40E0D0',
        burntOrange: '#FF8C00'
      }
    },
  },
  plugins: [],
}
