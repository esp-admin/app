import { hashSync } from '#auth'

export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const id = event.context.params?.id
  const { apiKey: _apiKey, name, description, status, variables } = await readBody<Device>(event)

  const schema = z.object({
    id: z.string().regex(REGEX_ID),
    name: z.string().min(1).optional(),
    description: z.string().nullable().optional(),
    status: z.enum(['connected', 'disconnected', 'unregistered']).optional(),
    variables: z.string().optional().nullable(),
  })

  schema.parse({ id, name, description, status, variables })

  let hashedApiKey

  if (_apiKey) {
    hashedApiKey = hashSync(_apiKey, 12)
  }

  const device = await event.context.prisma.device.update({
    where: {
      id,
      userId,
    },
    data: {
      name,
      description,
      status,
      variables,
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
  }).catch((e) => { throw createPrismaError(e) })

  return device
})
