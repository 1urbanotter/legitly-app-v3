import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'honorable_navy': { 
          DEFAULT: '#1a2432',
          100: '#05070a',
          200: '#0a0e14',
          300: '#10161e',
          400: '#151d28',
          500: '#1a2432',
          600: '#374d6c',
          700: '#5576a5',
          800: '#8da4c4',
          900: '#c6d1e2' 
          },
        'legally_red': {
          DEFAULT: '#f5314b',
          100: '#38030a',
          200: '#710514',
          300: '#a9081e',
          400: '#e20b27',
          500: '#f5314b',
          600: '#f75b70',
          700: '#f98494',
          800: '#fbadb8',
          900: '#fdd6db' 
          },
        'blue_justice': {
          DEFAULT: '#6ad8da',
          100: '#0d3434',
          200: '#1a6768',
          300: '#279b9d',
          400: '#38cbcd',
          500: '#6ad8da',
          600: '#89e0e2',
          700: '#a7e8e9',
          800: '#c4f0f0',
          900: '#e2f7f8'
          },
        'supreme_white':
          {
          DEFAULT: '#eff2f5',
          100: '#25303c',
          200: '#4b6177',
          300: '#7891ab',
          400: '#b4c2d0',
          500: '#eff2f5',
          600: '#f2f5f7',
          700: '#f6f7f9',
          800: '#f9fafb',
          900: '#fcfcfd'
          },
        'contract_black': {
          DEFAULT: '#212627',
          100: '#070808',
          200: '#0d0f0f',
          300: '#141717',
          400: '#1a1e1f',
          500: '#212627',
          600: '#495456',
          700: '#728285',
          800: '#a0acae',
          900: '#d0d5d7' 
        }, 
      }
    },
  },
  plugins: [],
};
export default config;