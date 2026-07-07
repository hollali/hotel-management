import type { Config } from 'tailwindcss'
const { fontFamily } = require("tailwindcss/defaultTheme")

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#B5A191',
        'stellar-blue': '#02102A',
        dark: '#191919',
        'stellar-grey': '#999FAA',
        'stellar-light-grey': '#D9DBDF',
        'light-grey-bg': '#F8F8F8',
        beige: '#F2EFEB',
      },
      fontFamily: {
        heading: ['var(--font-heading)', ...fontFamily.serif],
        secondary: ['var(--font-secondary)', ...fontFamily.sans],
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
}
export default config
