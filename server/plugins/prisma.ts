import { PrismaClient } from '@prisma/client'
import consola from 'consola'
import { usePrismaAdapter, setEventContext } from '#auth_utils'

declare module '#auth_adapter' {
  type Source = PrismaClient
}

export default defineNitroPlugin((nitroApp) => {
  const prisma = new PrismaClient()

  const adapter = usePrismaAdapter(prisma)

  nitroApp.hooks.hook('request', event => setEventContext(event, adapter))
  nitroApp.hooks.hook('auth:error', consola.error)
})
