/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF8F2',
        warmwhite: '#F7F2E9',
        champagne: '#D8C29A',
        champagneDeep: '#B89A66',
        pearl: '#EFE7D8',
        beige: '#E8DFCC',
        mutedgold: '#A88A4F',
        mutedgoldDeep: '#6B5526',
        // Restrained luxury olive — muted, desaturated, "olive silk".
        // An accent and a shadow undertone, never a fill.
        olive: '#82805A',
        oliveDeep: '#686748',
        oliveMist: '#9C9A78',
        ink: '#2B2417',
        shadowwarm: 'rgba(58, 57, 36, 0.08)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', '"Helvetica Neue"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        editorial: '0.32em',
        wider2: '0.18em',
      },
      backgroundImage: {
        'radial-warm':
          'radial-gradient(circle at 50% 40%, rgba(216,194,154,0.18) 0%, rgba(251,248,242,0) 60%)',
        'radial-pearl':
          'radial-gradient(circle at 50% 50%, rgba(239,231,216,0.55) 0%, rgba(251,248,242,0) 70%)',
        'radial-olive':
          'radial-gradient(circle at 50% 50%, rgba(130,128,90,0.14) 0%, rgba(251,248,242,0) 68%)',
        'gold-line':
          'linear-gradient(90deg, transparent 0%, rgba(168,138,79,0.55) 50%, transparent 100%)',
      },
      boxShadow: {
        soft: '0 30px 80px -40px rgba(75, 55, 30, 0.25)',
        glass: '0 20px 60px -30px rgba(75, 55, 30, 0.18)',
        glow: '0 0 80px rgba(216, 194, 154, 0.35)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        float: 'float 9s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        breath: 'breath 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        breath: {
          '0%,100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.95', transform: 'scale(1.04)' },
        },
      },
    },
  },
  plugins: [],
};
