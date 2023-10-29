/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F2F2F2',
        secondary: '#A1A1AA',
        disabled: '#7c7c83',
        complementary: '#000',
        border: '#2c2d3c',
      },
      backgroundColor: {
        primary: '#191A23',
        secondary: '#20212E',
        highlight: '#1c1d2a',
        hover: '#1c1d2a',
        complementary: '#fff',
      },
    },
  },
  plugins: [],
};
