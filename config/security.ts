import type { ModuleOptions } from 'nuxt-security'

export const security: Partial<ModuleOptions> = {
  corsHandler: false,
  headers: {
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      'img-src': [
        '\'self\'',
        'data:',
        'blob:',
        'https://*.googleusercontent.com',
        'https://avatars.githubusercontent.com',
      ],
    },
  },
}
