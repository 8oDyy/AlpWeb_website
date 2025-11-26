import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './app/app.vue'
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        'cream-dark': '#EBE4D8',
        'cream-light': '#FAF8F5',
        'alp-black': '#1A1A1A',
        'alp-black-soft': '#2D2D2D',
        'alp-black-muted': '#4A4A4A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
