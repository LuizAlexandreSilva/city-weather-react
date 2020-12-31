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
        gray: {
          150: '#f0f0f0',
          650: '#3c3c3c',
        },
        red: {
          850: '#b30000',
        },
      },
    },
    container: {
      center: true,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
