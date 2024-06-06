import { hashSync } from '#auth_utils'

export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const schema = z.object({
    name: z.string().min(1),
    apiKey: z.string().min(1),
  })

  const body = await validateBody(event, schema)

  const hashedApiKey = hashSync(body.apiKey, 12)

  const device = await event.context.auth.adapter.source.device.create({
    data: {
      name: body.name,
      userId,
      apiKey: hashedApiKey,
    },
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      projectId: true,
      createdAt: true,
    },
  }).catch((err) => { throw createPrismaError(err) })

  return device
})
