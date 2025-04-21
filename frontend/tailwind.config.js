/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens:{
      'sm':'576px',
      'md':'768px',
      'lg':'992px',
      'xl':'1200px',
      '2xl':'1400px'
    },
    extend: {
      screens:{
        'xm':'320px'
      },
      colors:{
        'primary':'#5f6FFF'
      }
    },
  },
  plugins: [],
}