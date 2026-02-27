/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#020617', // slate-950
        primary: {
          DEFAULT: '#22d3ee', // cyan-400
          glow: 'rgba(34, 211, 238, 0.4)',
        },
        secondary: {
          DEFAULT: '#a855f7', // purple-500
          glow: 'rgba(168, 85, 247, 0.4)',
        },
      },
      backdropBlur: {
        'xl': '24px',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(34, 211, 238, 0)' },
          '50%': { boxShadow: '0 0 20px 4px rgba(34, 211, 238, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
