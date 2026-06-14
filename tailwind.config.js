/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ffb400',
        dark: {
          DEFAULT: '#111',
          200: '#1a1a1a',
          300: '#222',
          400: '#252525',
          500: '#2b2a2a',
          700: '#444',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        sans:    ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
