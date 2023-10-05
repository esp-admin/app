import type { ModuleOptions } from 'nuxt-s3'

export const s3: Partial<ModuleOptions> = {
  driver: process.env.NUXT_S3_DRIVER as 's3' | 'fs',
  region: '*',
  endpoint: '*',
  accessKeyId: '*',
  secretAccessKey: '*',
  bucket: '*',
  accept: '^(image/(png|jpeg|png|gif))|(application/octet-stream)'
}
