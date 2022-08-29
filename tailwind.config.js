/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      screens: {
        'desktop': {'min': '1281px'},
        'laptop': {'max': '1280px'},
        'tablet': {'max': '1100px'},
        'mobile': {'max': '700px'},
      },
      fontFamily: {
        'basier_circle': ['basier circle'],
        'neue_metana_regular': ['neue metana regular'],
        'neue_metana_bold': ['neue metana bold'],
      },      
    },
  },
  plugins: [],
}
