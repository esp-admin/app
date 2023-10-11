// Node polyfill for MQTT.js
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { nodePolyfills as viteNodePolyfills } from 'vite-plugin-node-polyfills'
import rollupNodePolyfills from 'rollup-plugin-polyfill-node'
//

import info from './package.json'
import { auth, naiveui, tailwindcss, s3 } from './config'

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
    'nuxt-security'
  ],

  auth,
  naiveui,
  tailwindcss,
  s3,

  security: {
    corsHandler: false,
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
    '/api/s3/mutation/**': { security: { xssValidator: false } }
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
