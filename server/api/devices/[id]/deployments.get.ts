export default defineEventHandler(async (event) => {
  checkUser(event)

  const deviceId = validateId(event)

  const deployments = await event.context.prisma.deployment.findMany({
    where: {
      deviceId,
    },
    include: {
      release: {
        select: {
          version: true,
          projectId: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return deployments
})
