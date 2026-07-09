/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./entities/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Action green — used for buttons, progress, links across the app
        brand: {
          50:  '#f1fcf3',
          100: '#defae5',
          200: '#bef3cc',
          300: '#8ae8a5',
          400: '#4fd376',
          500: '#27b953',
          600: '#1a9a41',
          700: '#177936',
          800: '#17602e',
          900: '#144f28',
        },
        // Near-black surfaces — header, bottom nav, hero card
        ink: {
          800: '#1d2620',
          900: '#141b16',
          950: '#0c110d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      // Flat retro offsets — solid, no blur
      boxShadow: {
        soft: '3px 3px 0 0 #141b16',
        lift: '5px 5px 0 0 #141b16',
        glow: '4px 4px 0 0 #1a9a41',
      },
    },
  },
  plugins: [],
}
