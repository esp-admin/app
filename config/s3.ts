import type { ModuleOptions } from '@bg-dev/nuxt-s3'

export const s3: Partial<ModuleOptions> = {
  server: false,
  driver: 'fs',
  maxSizeMb: 3,
  accept: '^(image/(png|jpeg|png|gif|webp))|(application/octet-stream)',
}
