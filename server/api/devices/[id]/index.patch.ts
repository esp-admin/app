/* eslint-disable @typescript-eslint/no-unused-vars */
import { hashSync } from '#auth'

export default defineEventHandler(async (event) => {
  checkUser(event)

  const id = event.context.params?.id
  const data = await readBody<Partial<Device>>(event)

  const schema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/)
  })

  schema.parse({ id })

  let hashedApiKey

  if (data.apiKey) {
    hashedApiKey = hashSync(data.apiKey, 12)
  }

  const device = await event.context.prisma.device.update({
    where: {
      id
    },
    data: {
      ...data,
      apiKey: hashedApiKey
    }
  }).catch((e) => { throw createPrismaError(e) })

  // @ts-ignore
  const { apiKey, ...sanitizedDevice } = device

  return sanitizedDevice
})
