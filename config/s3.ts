import type { ModuleOptions } from '@bg-dev/nuxt-s3'

export const s3: Partial<ModuleOptions> = {
  driver: 'fs',
  maxSizeMb: 5,
  accept: '^(image/(png|jpeg|png|gif))|(application/octet-stream)'
}
