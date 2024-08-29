/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
            "./index.html",
            "./src/**/*.{html,js,jsx}"
           ],
  theme: {
    extend: {
      keyframes: {
      pulse: {
        '0%': { transform: 'scale(0)', opacity: '0' },
        '100%': { transform: 'scale(1)', opacity: '1' },
      },
    },
    animation: {
      pulse: 'pulse 1s ease-in-out',
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
    },
  },
  },
  plugins: [],
}

