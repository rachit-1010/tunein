/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        'color-primary': '#fff',
	      'color-secondary': '#b3b3b3',
	      'color-highlight': '#1ed760',
      },
      backgroundColor: {
        'color-primary': '#121212',
	      'color-secondary': '#2a2929',
	      'color-highlight': '#222222',
        'color-green': '#1ed760',
      }
    },
  },
  plugins: [],
}

