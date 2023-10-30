/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F2F2F2',
        secondary: '#A1A1AA',
        disabled: '#7c7c83',
        complementary: '#191A23',
        border: '#2c2d3c',
        theme: '#FF4B00',
        themeHover: '#e94600',
        themeHoverSecondary: '#eb460022',
      },
      backgroundColor: {
        primary: '#191A23',
        secondary: '#20212E',
        highlight: '#1c1d2a',
        hover: '#1c1d2a',
        complementary: '#f2f2f2',
        theme: '#FF4B00',
        themeHover: '#e94600',
      },
    },
  },
  plugins: [],
};
