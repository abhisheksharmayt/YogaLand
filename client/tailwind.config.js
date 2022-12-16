/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Figtree: ['Figtree', 'sans - serif'],
        Inter: ['Inter', 'sans - serif'],
        Monst: ['Montserrat'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
