export default defineEventHandler(async (event) => {
  checkUser(event)

  const { projectId } = getQuery<{ projectId: Project['id'] }>(event)

  const schema = z.object({
    projectId: z.string().regex(REGEX_ID)
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
      createdAt: true,
      projectId: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return releases
})
