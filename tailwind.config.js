/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    colors: {
      'white': '#FFFFFF',
      'black': '#000000',
      'background': '#F9FAF4',
      'primary': '#326941',
      'primaryHover': '#147945',
      'surface2': '#EBEFDA',
      'onSurfaceVariant': '#414941',
      'secondaryContainer': '#D3E8D2',
      'onSecondaryFixedVariant': '#394B3B',
      'error': '#BA1A1A',
      'errorContainer': '#FFDAD6',
      'outlineVariant': '#757D74',
      'outline': '#717970',
    },
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}
