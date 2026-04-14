/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'syne': ['Syne', 'sans-serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
      colors: {
        'bg': '#0a0a0a',
        'bg-2': '#111111',
        'bg-3': '#161616',
        'accent': '#00d4ff',
        'accent2': '#a855f7',
        'accent3': '#f59e0b',
        'text': '#f1f5f9',
        'text-muted': '#64748b',
        'text-dim': '#94a3b8',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(30px, -30px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-30px, 30px)' },
        }
      }
    },
  },
  plugins: [],
}