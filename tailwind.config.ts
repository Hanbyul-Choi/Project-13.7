import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        navy: '#101828',
        sky: '#3F80FF',
        blue: '#004EEB',
        green: '#34C184',
        orange: '#FF9A30',
        sub1: '#F4F6F8',
        sub2: '#E8EBF0',
        sub3: '#D8DCE2',
        sub4: '#C4CAD4',
        sub5: '#A5ADBD',
        sub6: '#8E95A3',
        sub7: '#595F72',
        sub8: '#353C49',
        sub9: '#1A1E27',
        white: '#ffffff',
        black: '#121213',
        nagative: '#FF4C4C',
        positive: '#21C389',
      },
    },
  },
  plugins: [],
};
export default config;
