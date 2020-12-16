module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  extend: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
  },
  theme: {
    extend: {
      colors: {
        blue: {
          450: '#39a3db',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
