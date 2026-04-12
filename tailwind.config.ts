import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0a0a0a',
          secondary: '#111111',
          tertiary: '#1a1a1a',
          quaternary: '#2a2a2a',
        },
        text: {
          primary: '#ffffff',
          secondary: '#d1d1d1',
        },
        accent: {
          light: '#e5e5e5',
          DEFAULT: '#a3a3a3',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(229, 229, 229, 0.3), 0 0 40px rgba(163, 163, 163, 0.2)',
        'neon-sm': '0 0 10px rgba(229, 229, 229, 0.2), 0 0 20px rgba(163, 163, 163, 0.1)',
        'neon-lg': '0 0 30px rgba(229, 229, 229, 0.4), 0 0 60px rgba(163, 163, 163, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
