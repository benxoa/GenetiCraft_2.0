/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    'node_modules/flowbite-react/lib/esm/**/*.js',


  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#f8f8f8',
          900: '#121212',
        },
      },
    },
  },
  plugins: [        require('flowbite/plugin')
],
}

