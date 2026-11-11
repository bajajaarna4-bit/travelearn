/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        sukoon: {
          50: '#FDF8F3',
          100: '#F8ECE0',
          200: '#F0D6C0',
          300: '#E5B898',
          400: '#D9966D',
          500: '#C87443', // Warm Terracotta / Saffron
          600: '#B0592E',
          700: '#8E4020',
          800: '#692E17',
          900: '#3D1B0D',
        },
        sand: {
          50: '#FAF8F5',
          100: '#F4EFEA',
          200: '#EAE1D7',
          300: '#D9CBBB',
          400: '#C2B19F',
          500: '#A99480',
          600: '#86725F',
          700: '#655344',
          800: '#46382E',
          900: '#2A2019',
        },
        forest: {
          50: '#F0F7F4',
          100: '#DBEFE7',
          200: '#B5DFC0',
          300: '#86C7A8',
          400: '#52AA88',
          500: '#2F8566', // Deep Ayurvedic Green
          600: '#226950',
          700: '#1B523E',
          800: '#143D2E',
          900: '#0C261D',
        },
        marigold: {
          DEFAULT: '#E58E26',
          glow: '#F6B93B',
          deep: '#B76E1B',
        },
        terracotta: {
          DEFAULT: '#D35400',
          light: '#E67E22',
          soft: '#F39C12',
        },
        mystic: {
          indigo: '#1C1936',
          dusk: '#2B2544',
          border: 'rgba(255, 255, 255, 0.12)',
        }
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'sukoon': '0 10px 30px -10px rgba(200, 116, 67, 0.15), 0 20px 40px -20px rgba(0, 0, 0, 0.05)',
        'glow-saffron': '0 0 25px rgba(230, 126, 34, 0.35)',
        'glow-forest': '0 0 25px rgba(47, 133, 102, 0.35)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'breathe': 'breathe 6s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.85' },
          '50%': { transform: 'scale(1.22)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
};

