import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.tsx",
    "./components/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          naranja: '#FAB600',
          amarilloInicio: '#FDD904',
          amarilloFin: '#F9B50B',
          azul: '#0056A4',
          footer: '#117fc3',
          celeste: '#0080C9',
          acua: '#9ACCEA',
          crema: '#EFEDE4',
          blanco: '#FFFFFF',
          texto: '#253a44',
        },
      },
      backgroundImage: {
        'brand-sunrise': 'linear-gradient(90deg, var(--gradient-brand-sunrise-start), var(--gradient-brand-sunrise-end))',
      },
      fontFamily: {
        heading: ['Gilroy', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        display: ['3.5rem', { lineHeight: '1.2' }],
        h1: ['2.5rem', { lineHeight: '1.2' }],
        h2: ['2rem', { lineHeight: '1.3' }],
        h3: ['1.5rem', { lineHeight: '1.4' }],
        lead: ['1.25rem', { lineHeight: '1.6' }],
        body: ['1rem', { lineHeight: '1.7' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
        caption: ['0.75rem', { lineHeight: '1.4' }],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
