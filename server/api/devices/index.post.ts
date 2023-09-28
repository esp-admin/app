import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const { name, apiKey } = await readBody<Device>(event)

  const schema = z.object({
    name: z.string().min(1),
    apiKey: z.string().min(1)
  })

  schema.parse({ name, apiKey })

  const hashedApiKey = hashSync(apiKey, 12)

  const device = await event.context.prisma.device.create({
    data: {
      name,
      userId,
      apiKey: hashedApiKey
    }
  }).catch((e) => { throw createPrismaError(e) })

  return device
})
