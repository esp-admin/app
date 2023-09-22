import { z } from 'zod'
import { handleError } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event)

    const { name } = await readBody<Project>(event)

    const schema = z.object({
      name: z.string().min(1)
    })

    schema.parse({ name })

    const project = await event.context.prisma.project.create({
      data: {
        name,
        userId
      }
    })

    return project
  } catch (error) {
    await handleError(error)
  }
})
