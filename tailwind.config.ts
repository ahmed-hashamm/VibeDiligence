import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./animations/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#08080F',
        surface: '#0F0F1A',
        'surface-raised': '#141428',
        pink: {
          400: '#FF5588',
          500: '#FF2D6B',
        },
        purple: {
          400: '#9B4FDE',
          500: '#7B2FBE',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono-var)', 'Courier New', 'monospace'],
      },
      boxShadow: {
        card: '0 0 0 1px #1E1E35, 0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 0 0 1px #2D2D55, 0 8px 32px rgba(0,0,0,0.6), 0 0 60px rgba(255,45,107,0.08)',
        'glow-pink': '0 0 20px rgba(255,45,107,0.3), 0 0 60px rgba(255,45,107,0.15)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        'fade-up': 'fade-up 0.5s ease-out forwards',
        scan: 'scan 2.5s ease-in-out infinite',
        'dot-pulse': 'dot-pulse 1.5s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'spin-reverse': 'spin-reverse 12s linear infinite',
        'orb-pulse': 'orb-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 16px rgba(255,45,107,0.20)' },
          '50%': { boxShadow: '0 0 32px rgba(255,45,107,0.45), 0 0 64px rgba(255,45,107,0.15)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '15%': { opacity: '1' },
          '85%': { opacity: '1' },
          '100%': { transform: 'translateY(500%)', opacity: '0' },
        },
        'dot-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.35)' },
        },
        'orb-pulse': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
