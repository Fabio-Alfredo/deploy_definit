/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors:{
        'color-primary': '#F2F2F2',
        'blue-buttons': '#628CB1'
      },
      fontFamily: {
        'brygada-1918': ['Brygada 1918', 'sans-serif'],
        'popins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif']
      },
      backgroundImage:{
        'HomeImg':"url('/src/assets/HomeImg.png')"
      }
    },
  },
  plugins: [],
}