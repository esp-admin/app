import type { ModuleOptions } from '@bg-dev/nuxt-s3'

export const s3: Partial<ModuleOptions> = {
  server: false,
  driver: process.env.NUXT_S3_DRIVER as 'fs' | 's3' ?? 'fs',
  maxSizeMb: 5,
  accept: '^(image/(png|jpeg|png|gif|webp))|(application/octet-stream)',
}
