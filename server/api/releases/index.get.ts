import { z } from 'zod'

export default defineEventHandler(async (event) => {
  checkUser(event)

  const { projectId } = getQuery(event) as { projectId: Project['id'] }

  const schema = z.object({
    projectId: z.string().regex(/^[a-fA-F0-9]{24}$/)
  })

  schema.parse({ projectId })

  const releases = await event.context.prisma.release.findMany({
    where: {
      projectId
    },
    select: {
      id: true,
      version: true,
      downloadPath: true,
      createdAt: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return releases
})
