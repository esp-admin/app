import { hashSync } from '#auth'

export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const { name, apiKey: _apiKey } = await readBody<Device>(event)

  const schema = z.object({
    name: z.string().min(1),
    apiKey: z.string().min(1)
  })

  schema.parse({ name, apiKey: _apiKey })

  const hashedApiKey = hashSync(_apiKey, 12)

  const device = await event.context.prisma.device.create({
    data: {
      name,
      userId,
      apiKey: hashedApiKey
    }
  }).catch((e) => { throw createPrismaError(e) })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { apiKey, ...sanitized } = device

  return sanitized
})
