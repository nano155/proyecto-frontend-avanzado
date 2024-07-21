import animations from '@midudev/tailwind-animations'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      'purple-heart': {
        '50': '#eeefff',
        '100': '#e0e2ff',
        '200': '#c6c9ff',
        '300': '#a4a5fd',
        '400': '#8980f9',
        '500': '#7661f3',
        '600': '#623de6',
        '700': '#5a36cc',
        '800': '#492fa4',
        '900': '#3e2d82',
        '950': '#251a4c',
    }, 
      'error': '#B91C1C', // Por ejemplo, un tono oscuro de rojo
      'warning': '#FFA500', // Por ejemplo, un tono anaranjado

      },
    },
},
  plugins: [
    animations,
  ],
}