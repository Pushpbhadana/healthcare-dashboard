/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        page: '#F6F7FB',
        teal: {
          DEFAULT: '#01F0D0',
          light: 'rgba(1,240,208,0.12)',
        },
        brand: {
          text: '#072635',
          muted: '#707070',
          border: '#E8E8E8',
        },
        systolic: '#E66FD2',
        diastolic: '#8C6FE6',
      },
      borderRadius: {
        card: '16px',
        chip: '999px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.06)',
      },
      fontSize: {
        section: 'clamp(1rem, 0.92rem + 0.35vw, 1.125rem)',
        display: 'clamp(1.125rem, 1rem + 0.6vw, 1.25rem)',
      },
    },
  },
  plugins: [],
}

