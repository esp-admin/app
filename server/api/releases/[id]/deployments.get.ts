export default defineEventHandler(async (event) => {
  checkUser(event)

  const releaseId = validateId(event)

  const deployments = await event.context.prisma.deployment.findMany({
    where: {
      releaseId,
    },
    select: {
      status: true,
      deviceId: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  }).catch((err) => { throw createPrismaError(err) })

  return deployments
})
