// https://tools.crawlink.com/tools/pwa-icon-generator

import type { ModuleOptions } from '@vite-pwa/nuxt'

export const pwa: Partial<ModuleOptions> = {
  registerType: 'autoUpdate',
  manifest: {
    name: 'ESP Admin',
    short_name: 'ESPAdmin',
    theme_color: '#18181B',
    background_color: '#FFFFFF',
    description: 'Remote management for ESP microcontrollers',
    icons: [
      {
        src: 'pwa/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'pwa/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'pwa/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'pwa/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'pwa/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'pwa/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: 'pwa/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'pwa/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  },
  workbox: {
    navigateFallback: null,
    globPatterns: ['**/*.{js,css,html,png,svg,ico}']
  },
  client: {
    installPrompt: true
  },
  devOptions: {
    enabled: true,
    suppressWarnings: true,
    navigateFallbackAllowlist: [/^\/$/],
    type: 'module'
  }
}
