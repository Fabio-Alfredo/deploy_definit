/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      fontFamily: {
        'brygada-1918': ['Brygada 1918', 'sans-serif'],
        'popins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif']
      },
      colors:{
        'principalColor' : '#F2F2F2'
      },
      backgroundImage:{
        'HomeImg':"url('/src/assets/HomeImg.png')"
      }
    },
  },
  plugins: [],
}