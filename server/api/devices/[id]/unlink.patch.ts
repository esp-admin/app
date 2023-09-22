import { z } from 'zod'
import { handleError } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    checkUser(event)

    const id = event.context.params?.id

    const schema = z.object({
      id: z.string().regex(/^[a-fA-F0-9]{24}$/)
    })

    schema.parse({ id })

    const device = await event.context.prisma.device.update({
      where: {
        id
      },
      data: {
        project: { disconnect: true }
      }
    })

    return device
  } catch (error) {
    await handleError(error)
  }
})
