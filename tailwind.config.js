/** @type {import('tailwindcss').Config} */
const THEME_COLORS = require('./src/theme/theme-colors');

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: THEME_COLORS
    },
  },
  plugins: [],
};
