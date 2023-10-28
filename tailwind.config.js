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
      },
      backgroundColor: {
        primary: '#0C0A09',
        secondary: '#1C1917',
        highlight: '#262626',
        hover: '#262626',
        complementary: '#fff',
      },
    },
  },
  plugins: [],
};
