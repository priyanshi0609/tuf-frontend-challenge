/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        sky: {
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        cal: {
          blue: '#1AACEC',
          'blue-dark': '#0E8DC4',
          'blue-light': '#E8F7FD',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'page-flip': 'pageFlip 0.6s ease-in-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pageFlip: {
          '0%': { transform: 'rotateY(-15deg) scale(0.97)', opacity: '0.6' },
          '50%': { transform: 'rotateY(3deg) scale(1.01)', opacity: '0.9' },
          '100%': { transform: 'rotateY(0deg) scale(1)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      boxShadow: {
        'calendar': '0 20px 60px -10px rgba(0,0,0,0.18), 0 4px 16px -2px rgba(0,0,0,0.10)',
        'calendar-dark': '0 20px 60px -10px rgba(0,0,0,0.55), 0 4px 16px -2px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
}