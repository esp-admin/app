export default defineEventHandler(async (event) => {
  checkUser(event)

  const id = event.context.params?.id

  const schema = z.object({
    id: z.string().regex(REGEX_ID)
  })

  schema.parse({ id })

  const releases = await event.context.prisma.release.findMany({
    where: {
      projectId: id
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
