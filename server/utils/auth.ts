import type { H3Event } from 'h3'
import { compareSync } from '#auth'
import { getKey } from '#s3'

export async function checkDevice(event: H3Event) {
  const deviceId = event.context.params?.id

  const apiKey = getHeader(event, 'Api-Key')

  if (!apiKey || !deviceId || !REGEX_ID.test(deviceId)) {
    throw createUnauthorizedError()
  }

  const device = await event.context.prisma.device.findUniqueOrThrow({
    where: {
      id: deviceId,
    },
    select: {
      id: true,
      userId: true,
      projectId: true,
      name: true,
      apiKey: true,
    },
  }).catch((e) => { throw createPrismaError(e) })

  if (!compareSync(apiKey, device.apiKey)) {
    throw createUnauthorizedError()
  }

  return device
}

export function checkUser(event: H3Event) {
  if (event.context.auth) {
    return event.context.auth
  }
  throw createUnauthorizedError()
}

export function checkUpload(event: H3Event) {
  const { userId } = checkUser(event)

  const key = getKey(event)

  const userIdFromKey = key.split('/')[0]

  if (userId !== userIdFromKey) {
    throw createUnauthorizedError()
  }
}
