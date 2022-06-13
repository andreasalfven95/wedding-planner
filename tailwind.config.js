module.exports = {
  content: [
    // Example content paths...
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
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
          lighter: '#fffdf9',
          /* lighter: '#fbfbfb', */
          /* lighter: '#E8E6E3', */
          /* lighter: '#F1EFE9', */
          /* lighter: '#ede9e6', */
          /* lighter: '#FFF9F2', */
          light: '#e5e0da',
          normal: '#CCC2B5',
          dark: '#9B9287',
          darker: '#6D6356',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
