export default defineEventHandler(async (event) => {
  checkUser(event)

  const releaseId = validateId(event)

  const deployments = await event.context.auth.adapter.source.deployment.findMany({
    where: {
      releaseId,
    },
    select: {
      status: true,
      deviceId: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  }).catch((err) => { throw createPrismaError(err) })

  return deployments
})
