import { z } from 'zod'

export default defineEventHandler(async (event) => {
  checkUser(event)

  const id = event.context.params?.id
  const data = await readBody<Partial<Device>>(event)

  const schema = z.object({
    id: z.string().regex(/^[a-fA-F0-9]{24}$/)
  })

  schema.parse({ id })

  const device = await event.context.prisma.device.update({
    where: {
      id
    },
    data
  })

  return device
})
