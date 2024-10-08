import type { H3Event } from 'h3'
import { compareSync } from '#auth_utils'

export async function checkDevice(event: H3Event) {
  const deviceId = event.context.params?.id

  const apiKey = getHeader(event, 'Api-Key')

  if (!apiKey || !deviceId || !REGEX_ID.test(deviceId)) {
    throw createUnauthorizedError()
  }

  const device = await event.context.auth.adapter.source.device.findUniqueOrThrow({
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
  }).catch((err) => { throw createPrismaError(err) })

  if (!compareSync(apiKey, device.apiKey)) {
    throw createUnauthorizedError()
  }

  return device
}

export async function checkProject(event: H3Event, projectId: Project['id']) {
  const apiKey = getHeader(event, 'Api-Key')

  if (!apiKey || !projectId || !REGEX_ID.test(projectId)) {
    throw createUnauthorizedError()
  }

  const project = await event.context.auth.adapter.source.project.findUniqueOrThrow({
    where: {
      id: projectId,
    },
    select: {
      id: true,
      userId: true,
      apiKey: true,
    },
  }).catch((err) => { throw createPrismaError(err) })

  if (!project.apiKey || !compareSync(apiKey, project.apiKey)) {
    throw createUnauthorizedError()
  }

  return project
}

export function checkUser(event: H3Event) {
  if (event.context.auth.data) {
    return event.context.auth.data
  }
  throw createUnauthorizedError()
}
