import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        'primary': {
          '50': '#f4f7fb',
          '100': '#e7eff7',
          '200': '#cbddec',
          '300': '#9cbfdd',
          '400': '#679ec9',
          '500': '#4482b3',
          '600': '#336796',
          'base': '#2c5780',
          '800': '#264766',
          '900': '#243d56',
          '950': '#182839',
        },
        'secondary': {
          '50': '#fbf8eb',
          '100': '#f7ecca',
          '200': '#f0d898',
          'base': '#e5b449',
          '400': '#dfa130',
          '500': '#d08a22',
          '600': '#b36a1b',
          '700': '#8f4d19',
          '800': '#773e1c',
          '900': '#66351d',
          '950': '#3b1a0d',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
export default config;
