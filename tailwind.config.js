/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'lato': ["Lato", ...defaultTheme.fontFamily.sans],
        'monte': ["Montserrat", ...defaultTheme.fontFamily.sans]
      }
    },

  },
  plugins: [
    require('flowbite/plugin')
  ],
  important: true,
}

