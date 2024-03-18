/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/App.tsx',
    './src/*/*.{js,jsx,ts,tsx}',
    './src/components/*/*.{js,jsx,ts,tsx}',
    './src/screens/*/*.{js,jsx,ts,tsx}',
    './src/*',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
