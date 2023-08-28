import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
      },
      colors: {
        navy: '#101828',
        sky: '#3F80FF',
        blue: '#004EEB',
        lightblue: 'rgba(0, 78, 235, 0.15)',
        green: '#34C184',
        lightgreen: 'rgba(52,193,132,0.15)',
        orange: '#FF9A30',
        lightorange: 'rgba(255,154,48,0.15)',
        sub1: '#F4F6F8',
        sub2: '#E8EBF0',
        sub3: '#D8DCE2',
        sub4: '#C4CAD4',
        sub5: '#A5ADBD',
        sub6: '#8E95A3',
        lightsub6: 'rgba(142,149,163,0.15)',
        sub7: '#595F72',
        sub8: '#353C49',
        sub9: '#1A1E27',
        white: '#ffffff',
        black: '#121213',
        lightblack: 'rgba(16, 24, 40, 0.15)',
        nagative: '#FF4C4C',
        positive: '#21C389',
        opacityblack: 'rgba(18, 18, 19, 0.25)',
        modalBackground: 'rgba(18, 18, 19, 0.4)',
      },
      translate: {
        center: '50%',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        bolder: '800',
      },
    },
  },
  plugins: [],
};
export default config;
