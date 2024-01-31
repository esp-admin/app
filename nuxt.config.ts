import info from './package.json'
import { auth, naiveui, tailwindcss, s3, googleFonts, security } from './config'

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
    '@nuxtjs/google-fonts'
  ],

  auth,
  naiveui,
  tailwindcss,
  s3,
  googleFonts,
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
  },

  // https://github.com/nuxt-modules/google-fonts/issues/158
  postcss: {
    plugins: {
      cssnano: process.env.NODE_ENV === 'production' && { preset: ['default', { discardComments: { removeAll: true } }] }
    }
  }
})
