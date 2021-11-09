module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        96: '96%',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        beige: {
          /* lighter: 'rgba(244,242,239,0.4)', */
          /* lighter: '#fffaf7', */
          lighter: '#f9f9f9',
          /* lighter: '#E8E6E3', */
          /* lighter: '#F1EFE9', */
          /* lighter: '#ede9e6', */
          /* lighter: '#FFF9F2', */
          /* light: '#e5e0da', */
          light: '#e2e2e2',
          normal: '#cccccc',
          dark: '#9b9b9b',
          darker: '#6d6d6d',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
