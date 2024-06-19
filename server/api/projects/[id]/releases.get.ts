export default defineEventHandler(async (event) => {
  checkUser(event)

  const projectId = validateId(event)

  const releases = await event.context.auth.adapter.source.release.findMany({
    where: {
      projectId,
    },
    select: {
      id: true,
      version: true,
      downloadPath: true,
      downloadSize: true,
      createdAt: true,
      projectId: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return releases
})
