import { auth, naiveui, tailwindcss, s3, security, fonts } from './config'

export default defineNuxtConfig({
  ssr: true,

  devtools: {
    enabled: true,
  },

  future: {
    compatibilityVersion: 4,
  },

  app: {
    head: {
      title: 'ESP Admin',
      htmlAttrs: { lang: 'en' },
      meta: [{ name: 'theme-color', content: '#18181B' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: ['~/assets/styles/main.css'],

  modules: [
    '@bg-dev/nuxt-auth',
    '@bg-dev/nuxt-naiveui',
    '@bg-dev/nuxt-s3',
    '@nuxtjs/tailwindcss',
    'nuxt-security',
    '@nuxt/fonts',
    '@nuxt/eslint',
  ],

  auth,
  naiveui,
  tailwindcss,
  s3,
  security,
  fonts,

  eslint: {
    config: {
      stylistic: true,
    },
  },

  routeRules: {
    '/api/auth/**': { security: { rateLimiter: { tokensPerInterval: 20, interval: 30000 } } },
    '/api/s3/query/**': { security: { rateLimiter: { tokensPerInterval: 20, interval: 30000 } } },
  },

  runtimeConfig: {
    public: {
      oauth: {
        google: false,
        github: false,
      },
    },
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        module: 'ESNext',
      },
    },
  },

  compatibilityDate: '2024-07-25',
})
