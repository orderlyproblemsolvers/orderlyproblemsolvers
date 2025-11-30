// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  app: {
    head: {
      // The Tab Title template (e.g. "About | OPS")
      titleTemplate: '%s %separator %siteName',
      templateParams: {
        siteName: 'OPS',
        separator: '|',
      },
      // The Icons
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icon.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
      // Browser Colors
      meta: [
        { name: 'theme-color', content: '#ffffff' },
        { name: 'msapplication-TileColor', content: '#2563eb' } // Your brand Blue
      ]
    }
  },
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  modules: ['@nuxt/image', '@nuxtjs/seo', 'nuxt-jsonld', 'nuxt-security', 'nuxt-gtag', '@vueuse/nuxt'],
  ssr: true,
   site: {
    url: 'https://orderlyproblemsolvers.com',
    name: 'Orderly Problem Solvers',
    description: 'The definitive index of the problem-solving economy in emerging markets.',
    defaultLocale: 'en',
  },
  sitemap: {
    // Fetch dynamic URLs from our API endpoint
    sources: [
      '/api/__sitemap__/urls'
    ],
    // Hide private/utility pages from Google
    exclude: [
      '/admin/**',
      '/auth/**',
      '/submit-solution',
      '/dashboard'
    ],
    // Cache sitemap for 1 hour to reduce database load
    cacheMaxAgeSeconds: 3600,
  },
  ogImage: {
    enabled: true,
  },
  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Orderly Problem Solvers',
      url: 'https://orderlyproblemsolvers.com',
      logo: 'https://orderlyproblemsolvers.com/img/logo.png'
    }
  },
  image: {
    // If using Cloudinary, you can configure the provider here
    provider: 'cloudinary',
    cloudinary: { baseURL: 'https://res.cloudinary.com/...' },
    // For now, defaults work fine with external URLs
    domains: ['images.unsplash.com', 'i.pravatar.cc', 'res.cloudinary.com', 'http://localhost:3000']
  },
  security: {
    headers: {
      // 1. Content Security Policy (The Firewall for your browser)
      contentSecurityPolicy: {
        'img-src': [
          "'self'", 
          "data:", 
          "https://res.cloudinary.com", 
          "https://images.unsplash.com", 
          "https://i.pravatar.cc", 
          "https://ui-avatars.com",
          "https://upload.wikimedia.org" // For the ecosystem logos
        ],
        'script-src': [
          "'self'", 
          "'unsafe-inline'", // Needed for Nuxt hydration
          "https:", // Allow external scripts if needed (e.g. Analytics)
        ],
        'style-src': [
          "'self'", 
          "'unsafe-inline'", // Needed for TipTap editor and Vue transitions
        ],
        'connect-src': [
          "'self'", 
          "https://api.cloudinary.com" // Allow uploading images directly
        ],
      },
      // 2. Cross Origin (Relax for images)
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
    },

    // 3. Rate Limiting (Anti-Spam)
    rateLimiter: {
      tokensPerInterval: 150, // Allow 150 requests...
      interval: 300000,       // ...every 5 minutes
      headers: false,         // Don't expose limit headers to hackers
      driver: {
        name: 'lruCache'      // In-memory cache (fastest for single server)
      }
    },
    
    // 5. CORS (Strict for API)
    corsHandler: {
      origin: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
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

  // 7. NITRO
  routeRules: {
    // Relax security for the Auth API (Better-Auth needs flexibility)
    '/api/auth/**': {
      security: {
        csrf: false, // Better-Auth manages its own CSRF tokens
        rateLimiter: {
          tokensPerInterval: 20, // Stricter limits for login (20 attempts/min)
          interval: 60000,
        }
      },
    },
    // Stricter limits for Submission API
    '/api/submissions': {
      security: {
        rateLimiter: {
          tokensPerInterval: 5, // Only 5 submissions per 10 mins per IP
          interval: 600000
        }
      }
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})