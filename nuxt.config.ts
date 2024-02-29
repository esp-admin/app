import info from './package.json'
import { auth, naiveui, tailwindcss, s3, security } from './config'

export default defineNuxtConfig({
  ssr: true,

  devtools: { enabled: false },

  app: {
    head: {
      title: 'ESP Admin',
      htmlAttrs: { lang: 'en' },
      meta: [{ name: 'theme-color', content: '#18181B' }]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  css: ['~/assets/styles/main.css'],

  modules: [
    '@bg-dev/nuxt-auth',
    '@bg-dev/nuxt-naiveui',
    '@nuxtjs/tailwindcss',
    'nuxt-s3',
    'nuxt-security',
    '@nuxt/fonts'
  ],

  auth,
  naiveui,
  tailwindcss,
  s3,
  security,

  routeRules: {
    '/api/s3/mutation/**': { security: { xssValidator: false } },
    '/api/auth/**': { security: { rateLimiter: { tokensPerInterval: 20, interval: 30000 } } },
    '/api/s3/**': { security: { rateLimiter: { tokensPerInterval: 20, interval: 30000 } } }
  },

  runtimeConfig: {
    public: {
      oauth: {
        google: false,
        github: false
      }
    },
    info: {
      name: info.name,
      version: info.version,
      description: info.description,
      repository: info.repository,
      homepage: info.homepage,
      author: info.author
    }
  }
})
