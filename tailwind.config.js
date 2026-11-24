/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep Royal Forest / Emerald Palette
        forest: {
          50: '#F2FBF7',
          100: '#E1F6ED',
          200: '#C2EDDB',
          300: '#94DFC1',
          400: '#5EC9A1',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#064E3B',
          900: '#022C22',
          950: '#011C15',
          DEFAULT: '#064E3B',
          dark: '#011C15',
          deep: '#022C22',
          light: '#047857',
          hover: '#065F46',
        },
        emerald: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#022C22',
          DEFAULT: '#059669',
          dark: '#047857',
          light: '#10B981',
          soft: '#ECFDF5',
          border: '#A7F3D0',
        },
        // Deep Royal Palace scale (used for dark luxury sections)
        palace: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#0D5C49',
          800: '#084335',
          900: '#04281F',
          950: '#021B14',
          DEFAULT: '#04281F',
        },
        // Royal Ocean Azure Palette (echoing the brand's vibrant blue from logo)
        ocean: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
          950: '#082F49',
          DEFAULT: '#0284C7',
          dark: '#0369A1',
          light: '#38BDF8',
          soft: '#F0F9FF',
          border: '#BAE6FD',
        },
        // Warm Gold & Saffron Accents
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
          DEFAULT: '#D97706',
          light: '#F59E0B',
          dark: '#B45309',
          soft: '#FFFBEB',
          hairline: '#FDE68A',
          border: '#FDE68A',
        },
        // Clean Parchment / Canvas scale
        parchment: {
          DEFAULT: '#F8FAFC',
          border: '#E2E8F0',
          dark: '#F1F5F9',
        },
        canvas: {
          DEFAULT: '#F8FAFC',
          pure: '#FFFFFF',
          subtle: '#F1F5F9',
          alt: '#E2E8F0',
        },
        // High-Contrast Ink Text Typography
        ink: {
          DEFAULT: '#0F172A', // Slate 900
          soft: '#334155',    // Slate 700
          muted: '#64748B',   // Slate 500
          light: '#94A3B8',   // Slate 400
          inverted: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'elevated': '0 12px 30px -4px rgba(0, 0, 0, 0.1), 0 4px 8px -4px rgba(0, 0, 0, 0.04)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      letterSpacing: {
        luxury: '0.12em',
        widest: '0.18em',
      },
    },
  },
  plugins: [],
};
