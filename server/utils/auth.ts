import type { H3Event } from 'h3'
import { compareSync } from '#auth'

export async function checkDevice (event: H3Event) {
  const deviceId = event.context.params?.id

  const apiKey = getHeader(event, 'Api-Key')

  if (!apiKey || !deviceId || !REGEX_ID.test(deviceId)) {
    throw createUnauthorizedError()
  }

  const device = await event.context.prisma.device.findUniqueOrThrow({
    where: {
      id: deviceId
    }
  })

  if (!device || !compareSync(apiKey, device.apiKey)) {
    throw createUnauthorizedError()
  }

  return device
}

export function checkUser (event: H3Event) {
  if (event.context.auth) {
    return event.context.auth
  }
  throw createUnauthorizedError()
}
