export default defineEventHandler(async (event) => {
  checkUser(event)

  const releaseId = validateId(event)

  const release = await event.context.prisma.release.delete({
    where: {
      id: releaseId,
    },
    select: {
      id: true,
    },
  }).catch((e) => { throw createPrismaError(e) })

  return release
})
