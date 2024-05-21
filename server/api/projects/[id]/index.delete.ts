export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const projectId = validateId(event)

  const project = await event.context.prisma.project.delete({
    where: {
      id: projectId,
      userId,
    },
    select: {
      id: true,
      releases: {
        select: {
          downloadPath: true,
        },
      },
    },
  }).catch((err) => { throw createPrismaError(err) })

  await Promise.all(project.releases.map(release => deleteObject(release.downloadPath)))

  return project
})
