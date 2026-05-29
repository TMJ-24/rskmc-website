/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#e8eaf6',
          100: '#c5cae9',
          200: '#9fa8da',
          300: '#7986cb',
          400: '#5c6bc0',
          500: '#3949ab',
          600: '#283593',
          700: '#1a237e',
          800: '#0d1642',
          900: '#060b2e',
        },
        gold: {
          50: '#fdf8e1',
          100: '#faf0b7',
          200: '#f7e68d',
          300: '#f5e16a',
          400: '#f0d54a',
          500: '#D4AF37',
          600: '#C9A227',
          700: '#9B7D1A',
          800: '#6d570d',
          900: '#3f3205',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
    },
  },
  plugins: [],
}
