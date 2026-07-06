/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['IBM Plex Serif', 'serif'],
        'mono': ['IBM Plex Mono', 'monospace'],
        'sans': ['IBM Plex Sans', 'sans-serif'],
      },
      colors: {
        'paper': '#EAEFEE',
        'paper-2': '#F5F7F6',
        'ink': '#10222B',
        'ink-soft': '#4B5C63',
        'line': '#1D4E89',
        'line-soft': 'rgba(29,78,137,0.28)',
        'accent': '#FF5A1F',
        'accent-soft': 'rgba(255,90,31,0.10)',
      },
      keyframes: {
        dash: {
          to: { strokeDashoffset: '-24' },
        },
      },
      animation: {
        dash: 'dash 2.4s linear infinite',
      },
    },
  },
  plugins: [],
}