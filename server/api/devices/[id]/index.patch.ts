import { hashSync } from '#auth_utils'

export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const deviceId = validateId(event)

  const schema = z.object({
    name: z.string().min(1).optional(),
    apiKey: z.string().min(1).optional(),
    description: z.string().min(1).nullable().optional(),
    status: z.enum(['connected', 'disconnected', 'unregistered']).optional(),
    variables: z.string().min(1).optional(),
  })

  const body = await validateBody(event, schema)

  let hashedApiKey = undefined

  if (body.apiKey) {
    hashedApiKey = hashSync(body.apiKey, 12)
  }

  const device = await event.context.auth.adapter.source.device.update({
    where: {
      id: deviceId,
      userId,
    },
    data: {
      name: body.name,
      description: body.description,
      status: body.status,
      variables: body.variables,
      apiKey: hashedApiKey,
    },
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      projectId: true,
      createdAt: true,
      variables: true,
    },
  }).catch((err) => { throw createPrismaError(err) })

  return device
})
