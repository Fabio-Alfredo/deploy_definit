/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      boxShadow:{
        '2xl':'3px 5px 4px rgba(0, 0, 0, 0.4)',
      },
      colors:{
        'color-primary': '#F2F2F2',
        'blue-buttons': '#628CB1',
        'input-color': '#D9D9D9',
        'green-primary': '#008D62'
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