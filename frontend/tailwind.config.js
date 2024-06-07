/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    './src/**/*.{tsx,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        kavoon: ['Kavoon', 'serif'],
      },
    },
  },
  plugins: [],
}

