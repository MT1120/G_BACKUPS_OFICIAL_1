/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'screen-minus-1200': 'calc(100vw - 85%)',
      },
    },
    screens: {
      'laptop2': '980px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1061px',
      // => @media (min-width: 1024px) { ... }

      'laptop3': '700px',
      // => @media (min-width: 1280px) { ... }
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    
    
  },
  plugins: [],
}