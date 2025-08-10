import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0b0f14',
        card: '#0f1620'
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,0.2)'
      }
    }
  },
  darkMode: 'class'
}
export default config
