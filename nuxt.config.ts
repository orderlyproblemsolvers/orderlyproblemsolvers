// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  app: {
    head: {
      titleTemplate: '%s %separator %siteName',
      templateParams: {
        siteName: 'OPS',
        separator: '|',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icon.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'theme-color', content: '#ffffff' },
        { name: 'msapplication-TileColor', content: '#2563eb' },
        { name: 'color-scheme', content: 'light only' },
      ],
    },
  },

  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],

  modules: [
    '@nuxt/image',
    '@nuxtjs/seo',
    'nuxt-jsonld',
    'nuxt-security',
    'nuxt-gtag',
    '@vueuse/nuxt'
  ],

  ssr: true,

  site: {
    url: 'https://orderlyproblemsolvers.com',
    name: 'Orderly Problem Solvers',
    description: 'The definitive index of the problem-solving economy in emerging markets.',
    defaultLocale: 'en',
  },

  nitro: {
    preset: 'netlify',
    compressPublicAssets: true,
    minify: true
  },

  sitemap: {
    sources: [
      '/api/__sitemap__/urls'
    ],
    exclude: [
      '/admin/**',
      '/auth/**',
      '/submit-solution',
      '/dashboard'
    ],
    cacheMaxAgeSeconds: 3600,
  },

  ogImage: {
    enabled: true,
    host: process.env.NUXT_PUBLIC_SITE_URL || 'https://orderlyproblemsolvers.com',
    domains: [
      'res.cloudinary.com',
    ],
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Orderly Problem Solvers',
      url: 'https://orderlyproblemssolvers.com',
      logo: 'https://orderlyproblemsolvers.com/img/logo.png'
    }
  },

  image: {
    provider: 'cloudinary',
    cloudinary: { baseURL: 'https://res.cloudinary.com/...' },
    domains: [
      'images.unsplash.com',
      'i.pravatar.cc',
      'res.cloudinary.com',
      'orderlyproblemsolvers.com',
      'orderlyproblemsolvers.netlify.app',
      process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    ],
  },

  // ✅ FIXED SECURITY CONFIG (YouTube embeddable)
  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': ["'self'", "data:", "blob:", "https:"],

        'script-src': ["'self'", "'unsafe-inline'", "https:"],
        'style-src': ["'self'", "'unsafe-inline'"],

        // 🔥 FIXED — FULL YouTube embed chain
        'frame-src': [
          "'self'",
          "https://www.youtube.com",
          "https://youtube.com",
          "https://www.youtube-nocookie.com",
          "https://www.google.com"
        ],

        'child-src': [
          "'self'",
          "https://www.youtube.com",
          "https://www.google.com"
        ],

        'connect-src': ["'self'", "https:", "ws:", "wss:"],
      },

      crossOriginEmbedderPolicy: 'unsafe-none',
      crossOriginOpenerPolicy: 'same-origin-allow-popups',

      // 🔥 FIXED — Correct syntax (no broken quotes)
      permissionsPolicy: {
        fullscreen: ["self", "https://www.youtube.com"],
        autoplay: ["self", "https://www.youtube.com"],
        accelerometer: ["self", "https://www.youtube.com"],
        gyroscope: ["self", "https://www.youtube.com"],
        "encrypted-media": ["self", "https://www.youtube.com"],
        "picture-in-picture": ["self", "https://www.youtube.com"]
      },
    },

    // Rate limiting
    rateLimiter: {
      tokensPerInterval: 150,
      interval: 300000,
      headers: false,
      driver: { name: 'lruCache' }
    },

    corsHandler: {
      origin: [
        'https://orderlyproblemsolvers.com',
        'https://www.orderlyproblemsolvers.com',
        'https://orderlyproblemsolvers.netlify.app',
        'http://localhost:3000'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization'],
      exposeHeaders: ['Content-Length']
    }
  },

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    betterAuthSecret: process.env.BETTER_AUTH_SECRET,
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      cloudinaryUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    }
  },

  // Nitro route rules
  routeRules: {
    '/api/auth/**': {
      security: {
        csrf: false,
        rateLimiter: {
          tokensPerInterval: 20,
          interval: 60000,
        }
      },
    },
    '/api/submissions': {
      security: {
        rateLimiter: {
          tokensPerInterval: 5,
          interval: 600000
        }
      }
    }
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router']
          }
        }
      }
    },
  },
});
