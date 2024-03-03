import type { ModuleOptions } from '@nuxt/fonts'

export const fonts: Partial<ModuleOptions> = {
  families: [
    { name: 'Rubik', weights: [400, 500], provider: 'google' }
  ]
}
