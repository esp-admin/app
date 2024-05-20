export default defineEventHandler(async (event) => {
  checkUser(event)

  const projectId = validateId(event)

  const releases = await event.context.prisma.release.findMany({
    where: {
      projectId,
    },
    select: {
      id: true,
      version: true,
      downloadPath: true,
      createdAt: true,
      projectId: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return releases
})
