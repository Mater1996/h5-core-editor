module.exports = {
  purge: [
    './packages/**/*.{js,jsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    minWidth: {
      4: '1rem',
      24: '6rem'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
