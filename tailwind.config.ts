import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './node_modules/@nuxt/ui/dist/**/*.{js,ts,vue}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0b1c2c',
        brand: '#00e5ff',
        secondary: '#0052cc',
        base: '#fffafa',
      }
    }
  },
  plugins: []
} satisfies Config