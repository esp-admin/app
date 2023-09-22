import type { H3Event } from 'H3'

export async function checkDevice (event: H3Event) {
  const deviceId = event.context.params?.id

  const apiKey = getHeader(event, 'Api-Key')

  const device = await event.context.prisma.device.findUnique({
    where: {
      id: deviceId
    }
  })

  if (!device || device.apiKey !== apiKey) {
    throw new Error('unauthorized')
  }

  return device
}

export function checkUser (event: H3Event) {
  if (event.context.auth) {
    return event.context.auth
  }
  throw new Error('unauthorized')
}
