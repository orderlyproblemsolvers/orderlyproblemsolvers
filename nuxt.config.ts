// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/image', 'nuxt-charts'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Orderly Problem Solvers',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { name: 'description', content: 'OPS is a software solutions company' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
          {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Copperplate:wght@700&display=swap'
        }
      ]
    },
  },
  ssr: true,
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  nitro: {
    preset: 'netlify',
     compressPublicAssets: true,
    minify: true
  },
})