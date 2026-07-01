import type { Config } from 'tailwindcss'
const {fontFamily} = require("tailwindcss/defaultTheme")

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
      primary: '#038c7F',
      secondary: '#F2C641',
      tertiary: {
        dark:'#F27405',
        light: '#F2C641',
      },
    },
    fontFamily: {
      poppins:['var(--font-poppins)',...fontFamily.sans],
    },
    keyframes: {
      'fade-down': {
        '0%': { opacity: '0', transform: 'translateY(-8px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
    animation: {
      'fade-down': 'fade-down 0.2s ease-out',
    },
  },
},
  plugins: [],
};
export default config;
