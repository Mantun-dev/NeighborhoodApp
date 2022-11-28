/** @type {import('tailwindcss').Config} */
const colors = require('./node_modules/tailwindcss/colors');

module.exports = {
  content: ['./views/**/*.pug'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      green: colors.green,
      red: colors.red,
    },
  },
};
