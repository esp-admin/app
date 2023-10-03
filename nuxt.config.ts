// Node polyfill for MQTT.js
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { nodePolyfills as viteNodePolyfills } from 'vite-plugin-node-polyfills'
import rollupNodePolyfills from 'rollup-plugin-polyfill-node'
//

import { auth, naiveui, tailwindcss, s3, pwa } from './config'

export default defineNuxtConfig({
  ssr: true,

  devtools: { enabled: false },

  app: {
    head: {
      title: 'ESP Admin',
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600&display=swap'
        }
      ],
      meta: [{ name: 'theme-color', content: '#18181B' }]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },

  css: ['~/assets/styles/main.css'],

  modules: [
    '@bg-dev/nuxt-auth',
    '@bg-dev/nuxt-naiveui',
    '@nuxtjs/tailwindcss',
    'nuxt-s3',
    'nuxt-security',
    '@vite-pwa/nuxt'
  ],

  auth,
  naiveui,
  tailwindcss,
  s3,
  pwa,

  security: {
    corsHandler: {
      origin: process.env.NUXT_SECURITY_CORS_HANDLER_ORIGIN,
      methods: '*'
    },
    headers: {
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        'img-src': [
          "'self'",
          'data:',
          'blob:',
          'https://*.googleusercontent.com',
          'https://ui-avatars.com',
          'https://www.googletagmanager.com',
          'https://avatars.githubusercontent.com'
        ]
      }
    }
  },

  routeRules: {
    '/pwa/**': { security: { corsHandler: false } },
    '/api/s3/query/**': { cache: { maxAge: 2592000 } },
    '/api/s3/mutation/**': {
      security: {
        xssValidator: false
      }
    }
  },

  runtimeConfig: {
    public: {
      oauth: {
        google: false,
        github: false
      },
      bugsnag: {
        enabled: false,
        apiKey: '*'
      }
    }
  },

  // Node polyfill for MQTT.js
  vite: {
    plugins: [
      viteNodePolyfills({ include: ['util'], globals: { process: false } })
    ],
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis'
        },
        plugins: [
          // @ts-ignore
          NodeGlobalsPolyfillPlugin({ buffer: true, process: true })
        ]
      }
    },
    build: {
      rollupOptions: {
        plugins: [rollupNodePolyfills()]
      }
    }
  }
})
