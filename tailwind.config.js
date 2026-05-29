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
          50:  '#eef2ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2d47c0',
          700: '#1e3a8a',
          800: '#152c72',
          900: '#0d1e52',
        },
        gold: {
          50:  '#f0f7ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#c4ddff',
          400: '#a8cfff',
          500: '#93c5fd',
          600: '#2d5ac4',
          700: '#1e3a8a',
          800: '#152c72',
          900: '#0d1e52',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
    },
  },
  plugins: [],
}
